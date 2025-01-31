import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg rounded-2xl p-8 mx-4 md:mx-10 my-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        {/* Left Section */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="text-blue-500">⚡</span> Venture Connect
          </h2>
          <p className="text-gray-500 mt-2">
            Follow us and never miss an update on the latest productivity
            trends, tools, and insights.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-gray-600">
            <i className="fa-brands fa-x-twitter text-xl cursor-pointer hover:text-gray-900"></i>
            <i className="fa-brands fa-linkedin text-xl cursor-pointer hover:text-gray-900"></i>
            <i className="fa-brands fa-facebook text-xl cursor-pointer hover:text-gray-900"></i>
            <i className="fa-brands fa-instagram text-xl cursor-pointer hover:text-gray-900"></i>
          </div>
        </div>

        {/* Middle Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-gray-700 font-semibold">Menu</h3>
          <ul className="mt-2 space-y-2">
            <li className="text-gray-500 hover:text-gray-800 cursor-pointer">
              Benefits
            </li>
            <li className="text-gray-500 hover:text-gray-800 cursor-pointer">
              How-it-Works
            </li>
            <li className="text-gray-500 hover:text-gray-800 cursor-pointer">
              Events
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-gray-700 font-semibold">Contact</h3>
          <ul className="mt-2 space-y-2 text-gray-500">
            <li className="hover:text-gray-800 cursor-pointer">
              support@VentureConnect.com
            </li>
            <li className="hover:text-gray-800 cursor-pointer">
              +91-8488997323
            </li>
            <li className="hover:text-gray-800 cursor-pointer">
              Rajkot, Gujarat, IN
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 mt-6 pt-4 text-center text-gray-500 text-sm">
        © 2025 Venture Connect. All rights reserved.
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-gray-800">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-800">
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
