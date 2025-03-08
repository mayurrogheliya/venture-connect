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
  InputNumber,
} from 'antd';
import {
  GlobalOutlined,
  EnvironmentOutlined,
  UploadOutlined,
  PlusOutlined,
  DollarOutlined,
  PercentageOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileImageUpload from '../Forms/Controls/ProfileImageUpload';
import {
  faDollarSign,
  faDollar,
  faPercent,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

const { Option } = Select;
const MAX_CHAR = 500;

const EditStartupProfile = () => {
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [imageError, setImageError] = useState('');
  const [team, setTeam] = useState([
    { id: 1, name: '', position: '', description: '', photo: null },
  ]);

  // Handle profile image upload
  const handleImageUpload = (id, file) => {
    setTeam((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, photo: file } : member,
      ),
    );
  };

  const handleInputChange = (id, field, value) => {
    setTeam((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, [field]: value } : member,
      ),
    );
  };

  const addTeamMember = () => {
    setTeam((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: '',
        position: '',
        description: '',
        photo: null,
      },
    ]);
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
      <Row gutter={24} className="px-12 py-12">
        {/* Left Column - Basic Information */}
        <Col span={12} xs={24} md={12}>
          <Card
            title="Basic Information"
            className="shadow-md rounded-lg"
            style={{ marginBottom: '10px' }}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Startup Logo"
                  name="logo"
                  rules={[{ required: true, message: 'Please upload a logo' }]}
                >
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
              <Col xl={12} sm={24} xs={24} md={24}> 
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
              <Col xl={12} sm={24} xs={24} md={24}>
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
                  name="website"
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

          <Row>
            <Col span={24}>
              <Card
                className="w-full shadow-md rounded-lg"
                title="Leadership Team"
                style={{ marginBottom: '10px' }}
              >
                {team.map((member) => (
                  <Card
                    key={member.id}
                    className="mb-4  rounded-lg"
                    style={{ marginTop: '10px' }}
                  >
                    <Row gutter={24} align="middle" className="justify-between">
                      {/* Profile Photo Upload */}
                      <Col lg={4} md={24} sm={24} xs={24} >
                      <Form.Item
              
                      name={`profile-${member.id}`}
                      rules={[{ required: true, message: 'Please profile image' }]}
                      className='flex justify-center'
                      >
                      <Upload
                          showUploadList={false}
                          beforeUpload={(file) => {
                            const isImage = file.type.startsWith('image/');
                            if (!isImage) {
                              message.error(
                                'You can only upload image files (JPEG, PNG, etc.)!',
                              );
                              return Upload.LIST_IGNORE; 
                            }
                            handleImageUpload(member.id, file);
                            return false;
                          }}
                        >
                          <div className="border-dashed border-2 rounded-full w-24 h-24 flex items-center justify-center cursor-pointer">
                            {member.photo ? (
                              <img
                                src={URL.createObjectURL(member.photo)}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <UploadOutlined
                                style={{ fontSize: 20, color: '#888' }}
                              />
                            )}
                          </div>
                        </Upload>

                      </Form.Item>
                                             </Col>

                      {/* Member Details */}
                      <Col lg={18} md={24} sm={24} xs={24}  className="flex-row gap-3 flex-wrap">
                        {/* Full Name */}
                        <Form.Item
                          name={`name_${member.id}`} 
                          rules={[
                            {
                              required: true,
                              message: 'Please enter the full name!',
                            },
                            {
                              max: 50,
                              message: 'Name cannot exceed 50 characters!',
                            },
                          ]}
                          style={{ marginBottom: '8px' }}
                        >
                          <Input
                            placeholder="Full Name"
                            value={member.name}
                            onChange={(e) =>
                              handleInputChange(
                                member.id,
                                'name',
                                e.target.value,
                              )
                            }
                          />
                        </Form.Item>

                        {/* Position */}
                        <Form.Item
                          name={`position_${member.id}`} 
                          rules={[
                            {
                              required: true,
                              message: 'Please enter the position!',
                            },
                            {
                              max: 50,
                              message: 'Position cannot exceed 50 characters!',
                            },
                          ]}
                          style={{ marginBottom: '8px' }}
                        >
                          <Input
                            placeholder="Position"
                            value={member.position}
                            onChange={(e) =>
                              handleInputChange(
                                member.id,
                                'position',
                                e.target.value,
                              )
                            }
                          />
                        </Form.Item>

                        {/* Brief Description */}
                        <Form.Item
                          name={`description_${member.id}`} 
                          rules={[
                            {
                              required: true,
                              message: 'Please enter a brief description!',
                            },
                            {
                              max: 200,
                              message:
                                'Description cannot exceed 200 characters!',
                            },
                          ]}
                          style={{ marginBottom: '8px' }}
                        >
                          <Input.TextArea
                            placeholder="Brief description"
                            value={member.description}
                            onChange={(e) =>
                              handleInputChange(
                                member.id,
                                'description',
                                e.target.value,
                              )
                            }
                            rows={2}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}

                {/* Add Member Button */}
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  className="w-full mt-2"
                  onClick={addTeamMember}
                >
                  Add Member
                </Button>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Right Column - Company Details */}
        <Col span={12} xs={24} md={12}>
          <Card
            title="Company Details"
            className="shadow-md rounded-lg"
            style={{ marginBottom: '10px' }}
          >
            <Row gutter={16}>
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
              <Row gutter={16} className="w-full">
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
                  <Col xl={12} sm={24} xs={24} md={24}>
                    <Form.Item
                      label="Investment Amount"
                      name="invstAmount"
                      minValue={0}
                      rules={[
                        {
                          required: true,
                          type: 'number',
                          message: 'Please enter minimum investment amount',
                        },
                      ]}
                    >
                      <InputNumber
                        prefix={
                          <FontAwesomeIcon
                            icon={faDollarSign}
                            size="18"
                            style={{ marginRight: '5px', color: 'gray' }}
                          />
                        }
                        min={0}
                        step={0.01}
                        placeholder="Enter investment amount"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xl={12} sm={24} xs={24} md={24}>
                    <Form.Item
                      label="Equity Offered"
                      name="equityOffered"
                      rules={[
                        {
                          required: true,
                          type: 'number',
                          min: 0.01,
                          max: 100,
                          message: 'Equity should be between 0.01% and 100%!',
                        },
                      ]}
                    >
                      <InputNumber
                        prefix={
                          <FontAwesomeIcon
                            icon={faPercent}
                            size="18"
                            style={{ marginRight: '5px', color: 'gray' }}
                          />
                        }
                        min={0.01}
                        max={100}
                        step={0.01}
                        placeholder="Enter Equity (%)"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
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
                    prefix={
                      <FontAwesomeIcon
                        icon={faUsers}
                        size="18"
                        style={{ marginRight: '5px', color: 'gray' }}
                      />
                    }
                    min={1}
                    placeholder="Number of employees"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card
            className="w-full shadow-md rounded-lg mt-4"
            title="Financial Metrics"
          >
            <Row gutter={[16, 16]}>
              {/* Left Column */}
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Monthly Recurring Revenue (MRR)"
                  name="monthlyRecurringRevenue"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the monthly recurring revenue!',
                    },
                    {
                      type: 'number',
                      min: 0,
                      message:
                        'Monthly recurring revenue must be a positive number!',
                    },
                  ]}
                >
                  <InputNumber
                    prefix={<DollarOutlined />}
                    placeholder="Enter MRR"
                    style={{ width: '100%' }}
                    min={0}
                    step={0.01} // Allows decimal values
                  />
                </Form.Item>

                <Form.Item
                  label="Amount Raised"
                  name="amountRaised"
                  rules={[
                    {
                      required: true,
                      type: 'number',
                      min: 0,
                      message: 'Please enter funding raised!',
                    },
                  ]}
                >
                  <InputNumber
                    prefix={
                      <FontAwesomeIcon
                        icon={faDollar}
                        size="18"
                        style={{ marginRight: '5px', color: 'gray' }}
                      />
                    }
                    min={0}
                    step={0.01}
                    placeholder="Total funding raised"
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                <Form.Item
                  label="Annual Revenue"
                  name="annualRevenue"
                  prefix={<DollarOutlined />}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the annual revenue!',
                    },
                    {
                      type: 'number',
                      min: 0,
                      message: 'Annual revenue must be a positive number!',
                    },
                  ]}
                >
                  <InputNumber
                    prefix={<DollarOutlined />}
                    placeholder="Enter annual revenue"
                    style={{ width: '100%' }}
                    min={0}
                    step={0.01} // Allows decimal values
                  />
                </Form.Item>

                <Form.Item
                  label="Customer Acquisition Cost (CAC)"
                  name="customerAcquisitionCost"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the customer acquisition cost!',
                    },
                    {
                      type: 'number',
                      min: 0,
                      message:
                        'Customer acquisition cost must be a positive number!',
                    },
                  ]}
                >
                  <InputNumber
                    prefix={<DollarOutlined />}
                    placeholder="Enter customer acquisition cost"
                    style={{ width: '100%' }}
                    min={0}
                    step={0.01} // Allows decimal values
                  />
                </Form.Item>

                <Form.Item
                  label="Burn Rate"
                  name="burnRate"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the burn rate!',
                    },
                    {
                      type: 'number',
                      min: 0,
                      message: 'Burn rate must be a positive number!',
                    },
                  ]}
                >
                  <InputNumber
                    prefix={<DollarOutlined />}
                    placeholder="Enter burn rate per month"
                    style={{ width: '100%' }}
                    min={0}
                    step={0.01}
                  />
                </Form.Item>
              </Col>

              {/* Right Column */}
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Year-over-Year Growth"
                  name="yoy"
                  rules={[
                    {
                      required: true,
                      type: 'number',
                      min: 0,
                      message: 'Please enter YoY growth!',
                    },
                  ]}
                >
                  <Input
                    prefix={<LineChartOutlined />}
                    placeholder="Enter amount"
                  />
                </Form.Item>

                <Form.Item
                  label="Current Valuation"
                  name="currentValuation"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the current valuation!',
                    },
                    {
                      type: 'number',
                      min: 0,
                      message: 'Current valuation must be a positive number!',
                    },
                  ]}
                >
                  <InputNumber
                    prefix={<DollarOutlined />}
                    placeholder="Enter current valuation"
                    style={{ width: '100%' }}
                    min={0}
                    step={0.01}
                  />
                </Form.Item>

                <Form.Item
                  label="Profit Margin (%)"
                  name="profitMargin"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the profit margin!',
                    },
                    {
                      type: 'number',
                      min: 0,
                      max: 100,
                      message: 'Profit margin must be between 0% and 100%!',
                    },
                  ]}
                >
                  <InputNumber
                    prefix={<PercentageOutlined />}
                    placeholder="Enter profit margin (%)"
                    style={{ width: '100%' }}
                    min={0}
                    max={100}
                    step={0.01}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace('%', '')}
                  />
                </Form.Item>

                <Form.Item
                  label="Lifetime Value (LTV)"
                  name="lifetimeValue"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the lifetime value!',
                    },
                    {
                      type: 'number',
                      min: 0,
                      message: 'Lifetime value must be a positive number!',
                    },
                  ]}
                >
                  <InputNumber
                    prefix={<DollarOutlined />}
                    placeholder="Enter lifetime value"
                    style={{ width: '100%' }}
                    min={0}
                    step={0.01}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row justify="end" className="mt-4 mr-12">
        <Button type='default' className='mr-4'>Cancel</Button>
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Row>
    </Form>
  );
};

export default EditStartupProfile;
