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
      console.error("Hook Load Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status, extraData = {}) => {
    // If approving, include the sector from the submission so it's saved to backend
    if (status === 'Verified') {
      const submission = submissions.find(s => s.id === id);
      if (submission?.details?.sector) {
        extraData.sector = submission.details.sector;
      }
    }
    
    const res = await verificationService.updateStatus(id, status, extraData);
    if (res.success) {
      await loadData(); // Auto-refresh verification list
    }
    return res;
  };

  useEffect(() => { loadData(); }, []);

  return { submissions, loading, updateStatus, refresh: loadData };
};