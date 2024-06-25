import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = 'https://api.krishnaphotography.net/v1';
const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const AuthService = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem(TOKEN_KEY) || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem(REFRESH_TOKEN_KEY) || null);
  const [user, setUser] = useState(null);

  const login = async (password) => {
    try {
      console.log('Logging in...');
      const response = await fetch(`${BASE_URL}/admin/auth/signInByEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      console.log('Login API Response:', data);
  
      if (!data.data.accessToken || !data.data.refreshToken) {
        throw new Error('Access token or refresh token missing in response.');
      }
  
      localStorage.setItem(TOKEN_KEY, data.data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.data.refreshToken);
      setAccessToken(data.data.accessToken);
      setRefreshToken(data.data.refreshToken);
      const decodedToken = jwtDecode(data.data.accessToken);
      setUser(decodedToken);
      return { success: true, data };
    } catch (error) {
      console.error('Error logging in:', error);
      return { success: false, error: error.message };
    }
  };
  

  const refreshAccessToken = async (refreshTokenParam) => {
    try {
      console.log('Refreshing access token...');
      const response = await fetch(`${BASE_URL}/admin/refreshAccessTokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: refreshTokenParam }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log('Refresh Token API Response:', data);
      return { success: true, data };
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return { success: false, error: error.message };
    }
  };

  const checkTokenExpiry = (accessToken) => {
    console.log('Checking access token expiry...');
    if (!accessToken) return true;
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  };

  const handleTokenRenewal = async (refreshTokenParam) => {
    console.log('Handling token renewal...');
    try {
      const response = await refreshAccessToken(refreshTokenParam);
      if (response.success) {
        const { accessToken } = response.data;
        setAccessToken(accessToken);
        localStorage.setItem(TOKEN_KEY, accessToken);
      } else {
        console.error('Failed to refresh access token:', response.error); 
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (checkTokenExpiry(accessToken)) {
        handleTokenRenewal(refreshToken);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [accessToken, refreshToken, handleTokenRenewal]);

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setUser(null);
  };

  return { user, accessToken, logout, login };
};

export default AuthService;
