import { Form, Input, Button, message, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import signupImage from '../../assets/images/signupSIdeImage.png';
import { useUserStore } from '../../store/useUserStore';
import { authAPI } from '../../api/endpoints/auth';
import { useEffect } from 'react';

const Signin = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { loading, setLoading, login, isAuthenticated, user } = useUserStore();

  useEffect(() => {
    if (isAuthenticated) {
      console.log('Authenticated', isAuthenticated);
      if (user?.user_type === 'startup') {
        navigate(
          user.isProfileCompleted
            ? '/startups-hub'
            : '/complete-startup-profile',
        );
      } else if (user?.user_type === 'investor') {
        navigate(
          user.isProfileCompleted
            ? '/investor-network'
            : '/complete-investor-profile',
        );
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await authAPI.login(values);
      console.log(response);
      const { user, accessToken } = response.data;
      login(user, accessToken);
      message.success(response?.message || 'Login Success');

      if (user.user_type === 'startup') {
        navigate(
          user.isProfileCompleted
            ? '/startups-hub'
            : '/complete-startup-profile',
        );
      } else if (user.user_type === 'investor') {
        navigate(
          user.isProfileCompleted
            ? '/investor-network'
            : '/Registered-Startups',
        );
      } else {
        navigate('/signin');
      }
    } catch (error) {
      message.error(error?.response?.data?.message || 'Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
      {loading ? (
        <Spin tip="Loading..." size="large" fullscreen />
      ) : (
        <div className="p-6 sm:p-10 flex flex-col sm:flex-row max-w-4xl w-full mt-[90px]">
          {/* Left Section - Form */}
          <div className="sm:w-1/2 w-full sm:pr-8 flex flex-col justify-center order-2 sm:order-1 max-w-xs sm:max-w-sm mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
              Unlock <span className="text-blue-500">connections</span>, seize{' '}
              <span className="text-blue-600">opportunities</span>.
            </h2>

            <Form
              form={form}
              layout="vertical"
              className="mt-6 space-y-4 sm:space-y-6"
              onFinish={onFinish}
            >
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

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            {/* Register Link */}
            <p className="text-center text-gray-600 mt-3 sm:mt-4 font-medium text-sm sm:text-base">
              Don&#39;t have an account?
              <Link
                to="/signup"
                className="text-blue-600 hover:underline ml-1 font-semibold"
              >
                Register
              </Link>
            </p>
          </div>

          {/* Right Section - Illustration */}
          <div className="sm:w-1/2 w-full flex items-center justify-center p-6 order-1 sm:order-2">
            <img
              src={signupImage}
              alt="Signup Illustration"
              className="w-full h-auto object-cover rounded-2xl hidden sm:block"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
