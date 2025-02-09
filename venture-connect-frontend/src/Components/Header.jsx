import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });

      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-5 md:py-8">
      <div
        className={`max-w-7xl w-full mx-auto px-6 py-4 flex justify-between items-center rounded-full border border-gray-100/75 bg-white shadow-sm transition-all duration-300 ease-in-out ${isScrolled ? 'backdrop-blur-md bg-white/70 shadow-md' : 'bg-white shadow-sm'}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-5">
          <div className="object-fill w-10 h-10 rounded-full bg-gray-300 ">
            {/* <img src={Rocket} alt="logo" /> */}
          </div>
          <h1 className="text-lg font-semibold">Venture Connect</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 items-center">
          <button
            onClick={() => scrollToSection('home')}
            className="text-gray-600 hover:text-black"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="text-gray-600 hover:text-black"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('events')}
            className="text-gray-600 hover:text-black"
          >
            Events
          </button>
          <div>
            <Link
              to="/signin"
              onClick={() => {
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <button className="pe-8 py-2 text-gray-600 hover:text-black">
                Sign in
              </button>
            </Link>

            <Link
              to="/signup"
              onClick={() => {
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Signup
              </button>
            </Link>
          </div>
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
        className={`fixed top-24 w-[90%] rounded-md backdrop-blur-md bg-white/70 shadow-md flex flex-col items-center space-y-4 py-4 origin-top transform transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? 'scale-y-100 opacity-100'
            : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <button
          className="text-gray-600 hover:text-black"
          onClick={() => {
            scrollToSection('home');
            setIsOpen(false);
          }}
        >
          Home
        </button>
        <button
          className="text-gray-600 hover:text-black"
          onClick={() => {
            scrollToSection('features');
            setIsOpen(false);
          }}
        >
          Features
        </button>
        <button
          className="text-gray-600 hover:text-black"
          onClick={() => {
            scrollToSection('events');
            setIsOpen(false);
          }}
        >
          Events
        </button>
        <Link
          to="/signin"
          className="text-gray-600 hover:text-black"
          onClick={() => setIsOpen(false)}
        >
          Sign in
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setIsOpen(false)}
        >
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Header;
