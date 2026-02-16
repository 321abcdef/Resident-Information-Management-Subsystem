import React, { useState, useEffect } from 'react';
import { Printer } from 'lucide-react';
import ResidentTable from '../components/residents/ResidentTable';
import ResidentFilters from '../components/residents/ResidentFilters';
import Pagination from '../components/common/pagination';
import { useResidents } from '../hooks/useResidents';
import { usePrinter } from '../hooks/usePrinter'; 
import SectorLegend from '@/components/common/SectorLegend';

const Residents = () => {
  const { 
    residents, loading, searchTerm, setSearchTerm, 
    categoryFilter, setCategoryFilter, handleUpdate, handleDelete,
  } = useResidents();
  
  const { printTable } = usePrinter(); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredResidents = residents.filter(r => {
    const fullName = r.name?.toLowerCase() || "";
    const barangayId = r.barangay_id?.toLowerCase() || "";
    const fullAddress = r.full_address?.toLowerCase() || "";
    const searchLower = searchTerm.toLowerCase();

    const matchesSearch = fullName.includes(searchLower) || 
                         barangayId.includes(searchLower) || 
                         fullAddress.includes(searchLower);
    
    // Solidify sector check
    const residentSectorName = (typeof r.sector === 'object' ? r.sector?.name : r.sector) || 'GENERAL POPULATION';
    
    const matchesCategory = categoryFilter === 'All' || 
                           residentSectorName.toUpperCase() === categoryFilter.toUpperCase();

    return matchesSearch && matchesCategory;
  });

  // 2. 🔢 PAGINATION CALCULATIONS: Base on filtered results
 const totalPages = Math.ceil(filteredResidents.length / itemsPerPage) || 1;
  const currentItems = filteredResidents.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const sectorCounts = residents.reduce((acc, r) => {
    const sectorName = (typeof r.sector === 'object' ? r.sector?.name : r.sector) || 'GENERAL POPULATION';
    const key = sectorName.toUpperCase();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
}, {});


  useEffect(() => { setCurrentPage(1); }, [searchTerm, categoryFilter]);

  const handlePrint = () => {
    const printableData = filteredResidents.map(r => {
        let sectorLabel = "GENERAL POPULATION";
        if (typeof r.sector === 'object' && r.sector !== null) {
            sectorLabel = r.sector.name;
        } else if (typeof r.sector === 'string' && r.sector.trim() !== "") {
            sectorLabel = r.sector;
        }

        return {
            ...r,
            sector: sectorLabel.toUpperCase(), 
            full_info_address: `${r.full_address || ''} (Purok ${r.temp_purok_id || 'N/A'})`.trim()
        };
    });

    const columns = [
        { header: 'NAME OF RESIDENT', key: 'name', style: 'font-weight: bold; font-size: 14px; border-bottom: 1px solid #ccc; padding: 10px 5px;' },
        { header: 'AGE', key: 'age', style: 'text-align: center; font-size: 14px; border-bottom: 1px solid #ccc; width: 60px;' },
        { header: 'ADDRESS / ZONE', key: 'full_info_address', style: 'font-size: 13px; border-bottom: 1px solid #ccc; padding: 10px 5px;' },
        { header: 'SECTOR', key: 'sector', style: 'text-align: center; font-size: 12px; border-bottom: 1px solid #ccc; font-weight: bold;' }
    ];

    printTable("BARANGAY RESIDENT MASTERLIST", columns, printableData, categoryFilter);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
         <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-slate-100 uppercase tracking-tight">
       MASTERLIST MANAGEMENT
      </h1>
          {/* <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Masterlist Management</p> */}
        </div>
        <button onClick={handlePrint} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase hover:opacity-90 transition-all shadow-lg active:scale-95">
          <Printer size={16} /> Print
        </button>
      </div>

      {/* CLICKABLE LEGEND - Connected to categoryFilter state */}
    <SectorLegend 
  activeFilter={categoryFilter} 
  onFilterChange={setCategoryFilter}
  counts={sectorCounts} 
/>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
        <ResidentFilters 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        
        <div className="w-full">
          {loading ? (
            <div className="p-20 text-center">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mb-4"></div>
              <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Loading...</p>
            </div>
          ) : (
            <>
              <ResidentTable residents={currentItems} onUpdate={handleUpdate} onDelete={handleDelete} />
              
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredResidents.length}
                itemsPerPage={itemsPerPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Residents;