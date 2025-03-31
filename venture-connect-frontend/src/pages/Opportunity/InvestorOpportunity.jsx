import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Spin } from 'antd';
import InvestmentCard from '../../Components/Opportunities/OppInvestorCard'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import { useOpportunites } from '../../store/useOpportunites';
import { useEffect } from 'react';
const InvestorOpportunity = () => {
  const navigate = useNavigate();

  const { opportunities, loading, fechOpportunities, setOpportunities } =
    useOpportunites();
  useEffect(() => {
    fechOpportunities();
  }, [setOpportunities]);

  return (
    <div className="max-w-6xl">
      {/* Heading Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">
          Create Open Pitch <span className="text-blue-500">Opportunity</span>
        </h1>
        <p className="text-lg text-gray-500 font-normal">
          Define your investment criteria and invite startups to pitch their
          ideas directly to you.
        </p>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-wrap items-center gap-3 my-5">
        <Input
          placeholder="Search Opportunities..."
          prefix={<SearchOutlined className="text-gray-500 px-1 pe-1.5" />}
          allowClear
          className="flex-1 min-w-md rounded-lg h-10 bg-gray-100"
        />
        <Button
          icon={<PlusOutlined className="text-gray-700" />}
          className="flex-0 rounded-full h-10 bg-white border-gray-300 font-medium"
          size="large"
          onClick={() => navigate('/Add-Oppertunity-Investor')}
        >
          Add
        </Button>
      </div>

      {/* Investment Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-6 auto-rows-fr">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Spin size="large" /> {/* Ant Design Loading Spinner */}
          </div>
        ) : (
          opportunities.map((opportunity) => (
            <InvestmentCard key={opportunity.id} opportunity={opportunity} />
          ))
        )}
      </div>
    </div>
  );
};

export default InvestorOpportunity;
