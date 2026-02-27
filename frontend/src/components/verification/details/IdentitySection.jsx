import React from 'react';
import { IDCard } from '@/components/common/InfoField';

const IdentitySection = ({ details, onZoom }) => (
  <div className="bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
    <p className="text-xs font-black text-slate-400 uppercase tracking-[2px] mb-8 border-l-4 border-emerald-500 pl-3">
      Identity Documents ({details?.idType})
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <IDCard label="Front ID Photo" src={details?.idFront} onClick={() => onZoom(details?.idFront)} />
      <IDCard label="Back ID Photo" src={details?.idBack} onClick={() => onZoom(details?.idBack)} />
    </div>
  </div>
);

export default IdentitySection;