import {
  UploadOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  BankOutlined,
  DeleteOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import {
  Typography,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Upload,
  Card,
  Slider,
  Table,
  Radio,
  message,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

const { Option } = Select;
const { Text } = Typography;
const domains = [
  'Technology',
  'Healthcare',
  'Fintech',
  'E-commerce',
  'AI/ML',
  'SaaS',
  'Clean Tech',
  'EdTech',
  'Others',
];

const StartupStages = [
  'Ideation',
  'Pre-Seed',
  'Seed',
  'Early',
  'Growth',
  'Expansion',
];

const formatInvestment = (value) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)}Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)}L`;
  } else if (value >= 1000) {
    return `₹${(value / 1000).toFixed(0)}K`;
  }
  return `₹${value}`;
};

const EditInvestorProfile = () => {
  const [form] = Form.useForm();
  const [investments, setInvestments] = useState([]);
  const [investmentRange, setInvestmentRange] = useState([20000, 200000000]);

  const handleSaveChanges = async () => {
    try {
      await form.validateFields(); // Validate all form fields
      message.success('Edit Successfull');
    } catch (errorInfo) {
      message.error('Please Add Required fields');
    }
  };

  const addInvestmentRow = () => {
    setInvestments([
      ...investments,
      { year: '', startup: '', domain: '', description: '' },
    ]);
  };

  const removeInvestmentRow = (index) => {
    const updatedInvestments = investments.filter((_, i) => i !== index);
    setInvestments(updatedInvestments);
  };

  const [profileImage, setProfileImage] = useState(null);
  const userName = 'Dhruv Burada'; // Can be dynamic if fetched from backend

  const handleImageUpload = (file) => {
    const isImage = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isImage) {
      message.error('Only JPG and PNG files are allowed!');
      return false;
    }
    const reader = new FileReader();
    reader.onload = (e) => setProfileImage(e.target.result);
    reader.readAsDataURL(file);

    return false; // Prevent default upload behavior
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  return (
    <div className="">
      <h1 className="text-xl font-bold mb-5">Edit Profile Information</h1>
      <Form form={form} layout="vertical">
        <Card title="Basic Information" className="shadow-md rounded-lg mb-3">
          {/* Profile Picture & Upload Controls */}
          <Row gutter={8} align="middle">
            <Col
              xs={24}
              md={3}
              className="flex flex-col items-center text-center"
            >
              <EditProfileImage image={profileImage} />
            </Col>

            <Col xs={24} md={18} className="flex flex-col gap-2">
              <p className="text-xl font-semibold">{userName}</p>
              <Upload
                maxCount={1}
                showUploadList={false}
                beforeUpload={handleImageUpload}
              >
                <Button type="primary" icon={<UploadOutlined />}>
                  Upload New Photo
                </Button>
              </Upload>
              <Button
                type="default"
                className="ml-2"
                onClick={handleRemoveImage}
              >
                Remove
              </Button>
              <p className="text-xs text-gray-500">
                Allowed formats: JPG, PNG. Max size: 5MB
              </p>
            </Col>
          </Row>

          {/* Form Fields */}
          <Row gutter={16} className="mt-4">
            <Col xs={24} md={12}>
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
            </Col>
            <Col xs={24} md={12}>
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
            </Col>
            <Col xs={24} md={12}>
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
            <Col xs={24} md={12}>
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
                      style={{ color: '#808080' }}
                    />
                  }
                  placeholder="Enter LinkedIn URL"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Enter valid email',
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="your@email.com" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Website"
                name="website"
                rules={[{ type: 'url', message: 'Enter a valid URL' }]}
              >
                <Input
                  prefix={<GlobalOutlined />}
                  placeholder="Enter Website URL"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Type of Investor"
                name="investorType"
                rules={[{ required: true, message: 'Select type' }]}
              >
                <Select placeholder="Select type">
                  <Option value="Angel Investor">Angel Investor</Option>
                  <Option value="Venture Capitalist">Venture Capitalist</Option>
                  <Option value="Private Equity Investor">
                    Private Equity (PE) Investor
                  </Option>
                  <Option value="Corporate Investor">
                    Corporate Investor (CVC)
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
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
            </Col>
          </Row>
        </Card>

        <div className="space-y-6 mb-3 mt-3">
          {/* Investment Preferences Section */}
          <Card title="Investment Preferences" className="shadow-md rounded-lg">
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Years of Experience"
                  name="experience"
                  rules={[
                    { required: true, message: 'Experience is required' },
                    { pattern: /^[0-9]+$/, message: 'Enter a valid number' },
                  ]}
                >
                  <Input
                    prefix={<ClockCircleOutlined />}
                    placeholder="Enter years"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Portfolio Companies"
                  name="portfolioCompanies"
                  rules={[
                    {
                      required: true,
                      message: 'Enter the number of companies',
                    },
                    {
                      pattern: /^[0-9]+$/,
                      message: 'Only numbers are allowed',
                    },
                  ]}
                >
                  <Input
                    prefix={<BankOutlined />}
                    placeholder="Number of companies"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Preferred Startup Stage"
                  name="startupStage"
                  rules={[{ required: true, message: 'Select startup stage' }]}
                >
                  <Select placeholder="Select stage">
                    {StartupStages.map((startupStage, index) => (
                      <Option value={startupStage} key={index}>
                        {startupStage}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Total Investments (₹)"
                  name="totalInvestment"
                  rules={[
                    {
                      required: true,
                      message: 'Enter total investment amount',
                    },
                    {
                      pattern: /^[0-9]+$/,
                      message: 'Only numbers are allowed',
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <FontAwesomeIcon
                        icon={faIndianRupeeSign}
                        size="sm"
                        style={{ marginRight: '5px', color: 'gray' }}
                      />
                    }
                    placeholder="Enter amount"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Interested Domains *"
                  name="interestedDomains"
                  rules={[
                    { required: true, message: 'Select at least one domain' },
                  ]}
                >
                  <Select mode="multiple" placeholder="Select domains">
                    {domains.map((domain) => (
                      <Option key={domain} value={domain}>
                        {domain}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Interested in Providing Mentorship?"
                  name="mentorship"
                  rules={[
                    { required: true, message: 'Please select your mentorship prefernces' },
                  ]}
                  >
                  <Radio.Group>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="Investment Range (₹20K - ₹20Cr+)"
                  name="investmentRange"
                >
                  <Slider
                    range
                    min={20000}
                    max={200000000}
                    step={10000}
                    defaultValue={investmentRange}
                    onChange={setInvestmentRange}
                    tooltip={{ formatter: formatInvestment }}
                  />
                  <Text>
                    Selected Range: {formatInvestment(investmentRange[0])} -{' '}
                    {formatInvestment(investmentRange[1])}
                  </Text>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* Previous Investments Section */}
        </div>
        <Table
          dataSource={investments}
          pagination={false}
          rowKey={(record, index) => index}
          scroll={{ x: 'max-content' }}
          columns={[
            {
              title: 'Year',
              dataIndex: 'year',
              key: 'year',
              width: 100,
              render: (_, record, index) => (
                <Form.Item
                  name={['investments', index, 'year']}
                  rules={[
                    { required: true, message: 'Year is required' },
                    {
                      pattern: /^\d{4}$/,
                      message: 'Enter a valid 4-digit year',
                    },
                  ]}
                >
                  <Input
                    placeholder="YYYY"
                    value={record.year}
                    onChange={(e) => {
                      const newData = [...investments];
                      const yearValue = e.target.value;
                      if (/^\d{0,4}$/.test(yearValue)) {
                        newData[index].year = yearValue;
                        setInvestments(newData);
                      }
                    }}
                  />
                </Form.Item>
              ),
            },
            {
              title: 'Startup Name',
              dataIndex: 'startup',
              key: 'startup',
              width: 200,
              ellipsis: true,
              render: (_, record, index) => (
                <Form.Item
                  name={['investments', index, 'startup']}
                  rules={[
                    { required: true, message: 'Startup Name is required' },
                  ]}
                >
                  <Input
                    placeholder="Startup name"
                    value={record.startup}
                    onChange={(e) => {
                      const newData = [...investments];
                      newData[index].startup = e.target.value;
                      setInvestments(newData);
                    }}
                  />
                </Form.Item>
              ),
            },
            {
              title: 'Domain',
              dataIndex: 'domain',
              key: 'domain',
              width: 150,
              ellipsis: true,
              render: (_, record, index) => (
                <Form.Item
                  name={['investments', index, 'domain']}
                  rules={[{ required: true, message: 'Domain is required' }]}
                >
                  <Input
                    placeholder="Domain"
                    value={record.domain}
                    onChange={(e) => {
                      const newData = [...investments];
                      newData[index].domain = e.target.value;
                      setInvestments(newData);
                    }}
                  />
                </Form.Item>
              ),
            },
            {
              title: 'Description',
              dataIndex: 'description',
              key: 'description',
              width: 250,
              ellipsis: true,
              render: (_, record, index) => (
                <Form.Item
                  name={['investments', index, 'description']}
                  rules={[
                    { required: true, message: 'Description is required' },
                  ]}
                >
                  <Input
                    placeholder="Brief description"
                    value={record.description}
                    onChange={(e) => {
                      const newData = [...investments];
                      const words = e.target.value.trim().split(/\s+/);
                      if (words.length <= 10) {
                        newData[index].description = e.target.value;
                        setInvestments(newData);
                      }
                    }}
                  />
                </Form.Item>
              ),
            },
            {
              title: 'Action',
              key: 'action',
              width: 80,
              fixed: 'right',
              render: (_, __, index) => (
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeInvestmentRow(index)}
                />
              ),
            },
          ]}
        />
        <Button
          type="dashed"
          className="mt-3"
          icon={<PlusOutlined />}
          onClick={addInvestmentRow}
          disabled={investments.length >= 6}
        >
          Add More
        </Button>
        <div className="flex justify-end mt-3 gap-2">
          <Button type="default">Cancel</Button>
          <Button type="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditInvestorProfile;

const EditProfileImage = ({ image }) => {
  return (
    <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center">
      {image ? (
        <img src={image} alt="Profile" className="w-full h-full object-cover" />
      ) : (
        <UserOutlined className="text-gray-400 text-3xl" />
      )}
    </div>
  );
};
