import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/CreateAccount.css';

const CreateAccount = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [farmerDetails, setFarmerDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [landDetails, setLandDetails] = useState({
    landSize: '',
    location: '',
    soilType: '',
    irrigationType: '',
  });

  const handleNext = (e) => {
    e.preventDefault();
    // Optionally validate farmer details before moving to the next step
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save data to backend
    console.log('Farmer Details:', farmerDetails);
    console.log('Land Details:', landDetails);
    alert('Account successfully created!');
    navigate('/success');
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
                onChange={(e) => handleChange(e, setFarmerDetails)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={farmerDetails.password}
                onChange={(e) => handleChange(e, setFarmerDetails)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={farmerDetails.confirmPassword}
                onChange={(e) => handleChange(e, setFarmerDetails)}
                required
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
