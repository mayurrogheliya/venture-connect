import { Form, Input, Button, Select, message, Spin } from 'antd';
import signupImage from '../../assets/images/signupSIdeImage.png';
import { useUserStore } from '../../store/useUserStore';
import { usersAPI } from '../../api/endpoints/users';
import { Link, useNavigate } from 'react-router-dom';

const { Option } = Select;
const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { loading, setLoading } = useUserStore();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await usersAPI.register(values);
      console.log('response:', response);
      message.success(response?.data?.message || 'Register Success');
      navigate('/signin');
    } catch (error) {
      message.error(error?.response?.data?.message || 'Registration Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        {loading ? (
          <Spin tip="Loading..." size="large" fullscreen />
        ) : (
          <div className="p-8 flex flex-col md:flex-row max-w-4xl w-full mt-[90px]">
            {/* Left Section - Form */}
            <div className="md:w-1/2 w-full md:pr-6 md:order-1 order-2">
              <h2 className="text-3xl font-bold text-gray-900">
                Where <span className="text-blue-500">Innovation</span> Meets{' '}
                <span className="text-blue-600">Investment</span>
              </h2>
              <p className="text-gray-600 mt-2 mb-2.5">
                Sign up to connect with top investors and promising startups.
                Take the first step toward growth and success!
              </p>
              <Form
                form={form}
                layout="vertical"
                className="mt-6 space-y-4"
                onFinish={onFinish}
              >
                <Form.Item
                  className="font-bold"
                  label="Are you an Investor or a Startup?"
                  name="user_type"
                  rules={[
                    { required: true, message: 'Please select an option!' },
                  ]}
                >
                  <Select placeholder="Select your role">
                    <Option value="investor">Investor</Option>
                    <Option value="startup">Startup</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Email Address"
                  className="font-bold"
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email!' },
                    {
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Please enter a valid email address!',
                    },
                  ]}
                >
                  <Input placeholder="Enter your email address" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  className="font-bold"
                  name="password"
                  rules={[
                    { required: true, message: 'Please enter your password!' },
                    {
                      pattern:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        'Password must be at least 8 characters long and contain at least one letter, one number, and one special character!',
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  className="font-bold"
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('Passwords do not match!'),
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm your password" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="w-full">
                    Signup
                  </Button>
                </Form.Item>

                 {/* Login Link */}
            <p className="text-center text-gray-600 mt-3 sm:mt-4 font-medium text-sm sm:text-base">
              Don&#39;t have an account?
              <Link
                to="/signin"
                className="text-blue-600 hover:underline ml-1 font-semibold"
              >
                Register
              </Link>
            </p>
              </Form>
            </div>

            {/* Right Section - Illustration */}
            <div className="md:w-1/2 w-full flex items-center justify-center p-6 md:order-2 order-1">
              <img
                src={signupImage}
                alt="Signup Illustration"
                className="w-full min-h-full object-cover rounded-2xl hidden sm:block sm:w-3/4 xs:w-1/2 xs:hidden"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Signup;
