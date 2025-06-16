import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import Dashboard from './Components/Dashboard';
import CommunityPage from './Pages/CommunityPage';
import AgriLendPage from './Pages/AgriLendPage';
import CalendarPage from './Pages/CalendarPage';
import Layout from './Components/Layout';
import BudgetTracker from './Pages/BudgetTracker';
import AddExpenses from './Components/AddExpenses';
import TrackExpense from './Pages/TrackExpense';
import CreateAccount from './Pages/CreateAccount';
import SuccessPage from './Pages/SuccessPage';
import Demo from './Pages/Demo';
import Payment from './Components/Payment';
import PaymentConfirmed from './Components/PaymentConfirmed';
import PrivateRoute from './Components/PrivateRoute';
import AgrilendForm from './components/AgrilendForm';
import RequestsScreen from './components/RequestsScreen';
import Profile from './Pages/ProfilePage';
import SettingsPage from './Pages/SettingsPage'; 

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

        {/* Custom Pages */}
        <Route path="/agrilend-form" element={<AgrilendForm />} />
        <Route path="/requests" element={<RequestsScreen />} />

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
          path="/add-expenses" 
          element={
            <PrivateRoute>
              <Layout><AddExpenses /></Layout>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/track-expenses" 
          element={
            <PrivateRoute>
              <Layout><TrackExpense /></Layout>
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
            path="/profile" 
            element={
              <PrivateRoute>
                <Layout><Profile /></Layout>
              </PrivateRoute>
            }
          />
              <Route 
              path="/settings" 
              element={
                <PrivateRoute>
                  <Layout><SettingsPage /></Layout>
                </PrivateRoute>
              } 
            />
      </Routes>
    </Router>
  );
};

export default App;
