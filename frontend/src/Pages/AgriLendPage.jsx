import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EquipmentCard from '../Components/EquipmentCard';
import { EquipmentDetail } from '../Components/EquipmentDetail';
import RequestConfirmation from '../Components/RequestConfirmation';
import AgrilendForm from '../components/AgrilendForm';
import Payment from '../Components/Payment';

import "../styles/AgriLendPage.css";
import tractorImage from '../assets/tractor.png';
import manureImage from '../assets/organicManure.png';
import conveyorImage from '../assets/conveyor.png';

const dummyData = [
  { id: 1, name: "Tractor with tipper", price: "₹ 2500", owner: "Raj", location: "Chennai", image: tractorImage },
  { id: 2, name: "Organic manure", price: "₹ 1500", owner: "Raj Kumar", location: "Coimbatore", image: manureImage, isOnSale: true },
  { id: 3, name: "Iron gravity Conveyor", price: "₹ 3000", owner: "Suresh", location: "Madurai", image: conveyorImage },
];

const approvedNotifications = [
  { id: 1, equipmentName: "Tractor with tipper", approved: true }
];

const AgriLendPage = () => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [triggeredByNotification, setTriggeredByNotification] = useState(false);
  const [listedEquipment, setListedEquipment] = useState([...dummyData]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRequest = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setShowPayment(true);
    }, 2000);
  };

  const handleBack = () => {
    setShowConfirmation(false);
    setShowPayment(false);
    setSelectedEquipment(null);
    setShowForm(false);
  };

  const handleDone = () => {
    if (triggeredByNotification) {
      setTriggeredByNotification(false);
      setShowPayment(false);
    } else {
      setShowConfirmation(false);
      setShowPayment(false);
      setSelectedEquipment(null);
    }
  };

  const handleAddEquipment = (newEquipment) => {
    setListedEquipment(prev => [...prev, newEquipment]);
    setShowForm(false);
  };

  const filteredEquipment = listedEquipment.filter(equipment =>
    equipment.name.toLowerCase().includes(searchTerm) ||
    equipment.location.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="agrilend-container">
      
        <header className="agrilend-header">
          <div className="logo">
            <div className="logo-icon">
              <span role="img" aria-label="leaf">🌿</span>
            </div>
            <h1>AGRILEND</h1>
          </div>
        </header>



      <main className="agrilend-main">
        <AnimatePresence mode="wait">
          {showPayment ? (
            <motion.div
              key="payment"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Payment />
            </motion.div>
          ) : showConfirmation ? (
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
          ) : showForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AgrilendForm onBack={handleBack} onSubmitSuccess={handleAddEquipment} />
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
                <p>➡️ Click here to rent your farm items and equipment</p>
                <div className="agrilend-icons">
                  <button onClick={() => setShowForm(true)}>
                    <span className="rent-icon">RENT</span>
                  </button>
                  <span
                    className="notify-icon"
                    onClick={() => {
                      if (approvedNotifications.length > 0) {
                        setTriggeredByNotification(true);
                        setShowPayment(true);
                      }
                    }}
                  >
                    🔔
                    {approvedNotifications.length > 0 && (
                      <span className="badge">{approvedNotifications.length}</span>
                    )}
                  </span>
                </div>
              </div>

              <input
                type="text"
                className="search-bar"
                placeholder="Search by equipment name, location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />

              <div className="equipment-list">
                {filteredEquipment.map((equipment, index) => (
                  <div key={index} onClick={() => setSelectedEquipment(equipment)}>
                    <EquipmentCard equipment={equipment} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AgriLendPage;
