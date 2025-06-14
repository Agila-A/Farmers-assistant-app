import React from 'react';
import '../Styles/AddExpenses.css';


const AddExpenses = () => {
  return (
    <div className="add-expense-page">
      <h1 className="form-title">Add Expense</h1>

      <form className="expense-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" placeholder="Enter title" />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" placeholder="₹" />
          </div>
        </div>

        {/* Expense Description with drag/drop */}
        <div className="form-group full-width">
          <div className="expense-description-wrapper">
            <label htmlFor="description">Expense Description</label>
            <textarea id="description" placeholder="Enter details..." />
          </div>

          <div className="drag-upload-wrapper">
            <div className="drop-zone">drag/ drop</div>
            <button type="button" className="photo-button">UPLOAD PHOTO</button>
          </div>
        </div>

        {/* Save/Upload Buttons */}
        <div className="form-actions">
          
          <button type="button" className="receipt-button"> <div className="icon">📤</div>UPLOAD RECEIPT</button>
          <button type="submit" className="save-button"> <div className="icon">💾</div>SAVE</button>
          
        </div>
      </form>
    </div>
  );
};

export default AddExpenses;

