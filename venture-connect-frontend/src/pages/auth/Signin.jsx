import { Link } from 'react-router-dom';
import signupImage from '../../assets/images/signupSIdeImage.png';

const Signin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 ">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row max-w-4xl w-full mt-[90px]">
        {/* Left Section - Form */}
        <div className="sm:w-1/2 w-full sm:pr-8 flex flex-col justify-center order-2 sm:order-1 max-w-xs sm:max-w-sm mx-auto">
          <form className="mt-6 space-y-4 sm:space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold text-sm sm:text-base">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 mt-1 sm:mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold text-sm sm:text-base">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 mt-1 sm:mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <button className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition text-sm sm:text-base">
              Sign In
            </button>
            <button className="w-full flex items-center justify-center bg-white border py-2 sm:py-3 rounded-lg mt-2 hover:bg-gray-100 transition font-semibold shadow-md text-sm sm:text-base">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/09/Google_Toolbar_logo.png"
                alt="Google Logo"
                className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
              />
              Continue with Google
            </button>

            {/* Register Link */}
            <p className="text-center text-gray-600 mt-3 sm:mt-4 font-medium text-sm sm:text-base">
              Don't have an account?
              <Link
                to="/signup"
                className="text-blue-600 hover:underline ml-1 font-semibold"
              >
                Register
              </Link>
            </p>
          </form>
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
    </div>
  );
};

export default Signin;
