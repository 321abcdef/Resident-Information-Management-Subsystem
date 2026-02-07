import React from 'react';
import { Eye, Trash2, CheckCircle, Clock } from 'lucide-react';

// Helpers for the Avatar
const getInitials = (name) => {
  if (!name) return "??";
  const parts = name.trim().split(' ');
  return parts.length === 1 
    ? parts[0].substring(0, 2).toUpperCase() 
    : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getAvatarColor = (name) => {
  const colors = [
    'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400',
    'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

const HouseholdRow = ({ item, onView, onDelete }) => {
  return (
    <tr className="border-b last:border-none border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all">
      
      {/* 1. Household ID */}
      <td className="px-6 py-5 text-base text-emerald-600 font-bold tracking-tight" title="Household Identification Number">
        {item.id}
      </td>

      {/* 2. Name Section - Natural Case (Removed uppercase) */}
      <td className="px-6 py-5 flex items-center gap-4">
        <div 
          title={`Household Head: ${item.head}`}
          className={`h-11 w-11 rounded-full border-2 border-white dark:border-slate-700 shadow-sm flex items-center justify-center font-bold text-sm cursor-help ${getAvatarColor(item.head || "")}`}
        >
          {getInitials(item.head || "")}
        </div>
        <div>
          <p className="text-base font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
            {item.head}
          </p>
        </div>
      </td>
      
      {/* 3. Address - Natural Case */}
      <td className="px-6 py-5 text-base text-slate-700 dark:text-slate-300 truncate max-w-[200px]" title={`Full Address: ${item.address}`}>
        {item.address}
      </td>
      
      {/* 4. Purok */}
      <td className="px-6 py-5 text-base font-bold text-slate-900 dark:text-white tracking-tight">
        Purok {item.purok}
      </td>

      {/* 5. Members count */}
      <td className="px-6 py-5 text-center text-base font-black text-slate-700 dark:text-slate-200" title="Total Number of Members">
        {item.members}
      </td>

      {/* 6. Status */}
      <td className="px-6 py-5">
        <div 
          title={item.status === 'Verified' ? "This household is officially verified" : "Pending verification by Barangay"}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-black uppercase tracking-tight border cursor-help ${
          item.status === 'Verified' 
            ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
            : 'bg-amber-100 text-amber-800 border-amber-200'
        }`}>
          {item.status === 'Verified' ? <CheckCircle size={18} strokeWidth={2.5} /> : <Clock size={18} strokeWidth={2.5} />}
          <span>{item.status}</span>
        </div>
      </td>

      {/* 7. Actions */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-0 border border-slate-300 dark:border-slate-600 w-fit bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-md">
          <button 
            onClick={() => onView(item)} 
            title="View Household Members"
            className="p-3 text-slate-600 dark:text-slate-300 hover:bg-emerald-600 hover:text-white border-r border-slate-300 dark:border-slate-600 transition-all"
          >
            <Eye size={20} />
          </button>
          <button 
            onClick={() => onDelete(item.id)} 
            title="Delete Household Record"
            className="p-3 text-slate-600 dark:text-slate-300 hover:bg-rose-600 hover:text-white transition-all"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default HouseholdRow;