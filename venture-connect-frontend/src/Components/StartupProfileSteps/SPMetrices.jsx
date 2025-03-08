import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Form, InputNumber, Row } from 'antd';
import {
  faDollar,
  faDollarSign,
  faPercent,
} from '@fortawesome/free-solid-svg-icons';
import {
  DollarOutlined,
  PercentageOutlined,
} from '@ant-design/icons';

const SPMatrices = ({ form }) => {
  return (
    <>
      <Form form={form} layout="vertical" requiredMark="optional">
        {/* Key Metrics */}
        <p className="text-xl font-semibold text-gray-800">Key Metrics</p>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Monthly Recurring Revenue (MRR)"
              name="mrr"
              rules={[
                {
                  required: true,
                  type: 'number',
                  min: 1,
                  message: 'Please enter a valid MRR!',
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
                min={1}
                step={0.01}
                placeholder="Enter MRR"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Year-over-Year Growth"
              name="yoy"
              rules={[
                {
                  required: true,
                  type: 'number',
                  message: 'Please enter YoY growth!',
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
                step={0.01}
                placeholder="Enter YoY growth (%)"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
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
          </Col>
        </Row>
        {/* Financial Details */}
        <p className="text-xl font-semibold text-gray-800">Financial Details</p>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Current Valuation"
              name="crntValuation"
              rules={[
                {
                  required: true,
                  type: 'number',
                  min: 1,
                  message: 'Please enter a current valuation!',
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
                min={1}
                step={0.01}
                placeholder="Enter current valuation"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Investment Amount"
              name="invstAmount"
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

          <Col xs={24} sm={12} md={8}>
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

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Customer Acquisition Cost"
              name="cac"
              rules={[
                {
                  required: true,
                  type: 'number',
                  min: 0.01,
                  message: 'Please enter a valid Customer Acquisition Cost!',
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
                min={0.01}
                step={0.01}
                placeholder="Enter CAC"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Customer Lifetime Value"
              name="clv"
              rules={[
                {
                  required: true,
                  type: 'number',
                  min: 0.01,
                  message: 'Please enter a valid CLV!',
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
                min={0.01}
                step={0.01}
                placeholder="Enter CLV"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Monthly Burn Rate"
              name="mbr"
              rules={[
                {
                  required: true,
                  type: 'number',
                  message: 'Please enter your Monthly Burn Rate!',
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
                placeholder="Enter monthly burn rate"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
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
          </Col>

          <Col xs={24} sm={12} md={8}>
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
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default SPMatrices;
