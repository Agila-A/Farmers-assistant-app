import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EquipmentCard from '../Components/EquipmentCard';
import { EquipmentDetail } from '../Components/EquipmentDetail';
import RequestConfirmation from '../Components/RequestConfirmation';
import AgrilendForm from '../Components/AgrilendForm';
import Payment from '../Components/Payment';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { agrilendEquipmentAPI } from '../utils/api';
import "../styles/AgriLendPage.css";

import tractorImage from '../assets/tractor.png';

const AgriLendPage = () => {
  const [user, loading, authError] = useAuthState(auth);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [triggeredByNotification, setTriggeredByNotification] = useState(false);
  const [listedEquipment, setListedEquipment] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const approvedNotifications = [
    { id: 1, equipmentName: "Tractor with tipper", approved: true }
  ];

  const fetchEquipment = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await agrilendEquipmentAPI.getAll();
      const formattedEquipment = data.data.map(item => ({
        ...item,
        price: `₹ ${item.price}`,
        owner: item.ownerName,
        image: item.imageUrl || tractorImage,
        delivery: item.deliveryAvailable,
        isOnSale: item.isOnSale || false
      }));
      setListedEquipment(formattedEquipment);
    } catch (err) {
      console.error('Failed to fetch equipment:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

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

  const handleAddEquipment = () => {
    fetchEquipment();
    setShowForm(false);
  };

  const handleDeleteEquipment = async (equipmentId) => {
    try {
      await agrilendEquipmentAPI.delete(equipmentId);
      fetchEquipment();
    } catch (err) {
      console.error('Failed to delete equipment:', err);
      alert('Failed to delete equipment. Please try again.');
    }
  };

  const filteredEquipment = listedEquipment.filter(equipment =>
    equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    equipment.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="agrilend-page">
      {/* ✅ Fixed Top Header */}
<header className="agrilend-header">
  <div className="logo">
    <div className="logo-icon">
      <span role="img" aria-label="leaf">🌿</span>
    </div>
    <h1>AGRILEND</h1>
  </div>

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
</header>

      {/* ✅ Push content below header */}
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
                currentUser={user}
                onDelete={handleDeleteEquipment}
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
              <input
                type="text"
                className="search-bar"
                placeholder="Search by equipment name, location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {isLoading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Loading equipment...</p>
                </div>
              ) : error ? (
                <div className="error-container">
                  <p className="error-message">{error}</p>
                  <button onClick={fetchEquipment} className="retry-button">
                    Retry
                  </button>
                </div>
              ) : filteredEquipment.length === 0 ? (
                <div className="empty-container">
                  <p>No equipment found. Be the first to list your equipment!</p>
                  <button onClick={() => setShowForm(true)} className="list-equipment-button">
                    List Equipment
                  </button>
                </div>
              ) : (
                <div className="equipment-list">
                  {filteredEquipment.map(equipment => (
                    <div key={equipment.id} onClick={() => setSelectedEquipment(equipment)}>
                      <EquipmentCard
                        equipment={equipment}
                        currentUser={user}
                        onDelete={handleDeleteEquipment}
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AgriLendPage;
