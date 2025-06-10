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
import CreateAccount from './Pages/CreateAccount'; 
import SuccessPage from './Pages/SuccessPage';
import Demo from './Pages/Demo';
import Payment from './Components/Payment';
import PaymentConfirmed from './Components/PaymentConfirmed';
import TrackExpense from './Pages/TrackExpense';
import PrivateRoute from './Components/PrivateRoute'; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/demo" element={<Demo />} />

        {/* Protected Routes (Require Login) */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Layout><Dashboard /></Layout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/community" 
          element={
            <PrivateRoute>
              <Layout><CommunityPage /></Layout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/agrilend" 
          element={
            <PrivateRoute>
              <Layout><AgriLendPage /></Layout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/schedule" 
          element={
            <PrivateRoute>
              <Layout><CalendarPage /></Layout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/budget" 
          element={
            <PrivateRoute>
              <Layout><BudgetTracker /></Layout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/payment" 
          element={
            <PrivateRoute>
              <Layout><Payment /></Layout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/payment-confirmed" 
          element={
            <PrivateRoute>
              <Layout><PaymentConfirmed /></Layout>
            </PrivateRoute>
          } 
        />
        <Route
  path="/track-expense"
  element={
    <PrivateRoute>
      <Layout><TrackExpense /></Layout>
    </PrivateRoute>
  }
/>
      </Routes>
    </Router>
  );
};

export default App;
