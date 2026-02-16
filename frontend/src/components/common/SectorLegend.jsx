import React from 'react';

export const sectorStyles = {
  'SOLO PARENT': 'bg-orange-100 text-orange-800 border-orange-200 ring-orange-500',
  'PWD': 'bg-purple-100 text-purple-800 border-purple-200 ring-purple-500',
  'SENIOR CITIZEN': 'bg-blue-100 text-blue-800 border-blue-200 ring-blue-500',
  'LGBTQIA+': 'bg-rose-100 text-rose-800 border-rose-200 ring-rose-500',
  'KASAMBAHAY': 'bg-emerald-100 text-emerald-800 border-emerald-200 ring-emerald-500',
  'OFW': 'bg-indigo-100 text-indigo-800 border-indigo-200 ring-indigo-500',
  'GENERAL POPULATION': 'bg-slate-100 text-slate-700 border-slate-300 ring-slate-500',
};

const SectorLegend = ({ activeFilter, onFilterChange, counts = {} }) => {
  return (
    <div className="flex flex-col gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Legends And Filters
            </span>
        </div>
        {activeFilter !== 'All' && (
          <button 
            onClick={() => onFilterChange('All')}
            className="text-[10px] font-black text-rose-500 uppercase hover:text-rose-600 transition-colors"
          >
            Reset Filters ↺
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {/* All Button with Total Count */}
        <button
          onClick={() => onFilterChange('All')}
          className={`px-4 py-2 rounded-xl text-[10px] font-black border uppercase tracking-wider transition-all shadow-sm ${
            activeFilter === 'All' 
            ? 'bg-slate-900 text-white border-slate-900 scale-105 shadow-md' 
            : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400'
          }`}
        >
          All ({Object.values(counts).reduce((a, b) => a + b, 0)})
        </button>

        {Object.entries(sectorStyles).map(([name, style]) => {
          const isActive = activeFilter === name;
          const baseStyles = style.split(' ring-')[0]; 
          const count = counts[name] || 0;
          
          return (
            <button
              key={name}
              onClick={() => onFilterChange(name)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black border uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 ${baseStyles} ${
                isActive ? 'ring-2 ring-offset-2 ring-slate-800 dark:ring-white scale-105 z-10' : 'opacity-60 hover:opacity-100'
              }`}
            >
              {name}
              <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${isActive ? 'bg-black/20' : 'bg-white/50'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SectorLegend;