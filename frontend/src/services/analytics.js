export const getAnalyticsData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        purokDistribution: [
          { name: "Purok 1", count: 450, seniors: 62, pwd: 25, minors: 145 },
          { name: "Purok 2", count: 320, seniors: 45, pwd: 12, minors: 98 },
          { name: "Purok 3", count: 210, seniors: 15, pwd: 30, minors: 55 }, // High PWD density
          { name: "Purok 4", count: 150, seniors: 10, pwd: 8, minors: 40 },
        ],
        employment: [
          { label: "Employed", count: 500 },
          { label: "Unemployed", count: 120 },
          { label: "Self-Employed", count: 85 },
        ]
      });
    }, 800);
  });
};