import { useEffect } from 'react';
import { Input, Button, Flex, Spin, Empty } from 'antd';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import InvestorNetworkCard from '../Components/InvestorNetwork/InvestorNetworkCard';
import { useInvestorProfileStore } from '../store/useInvestorProfileStore';
import { useUserStore } from '../store/useUserStore';

const InvestorNetwork = () => {
  const { getAllInvestorProfiles, investorAllProfile, setLoading, loading } =
    useInvestorProfileStore();
  const { userId } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllInvestorProfiles(userId);
      setLoading(false);
    };
    fetchData();
  }, [getAllInvestorProfiles]);

  console.log('investor all profile', investorAllProfile);

  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold">
        Discover Right <span className="text-blue-500">Investors</span>
      </h1>
      <p className="text-lg text-gray-500 font-normal">
        Discover investors who align with your vision and take your startup to
        the next level.
      </p>

      <div className="flex flex-wrap items-center gap-4 my-5">
        <Input
          placeholder="Search Investors..."
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
        <div className="mt-8 grid gap-6">
          {Array.isArray(investorAllProfile) &&
          investorAllProfile.length > 0 ? (
            investorAllProfile.map((items, index) => (
              <InvestorNetworkCard
                key={index}
                investor={items?.investor}
                userId={items?.id}
              />
            ))
          ) : (
            <Empty
              description="No investors found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              className="flex flex-col items-center justify-center py-12"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default InvestorNetwork;
