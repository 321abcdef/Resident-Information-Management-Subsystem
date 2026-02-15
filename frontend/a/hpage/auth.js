// import axios from 'axios';
// import { API_BASE_URL } from '../config/api';

// export const authService = {
//   register: async (formData) => {
//     try {
//       const data = new FormData();
      
//       // Personal Info
//       data.append('firstName', formData.firstName || '');
//       data.append('middleName', formData.middleName || '');
//       data.append('lastName', formData.lastName || '');
//       data.append('suffix', formData.suffix || '');
//       data.append('birthdate', formData.birthdate || '');
//       data.append('gender', formData.gender || '');
//       data.append('birthRegistration', formData.birthRegistration || 'Registered');
      
//       // Contact & Account
//       data.append('contact', formData.contact || '');
//       data.append('email', formData.email || '');
      
//       // Address Info
//       data.append('houseNumber', formData.houseNumber || '');
//       data.append('purok', formData.purok || '');
//       data.append('street', formData.street || '');
      
//       // Household & Status Info
//       data.append('householdPosition', formData.householdPosition || '');
//       data.append('maritalStatus', formData.maritalStatus || '');
//       data.append('nationality', formData.nationality || 'Filipino');
//       data.append('sector', formData.sector || '7');
//       data.append('residencyStatus', formData.residencyStatus || 'New Resident');
      
   
//       if (formData.residencyStartDate) {
//         data.append('residencyStartDate', formData.residencyStartDate);
//       }
      
//       // Boolean conversion
//       data.append('isVoter', formData.isVoter ? 1 : 0);
      
//       // Employment Data
//       data.append('employmentStatus', formData.employmentStatus || 'N/A');
//       data.append('occupation', formData.occupation || '');
//       data.append('incomeSource', formData.incomeSource || 'N/A');
//       data.append('monthlyIncome', formData.monthlyIncome || 'No Income');
      
//       // Education Data
//       data.append('educationalStatus', formData.educationalStatus || 'N/A');
//       data.append('schoolType', formData.schoolType || 'N/A');
//       data.append('schoolLevel', formData.schoolLevel || 'N/A');
//       data.append('highestGrade', formData.highestGrade || 'N/A');
      
//       // ID Files
//       if (formData.idFront) data.append('idFront', formData.idFront);
//       if (formData.idBack) data.append('idBack', formData.idBack);
//       data.append('idType', formData.idType || 'Government ID');
      
//       const response = await axios.post(`${API_BASE_URL}/register`, data, {
//         headers: { 
//           'Content-Type': 'multipart/form-data',
//           'Accept': 'application/json'
//         }
//       });
      
//       return response.data;
      
//     } catch (error) {
//       console.error('Registration Error:', error.response?.data || error);
//       throw error;
//     }
//   },

//   track: async (trackingNumber) => {
//     try {
//       const cleanedNumber = trackingNumber.toUpperCase().trim();
//       const response = await axios.get(`${API_BASE_URL}/track/${cleanedNumber}`);
//       return response.data;
//     } catch (error) {
//       console.error('Tracking Error:', error.response?.data || error);
//       throw error;
//     }
//   },

//   login: async (username, password) => {
//     return {
//       success: true,
//       user: { username, role: 'Admin' },
//       token: 'dev-token-' + Date.now()
//     };
//   }
// };