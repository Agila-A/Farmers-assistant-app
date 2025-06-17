import React, { useState } from 'react';
import '../Styles/TrackExpense.css';
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

       <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
          <button className="modern-edit-btn">
            <FaEdit style={{ marginRight: '6px' }} />
            Edit
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default TrackExpense;
