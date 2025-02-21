import { Button, Card, Col, Form, Input, Row, Upload } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const SPTeam = ({ form }) => {
  const { Dragger } = Upload;
  const [teamMembers, setTeamMembers] = useState([0, 1, 2]);

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, teamMembers.length]);
  };
  return (
    <>
      <Form form={form} layout="vertical" requiredMark="optional">
        <p className="text-xl font-semibold text-gray-800">
          Founder Information
        </p>
        <div className="flex justify-between my-5 gap-5 flex-col md:flex-row flex-wrap">
          <Dragger className="flex-1 min-h-full flex flex-col items-center justify-center p-5">
            <p className="ant-upload-drag-icon">
              <FontAwesomeIcon
                icon={faUserTie}
                style={{ color: 'gray', fontSize: 40 }}
              />
            </p>
            <p className="ant-upload-text">Upload founder photo</p>
            <p className="ant-upload-hint">PNG, JPG up to 5MB</p>
            <button
              type="button"
              className="mt-3 p-2 border border-gray-300 text-gray-600 font-normal rounded-lg cursor-pointer"
            >
              Choose File
            </button>
          </Dragger>

          <div className="flex-1">
            <Form.Item
              label="Founder Name"
              name="founderName"
              rules={[
                {
                  required: true,
                  message: 'Please enter your founder name!',
                },
              ]}
            >
              <Input placeholder="Enter founder name" />
            </Form.Item>

            <Form.Item
              label="LinkedIn Profile"
              name="founderLinkedin"
              rules={[
                {
                  required: true,
                  type: 'url',
                  message: 'Please enter a valid URL!',
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
                placeholder="Founder LinkedIn URL"
              />
            </Form.Item>

            <Form.Item
              label="Founder Overview"
              name="founderOverview"
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
        <Row gutter={[16, 16]} className="my-5">
          {teamMembers.map((index) => (
            <Col xs={24} md={8} key={index}>
              <Card bordered={true}>
                <Form.Item name={`image${index}`}>
                  <Dragger className="flex-1 min-h-full flex flex-col items-center justify-center p-5">
                    <p className="ant-upload-drag-icon">
                      <FontAwesomeIcon
                        icon={faUserTie}
                        style={{ color: 'gray', fontSize: 25 }}
                      />
                    </p>
                    <button
                      type="button"
                      className="p-2 border border-gray-300 text-gray-600 font-normal rounded-lg cursor-pointer"
                    >
                      Upload Image
                    </button>
                  </Dragger>
                </Form.Item>

                <Form.Item
                  name={`name${index}`}
                  rules={[
                    { required: true, message: 'Please enter member name' },
                  ]}
                >
                  <Input placeholder="Team member name" />
                </Form.Item>

                <Form.Item
                  name={`position${index}`}
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
                  name={`bio${index}`}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter member brief bio',
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Brief bio..." rows={3} />
                </Form.Item>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="flex justify-start">
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={addTeamMember}
            className="w-full md:w-auto"
          >
            Add Team Member
          </Button>
        </div>
      </Form>
    </>
  );
};

export default SPTeam;
