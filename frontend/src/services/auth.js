import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const authService = {
    login: async (credentials) => {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    },

    register: async (userData) => {
        const formData = new FormData();
        Object.keys(userData).forEach(key => {
            if (userData[key] !== null && userData[key] !== undefined) {
                formData.append(key, userData[key]);
            }
        });

        try {
            const response = await axios.post(`${API_URL}/register`, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    track: async (number) => {
        const response = await axios.get(`${API_URL}/track/${number}`);
        return response.data; 
    }
};