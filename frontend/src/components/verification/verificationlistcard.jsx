import React from 'react';
/* Import shared helper functions from the utility file */
import { getInitials, getAvatarColor } from '../../utils/avatar';

export default function VerificationListCard({ res, onReview, index }) {
  /* Generate avatar content and styles using imported logic */
  const initials = getInitials(res.name);
  const colorClass = getAvatarColor(res.name);

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md dark:shadow-slate-950/20 border border-slate-50 dark:border-slate-800 hover:shadow-xl dark:hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          {/* Reusable Initials Avatar Component replacement */}
          <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-700 shadow-inner font-black text-xs ${colorClass}`}>
            {initials}
          </div>
          
          <span className="text-[11px] font-black text-slate-700 dark:text-slate-200 w-24 leading-tight uppercase tracking-tight">
            {res.name}
          </span>
        </div>
        
        {/* Status indicator badge */}
        <div className="bg-orange-50 dark:bg-orange-500/10 px-2 py-1 rounded-full border border-orange-100 dark:border-orange-500/20 flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
          <span className="text-[8px] font-black text-orange-500 dark:text-orange-400 uppercase tracking-tighter">
            Pending
          </span>
        </div>
      </div>
      
      {/* Verification data fields */}
      <div className="space-y-3 mb-6 text-[10px]">
        <div className="flex justify-between border-b border-slate-50 dark:border-slate-800 pb-1">
          <span className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-tighter">ID Type</span>
          <span className="font-bold text-slate-600 dark:text-slate-300">{res.idType}</span>
        </div>
        <div className="flex justify-between border-b border-slate-50 dark:border-slate-800 pb-1">
          <span className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-tighter">ID Number</span>
          <span className="font-bold text-slate-600 dark:text-slate-300">{res.idNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-tighter">Submitted</span>
          <span className="font-bold text-slate-600 dark:text-slate-300">{res.date}</span>
        </div>
      </div>

      {/* Action button for verification review */}
      <button 
        onClick={onReview}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-[2px] transition-all shadow-md active:scale-95"
      >
        Review Submission
      </button>
    </div>
  );
}