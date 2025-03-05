/* eslint-disable react/display-name */
import { Input, Select, Form } from 'antd';
import {
  UserOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileImageUpload from '../Controls/ProfileImageUpload';
import { useState, forwardRef, useImperativeHandle } from 'react';

const { Option } = Select;

const BasicInfoForm = forwardRef(({ onNext }, ref) => {
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [imageError, setImageError] = useState('');

  // Handle profile image upload
  const handleImageUpload = (image) => {
    setProfileImage(image);
    setImageError('');
  };

  // Expose validateForm method via ref
  useImperativeHandle(ref, () => ({
    validateForm: async () => {
      try {
        await form.validateFields();

        // Validate Profile Image
        if (!profileImage) {
          setImageError('Profile image is required.');
          return false;
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  }));

  return (
    <div className="px-10 mt-10">
      <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>

      {/* Profile Image Upload Section */}
      <div className="flex justify-center mt-4 mb-4">
        <ProfileImageUpload onImageUpload={handleImageUpload} />
      </div>
      {imageError && (
        <p className="text-red-500 text-sm text-center mt-2">{imageError}</p>
      )}

      {/* Form Section */}
      <Form
        form={form}
        layout="vertical"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[
            { required: true, message: 'Full Name is required' },
            {
              pattern: /^[A-Za-z\s]+$/,
              message: 'Full Name should contain only letters and spaces',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          label="LinkedIn Profile"
          name="linkedin"
          rules={[
            { required: true, message: 'LinkedIn profile is required' },
            {
              pattern: /^https:\/\/www\.linkedin\.com\//,
              message: 'Enter a valid LinkedIn URL',
            },
          ]}
        >
          <Input
            prefix={
              <FontAwesomeIcon
                icon={faLinkedin}
                size="18"
                style={{ marginRight: '5px', color: 'gray' }}
              />
            }
            placeholder="https://www.linkedin.com/in/username"
          />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[
            { required: true, message: 'Location is required' },
            {
              pattern: /^[A-Za-z]+,\s[A-Za-z]+$/,
              message: 'Format: City, Country',
            },
          ]}
        >
          <Input prefix={<EnvironmentOutlined />} placeholder="City, Country" />
        </Form.Item>

        <Form.Item
          label="Website"
          name="Website"
          rules={[{ type: 'url', message: 'Website is required' }]}
        >
          <Input
            prefix={<GlobalOutlined />}
            placeholder="https://www.your-website.com"
          />
        </Form.Item>

        <Form.Item
          label="Type of Investor"
          name="investorType"
          rules={[{ required: true, message: 'Investor type is required' }]}
        >
          <Select placeholder="Select type" className="w-full">
            <Option value="Angel Investor">Angel Investor</Option>
            <Option value="Venture Capitalist">Venture Capitalist</Option>
            <Option value="Private Equity Investor">
              Private Equity (PE) Investor
            </Option>
            <Option value="Corporate Investor">Corporate Investor (CVC)</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Twitter Handle"
          name="twitter"
          rules={[
            {
              required: true,
              message: 'Please enter your Twitter handle!',
            },
            {
              pattern: /^@?(\w){4,15}$/,
              message:
                'Invalid Twitter username! Must be 4-15 chars (A-Z, 0-9, _).',
            },
          ]}
          normalize={(value) =>
            value && !value.startsWith('@') ? `@${value}` : value
          } // Auto-add "@" if missing
        >
          <Input
            prefix={
              <FontAwesomeIcon
                icon={faTwitter}
                size="18"
                style={{ marginRight: '5px', color: 'gray' }}
              />
            }
            placeholder="@yourusername"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Enter a valid email' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="your@email.com" />
        </Form.Item>

        <Form.Item
          label="Years of Experience"
          name="experience"
          rules={[
            { required: true, message: 'Experience is required' },
            { pattern: /^[0-9]+$/, message: 'Enter a valid number' },
          ]}
        >
          <Input prefix={<ClockCircleOutlined />} placeholder="Enter years" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: 'Phone number is required' },
            {
              pattern: /^[0-9]{10}$/,
              message: 'Enter a valid 10-digit number',
            },
          ]}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="without country code"
          />
        </Form.Item>

        <Form.Item
          label="Preferred Startup Stage"
          name="startup_stage"
          rules={[{ required: true, message: 'Startup Stage is required' }]}
        >
          <Select placeholder="Select stage" className="w-full">
            <Option value="Ideation">Ideation</Option>
            <Option value="Pre-Seed">Pre-Seed</Option>
            <Option value="Seed">Seed</Option>
            <Option value="Early">Early</Option>
            <Option value="Growth">Growth</Option>
            <Option value="Expansion">Expansion</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
});

export default BasicInfoForm;
