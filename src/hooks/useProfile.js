import { useState, useEffect } from 'react';
import accountApi from '../api/account';
export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const profileData = await accountApi.getProfile();
      setProfile(profileData);
    } catch (err) {
      setError(err.error || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };
  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await accountApi.updateProfile(profileData);
      setProfile(response.profile);
      return response;
    } catch (err) {
      setError(err.error || 'Failed to update profile');
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
    fetchProfile,
    updateProfile,
    setProfile
  };
};