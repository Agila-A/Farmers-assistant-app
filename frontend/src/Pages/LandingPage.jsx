import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../Styles/LandingPage.css";

import weatherIcon from '../assets/weather-icon.png.jpeg';
import cropIcon from '../assets/crop-icon.png.jpeg';
import advisoryIcon from '../assets/advisory-icon.png.jpeg';
import forumIcon from '../assets/forum-icon.png.png';
import footerImage from '../assets/image.png';

// Custom SVG Components for AgriLend and Budget
const AgriLendIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="35" fill="white"/>
    <circle cx="40" cy="25" r="8" fill="#4CAF50"/>
    <path d="M25 45 L55 45" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
    <path d="M30 55 L50 55" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
    <path d="M35 65 L45 65" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
    <path d="M40 25 L40 45" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
    <path d="M25 45 L40 35" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
    <path d="M55 45 L40 35" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="30" cy="50" r="2" fill="#4CAF50"/>
    <circle cx="50" cy="50" r="2" fill="#4CAF50"/>
    <path d="M20 30 L60 30" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 35 L60 35" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const BudgetIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="35" fill="white"/>
    <rect x="25" y="20" width="30" height="40" rx="3" fill="#4CAF50" opacity="0.2" stroke="#4CAF50" strokeWidth="2"/>
    <circle cx="40" cy="30" r="3" fill="#4CAF50"/>
    <path d="M30 40 L50 40" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
    <path d="M30 50 L45 50" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
    <path d="M30 60 L50 60" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="35" cy="35" r="2" fill="#4CAF50"/>
    <circle cx="45" cy="35" r="2" fill="#4CAF50"/>
    <circle cx="35" cy="45" r="2" fill="#4CAF50"/>
    <circle cx="45" cy="45" r="2" fill="#4CAF50"/>
    <path d="M20 25 L60 25" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round"/>
    <path d="M20 70 L60 70" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round"/>
    <path d="M25 25 L25 70" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round"/>
    <path d="M55 25 L55 70" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="landing-container">
      {/* Header Section */}
      <header className="navbar">
        <h1>Farmer's Assistant</h1>

        <div className="auth-buttons">
          <button className="login" onClick={handleLogin}>Login</button>
          <button className="signup" onClick={handleGetStarted}>Sign up</button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero-section">
        <h2>Sowing Seeds of Progress: The Intersection of Tech and Farming</h2>
        <p>Welcome to Farmer's Assistant, an intelligent digital tool designed to revolutionize the farming experience with technology.</p>
        <div className="cta-buttons">
          <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
          <button className="learn-more">Learn more</button>
        </div>
      </div>

      {/* Services Section */}
      <section className="services">
        <h3>Our Services</h3>
        <p>We provide an intelligent approach to improve traditional farming practices through technology.</p>
        <div className="service-cards">
          <div className="service-card">
            <img src={weatherIcon} alt="Weather Forecast System Icon" />
            <h4>Weather Forecast System</h4>
            <p>Get accurate weather predictions to plan your farming activities effectively.</p>
          </div>
          <div className="service-card">
            <img src={cropIcon} alt="Crop Scheduling Icon" />
            <h4>Crop Management Scheduling</h4>
            <p>Plan and track your crop cycles with intelligent scheduling tools.</p>
          </div>
          <div className="service-card">
            <img src={advisoryIcon} alt="Farming Advisory Icon" />
            <h4>Farming Advisory Chatbot</h4>
            <p>Get instant expert advice on farming practices and problem-solving.</p>
          </div>
          <div className="service-card">
            <img src={forumIcon} alt="Community Forum Icon" />
            <h4>Community Forum</h4>
            <p>Connect with fellow farmers and share knowledge and experiences.</p>
          </div>
          <div className="service-card">
            <div className="custom-icon">
              <AgriLendIcon />
            </div>
            <h4>AgriLend Services</h4>
            <p>Access to agricultural loans and financial services for farmers.</p>
          </div>
          <div className="service-card">
            <div className="custom-icon">
              <BudgetIcon />
            </div>
            <h4>Budget Management</h4>
            <p>Track expenses and manage your farm's budget efficiently.</p>
          </div>
        </div>
      </section>

      {/* Sustainable Farming Section */}
      <section className="sustainable-farming">
        <h2>Sustainable Farming Meets Technology: Building a Greener Future</h2>
        <button className="learn-more">Learn more</button>
      </section>

      {/* Footer Section */}
      <footer>
        <div className="footer-content">
          <div className="footer-text">
            <h2>Our Passion for Agriculture Nurturing Growth and Sustaining the Future</h2>
            <p>Join thousands of farmers who are already transforming their agricultural practices with cutting-edge technology and sustainable solutions.</p>
            <div className="footer-signature">Farmer's Assistant App</div>
          </div>
          <div className="footer-visual">
            <img src={footerImage} alt="Sustainable Farming Visual" className="footer-image" />
            <div className="image-overlay">
              <div className="overlay-content">
                <h3>Modern Farming</h3>
                <p>Technology meets tradition</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
