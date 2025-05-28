import React from 'react';
import './styles/BudgetTracker.css'; // Correctly importing from 'styles' folder

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const expenses = [80, 30, 45, 75, 20, 28, 90, 55, 10, 25, 70, 50]; // sample data

function BudgetTracker() {
  return (
    <div className="budget-container">
      <h1 className="budget-header">BUDGET TRACKER</h1>
      <h2 className="budget-subheader">EXPENSES</h2>

      <div className="chart">
        {expenses.map((value, index) => (
          <div key={index} className="bar-container">
            <div className="bar" style={{ height: `${value * 2}px` }} />
            <span className="month-label">{months[index]}</span>
          </div>
        ))}
      </div>

      <div className="actions">
        <div className="action-card">
          <div className="icon">➕</div>
          <button className="action-button">Add Expenses</button>
        </div>
        <div className="action-card">
          <div className="icon">👜</div>
          <button className="action-button">Track Expenses</button>
        </div>
      </div>
    </div>
  );
}

export default BudgetTracker;
