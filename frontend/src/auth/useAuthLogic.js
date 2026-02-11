import { useState } from 'react';
import { authService } from '../services/auth';

export const useAuthLogic = (navigate, updateUser) => {
  const [loading, setLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(null);
  const [trackingNum, setTrackingNum] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "", 
    middleName: "", 
    lastName: "", 
    suffix: "", 
    birthdate: "", 
    age: "",
    gender: "", 
    
    // Additional Info
    sector: "General Population", 
    householdPosition: "",
    maritalStatus: "",
    nationality: "Filipino", // ✅ FIXED: Default nationality as string
    residencyStatus: "New Resident",
    isVoter: false, // ✅ FIXED: Boolean instead of string
    
    // Address
    purok: "", 
    street: "", 
    houseNumber: "", 
    
    // Contact
    contact: "", 
    email: "",
    
    // Employment
    employmentStatus: "N/A",
    occupation: "",
    incomeSource: "N/A",
    monthlyIncome: "",
    
    // Education
    educationalStatus: "N/A",
    schoolType: "N/A",
    schoolLevel: "N/A",
    highestGrade: "N/A",
    
    // IDs
    idFront: null, 
    idBack: null,
    idType: "",
    
    // Login
    username: "", 
    password: ""
  });

  /**
   * Handle form field changes
   */
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    
    // Handle file uploads
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      return;
    }
    
    // Handle checkboxes
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
      return;
    }
    
    // Handle birthdate with age calculation
    if (name === 'birthdate') {
      const birthDate = new Date(value);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      
      const finalAge = (isNaN(calculatedAge) || calculatedAge < 0) ? "" : calculatedAge;
      
      setFormData(prev => ({ 
        ...prev, 
        birthdate: value, 
        age: finalAge 
      }));
      return;
    }
    
    // Default text input handling
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Track registration status via tracking number
   */
  const handleTrackSearch = async (val) => {
    const input = val.toUpperCase().trim();
    setTrackingNum(input);
    
    // Only search when format is valid (BGN-XXXX = 8 chars minimum)
    if (input.length >= 8) {
      try {
        const res = await authService.track(input);
        
        if (res.success) {
          setSearchResult({
            trackingNumber: res.data.trackingNumber,
            name: res.data.name,
            status: res.data.status,
            message: res.data.message,
            dateSubmitted: res.data.dateSubmitted
          });
        }
      } catch (err) {
        console.error("Tracking error:", err);
        setSearchResult({ 
          status: "NOT_FOUND", 
          message: "Tracking number not found in our records." 
        });
      }
    } else {
      setSearchResult(null);
    }
  };

  /**
   * Submit authentication (Login or Register)
   */
  const submitAuth = async (isSignup) => {
    setLoading(true);
    
    try {
      if (isSignup) {
        // === REGISTRATION ===
        const res = await authService.register(formData);
        
        if (res.success) {
          setAuthSuccess({
            title: "Registration Submitted!",
            msg: "Download your slip and use the tracking number to monitor your application status.",
            code: res.trackingNumber,
            residentData: res.residentData
          });
        } else {
          alert(res.message || "Registration failed. Please try again.");
        }
        
      } else {
        // === LOGIN (Development Bypass) ===
        console.log("🔓 Login Bypassed - Development Mode");
        
        localStorage.setItem("token", "dev-token-" + Date.now());
        localStorage.setItem("userRole", "Admin");
        
        updateUser({ 
          name: "Admin Developer", 
          role: "Admin",
          username: formData.username || "admin"
        });
        
        navigate("/dashboard");
      }
      
    } catch (error) {
      console.error("Auth Error:", error);
      
      const errorMsg = error.response?.data?.message 
        || error.message 
        || "Something went wrong. Please try again.";
      
      alert(errorMsg);
      
    } finally {
      setLoading(false);
    }
  };

  return { 
    formData, 
    handleChange, 
    submitAuth, 
    loading, 
    authSuccess, 
    setAuthSuccess, 
    trackingNum, 
    handleTrackSearch, 
    searchResult 
  };
};