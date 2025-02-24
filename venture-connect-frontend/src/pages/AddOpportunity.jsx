import { useState } from 'react';
import {
  Form,
  Input,
  Select,
  Radio,
  Button,
  Typography,
  Card,
  Row,
  Col,
  Slider,
  Space,
} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AddOpportunity = () => {
  const interestedDomains = [
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

  const [investmentRange, setInvestmentRange] = useState([20000, 200000000]);

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

  return (
    <div>
      <Row gutter={[20, 20]} justify="center">
        <Col xs={24} lg={16}>
          {/* Left Side: Form Container */}
          <div
            style={{
              padding: '30px',
              borderRadius: '10px',
              background: '#fff',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Heading */}
            <Title level={3}>
              Create Pitch <span style={{ color: '#1677ff' }}>Opportunity</span>
            </Title>
            <Text>
              Fill in the details below to create a new pitch event for
              startups.
            </Text>

            <Form layout="vertical" style={{ marginTop: '20px' }}>
              {/* Pitch Name */}
              <Form.Item
                label="Name of Pitch Event"
                name="pitchName"
                rules={[
                  { required: true, message: 'This field is required' },
                  { max: 30, message: 'Cannot exceed 30 characters' },
                ]}
              >
                <Input
                  placeholder="e.g. Tech Startup Pitch 2024"
                  maxLength={30}
                />
              </Form.Item>

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

              {/* Interested Domain */}
              <Form.Item
                label="Interested Domain"
                name="domain"
                rules={[{ required: true, message: 'Please select a domain' }]}
              >
                <Select placeholder="Select domain" showSearch>
                  {interestedDomains.map((domain) => (
                    <Select.Option key={domain} value={domain}>
                      {domain}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Preferred Startup Stage */}
              <Form.Item
                label="Preferred Startup Stage"
                name="stage"
                rules={[{ required: true, message: 'Please select a stage' }]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="seed">Seed Stage</Radio>
                    <Radio value="early">Early Stage</Radio>
                    <Radio value="growth">Growth Stage</Radio>
                    <Radio value="seriesA">Series A</Radio>
                    <Radio value="seriesB">Series B and Above</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>

              {/* Description */}
              <Form.Item
                label="Description of the Event"
                name="description"
                rules={[
                  { required: true, message: 'Description is required' },
                  {
                    max: 150,
                    message: 'Must be a short one-line description (~20 words)',
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Describe your pitch event, requirements, and what you're looking for..."
                  rows={2}
                  maxLength={150}
                />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full mt-3"
                >
                  Publish Opportunity
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>

        <Col xs={24} lg={8}>
          {/* Right Side: Guidelines */}
          <Card
            style={{
              borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Title level={4} style={{ marginBottom: 16 }}>
              Guidelines
            </Title>
            {[
              'Be specific about investment criteria',
              'Clearly state the stage preferences',
              'Include all relevant deadlines',
              'Specify any industry restrictions',
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <InfoCircleOutlined
                  style={{ color: '#1677ff', fontSize: 16 }}
                />
                <Text>{item}</Text>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddOpportunity;
