import React from 'react';
import { Card, Input, Button, Checkbox } from 'antd';
import {
  CalendarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const JoinEvent = () => {
  return (
    <div className="bg-gray-100 ">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center flex flex-col justify-center items-center min-h-[500px] p-8 md:p-16 lg:p-24 ">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold ">
          Venture Connect Summit 2025
        </h2>
        <p className="text-xs sm:text-sm md:text-lg mt-2">
          Connect, Learn, and Grow with Industry Leaders
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 md:gap-6 mt-2 sm:mt-4 md:mt-6 text-xs sm:text-sm md:text-lg">
          <p className="flex items-center">
            <CalendarOutlined className="mr-2" /> March 15, 2025 | 9:00 AM -
            5:00 PM
          </p>
          <p className="flex items-center">
            <EnvironmentOutlined className="mr-2" /> Ahmedabad, Gujarat
          </p>
        </div>
      </div>
      <div className="py-3">
        <div className="max-w-5xl mx-auto mt-10 p-4 md:p-6">
          <h3 className="text-xl md:text-2xl font-bold text-center">
            Event Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            <Card className="text-center shadow-lg">
              <CalendarOutlined className="text-3xl text-blue-600" />
              <h3 className="text-lg font-semibold mt-3">Date & Time</h3>
              <p>March 15, 2025</p>
              <p>9:00 AM - 5:00 PM</p>
            </Card>
            <Card className="text-center shadow-lg">
              <EnvironmentOutlined className="text-3xl text-blue-600" />
              <h3 className="text-lg font-semibold mt-3">Location</h3>
              <p>Grand Conference Center</p>
              <p>Ahmedabad, GUJ</p>
            </Card>
            <Card className="text-center shadow-lg">
              <TeamOutlined className="text-3xl text-blue-600" />
              <h3 className="text-lg font-semibold mt-3">Capacity</h3>
              <p>200 Attendees</p>
              <p>Limited Seats Available</p>
            </Card>
          </div>
        </div>

        <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md mt-10">
          <h3 className="text-xl md:text-2xl font-bold mb-4">
            About the Event
          </h3>
          <p className="text-gray-700">
            Join us for the premier networking event of the year, where industry
            leaders, innovators, and professionals come together to share
            insights, build meaningful connections, and explore new
            opportunities in the tech sector.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold">Key Highlights</h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Expert-led panel discussions</li>
                <li>Interactive networking sessions</li>
                <li>Industry insights and trends</li>
                <li>Professional development opportunities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Who Should Attend</h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Tech professionals</li>
                <li>Industry leaders</li>
                <li>Entrepreneurs</li>
                <li>Investors and stakeholders</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white  p-6 md:p-8 rounded-lg shadow-md mt-10">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-6">
            Register Now
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input placeholder="First Name *" size="large" />
            <Input placeholder="Last Name *" size="large" />
            <Input placeholder="Email Address *" size="large" />
            <Input placeholder="Phone Number" size="large" />
            <Input placeholder="Company Name" size="large" />
            <Input placeholder="Job Title" size="large" />
          </div>
          <div className="mt-6">
            <Checkbox>
              I agree to the terms and conditions and privacy policy
            </Checkbox>
          </div>
          <Button
            type="primary"
            size="large"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
          >
            Complete Registration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinEvent;
