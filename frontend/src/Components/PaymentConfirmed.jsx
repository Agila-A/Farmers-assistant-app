import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AgriLendPage.css";
import confirmationImage from "../assets/paymentConfirm.png"; // Similar to checkmark.png in RequestConfirmation

const PaymentConfirmed = () => {
  const navigate = useNavigate();

  const handleDone = () => {
    navigate("/agrilend");
  };

  return (
    <div className="agrilend-container">
      {/* 🌿 Top Bar */}
      <div className="top-bar">
        <div className="greeting">
          <h1>🌿 AGRILEND</h1>
        </div>
      </div>

      {/* ✅ Consistent Confirmation Layout */}
      <main className="agrilend-main">
        <div className="request-confirmation">
          <img
            src={confirmationImage}
            alt="Payment Confirmed"
            className="confirmation-icon"
          />
          <h2 className="confirmation-title">PAYMENT CONFIRMED</h2>
          <p className="confirmation-message">
            Your payment has been successfully processed. You can now collect or expect delivery of the equipment.
          </p>
          <button className="cta-button" onClick={handleDone}>
            Done
          </button>
        </div>
      </main>
    </div>
  );
};

export default PaymentConfirmed;
