import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarPage from './Pages/CalendarPage';  // Assuming CalendarPage holds Calendar
import LandingPage from './Pages/LandingPage';
import SignUpPage from './Pages/SignUpPage';  // Import SignUpPage
import LoginPage from './Pages/LoginPage';    // Import LoginPage

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default page as LandingPage */}
        <Route path="/" element={<LandingPage />} /> 

        {/* Calendar Page */}
        <Route path="/schedule" element={<CalendarPage />} /> 

        {/* Sign up page */}
        <Route path="/signup" element={<SignUpPage />} /> 

        {/* Login page */}
        <Route path="/login" element={<LoginPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;

