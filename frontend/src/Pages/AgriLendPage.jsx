import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EquipmentCard from '../Components/EquipmentCard';
import { EquipmentDetail } from '../Components/EquipmentDetail';
import RequestConfirmation from '../Components/RequestConfirmation';
import AgrilendForm from '../Components/AgrilendForm';
import Payment from '../Components/Payment';
import { agrilendEquipmentAPI } from '../services/agrilendAPI';

import "../styles/AgriLendPage.css";
import tractorImage from '../assets/tractor.png';
import manureImage from '../assets/organicManure.png';
import conveyorImage from '../assets/conveyor.png';

// Fallback data in case API is not available
const fallbackData = [
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
  const [listedEquipment, setListedEquipment] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch equipment data from backend
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setIsLoading(true);
        const response = await agrilendEquipmentAPI.getAll();
        
        // Transform backend data to match frontend format
        const transformedData = response.data.map(item => ({
          id: item.id,
          name: item.name,
          price: `₹ ${item.price}`,
          owner: item.ownerName,
          location: item.location,
          image: item.imageUrl ? `http://localhost:5000${item.imageUrl}` : tractorImage, // Convert to full URL
          isOnSale: item.isOnSale,
          description: item.description,
          deliveryAvailable: item.deliveryAvailable,
          deliveryCharge: item.deliveryCharge
        }));
        
        setListedEquipment(transformedData);
        setError(null);
      } catch (error) {
        console.error('Error fetching equipment:', error);
        setError('Failed to load equipment. Using fallback data.');
        setListedEquipment(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };

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

  const handleAddEquipment = async (newEquipment) => {
    // Add to local state immediately for better UX
    setListedEquipment(prev => [...prev, newEquipment]);
    setShowForm(false);
    
    // Refresh data from backend to ensure consistency
    try {
      const response = await agrilendEquipmentAPI.getAll();
      const transformedData = response.data.map(item => ({
        id: item.id,
        name: item.name,
        price: `₹ ${item.price}`,
        owner: item.ownerName,
        location: item.location,
        image: item.imageUrl ? `http://localhost:5000${item.imageUrl}` : tractorImage, // Convert to full URL
        isOnSale: item.isOnSale,
        description: item.description,
        deliveryAvailable: item.deliveryAvailable,
        deliveryCharge: item.deliveryCharge
      }));
      setListedEquipment(transformedData);
    } catch (error) {
      console.error('Error refreshing equipment data:', error);
    }
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

              {isLoading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Loading equipment...</p>
                </div>
              ) : error ? (
                <div className="error-container">
                  <p className="error-message">{error}</p>
                  <button onClick={() => window.location.reload()} className="retry-button">
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
                  {filteredEquipment.map((equipment, index) => (
                    <div key={index} onClick={() => setSelectedEquipment(equipment)}>
                      <EquipmentCard equipment={equipment} />
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
