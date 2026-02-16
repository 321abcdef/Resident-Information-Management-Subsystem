import React from 'react';
import { Home, Users, MapPin, User, Info } from 'lucide-react';
import ModalWrapper from '../common/ModalWrapper';

const HouseholdModal = ({ isOpen, onClose, data }) => {
  if (!data) return null;

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Household: ${data.id}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Top Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-xl">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
              <User size={16} />
              <span className="text-[11px] font-bold uppercase tracking-wider">Head of Family</span>
            </div>
            <p className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight">{data.head}</p>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
              <Users size={16} />
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Members</span>
            </div>
            <p className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight">{data.members} Persons</p>
          </div>

          {/* <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl">
            <div className="flex items-center gap-2 text-slate-500 mb-1">
              <Info size={16} />
              <span className="text-[11px] font-bold uppercase tracking-wider">Status</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${data.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-white'}`}>
              {data.status}
            </span>
          </div> */}
        </div>

        {/* Address Section */}
        <div className="flex gap-3 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <MapPin className="text-slate-400 shrink-0" size={20} />
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Location Address</p>
            <p className="text-slate-700 dark:text-slate-300 font-medium">Purok {data.purok}, {data.address}</p>
          </div>
        </div>

        {/* Member List Table */}
        <div>
          <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 px-1">
            <Users size={18} className="text-emerald-600" />
            Family Composition
          </h4>
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Full Name</th>
                  <th className="px-4 py-3">Relationship</th>
                  <th className="px-4 py-3 text-center">Age</th>
                  <th className="px-4 py-3">Sector</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {data.memberList?.map((m, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-300 uppercase">{m.name}</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase">{m.relation}</td>
                    <td className="px-4 py-3 text-center text-slate-500">{m.age}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md font-bold text-slate-600 dark:text-slate-400">
                        {m.sector}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-4 flex justify-end gap-3 border-t dark:border-slate-800">
          <button 
            onClick={onClose} 
            className="px-5 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            Close
          </button>
          {/* <button className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold shadow-md shadow-emerald-200 dark:shadow-none transition-all active:scale-95">
            Print Profile
          </button> */}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default HouseholdModal;