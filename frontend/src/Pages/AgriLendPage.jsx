<<<<<<< Updated upstream

// src/Pages/AgriLend/AgriLend.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import EquipmentCard from '../Components/EquipmentCard'; 
import { EquipmentDetail } from '../Components/EquipmentDetail';
=======
import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import EquipmentCard from '../components/EquipmentCard';
import { EquipmentDetail } from '../Components/EquipmentDetail';
import AgrilendForm from '../components/AgrilendForm';
>>>>>>> Stashed changes
import RequestConfirmation from '../Components/RequestConfirmation';
import "../styles/AgriLendPage.css";

import tractorImage from '../assets/tractor.png';
import manureImage from '../assets/organicManure.png';
import conveyorImage from '../assets/conveyor.png';

const dummyData = [
  { id: 1, name: "Tractor with tipper", price: "₹ 2500", owner: "Raj", image: tractorImage },
<<<<<<< Updated upstream
  { id: 2, name: "Organic manure", price: "₹ 1500", owner: "Raj Kumar", image: manureImage, isOnSale: true },
=======
  { id: 2, name: "Organic manure", price: "₹ 1500", owner: "Raj Kumar", image: manureImage },
>>>>>>> Stashed changes
  { id: 3, name: "Iron gravity Conveyor", price: "₹ 3000", owner: "Suresh", image: conveyorImage },
];

const AgriLendPage = () => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
<<<<<<< Updated upstream
=======
  const [showForm, setShowForm] = useState(false);
  const [listedEquipment, setListedEquipment] = useState([...dummyData]);
>>>>>>> Stashed changes

  const handleRequest = () => {
    setShowConfirmation(true);
  };

  const handleBack = () => {
    setShowConfirmation(false);
    setSelectedEquipment(null);
<<<<<<< Updated upstream
  };

  const handleDone = () => {
    setShowConfirmation(false);
    setSelectedEquipment(null);
=======
    setShowForm(false);
  };

  const handleAddEquipment = (newEquipment) => {
    setListedEquipment(prev => [...prev, newEquipment]);
    setShowForm(false);
>>>>>>> Stashed changes
  };

  return (
    <div className="agrilend-container">
<<<<<<< Updated upstream
      <div className="agrilend-main">
        <div className="agrilend-header">
          <h1>🌿 AGRILEND</h1>
          <p>Find Equipment Near You</p>
        </div>

        <AnimatePresence mode="wait">
          {showConfirmation ? (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <RequestConfirmation
                isSale={selectedEquipment?.isOnSale || false}
                onDone={handleDone}
              />
            </motion.div>
          ) : selectedEquipment ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EquipmentDetail
                equipment={selectedEquipment}
                onBack={() => setSelectedEquipment(null)}
                onRequest={handleRequest}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="agrilend-banner">
                <p>{'➡️ Click here to rent your farm items and equipments'}</p>
                <div className="agrilend-icons">
                  <button><span className="rent-icon">🛒 RENT</span></button>
=======
      {!showForm && !selectedEquipment && !showConfirmation && (
        <div className="top-bar">
          <div className="greeting">
            <h1>AGRILEND</h1>
            <p>Find your equipments...</p>
          </div>
          <div className="request-button-container">
            <button className="request-button">
              Request <span className="notification-badge">2</span>
            </button>
          </div>
        </div>
      )}

      <main className="agrilend-main">
        <AnimatePresence mode="wait">
          {showConfirmation ? (
            <motion.div key="confirmation" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
              <RequestConfirmation onBack={handleBack} />
            </motion.div>
          ) : showForm ? (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <AgrilendForm onBack={handleBack} onSubmitSuccess={handleAddEquipment} />
            </motion.div>
          ) : selectedEquipment ? (
            <motion.div key="detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <EquipmentDetail equipment={selectedEquipment} onBack={() => setSelectedEquipment(null)} onRequest={handleRequest} />
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="agrilend-banner">
                <p>➡️ Click here to rent your farm items and equipments</p>
                <div className="agrilend-icons">
                  <button onClick={() => setShowForm(true)}><span className="rent-icon">🛒 RENT</span></button>
>>>>>>> Stashed changes
                  <span className="notify-icon">🔔</span>
                </div>
              </div>

<<<<<<< Updated upstream
              <input
                type="text"
                className="search-bar"
                placeholder="Search by equip name, location"
              />

              <div className="equipment-list">
                {dummyData.map((equipment) => (
                  <div key={equipment.id} onClick={() => setSelectedEquipment(equipment)}>
=======
              <input type="text" className="search-bar" placeholder="Search by equip name, location" />

              <div className="equipment-list">
                {listedEquipment.map((equipment, index) => (
                  <div key={index} onClick={() => setSelectedEquipment(equipment)}>
>>>>>>> Stashed changes
                    <EquipmentCard equipment={equipment} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
<<<<<<< Updated upstream
      </div>
=======
      </main>
>>>>>>> Stashed changes
    </div>
  );
};

<<<<<<< Updated upstream
export default AgriLendPage;
=======
export default AgriLendPage;
>>>>>>> Stashed changes
