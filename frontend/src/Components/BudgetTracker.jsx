import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BudgetTracker.css'; 

const BudgetTracker = () => {
  const navigate = useNavigate();

  const handleAddExpense = () => {
    navigate('/add-expenses');
  };

  const handleTrackExpense = () => {
    navigate('/track-expenses');
  };

  const barHeights = [90, 50, 65, 85, 35, 40, 100, 70, 20, 45, 85, 60];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return (
    <div className="bt-container">
      <h1 className="bt-main-title">BUDGET TRACKER</h1>

      <section className="bt-section">
        <h2 className="bt-sub-title">EXPENSES</h2>
        <div className="bt-bar-chart">
          {months.map((month, i) => (
            <div key={i} className="bt-bar-wrapper">
              <div className="bt-bar" style={{ height: `${barHeights[i]}%` }}></div>
              <span className="bt-month-label">{month}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bt-buttons-section">
        <div className="bt-action-box" onClick={handleAddExpense}>
          <div className="bt-icon-circle">➕</div>
          <button className="bt-button">ADD EXPENSES</button>
        </div>
        <div className="bt-action-box" onClick={handleTrackExpense}>
          <div className="bt-icon-circle">👜</div>
          <button className="bt-button">TRACK EXPENSES</button>
        </div>
      </section>
    </div>
  );
};

export default BudgetTracker;

