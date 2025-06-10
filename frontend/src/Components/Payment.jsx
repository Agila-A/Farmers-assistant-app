import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation
import "../styles/AgriLendPage.css";
import tractorImage from "../assets/tractor.png";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate(); // Hook for routing

  const handleProceed = () => {
    navigate("/payment-confirmed");
  };

  return (
    <div className="payment-wrapper">
      <h2 className="payment-header">Your Request Has Been Approved!</h2>
      <p className="payment-subtext">Complete the Payment to Finalize the Deal.</p>

      <div className="payment-content">
        {/* Left Side - Equipment Summary */}
        <div className="payment-card">
          <img src={tractorImage} alt="Tractor" className="payment-img" />
          <h4>Tractor with tipper</h4>
          <p className="price">₹ 2500</p>
          <p className="owner">Owner Name: Raj</p>
        </div>

        {/* Right Side - Payment Info */}
        <div className="payment-details">
          <div className="detail-row">
            <span>Rental price</span>
            <span>₹ 2000</span>
          </div>
          <div className="detail-row">
            <span>Deposit amount</span>
            <span>₹ 500</span>
          </div>
          <div className="detail-row">
            <span>Delivery Charge</span>
            <span>₹ 200</span>
          </div>
          <hr />
          <div className="detail-row total">
            <span>Total amount</span>
            <span>₹ 2700</span>
          </div>

          <div className="payment-method">
            <label>
              <input
                type="radio"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
              />
              Bank
            </label>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/512px-Visa.svg.png"
              alt="Visa"
              className="card-logo"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/512px-Mastercard-logo.svg.png"
              alt="Mastercard"
              className="card-logo"
            />
          </div>

          <div className="payment-method">
            <label>
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on delivery
            </label>
          </div>

          <div className="terms">
            <input type="checkbox" defaultChecked />
            <span>
              By listing your equipment, you agree to the terms, including
              security deposit deductions for damages and compliance with
              platform policies.
            </span>
          </div>

          <button className="cta-button" onClick={handleProceed}>
            Proceed!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
