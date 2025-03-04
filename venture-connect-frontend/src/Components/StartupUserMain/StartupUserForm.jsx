import React from 'react';
import { Form, Input, Row, Col, Card, Button, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const EditStartupProfile = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={24}>
        {/* Left Column - Basic Information */}
        <Col span={12}>
          <Card title="Basic Information" className="shadow-md rounded-lg">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Startup Logo" name="logo">
                  <Upload listType="picture-card">
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Upload Logo</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="startupName" label="Startup Name" rules={[{ required: true, message: 'Required' }]}> 
                  <Input placeholder="Enter startup name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="stage" label="Stage" rules={[{ required: true, message: 'Required' }]}> 
                  <Select placeholder="Select Stage">
                    <Option value="seed">Seed</Option>
                    <Option value="seriesA">Series A</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="industry" label="Industry" rules={[{ required: true, message: 'Required' }]}> 
                  <Select placeholder="Select Industry">
                    <Option value="technology">Technology</Option>
                    <Option value="healthcare">Healthcare</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Required' }]}> 
                  <Input placeholder="Enter location" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="website" label="Website URL"> 
                  <Input placeholder="Website URL" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="linkedin" label="LinkedIn URL"> 
                  <Input placeholder="LinkedIn URL" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="twitter" label="Twitter URL"> 
                  <Input placeholder="Twitter URL" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Right Column - Company Details */}
        <Col span={12}>
          <Card title="Company Details" className="shadow-md rounded-lg">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="domain" label="Domain" rules={[{ required: true, message: 'Required' }]}> 
                  <Input placeholder="Enter Domain" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="fundingStage" label="Funding Stage" rules={[{ required: true, message: 'Required' }]}> 
                  <Input placeholder="Seed, Series A, etc." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="valuation" label="Valuation ($M)" rules={[{ required: true, message: 'Required' }]}> 
                  <Input placeholder="Enter Valuation" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Required' }]}> 
                  <Input.TextArea placeholder="Brief Description" rows={3} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row justify="center" className="mt-4">
        <Button type="primary" htmlType="submit">Save Changes</Button>
      </Row>
    </Form>
  );
};

export default EditStartupProfile;
