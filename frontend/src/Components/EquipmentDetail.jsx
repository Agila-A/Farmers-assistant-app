// src/components/AgriLend/EquipmentDetail.jsx
import React from 'react';
import '../styles/AgriLendPage.css';

export const EquipmentDetail = ({ equipment, onBack, onRequest, currentUser, onDelete }) => {
  if (!equipment) return null;
  
  // Compare the current user's display name with the equipment owner's name
  const isOwner = currentUser && equipment.owner === currentUser.displayName;
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this equipment listing?')) {
      onDelete(equipment.id);
      onBack(); // Close the detail view after deletion
    }
  };

  return (
    
    <div className="equipment-detail">
      <button onClick={onBack}>⬅</button>
      <img src={equipment.image} alt={equipment.name} width="80%" />
      <h2>{equipment.name}</h2>
      
      <h3>Price: {equipment.price}</h3>
      <p>{equipment.description || 'This equipment is useful for farming.'}</p>

      {/* Delivery Details Section */}
      <div className="equipment-section">
        <h4>Delivery Details</h4>
        <p><strong>Delivery Available:</strong> {equipment.delivery ? 'Yes' : 'No'}</p>
        {equipment.delivery ? (
          <p><strong>Delivery Charge:</strong> ₹{equipment.deliveryCharge}</p>
        ) : (
          <p className="pickup-note">Borrower is responsible for pickup – contact the lender to schedule.</p>
        )}
      </div>

      <div className="equipment-section">
        <h4>Owner Details</h4>
        <p><strong>Name:</strong> {equipment.owner}</p>
      </div>

      {isOwner ? (
        <button className="cta-button" onClick={handleDelete} style={{ backgroundColor: '#f44336' }}>
          Delete Equipment
        </button>
      ) : (
        <button className="cta-button" onClick={onRequest}>
          Request
        </button>
      )}
    </div>
  );
};
