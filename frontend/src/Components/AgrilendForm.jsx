import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import { agrilendEquipmentAPI } from '../utils/api';

import "../styles/AgriLendForm.css";

const AgrilendForm = ({ onBack, onSubmitSuccess }) => {
  const [form, setForm] = useState({
    name: '', equipment: '', price: '', delivery: true, location: '', from: '', to: '', contact: '', agree: false, image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

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

  // Upload image to server
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch('http://localhost:5000/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload image');
      }

      // Convert relative URL to full backend URL
      const imageUrl = `http://localhost:5000${data.data.url}`;
      return imageUrl;
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Failed to upload image. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if user is authenticated
    if (!user) {
      alert('You must be logged in to list equipment.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Upload image if provided
      let imageUrl = '/assets/tractor.png'; // Default fallback image
      
      if (form.image) {
        try {
          imageUrl = await uploadImage(form.image);
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          alert('Image upload failed. Equipment will be listed with default image.');
        }
      }
      
      // Prepare equipment data for backend
      const equipmentData = {
        name: form.equipment,
        description: `Equipment available from ${form.from} to ${form.to}`,
        price: parseFloat(form.price),
        ownerId: user ? user.uid : null, // Send Firebase UID to backend
        ownerName: form.name,
        location: form.location,
        imageUrl: imageUrl, // Use uploaded image URL or default
        isOnSale: false,
        deliveryAvailable: form.delivery,
        deliveryCharge: form.delivery ? 200 : 0, // Default delivery charge
        availableFrom: form.from, // Send availability dates
        availableTo: form.to, // Send availability dates
        category: 'OTHER', // Default category
        condition: 'GOOD' // Default condition
      };

      // Send to backend
      const response = await agrilendEquipmentAPI.create(equipmentData);
      
      // Create local equipment object for immediate display
      const newEquipment = {
        id: response.data.id,
        name: form.equipment,
        price: `₹ ${form.price}`,
        owner: form.name,
        location: form.location,
        image: imageUrl // Use the uploaded image URL
      };

      onSubmitSuccess(newEquipment);
      alert('Equipment listed successfully!');
    } catch (error) {
      console.error('Error creating equipment:', error);
      alert('Failed to list equipment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestClick = () => {
    navigate('/requests'); // This navigates to the request screen
  };

  return (
    <>
      <div className="top-bar">
        <div className="greeting">
          <h1>Hello Lender!</h1>
          <p>Rent Out Your Equipment Today!</p>
        </div>
        <div className="request-button-container">
          <button className="request-button" onClick={handleRequestClick}>
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
              <label className="upload-label">
                {form.image ? '📷 Image Selected' : '+'}
                <input type="file" name="image" accept="image/*" onChange={handleChange} hidden />
              </label>
              <span>{form.image ? form.image.name : 'Click to upload equipment photo'}</span>
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
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button type="button" className="cancel-button" onClick={onBack} disabled={isSubmitting}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AgrilendForm;
