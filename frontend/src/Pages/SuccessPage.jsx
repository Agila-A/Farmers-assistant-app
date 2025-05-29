// src/Pages/SuccessPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/SuccessPage.css'; // create this CSS file

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="success-wrapper">
      <div className="success-card">
        <img src="/src/assets/create.png" alt="Success" className="success-image" />
        <h2>Successfully Completed</h2>
        <div className="success-buttons">
          <button onClick={() => navigate('/demo')} className="success-button green">
            View Demo
          </button>
          <button onClick={() => navigate('/dashboard')} className="success-button green">
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
