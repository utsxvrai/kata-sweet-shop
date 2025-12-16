import api from './axios.config';

/**
 * Fetch all sweets
 * @returns {Promise<Array>} Array of sweet objects
 */
export const getAllSweets = async () => {
  try {
    const response = await api.get('/sweets');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch sweets' };
  }
};

/**
 * Fetch a single sweet by ID
 * @param {string} sweetId - The ID of the sweet
 * @returns {Promise<Object>} Sweet object
 */
export const getSweetById = async (sweetId) => {
  try {
    const response = await api.get(`/sweets/${sweetId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch sweet details' };
  }
};

/**
 * Search sweets by name
 * @param {string} searchTerm - Search term for sweet name
 * @returns {Promise<Array>} Array of matching sweet objects
 */
export const searchSweets = async (searchTerm) => {
  try {
    const response = await api.get('/sweets/search', {
      params: { name: searchTerm }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to search sweets' };
  }
};

/**
 * Purchase a sweet
 * @param {string} sweetId - The ID of the sweet to purchase
 * @param {number} quantity - Quantity to purchase
 * @returns {Promise<Object>} Purchase confirmation
 */
export const purchaseSweet = async (sweetId, quantity = 1) => {
  try {
    const response = await api.post(`/sweets/${sweetId}/purchase`, { quantity });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to purchase sweet' };
  }
};

/**
 * Add a new sweet (Admin only)
 * @param {Object} sweetData - Sweet data
 * @returns {Promise<Object>} Created sweet object
 */
export const addSweet = async (sweetData) => {
  try {
    const response = await api.post('/sweets', sweetData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add sweet' };
  }
};

/**
 * Update sweet stock (Admin only)
 * @param {string} sweetId - The ID of the sweet
 * @param {number} quantity - New stock quantity
 * @returns {Promise<Object>} Updated sweet object
 */
export const restockSweet = async (sweetId, quantity) => {
  try {
    const response = await api.patch(`/sweets/${sweetId}/restock`, { quantity });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to restock sweet' };
  }
};

/**
 * Delete a sweet (Admin only)
 * @param {string} sweetId - The ID of the sweet to delete
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteSweet = async (sweetId) => {
  try {
    const response = await api.delete(`/sweets/${sweetId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete sweet' };
  }
};
