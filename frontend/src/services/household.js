// services/household.js
export const householdService = {
  getAll: async () => {
    try {
      // TODO: const res = await axios.get('/api/households'); return res.data;
      return [
        {
          id: "HH-2024-001",
          head: "Juan Dela Cruz",
          address: "Purok 1, Brgy. San Jose",
          purok: "1",
          members: 4,
          status: "Verified",
          memberList: [
            { name: "Juan Dela Cruz", relation: "Head", sector: "Adult", age: 45 },
            { name: "Maria Dela Cruz", relation: "Spouse", sector: "Adult", age: 42 },
            { name: "Pedro Dela Cruz", relation: "Son", sector: "Minor", age: 15 },
            { name: "Santy Dela Cruz", relation: "Father", sector: "Senior", age: 70 },
          ]
        },
        {
          id: "HH-2024-002",
          head: "Elena Ramos",
          address: "Purok 3, Brgy. San Jose",
          purok: "3",
          members: 3,
          status: "Verified",
          memberList: [
            { name: "Elena Ramos", relation: "Head", sector: "Senior", age: 68 },
            { name: "Roberto Ramos", relation: "Son", sector: "Adult", age: 35 },
            { name: "Angel Ramos", relation: "Granddaughter", sector: "Infant", age: 2 },
          ]
        }
      ];
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  },
  
  delete: async (id) => {
    // TODO: await axios.delete(`/api/households/${id}`);
    return true;
  }
};  