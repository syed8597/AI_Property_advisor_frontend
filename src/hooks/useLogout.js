import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../api/client';
import toast from 'react-hot-toast';
export const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      // Try to blacklist the refresh token on server
      // This is best-effort - if it fails, client cleanup still happens
      if (refreshToken) {
        try {
          await apiClient.post('/accounts/logout/', {
            refresh: refreshToken,
          }, {
            _skipRetry: true, // Don't trigger interceptor
          });
        
        } 
        catch (error) {
          // Ignore all errors - token might be expired, that's fine
          // The token will naturally expire on the server anyway
        }
      }
      
    } 
    catch (error) {
      // Ignore any unexpected errors
    } 
    finally {
      // Always clean up and redirect, regardless of API response
      logout();
      navigate('/', { replace: true });
      toast.success('Logged out successfully!');
    }
  };

  return { handleLogout };
};