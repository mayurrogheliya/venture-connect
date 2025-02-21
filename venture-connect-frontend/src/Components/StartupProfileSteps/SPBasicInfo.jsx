import { UploadOutlined } from '@ant-design/icons';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Form, Input, InputNumber, Row, Select, Upload } from 'antd';
import { IoLocationOutline } from 'react-icons/io5';
import { TbWorld } from 'react-icons/tb';

const SPBasicInfo = ({ form }) => {
  const { Dragger } = Upload;
  const StartupStages = [
    'Ideation',
    'Pre-Seed ',
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
    <>
      <Form form={form} layout="vertical" requiredMark="optional">
        <p className="text-xl font-semibold text-gray-800">Basic Information</p>
        <div className="flex justify-between my-5 gap-5 flex-col md:flex-row flex-wrap">
          <Dragger className="flex-1 min-h-full flex flex-col items-center justify-center p-5">
            <p className="ant-upload-drag-icon">
              <UploadOutlined style={{ color: 'gray', fontSize: 40 }} />
            </p>
            <p className="ant-upload-text">Upload your startup logo</p>
            <p className="ant-upload-hint">PNG, JPG up to 5MB</p>
          </Dragger>

          <div className="flex-1">
            <Form.Item
              label="Startup Name"
              name="startupName"
              rules={[
                {
                  required: true,
                  message: 'Please enter your startup name!',
                },
              ]}
            >
              <Input placeholder="Enter Startup Name" />
            </Form.Item>

            <Form.Item
              label="Location"
              name="location"
              rules={[
                { required: true, message: 'Please enter your location!' },
              ]}
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
              name="website"
              rules={[
                {
                  required: true,
                  type: 'url',
                  message: 'Please enter a valid URL!',
                },
              ]}
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
              name="stage"
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
              name="industry"
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
              name="teamSize"
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
              name="linkedin"
              rules={[
                {
                  required: true,
                  type: 'url',
                  message: 'Please enter a valid URL!',
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
                placeholder="Enter LinkedIn Profile URL"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Twitter Profile"
              name="twitter"
              rules={[
                {
                  required: true,
                  type: 'url',
                  message: 'Please enter a valid URL!',
                },
              ]}
            >
              <Input
                prefix={
                  <FontAwesomeIcon
                    icon={faTwitter}
                    size="18"
                    style={{ marginRight: '5px', color: 'gray' }}
                  />
                }
                placeholder="Enter Twitter Profile URL"
              />
            </Form.Item>
          </Col>
        </Row>
        {/* Overview */}
        <p className="text-xl font-semibold text-gray-800">Overview</p>
        <Form.Item
          label="Company Overview"
          name="companyOverview"
          rules={[
            { required: true, message: 'Please enter company overview!' },
          ]}
        >
          <Input.TextArea placeholder="Describe your startup..." rows={4} />
        </Form.Item>
        <Form.Item
          label="Key Highlights"
          name="keyHighlights"
          rules={[{ required: true, message: 'Please enter key highlights!' }]}
        >
          <Input.TextArea placeholder="Enter key highlights..." rows={4} />
        </Form.Item>
      </Form>
    </>
  );
};

export default SPBasicInfo;
