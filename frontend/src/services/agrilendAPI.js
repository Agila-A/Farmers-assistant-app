const API_BASE_URL = 'http://localhost:5000/api';

// Generic API request function for AgriLend
const agrilendApiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'AgriLend API request failed');
    }

    return data;
  } catch (error) {
    console.error('AgriLend API Error:', error);
    throw error;
  }
};

// Equipment API functions for AgriLend
export const agrilendEquipmentAPI = {
  // Get all equipment with optional filters
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = `/equipment${queryParams ? `?${queryParams}` : ''}`;
    return agrilendApiRequest(endpoint);
  },

  // Get equipment by ID
  getById: async (id) => {
    return agrilendApiRequest(`/equipment/${id}`);
  },

  // Create new equipment listing
  create: async (equipmentData) => {
    return agrilendApiRequest('/equipment', {
      method: 'POST',
      body: JSON.stringify(equipmentData),
    });
  },

  // Update equipment listing
  update: async (id, equipmentData) => {
    return agrilendApiRequest(`/equipment/${id}`, {
      method: 'PUT',
      body: JSON.stringify(equipmentData),
    });
  },

  // Delete equipment listing
  delete: async (id, ownerId) => {
    return agrilendApiRequest(`/equipment/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ ownerId }),
    });
  },

  // Get equipment by owner (for user's listings)
  getByOwner: async (ownerId) => {
    return agrilendApiRequest(`/equipment/owner/${ownerId}`);
  },
};

// Rental Request API functions for AgriLend
export const agrilendRentalAPI = {
  // Create rental request
  create: async (requestData) => {
    return agrilendApiRequest('/rental-requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  },

  // Get requests for lender (equipment owner)
  getLenderRequests: async (ownerId) => {
    return agrilendApiRequest(`/rental-requests/lender/${ownerId}`);
  },

  // Get requests for borrower
  getBorrowerRequests: async (requesterId) => {
    return agrilendApiRequest(`/rental-requests/borrower/${requesterId}`);
  },

  // Get request by ID
  getById: async (id) => {
    return agrilendApiRequest(`/rental-requests/${id}`);
  },

  // Update request status (approve/reject)
  updateStatus: async (id, status, ownerId) => {
    return agrilendApiRequest(`/rental-requests/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, ownerId }),
    });
  },

  // Cancel request
  cancel: async (id, requesterId) => {
    return agrilendApiRequest(`/rental-requests/${id}/cancel`, {
      method: 'PUT',
      body: JSON.stringify({ requesterId }),
    });
  },

  // Complete rental
  complete: async (id, ownerId) => {
    return agrilendApiRequest(`/rental-requests/${id}/complete`, {
      method: 'PUT',
      body: JSON.stringify({ ownerId }),
    });
  },
};

// User API functions for AgriLend (for equipment owners/renters)
export const agrilendUserAPI = {
  // Get user by ID
  getById: async (id) => {
    return agrilendApiRequest(`/users/${id}`);
  },

  // Create user
  create: async (userData) => {
    return agrilendApiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Update user
  update: async (id, userData) => {
    return agrilendApiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};

// Main AgriLend API export
export const agrilendAPI = {
  equipment: agrilendEquipmentAPI,
  rental: agrilendRentalAPI,
  user: agrilendUserAPI,
};

export default agrilendAPI; 