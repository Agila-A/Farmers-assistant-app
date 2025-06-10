import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/AuthPages.css";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSignUp = async () => {
    navigate("/create-account");

  };

  return (
    <div className="auth-container">
      {/* Left section with image */}
      <div className="image-section">
        <img src="./src/assets/farmer.png" alt="Farmer" className="login-image" />
      </div>

      {/* Right section with sign-up form */}
      <div className="form-section">
        <h2 className="login-title">Sign Up</h2>
        <p className="login-description">Join us today! Sign up to access our exclusive and helpful contents</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your name" className="input-field" />
          <input type="email" placeholder="Your email" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <input type="password" placeholder="Confirm password" className="input-field" />
          <button type="button" className="auth-button" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
        <p>Already have an account? <span className="link" onClick={handleLogin}>Log in</span></p>

        <div className="social-login">
          <p>or sign up with</p>
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

export default SignUpPage;
