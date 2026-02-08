import React, { useState } from 'react';
import { Printer } from 'lucide-react';
import ResidentTable from '../components/residents/ResidentTable';
import ResidentFilters from '../components/residents/ResidentFilters';
import Pagination from '../components/common/pagination';
import { useResidents } from '../hooks/useResidents';
import { usePrinter } from '../hooks/usePrinter'; // Import hook

const Residents = () => {
  const { 
    residents, loading, searchTerm, setSearchTerm, 
    categoryFilter, setCategoryFilter, handleUpdate 
  } = useResidents();
  
  const { printTable } = usePrinter(); // Initialize printer
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(residents.length / itemsPerPage) || 1;
  const currentItems = residents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrint = () => {
    const columns = [
      { header: 'Full Name', key: 'name', style: 'font-weight: bold;' },
      { header: 'Age', key: 'age', style: 'text-align: center;' },
      { header: 'Address', key: 'address' },
      { header: 'Zone', key: 'purok', style: 'text-align: center;' },
      { header: 'Sector', key: 'sector', style: 'text-align: center;' },
      { header: 'Status', key: 'status', style: 'text-align: center;' }
    ];

    printTable("Barangay Resident Masterlist (RBI)", columns, residents, categoryFilter);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
             Record of Inhabitants (RBI)
           </h1>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Masterlist Management</p>
        </div>
        <button 
          onClick={handlePrint} 
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-lg active:scale-95"
        >
          <Printer size={16} /> Print
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
        <ResidentFilters 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          categoryFilter={categoryFilter} 
          setCategoryFilter={setCategoryFilter} 
        />
        
        <div className="w-full">
          {loading ? (
            <div className="p-20 text-center font-bold text-emerald-600 text-sm tracking-[4px] animate-pulse uppercase">
              Syncing...
            </div>
          ) : (
            <ResidentTable 
              residents={currentItems} 
              onUpdate={handleUpdate} 
            />
          )}
        </div>

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage}
          totalItems={residents.length} 
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default Residents;