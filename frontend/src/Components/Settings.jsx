import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Settings.css';

const Settings = () => {
  const [showLanguages, setShowLanguages] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const navigate = useNavigate();

  const handleViewDemoClick = () => {
    navigate('/demo');
  };

  return (
    <div className="settings-container">
        
      {/* Account Section */}
      <section className="settings-box">
        <h3>👤 Account</h3>
        <label>Profile Picture</label>
        <input type="file" />

        <div className="account-fields">
          <input type="text" placeholder="change userName" />
          <input type="text" placeholder="change contact No" />
          <input type="email" placeholder="change email id" />
          <input type="password" placeholder="change password" />
        </div>

        <div className="save-button-container">
          <button className="save-button">Save</button>
        </div>
      </section>

      {/* View Demo */}
      <section className="settings-box clickable" onClick={handleViewDemoClick}>
        <h4>🎥 View Demo</h4>
        <p className="subtext">Explore how Farmer’s Assistant makes farming smarter</p>
      </section>

      {/* Preferences */}
      <section className="settings-box">
        <h4 onClick={() => setShowLanguages(!showLanguages)} className="toggle-heading">
          🌣 Preferences
        </h4>
        {showLanguages && (
          <div className="dropdown">
            <select>
              <option>English</option>
              <option>Tamil</option>
            </select>
          </div>
        )}
      </section>

      {/* Notifications */}
      <section className="settings-box">
        <h4>🕭 Notification</h4>
        <div className="notification-options">
          <label><input type="checkbox" /> Enable app notifications</label>
          <label><input type="checkbox" /> Receive alerts via Email</label>
          <label><input type="checkbox" /> Receive alerts via SMS</label>
        </div>
      </section>

      {/* Contact Us */}
      <section className="settings-box">
        <h4 onClick={() => setShowContactOptions(!showContactOptions)} className="toggle-heading">
          ☎ Contact Us
        </h4>
        {showContactOptions && (
          <div className="contact-buttons">
            <button onClick={() => setShowFeedbackModal(true)}>🗪 Feedback</button>
            <button onClick={() => setShowHelpModal(true)}>🛠 Help & Support</button>
          </div>
        )}
      </section>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Feedback</h3>
            <textarea placeholder="Share your thoughts..." rows={4} />
            <div className="modal-actions">
              <button onClick={() => setShowFeedbackModal(false)}>Close</button>
              <button>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {showHelpModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Help & Support</h3>
            <p>If you need assistance, contact us at: <strong>support@farmassist.com</strong></p>
            <button onClick={() => setShowHelpModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
