// src/components/AgriLend/EquipmentCard.jsx
import React from "react";
import "../styles/AgriLendPage.css";

const EquipmentCard = ({ equipment, currentUser, onDelete }) => {
  // Compare the current user's display name with the equipment owner's name
  const isOwner = currentUser && equipment.owner === currentUser.displayName;
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this equipment listing?')) {
      onDelete(equipment.id);
    }
  };
  
  return (
    
    <div className="equipment-card">
      <img src={equipment.image} alt={equipment.name} />
      <h3>{equipment.name}</h3>
      <p className="price">{equipment.price}</p>
      <p className="owner">Owner name: {equipment.owner}</p>
      {equipment.isOnSale && <span className="sale-tag">Sale</span>}
      {isOwner && (
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default EquipmentCard;
