import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import "../Styles/AuthPages.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Dashboard");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/Dashboard");
    } catch (error) {
      alert("Google sign-in failed: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="image-section">
        <img src="./src/assets/farmer.png" alt="Farmer" className="login-image" />
      </div>
      <div className="form-section">
        <h2 className="login-title">Login</h2>
        <p className="login-description">Welcome back!</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Your email" className="input-field" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="input-field" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="button" className="auth-button" onClick={handleLogin}>Log In</button>
        </form>
        <p className="forgot-password">Forget password?</p>
        <button className="google-button" onClick={handleGoogleLogin}>Sign in with Google</button>
        <p>Don't have an account? <span className="link" onClick={() => navigate("/signup")}>Sign up</span></p>
      </div>
    </div>
  );
};

export default LoginPage;
