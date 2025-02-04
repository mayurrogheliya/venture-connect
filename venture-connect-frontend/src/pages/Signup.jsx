import React from 'react';

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900">Sign Up</h2>
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
