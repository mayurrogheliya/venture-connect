import { Input,Select} from "antd";
import {
  UserOutlined,
  LinkOutlined,
  GlobalOutlined,
  TwitterOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

import ProfileImageUpload from "../Controls/ProfileImageUpload.jsx";

const { Option } = Select;

const InvestorProfileForm = () => {
   // Basic Info step completed

  return (
    <div className="px-12">
     

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>

        
        <div className="flex justify-center mt-4">
            <ProfileImageUpload />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="text-gray-700 font-medium">Full Name</label>
            <Input prefix={<UserOutlined className="fill-white" />} placeholder="Enter your full name" />
          </div>

         
          <div>
            <label className="text-gray-700 font-medium">LinkedIn Profile</label>
            <Input prefix={<LinkOutlined />} placeholder="linkedin.com/in/username" />
          </div>

          
          <div>
            <label className="text-gray-700 font-medium">Location</label>
            <Input prefix={<EnvironmentOutlined />} placeholder="City, Country" />
          </div>

          
          <div>
            <label className="text-gray-700 font-medium">Website</label>
            <Input prefix={<GlobalOutlined />} placeholder="www.example.com" />
          </div>

          
          <div>
            <label className="text-gray-700 font-medium">Type of Investor</label>
            <Select placeholder="Select type" className="w-full">
              <Option value="Angel Investor">Angel Investor</Option>
              <Option value="Venture Capitalist">Venture Capitalist</Option>
              <Option value="Private Equity Investor">Private Equity (PE) Investor</Option>
              <Option value="Corporate Investor">Corporate Investor (CVC)</Option>
              <Option value="Crowdfunding Investor">Crowdfunding Investor</Option>
              <Option value="Family Office Investor">Family Office Investor</Option>
              <Option value="Hedge Fund/Mutual Fund Investor">Hedge Fund/Mutual Fund Investor</Option>
              <Option value="Grant Provider">Grant Provider</Option>
              <Option value="Bank/NBFC Lender">Bank/NBFC Lender</Option>


            </Select>
          </div>

          
          <div>
            <label className="text-gray-700 font-medium">Twitter Handle</label>
            <Input prefix={<TwitterOutlined />} placeholder="@username" />
          </div>

          
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <Input prefix={<MailOutlined />} placeholder="your@email.com" />
          </div>

          
          <div>
            <label className="text-gray-700 font-medium">Years of Experience</label>
            <Input prefix={<ClockCircleOutlined />} placeholder="Enter years" />
          </div>

          
          <div>
            <label className="text-gray-700 font-medium">Phone</label>
            <Input prefix={<PhoneOutlined />} placeholder="without country code" />
          </div>

          
          <div>
            <label className="text-gray-700 font-medium">Preferred Startup Stage</label>
            <Select placeholder="Select type" className="w-full">
              <Option value="Seed Stage">Seed Stage</Option>
              <Option value="Series A">Series A</Option>
            </Select>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InvestorProfileForm;
