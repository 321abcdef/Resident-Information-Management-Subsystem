// import { useState } from 'react';
// import { authService } from './auth';

// export const useAuthLogic = (navigate, updateUser) => {
//   const [loading, setLoading] = useState(false);
//   const [authSuccess, setAuthSuccess] = useState(null);
//   const [trackingNum, setTrackingNum] = useState("");
//   const [searchResult, setSearchResult] = useState(null);
  
//   const [formData, setFormData] = useState({
//     firstName: "", middleName: "", lastName: "", suffix: "", 
//     birthdate: "", age: "", gender: "", 
//     sector: "7", householdPosition: "", maritalStatus: "", nationality: "Filipino", 
//     residencyStatus: "", residencyStartDate: "", isVoter: false, 
//     birthRegistration: "",
//     purok: "", street: "", houseNumber: "", 
//     contact: "", email: "",
//     employmentStatus: "N/A", occupation: "", incomeSource: "N/A", monthlyIncome: "0",
//     educationalStatus: "N/A", schoolType: "N/A", schoolLevel: "N/A", highestGrade: "N/A",
//     idFront: null, idBack: null, idType: "Barangay ID",
//     username: "", password: ""
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     // 1. Files
//     if (files) {
//       setFormData(prev => ({ ...prev, [name]: files[0] }));
//       return;
//     }

//     // 2. Checkbox
//     if (type === 'checkbox') {
//       setFormData(prev => ({ ...prev, [name]: checked }));
//       return;
//     }

//     // 3. Contact Number
//     if (name === 'contact') {
//       setFormData(prev => ({ ...prev, [name]: value.replace(/\D/g, '') }));
//       return;
//     }

//     // 4. Future Date Validation
//     if (name === "residencyStartDate" || name === "birthdate") {
//       if (value) {
//         const selectedDate = new Date(value);
//         const today = new Date();
//         if (selectedDate > today) {
//           alert("Bawal po ang future date. Pakisuri ang taon.");
//           return; 
//         }
//       }
//     }

//     // 5. Residency Status Sync (Defaulting logic)
//     if (name === "residencyStatus") {
//       const todayStr = new Date().toISOString().split("T")[0];
//       setFormData(prev => ({
//         ...prev,
//         residencyStatus: value,

//         residencyStartDate: value === "New Resident" 
//           ? todayStr 
//           : (value === "Old Resident" ? "2000-01-01" : prev.residencyStartDate)
//       }));
//       return;
//     }

//     // 6. Age Calculation logic
//     if (name === 'birthdate') {
//       const birthDate = new Date(value);
//       const today = new Date();
//       let calculatedAge = today.getFullYear() - birthDate.getFullYear();
//       const m = today.getMonth() - birthDate.getMonth();
//       if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) calculatedAge--;
      
//       setFormData(prev => ({ 
//         ...prev, 
//         birthdate: value, 
//         age: isNaN(calculatedAge) || calculatedAge < 0 ? "" : calculatedAge 
//       }));
//       return;
//     }

//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleTrackSearch = async (val) => {
//     const input = val.toUpperCase().trim();
//     setTrackingNum(input);
//     if (input.length >= 8) {
//       try {
//         const res = await authService.track(input);
//         if (res.success) setSearchResult(res.data);
//       } catch (err) {
//         setSearchResult({ status: "NOT_FOUND", message: "Not found." });
//       }
//     } else {
//       setSearchResult(null);
//     }
//   };

//   const submitAuth = async (isSignup) => {
//     setLoading(true);
//     try {
//       if (isSignup) {
//         const res = await authService.register(formData);
//         if (res.success) {
//           setAuthSuccess({
//             title: "Registration Submitted!",
//             msg: "Please wait for verification.",
//             code: res.trackingNumber
//           });
//         }
//       } else {
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "May error sa pag-submit.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { 
//     formData, handleChange, submitAuth, loading, 
//     authSuccess, setAuthSuccess, trackingNum, 
//     handleTrackSearch, searchResult 
//   };
// };