import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faBars,
  faRocket,
  faUserGroup,
  faLightbulb,
  faMessage,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Avatar, Dropdown } from 'antd';
import DefaultUser from '../assets/images/default-user.png';

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);
  };

  const items = [
    {
      key: '1',
      label: <NavLink to="/profile">Profile</NavLink>,
    },
    {
      key: '2',
      label: <NavLink to="/change-password">Change Password</NavLink>,
    },
    {
      key: '3',
      label: <NavLink to="/">Logout</NavLink>,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="absolute md:hidden bg-slate-300/15 h-min w-full flex justify-end items-center px-2 py-2 shadow-sm">
        <button
          className="size-fit float-end z-20 bg-gray-200 py-1 px-3 rounded-md hover:ring-1 hover:ring-black"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 md:w-60 overflow-y-auto bg-white shadow-lg z-30 lg:relative lg:w-64 w-60 flex flex-col h-screen transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block`}
      >
        <div className="flex flex-col h-full">
          <div>
            <div className="flex justify-between shadow-sm p-4 py-2 md:py-4 gap-3 items-center">
              <div className="w-full md:text-xl font-semibold px-4">
                <div>
                  Venture <span className="text-blue-500">Connect</span>
                </div>
              </div>
              <button
                className="bg-gray-200 px-3 py-1 rounded-md hover:ring-1 hover:ring-black hover:cursor-pointer md:hidden"
                onClick={toggleSidebar}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className="flex flex-col my-4 space-y-2 px-4">
              <NavLink
                to="/startups-hub"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 rounded ${
                    isActive
                      ? ' text-blue-500'
                      : 'text-gray-700 hover:bg-gray-100'
                  } transition-colors duration-200 font-semibold`
                }
              >
                <FontAwesomeIcon icon={faRocket} transform="rotate-315" />
                Startups Hub
              </NavLink>
              <NavLink
                to="/investor-network"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 rounded ${
                    isActive
                      ? 'bg-sky-700 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  } transition-colors duration-200 font-semibold`
                }
              >
                <FontAwesomeIcon icon={faUserGroup} />
                Investor Network
              </NavLink>
              <NavLink
                to="/"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 rounded ${
                    isActive
                      ? 'bg-sky-700 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  } transition-colors duration-200 font-semibold`
                }
              >
                <FontAwesomeIcon icon={faLightbulb} />
                Opportunities
              </NavLink>
              <NavLink
                to="/"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 rounded ${
                    isActive
                      ? 'bg-sky-700 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  } transition-colors duration-200 font-semibold`
                }
              >
                <FontAwesomeIcon icon={faMessage} />
                Messages
              </NavLink>
              <NavLink
                to="/"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 rounded ${
                    isActive
                      ? 'bg-sky-700 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  } transition-colors duration-200 font-semibold`
                }
              >
                <FontAwesomeIcon icon={faBookmark} />
                Bookmarks
              </NavLink>
            </nav>
          </div>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      <main className="flex-1 bg-neutral-50 overflow-y-auto md:ml-60 lg:ml-0 md:mt-0">
        {/* Fixed Navigation Bar */}
        <div className="hidden md:flex fixed top-0 left-0 w-full h-15 shadow-md bg-white items-center justify-end px-6 z-10">
          <Dropdown menu={{ items }} trigger={['click']} arrow>
            <Avatar size={50} src={DefaultUser} className="cursor-pointer" />
          </Dropdown>
        </div>

        {/* Page Content */}
        <div className="mt-20 mb-10 px-10 p-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
