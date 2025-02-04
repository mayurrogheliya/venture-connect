import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl w-full mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-lg font-semibold">Venture Connect</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-black">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-black">
            Features
          </a>
          <a href="#" className="text-gray-600 hover:text-black">
            Events
          </a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link to="/signin">
            <button className="px-4 py-2 text-gray-600 hover:text-black">
              Sign in
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Signup
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu with Smooth Transition */}
      <div
        className={`fixed top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 origin-top transform transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? 'scale-y-100 opacity-100'
            : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <a
          href="#"
          className="text-gray-600 hover:text-black"
          onClick={() => setIsOpen(false)}
        >
          Home
        </a>
        <a
          href="#"
          className="text-gray-600 hover:text-black"
          onClick={() => setIsOpen(false)}
        >
          Features
        </a>
        <a
          href="#"
          className="text-gray-600 hover:text-black"
          onClick={() => setIsOpen(false)}
        >
          Events
        </a>
        <button
          className="text-gray-600 hover:text-black"
          onClick={() => setIsOpen(false)}
        >
          Sign in
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setIsOpen(false)}
        >
          Signup
        </button>
      </div>
    </nav>
  );
};

export default Header;
