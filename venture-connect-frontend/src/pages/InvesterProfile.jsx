import React from 'react';
import { Card, Avatar, Button } from 'antd';
import {
  UserOutlined,
  LinkedinOutlined,
  HomeOutlined,
} from '@ant-design/icons';

const InvestorProfile = () => {
  return (
    <div className="flex min-h-screen p-6 flex-col items-center">
      <div className="w-full max-w-5xl space-y-6 ">
        {/* Profile Card */}
        <Card className="rounded-xl p-6 bg-white mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar size={90} icon={<UserOutlined />} className="bg-blue-500" />
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-semibold text-gray-900">
                Dhruv Burada
              </h2>
              <p className="text-gray-500 text-lg">Angel Investor</p>
              <p className="text-gray-400">Rajkot, Gujarat, India</p>
            </div>
            <Button
              type="primary"
              icon={<LinkedinOutlined />}
              className="rounded-lg px-4 py-2"
            >
              Connect
            </Button>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="rounded-xl p-6 bg-white mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>First Name:</strong> Dhruv
            </p>
            <p>
              <strong>Last Name:</strong> Burada
            </p>
          </div>
          <p className="text-gray-600 mt-2">
            <strong>Bio:</strong> Seasoned angel investor dedicated to
            empowering visionary founders and turning innovative ideas into
            thriving businesses.
          </p>
        </Card>

        {/* Investment Preferences */}
        <Card className="rounded-xl p-6 bg-white">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Investment Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Interested Domain:</strong> Tech
            </p>
            <p>
              <strong>Investment Range:</strong> ₹10,00,000 - ₹20,00,000
            </p>
          </div>
          <p>
            <strong>Preferred Startup Stage:</strong> Idea
          </p>
        </Card>

        {/* Previous Investments */}
        <Card className="rounded-xl p-6 bg-white mb-6">
          <h4 className="text-lg font-semibold mb-3 text-gray-800">
            Previous Investments
          </h4>
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <HomeOutlined className="text-blue-500 text-lg" />
              <span className="text-gray-700">
                Gateway Group Of Company -{' '}
                <strong className="text-black">5% Equity</strong>
              </span>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <HomeOutlined className="text-blue-500 text-lg" />
              <span className="text-gray-700">
                Starlink Solutions -{' '}
                <strong className="text-black">15% Equity</strong>
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InvestorProfile;
