import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import "../Styles/AuthPages.css";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSignUp = async () => {
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/Dashboard");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/Dashboard");
    } catch (error) {
      alert("Google sign-up failed: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="image-section">
        <img src="./src/assets/farmer.png" alt="Farmer" className="login-image" />
      </div>
      <div className="form-section">
        <h2 className="login-title">Sign Up</h2>
        <p className="login-description">Join us today!</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your name" className="input-field" value={name} onChange={e => setName(e.target.value)} />
          <input type="email" placeholder="Your email" className="input-field" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="input-field" value={password} onChange={e => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm password" className="input-field" value={confirm} onChange={e => setConfirm(e.target.value)} />
          <button type="button" className="auth-button" onClick={handleSignUp}>Sign Up</button>
        </form>
        <button className="google-button" onClick={handleGoogleSignUp}>Sign up with Google</button>
        <p>Already have an account? <span className="link" onClick={() => navigate("/login")}>Log in</span></p>
      </div>
    </div>
  );
};

export default SignUpPage;
