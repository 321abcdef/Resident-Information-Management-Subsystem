import React, { useState } from 'react';
import { Printer } from 'lucide-react';
import HouseholdFilters from '../components/household/householdFilters';
import HouseholdTable from '../components/household/householdTable';
import HouseholdModal from '../components/household/householdModal';
import Pagination from '../components/common/pagination';

// Import hooks and services
import { useHouseholds } from '../hooks/useHousehold';
import { householdService } from '../services/household';

const Households = () => {
  // custom hook 
  const { households, setHouseholds, loading } = useHouseholds();

  const [searchTerm, setSearchTerm] = useState("");
  const [purokFilter, setPurokFilter] = useState("All Puroks");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHousehold, setSelectedHousehold] = useState(null);

  // 2. Logic for filtering
  const filtered = households.filter(h => {
    const matchesSearch = (h.head?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || 
                          (h.id?.toString().toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesPurok = purokFilter === "All Puroks" || h.purok === purokFilter;
    return matchesSearch && matchesPurok;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrint = () => {
    if (filtered.length === 0) return alert("No records to print.");
    const printWindow = window.open('', '_blank');
    const tableRows = filtered.map(h => `
      <tr>
        <td>${h.id}</td>
        <td style="font-weight: bold;">${h.head}</td>
        <td>${h.address || "N/A"}</td>
        <td style="text-align: center;">Purok ${h.purok}</td>
        <td style="text-align: center;">${h.members}</td>
        <td style="text-align: center;">${h.status}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Household Registry Report</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #1e293b; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 25px; }
            .header h1 { margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1px; }
            .header p { margin: 5px 0 0; font-size: 13px; color: #64748b; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th { background: #f8fafc; border: 1px solid #000; padding: 12px 8px; font-size: 11px; text-transform: uppercase; }
            td { border: 1px solid #000; padding: 10px 8px; font-size: 11px; }
            .footer { margin-top: 50px; display: flex; justify-content: space-between; align-items: flex-end; }
            .sig-box { border-top: 1px solid #000; width: 220px; text-align: center; padding-top: 5px; font-size: 12px; font-weight: bold; }
          </style>
        </head>
        <body onload="window.print()">
          <div class="header">
            <h1>Barangay Household Registry</h1>
            <p>Official Masterlist | Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Household ID</th>
                <th>Head of Family</th>
                <th>Address</th>
                <th>Purok</th>
                <th>Members</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
          <div class="footer">
            <div style="font-size: 11px;">Total Record Count: ${filtered.length}</div>
            <div class="sig-box text-uppercase">Barangay Captain / Secretary</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">Household Registry</h1>
        <button onClick={handlePrint} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-lg active:scale-95">
          <Printer size={16} /> Print
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden rounded-none">
        <HouseholdFilters 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          purokFilter={purokFilter} setPurokFilter={setPurokFilter}
        />
        
        <div className="w-full">
          {loading ? (
            <div className="p-20 text-center font-bold text-emerald-600 text-sm tracking-[4px] animate-pulse uppercase">Syncing Registry...</div>
          ) : (
            <HouseholdTable 
              households={currentItems} 
              onView={(item) => { setSelectedHousehold(item); setIsModalOpen(true); }}
              onDelete={async (id) => {
                if (window.confirm("Are you sure? This will remove the household record.")) {
                  await householdService.delete(id);
                  setHouseholds(prev => prev.filter(h => h.id !== id));
                }
              }}
            />
          )}
        </div>

        <Pagination 
          currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}
          totalItems={filtered.length} itemsPerPage={itemsPerPage}
        />
      </div>

      <HouseholdModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={selectedHousehold} 
      />
    </div>
  );
};

export default Households;