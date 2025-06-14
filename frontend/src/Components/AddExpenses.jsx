import React, { useRef, useState } from 'react';
import '../Styles/AddExpenses.css';

const AddExpenses = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleReceiptClick = () => {
    fileInputRef.current.click();
  };

  const handleReceiptChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith("image/")) {
        setPreviewURL(URL.createObjectURL(file));
      } else {
        setPreviewURL(null); // for PDFs or other files
      }
    }
  };

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

        {/* Expense Description */}
        <div className="form-group full-width">
          <div className="expense-description-wrapper">
            <label htmlFor="description">Expense Description</label>
            <textarea id="description" placeholder="Enter details..." />
          </div>
        </div>

        {/* Save/Upload Buttons */}
        <div className="form-actions">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleReceiptChange}
            accept="image/*,application/pdf"
            style={{ display: 'none' }}
          />

          <button type="button" className="receipt-button" onClick={handleReceiptClick}>
            <div className="icon">📤</div>UPLOAD RECEIPT
          </button>

          <button type="submit" className="save-button">
            <div className="icon">💾</div>SAVE
          </button>
        </div>

        {/* Preview Section */}
        {selectedFile && (
          <div className="file-preview">
            <p><strong>Selected Receipt:</strong> {selectedFile.name}</p>
            {previewURL ? (
              <img src={previewURL} alt="Receipt Preview" className="receipt-preview-img" />
            ) : (
              <p>(PDF file — preview not shown)</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddExpenses;
