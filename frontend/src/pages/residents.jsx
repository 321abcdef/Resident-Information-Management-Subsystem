import React, { useState, useEffect } from 'react';
import { Plus, Search, Printer } from 'lucide-react';
import ResidentTable from '../components/residents/ResidentTable';
import Pagination from '../components/common/pagination';
import { getResidents } from '../services/residents';

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
    
    // Updated logic to handle "Adult" and other sectors
    if (categoryFilter !== "All") {
      results = results.filter(r => r.sector === categoryFilter);
    }
    
    setFilteredResidents(results);
    setCurrentPage(1); 
  }, [searchTerm, categoryFilter, allResidents]);

  const totalPages = Math.ceil(filteredResidents.length / itemsPerPage) || 1;
  const currentItems = filteredResidents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const tableRows = filteredResidents.map(r => `
      <tr>
        <td style="padding: 10px; border: 1px solid #000; font-size: 11px;">${(r.name || "N/A").toUpperCase()}</td>
        <td style="padding: 10px; border: 1px solid #000; font-size: 11px; text-align: center;">${r.age || "0"}</td>
        <td style="padding: 10px; border: 1px solid #000; font-size: 11px;">${r.address || "N/A"}</td>
        <td style="padding: 10px; border: 1px solid #000; font-size: 11px; text-align: center;">PUROK ${r.purok || "-"}</td>
        <td style="padding: 10px; border: 1px solid #000; font-size: 11px; text-align: center;">${(r.sector || "GENERAL").toUpperCase()}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Sectoral Report - ${categoryFilter}</title>
          <style>
            @page { size: A4 portrait; margin: 20mm; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; color: #000; line-height: 1.4; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { font-size: 20px; margin: 0; text-transform: uppercase; font-weight: 900; }
            .report-title { margin-top: 20px; padding: 10px; border-top: 2px solid #000; border-bottom: 2px solid #000; background-color: #f8f9fa; font-weight: bold; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background: #eee; padding: 12px 10px; border: 1px solid #000; font-size: 10px; text-transform: uppercase; }
            .footer { margin-top: 60px; display: flex; justify-content: space-between; padding: 0 40px; }
            .sig-box { text-align: center; width: 200px; border-top: 1px solid #000; }
          </style>
        </head>
        <body>
          <div class="header">
            <p>Republic of the Philippines</p>
            <h1>Office of the Barangay Chairman</h1>
          </div>
          <div class="report-title">RESIDENT SECTORAL REPORT: ${categoryFilter.toUpperCase()}</div>
          <table>
            <thead>
              <tr>
                <th>Resident Name</th><th>Age</th><th>Full Address</th><th>Zone</th><th>Classification</th>
              </tr>
            </thead>
            <tbody>${tableRows || '<tr><td colspan="5" style="text-align:center;">No records.</td></tr>'}</tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Residents Registry</h1>
        <div className="flex gap-2">
          <button onClick={handlePrint} className="flex items-center gap-2 bg-slate-900 dark:bg-emerald-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all shadow-lg active:scale-95">
            <Printer size={16} /> Print 
          </button>
          <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all">
            <Plus size={16} /> Add New Resident
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search masterlist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none dark:text-white focus:ring-2 ring-emerald-500/20"
            />
          </div>

          <div className="flex bg-slate-200/50 dark:bg-slate-800 p-1 rounded-xl">
            {/* Added 'Adult' to the button list */}
            {['All', 'Senior', 'Adult', 'PWD', 'Minor'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
                  categoryFilter === cat 
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-emerald-500 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full">
          {loading ? (
            <div className="p-20 text-center font-black text-emerald-600 text-xs tracking-[4px] animate-pulse">SYNCING MASTERLIST...</div>
          ) : (
            <ResidentTable residents={currentItems} />
          )}
        </div>

        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredResidents.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default Residents;