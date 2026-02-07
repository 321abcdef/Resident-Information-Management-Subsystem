import React from 'react';
import { Eye, Calendar } from 'lucide-react';
import { calculateAge } from '../../services/verification'; 

const VerificationRow = ({ res, onReview }) => {
  return (
    <tr className="border-b last:border-none border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all">
      <td className="px-6 py-5 flex items-center gap-4">
        {/* Avatar logic stays same */}
        <div className="text-base font-bold text-slate-900 dark:text-white leading-tight">
          {res.name}
        </div>
      </td>
      
      {/* COMPUTED AGE COLUMN */}
      <td className="px-6 py-5">
        <div className="flex flex-col">
          <span className="text-base font-bold text-slate-800 dark:text-slate-200">
            {calculateAge(res.details?.birthdate)} yrs old
          </span>
          <span className="text-[10px] text-slate-400 font-medium uppercase">
            {res.details?.birthdate}
          </span>
        </div>
      </td>

      <td className="px-6 py-5 text-base text-slate-700 dark:text-slate-300 truncate max-w-[250px]">
        {res.details ? `Purok ${res.details.purok}, ${res.details.address}` : 'N/A'}
      </td>
      
      {/* Other columns stay same... */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm font-bold">
          <Calendar size={16} className="text-emerald-600 dark:text-emerald-400" />
          <span>{res.date}</span>
        </div>
      </td>
      <td className="px-6 py-5 text-right">
        <button 
          onClick={() => onReview(res)} 
          className="px-5 py-2 text-xs font-black uppercase text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
        >
          Review
        </button>
      </td>
    </tr>
  );
};

export default VerificationRow;