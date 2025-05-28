import React from "react";
import "../styles/budget.css"; // Importing CSS from styles folder

const Budget = () => {
  return (
    <div className="budget-main-container">
      <header className="budget-header">
        <h1>BUDGET TRACKER</h1>
      </header>

      <section className="expenses-section">
        <h2>EXPENSES</h2>
        <div className="bar-chart">
          {[200, 150, 220, 80, 300, 190, 250, 270, 310].map((val, index) => (
            <div key={index} className="bar" style={{ height: `${val / 4}px` }}></div>
          ))}
        </div>

        <div className="action-buttons">
          <button className="add-expense">
            ➕ <span>Add Expense</span>
          </button>
          <button className="track-expense">
            📊 <span>Track Expenses</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Budget;
