import { useState, useEffect } from 'react';
import { authService } from './auth';

export const useAuthLogic = (navigate, updateUser) => {
  const [loading, setLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(null);
  const [trackingNum, setTrackingNum] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  
  const [purokList, setPurokList] = useState([]);
  const [allStreets, setAllStreets] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "", middleName: "", lastName: "", suffix: "", 
    birthdate: "", age: "", gender: "", 
    sector: "", householdPosition: "", maritalStatus: "", nationality: "Filipino", 
    residencyStatus: "", residencyStartDate: "", isVoter: false, 
    birthRegistration: "Registered",
    purok: "", street: "", houseNumber: "", 
    contact: "", email: "",
    employmentStatus: "N/A", occupation: "", incomeSource: "N/A", monthlyIncome: "0",
    educationalStatus: "N/A", schoolType: "N/A", schoolLevel: "N/A", highestGrade: "N/A",
    idFront: null,
    idBack: null,
    idType: "Barangay ID",
    username: "", password: ""
  });

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await authService.getLocations();
        if (res.success) {
          setPurokList(res.puroks || []);
          setAllStreets(res.streets || []);
        }
      } catch (err) {
        console.error("Failed to load locations.");
      }
    };
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      const selectedFile = files[0];
      if (selectedFile) {
        if (!selectedFile.type.startsWith('image/')) {
          alert("Images only please (JPG, PNG).");
          e.target.value = ""; 
          return;
        }
        if (selectedFile.size > 10 * 1024 * 1024) {
          alert("File is too large (Max 10MB).");
          e.target.value = "";
          return;
        }
        setFormData(prev => ({ ...prev, [name]: selectedFile }));
      }
      return;
    }

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
      return;
    }

    if (name === 'contact') {
      const val = value.replace(/\D/g, '').substring(0, 11);
      setFormData(prev => ({ ...prev, [name]: val }));
      return;
    }

    if (name === 'birthdate') {
      const birthDate = new Date(value);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) calculatedAge--;
      
      const finalAge = isNaN(calculatedAge) || calculatedAge < 0 ? "" : calculatedAge;
      setFormData(prev => ({ 
        ...prev, 
        birthdate: value, 
        age: finalAge,
        sector: finalAge >= 60 ? "3" : prev.sector 
      }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitAuth = async (isSignup) => {
    if (isSignup) {
      if (!formData.idFront || !formData.idBack) {
        alert("Please upload front and back of your ID.");
        return;
      }
    }

    setLoading(true);
    try {
      if (isSignup) {
        const res = await authService.register(formData);
        if (res.success) {
          setAuthSuccess({
            title: "Registration Submitted!",
            msg: "Please wait for verification.",
            code: res.trackingNumber,
            resident: res.resident
          });
        }
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData?.errors) {
        const firstError = Object.values(errorData.errors)[0][0];
        alert(`Validation: ${firstError}`);
      } else {
        alert(errorData?.message || "Internal server error.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTrackSearch = async (val) => {
    const input = val.toUpperCase().trim();
    setTrackingNum(input);
    if (input.length >= 8) {
      try {
        const res = await authService.track(input);
        if (res.success) setSearchResult(res.data);
      } catch (err) {
        setSearchResult({ status: "NOT_FOUND", message: "Not found." });
      }
    } else {
      setSearchResult(null);
    }
  };

  return { 
    formData, handleChange, submitAuth, loading, authSuccess, 
    setAuthSuccess, trackingNum, handleTrackSearch, searchResult,
    purokList, allStreets
  };
};