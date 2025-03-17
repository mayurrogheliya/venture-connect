import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Checkbox, Form, message, Spin } from 'antd';
import {
  CalendarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { eventsAPIs } from '../api/endpoints/event';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate, formatTime } from '../components/EventMain/EventCard';
import { eventsAttentAPIs } from '../api/endpoints/eventattendees';
import { toast } from 'react-toastify';

const JoinEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const onFinish = async (values) => {
    try {
      const data = { ...values, eventId: id };

      const response = await eventsAttentAPIs.addEventAttent(data);

      if (response.data) {
        toast.success(response.data.message);
      }

      form.resetFields();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchEventDetails = async () => {
      if (!id) return;

      try {
        const response = await eventsAPIs.getEventById(id);
        setEvent(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center flex flex-col justify-center items-center min-h-[500px] p-8 md:p-16 lg:p-24">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold">
          {event?.name}
        </h2>
        <p className="text-xs sm:text-sm md:text-lg mt-2">{event?.subtitle}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 md:gap-6 mt-2 sm:mt-4 md:mt-6 text-xs sm:text-sm md:text-lg">
          <p className="flex items-center">
            <CalendarOutlined className="mr-2" /> {formatDate(event?.date)} |{' '}
            {formatTime(event?.timeFrom)} - {formatTime(event?.timeTill)}
          </p>
          <p className="flex items-center">
            <EnvironmentOutlined className="mr-2" /> {event?.city},{' '}
            {event?.address}
          </p>
        </div>
      </div>

      {/* Event Details */}
      <div className="py-3">
        <div className="max-w-5xl mx-auto mt-10 p-4 md:p-6">
          <h3 className="text-xl md:text-2xl font-bold text-center">
            Event Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            <Card className="text-center shadow-lg">
              <CalendarOutlined className="text-3xl text-blue-600" />
              <h3 className="text-lg font-semibold mt-3">Date & Time</h3>
              <p>{formatDate(event?.date)}</p>
              <p>
                {formatTime(event?.timeFrom)} - {formatTime(event?.timeTill)}
              </p>
            </Card>
            <Card className="text-center shadow-lg">
              <EnvironmentOutlined className="text-3xl text-blue-600" />
              <h3 className="text-lg font-semibold mt-3">Location</h3>
              <p>{event?.address}</p>
              <p>{event?.city}</p>
            </Card>
            <Card className="text-center shadow-lg">
              <TeamOutlined className="text-3xl text-blue-600" />
              <h3 className="text-lg font-semibold mt-3">Capacity</h3>
              <p>{event?.capacity} Attendees</p>
            </Card>
          </div>
        </div>

        {/* About the Event */}
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md mt-10">
          <h3 className="text-xl md:text-2xl font-bold mb-4">
            About the Event
          </h3>
          <p className="text-gray-700">{event?.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold">Key Highlights</h4>
              <ul className="list-disc pl-5 text-gray-700">
                {event?.keyhighlights?.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Who Should Attend</h4>
              <ul className="list-disc pl-5 text-gray-700">
                {event?.whoShouldAttend?.map((attendee, index) => (
                  <li key={index}>{attendee}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md mt-10">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-6">
            Register Now
          </h3>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="firstname"
                rules={[{ required: true, message: 'First name is required' }]}
              >
                <Input placeholder="First Name *" size="large" />
              </Form.Item>
              <Form.Item
                name="lastname"
                rules={[{ required: true, message: 'Last name is required' }]}
              >
                <Input placeholder="Last Name *" size="large" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Email is required' },
                  { type: 'email', message: 'Enter a valid email' },
                ]}
              >
                <Input placeholder="Email Address *" size="large" />
              </Form.Item>
              <Form.Item
                name="phonenumber"
                rules={[
                  {
                    pattern: /^[0-9]*$/,
                    message: 'Enter a valid phone number',
                  },
                  { required: true, message: 'phone number is required' },
                ]}
              >
                <Input placeholder="Phone Number" size="large" />
              </Form.Item>
              <Form.Item
                name="companyname"
                rules={[
                  { required: true, message: 'Campany name is required' },
                ]}
              >
                <Input placeholder="Company Name" size="large" />
              </Form.Item>
              <Form.Item
                name="jobtitle"
                rules={[{ required: true, message: 'job title is required' }]}
              >
                <Input placeholder="Job Title" size="large" />
              </Form.Item>
            </div>

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
            >
              Complete Registration
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default JoinEvent;
