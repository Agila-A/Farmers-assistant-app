import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // make sure path is correct
import "../Styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

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
        <li onClick={handleLogout}><span>🚪</span> Logout</li>
      </div>
    </div>
  );
};

export default Sidebar;
