import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CommunityPage from './Pages/CommunityPage';
import CalendarPage from './Pages/CalendarPage';
import LandingPage from './Pages/LandingPage';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import AgriLendPage from './Pages/AgriLendPage';
import Dashboard from './Components/Dashboard';
import Layout from './Components/Layout';
import BudgetTracker from './Pages/BudgetTracker';
import TrackExpense from './Pages/TrackExpense';

import CreateAccount from './Pages/CreateAccount'; 
import SuccessPage from './Pages/SuccessPage';
import Demo from './Pages/Demo';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Pages without sidebar */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/demo" element={<Demo />} />

        {/* Pages with sidebar */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/community" element={<Layout><CommunityPage /></Layout>} />
        <Route path="/agrilend" element={<Layout><AgriLendPage /></Layout>} />
        <Route path="/schedule" element={<Layout><CalendarPage /></Layout>} />
        <Route path="/budget" element={<Layout><BudgetTracker /></Layout>} />
        <Route path="/track-expense" element={<Layout><TrackExpense /></Layout>} />

      </Routes>
    </Router>
  );
};

export default App;
