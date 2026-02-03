export const getResidents = async () => {
  const data = [
    { id: 1, name: 'Juan Dela Cruz', role: 'Head of Household', age: 65, address: 'Blk 12 Lot 4, San Bartolome', purok: 1, status: 'Verified' },
    { id: 2, name: 'Maria Elena Santos', role: 'Member of Household', age: 12, address: '152-B Katipunan St.', purok: 4, status: 'Verified' },
    { id: 3, name: 'Jane Dela Paz', role: 'Head of Household', age: 61, address: 'Sitio Pag-asa', purok: 2, status: 'Verified' },
    { id: 4, name: 'Luzviminda Valdez', role: 'Member of Household', age: 72, address: '77 Diamond St.', purok: 3, status: 'Verified' },
    { id: 5, name: 'Carlos Garcia', role: 'Head of Household', age: 41, address: 'Blk 8, Sampaguita St.', purok: 2, status: 'Verified' },
    { id: 6, name: 'Alma Lopez', role: 'Member of Household', age: 17, address: 'Blk 3, Pine St.', purok: 1, status: 'Verified' },
    { id: 10, name: 'Cecilia Reyes', role: 'Member of Household', age: 31, address: 'Blk 10, 5th Ave.', purok: 1, status: 'Verified' },
    { id: 11, name: 'John Cruz', role: 'Head of Household', age: 35, address: 'Blk 3, 12th Street, San Bartolome, Novaliches, QC', purok: 2, status: 'Verified' },
    { id: 12, name: 'Maria Santos', role: 'Member of Household', age: 28, address: 'Blk 5, Tandang Sora St., San Bartolome, Novaliches, QC', purok: 1, status: 'Verified' },
    { id: 13, name: 'Pedro Rizal', role: 'Head of Household', age: 50, address: 'Purok 3, Congressional Ave, San Bartolome, Novaliches, QC', purok: 3, status: 'Verified' },
    { id: 14, name: 'Ana Garcia', role: 'Member of Household', age: 22, address: 'Blk 2, 8th Avenue, San Bartolome, Novaliches, QC', purok: 2, status: 'Verified' },
    { id: 15, name: 'Jose Luis', role: 'Head of Household', age: 45, address: 'Blk 4, 10th Street, San Bartolome, Novaliches, QC', purok: 1, status: 'Verified' },
    { id: 16, name: 'Liza Mendoza', role: 'Member of Household', age: 38, address: 'Blk 3, 7th Avenue, San Bartolome, Novaliches, QC', purok: 1, status: 'Verified' },
    { id: 17, name: 'Alfredo Cruz', role: 'Head of Household', age: 52, address: 'Blk 2, 5th Avenue, San Bartolome, Novaliches, QC', purok: 3, status: 'Verified' },
    { id: 18, name: 'Rosalinda Reyes', role: 'Member of Household', age: 30, address: 'Blk 6, 9th Avenue, San Bartolome, Novaliches, QC', purok: 2, status: 'Verified' },
    { id: 19, name: 'Carlos Santos', role: 'Head of Household', age: 47, address: 'Blk 8, 14th Street, San Bartolome, Novaliches, QC', purok: 2, status: 'Verified' },
    { id: 20, name: 'Fely Cruz', role: 'Member of Household', age: 24, address: 'Blk 5, Tandang Sora St., San Bartolome, Novaliches, QC', purok: 2, status: 'Verified' },
    { id: 21, name: 'Eduardo Garcia', role: 'Head of Household', age: 41, address: 'Blk 7, 12th Street, San Bartolome, Novaliches, QC', purok: 1, status: 'Verified' },
    { id: 22, name: 'Mayra Dizon', role: 'Member of Household', age: 29, address: 'Blk 4, 15th Avenue, San Bartolome, Novaliches, QC', purok: 1, status: 'Verified' },
    { id: 23, name: 'Emilio Reyes', role: 'Head of Household', age: 49, address: 'Blk 9, 11th Avenue, San Bartolome, Novaliches, QC', purok: 2, status: 'Verified' },
    { id: 24, name: 'Nina Velasquez', role: 'Member of Household', age: 32, address: 'Blk 10, 6th Avenue, San Bartolome, Novaliches, QC', purok: 3, status: 'Verified' },
    { id: 25, name: 'Victor Palma', role: 'Head of Household', age: 55, address: 'Blk 11, Congressional Ave, San Bartolome, Novaliches, QC', purok: 3, status: 'Verified' },
    { id: 26, name: 'Marina Suarez', role: 'Member of Household', age: 43, address: 'Blk 1, 12th Street, San Bartolome, Novaliches, QC', purok: 2, status: 'Verified' },
    { id: 27, name: 'Juanito Espino', role: 'Head of Household', age: 58, address: 'Blk 6, 9th Avenue, San Bartolome, Novaliches, QC', purok: 2, status: 'Verified' },
    { id: 28, name: 'Catherine Ramirez', role: 'Member of Household', age: 26, address: 'Blk 2, 5th Avenue, San Bartolome, Novaliches, QC', purok: 1, status: 'Verified' },
    { id: 29, name: 'Ricardo Garcia', role: 'Head of Household', age: 41, address: 'Blk 4, 7th Street, San Bartolome, Novaliches, QC', purok: 1, status: 'Verified' },
    { id: 30, name: 'Gloria Mendoza', role: 'Member of Household', age: 36, address: 'Blk 8, 11th Street, San Bartolome, Novaliches, QC', purok: 3, status: 'Verified' },
    { id: 31, name: 'Alfonso Navarro', role: 'Head of Household', age: 48, address: 'Blk 7, 14th Avenue, San Bartolome, Novaliches, QC', purok: 1, status: 'Verified' },
    { id: 32, name: 'Tess Martinez', role: 'Member of Household', age: 34, address: 'Blk 3, 8th Avenue, San Bartolome, Novaliches, QC', purok: 3, status: 'Verified' },
    { id: 33, name: 'Luis Gomez', role: 'Head of Household', age: 52, address: 'Blk 9, 15th Avenue, San Bartolome, Novaliches, QC', purok: 2, status: 'Verified' },
    { id: 34, name: 'Maria Luisa Aquino', role: 'Member of Household', age: 41, address: 'Blk 5, 13th Street, San Bartolome, Novaliches, QC', purok: 3, status: 'Verified' },
    { id: 35, name: 'Ramon Santiago', role: 'Head of Household', age: 46, address: 'Blk 2, 16th Avenue, San Bartolome, Novaliches, QC', purok: 2, status: 'Verified' },
    { id: 36, name: 'Sofia Fernandez', role: 'Member of Household', age: 39, address: 'Blk 1, 10th Street, San Bartolome, Novaliches, QC', purok: 3, status: 'Verified' },
    { id: 37, name: 'Nina Palacios', role: 'Member of Household', age: 33, address: 'Blk 6, 14th Avenue, San Bartolome, Novaliches, QC', purok: 1, status: 'Verified' },
    { id: 38, name: 'Josefa Ramos', role: 'Head of Household', age: 58, address: 'Blk 8, 10th Avenue, San Bartolome, Novaliches, QC', purok: 1, status: 'Verified' },
    { id: 39, name: 'Carlos Molina', role: 'Member of Household', age: 27, address: 'Blk 4, 5th Street, San Bartolome, Novaliches, QC', purok: 3, status: 'Verified' }
  ];

  return data.map(r => {
    let sector = "Adult";
    
    // Priority 1: Check Age for Seniors and Minors
    if (r.age >= 60) {
      sector = "Senior";
    } else if (r.age < 18) {
      sector = "Minor";
    }

    // Priority 2: Override for PWD (if applicable)
    // Note: If you want PWD to show even if they are a Senior, keep this at the bottom.
    if (r.id === 5 || r.id === 10) {
      sector = "PWD"; 
    }

    return { ...r, sector };
  });
};