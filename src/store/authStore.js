import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      // Login action
      login: (user, accessToken, refreshToken) => {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      },

      // Logout action
      logout: () => {
  // Clear localStorage tokens
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  
  // Clear zustand persist storage
  localStorage.removeItem("auth-storage");

  set({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  });
},

      // Update user
      updateUser: (user) => {
        set({ user });
      },

      // Update tokens
      updateTokens: (accessToken, refreshToken) => {
        localStorage.setItem("access_token", accessToken);
        if (refreshToken) {
          localStorage.setItem("refresh_token", refreshToken);
        }

        set({ accessToken, refreshToken });
      },
      // Check if user is authenticated
      checkAuth: () => {
        const token = localStorage.getItem("access_token");
        return !!token;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
