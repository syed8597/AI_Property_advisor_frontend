import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';

//  #Protected route function
const ProtectedRoute = ({ children, allowedRoles = null }) => {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  // Debug logging
  useEffect(() => {
    console.log('ProtectedRoute Debug:', {
      isAuthenticated,
      isLoading,
      user,
      allowedRoles,
      userType: user?.user_type
    });
  }, [isAuthenticated, isLoading, user, allowedRoles]);

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

  // Check if user is authenticated
  if (!isAuthenticated || !user) {
    console.log('Not authenticated, redirecting to /');
    return <Navigate to="/" replace />;
  }

  // Check if user has required role (only if allowedRoles is specified)
  if (allowedRoles && !allowedRoles.includes(user.user_type)) {
    console.log('Wrong role, redirecting to dashboard');
    // Redirect to appropriate dashboard based on user type
    if (user.user_type === 'INVESTOR') {
      return <Navigate to="/investor/dashboard" replace />;
    } else if (user.user_type === 'ADVISOR') {
      return <Navigate to="/advisor/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  console.log('Access granted');
  return children;
};

export default ProtectedRoute;