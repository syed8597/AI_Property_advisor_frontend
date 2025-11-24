import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
const PublicRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();
  

  // If user is authenticated, redirect to their dashboard
  if (isAuthenticated && user) {
    if (user.user_type === 'INVESTOR') {
      return <Navigate to="/investor/dashboard" replace />;
    } else if (user.user_type === 'ADVISOR') {
      return <Navigate to="/advisor/dashboard" replace />;
    }
  }

  return children;
};

export default PublicRoute;