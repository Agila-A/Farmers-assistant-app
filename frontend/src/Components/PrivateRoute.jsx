// src/Components/PrivateRoute.jsx
import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>; // show spinner or placeholder
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
