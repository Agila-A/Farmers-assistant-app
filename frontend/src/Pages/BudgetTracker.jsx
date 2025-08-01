// BudgetTracker.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/BudgetTracker.css';

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const expenses = [100, 30, 45, 75, 20, 28, 90, 55, 10, 25, 70, 50];

function BudgetTracker() {
  const navigate = useNavigate();
  const maxExpense = Math.max(...expenses);

  const handleTrackExpenses = () => {
    navigate('/track-expenses');
  };

  return (
    <div className="budget-container">
      <div className="budget-header">
        <div className="budget-logo">
          <div className="budget-logo-icon">
            <span role="img" aria-label="leaf">🌿</span>
          </div>
          <h1 className="budget-logo-title">BUDGET TRACKER</h1>
        </div>
      </div>

      <div className="chart">
        {expenses.map((value, index) => {
          const height = (value / maxExpense) * 180; // scale to max height of 180px
          return (
            <div key={index} className="bar-container">
              <div className="bar" style={{ height: `${height}px` }}></div>
              <span className="month-label">{months[index]}</span>
            </div>
          );
        })}
      </div>

      <div className="actions">
        <div className="action-card">
          <div className="icon">➕</div>
          <button className="action-button" onClick={() => navigate('/add-expenses')}>
            Add Expenses
          </button>
        </div>

        <div className="action-card">
          <div className="icon">👜</div>
          <button className="action-button" onClick={handleTrackExpenses}>
            Track Expenses
          </button>
        </div>
      </div>
    </div>
  );
}

export default BudgetTracker;
