import React from 'react';
import Settings from '../Components/Settings';

const SettingsPage = () => {
  return (
    <div>
      <div className="settings-header">
          <div className="settings-logo-icon" role="img" aria-label="leaf">🌿</div>
          <h1 className="settings-logo-title">SETTINGS</h1>
      </div>

      <Settings />
    </div>
  );
};

export default SettingsPage;

