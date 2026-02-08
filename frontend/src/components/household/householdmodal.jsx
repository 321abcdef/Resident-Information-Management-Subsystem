import React from 'react';
import { Home, Users, MapPin, CheckCircle, Clock } from 'lucide-react';
import ModalWrapper from '../common/ModalWrapper';

const HouseholdModal = ({ isOpen, onClose, data }) => {
  if (!data) return null;

  const ModalHeader = (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md">
        <Home size={22} />
      </div>
      <div>
        <h2 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">Household Profile</h2>
        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none mt-1">Ref: {data.id}</p>
      </div>
    </div>
  );

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title={ModalHeader}>
      <div className="space-y-8 p-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Head of Family</label>
            <p className="text-xl font-black text-slate-900 dark:text-white uppercase">{data.head}</p>
          </div>
          <div className="space-y-1 md:text-right">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Family Size</label>
            <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{data.members} Members</p>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <MapPin size={12} className="text-emerald-500" /> Complete Address
          </label>
          <p className="text-base font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl italic border border-slate-100 dark:border-slate-700">
            Purok {data.purok}, {data.address}
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Users size={12} className="text-emerald-500" /> Family Composition
          </label>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <div className="max-h-64 overflow-y-auto">
              {data.memberList?.map((m, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700 last:border-none hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div>
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase">{m.name}</p>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">{m.relation}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-400">{m.age} YRS</span>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 text-[10px] font-black rounded-lg text-slate-500 border border-slate-200 dark:border-slate-600">{m.sector}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={onClose} className="px-8 py-3 bg-slate-900 dark:bg-slate-800 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-lg active:scale-95">
          Close Record
        </button>
      </div>
    </ModalWrapper>
  );
};

export default HouseholdModal;