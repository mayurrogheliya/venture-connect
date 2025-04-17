import { Empty, Flex, Input, Spin } from 'antd';
import StartupHubCard from '../Components/StartupHub/StartupHubCard';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react'; // Add useState import
import { useStartupProfileStore } from '../store/useStartupProfileStore';
import { useUserStore } from '../store/useUserStore';

const StartupsHub = () => {
  const { getAllStartupProfiles, startupAllProfile, setLoading, loading } =
    useStartupProfileStore();
  const { userId } = useUserStore();
  const [searchTerm, setSearchTerm] = useState(''); // Add search term state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllStartupProfiles(userId);
      setLoading(false);
    };
    fetchData();
  }, [getAllStartupProfiles, userId]);

  // Filter startups based on search term
  const filteredStartups = startupAllProfile?.filter((startup) => {
    const name = startup?.startup?.basicInfo?.startup_name?.toLowerCase() || '';
    const overview =
      startup?.startup?.basicInfo?.company_overview?.toLowerCase() || '';
    const industry = startup?.startup?.basicInfo?.industry?.toLowerCase() || '';
    const term = searchTerm.toLowerCase();

    return (
      name.includes(term) || overview.includes(term) || industry.includes(term)
    );
  });

  console.log(startupAllProfile);

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">
          Discover <span className="text-blue-500">Startups</span>
        </h1>
        <p className="text-lg text-gray-500 font-normal">
          Discover and connect with innovative Startups
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 my-5">
        <Input
          placeholder="Search Startups..."
          prefix={<SearchOutlined className="text-gray-500 px-1 pe-1.5" />}
          allowClear
          className="flex-1 min-w-md rounded-lg h-10 bg-gray-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </div>

      <div className="flex gap-6 items-center text-gray-600 break-words">
        <p className="text-lg">
          <span className="text-blue-500 text-xl font-bold">200+ </span>
          Opportunities
        </p>
        <p className="text-lg">
          <span className="text-blue-500 text-xl font-bold">50K+ </span>
          Investors
        </p>
        <p className="text-lg">
          <span className="text-blue-500 text-xl font-bold">1000+ </span>
          Startups
        </p>
      </div>

      {loading ? (
        <Flex gap="middle" vertical>
          <Spin tip="Loading..." size="large" />
        </Flex>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
          {filteredStartups && filteredStartups.length > 0 ? (
            filteredStartups.map((items, index) => (
              <StartupHubCard
                key={index}
                startup={items?.startup}
                userId={items?.id}
              />
            ))
          ) : (
            <Empty
              description="No startups found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              className="flex flex-col items-center justify-center py-12"
            />
          )}
        </div>
      )}
    </>
  );
};

export default StartupsHub;
