import axios from 'axios';
import { API_BASE_URL } from '../../../config/api';

export const authService = {
    getLocations: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/locations`);
            return response.data;
        } catch (error) {
            console.error('Fetch Locations Error:', error);
            throw error;
        }
    },

    register: async (formData) => {
        try {
            const data = new FormData();
            
            // Append all non-file fields
            Object.keys(formData).forEach(key => {
                if (key !== 'idFront' && key !== 'idBack') {
                    // Convert boolean to integer for Laravel compatibility
                    const value = typeof formData[key] === 'boolean' ? (formData[key] ? 1 : 0) : (formData[key] || '');
                    data.append(key, value);
                }
            });

            // Append Files correctly
            if (formData.idFront instanceof File) {
                data.append('idFront', formData.idFront);
            }
            if (formData.idBack instanceof File) {
                data.append('idBack', formData.idBack);
            }

            const response = await axios.post(`${API_BASE_URL}/register`, data, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Registration API Error:', error.response?.data || error.message);
            throw error;
        }
    },

    track: async (trackingNumber) => {
        try {
            const cleanedNumber = trackingNumber.toUpperCase().trim();
            const response = await axios.get(`${API_BASE_URL}/track/${cleanedNumber}`);
            return response.data;
        } catch (error) {
            console.error('Tracking Error:', error.response?.data || error);
            throw error;
        }
    },

    login: async (username, password) => {
        return {
            success: true,
            user: { username, role: 'Admin' },
            token: 'dev-token-' + Date.now()
        };
    }
};