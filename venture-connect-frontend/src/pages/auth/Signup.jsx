import signupImage from '../../assets/images/signupSIdeImage.png';

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6 mt-[40px]">
      <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col md:flex-row max-w-4xl w-full">
        {/* Left Section - Form */}
        <div className="md:w-1/2 w-full md:pr-6 md:order-1 order-2">
          <h2 className="text-3xl font-bold text-gray-900">
            Where <span className="text-blue-500">Innovation</span> Meets{' '}
            <span className="text-blue-600">Investment</span>
          </h2>
          <p className="text-gray-600 mt-2">
            Sign up to connect with top investors and promising startups. Take
            the first step toward growth and success!
          </p>
          <form className="mt-6 space-y-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition">
              Signup
            </button>
            <button className="w-full flex items-center justify-center bg-white border py-2 rounded-lg mt-2 hover:bg-gray-100 transition">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                alt="Google Logo"
                className="h-5 w-5 mr-2"
              />
              Continue with Google
            </button>
          </form>
        </div>

        {/* Right Section - Illustration */}
        <div className="md:w-1/2 w-full flex items-center justify-center p-6 md:order-2 order-1">
          <img
            src={signupImage}
            alt="Signup Illustration"
            className="w-full min-h-full object-cover rounded-2xl hidden sm:block"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
