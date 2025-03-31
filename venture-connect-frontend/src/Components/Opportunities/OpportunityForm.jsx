import { useState, useEffect } from 'react';
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
import { formatAmount } from '../../utils/formatUtils';

const { Title, Text } = Typography;
const OpportunityForm = ({ initialData, onSubmit, isEdit }) => {
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

  const [form] = Form.useForm();
  const [investmentRange, setInvestmentRange] = useState([20000, 200000000]);

  useEffect(() => {
    if (isEdit && initialData) {
      form.setFieldsValue({
        ...initialData,
        investmentRange: [initialData.mininvestment, initialData.maxinvestment],
      });

      setInvestmentRange([
        initialData.mininvestment,
        initialData.maxinvestment,
      ]);
    }
  }, [initialData, isEdit, form]);

  const handleSubmit = (values) => {
    const data = {
      name: values.name,
      domain: values.domain,
      mininvestment: investmentRange[0],
      maxinvestment: investmentRange[1],
      startupstage: values.startupstage,
      description: values.description,
    };

    onSubmit(data);
  };

  return (
    <div>
      <Row gutter={[20, 20]} justify="center">
        <Col xs={24} lg={16}>
          <div
            style={{
              padding: '30px',
              borderRadius: '10px',
              background: '#fff',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Title level={3}>
              {isEdit ? 'Edit' : 'Create'} Pitch{' '}
              <span style={{ color: '#1677ff' }}>Opportunity</span>
            </Title>
            <Text>
              {isEdit
                ? 'Modify the details of your pitch event.'
                : 'Fill in the details below to create a new pitch event for startups.'}
            </Text>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              style={{ marginTop: '20px' }}
            >
              <Form.Item
                label="Name of Pitch Event"
                name="name"
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
                <div>
                  <Slider
                    range
                    min={20000}
                    max={200000000}
                    step={10000}
                    value={investmentRange}
                    onChange={setInvestmentRange}
                    tooltip={{ formatter: formatAmount }}
                  />
                  <Text>
                    Selected Range: {formatAmount(investmentRange[0])} -{' '}
                    {formatAmount(investmentRange[1])}
                  </Text>
                </div>
              </Form.Item>

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

              <Form.Item
                label="Preferred Startup Stage"
                name="startupstage"
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
                  placeholder="Describe your pitch event..."
                  rows={2}
                  maxLength={150}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full mt-3"
                >
                  {isEdit ? 'Update Opportunity' : 'Publish Opportunity'}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>

        <Col xs={24} lg={8}>
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

export default OpportunityForm;
