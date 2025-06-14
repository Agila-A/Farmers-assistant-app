import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/CreateAccount.css';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const CreateAccount = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [farmerDetails, setFarmerDetails] = useState({
    name: '',
    email: ''
  });

  const [landDetails, setLandDetails] = useState({
    landSize: '',
    location: '',
    soilType: '',
    irrigationType: '',
  });

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setFarmerDetails({
        name: user.displayName || '',
        email: user.email || ''
      });
    }
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    if (!farmerDetails.name || !farmerDetails.email) {
      alert("Name and email are required.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("User not authenticated.");
      return;
    }

    const userData = {
      name: farmerDetails.name,
      email: farmerDetails.email,
      landSize: landDetails.landSize,
      location: landDetails.location,
      soilType: landDetails.soilType,
      irrigationType: landDetails.irrigationType,
      createdAt: new Date(),
    };

    try {
      await setDoc(doc(db, "farmers", user.uid), userData);
      alert('Account successfully created!');
      navigate('/success');
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      alert("Something went wrong while saving data.");
    }
  };

  const handleChange = (e, setStateFunc) => {
    const { name, value } = e.target;
    setStateFunc(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="signup-wrapper">
      <div className="form-container">
        <div className="form-logo">🌿</div>
        <h2>Create your account</h2>
        <h3>{step === 1 ? "Farmer’s details" : "Land details"}</h3>
        <form onSubmit={step === 1 ? handleNext : handleSubmit}>
          {step === 1 ? (
            <div className="form-grid">
              <input
                type="text"
                placeholder="Your name"
                name="name"
                value={farmerDetails.name}
                onChange={(e) => handleChange(e, setFarmerDetails)}
                required
              />
              <input
                type="email"
                placeholder="Your email"
                name="email"
                value={farmerDetails.email}
                readOnly
              />
            </div>
          ) : (
            <div className="form-grid">
              <input
                type="text"
                placeholder="Land size (in acres)"
                name="landSize"
                value={landDetails.landSize}
                onChange={(e) => handleChange(e, setLandDetails)}
                required
              />
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={landDetails.location}
                onChange={(e) => handleChange(e, setLandDetails)}
                required
              />
              <input
                type="text"
                placeholder="Soil type"
                name="soilType"
                value={landDetails.soilType}
                onChange={(e) => handleChange(e, setLandDetails)}
                required
              />
              <input
                type="text"
                placeholder="Irrigation type"
                name="irrigationType"
                value={landDetails.irrigationType}
                onChange={(e) => handleChange(e, setLandDetails)}
                required
              />
            </div>
          )}
          <button type="submit" className="form-button">
            {step === 1 ? "Next Step" : "Complete"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
