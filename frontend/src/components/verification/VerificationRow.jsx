import React from 'react';
import { Calendar } from 'lucide-react';
import { calculateAge } from '../../services/verification'; 
import StatusBadge from '../common/StatusBadge'; 

const VerificationRow = ({ res, onReview }) => {
  return (
    <tr className="border-b last:border-none border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-slate-900 dark:text-white">
      <td className="px-6 py-5">
        <div className="text-base font-bold leading-tight">
          {res.name}
        </div>
      </td>
      
      <td className="px-6 py-5">
        <div className="flex flex-col">
          <span className="text-base font-bold">
            {calculateAge(res.details?.birthdate)} yrs old
          </span>
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
            {res.details?.birthdate}
          </span>
        </div>
      </td>

      <td className="px-6 py-5 text-base text-slate-600 dark:text-slate-400 truncate max-w-[200px]">
        {res.details ? `Purok ${res.details.purok}, ${res.details.address}` : 'N/A'}
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-2 text-sm font-bold opacity-80">
          <Calendar size={14} className="text-emerald-600" />
          <span>{res.date}</span>
        </div>
      </td>

      {/* STATUS BADGE COLUMN */}
      <td className="px-6 py-5">
        <StatusBadge status={res.status} />
      </td>

      <td className="px-6 py-5 text-right">
        <button 
          onClick={() => onReview(res)} 
          className="px-5 py-2 text-xs font-black uppercase border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-sm active:scale-95"
        >
          Review
        </button>
      </td>
    </tr>
  );
};

export default VerificationRow;