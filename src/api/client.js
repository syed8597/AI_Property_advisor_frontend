import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Token management utilities
const TokenManager = {
  getAccessToken: () => localStorage.getItem("access_token"),
  getRefreshToken: () => localStorage.getItem("refresh_token"),
  setAccessToken: (token) => localStorage.setItem("access_token", token),
  setRefreshToken: (token) => localStorage.setItem("refresh_token", token),
  clearTokens: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};

// Request interceptor - Attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = TokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle token refresh and errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip retry for specific requests
    if (originalRequest._skipRetry) {
      return Promise.reject(error);
    }

    // Handle 401 errors with token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = TokenManager.getRefreshToken();
        
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Refresh access token
        const { data } = await axios.post(`${API_BASE_URL}/accounts/refresh/`, {
          refresh: refreshToken,
        });

        // Update tokens
        TokenManager.setAccessToken(data.access);
        if (data.refresh) {
          TokenManager.setRefreshToken(data.refresh);
        }

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return apiClient(originalRequest);
        
      } catch (refreshError) {
        // Clear tokens on refresh failure
        TokenManager.clearTokens();
        
        // Redirect based on logout state
        const isLogoutInProgress = sessionStorage.getItem("logout_in_progress");
        sessionStorage.removeItem("logout_in_progress");
        
        window.location.href = isLogoutInProgress ? "/" : "/auth/login";
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;