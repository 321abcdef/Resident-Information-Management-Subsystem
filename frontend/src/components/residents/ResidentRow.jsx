import React from 'react';
import { Pencil, Eye, Trash2 } from 'lucide-react';
import { getInitials, getAvatarColor } from '@/utils/avatar';

const ResidentRow = ({ r, onView, onEdit, onDelete }) => {
    const displayName = r.name || "Unknown Resident";
    
    const rawSector = typeof r.sector === 'object' ? r.sector?.name : (r.sectorLabel || r.sector);
    const sectorDisplay = rawSector || 'GENERAL POPULATION';
    const sectorName = sectorDisplay.toUpperCase();
const sectorStyles = {
  'SOLO PARENT': 'bg-orange-100 text-orange-800 border-orange-200',
  'PWD': 'bg-purple-100 text-purple-800 border-purple-200',
  'SENIOR CITIZEN': 'bg-blue-100 text-blue-800 border-blue-200',
  'LGBTQIA+': 'bg-rose-100 text-rose-800 border-rose-200',
  'KASAMBAHAY': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'OFW': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'GENERAL POPULATION': 'bg-slate-100 text-slate-700 border-slate-300',
  'DEFAULT': 'bg-slate-100 text-slate-700 border-slate-300'
};
    return (
        <tr className="border-b last:border-none border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all">
            <td className="px-6 py-5 flex items-center gap-4">
                <div className={`h-11 w-11 rounded-full border-2 border-white dark:border-slate-700 shadow-sm flex items-center justify-center font-bold text-sm ${getAvatarColor(displayName)}`}>
                    {getInitials(displayName)}
                </div>
                <div>
                    <p className="text-base font-bold text-slate-900 dark:text-white leading-tight">{displayName}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mt-0.5 tracking-tight uppercase">
                        {r.barangay_id || 'ID Pending'}
                    </p>
                </div>
            </td>
            
            <td className="px-6 py-5 text-base text-slate-800 dark:text-slate-200 font-medium">
                {r.age}
            </td>
            
            <td className="px-6 py-5 text-base text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                {r.full_address || "No Address"}
            </td>
            
            <td className="px-6 py-5 text-base font-bold text-slate-900 dark:text-white">
                {r.resolved_purok || `Purok ${r.temp_purok_id}`}
            </td>
    <td className="px-6 py-5">
  <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wide rounded-md border-2 ${
    sectorStyles[sectorName.toUpperCase()] || sectorStyles['DEFAULT']
  }`}>
    {sectorDisplay}
  </span>
</td>
            <td className="px-6 py-5 text-right">
                <div className="flex items-center gap-0 border border-slate-300 dark:border-slate-600 w-fit bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-sm">
                    <button 
                        onClick={() => onView(r)} 
                        title="View Profile"
                        className="p-3 text-slate-600 hover:bg-emerald-600 hover:text-white border-r border-slate-300 dark:border-slate-600 transition-all"
                    >
                        <Eye size={18} />
                    </button>
                    <button 
                        onClick={() => onEdit(r)} 
                        title="Edit Resident"
                        className="p-3 text-slate-600 hover:bg-blue-600 hover:text-white border-r border-slate-300 dark:border-slate-600 transition-all"
                    >
                        <Pencil size={18} />
                    </button>
                    <button 
                        onClick={() => onDelete(r.id, displayName)} 
                        title="Delete Resident"
                        className="p-3 text-slate-600 hover:bg-rose-600 hover:text-white transition-all"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default ResidentRow;