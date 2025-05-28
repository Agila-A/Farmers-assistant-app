// src/components/AgriLend/EquipmentCard.jsx
import React from "react";
import "../styles/AgriLendPage.css";

const EquipmentCard = ({ equipment }) => {
  return (
    
    <div className="equipment-card">
      <img src={equipment.image} alt={equipment.name} />
      <h3>{equipment.name}</h3>
      <p className="price">{equipment.price}</p>
      <p className="owner">Owner name: {equipment.owner}</p>
      {equipment.isOnSale && <span className="sale-tag">Sale</span>}
    </div>
  );
};

export default EquipmentCard;
