// API utility functions for Agrilend feature
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Equipment API functions
export const agrilendEquipmentAPI = {
  // Create new equipment listing
  create: async (equipmentData) => {
    const response = await fetch(`${API_BASE_URL}/equipment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipmentData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create equipment listing');
    }
    
    return await response.json();
  },
  
  // Get all equipment listings
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/equipment`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch equipment listings');
    }
    
    return await response.json();
  },
  
  // Get equipment by ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/equipment/${id}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch equipment details');
    }
    
    return await response.json();
  },
  
  // Update equipment listing
  update: async (id, equipmentData) => {
    const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipmentData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update equipment listing');
    }
    
    return await response.json();
  },
  
  // Delete equipment listing
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete equipment listing');
    }
    
    return await response.json();
  }
};

export default agrilendEquipmentAPI;