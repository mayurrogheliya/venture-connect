import { useEffect, useState } from 'react';
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
  Flex,
  Spin,
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
import {
  faDollarSign,
  faDollar,
  faPercent,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useStartupProfileStore } from '../../store/useStartupProfileStore';
import { startupAPI } from '../../api/endpoints/startup';

const { Option } = Select;
const MAX_CHAR = 500;

const EditStartupProfile = () => {
  const [form] = Form.useForm();
  const {
    loading,
    editingStartupProfile,
    setMode,
    setLoading,
    setEditingStartupProfile,
  } = useStartupProfileStore();
  const [formReady, setFormReady] = useState(false);
  useEffect(() => {
    if (editingStartupProfile) {
      const formattedData = {
        ...editingStartupProfile,
        basicInfo: {
          ...editingStartupProfile.basicInfo,
          startup_logo: editingStartupProfile.basicInfo?.startup_logo || null,
        },
        teamMembers: editingStartupProfile.team?.teamMember || [],
        team: {
          ...editingStartupProfile.team,
          founder_image: editingStartupProfile.team?.founder_image || null,
        },
      };
      form.setFieldsValue(formattedData);
      setFormReady(true);
    }
  }, [editingStartupProfile, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const formattedValues = {
        basicInfo: values.basicInfo,
        metrics: values.metrics,
        team: values.team,
        teamMembers: values.teamMembers || [],
      };

      console.log('formattedValues: ', formattedValues);
      if (editingStartupProfile) {
        const response = await startupAPI.updateStartupProfile(
          editingStartupProfile.userId,
          formattedValues,
        );
        message.success(
          response?.data?.message || 'Startup profile updated successfully',
        );
      } else {
        const response = await startupAPI.createStartupProfile(formattedValues);
        message.success(
          response?.data?.message || 'Transaction created successfully',
        );
      }
      setMode('table');
      setEditingStartupProfile(null);
    } catch (error) {
      console.log(error);
      message.error(error?.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
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
    <>
      {loading ? (
        <Flex gap="middle" vertical>
          <Spin tip="Loading..." size="large" />
        </Flex>
      ) : (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={24}>
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
                      label="Startup Image"
                      name={['basicInfo', 'startup_logo']}
                      className="flex justify-center"
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
                          const currentStartup =
                            form.getFieldValue('basicInfo') || {};
                          form.setFieldsValue({
                            basicInfo: {
                              ...currentStartup,
                              startup_logo: file,
                            },
                          });
                          return false;
                        }}
                      >
                        <div className="border-dashed border-2 rounded-full w-24 h-24 flex items-center justify-center cursor-pointer">
                          {formReady &&
                            (() => {
                              const startupImage = form.getFieldValue([
                                'basicInfo',
                                'startup_logo',
                              ]);
                              if (!startupImage) {
                                return (
                                  <UploadOutlined
                                    style={{ fontSize: 20, color: '#888' }}
                                  />
                                );
                              }

                              if (typeof startupImage === 'string') {
                                // Handle case where it's already a URL string
                                return (
                                  <img
                                    src={startupImage}
                                    alt="startup image"
                                    className="w-full h-full rounded-full object-cover"
                                  />
                                );
                              } else if (
                                startupImage instanceof File ||
                                startupImage instanceof Blob
                              ) {
                                // Handle case where it's a File/Blob object
                                return (
                                  <img
                                    src={URL.createObjectURL(startupImage)}
                                    alt="startup image"
                                    className="w-full h-full rounded-full object-cover"
                                  />
                                );
                              } else if (startupImage.url) {
                                // Handle case where it's an object with url property
                                return (
                                  <img
                                    src={startupImage.url}
                                    alt="startup image"
                                    className="w-full h-full rounded-full object-cover"
                                  />
                                );
                              }

                              return (
                                <UploadOutlined
                                  style={{ fontSize: 20, color: '#888' }}
                                />
                              );
                            })()}
                        </div>
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Startup Name"
                      name={['basicInfo', 'startup_name']}
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Input placeholder="Enter startup name" />
                    </Form.Item>
                  </Col>
                  <Col xl={12} sm={24} xs={24} md={24}>
                    <Form.Item
                      name={['basicInfo', 'stage']}
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
                      name={['basicInfo', 'industry']}
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
                      name={['basicInfo', 'location']}
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
                      name={['basicInfo', 'website']}
                      rules={[
                        { type: 'url', message: 'Enter valid website URL' },
                      ]}
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
                      name={['basicInfo', 'linkedin_url']}
                      rules={[
                        {
                          required: true,
                          message: 'LinkedIn profile is required',
                        },
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
                      name={['basicInfo', 'twitter_url']}
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Please enter your Twitter handle!',
                      //   },
                      //   {
                      //     pattern: /^@?(\w){4,15}$/,
                      //     message:
                      //       'Invalid Twitter username! Must be 4-15 chars (A-Z, 0-9, _).',
                      //   },
                      // ]}
                      // normalize={(value) =>
                      //   value && !value.startsWith('@') ? `@${value}` : value
                      // } // Auto-add "@" if missing
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
                    title="Founder Information"
                    className="shadow-md rounded-lg"
                    style={{ marginBottom: '10px' }}
                  >
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Founder Photo"
                          name={['team', 'founder_image']}
                          className="flex justify-center"
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
                              const currentTeam =
                                form.getFieldValue('team') || {};
                              form.setFieldsValue({
                                team: {
                                  ...currentTeam,
                                  founder_image: file,
                                },
                              });
                              return false;
                            }}
                          >
                            <div className="border-dashed border-2 rounded-full w-24 h-24 flex items-center justify-center cursor-pointer">
                              {console.log(
                                'befor image render ',
                                form.getFieldValue(['team', 'founder_image']),
                              )}
                              {formReady &&
                                (() => {
                                  const founderImage = form.getFieldValue([
                                    'team',
                                    'founder_image',
                                  ]);
                                  console.log(
                                    'current founder image',
                                    founderImage,
                                  );
                                  if (!founderImage) {
                                    return (
                                      <UploadOutlined
                                        style={{ fontSize: 20, color: '#888' }}
                                      />
                                    );
                                  }

                                  if (typeof founderImage === 'string') {
                                    // Handle case where it's already a URL string
                                    return (
                                      <img
                                        src={founderImage}
                                        alt="Founder"
                                        className="w-full h-full rounded-full object-cover"
                                      />
                                    );
                                  } else if (
                                    founderImage instanceof File ||
                                    founderImage instanceof Blob
                                  ) {
                                    // Handle case where it's a File/Blob object
                                    return (
                                      <img
                                        src={URL.createObjectURL(founderImage)}
                                        alt="Founder"
                                        className="w-full h-full rounded-full object-cover"
                                      />
                                    );
                                  } else if (founderImage.url) {
                                    // Handle case where it's an object with url property
                                    return (
                                      <img
                                        src={founderImage.url}
                                        alt="Founder"
                                        className="w-full h-full rounded-full object-cover"
                                      />
                                    );
                                  }

                                  return (
                                    <UploadOutlined
                                      style={{ fontSize: 20, color: '#888' }}
                                    />
                                  );
                                })()}
                            </div>
                          </Upload>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          label="Founder Name"
                          name={['team', 'founder_name']}
                          rules={[
                            {
                              required: true,
                              message: 'Founder name is required',
                            },
                          ]}
                        >
                          <Input placeholder="Enter founder's full name" />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          label="LinkedIn Profile"
                          name={['team', 'linkedin_profile']}
                          rules={[
                            {
                              required: true,
                              message: 'LinkedIn profile is required',
                            },
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
                          label="Founder Overview"
                          name={['team', 'overview']}
                          rules={[
                            {
                              required: true,
                              message: 'Founder overview is required',
                            },
                          ]}
                        >
                          <Input.TextArea
                            rows={3}
                            placeholder="Describe the founder's background and experience"
                            maxLength={300}
                            showCount
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                  <Card
                    className="w-full shadow-md rounded-lg"
                    title="Leadership Team"
                    style={{ marginBottom: '10px' }}
                  >
                    <Form.List name="teamMembers">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => {
                            const member = form.getFieldValue([
                              'teamMembers',
                              name,
                            ]);
                            return (
                              <Card
                                key={key}
                                className="mb-4 rounded-lg"
                                style={{ marginTop: '10px' }}
                              >
                                <Row
                                  gutter={24}
                                  align="middle"
                                  className="justify-between"
                                >
                                  <Col lg={4} md={24} sm={24} xs={24}>
                                    <Form.Item
                                      {...restField}
                                      name={[name, 'profile_image']}
                                      className="flex justify-center"
                                    >
                                      <Upload
                                        showUploadList={false}
                                        beforeUpload={(file) => {
                                          const isImage =
                                            file.type.startsWith('image/');
                                          if (!isImage) {
                                            message.error(
                                              'You can only upload image files (JPEG, PNG, etc.)!',
                                            );
                                            return Upload.LIST_IGNORE;
                                          }
                                          // Update the form with the new file
                                          const currentMembers =
                                            form.getFieldValue('teamMembers');
                                          currentMembers[name].profile_image =
                                            file;
                                          form.setFieldsValue({
                                            teamMembers: currentMembers,
                                          });
                                          return false; // Prevent automatic upload
                                        }}
                                      >
                                        <div className="border-dashed border-2 rounded-full w-24 h-24 flex items-center justify-center cursor-pointer">
                                          {member?.profile_image ? (
                                            typeof member.profile_image ===
                                            'string' ? (
                                              // If it's a string (URL), use it directly
                                              <img
                                                src={member.profile_image}
                                                alt="Profile"
                                                className="w-full h-full rounded-full object-cover"
                                              />
                                            ) : (
                                              // If it's a File object, create object URL
                                              <img
                                                src={URL.createObjectURL(
                                                  member.profile_image,
                                                )}
                                                alt="Profile"
                                                className="w-full h-full rounded-full object-cover"
                                              />
                                            )
                                          ) : (
                                            <UploadOutlined
                                              style={{
                                                fontSize: 20,
                                                color: '#888',
                                              }}
                                            />
                                          )}
                                        </div>
                                      </Upload>
                                    </Form.Item>
                                  </Col>

                                  <Col lg={18} md={24} sm={24} xs={24}>
                                    <Form.Item
                                      {...restField}
                                      name={[name, 'name']}
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            'Please enter the full name!',
                                        },
                                        {
                                          max: 50,
                                          message:
                                            'Name cannot exceed 50 characters!',
                                        },
                                      ]}
                                    >
                                      <Input placeholder="Full Name" />
                                    </Form.Item>

                                    <Form.Item
                                      {...restField}
                                      name={[name, 'position']}
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Please enter the position!',
                                        },
                                        {
                                          max: 50,
                                          message:
                                            'Position cannot exceed 50 characters!',
                                        },
                                      ]}
                                    >
                                      <Input placeholder="Position" />
                                    </Form.Item>

                                    <Form.Item
                                      {...restField}
                                      name={[name, 'bio']}
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            'Please enter a brief description!',
                                        },
                                        {
                                          max: 200,
                                          message:
                                            'Description cannot exceed 200 characters!',
                                        },
                                      ]}
                                    >
                                      <Input.TextArea
                                        placeholder="Brief description"
                                        rows={2}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Card>
                            );
                          })}
                          <Button
                            type="dashed"
                            icon={<PlusOutlined />}
                            className="w-full mt-2"
                            onClick={() => add()}
                          >
                            Add Member
                          </Button>
                        </>
                      )}
                    </Form.List>
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
                      name={['basicInfo', 'company_overview']}
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
                        name={['basicInfo', 'keyHighlight1']}
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
                        name={['basicInfo', 'keyHighlight2']}
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
                        name={['basicInfo', 'keyHighlight3']}
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
                          name={['metrics', 'investment_amount']}
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
                          name={['metrics', 'equity_offered']}
                          rules={[
                            {
                              required: true,
                              type: 'number',
                              min: 0.01,
                              max: 100,
                              message:
                                'Equity should be between 0.01% and 100%!',
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
                      name={['basicInfo', 'team_size']}
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
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Monthly Recurring Revenue (MRR)"
                      name={['metrics', 'mrr']}
                      rules={[
                        {
                          required: true,
                          message:
                            'Please enter the monthly recurring revenue!',
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
                      name={['metrics', 'total_funding']}
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
                      name={['metrics', 'annualRevenue']}
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
                      name={['metrics', 'cac']}
                      rules={[
                        {
                          required: true,
                          message:
                            'Please enter the customer acquisition cost!',
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
                      name={['metrics', 'monthly_burn_rate']}
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

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Year-over-Year Growth"
                      name={['metrics', 'yoy']}
                      rules={[
                        {
                          required: true,
                          type: 'number',
                          min: 0,
                          max: 100,
                          message: 'Please enter YoY growth!',
                        },
                      ]}
                    >
                      <InputNumber
                        prefix={<LineChartOutlined />}
                        placeholder="Enter amount"
                        style={{ width: '100%' }}
                        min={0}
                        max={100}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Current Valuation"
                      name={['metrics', 'current_valuation']}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter the current valuation!',
                        },
                        {
                          type: 'number',
                          min: 0,
                          message:
                            'Current valuation must be a positive number!',
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
                      name={['metrics', 'profitMargin']}
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
                      name={['metrics', 'ltv']}
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
            <Button type="default" className="mr-4">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Row>
        </Form>
      )}
    </>
  );
};

export default EditStartupProfile;
