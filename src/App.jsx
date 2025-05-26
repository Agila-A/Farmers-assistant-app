import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CalendarPage from './Pages/CalendarPage';
import LandingPage from './Pages/LandingPage';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import AgriLendPage from './Pages/AgriLendPage';

import Layout from './Components/Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Pages without sidebar */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Pages with sidebar */}
        <Route path="/agrilend" element={<Layout><AgriLendPage /></Layout>} />
        <Route path="/schedule" element={<Layout><CalendarPage /></Layout>} />
        {/* Add more as needed like dashboard, budget, etc */}
      </Routes>
    </Router>
  );
};

export default App;
