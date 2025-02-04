import React from 'react';

const Signin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-2xl max-w-4xl w-full p-8">
        <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
      </div>
      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
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
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition">
          Sign In
        </button>
        <button className="w-full flex items-center justify-center bg-white border py-2 rounded-lg mt-2 hover:bg-gray-100 transition">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google Logo"
            className="h-5 w-5 mr-2"
          />
          Continue with Google
        </button>
        <p className="text-gray-600 mt-4 text-center">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signin;
