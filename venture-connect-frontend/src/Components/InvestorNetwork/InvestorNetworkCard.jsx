import React from 'react';
import { Card, Avatar, Button, Typography } from 'antd';
import { EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import { PiTargetBold } from "react-icons/pi";

const { Title, Text } = Typography;

const InvestorNetworkCard = ({ name, role, location, sector }) => {
  return (
    <Card className="shadow-md border border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6">
        {/* Left: Avatar (Centered on Mobile, Left on Desktop) */}
        <div className="flex-shrink-0 flex justify-center sm:justify-start w-full sm:w-auto">
          <Avatar size={80} icon={<UserOutlined />} className="bg-gray-300" />
        </div>

        {/* Right: Details & Button - Aligned Vertically in Desktop */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
          {/* Investor Info */}
          <div className="text-center sm:text-left">
            <Title level={5} className="!m-0 !text-lg font-semibold">
              {name}
            </Title>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2 text-gray-600 text-sm">
              <Text className="flex items-center">
                <UserOutlined className="text-blue-600 mr-1" /> {role}
              </Text>
              <Text className="flex items-center">
                <EnvironmentOutlined className="text-blue-600 mr-1" /> {location}
              </Text>
              <Text className="flex items-center gap-0.5 text-blue-600">
                <PiTargetBold /> {sector}
              </Text>
            </div>
          </div>

          {/* Button - Centered in Mobile, Inline in Desktop */}
          <div className="mt-4 sm:mt-0 flex justify-center sm:justify-end sm:ml-6">
            <Button
              type="primary"
              className="bg-blue-600 hover:bg-blue-700 rounded-full font-medium px-6 min-w-[140px] h-10 w-full sm:w-auto"
            >
              Know More
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InvestorNetworkCard;
