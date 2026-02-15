import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const transformResident = (r) => {
    if (!r) return null;
    return {
        ...r,
       
        sector: r.age >= 60 ? "Senior" : r.age < 18 ? "Minor" : (r.is_pwd ? "PWD" : "Adult"),
    };
};

export const residentService = {
    getResidents: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/residents`);
            
        
            const rawData = Array.isArray(response.data) ? response.data : (response.data.data || []);
            
           
            return rawData
                .filter(res => res !== null && typeof res === 'object')
                .map(transformResident);
        } catch (error) {
            console.error("Fetch Error:", error);
            return [];
        }
    },

    updateResident: async (id, updatedData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/residents/${id}`, updatedData);
            return { success: true, data: response.data.data || response.data };
        } catch (error) {
            console.error("Update Error:", error);
            return { success: false, message: error.response?.data?.message || "Server Error" };
        }
    },

    deleteResident: async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/residents/${id}`);
            return { success: true };
        } catch (error) {
            console.error("Delete Error:", error);
            return { success: false };
        }
    }
};