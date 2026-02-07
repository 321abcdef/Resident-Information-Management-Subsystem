import React from 'react';
import { Search } from 'lucide-react';

const VerificationFilters = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text"
          placeholder="Search name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
        />
      </div>
    </div>
  );
};

export default VerificationFilters;