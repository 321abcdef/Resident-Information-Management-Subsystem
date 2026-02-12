import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const transformResident = (r) => ({
  ...r,
  name: r.name || `${r.first_name || ''} ${r.last_name || ''}`.trim(),
  address: r.address || r.street,
  // Use the sector exactly as stored - never recalculate it
  sector: r.sector || 'General Population',
});

export const residentService = {
  getResidents: async () => {
    try {
      // Fetch only verified residents from backend API
      const response = await axios.get(`${API_BASE_URL}/residents?status=Verified`);
      const backendResidents = (response.data || []).map(transformResident);
      return backendResidents;
    } catch (error) {
      console.error("Fetch residents error:", error);
      return [];
    }
  },

  updateResident: async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/residents/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Update resident error:", error);
      return { success: false };
    }
  },

  deleteResident: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/residents/${id}`);
      return response.data;
    } catch (error) {
      console.error("Delete resident error:", error);
      return { success: false };
    }
  }
};