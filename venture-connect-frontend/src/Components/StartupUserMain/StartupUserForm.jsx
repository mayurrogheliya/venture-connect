import { useState } from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Card,
  Button,
  Upload,
  Select,
  message,
} from 'antd';
import {
  UploadOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileImageUpload from '../Forms/Controls/ProfileImageUpload';

const { Option } = Select;
const MAX_CHAR = 500;
const MAX_WORDS = 100;

const EditStartupProfile = () => {
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [imageError, setImageError] = useState('');

  // Handle profile image upload
  const handleImageUpload = (image) => {
    setProfileImage(image);
    setImageError('');
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

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
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={24}>
        {/* Left Column - Basic Information */}
        <Col span={12}>
          <Card title="Basic Information" className="shadow-md rounded-lg">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Startup Logo" name="logo">
                  <ProfileImageUpload onImageUpload={handleImageUpload} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="startupName"
                  label="Startup Name"
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Input placeholder="Enter startup name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="stage"
                  label="Stage"
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Select placeholder="Select Stage">
                    {StartupStages.map((stage) => (
                      <Option key={stage} value={stage}>
                        {stage}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="industry"
                  label="Industry"
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Select placeholder="Select Industry">
                    {IndustryNames.map((industry) => (
                      <Option key={industry} value={industry}>
                        {industry}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
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
                  <Input
                    prefix={<EnvironmentOutlined />}
                    placeholder="City, Country"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Website"
                  name="Website"
                  rules={[{ type: 'url', message: 'Enter valid website URL' }]}
                >
                  <Input
                    prefix={<GlobalOutlined />}
                    placeholder="https://www.your-website.com"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
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
              </Col>
              <Col span={24}>
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
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Right Column - Company Details */}
        {/* <Col span={12}>
          <Card title="Company Details" className="shadow-md rounded-lg">
            <Row gutter={16}>
              <Col span={24}>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Overview of Startup"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input.TextArea
                      placeholder="Describe your startup..."
                      rows={4}
                      showCount
                      maxLength={MAX_CHAR}
                    />
                  </Form.Item>
                </Col>
                <Row gutter={16}>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      label="Key Highlight 1"
                      name="keyHighlight1"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter key highlight 1!',
                        },
                        {
                          pattern: /^(\b\w+\b\s*){1,10}$/,
                          message: 'Maximum 10 words allowed!',
                        },
                      ]}
                    >
                      <Input
                        maxLength={100}
                        placeholder="Enter key highlight 1..."
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={8}>
                    <Form.Item
                      label="Key Highlight 2"
                      name="keyHighlight2"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter key highlight 2!',
                        },
                        {
                          pattern: /^(\b\w+\b\s*){1,10}$/,
                          message: 'Maximum 10 words allowed!',
                        },
                      ]}
                    >
                      <Input
                        maxLength={100}
                        placeholder="Enter key highlight 2..."
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={8}>
                    <Form.Item
                      label="Key Highlight 3"
                      name="keyHighlight3"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter key highlight 3!',
                        },
                        {
                          pattern: /^(\b\w+\b\s*){1,10}$/,
                          message: 'Maximum 10 words allowed!',
                        },
                      ]}
                    >
                      <Input
                        maxLength={100}
                        placeholder="Enter key highlight 3..."
                      />
                    </Form.Item>
                  </Col>
                </Row>
                
                <Col span={12}>
                <Form.Item
                  name="investmentRequired"
                  label="Investment Required ($)"
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Input placeholder="Enter amount" />
                </Form.Item>
                </Col>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="equityOffered"
                  label="Equity Offered (%)"
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Input placeholder="Enter percentage" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="teamSize"
                  label="Team Size"
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Input placeholder="Enter team size" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col> */}

<Col span={12}>
          <Card title="Company Details" className="shadow-md rounded-lg">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="description" label="Overview of Startup" rules={[{ required: true, message: 'Required' }]}>
                  <Input.TextArea placeholder="Describe your startup..." rows={4} showCount maxLength={MAX_CHAR} />
                </Form.Item>
              </Col>
              <Row gutter={16} className='w-full'>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      label="Key Highlight 1"
                      name="keyHighlight1"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter key highlight 1!',
                        },
                        {
                          pattern: /^(\b\w+\b\s*){1,10}$/,
                          message: 'Maximum 10 words allowed!',
                        },
                      ]}
                    >
                      <Input
                        maxLength={100}
                        placeholder="Enter key highlight 1..."
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={8}>
                    <Form.Item
                      label="Key Highlight 2"
                      name="keyHighlight2"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter key highlight 2!',
                        },
                        {
                          pattern: /^(\b\w+\b\s*){1,10}$/,
                          message: 'Maximum 10 words allowed!',
                        },
                      ]}
                    >
                      <Input
                        maxLength={100}
                        placeholder="Enter key highlight 2..."
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={8}>
                    <Form.Item
                      label="Key Highlight 3"
                      name="keyHighlight3"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter key highlight 3!',
                        },
                        {
                          pattern: /^(\b\w+\b\s*){1,10}$/,
                          message: 'Maximum 10 words allowed!',
                        },
                      ]}
                    >
                      <Input
                        maxLength={100}
                        placeholder="Enter key highlight 3..."
                      />
                    </Form.Item>
                  </Col>
                </Row>

              <Col span={24}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="investmentRequired" label="Investment Required ($)" rules={[{ required: true, message: 'Required' }]}>
                      <Input placeholder="Enter amount" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="equityOffered" label="Equity Offered (%)" rules={[{ required: true, message: 'Required' }]}>
                      <Input placeholder="Enter percentage" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Form.Item name="teamSize" label="Team Size" rules={[{ required: true, message: 'Required' }]}>
                  <Input placeholder="Enter team size" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row justify="center" className="mt-4">
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Row>
    </Form>
  );
};

export default EditStartupProfile;
