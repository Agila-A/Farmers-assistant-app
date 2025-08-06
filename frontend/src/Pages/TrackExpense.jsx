import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/TrackExpense.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const getCategoryIcon = (category) => {
  const icons = {
    'Manure': '🌵',
    'Fertilizers': '🌱',
    'Seeds': '🪴',
    'Machines': '🚜',
    'Labor': '👷',
    'General': '💰',
    'Other': '📦'
  };
  return icons[category] || '💰';
};

function TrackExpense() {
  const [activeTab, setActiveTab] = useState('Today');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    amount: '',
    description: '',
    category: '',
    date: ''
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/budget');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setError('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setEditForm({
      title: expense.title,
      amount: expense.amount,
      description: expense.description || '',
      category: expense.category || 'General',
      date: expense.date
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/budget/${editingExpense.id}`, editForm);
      setEditingExpense(null);
      fetchExpenses(); // Refresh the list
    } catch (error) {
      console.error('Error updating expense:', error);
      alert('Failed to update expense');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`http://localhost:5000/api/budget/${id}`);
        fetchExpenses(); // Refresh the list
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short' 
    });
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
          {!loading && !error && expenses.length === 0 && (
            <p>No expenses found.</p>
          )}
          
          {!loading && !error && expenses.map((expense) => (
            <div className="expense-item" key={expense.id}>
              <div className="expense-left">
                <div className="expense-icon">{getCategoryIcon(expense.category)}</div>
                <div className="expense-details">
                  <p>{expense.title}</p>
                  <p>{formatDate(expense.date)}</p>
                  {expense.description && <p style={{ fontSize: '0.9rem', color: '#666' }}>{expense.description}</p>}
                </div>
              </div>
              <div className="expense-right">
                <div>₹ {expense.amount}</div>
                <div className="expense-actions">
                  <button 
                    className="edit-btn" 
                    onClick={() => handleEdit(expense)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(expense.id)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {editingExpense && (
            <div className="edit-modal">
              <div className="edit-modal-content">
                <h3>Edit Expense</h3>
                <form onSubmit={handleEditSubmit}>
                  <div className="form-group">
                    <label>Title:</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Amount:</label>
                    <input
                      type="number"
                      value={editForm.amount}
                      onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category:</label>
                    <select
                      value={editForm.category}
                      onChange={(e) => setEditForm({...editForm, category: e.target.value})}
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
                    <label>Date:</label>
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    />
                  </div>
                  <div className="edit-actions">
                    <button type="submit" className="save-btn">Save</button>
                    <button 
                      type="button" 
                      className="cancel-btn"
                      onClick={() => setEditingExpense(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackExpense;
