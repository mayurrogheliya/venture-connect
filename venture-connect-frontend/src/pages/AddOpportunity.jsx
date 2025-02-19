import React from 'react';
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
} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const AddOpportunity = () => {
  return (
    <div
      style={{
        padding: '40px',
        minHeight: '100vh',
        // backgroundColor: '#f5f5f5',
      }}
    >
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
              <Form.Item label="Name of Pitch Event">
                <Input placeholder="e.g. Tech Startup Pitch 2024" />
              </Form.Item>

              {/* Interested Domain */}
              <Form.Item label="Interested Domain">
                <Select placeholder="Select domain">
                  <Option value="tech">Tech</Option>
                  <Option value="finance">Finance</Option>
                  <Option value="health">Health</Option>
                </Select>
              </Form.Item>

              {/* Preferred Startup Stage */}
              <Form.Item label="Preferred Startup Stage">
                <Radio.Group
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
                >
                  <Radio value="seed">Seed Stage</Radio>
                  <Radio value="early">Early Stage</Radio>
                  <Radio value="growth">Growth Stage</Radio>
                  <Radio value="seriesA">Series A</Radio>
                  <Radio value="seriesB">Series B and Above</Radio>
                </Radio.Group>
              </Form.Item>

              {/* Description */}
              <Form.Item label="Description of the Event">
                <Input.TextArea
                  placeholder="Describe your pitch event, requirements, and what you're looking for..."
                  rows={4}
                />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  type="primary"
                  style={{ backgroundColor: '#1677ff', width: '100%' }}
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
