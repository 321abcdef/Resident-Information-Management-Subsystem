// src/services/auth.js
import axios from 'axios'; // Make sure you have run: npm install axios

const API_URL = 'http://localhost:8000/api';

export const authService = {
  login: async (credentials) => {
    // Current simulation but ready for: axios.post(`${API_URL}/login`, credentials)
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, token: "mock-token-123" }), 1000);
    });
  },

  register: async (userData) => {
    // BECAUSE OF IMAGES: We use FormData
    const formData = new FormData();
    
    // Loop through all keys in userData (firstName, idFront, etc.)
    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key]);
    });

    console.log("Service: Sending FormData to Laravel...", userData);

    /* WHEN LARAVEL IS READY, USE THIS:
    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
    */

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          message: "Registration sent!",
          trackingNumber: "BSB-2026-" + Math.floor(1000 + Math.random() * 9000)
        });
      }, 1500);
    });
  },

  track: async (number) => {
    // For the search bar on the homepage
    // return axios.get(`${API_URL}/track/${number}`);
    console.log("Tracking number:", number);
  }
};

// ONLY MODIFY THIS PART WHEN CONNECTING TO THE BACKEND
export const getResidents = async () => {
  // API Call Simulation
  const data = [
    { id: 1, name: 'Juan Dela Cruz', role: 'Head of Household', age: 65, address: 'Blk 12 Lot 4, San Bartolome', purok: 1, status: 'Verified' },
    { id: 2, name: 'Maria Elena Santos', role: 'Member of Household', age: 12, address: '152-B Katipunan St.', purok: 4, status: 'Verified' },
    { id: 5, name: 'Carlos Garcia', role: 'Head of Household', age: 41, address: 'Blk 8, Sampaguita St.', purok: 2, status: 'Verified' },
    // ... just add more dummy data here
  ];

  return data.map(r => ({
    ...r,
    sector: r.age >= 60 ? "Senior" : r.age < 18 ? "Minor" : (r.id === 5 ? "PWD" : "Adult")
  }));
};

export const updateResident = async (id, updatedData) => {
  console.log("Pushing to Backend ID:", id, updatedData);
  // When backend is ready: return await axios.put(`/api/residents/${id}`, updatedData);
  return { success: true, data: updatedData };
};

export const deleteResident = async (id) => {
  console.log("Deleting from Backend ID:", id);
  // When backend is ready: return await axios.delete(`/api/residents/${id}`);
  return { success: true };
};