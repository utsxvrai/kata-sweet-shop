import api from './axios.config';

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.username - User's username
 * @param {string} userData.password - User's password
 * @param {string} userData.role - User's role (optional)
 * @returns {Promise<Object>} Response data with token and user info
 */
export const register = async (userData) => {
  try {
    const response = await api.post('/user/register', userData);
    
    // Store token if registration is successful
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

/**
 * Login user
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.username - User's username
 * @param {string} credentials.password - User's password
 * @returns {Promise<Object>} Response data with token and user info
 */
export const login = async (credentials) => {
  try {
    const response = await api.post('/user/signin', credentials);
    
    // Store token if login is successful
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

/**
 * Logout user
 * Clears token from localStorage
 */
export const logout = () => {
  localStorage.removeItem('token');
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if token exists
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
