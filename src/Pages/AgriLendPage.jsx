import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import EquipmentCard from '../components/EquipmentCard';
import { EquipmentDetail } from '../Components/EquipmentDetail';
import RequestConfirmation from '../Components/RequestConfirmation';
import "../styles/AgriLendPage.css";

import tractorImage from '../assets/tractor.png';
import manureImage from '../assets/organicManure.png';
import conveyorImage from '../assets/conveyor.png';

const dummyData = [
  { id: 1, name: "Tractor with tipper", price: "₹ 2500", owner: "Raj", image: tractorImage },
  { id: 2, name: "Organic manure", price: "₹ 1500", owner: "Raj Kumar", image: manureImage },
  { id: 3, name: "Iron gravity Conveyor", price: "₹ 3000", owner: "Suresh", image: conveyorImage },
];

const AgriLendPage = () => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRequest = () => {
    setShowConfirmation(true);
  };

  const handleBack = () => {
    setShowConfirmation(false);
    setSelectedEquipment(null);
  };

  return (
    <div className="agrilend-container">
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
              <RequestConfirmation onBack={handleBack} />
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
                  <span className="notify-icon">🔔</span>
                </div>
              </div>

              <input
                type="text"
                className="search-bar"
                placeholder="Search by equip name, location"
              />

              <div className="equipment-list">
                {dummyData.map((equipment) => (
                  <div key={equipment.id} onClick={() => setSelectedEquipment(equipment)}>
                    <EquipmentCard equipment={equipment} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AgriLendPage;
