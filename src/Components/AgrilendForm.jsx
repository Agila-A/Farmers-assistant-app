import React, { useState } from 'react';
import "../styles/AgriLendForm.css";

const AgrilendForm = ({ onBack, onSubmit }) => {
  const [form, setForm] = useState({
    name: '', equipment: '', price: '', delivery: true, location: '', from: '', to: '', contact: '', agree: false, image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let validatedValue = value;
    if (name === 'name') validatedValue = value.replace(/[^A-Za-z ]/g, '');
    else if (name === 'equipment') validatedValue = value.replace(/[^A-Za-z0-9]/g, '');
    else if (name === 'price' || name === 'contact') validatedValue = value.replace(/[^0-9]/g, '');

    if (type === 'checkbox') setForm(prev => ({ ...prev, [name]: checked }));
    else if (type === 'file') setForm(prev => ({ ...prev, image: files[0] }));
    else setForm(prev => ({ ...prev, [name]: validatedValue }));
  };

  const handleDeliveryChange = (value) => setForm(prev => ({ ...prev, delivery: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // Pass form data up
  };

  return (
    <>
      <div className="top-bar">
        <div className="greeting">
          <h1>Hello Lender!</h1>
          <p>Rent Out Your Equipment Today!</p>
        </div>
        <div className="request-button-container">
          <button className="request-button">
            Request <span className="notification-badge">2</span>
          </button>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
            <input type="text" name="equipment" placeholder="Equipment name" value={form.equipment} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <input type="text" name="price" placeholder="Rental price" value={form.price} onChange={handleChange} required />
            <div className="upload-image">
              <label className="upload-label">+
                <input type="file" name="image" accept="image/*" onChange={handleChange} hidden />
              </label>
              <span>Click here</span>
            </div>
          </div>

          <p className="deposit-policy"><strong>Security Deposit Policy:</strong><br />A ₹500 deposit will be collected and refunded if no damage occurs.</p>

          <div className="delivery-box">
            <span>Self Delivery</span>
            <label><input type="radio" name="delivery" checked={form.delivery === true} onChange={() => handleDeliveryChange(true)} /> Yes</label>
            <label><input type="radio" name="delivery" checked={form.delivery === false} onChange={() => handleDeliveryChange(false)} /> No</label>
          </div>

          <input type="text" name="location" placeholder="Enter address" value={form.location} onChange={handleChange} required className="location-input" />

          <div className="availability-group">
            <label className="section-label">Availability Duration</label>
            <div className="input-group">
              <label>From <input type="date" name="from" value={form.from} onChange={handleChange} required /></label>
              <label>To <input type="date" name="to" value={form.to} onChange={handleChange} required /></label>
            </div>
          </div>

          <input type="text" name="contact" placeholder="Phone number" value={form.contact} onChange={handleChange} required className="contact-input" />

          <label className="agreement">
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} required /> I agree to the terms and deposit policy.
          </label>

          <div className="form-buttons">
            <button type="submit" className="submit-button">Submit</button>
            <button type="button" className="cancel-button" onClick={onBack}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AgrilendForm;

