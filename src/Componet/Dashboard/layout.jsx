import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Body from './body';
import Sidebar from './sidebar';
import useStore from '../../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

function Layout() {
  const { admin, setAdmin, AdminNav } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAdmin(true);
    }
  }, [admin]);

  const handleLogout = () => {
    setAdmin(false);
    localStorage.removeItem('token');
    navigate('/Auth');
  };

  // Get page title based on AdminNav
  const getPageTitle = () => {
    return AdminNav.charAt(0).toUpperCase() + AdminNav.slice(1) || 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Enhanced Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {getPageTitle()}
            </h1>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                <div className="relative">
                  <FontAwesomeIcon icon={faBell} className="text-xl" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </div>
              </button>

              {/* User Menu */}
              <div className="relative group">
                <button className="flex items-center space-x-3 focus:outline-none">
                  <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Admin</span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Body />
        </main>
      </div>
    </div>
  );
}

export default Layout;