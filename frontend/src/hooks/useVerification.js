import { useState, useEffect } from 'react';
import { verificationService } from '../services/verification';

export const useVerification = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await verificationService.getSubmissions();
      setSubmissions(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    // Dynamic confirmation message
    const msg = status === 'For Verification' 
      ? "Change the status of resident to visit Barangay Hall?" 
      : `Are you sure you want to set this to ${status}?`;

    if (!window.confirm(msg)) return { success: false };

    try {
      const res = await verificationService.updateStatus(id, status);
      await loadData(); // Refresh records
      return res;
    } catch (error) {
      return { success: false };
    }
  };

  useEffect(() => { loadData(); }, []);

  return { submissions, loading, updateStatus, refresh: loadData };
};