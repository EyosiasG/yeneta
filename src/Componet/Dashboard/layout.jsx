import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Body from './body';
import Sidebar from './sidebar';
import useStore from '../../store/store';

function Layout() {
  const { admin, setAdmin } = useStore();
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

  return (
    <div className='flex flex-row  p-0 m-0 h-screen'>
      <Sidebar />
      <div className='flex flex-col flex-grow h-screen overflow-y-scroll'>
        <div className='w-full border-b border-gray-300 flex items-center px-10 shadow-lg justify-between bg-white'>
          <h1 className='text-teal-900 text-4xl py-5 font-bold'>DASHBOARD</h1>
          <div>
            <button type="button" className="btn btn-outline-primary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className='w-full overflow-scroll p-4'>
          <Body />
        </div>
      </div>
    </div>
  );
}

export default Layout;