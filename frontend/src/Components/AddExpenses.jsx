import React, { useRef, useState } from 'react';
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
  const [message, setMessage] = useState('');

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
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.amount || !formData.date) {
      setMessage('Please fill in all required fields (Title, Amount, Date)');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('amount', formData.amount);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('date', formData.date);
      
      if (selectedFile) {
        submitData.append('receipt', selectedFile);
      }

      // Send to backend API
      const response = await fetch('http://localhost:5000/api/budget/add-expense', {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('✅ Expense saved successfully!');
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
      } else {
        setMessage(`❌ Error: ${result.error || 'Failed to save expense'}`);
      }
    } catch (error) {
      console.error('Error saving expense:', error);
      setMessage('❌ Error: Could not connect to server. Please try again.');
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
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input 
              type="text" 
              id="title" 
              placeholder="Enter title" 
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number" 
              id="amount" 
              placeholder="₹" 
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Category and Date */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select 
              id="category" 
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="General">General</option>
              <option value="Manure">Manure</option>
              <option value="Fertilizers">Fertilizers</option>
              <option value="Seeds">Seeds</option>
              <option value="Machines">Machines</option>
              <option value="Labor">Labor</option>
              <option value="Transport">Transport</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input 
              type="date" 
              id="date" 
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
              placeholder="Enter details..." 
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

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

          <button 
            type="submit" 
            className="save-button" 
            disabled={isSubmitting}
          >
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

