// Data Transformer for clean UI
const transformResident = (r) => ({
  ...r,
  sector: r.age >= 60 ? "Senior" : r.age < 18 ? "Minor" : (r.is_pwd ? "PWD" : "Adult"),
});

export const residentService = {
  getResidents: async () => {
    // API Simulation
    const data = [
      { id: 1, name: 'Juan Dela Cruz', role: 'Head of Household', age: 65, address: 'Blk 12 Lot 4, San Bartolome', purok: 1, status: 'Verified' },
      { id: 2, name: 'Maria Elena Santos', role: 'Member of Household', age: 12, address: '152-B Katipunan St.', purok: 4, status: 'Verified' },
      { id: 5, name: 'Carlos Garcia', role: 'Head of Household', age: 41, address: 'Blk 8, Sampaguita St.', purok: 2, is_pwd: true, status: 'Verified' },
    ];
    return data.map(transformResident);
  },

  updateResident: async (id, updatedData) => {
    console.log("Backend Sync:", id, updatedData);
    // return await axios.put(`/api/residents/${id}`, updatedData);
    return { success: true, data: updatedData };
  },

  deleteResident: async (id) => {
    console.log("Deleting ID:", id);
    // return await axios.delete(`/api/residents/${id}`);
    return { success: true };
  }
};