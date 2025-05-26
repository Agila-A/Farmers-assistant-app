// src/pages/AgriLendPage.jsx
import React, { useState } from "react";
import EquipmentCard from "../components/EquipmentCard";
import { EquipmentDetail } from "../components/EquipmentDetail";
import "../styles/AgriLendPage.css";

import tractorImage from '../assets/tractor.png';
import manureImage from '../assets/organicManure.png';
import conveyorImage from '../assets/conveyor.png';

const dummyData = [
  { id: 1, name: "Tractor with tipper", price: "₹ 2500", owner: "Raj", image: tractorImage },
  { id: 2, name: "Organic manure", price: "₹ 1500", owner: "Raj Kumar", image: manureImage, isOnSale: true },
  { id: 3, name: "Iron gravity Conveyor", price: "₹ 3000", owner: "Suresh", image: conveyorImage },
];

const AgriLendPage = () => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  return (
    <div className="agrilend-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Farmer’s Assistant</h3>
        <ul>
          <li><span>🏠</span> Home</li>
          <li><span>📊</span> Dashboard</li>
          <li className="active"><span>🚜</span> AgriLend</li>
          <li><span>💰</span> Budget Tracker</li>
          <li><span>💬</span> Let’s Chat</li>
          <li><span>📅</span> Schedules</li>
        </ul>
        <div className="sidebar-footer">
          <li><span>⚙️</span> Settings</li>
          <li><span>🚪</span> Logout</li>
        </div>
      </div>

      {/* Main content */}
      <div className="agrilend-main">
        {/* Header */}
        <div className="agrilend-header">
          <h1>AGRILEND</h1>
          <p>Find Equipment Near You</p>
        </div>

        {/* Show detail if selected */}
        {selectedEquipment ? (
          <EquipmentDetail
            equipment={selectedEquipment}
            onBack={() => setSelectedEquipment(null)}
          />
        ) : (
          <>
            {/* Banner */}
            <div className="agrilend-banner">
              <button>➡️ Click here to rent your farm items and equipments</button>
              <div className="agrilend-icons">
                <button><span className="rent-icon">🛒 RENT</span></button>
                <span className="notify-icon">🔔</span>
              </div>
            </div>

            {/* Search bar */}
            <input
              type="text"
              className="search-bar"
              placeholder="Search by equip name, location"
            />

            {/* Equipment Cards */}
            <div className="equipment-list">
              {dummyData.map((equipment) => (
                <div key={equipment.id} onClick={() => setSelectedEquipment(equipment)}>
                  <EquipmentCard equipment={equipment} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AgriLendPage;
