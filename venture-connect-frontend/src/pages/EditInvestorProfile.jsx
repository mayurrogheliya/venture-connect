import { UploadOutlined, UserOutlined, PhoneOutlined, MailOutlined, GlobalOutlined, DollarOutlined, ApartmentOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Upload, Card, Slider, Table, Radio } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import ProfileImageUpload from '../Components/Forms/Controls/ProfileImageUpload';
import { useState } from 'react';

const { Option } = Select;

const EditInvestorProfile = () => {
  const [investments, setInvestments] = useState([]);

  // Function to Add New Row
  const addInvestmentRow = () => {
    setInvestments([...investments, { year: "", startup: "", domain: "", description: "" }]);
  };

  // Function to Remove Row
  const removeInvestmentRow = (index) => {
    const updatedInvestments = investments.filter((_, i) => i !== index);
    setInvestments(updatedInvestments);
  };

  return (
    <div className='bg-[#e5eeee] text-xl font-bold'>
      <h1>Edit Profile Information</h1>
      <Card title="Basic Information" className="shadow-md rounded-lg">
        <Form layout="vertical">
          {/* Profile Picture & Upload Controls */}
          <Row gutter={16} align="middle">
            {/* Profile Picture */}
            <Col xs={24} md={6} className="flex flex-col items-center text-center">
              <ProfileImageUpload />
            </Col>

            {/* Name & Upload Controls */}
            <Col xs={24} md={18}>
              <p className="text-xl font-semibold">Dhruv Burada</p>
              <Upload maxCount={1} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Upload New Photo</Button>
              </Upload>
              <Button type="text" danger className="ml-2">
                Remove
              </Button>
              <p className="text-xs text-gray-500">Allowed formats: JPG, PNG. Max size: 5MB</p>
            </Col>
          </Row>

          {/* Form Fields */}
          <Row gutter={16} className="mt-4">
            <Col xs={24} md={12}>
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: 'Enter Full Name' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter Full Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Enter Phone Number' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Without country code" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Location" name="location">
                <Input placeholder="Enter Location" defaultValue="Rajkot, India" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="LinkedIn Profile"
                name="linkedin"
                rules={[
                  { required: true, message: 'LinkedIn profile is required' },
                  { pattern: /^https:\/\/www\.linkedin\.com\//, message: 'Enter a valid LinkedIn URL' },
                ]}
              >
                <Input prefix={<FontAwesomeIcon icon={faLinkedin} style={{ color: '#0e76a8' }} />} placeholder="Enter LinkedIn URL" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: 'email', message: 'Enter valid email' }]}
              >
                <Input prefix={<MailOutlined />} placeholder="your@email.com" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Website" name="website" rules={[{ type: 'url', message: 'Enter a valid URL' }]}>
                <Input prefix={<GlobalOutlined />} placeholder="Enter Website URL" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Type of Investor" name="investorType" rules={[{ required: true, message: 'Select type' }]}>
                <Select placeholder="Select type">
                  <Option value="Angel Investor">Angel Investor</Option>
                  <Option value="Venture Capitalist">Venture Capitalist</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Twitter Handle"
                name="twitter"
                rules={[
                  { required: true, message: 'Enter Twitter handle' },
                  { pattern: /^@?(\w){4,15}$/, message: 'Invalid handle (4-15 chars, A-Z, 0-9, _)' },
                ]}
              >
                <Input prefix={<FontAwesomeIcon icon={faTwitter} style={{ color: '#1DA1F2' }} />} placeholder="@username" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <div className="space-y-6">
        {/* Investment Preferences Section */}
        <Card title="Investment Preferences" className="shadow-md rounded-lg">
          <Form layout="vertical">
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Years of Experience" name="experience" rules={[{ required: true, message: "Enter years of experience" }]}>
                  <Input prefix={<UserOutlined />} placeholder="Enter years of experience" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Portfolio Companies" name="portfolioCompanies">
                  <Input prefix={<ApartmentOutlined />} placeholder="Number of Portfolio Companies" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Preferred Startup Stage" name="startupStage" rules={[{ required: true, message: "Select startup stage" }]}>
                  <Select placeholder="Select stage">
                    <Option value="Seed">Seed</Option>
                    <Option value="Series A">Series A</Option>
                    <Option value="Series B">Series B</Option>
                    <Option value="Growth">Growth</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Total Investments" name="totalInvestments">
                  <Input prefix={<DollarOutlined />} placeholder="Enter total investments" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Interested Domains" name="domains">
                  <Input prefix={<GlobalOutlined />} placeholder="Enter domains (e.g., AI, FinTech)" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Interested in Providing Mentorship?" name="mentorship">
                  <Radio.Group>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item label="Investment Range ($)">
                  <Slider min={0} max={1000000} step={10000} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        {/* Previous Investments Section */}
        <Card title="Previous Investments" className="shadow-md rounded-lg">
          <Table
            dataSource={investments}
            pagination={false}
            rowKey={(record, index) => index}
            columns={[
              {
                title: "Year",
                dataIndex: "year",
                key: "year",
                render: (_, record, index) => (
                  <Input
                    placeholder="YYYY"
                    value={record.year}
                    onChange={(e) => {
                      const newData = [...investments];
                      newData[index].year = e.target.value;
                      setInvestments(newData);
                    }}
                  />
                ),
              },
              {
                title: "Startup Name",
                dataIndex: "startup",
                key: "startup",
                render: (_, record, index) => (
                  <Input
                    placeholder="Startup name"
                    value={record.startup}
                    onChange={(e) => {
                      const newData = [...investments];
                      newData[index].startup = e.target.value;
                      setInvestments(newData);
                    }}
                  />
                ),
              },
              {
                title: "Domain",
                dataIndex: "domain",
                key: "domain",
                render: (_, record, index) => (
                  <Input
                    placeholder="Domain"
                    value={record.domain}
                    onChange={(e) => {
                      const newData = [...investments];
                      newData[index].domain = e.target.value;
                      setInvestments(newData);
                    }}
                  />
                ),
              },
              {
                title: "Description",
                dataIndex: "description",
                key: "description",
                render: (_, record, index) => (
                  <Input
                    placeholder="Brief description"
                    value={record.description}
                    onChange={(e) => {
                      const newData = [...investments];
                      newData[index].description = e.target.value;
                      setInvestments(newData);
                    }}
                  />
                ),
              },
              {
                title: "Action",
                key: "action",
                render: (_, record, index) => (
                  <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeInvestmentRow(index)} />
                ),
              },
            ]}
          />
          <Button type="dashed" className="mt-3" icon={<PlusOutlined />} onClick={addInvestmentRow}>
            Add More
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default EditInvestorProfile;