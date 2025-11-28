import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Register from "./features/account/Register";
import Login from "./features/account/Login";
import InvestorDashboard from "./pages/InvestorDashboard";
import AdvisorDashboard from "./pages/AdvisorDashboard";
import LandingPage from "./pages/LandingPage";
import Profile from "./features/account/Profile";
import ChangePassword from "./features/account/ChangePassword";
import NotFound from "./pages/NotFound";
import './index.css';

function App() {
  const { isAuthenticated, user, logout, setLoading } = useAuthStore();

  useEffect(() => {
    // Verify token on app load
    const verifyAuth = () => {
      const token = localStorage.getItem('access_token');
      
      // If no token but state says authenticated, logout
      if (!token && isAuthenticated) {
        console.log('No token found, logging out');
        logout();
      }
      
      // Set loading to false after check
      setLoading(false);
    };

    verifyAuth();
  }, []);

  return (
    <BrowserRouter>
      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            duration: 4000,
            style: {
              background: '#10b981',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10b981',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#ef4444',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#ef4444',
            },
          },
        }}
      />

      <Routes>
        {/* Public Routes - Only for non-logged-in users */}
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route 
          path="/auth/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />

        <Route 
          path="/auth/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />

        {/* Protected Routes - Only for Investors */}
        <Route 
          path="/investor/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['INVESTOR']}>
              <InvestorDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Routes - Only for Advisors */}
        <Route 
          path="/advisor/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['ADVISOR']}>
              <AdvisorDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Routes - For all logged-in users */}
        <Route 
          path="/app/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/app/change-password" 
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          } 
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;