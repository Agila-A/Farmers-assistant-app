import "./BudgetTracker.css";

function Budget() {
  return (
    <div className="budget-page">
      <h1>BUDGET TRACKER</h1>
      <div className="chart">
        <img src="/images/budget-chart.png" alt="Budget Chart" />
      </div>
      <div className="buttons">
        <button className="add-expense">Add Expense</button>
        <button className="track-expense">Track Expense</button>
      </div>
    </div>
  );
}

export default BudgetTracker;
