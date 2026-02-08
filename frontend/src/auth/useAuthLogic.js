import { useState } from 'react';
import { authService } from '../services/auth';

export const useAuthLogic = (navigate, updateUser) => {
  const [loading, setLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(null);
  const [trackingNum, setTrackingNum] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "", middleName: "", lastName: "", suffix: "", birthdate: "", age: "",
    gender: "", sector: "General", purok: "", street: "", houseNumber: "", 
    contact: "", idFront: null, idBack: null, username: "", password: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else if (name === 'birthdate') {
      const birthDate = new Date(value);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      const finalAge = (isNaN(calculatedAge) || calculatedAge < 0) ? "" : calculatedAge;
      setFormData(prev => ({ ...prev, birthdate: value, age: finalAge }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTrackSearch = async (val) => {
    const input = val.toUpperCase();
    setTrackingNum(input);
    
    if (input.length >= 8) { // BSB-XXXX format
      try {
        const res = await authService.track(input);
        if (res.success) {
          setSearchResult(res.data); 
        }
      } catch (err) {
        setSearchResult({ status: "NOT_FOUND", message: "Tracking number not found." });
      }
    } else {
      setSearchResult(null);
    }
  };

  const submitAuth = async (isSignup) => {
    setLoading(true);
    try {
      if (isSignup) {
        // REGISTER
        const res = await authService.register(formData);
        if (res.success) {
        
          setAuthSuccess({
            title: "Registration Submitted!",
            msg: "Please download your slip and wait for verification.",
            code: res.trackingNumber 
          });
        }
      } else {
        // LOGIN BYPASS
        console.log("Login Bypassed! Welcome to the Matrix.");
        localStorage.setItem("token", "fake-dev-token-123");
        
        updateUser({ 
          name: "Admin Developer", 
          role: "Admin" 
        });
        
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert("Something went wrong with registration.");
    } finally {
      setLoading(false);
    }
  };

  return { 
    formData, handleChange, submitAuth, loading, 
    authSuccess, setAuthSuccess, trackingNum, 
    handleTrackSearch, searchResult 
  };
};