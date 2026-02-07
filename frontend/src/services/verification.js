// src/services/verification.js
import idFrontSample from '../assets/idfront.png';
import idBackSample from '../assets/idback.png';

// UTILITY: Function to compute age based on birthdate
export const calculateAge = (birthdate) => {
  if (!birthdate) return 'N/A';
  const birthDateObj = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age;
};

const realisticNames = [
  'Dexter Mark B. Binongcal', 'Juan Carlo Reyes', 'Maria Angelica Santos',
  'Jose Miguel Cruz', 'Kristine Louise Navarro', 'Ryan Gabriel Flores',
  'Angela Mae dela Cruz', 'Mark Anthony Garcia', 'Jennifer Louise Ramos',
  'Christian Paul Villanueva', 'Patricia Ann Mendoza', 'Jerome Luis Aquino',
  'Nicole Faith Morales', 'Alexander John Tan', 'Christine Joy Castillo',
  'Michael Ray Soriano', 'Elaine Marie Lopez', 'Daniel Patrick Ramos',
  'Jocelyn Grace Bautista', 'Kevin Mark de Guzman', 'Stephanie Ann Pineda',
  'Brian Kenneth Velasco', 'Shiela Mae Cordero', 'Ramon Antonio Lim',
  'Clarissa Joy Navarro', 'Francis Michael Aquino', 'Alyssa Marie Santos',
  'Mark Joseph Villanueva', 'Catherine Joy Garcia', 'Luis Miguel Fernandez'
];

// Randomized mock data to make age more realistic
let mockResidents = realisticNames.map((name, i) => {
  const yearsToSubtract = 18 + (i % 40); // Random age from 18 to 58
  const bdate = new Date();
  bdate.setFullYear(bdate.getFullYear() - yearsToSubtract);
  
  return {
    id: i + 1,
    name,
    idType: 'PhilSys ID',
    date: 'Jan 18, 2026',
    status: 'Pending',
    details: {
      birthdate: bdate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      sex: i % 2 === 0 ? 'Male' : 'Female',
      civilStatus: i % 3 === 0 ? 'Single' : 'Married',
      purok: `${(i % 5) + 1}`,
      address: `${100 + i} Sisa St., Sampaloc, Manila`,
      idFront: idFrontSample, 
      idBack: idBackSample
    }
  };
});

export const verificationService = {
  getSubmissions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockResidents), 800);
    });
  },

  updateStatus: async (id, status, reason = "") => {
    return new Promise((resolve) => {
      mockResidents = mockResidents.map(r => 
        r.id === id ? { ...r, status, rejectionReason: reason } : r
      );
      setTimeout(() => resolve({ success: true }), 500);
    });
  }
};