import React from 'react';
import { Pencil, Eye, Trash2 } from 'lucide-react';

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

const ResidentRow = ({ r, onView, onEdit, onDelete }) => {
  return (
    <tr className="border-b last:border-none border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all">
      <td className="px-6 py-5 flex items-center gap-4">
        <div 
          title={`Resident: ${r.name}`}
          className={`h-11 w-11 rounded-full border-2 border-white dark:border-slate-700 shadow-sm flex items-center justify-center font-bold text-sm cursor-help ${getAvatarColor(r.name)}`}
        >
          {getInitials(r.name)}
        </div>
        <div>
          <p className="text-base font-bold text-slate-900 dark:text-white leading-tight">{r.name}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mt-0.5 uppercase tracking-tight">{r.role || 'Resident'}</p>
        </div>
      </td>
      <td className="px-6 py-5 text-base text-slate-800 dark:text-slate-200 font-medium">{r.age}</td>
      <td className="px-6 py-5 text-base text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{r.address}</td>
      <td className="px-6 py-5 text-base font-bold text-slate-900 dark:text-white">Purok {r.purok}</td>
      <td className="px-6 py-5">
        <span 
          title={`Sector Category: ${r.sector}`}
          className={`px-3 py-1.5 text-xs font-black uppercase tracking-wide rounded-md border-2 cursor-default ${
            r.sector === 'Senior Citizen' ? 'bg-blue-100 text-blue-800 border-blue-200' :
            r.sector === 'PWD' ? 'bg-purple-100 text-purple-800 border-purple-200' :
            r.sector === 'Student' ? 'bg-rose-100 text-rose-800 border-rose-200' :
            r.sector === 'Solo Parent' ? 'bg-amber-100 text-amber-800 border-amber-200' :
            r.sector === 'General Population' ? 'bg-slate-100 text-slate-700 border-slate-200' :
            'bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          {r.sector}
        </span>
      </td>
      {/* Status column removed here */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-0 border border-slate-300 dark:border-slate-600 w-fit bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-md">
          <button 
            onClick={() => onView(r)} 
            title="View Full Details"
            className="p-3 text-slate-600 dark:text-slate-300 hover:bg-emerald-600 hover:text-white border-r border-slate-300 dark:border-slate-600 transition-all"
          >
            <Eye size={20} />
          </button>
          <button 
            onClick={() => onEdit(r)} 
            title="Edit Resident Info"
            className="p-3 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white border-r border-slate-300 dark:border-slate-600 transition-all"
          >
            <Pencil size={20} />
          </button>
          <button 
            onClick={() => onDelete(r.id, r.name)} 
            title="Remove from Registry"
            className="p-3 text-slate-600 dark:text-slate-300 hover:bg-rose-600 hover:text-white transition-all"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ResidentRow;