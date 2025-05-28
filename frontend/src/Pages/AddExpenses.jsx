import React from 'react';
import '../Styles/AddExpenses.css';

function AddExpenses() {
  return (
    <div className="add-expense-page">
      <h1 className="form-title">Add Expense</h1>
      <form className="expense-form">
        <div className="form-row">
          <div className="form-group">
            <label>Expense Title</label>
            <input type="text" placeholder="Enter title" />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input type="number" placeholder="Enter amount" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input type="text" placeholder="e.g. Food, Transport" />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea placeholder="Enter details..."></textarea>
        </div>

        <div className="photo-upload">
          <div className="drop-zone">Drag & Drop Photo or Click to Upload</div>
          <button type="button" className="photo-button">Upload Photo</button>
        </div>

        <div className="form-actions">
          <button type="button" className="receipt-button">Generate Receipt</button>
          <button type="submit" className="save-button">Save Expense</button>
        </div>
      </form>
    </div>
  );
}

export default AddExpenses;
