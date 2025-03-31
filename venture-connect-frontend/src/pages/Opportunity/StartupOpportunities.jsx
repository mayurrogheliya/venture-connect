import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Spin } from 'antd';
import OppStartupCard from '../../components/Opportunities/OppStartupCard';
import { useOpportunites } from '../../store/useOpportunites';
import { useEffect } from 'react';

const StartupOpportunities = () => {
  const { getStartUpOpportunities, startupopportunities, loading } =
    useOpportunites();

  useEffect(() => {
    getStartUpOpportunities();
  }, []);
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">
          Find Your Next Pitch{' '}
          <span className="text-blue-500">Opportunity</span>
        </h1>
        <p className="text-lg text-gray-500 font-normal">
          Connect with investors and accelerators looking for promising startups
          like yours
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 my-5">
        <Input
          placeholder="Search Opportunities..."
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

      <div className="flex gap-x-6 items-center text-gray-600 break-words flex-wrap">
        <p className="text-lg">
          <span className="text-blue-500 text-xl font-bold">200+ </span>Active
          Opportunities
        </p>
        <p className="text-lg">
          <span className="text-blue-500 text-xl font-bold">50K+ </span>Total
          Investment
        </p>
        <p className="text-lg">
          <span className="text-blue-500 text-xl font-bold">1000+ </span>
          Startups Funded
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Spin size="large" /> {/* Ant Design Loading Spinner */}
          </div>
        ) : (
          startupopportunities.map((data, index) => (
            <OppStartupCard data={data} key={index} />
          ))
        )}
      </div>
    </>
  );
};

export default StartupOpportunities;
