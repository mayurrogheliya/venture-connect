import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Avatar, Dropdown, message, Spin } from 'antd';
import DefaultUser from '../assets/images/default-user.png';
import { useUserStore } from '../store/useUserStore';
import { authAPI } from '../api/endpoints/auth';

const AdminLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const { logout, loading, setLoading } = useUserStore();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await authAPI.logout();
      message.success(response?.data?.message || 'Logged out successfully');
    } catch (error) {
      message.error(
        error?.response?.data?.message || 'Logout failed. Please try again.',
      );
    } finally {
      setLoading(false);
      logout();
    }
  };

  const items = [
    {
      key: '2',
      label: (
        <button
          onClick={handleLogout}
          className="text-red-500 w-full text-left cursor-pointer"
        >
          Logout
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="w-full h-15 shadow-sm bg-white flex items-center justify-between px-4 lg:px-8 z-10">
        <NavLink to="/admin/users">
          <div className="text-xl font-semibold">
            Venture <span className="text-blue-500">Connect</span>
          </div>
        </NavLink>
        <nav className="hidden md:flex gap-8 font-semibold">
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `${
                isActive ? ' text-blue-500' : 'text-gray-600 hover:text-black'
              } transition-colors duration-200`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/admin/events"
            className={({ isActive }) =>
              `${
                isActive ? ' text-blue-500' : 'text-gray-600 hover:text-black'
              } transition-colors duration-200`
            }
          >
            Events
          </NavLink>
          <NavLink
            to="/admin/opportunities"
            className={({ isActive }) =>
              `${
                isActive ? ' text-blue-500' : 'text-gray-600 hover:text-black'
              } transition-colors duration-200`
            }
          >
            Opportunities
          </NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Dropdown menu={{ items }} trigger={['click']} arrow>
              <Avatar size={40} src={DefaultUser} className="cursor-pointer" />
            </Dropdown>
          </div>
          <button
            className="md:hidden bg-gray-200 py-1 px-3 rounded-md cursor-pointer hover:ring-1 hover:ring-black"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </header>

      {/* Overlay for closing sidebar on mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg w-64 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:hidden z-20 h-full flex flex-col`}
      >
        <div className="flex justify-between shadow-sm px-4 py-2 gap-3 items-center h-15">
          <NavLink to="/admin/users" onClick={closeMenu}>
            <p className="font-semibold">
              Venture <span className="text-blue-500">Connect</span>
            </p>
          </NavLink>
          <button
            className="bg-gray-200 px-3 py-1 rounded-md hover:ring-1 hover:ring-black hover:cursor-pointer md:hidden"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <nav className="flex flex-col my-4 px-4 font-semibold">
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `py-2 px-4 rounded ${
                isActive
                  ? ' text-blue-500'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              } transition-colors duration-200`
            }
            onClick={closeMenu}
          >
            Users
          </NavLink>
          <NavLink
            to="/admin/events"
            className={({ isActive }) =>
              `py-2 px-4 rounded ${
                isActive
                  ? ' text-blue-500'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              } transition-colors duration-200`
            }
            onClick={closeMenu}
          >
            Events
          </NavLink>
          <NavLink
            to="/admin/opportunities"
            className={({ isActive }) =>
              `py-2 px-4 rounded ${
                isActive
                  ? ' text-blue-500'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              } transition-colors duration-200`
            }
            onClick={closeMenu}
          >
            Opportunities
          </NavLink>
        </nav>
        <div className="mt-auto p-4">
          <Dropdown menu={{ items }} trigger={['click']} arrow>
            <Avatar size={50} src={DefaultUser} className="cursor-pointer" />
          </Dropdown>
        </div>
      </div>

      {/* Page Content */}
      {loading ? (
        <Spin tip="Loading..." size="large" fullscreen />
      ) : (
        <main className="flex-1 bg-white overflow-y-auto py-5 px-4 lg:px-8">
          <Outlet />
        </main>
      )}
    </div>
  );
};

export default AdminLayout;
