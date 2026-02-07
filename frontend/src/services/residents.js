// ONLY MODIFY THIS PART WHEN CONNECTING TO THE BACKEND
export const getResidents = async () => {
  // API Call Simulation
  const data = [
    { id: 1, name: 'Juan Dela Cruz', role: 'Head of Household', age: 65, address: 'Blk 12 Lot 4, San Bartolome', purok: 1, status: 'Verified' },
    { id: 2, name: 'Maria Elena Santos', role: 'Member of Household', age: 12, address: '152-B Katipunan St.', purok: 4, status: 'Verified' },
    { id: 5, name: 'Carlos Garcia', role: 'Head of Household', age: 41, address: 'Blk 8, Sampaguita St.', purok: 2, status: 'Verified' },
    // ... just add more dummy data here
  ];

  return data.map(r => ({
    ...r,
    sector: r.age >= 60 ? "Senior" : r.age < 18 ? "Minor" : (r.id === 5 ? "PWD" : "Adult")
  }));
};

export const updateResident = async (id, updatedData) => {
  console.log("Pushing to Backend ID:", id, updatedData);
  // When backend is ready: return await axios.put(`/api/residents/${id}`, updatedData);
  return { success: true, data: updatedData };
};

export const deleteResident = async (id) => {
  console.log("Deleting from Backend ID:", id);
  // When backend is ready: return await axios.delete(`/api/residents/${id}`);
  return { success: true };
};