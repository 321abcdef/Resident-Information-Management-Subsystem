import { useState, useEffect, useMemo } from 'react';
import { residentService } from '../services/residents';

export const useResidents = () => {
  const [allResidents, setAllResidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await residentService.getResidents();
    setAllResidents(data || []);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  // Filter logic inside hook
  const filteredResidents = useMemo(() => {
    let results = allResidents.filter(r =>
      (r.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (r.address?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );
    if (categoryFilter !== "All") {
      results = results.filter(r => r.sector === categoryFilter);
    }
    return results;
  }, [searchTerm, categoryFilter, allResidents]);

  const handleUpdate = async (updatedData) => {
    const res = await residentService.updateResident(updatedData.id, updatedData);
    if (res.success) loadData();
    return res;
  };

  return {
    residents: filteredResidents,
    loading,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    handleUpdate,
    refresh: loadData
  };
};