import { useEffect, useState } from 'react';
import { SortAscendingOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import { useBookmarkStore } from '../store/useBookmarkStore';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faTrash,
  faDollar,
  faUsers,
  faBuilding,
  faAngleRight,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { IoLocationOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { formatAmount } from '../utils/formatUtils';

const BookmarkedStartups = () => {
  const { bookmarks, fetchBookmarks, removeBookmark, loading } =
    useBookmarkStore();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [removingBookmarkId, setRemovingBookmarkId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        await fetchBookmarks();
        setIsInitialLoad(false);
      } catch (error) {
        toast.error('Failed to fetch bookmarks');
        console.error('Error fetching bookmarks:', error);
      }
    };

    loadBookmarks();
  }, [fetchBookmarks]);

  const handleRemoveBookmark = async (bookmarkId) => {
    setRemovingBookmarkId(bookmarkId);
    try {
      const response = await removeBookmark(bookmarkId);
      if (response.data?.message) {
        toast.success(response.data.message);
      }
      await fetchBookmarks();
    } catch (error) {
      toast.error('Failed to remove bookmark');
      console.error('Error removing bookmark:', error);
    } finally {
      setRemovingBookmarkId(null);
    }
  };

  const handleLearnMore = (userId) => {
    navigate(`/startup-profile/${userId}`);
  };

  if (isInitialLoad && loading) {
    return (
      <div className="text-center py-8">
        <Spin />
      </div>
    );
  }

  if (!isInitialLoad && bookmarks.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-2">No bookmarks yet</h2>
        <p className="text-gray-500">
          Start bookmarking startups to see them here
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-4xl font-bold">
            Bookmarked <span className="text-blue-500">Startups</span>
          </h2>
          <p className="text-lg text-gray-500 font-normal">
            {bookmarks.length} {bookmarks.length === 1 ? 'startup' : 'startups'}{' '}
            saved to your bookmarks
          </p>
        </div>

        <Button
          icon={<SortAscendingOutlined className="text-gray-700" />}
          className="flex-0 rounded-full h-10 bg-white border-gray-300 font-medium"
          size="large"
        >
          Sort
        </Button>
      </div>

      {/* Startup Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {bookmarks.map((bookmark) => {
          const { basicInfo, metrics } = bookmark.startup || {};
          const isRemoving = removingBookmarkId === bookmark.startupId;

          return (
            <div
              key={bookmark.id}
              className="bg-white w-full max-w-sm p-4 rounded-2xl shadow-md space-y-4 mx-auto"
            >
              <div className="flex justify-between items-start">
                {/* Startup Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={basicInfo?.startup_logo}
                    alt={basicInfo?.startup_name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {basicInfo?.startup_name}
                    </h3>
                    <p className="text-gray-600 flex items-center gap-1">
                      <IoLocationOutline size="18" /> {basicInfo?.location}
                    </p>
                  </div>
                </div>

                {/* Delete Icon */}
                <button
                  className="px-3 py-1 hover:bg-gray-200 rounded-md"
                  onClick={() => handleRemoveBookmark(bookmark.startupId)}
                  disabled={isRemoving}
                >
                  {isRemoving ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="text-red-500 animate-spin"
                      size="lg"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-red-500"
                      size="lg"
                    />
                  )}
                </button>
              </div>

              <p className="text-gray-500">{basicInfo?.company_overview}</p>
              <div className="flex items-center gap-3 text-sm">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md">
                  {basicInfo?.industry}
                </span>
              </div>

              <div className="flex justify-between text-gray-500">
                <p>
                  <FontAwesomeIcon icon={faDollar} />{' '}
                  {formatAmount(metrics?.total_funding)}
                </p>
                <p>
                  <FontAwesomeIcon icon={faUsers} />{' '}
                  {formatAmount(basicInfo?.team_size)}
                </p>
              </div>

              <hr className="border-gray-200" />
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-500">
                  <FontAwesomeIcon icon={faBuilding} /> {basicInfo?.stage}
                </p>
                <button
                  onClick={() => handleLearnMore(bookmark.userId)}
                  className="text-blue-500 hover:text-blue-600 cursor-pointer"
                >
                  Learn More <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookmarkedStartups;
