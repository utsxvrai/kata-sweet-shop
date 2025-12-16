import { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../api/auth.api';

// Create the AuthContext
const AuthContext = createContext(null);

/**
 * Custom hook to use the AuthContext
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * AuthProvider component to wrap the app
 * Manages authentication state and provides auth functions
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }

    setLoading(false);
  }, []);

  /**
   * Login function
   * @param {Object} credentials - User credentials
   * @param {string} credentials.username - Username
   * @param {string} credentials.password - Password
   * @returns {Promise<Object>} Login response
   */
  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      
      // Store token and user data
      if (response.token) {
        setToken(response.token);
        localStorage.setItem('token', response.token);
      }

      if (response.user) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Register function
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Registration response
   */
  const register = async (userData) => {
    try {
      const response = await authApi.register(userData);
      
      // Store token and user data
      if (response.token) {
        setToken(response.token);
        localStorage.setItem('token', response.token);
      }

      if (response.user) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Logout function
   * Clears user data and token from state and localStorage
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    authApi.logout();
  };

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
