import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuthStore();

  // Check if user is authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(user.user_type)) {
    // Redirect to appropriate dashboard based on user type
    if (user.user_type === 'INVESTOR') {
      return <Navigate to="/investor/dashboard" replace />;
    } else if (user.user_type === 'ADVISOR') {
      return <Navigate to="/advisor/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;