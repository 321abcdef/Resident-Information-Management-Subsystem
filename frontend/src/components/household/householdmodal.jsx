import React from 'react';
import { X, Home, Users, MapPin, CheckCircle, Clock } from 'lucide-react';

const HouseholdModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] transition-all font-sans">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in duration-200">
        
        {/* Header - Simple Style */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-sm">
              <Home size={20} />
            </div>
            <div>
              <h2 className="text-[13px] font-black text-slate-800 dark:text-white uppercase tracking-tight">Household Profile</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ref: {data.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors text-slate-400">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Head of Family</label>
              <p className="text-sm font-bold text-slate-800 dark:text-white uppercase">{data.head}</p>
            </div>
            <div className="space-y-1 text-right">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Family Size</label>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase">{data.members} Members</p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <MapPin size={10} /> Address
            </label>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Purok {data.purok}, {data.address}</p>
          </div>

          {/* Members List Table-Style */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Users size={10} /> Family Composition
            </label>
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="max-h-48 overflow-y-auto">
                {data.memberList?.map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border-b border-slate-100 dark:border-slate-800 last:border-none">
                    <div>
                      <p className="text-[12px] font-black text-slate-800 dark:text-slate-200 uppercase">{m.name}</p>
                      <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter">{m.relation}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-slate-400">{m.age} YRS</span>
                      <span className="px-2 py-0.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[9px] font-black rounded text-slate-500">{m.sector}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Separate Status Badge */}
          <div className="flex flex-col gap-1.5 pt-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verification Status</span>
            <div className={`px-3 py-1.5 rounded-lg flex items-center gap-2 w-fit text-[10px] font-black uppercase ${
              data.status === 'Verified' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
            }`}>
              {data.status === 'Verified' ? <CheckCircle size={14}/> : <Clock size={14}/>} {data.status}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 shadow-lg">
            Close Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default HouseholdModal;