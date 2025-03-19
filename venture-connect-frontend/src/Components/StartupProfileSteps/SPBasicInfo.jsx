import { UploadOutlined } from '@ant-design/icons';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Form, Input, InputNumber, Row, Select, Upload } from 'antd';
import { IoLocationOutline } from 'react-icons/io5';
import { TbWorld } from 'react-icons/tb';
import { message } from 'antd';

const SPBasicInfo = ({ form }) => {
  const { Dragger } = Upload;
  const MAX_CHAR = 500;
  const MAX_WORDS = 100;

  const StartupStages = [
    'Ideation',
    'Pre-Seed',
    'Seed',
    'Early',
    'Growth',
    'Expansion',
  ];

  const IndustryNames = [
    'Technology & Software',
    'E-Commerce & Retail',
    'FinTech (Financial Technology)',
    'HealthTech & MedTech',
    'EdTech (Education Technology)',
    'AgriTech (Agriculture Technology)',
    'PropTech (Real Estate Technology)',
    'GreenTech & Sustainability',
    'Mobility & Transportation',
    'Entertainment & Media',
    'HRTech & WorkTech',
    'LegalTech',
    'SpaceTech',
    'FoodTech',
    'Travel & Hospitality',
  ];

  return (
    <Form form={form} layout="vertical" requiredMark="optional">
      <p className="text-xl font-semibold text-gray-800">Basic Information</p>
      <div className="flex justify-between my-5 gap-5 flex-col md:flex-row flex-wrap">
        <Form.Item name={['basicInfo', 'startup_logo']}>
          {/* Upload Section */}
          <Dragger
            name={['basicInfo', 'startupLogo']}
            className="flex-1 min-h-full flex flex-col items-center justify-center p-5"
            multiple={false} // Prevents multiple file uploads
            maxCount={1} // Allows only one file at a time
            beforeUpload={() => false}
            onChange={(info) => {
              const file = info.file;
              form.setFieldsValue({
                basicInfo: {
                  startup_logo: file.name, // Set only the file name
                },
              });
            }}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined style={{ color: 'gray', fontSize: 40 }} />
            </p>
            <p className="ant-upload-text">Upload your startup logo</p>
            <p className="ant-upload-hint">PNG, JPG up to 5MB</p>
          </Dragger>
        </Form.Item>
        {/* Basic Info Inputs */}
        <div className="flex-1">
          <Form.Item
            label="Startup Name"
            name={['basicInfo', 'startup_name']}
            rules={[
              { required: true, message: 'Please enter your startup name!' },
            ]}
          >
            <Input placeholder="Enter Startup Name" />
          </Form.Item>

          <Form.Item
            label="Location"
            name={['basicInfo', 'location']}
            rules={[{ required: true, message: 'Please enter your location!' }]}
          >
            <Input
              prefix={
                <IoLocationOutline
                  size="16"
                  style={{ marginRight: '5px', color: 'gray' }}
                />
              }
              placeholder="Enter Location"
            />
          </Form.Item>

          <Form.Item
            label="Website"
            name={['basicInfo', 'website']}
            rules={[{ type: 'url', message: 'Please enter a valid URL!' }]}
          >
            <Input
              prefix={
                <TbWorld
                  size="18"
                  style={{ marginRight: '5px', color: 'gray' }}
                />
              }
              placeholder="Enter Website URL"
            />
          </Form.Item>
        </div>
      </div>

      {/* Company Details */}
      <p className="text-xl font-semibold text-gray-800">Company Details</p>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Stage"
            name={['basicInfo', 'stage']}
            rules={[{ required: true, message: 'Please select your stage!' }]}
          >
            <Select showSearch placeholder="Select stage">
              {StartupStages.map((stg, index) => (
                <Select.Option key={index} value={stg}>
                  {stg}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Industry"
            name={['basicInfo', 'industry']}
            rules={[
              { required: true, message: 'Please select industry name!' },
            ]}
          >
            <Select showSearch placeholder="Select industry">
              {IndustryNames.map((ind, index) => (
                <Select.Option key={index} value={ind}>
                  {ind}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Team Size"
            name={['basicInfo', 'team_size']}
            rules={[
              {
                required: true,
                type: 'number',
                min: 1,
                message: 'Team size must be at least 1!',
              },
            ]}
          >
            <InputNumber
              min={1}
              placeholder="Number of employees"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Social Profiles */}
      <p className="text-xl font-semibold text-gray-800">Social Profiles</p>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="LinkedIn Profile"
            name={['basicInfo', 'linkedin_url']}
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
              placeholder="https://www.linkedin.com/"
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Twitter Handle"
            name={['basicInfo', 'twitter_url']}
            // rules={[
            //   {
            //     pattern: /^@?(\w){4,15}$/,
            //     message:
            //       'Invalid Twitter username! Must be 4-15 chars (A-Z, 0-9, _).',
            //   },
            // ]}
            // normalize={(value) =>
            //   value && !value.startsWith('@') ? `@${value}` : value
            // }
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
        </Col>
      </Row>

      {/* Overview */}
      <p className="text-xl font-semibold text-gray-800">Overview</p>
      <Form.Item
        label="Company Overview"
        name={['basicInfo', 'company_overview']}
        rules={[
          { required: true, message: 'Please enter company overview!' },
          { max: MAX_CHAR, message: `Maximum ${MAX_CHAR} characters allowed!` },
          {
            validator: (_, value) => {
              if (value) {
                const words = value.trim().split(/\s+/).length;
                if (words > MAX_WORDS) {
                  return Promise.reject(`Maximum ${MAX_WORDS} words allowed!`);
                }
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input.TextArea
          placeholder="Describe your startup..."
          rows={4}
          showCount
          maxLength={MAX_CHAR}
        />
      </Form.Item>

      {/* Key Highlights */}
      <p className="text-xl font-semibold text-gray-800">Key Highlights</p>
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Form.Item
            label="Key Highlight 1"
            name={['basicInfo', 'keyHighlight1']}
            rules={[
              {
                required: true,
                message: 'Please enter key highlight 1!',
              },
            ]}
          >
            <Input maxLength={30} placeholder="Enter key highlight 1..." />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item
            label="Key Highlight 2"
            name={['basicInfo', 'keyHighlight2']}
            rules={[
              {
                required: true,
                message: 'Please enter key highlight 2!',
              },
            ]}
          >
            <Input maxLength={30} placeholder="Enter key highlight 2..." />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item
            label="Key Highlight 3"
            name={['basicInfo', 'keyHighlight3']}
            rules={[
              {
                required: true,
                message: 'Please enter key highlight 3!',
              },
            ]}
          >
            <Input maxLength={30} placeholder="Enter key highlight 3..." />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SPBasicInfo;
