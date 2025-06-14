import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/BudgetTracker.css';

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const expenses = [80, 30, 45, 75, 20, 28, 90, 55, 10, 25, 70, 50];

function BudgetTracker() {
  const navigate = useNavigate();
  const maxExpense = Math.max(...expenses);

  const handleTrackExpenses = () => {
    navigate('/track-expenses');
  };

  return (
    <div className="budget-container">
      <h1 className="budget-header">BUDGET TRACKER</h1>
      <h2 className="budget-subheader">EXPENSES</h2>

      <div className="chart">
        {expenses.map((value, index) => {
          const height = (value / maxExpense) * 200;

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
          <button
            className="action-button"
            onClick={() => navigate('/add-expenses')}
          >
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
