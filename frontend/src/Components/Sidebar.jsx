import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';
import { 
  FaHome, FaTractor, FaMoneyBillWave, FaComments, 
  FaCalendarAlt, FaUsers, FaUser, FaCog, FaSignOutAlt,
  FaHandHolding, FaHandshake, FaCreditCard, FaSeedling
} from "react-icons/fa";
import "../Styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const profileRef = doc(db, 'farmers', user.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          setProfile(profileSnap.data());
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="sidebar">
      {/* ✅ Unique gradient container for project title */}
      <div className="sidebar-title">
        <FaSeedling className="title-icon" />
        <span>Farmer’s Assistant</span>
      </div>

      <ul>
        <li onClick={() => navigate('/dashboard')}>
          <FaHome /> Home
        </li>
        
        <li>
          <div onClick={() => navigate('/agrilend')}>
            <FaTractor /> AgriLend
          </div>
          <ul className="submenu">
            <li onClick={() => navigate('/agrilend-form')}>
              <FaHandHolding /> Rent
            </li>
            <li onClick={() => navigate('/requests')}>
              <FaHandshake /> Request
            </li>
            <li onClick={() => navigate('/payment')}>
              <FaCreditCard /> Payment
            </li>
          </ul>
        </li>

        <li onClick={() => navigate('/budget')}>
          <FaMoneyBillWave /> Budget Tracker
        </li>
        <li onClick={() => navigate('/chat')}>
          <FaComments /> Let’s Chat
        </li>
        <li onClick={() => navigate('/schedule')}>
          <FaCalendarAlt /> Schedules
        </li>
        <li onClick={() => navigate('/community')}>
          <FaUsers /> Community
        </li>
      </ul>

      <div className="sidebar-footer">
        <li onClick={() => navigate('/profile')}>
          <FaUser /> Profile
        </li>
        <li onClick={() => navigate('/settings')}>
          <FaCog /> Settings
        </li>
       <li onClick={handleLogout}>
        <FaSignOutAlt style={{ color: "#bd4a27ff" }} /> Logout
      </li>
      </div>

      {user && (
        <div className="user-info" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
          <p><strong>{profile?.name || user.displayName || "User"}</strong></p>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
