import React from 'react';
import { Card, Avatar, Button, Tag, Statistic } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  GlobalOutlined,
  UsergroupAddOutlined,
  ClockCircleOutlined,
  FundOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import 'antd/dist/reset.css';

const InvestorProfile = () => {
  return (
    <div className="p-6  min-h-screen flex justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1 text-center">
          <Avatar size={100} src="https://via.placeholder.com/100" />
          <h2 className="mt-2 text-xl font-semibold">
            Dhruv Burada <CheckCircleOutlined className="text-blue-500" />
          </h2>
          <p className="text-gray-500 flex items-center justify-center gap-1">
            <EnvironmentOutlined /> Rajkot, GUJ, India
          </p>
          <Tag color="blue" className="mt-2">
            Venture Capitalist
          </Tag>
          <div className="mt-3">
            <Button type="primary" icon={<LinkedinOutlined />}>
              Connect
            </Button>
          </div>
          <div className="mt-2 flex justify-center gap-3">
            <GlobalOutlined className="text-lg cursor-pointer" />
          </div>
        </Card>

        {/* Contact Information & Investment Statistics */}
        <div className="md:col-span-2 space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold">Contact Information</h3>
            <p>
              <MailOutlined /> buradadhruv35@gmail.com
            </p>
            <p>
              <PhoneOutlined /> +91 8488997323
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold">Investment Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <Statistic
                title="Total Investments"
                value={47}
                prefix={<FundOutlined />}
              />
              <Statistic
                title="Portfolio Companies"
                value={32}
                prefix={<UsergroupAddOutlined />}
              />
              <Statistic
                title="Years Experience"
                value={15}
                prefix={<ClockCircleOutlined />}
              />
            </div>
          </Card>
        </div>

        {/* Investment Preferences */}
        <Card className="md:col-span-3">
          <h3 className="font-semibold">Investment Preferences</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="font-semibold">Interested Domains</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {['AI/ML', 'SaaS', 'Fintech', 'Healthcare', 'Web3'].map(
                  (domain) => (
                    <Tag color="blue" key={domain}>
                      {domain}
                    </Tag>
                  ),
                )}
              </div>
            </div>
            <div>
              <p className="font-semibold">Investment Range</p>
              <p className="mt-2">$100K - $2M</p>
            </div>
            <div>
              <p className="font-semibold">Preferred Stage</p>
              <p className="mt-2">Seed to Series A</p>
            </div>
            <div>
              <p className="font-semibold">Mentorship</p>
              <p className="mt-2">Available</p>
            </div>
          </div>
        </Card>

        {/* Previous Investments */}
        <Card className="md:col-span-3">
          <h3 className="font-semibold">Previous Investments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            {[
              {
                name: 'TechFlow AI',
                desc: 'AI-powered workflow automation platform',
                year: 2023,
              },
              {
                name: 'HealthSync',
                desc: 'Digital health monitoring solutions',
                year: 2022,
              },
              {
                name: 'CryptoSecure',
                desc: 'Blockchain security infrastructure',
                year: 2022,
              },
              {
                name: 'GreenEnergy',
                desc: 'Renewable energy solutions',
                year: 2021,
              },
            ].map((inv, idx) => (
              <Card key={idx} bordered>
                <h4 className="font-semibold">{inv.name}</h4>
                <p className="text-gray-500">{inv.desc}</p>
                <Tag color="geekblue">{inv.year}</Tag>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InvestorProfile;
