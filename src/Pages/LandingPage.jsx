import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/LandingPage.css";

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
        <nav>
          <a href="/">Home</a>
          <a href="/schedule">Schedule</a>
          <a href="/forum">Forum</a>
          <a href="/chatbot">Chatbot</a>
        </nav>
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
        <h3>Our Service</h3>
        <p>We provide an intelligent approach to improve traditional farming practices through technology.</p>
        <div className="service-cards">
          <div className="service-card">
            <img src=".\src\assets\weather-icon.png.jpeg" alt="Weather Forecast" />
            <h4>Weather Forecast System</h4>
          </div>
          <div className="service-card">
            <img src=".\src\assets\crop-icon.png.jpeg" alt="Crop Scheduling" />
            <h4>Crop management Scheduling</h4>
          </div>
          <div className="service-card">
            <img src=".\src\assets\advisory-icon.png.jpeg" alt="Farming Advisory" />
            <h4>Farming Advisory Chatbot</h4>
          </div>
          <div className="service-card">
            <img src=".\src\assets\forum-icon.png.png" alt="Community Forum" />
            <h4>Community Forum</h4>
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
        <h2>Our Passion for Agriculture Nurturing Growth and Sustaining the Future</h2>
        <img src="./src/assets/image.png" alt="Farming Image" className="footer-image"/>
        <div className="footer-signature">Farmer's Assistant App</div>
      </footer>
    </div>
  );
};

export default LandingPage;
