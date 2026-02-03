import React from 'react';

/**
 * VerificationStats Component
 * Displays summary cards for different verification statuses
 */
export default function VerificationStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex justify-between group hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300"
        >
          {/* Label and Count section */}
          <div>
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2 tracking-tighter">
              {stat.count}
            </h2>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold italic">
              {stat.subtext}
            </p>
          </div>

          {/* Icon section - Removed the nested indicator circles */}
          <div className="flex flex-col items-center justify-center">
            <stat.Icon className={`w-8 h-8 ${stat.color} transition-transform group-hover:scale-110 duration-300`} />
          </div>
        </div>
      ))}
    </div>
  );
}