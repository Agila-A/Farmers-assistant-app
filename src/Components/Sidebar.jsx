import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/Sidebar.css";
 // Move the CSS you wrote into this file

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h3>Farmer’s Assistant</h3>
      <ul>
        <li onClick={() => navigate('/')}><span>🏠</span> Home</li>
        <li onClick={() => navigate('/dashboard')}><span>📊</span> Dashboard</li>
        <li onClick={() => navigate('/agrilend')}><span>🚜</span> AgriLend</li>
        <li onClick={() => navigate('/budget')}><span>💰</span> Budget Tracker</li>
        <li onClick={() => navigate('/chat')}><span>💬</span> Let’s Chat</li>
        <li onClick={() => navigate('/schedule')}><span>📅</span> Schedules</li>
        <li onClick={() => navigate('/community')}><span>🚜</span> Community</li>
      </ul>
      <div className="sidebar-footer">
        <li onClick={() => navigate('/settings')}><span>⚙️</span> Settings</li>
        <li onClick={() => navigate('/logout')}><span>🚪</span> Logout</li>
      </div>
    </div>
  );
};

export default Sidebar;
