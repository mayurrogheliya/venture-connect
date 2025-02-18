import React from 'react';
import { Card, Avatar, Button } from 'antd';
import { UserOutlined, LinkedinOutlined } from '@ant-design/icons';

const InvestorProfile = () => {
  return (
    <div className="flex min-h-screen p-6 flex-col items-center">
      <div className="w-full max-w-5xl space-y-6 ">
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
      </div>
    </div>
  );
};

export default InvestorProfile;
