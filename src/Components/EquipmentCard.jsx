// src/components/AgriLend/EquipmentCard.jsx
import React from 'react';
import '../Styles/AgriLendPage.css';

export const EquipmentCard = ({ equipment, onClick }) => (
  <div className="equipment-card" onClick={onClick}>
    <img src={equipment.image} alt={equipment.name} width="100%" />
    <h4>{equipment.name}</h4>
    <p>₹ {equipment.price}</p>
    <p>Owner: {equipment.owner}</p>
    {equipment.tag && <span className="tag">{equipment.tag}</span>}
  </div>
);
