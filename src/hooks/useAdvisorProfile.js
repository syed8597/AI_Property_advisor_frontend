// useAdvisorProfile.js - FIXED VERSION
import { useState, useEffect } from 'react';
import apiClient from '../api/client';

export const useAdvisorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); // Start with true
  const [error, setError] = useState(null);
  const [profileExists, setProfileExists] = useState(null); // null = unknown state

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 Fetching advisor profile...');
      const response = await apiClient.get('/accounts/advisor-profile/');
      console.log('✅ Profile fetched successfully:', response.data);
      setProfile(response.data);
      setProfileExists(true);
      setError(null);
    } catch (err) {
      console.error('❌ Profile fetch error:', err);
      if (err.response?.status === 404) {
        console.log('📝 Profile not found - needs creation');
        setProfileExists(false);
        setProfile(null);
        setError(null); // Don't treat 404 as error
      } else {
        setError(err.response?.data?.error || 'Failed to fetch profile');
        setProfileExists(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 Updating advisor profile...', profileData);
      const response = await apiClient.put('/accounts/advisor-profile/', profileData);
      console.log('✅ Profile updated successfully:', response.data);
      
      // Update state with the new profile data
      setProfile(response.data.profile);
      setProfileExists(true);
      setError(null);
      
      return response.data;
    } catch (err) {
      console.error('❌ Profile update error:', err);
      const errorMsg = err.response?.data?.error || 'Failed to update profile';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  
  return {
    profile,
    loading,
    error,
    profileExists,
    fetchProfile,
    updateProfile,
    setProfile
  };
};