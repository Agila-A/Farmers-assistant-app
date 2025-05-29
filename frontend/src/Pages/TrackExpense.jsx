import React, { useState } from 'react';
import './TrackExpense.css';
import { FaEdit } from 'react-icons/fa';

const expenses = [
  {
    icon: '🌵',
    title: 'Manure',
    date: '18 Aug',
    amount: '₹ 1100',
  },
  {
    icon: '🌱',
    title: 'Fertilizers',
    date: '18 Aug',
    amount: '₹ 2800',
  },
  {
    icon: '🪴',
    title: 'Seeds',
    date: '18 Aug',
    amount: '₹ 1000',
  },
  {
    icon: '🚜',
    title: 'Machines',
    date: '17 Aug',
    amount: '₹ 5024',
  },
];

function TrackExpense() {
  const [activeTab, setActiveTab] = useState('Today');

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div>
          <h2>🌿 Farmer's Assistant</h2>
          <ul>
            <li>🏠 Home</li>
            <li>📊 Dashboard</li>
            <li>💰 AgriLend</li>
            <li className="active">📈 Buget Tracker</li>
            <li>💬 Let's chat</li>
            <li>📅 Schedules</li>
          </ul>
        </div>
        <div className="footer">
          <p>⚙️ Settings</p>
          <p>🔓 Logout</p>
          <p>👤 User</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main">
        <div className="header">TRACK EXPENSE</div>

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
          {expenses.map((item, index) => (
            <div className="expense-item" key={index}>
              <div className="expense-left">
                <div className="expense-icon">{item.icon}</div>
                <div className="expense-details">
                  <p>{item.title}</p>
                  <p>{item.date}</p>
                </div>
              </div>
              <div className="expense-right">{item.amount}</div>
            </div>
          ))}

          <div className="edit-btn">
            <button>
              <FaEdit />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackExpense;
