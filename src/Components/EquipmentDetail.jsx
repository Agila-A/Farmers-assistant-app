// src/components/AgriLend/EquipmentDetail.jsx
import React from 'react';
import '../styles/AgriLendPage.css';

export const EquipmentDetail = ({ equipment, onBack }) => {
  const handleRequestClick = () => {
    alert(`Requested to rent: ${equipment.name}`);
  };

  return (
    <div className="equipment-detail">
      <button onClick={onBack}>⬅ Back</button>
      <img src={equipment.image} alt={equipment.name} width="100%" />
      <h2>{equipment.name}</h2>
      <p>{equipment.description || 'This equipment is useful for farming.'}</p>
      <h3>Price: ₹ {equipment.price}</h3>
      {equipment.deliveryCharge && <p>Delivery Charge: ₹{equipment.deliveryCharge}</p>}
      <div>
        <h4>Owner Details</h4>
        <p>Name: {equipment.owner}</p>
        <button className="cta-button" onClick={handleRequestClick}>
          Request for Rent
        </button>
      </div>
    </div>
  );
};
