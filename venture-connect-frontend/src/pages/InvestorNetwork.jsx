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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Search & Filter Bar */}
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search Investors"
          prefix={<SearchOutlined className="text-gray-500" />}
          allowClear
          className="flex-1 rounded-lg h-10 bg-gray-100"
        />
        <Button
          icon={<FilterOutlined className="text-gray-700" />}
          className="rounded-full h-10 bg-white border-gray-300 font-medium min-w-[100px]"
        >
          Filter
        </Button>
      </div>

      {/* Heading Section */}
      <div className="text-center mt-8">
        <Title level={3} className="!text-xl sm:!text-2xl font-semibold">
          Discover <span className="text-blue-600">Right Investors</span>
        </Title>
        <Text className="block text-gray-600 text-base sm:text-lg">
          Discover investors who align with your vision and take your startup to
          the next level.
        </Text>
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
