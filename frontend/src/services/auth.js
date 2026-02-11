import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const authService = {
  /**
   * ✅ FIXED: Register new resident
   */
  register: async (formData) => {
    try {
      const data = new FormData();
      
      // Personal Info
      data.append('firstName', formData.firstName);
      data.append('middleName', formData.middleName || '');
      data.append('lastName', formData.lastName);
      data.append('suffix', formData.suffix || '');
      data.append('birthdate', formData.birthdate);
      data.append('gender', formData.gender);
      
      // Contact
      data.append('contact', formData.contact);
      data.append('email', formData.email || '');
      
      // Address
      data.append('houseNumber', formData.houseNumber);
      data.append('purok', formData.purok);
      data.append('street', formData.street);
      
      // Household & Additional Info
      data.append('householdPosition', formData.householdPosition);
      data.append('maritalStatus', formData.maritalStatus || '');
      data.append('nationality', formData.nationality || 'Filipino'); // ✅ FIXED: Send as string
      data.append('sector', formData.sector);
      data.append('residencyStatus', formData.residencyStatus);
      data.append('isVoter', formData.isVoter ? 1 : 0); // ✅ FIXED: Convert boolean to 0/1
      
      // Employment
      data.append('employmentStatus', formData.employmentStatus || 'N/A');
      data.append('occupation', formData.occupation || '');
      data.append('incomeSource', formData.incomeSource || 'N/A');
      data.append('monthlyIncome', formData.monthlyIncome || 0);
      
      // Education
      data.append('educationalStatus', formData.educationalStatus || 'N/A');
      data.append('schoolType', formData.schoolType || 'N/A');
      data.append('schoolLevel', formData.schoolLevel || 'N/A');
      data.append('highestGrade', formData.highestGrade || 'N/A');
      
      // ID Files
      data.append('idFront', formData.idFront);
      data.append('idBack', formData.idBack);
      data.append('idType', formData.idType || 'Government ID');
      
      const response = await axios.post(`${API_BASE_URL}/register`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      return response.data;
      
    } catch (error) {
      console.error('Registration Error:', error.response?.data || error);
      throw error;
    }
  },

  /**
   * ✅ FIXED: Track registration via tracking number
   */
  track: async (trackingNumber) => {
    try {
      const cleanedNumber = trackingNumber.toUpperCase().trim();
      
      // ✅ CRITICAL FIX: Changed from query param to URL path parameter
      const response = await axios.get(`${API_BASE_URL}/track/${cleanedNumber}`);
      
      return response.data;
      
    } catch (error) {
      console.error('Tracking Error:', error.response?.data || error);
      throw error;
    }
  },

  /**
   * Login (Development bypass)
   */
  login: async (username, password) => {
    return {
      success: true,
      user: { username, role: 'Admin' },
      token: 'dev-token-' + Date.now()
    };
  }
};