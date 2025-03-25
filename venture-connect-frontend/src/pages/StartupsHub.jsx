import { Button, Flex, Input, Spin } from 'antd';
import StartupHubCard from '../Components/StartupHub/StartupHubCard';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useStartupProfileStore } from '../store/useStartupProfileStore';

const StartupsHub = () => {
  const { getAllStartupProfiles, startupAllProfile, setLoading, loading } =
    useStartupProfileStore();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllStartupProfiles();
      setLoading(false);
    };
    fetchData();
  }, [getAllStartupProfiles]);

  console.log('ALLSP: ', startupAllProfile);

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
        />
        <Button
          icon={<FilterOutlined className="text-gray-700" />}
          className="flex-0 rounded-full h-10 bg-white border-gray-300 font-medium"
          size="large"
        >
          Filters
        </Button>
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
          {console.log('sp: ', startupAllProfile)}
          {Array.isArray(startupAllProfile) &&
            startupAllProfile?.map((items, index) => (
              <StartupHubCard
                key={index}
                startup={items?.startup}
                userId={items?.id}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default StartupsHub;
