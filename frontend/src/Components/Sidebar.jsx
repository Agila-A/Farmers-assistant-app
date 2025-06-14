import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';
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
      <h3>Farmer’s Assistant</h3>

      <ul>
        <li onClick={() => navigate('/dashboard')}><span>🏠</span> Home</li>
        <li onClick={() => navigate('/agrilend')}><span>🚜</span> AgriLend</li>
        <li onClick={() => navigate('/budget')}><span>💰</span> Budget Tracker</li>
        <li onClick={() => navigate('/chat')}><span>💬</span> Let’s Chat</li>
        <li onClick={() => navigate('/schedule')}><span>📅</span> Schedules</li>
        <li onClick={() => navigate('/community')}><span>🌾</span> Community</li>
      </ul>

      <div className="sidebar-footer">
        <li onClick={() => navigate('/profile')}><span>🌾</span> Profile</li>
        <li onClick={() => navigate('/settings')}><span>⚙️</span> Settings</li>
        <li onClick={handleLogout}><span>🚪</span> Logout</li>
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
