import React from 'react';
import '../styles/AgriLendPage.css';

export const EquipmentDetail = ({ equipment, onBack, onRequest }) => {
  if (!equipment) return null;

  return (
    <div className="equipment-detail">
      <button onClick={onBack}>⬅ Back</button>
      <img src={equipment.image} alt={equipment.name} width="90%" />

      <h2>{equipment.name}</h2>
      <p>{equipment.description || 'This equipment is useful for farming.'}</p>
      <h3>Price: ₹ {equipment.price}</h3>

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

      <button className="cta-button" onClick={onRequest}>
        Request for Rent
      </button>
    </div>
  );
};
