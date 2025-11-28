import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';

const PublicRoute = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  // Debug logging
  useEffect(() => {
    console.log('PublicRoute Debug:', {
      isAuthenticated,
      isLoading,
      user,
      userType: user?.user_type
    });
  }, [isAuthenticated, isLoading, user]);

  // Wait for auth to initialize
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  // If user is authenticated, redirect to their dashboard
  if (isAuthenticated && user) {
    console.log('User authenticated, redirecting to dashboard');
    if (user.user_type === 'INVESTOR') {
      return <Navigate to="/investor/dashboard" replace />;
    } else if (user.user_type === 'ADVISOR') {
      return <Navigate to="/advisor/dashboard" replace />;
    }
  }

  console.log('Showing public page');
  return children;
};

export default PublicRoute;