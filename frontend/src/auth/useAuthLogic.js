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
      const finalAge = calculatedAge < 0 ? "Invalid" : calculatedAge;
      setFormData(prev => ({ ...prev, birthdate: value, age: finalAge }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTrackSearch = async (val) => {
    const input = val.toUpperCase();
    setTrackingNum(input);
    if (input.length >= 4) {
      try {
        const res = await authService.track(input);
        setSearchResult(res || { status: "FOR VERIFICATION", message: "Check Brgy. Hall." });
      } catch (err) {
        setSearchResult({ status: "NOT_FOUND", message: "Not found." });
      }
    } else {
      setSearchResult(null);
    }
  };

  const submitAuth = async (isSignup) => {
    setLoading(true);
    try {
      if (isSignup) {
        const res = await authService.register(formData);
        if (res.success) {
          setAuthSuccess({
            title: "Success!",
            msg: "Profile submitted. Save your tracking number.",
            code: res.trackingNumber
          });
        }
      } else {
        const res = await authService.login({ username: formData.username, password: formData.password });
        if (res.success) {
          localStorage.setItem("token", res.token);
          updateUser({ name: res.user?.name || "Staff", role: res.user?.role || "Staff" });
          navigate("/dashboard");
        }
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Check your fields."));
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