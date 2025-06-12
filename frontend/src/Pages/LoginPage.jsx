import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // adjust if needed
import "../Styles/AuthPages.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="image-section">
        <img src="./src/assets/farmer.png" alt="Farmer" className="login-image" />
      </div>
      <div className="form-section">
        <h2 className="login-title">Login</h2>
        <p className="login-description">Welcome back! Log in to access our exclusive and helpful contents</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Your email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="auth-button" onClick={handleLogin}>
            Log In
          </button>
        </form>
        <p className="forgot-password">Forget password?</p>
        <p>Don't have an account? <span className="link" onClick={() => navigate("/signup")}>Sign up</span></p>
      </div>
    </div>
  );
};

export default LoginPage;
