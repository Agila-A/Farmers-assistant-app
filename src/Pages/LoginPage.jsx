import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/AuthPages.css"; // Ensure that you update the CSS for this

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="auth-container">
      {/* Left section with image */}
      <div className="image-section">
        <img src=".\src\assets\farmer.png" alt="Farmer" className="login-image" />
      </div>

      {/* Right section with login form */}
      <div className="form-section">
        <h2 className="login-title">Login</h2>
        <p className="login-description">Welcome back! Log in back to access our exclusive and helpful contents</p>
        <form>
          <input type="email" placeholder="Your email" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <button type="submit" className="auth-button">Log In</button>
        </form>
        <p className="forgot-password">Forget password?</p>
        <p>Don't have an account? <span className="link" onClick={handleSignUp}>Sign up</span></p>

        <div className="social-login">
          <p>or continue with</p>
          <div className="social-buttons">
            <button className="social-icon google"></button>
            <button className="social-icon facebook"></button>
            <button className="social-icon apple"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
