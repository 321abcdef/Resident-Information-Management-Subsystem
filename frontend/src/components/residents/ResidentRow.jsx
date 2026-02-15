import React from 'react';
import { Pencil, Eye, Trash2 } from 'lucide-react';

const getInitials = (name) => {
    if (!name || typeof name !== "string") return "??";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + (parts[parts.length - 1][0] || "")).toUpperCase();
};

const getAvatarColor = (name) => {
    if (!name || typeof name !== "string") return "bg-slate-100 text-slate-400";
    const colors = [
        "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
        "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
        "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
        "bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

const ResidentRow = ({ r, onView, onEdit, onDelete }) => {
   
    const displayName = r.name || `${r.first_name || ''} ${r.last_name || ''}`.trim() || "Unknown Resident";
    

    const displayAddress = r.address || `${r.temp_house_number || ''} ${r.temp_street_id || ''}`.trim() || "No Address";

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
                {r.age || 'N/A'}
            </td>
            
            <td className="px-6 py-5 text-base text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                {displayAddress}
            </td>
            
            <td className="px-6 py-5 text-base font-bold text-slate-900 dark:text-white">
                Purok {r.temp_purok_id || r.purok || 'N/A'}
            </td>
            
          
            <td className="px-6 py-5">
                <span className={`px-3 py-1.5 text-xs font-black uppercase tracking-wide rounded-md border-2 ${
                    r.sector === 'Senior' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                    r.sector === 'PWD' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                    r.sector === 'Minor' ? 'bg-rose-100 text-rose-800 border-rose-200' :
                    'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                    {r.sector || 'Adult'}
                </span>
            </td>

            <td className="px-6 py-5">
                <div className="flex items-center gap-0 border border-slate-300 dark:border-slate-600 w-fit bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-sm">
                    <button onClick={() => onView(r)} className="p-3 text-slate-600 hover:bg-emerald-600 hover:text-white border-r border-slate-300 transition-all">
                        <Eye size={18} />
                    </button>
                    <button onClick={() => onEdit(r)} className="p-3 text-slate-600 hover:bg-blue-600 hover:text-white border-r border-slate-300 transition-all">
                        <Pencil size={18} />
                    </button>
                    <button onClick={() => onDelete(r.id, displayName)} className="p-3 text-slate-600 hover:bg-rose-600 hover:text-white transition-all">
                        <Trash2 size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default ResidentRow;