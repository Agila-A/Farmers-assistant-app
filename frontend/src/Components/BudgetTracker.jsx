import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BudgetTracker.css';

export default function BudgetTracker() {
  const navigate = useNavigate();

  return (
    <div className="budget-container">
      <h2 className="budget-title">Budget Tracker</h2>
      {/* Removed image as requested */}
      <div className="budget-buttons">
        <button className="budget-btn" onClick={() => navigate('/budget/add')}>
          Add Expense
        </button>
        <button className="budget-btn" onClick={() => navigate('/budget/track')}>
          Track Expense
        </button>
      </div>
    </div>
  );
}


