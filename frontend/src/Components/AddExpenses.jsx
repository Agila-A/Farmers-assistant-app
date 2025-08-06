import React, { useRef, useState } from 'react';
import axios from 'axios';
import '../Styles/AddExpenses.css';

const AddExpenses = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    description: '',
    category: 'General',
    date: new Date().toISOString().split('T')[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount),
        receipt_url: selectedFile ? selectedFile.name : null
      };

      const response = await axios.post('http://localhost:5000/api/budget', expenseData);
      
      if (response.status === 201) {
        setMessage({ text: 'Expense saved successfully!', type: 'success' });
        // Reset form
        setFormData({
          title: '',
          amount: '',
          description: '',
          category: 'General',
          date: new Date().toISOString().split('T')[0]
        });
        setSelectedFile(null);
        setPreviewURL(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Error saving expense:', error);
      setMessage({ 
        text: error.response?.data?.message || 'Failed to save expense. Please try again.', 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-expense-page">
      <div className="addexpense-header">
        <div className="addexpense-logo-icon" role="img" aria-label="leaf">🌿</div>
        <h1 className="addexpense-logo-title">ADD EXPENSE</h1>
      </div>

      <form className="expense-form" onSubmit={handleSubmit}>
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input 
              type="text" 
              id="title" 
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter title" 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number" 
              id="amount" 
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="₹" 
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select 
              id="category" 
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="General">General</option>
              <option value="Manure">Manure</option>
              <option value="Fertilizers">Fertilizers</option>
              <option value="Seeds">Seeds</option>
              <option value="Machines">Machines</option>
              <option value="Labor">Labor</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input 
              type="date" 
              id="date" 
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Expense Description */}
        <div className="form-group full-width">
          <div className="expense-description-wrapper">
            <label htmlFor="description">Expense Description</label>
            <textarea 
              id="description" 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter details..." 
            />
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

          <button type="submit" className="save-button" disabled={isSubmitting}>
            <div className="icon">💾</div>
            {isSubmitting ? 'SAVING...' : 'SAVE'}
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
