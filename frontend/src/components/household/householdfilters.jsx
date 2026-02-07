import React from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';

const HouseholdFilters = ({ searchTerm, setSearchTerm, purokFilter, setPurokFilter }) => {
  const puroks = ['All Puroks', '1', '2', '3', '4', '5', '6', '7'];

  return (
    <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-50/50 dark:bg-slate-900/50">
      
      {/* Search Bar - Curved */}
      <div className="relative w-full lg:w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search by ID or Head..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium outline-none dark:text-white focus:ring-2 ring-emerald-500/40 transition-all shadow-sm"
        />
      </div>

      {/* Filter Area - Curved */}
      <div className="flex items-center gap-3 w-full lg:w-auto">
        <label className="text-[11px] font-black uppercase text-slate-400 tracking-[1px] hidden sm:block">Filter Area:</label>
        <div className="relative w-full lg:w-56">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
          <select
            value={purokFilter}
            onChange={(e) => setPurokFilter(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold uppercase tracking-tight outline-none dark:text-white focus:ring-2 ring-emerald-500 transition-all shadow-sm appearance-none cursor-pointer"
          >
            {puroks.map((p) => (
              <option key={p} value={p}>{p === 'All Puroks' ? p : `Purok ${p}`}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronDown size={18} strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseholdFilters;