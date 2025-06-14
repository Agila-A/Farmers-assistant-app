import React, { useState } from "react";
import Sidebar from "./Sidebar"; // ✅ Import your Sidebar component
import "../styles/RequestsScreen.css"; // ✅ Make sure this file exists
import tractorImage from '../assets/tractor.png';
import manureImage from '../assets/organicManure.png';
import conveyorImage from '../assets/conveyor.png';

const initialRequests = [
  {
    id: 1,
    image: tractorImage,
    title: "Tractor with tipper",
    price: 2500,
    requester: "Deepa",
  },
  {
    id: 2,
    image: manureImage,
    title: "Organic manure",
    price: 1500,
    requester: "Suresh",
  },
  {
    id: 3,
    image: conveyorImage,
    title: "Iron Gravity Conveyor",
    price: 2500,
    requester: "Agila",
  },
];


const RequestsScreen = () => {
  const [requests, setRequests] = useState(initialRequests);

  const handleResponse = (id, response) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
    console.log(`Request ${id} was ${response}`);
  };

  return (
    <div className="requests-layout">
      <Sidebar />

      <div className="main-content">
        <div className="topbar">
          <h1 className="title-text">🌿 AGRILEND</h1>
          <div className="request-section">
          </div>
        </div>

        <div className="requests-header">
          <h2>Hello Lender!</h2>
          <p className="note-text">Rent Out Your Equipment Today!</p>
        </div>

        <div className="requests-container">
          {requests.map(({ id, image, title, price, requester }) => (
            <div key={id} className="request-card">
              <img src={image} alt={title} />
              <h3>{title}</h3>
              <p className="price">₹ {price}</p>
              <p className="requester">Requested by: {requester}</p>
              <div className="actions">
                <button className="accept" onClick={() => handleResponse(id, "accepted")}>
                  Accept
                </button>
                <button className="decline" onClick={() => handleResponse(id, "declined")}>
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestsScreen;
