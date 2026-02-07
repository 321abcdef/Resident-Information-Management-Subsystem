import React, { useState, useEffect } from 'react';
import { Printer } from 'lucide-react';
import ResidentTable from '../components/residents/ResidentTable';
import ResidentFilters from '../components/residents/ResidentFilters';
import Pagination from '../components/common/pagination';
import { getResidents, updateResident } from '../services/residents';

const Residents = () => {
  const [allResidents, setAllResidents] = useState([]);
  const [filteredResidents, setFilteredResidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getResidents().then(data => {
      setAllResidents(data || []);
      setFilteredResidents(data || []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let results = allResidents.filter(r =>
      (r.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (r.address?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );
    if (categoryFilter !== "All") results = results.filter(r => r.sector === categoryFilter);
    setFilteredResidents(results);
    setCurrentPage(1); 
  }, [searchTerm, categoryFilter, allResidents]);

  const totalPages = Math.ceil(filteredResidents.length / itemsPerPage) || 1;
  const currentItems = filteredResidents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleResidentUpdate = async (updatedData) => {
    const result = await updateResident(updatedData.id, updatedData);
    if (result.success) {
      setAllResidents(prev => 
        prev.map(r => r.id === updatedData.id ? { ...r, ...updatedData } : r)
      );
    }
  };

  const handlePrint = () => {
    if (filteredResidents.length === 0) return alert("No records to print.");
    const printWindow = window.open('', '_blank');
    const tableRows = filteredResidents.map(r => `
      <tr>
        <td style="font-weight: bold;">${r.name}</td>
        <td style="text-align: center;">${r.age}</td>
        <td>${r.address}</td>
        <td style="text-align: center;">Purok ${r.purok}</td>
        <td style="text-align: center;">${r.sector}</td>
        <td style="text-align: center;">${r.status}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Resident Registry Report</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #1e293b; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 25px; }
            .header h1 { margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1px; }
            .header p { margin: 5px 0 0; font-size: 13px; color: #64748b; }
            table { width: 100%; border-collapse: collapse; }
            th { background: #f8fafc; border: 1px solid #000; padding: 12px 8px; font-size: 10px; text-transform: uppercase; }
            td { border: 1px solid #000; padding: 8px; font-size: 10px; }
            .footer { margin-top: 50px; display: flex; justify-content: space-between; align-items: flex-end; }
            .sig-box { border-top: 1px solid #000; width: 220px; text-align: center; padding-top: 5px; font-size: 12px; font-weight: bold; }
          </style>
        </head>
        <body onload="window.print()">
          <div class="header">
            <h1>Barangay Resident Masterlist</h1>
            <p>Filter: ${categoryFilter} | Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Zone</th>
                <th>Sector</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
          <div class="footer">
            <div style="font-size: 11px;">Total Residents: ${filteredResidents.length}</div>
            <div class="sig-box uppercase">Barangay Captain</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Residents Registry</h1>
       <button onClick={handlePrint} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-lg active:scale-95">
                   <Printer size={16} /> Print
                 </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl rounded-none">
        <ResidentFilters 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
          categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} 
        />
        <div className="w-full">
          {loading ? (
            <div className="p-20 text-center font-bold text-emerald-600 text-sm tracking-[4px] animate-pulse uppercase">Syncing...</div>
          ) : (
            <ResidentTable residents={currentItems} onUpdate={handleResidentUpdate} />
          )}
        </div>
        <Pagination 
          currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}
          totalItems={filteredResidents.length} itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default Residents;