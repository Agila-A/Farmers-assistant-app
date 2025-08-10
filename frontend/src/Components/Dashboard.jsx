import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Dashboard.css';

// Import images from the assets folder
import livestockImage from '../assets/livestock.png';
import chatIcon from '../assets/chat.png';
import agrilendIcon from '../assets/agrilend.png';
import scheduleIcon from '../assets/schedule.png';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">
          <div className="logo-icon">
            <span role="img" aria-label="leaf">🌿</span>
          </div>
          <h1>FARMER’S ASSISTANT</h1>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-top">
          <div
            className="carousel hover-card"
            onClick={() => navigate('/community')}
            style={{ cursor: 'pointer' }}
          >
            <h3>National Livestock Mission - EDEG</h3>
            <div className="carousel-images">
              <img src={livestockImage} alt="Livestock Mission" />
            </div>
            <p>
              National Livestock Mission is an initiative of the Ministry of Agriculture and Farmers’ Welfare.
              The mission, which commenced from 2014-15, has the objective of sustainable development of the livestock sector.
            </p>
            <span className="read-more">click to read more</span>
          </div>

          <div
            className="budget-tracker hover-card"
            onClick={() => navigate('/budget')}
            style={{ cursor: 'pointer' }}
          >
            <h3>BUDGET TRACKER</h3>
            <div className="chart">
              <div className="bar" style={{ height: '60%' }}>JAN</div>
              <div className="bar" style={{ height: '90%' }}>FEB</div>
              <div className="bar" style={{ height: '75%' }}>MAR</div>
              <div className="bar" style={{ height: '100%' }}>APR</div>
              <div className="bar" style={{ height: '85%' }}>MAY</div>
            </div>
            <span className="legend">month</span>
          </div>
        </div>

        <div className="dashboard-bottom">
          <div className="card chat" onClick={() => navigate('/chat')} style={{ cursor: 'pointer' }}>
            <img src={chatIcon} alt="Let's Chat" />
            <h4>LET'S CHAT</h4>
          </div>

          <div className="card agrilend" onClick={() => navigate('/agrilend')} style={{ cursor: 'pointer' }}>
            <img src={agrilendIcon} alt="AgriLend" />
            <h4>AGRILEND</h4>
          </div>

          <div className="card schedule" onClick={() => navigate('/schedule')} style={{ cursor: 'pointer' }}>
            <img src={scheduleIcon} alt="Schedule" />
            <h4>SCHEDULE</h4>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
