import React, { useState, useEffect } from 'react';
import '../Styles/TrackExpense.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

// Category icons mapping
const categoryIcons = {
  'Manure': '🌵',
  'Fertilizers': '🌱',
  'Seeds': '🪴',
  'Machines': '🚜',
  'Labor': '👷',
  'Transport': '🚚',
  'General': '📋',
  'Test': '🧪'
};

function TrackExpense() {
  const [activeTab, setActiveTab] = useState('Today');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    amount: '',
    description: '',
    category: 'General',
    date: ''
  });

  // Fetch expenses based on active tab
  const fetchExpenses = async () => {
    setLoading(true);
    setError('');
    
    try {
      let endpoint = '';
      switch (activeTab) {
        case 'Today':
          endpoint = 'http://localhost:5000/api/budget/today';
          break;
        case 'Weekly':
          endpoint = 'http://localhost:5000/api/budget/weekly';
          break;
        case 'Monthly':
          endpoint = 'http://localhost:5000/api/budget/monthly';
          break;
        default:
          endpoint = 'http://localhost:5000/api/budget/all-expenses';
      }

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      
      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      setError('Failed to load expenses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load expenses when component mounts or tab changes
  useEffect(() => {
    fetchExpenses();
  }, [activeTab]);

  // Handle edit button click
  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setEditForm({
      title: expense.title,
      amount: expense.amount,
      description: expense.description || '',
      category: expense.category || 'General',
      date: expense.date
    });
    setShowEditModal(true);
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:5000/api/budget/update/${editingExpense.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm)
      });

      if (!response.ok) {
        throw new Error('Failed to update expense');
      }

      // Close modal and refresh data
      setShowEditModal(false);
      setEditingExpense(null);
      fetchExpenses();
      alert('✅ Expense updated successfully!');
    } catch (err) {
      console.error('Error updating expense:', err);
      alert('❌ Failed to update expense. Please try again.');
    }
  };

  // Handle delete expense
  const handleDelete = async (expenseId) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/budget/delete/${expenseId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }

      fetchExpenses();
      alert('✅ Expense deleted successfully!');
    } catch (err) {
      console.error('Error deleting expense:', err);
      alert('❌ Failed to delete expense. Please try again.');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  // Format amount for display
  const formatAmount = (amount) => {
    return `₹ ${parseFloat(amount).toLocaleString()}`;
  };

  return (
    <div className="container">
      <div className="main">
        <div className="track-header">
          <div className="track-logo-icon" role="img" aria-label="leaf">🌿</div>
          <h1 className="track-logo-title">TRACK EXPENSE</h1>
        </div>

        <div className="tabs">
          {['Today', 'Weekly', 'Monthly'].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="expense-box">
          <h2>{activeTab}</h2>
          
          {loading && <p>Loading expenses...</p>}
          {error && <p className="error-message">{error}</p>}
          
          {!loading && !error && expenses.length === 0 && (
            <p>No expenses found for {activeTab.toLowerCase()}.</p>
          )}

          {!loading && !error && expenses.map((expense) => (
            <div className="expense-item" key={expense.id}>
              <div className="expense-left">
                <div className="expense-icon">
                  {categoryIcons[expense.category] || '📋'}
                </div>
                <div className="expense-details">
                  <p>{expense.title}</p>
                  <p>{formatDate(expense.date)}</p>
                </div>
              </div>
              <div className="expense-right">
                <span className="amount">{formatAmount(expense.amount)}</span>
                <div className="action-buttons">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(expense)}
                    title="Edit expense"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(expense.id)}
                    title="Delete expense"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit Expense</h3>
              <button 
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="edit-form">
              <div className="form-group">
                <label htmlFor="edit-title">Title</label>
                <input
                  type="text"
                  id="edit-title"
                  value={editForm.title}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edit-amount">Amount</label>
                  <input
                    type="number"
                    id="edit-amount"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-category">Category</label>
                  <select
                    id="edit-category"
                    value={editForm.category}
                    onChange={(e) => setEditForm({...editForm, category: e.target.value})}
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
              </div>

              <div className="form-group">
                <label htmlFor="edit-date">Date</label>
                <input
                  type="date"
                  id="edit-date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-description">Description</label>
                <textarea
                  id="edit-description"
                  value={editForm.description}
                  onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  rows="3"
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackExpense;
