import React from 'react';
import Sidebar from '../sidebar/Sidebar.jsx';
import { Outlet, useLocation } from 'react-router-dom';

function Root() {
  const location = useLocation();
  const isHome = location.pathname === '/'; // Assuming '/home' is the path for Home component

  return (
    <div className='d-flex fixWrapSmall'>
      <Sidebar />
      <div
        className='flex-grow-1'
        style={{
          padding: isHome ? 0 : '2em', // If it's home, no padding
          background: isHome ? 'transparent' : '#c1c4c9', // If it's home, no background
          overflowX: 'auto',
          overflowY: 'auto'
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
