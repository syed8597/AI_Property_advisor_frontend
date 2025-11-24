import { apiClient } from './client';

export const accountApi = {
  register: async (data) => {
    try {
      console.log('🚀 API Call - Register with data:', data);
      const response = await apiClient.post('/accounts/register/', data);
      console.log('✅ API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ API Error:', error);
      if (error.response) {
        throw error;
      } else if (error.request) {
        throw new Error('Network error - no response from server');
      } else {
        throw new Error(error.message || 'Unknown error occurred');
      }
    }
  },

  login: async (data) => {
    try {
      const response = await apiClient.post('/accounts/login/', data);
      
      // Save tokens immediately after login
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
      }
      if (response.data.refresh) {
        localStorage.setItem('refresh_token', response.data.refresh);
      }
      
      console.log('✅ Login successful, tokens saved');
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error;
      } else if (error.request) {
        throw new Error('Network error - no response from server');
      } else {
        throw new Error(error.message || 'Unknown error occurred');
      }
    }
  },

  logout: async (data, accessToken) => {
    try {
      // ✅ CRITICAL: Skip automatic token refresh for logout
      const response = await apiClient.post('/accounts/logout/', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        _skipRetry: true, // Custom flag to prevent interceptor retry
      });
      
      console.log('✅ Server logout successful');
      return response.data;
      
    } catch (error) {
      // Silently handle 401 - token already expired, that's fine
      if (error.response?.status === 401) {
        console.log('ℹ️ Token already expired during logout (this is normal)');
        return { detail: 'Token expired' };
      }
      
      // For other errors, just throw
      throw error;
    }
  },
  getProfile: async () => {
    try {
      const response = await apiClient.get('/accounts/investor-profile/');
      console.log('✅ Profile fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Profile fetch error:', error);
      throw error;
    }
  },
   updateProfile: async (data) => {
    try {
      console.log('🚀 Updating profile with data:', data);
      const response = await apiClient.put('/accounts/investor-profile/', data);
      console.log('✅ Profile updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Profile update error:', error);
      throw error;
    }
  },
 // account.js
getAdvisorProfile: async () => {
  try {
    console.log('🚀 Fetching advisor profile...');
    const response = await apiClient.get('/accounts/advisor-profile/');
    console.log('✅ Profile fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Profile fetch error:', error);
    throw error;
  }
},

updateAdvisorProfile: async (data) => {
  try {
    console.log('🚀 Updating profile with data:', data);
    const response = await apiClient.put('/accounts/advisor-profile/', data);
    console.log('✅ Profile updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Profile update error:', error);
    throw error;
  }
},
};

export default accountApi;