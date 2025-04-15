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
import { forwardRef, useImperativeHandle, useEffect } from 'react';
import { useUserStore } from '../../../store/useUserStore';
import { useInvestorFormStore } from '../../../store/useInvestorFormStore';
import PropTypes from 'prop-types';

const { Option } = Select;

const BasicInfoForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const {
    basicInfo,
    profileImage,
    setBasicInfoField,
    setProfileImage,
    setImageError,
    imageError
  } = useInvestorFormStore();

  const { getUserById } = useUserStore();

  // Initialize form with default values
  useEffect(() => {
    console.log('BasicInfo - Initializing form with default values');
    form.setFieldsValue({
      investorType: 'Angel Investor',
      startupStage: 'Seed',
      experience: '5'
    });
  }, [form]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const userData = await getUserById(userId);
          const initialValues = {
            ...basicInfo,
            website: basicInfo.website || '',
            investorType: basicInfo.investorType || 'Angel Investor',
            startupStage: basicInfo.startupStage || 'Seed',
            email: userData?.data?.email || '',
          };
          console.log('BasicInfo - Setting initial values:', initialValues);
          form.setFieldsValue(initialValues);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };
    fetchUserData();
  }, [getUserById, form, basicInfo]);

  const handleImageUpload = (image) => {
    setProfileImage(image);
    setImageError('');
  };

  const handleValuesChange = (changedValues) => {
    Object.entries(changedValues).forEach(([key, value]) => {
      setBasicInfoField(key, value);
    });
  };

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    validateForm: async () => {
      try {
        console.log('BasicInfo - Starting validation');
        const values = await form.validateFields();
        console.log('BasicInfo - Form values after validation:', values);
        
        // Ensure required fields are present
        const formData = {
          ...values,
          investorType: values.investorType || 'Angel Investor',
          startupStage: values.startupStage || 'Seed',
          experience: values.experience || '5'
        };
        console.log('BasicInfo - Form data after defaults:', formData);
        
        // Update store with validated values
        Object.entries(formData).forEach(([key, value]) => {
          setBasicInfoField(key, value);
        });
        
        if (!profileImage) {
          console.log('BasicInfo - Profile image missing');
          setImageError('Profile image is required');
          return false;
        }
        console.log('BasicInfo - Validation successful');
        return true;
      } catch (error) {
        console.error('BasicInfo - Validation failed:', error);
        return false;
      }
    },
    getFormData: () => {
      const values = form.getFieldsValue();
      console.log('BasicInfo - Getting form data:', values);
      const formData = {
        ...values,
        investorType: values.investorType || 'Angel Investor',
        startupStage: values.startupStage || 'Seed',
        experience: values.experience || '5'
      };
      console.log('BasicInfo - Returning form data with defaults:', formData);
      return formData;
    }
  }));

  return (
    <div className="px-10 mt-10">
      <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>

      <div className="flex justify-center mt-4 mb-4">
        <ProfileImageUpload onImageUpload={handleImageUpload} />
      </div>
      {imageError && (
        <p className="text-red-500 text-sm text-center mt-2">{imageError}</p>
      )}

      <Form
        form={form}
        layout="vertical"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
        onValuesChange={handleValuesChange}
        initialValues={{
          ...basicInfo,
          investorType: basicInfo.investorType || 'Angel Investor',
          startupStage: basicInfo.startupStage || 'Seed'
        }}
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
          <Input
            prefix={<UserOutlined />}
            placeholder="Enter your full name"
          />
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
          name="website"
          rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
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
          }
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
          <Input
            prefix={<MailOutlined />}
            placeholder="your@email.com"
            disabled
          />
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
              pattern: /^[0-9]{6,15}$/,
              message: 'Enter a valid phone number (6-15 digits)',
            },
          ]}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Enter your phone number"
          />
        </Form.Item>

        <Form.Item
          label="Preferred Startup Stage"
          name="startupStage"
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

BasicInfoForm.displayName = 'BasicInfoForm';
BasicInfoForm.propTypes = {
  onNext: PropTypes.func,
};
export default BasicInfoForm;