import { Button, Card, Col, Form, Input, Row, Upload } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const SPTeam = ({ form }) => {
  const { Dragger } = Upload;

  return (
    <>
      <Form form={form} layout="vertical" requiredMark="optional">
        <p className="text-xl font-semibold text-gray-800">
          Founder Information
        </p>
        <div className="flex justify-between my-5 gap-5 flex-col md:flex-row flex-wrap">
          <Form.Item
            name={['team', 'founderImage']}
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload
              name="founderImage"
              listType="picture"
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload Founder Image</Button>
            </Upload>
          </Form.Item>

          <div className="flex-1">
            <Form.Item
              label="Founder Name"
              name={['team', 'founder_name']}
              rules={[
                { required: true, message: 'Please enter founder name!' },
              ]}
            >
              <Input placeholder="Enter founder name" />
            </Form.Item>

            <Form.Item
              label="LinkedIn Profile"
              name={['team', 'linkedin_profile']}
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
                placeholder="https://www.linkedin.com/"
              />
            </Form.Item>

            <Form.Item
              label="Founder Overview"
              name={['team', 'overview']}
              rules={[
                { required: true, message: 'Please enter founder overview!' },
              ]}
            >
              <Input.TextArea
                placeholder="Brief overview about the founder..."
                rows={4}
              />
            </Form.Item>
          </div>
        </div>

        <p className="text-xl font-semibold text-gray-800">Team Members</p>
        <Form.List name="teamMembers">
          {(fields, { add, remove }) => (
            <>
              <Row gutter={[16, 16]} className="my-5">
                {fields.map(({ key, name, ...restField }, index) => (
                  <Col xs={24} md={8} key={key}>
                    <Card variant="outlined">
                      <Form.Item
                        {...restField}
                        name={[name, 'profile_image']}
                        valuePropName="fileList"
                        getValueFromEvent={(e) => e.fileList}
                      >
                        <Upload
                          name="profile_image"
                          listType="picture-card"
                          beforeUpload={() => false}
                          maxCount={1}
                        >
                          <div>
                            <FontAwesomeIcon
                              icon={faUserTie}
                              style={{ color: 'gray', fontSize: 25 }}
                            />
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </div>
                        </Upload>
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter member name',
                          },
                        ]}
                      >
                        <Input placeholder="Team member name" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'position']}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter member position',
                          },
                        ]}
                      >
                        <Input placeholder="Member position" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'bio']}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter member brief bio',
                          },
                        ]}
                      >
                        <Input.TextArea placeholder="Brief bio..." rows={3} />
                      </Form.Item>

                      <Button
                        icon={<DeleteOutlined />}
                        danger
                        size="small"
                        onClick={() => remove(name)}
                      >
                        Delete
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
              <div className="flex justify-start">
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={() => add()}
                  className="w-full md:w-auto"
                >
                  Add Team Member
                </Button>
              </div>
            </>
          )}
        </Form.List>
      </Form>
    </>
  );
};

export default SPTeam;
