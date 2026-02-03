// src/services/verification.js

// 1. Import images so they are properly bundled by Vite/Webpack
import idFrontSample from '../assets/idfront.png';
import idBackSample from '../assets/idback.png';

// Mock Data - Replace with API calls (Axios) once the backend is ready
let mockResidents = Array(8).fill(null).map((_, i) => ({
  id: i + 1,
  name: i === 0 ? 'Dexter Mark B. Binongcal' : `Resident Name ${i + 1}`,
  idType: 'PhilSys ID',
  date: 'Jan 18, 2026',
  status: 'Pending',
  details: {
    birthdate: 'Jan 01, 1990',
    sex: 'Male',
    civilStatus: 'Single',
    purok: '1',
    address: '833 Sisa St., Sampaloc, Manila',
    // Used imported variables instead of hardcoded local C:\ paths
    idFront: idFrontSample, 
    idBack: idBackSample
  }
}));

export const verificationService = {
  // Fetch all submissions
  getSubmissions: async () => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => resolve(mockResidents), 800);
    });
  },

  // Update submission status (Approve/Reject)
  updateStatus: async (id, status, reason = "") => {
    return new Promise((resolve) => {
      mockResidents = mockResidents.map(r => 
        r.id === id ? { ...r, status, rejectionReason: reason } : r
      );
      // Simulate network delay
      setTimeout(() => resolve({ success: true }), 500);
    });
  }
};