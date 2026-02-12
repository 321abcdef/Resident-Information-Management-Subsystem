import { useState, useEffect } from 'react';
import { verificationService } from '../services/verification';

export const useVerification = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading]         = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await verificationService.getSubmissions();
      setSubmissions(data || []);
    } catch (error) {
      console.error("Hook Load Error:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update resident status.
   * Returns the full server response (including accountDetails for Verified).
   */
  const updateStatus = async (id, status) => {
    const res = await verificationService.updateStatus(id, status);
    if (res.success) {
      await loadData(); // Refresh list after any status change
    }
    return res;
  };

  useEffect(() => { loadData(); }, []);

  return { submissions, loading, updateStatus, refresh: loadData };
};