<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream

// src/components/AgriLend/RequestConfirmation.jsx
import React from 'react';
import '../styles/AgriLendPage.css';
import checkmarkImage from '../assets/checkmark.png';

const RequestConfirmation = ({ isSale = false, onDone }) => {
  return (
    <div className="request-confirmation">
      <img src={checkmarkImage} alt="Request Sent" className="confirmation-icon" />
      <h2 className="confirmation-title">
        {isSale ? 'PURCHASE REQUEST SENT!' : 'REQUEST SENT!'}
      </h2>
      <p className="confirmation-message">
        Your {isSale ? 'purchase' : 'rental'} request has been sent to the lender. Please wait while they review your request.
        Once accepted, you can proceed with the payment. If declined, you may explore other available equipment.
      </p>
      <button className="cta-button" onClick={onDone}>
        Done
      </button>
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import React from 'react';
import '../styles/AgriLendPage.css';
import checkmarkImage from '../assets/checkmark.png'; // Use the checkmark image you used in your design

const RequestConfirmation = () => {
  return (
    <div className="request-confirmation">
      <img src={checkmarkImage} alt="Request Sent" className="confirmation-icon" />
      <h2 className="confirmation-title">REQUEST SENT!</h2>
      <p className="confirmation-message">
        Your rental request has been sent to the lender. Please wait while they review your request.
        Once accepted, you can proceed with the payment. If declined, you may explore other available equipment.
      </p>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    </div>
  );
};

export default RequestConfirmation;
