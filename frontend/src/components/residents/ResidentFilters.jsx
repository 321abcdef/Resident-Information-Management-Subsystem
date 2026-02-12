import React from 'react';
import { Search } from 'lucide-react';

const ResidentFilters = ({ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter }) => {
  const categories = ['All', 'General Population', 'Senior Citizen', 'PWD', 'Solo Parent', 'Student'];

  return (
    <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-50/50 dark:bg-slate-900/50">
      
      {/* Search Bar - Curved */}
      <div className="relative w-full lg:w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search by name or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium outline-none dark:text-white focus:ring-2 ring-emerald-500/40 transition-all shadow-sm"
        />
      </div>

      {/* Tabs - Curved & Emerald Active */}
      <div className="flex bg-slate-200/50 dark:bg-slate-800 p-1.5 rounded-xl overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-5 py-2 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap ${
              categoryFilter === cat 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResidentFilters;