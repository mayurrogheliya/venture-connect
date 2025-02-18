import React from 'react';
import { Input, Button, Typography } from 'antd';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import InvestorNetworkCard from '../Components/InvestorNetwork/InvestorNetworkCard';

const { Title, Text } = Typography;

const investors = [
  {
    name: 'Dhruv Burada',
    role: 'VC',
    location: 'GUJ, IN',
    sector: 'Health Care',
  },
  {
    name: 'Mayur Rogheliya',
    role: 'Angel Investor',
    location: 'GUJ, IN',
    sector: 'Education',
  },
  {
    name: 'Meet Pitroda',
    role: 'Private Equity',
    location: 'MH, IN',
    sector: 'Manufacturing',
  },
];

const InvestorNetwork = () => {
  return (
    <div className="space-y-2">
    <h1 className="text-4xl font-bold">
      Discover Right{' '}
      <span className="text-blue-500">Investors</span>
    </h1>
    <p className="text-lg text-gray-500 font-normal">
    Discover investors who align with your vision and take your startup to the next level.
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

      {/* Investor Cards with Proper Spacing */}
      <div className="mt-8 grid gap-6">
        {investors.map((investor, index) => (
          <InvestorNetworkCard key={index} {...investor} />
        ))}
      </div>
    </div>
  );
};

export default InvestorNetwork;
