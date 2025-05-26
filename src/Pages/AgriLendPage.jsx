// src/pages/AgriLendPage.jsx
import React, { useState } from 'react';
import '../Styles/AgriLendPage.css';
import { EquipmentCard } from '../components/EquipmentCard';
import { EquipmentDetail } from '../Components/EquipmentDetail';
import tractorImage from '../assets/tractor.png';
import manureImage from '../assets/organicManure.png';
import conveyorImage from '../assets/conveyor.png';
const sampleEquipments = [
  {
    id: 1,
    name: 'Tractor with tipper',
    price: 2500,
    owner: 'Raj',
    image: tractorImage,
    description: 'High-performance tractor for plowing, seeding...',
    deliveryCharge: 200
  },
  {
    id: 2,
    name: 'Organic manure',
    price: 1500,
    owner: 'Raj Kumar',
    image: manureImage,
    tag: 'Sale'
  },
  {
    id: 3,
    name: 'Iron gravity Conveyor',
    price: 3000,
    owner: 'Suresh',
    image: conveyorImage
  }
];

export default function AgriLendPage() {
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  return (
    <div className="agrilend-container">
      {selectedEquipment ? (
        <EquipmentDetail
          equipment={selectedEquipment}
          onBack={() => setSelectedEquipment(null)}
        />
      ) : (
        <div>
          <div className="search-bar">
            <input type="text" placeholder="Search by equip name, location" />
          </div>

          <div className="equipment-list">
            {sampleEquipments.map((equip) => (
              <EquipmentCard
                key={equip.id}
                equipment={equip}
                onClick={() => setSelectedEquipment(equip)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
