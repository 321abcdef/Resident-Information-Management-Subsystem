import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, User, Info } from 'lucide-react';
import { getInitials, getAvatarColor } from '../../utils/avatar';

const ResidentDetailsModal = ({ isOpen, onClose, resident, mode, onSave }) => {
  const [formData, setFormData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  // Reset state whenever opening or closing
  useEffect(() => {
    if (isOpen && resident) {
      setFormData(resident);
      setIsEdit(mode === 'edit');
    }
  }, [isOpen, resident, mode]);

  if (!isOpen || !resident) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] transition-all font-sans">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <form onSubmit={handleSubmit}>
          
          {/* Header - Matched with Table Header Style */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center font-bold text-[11px] shadow-sm border border-white dark:border-slate-700 ${getAvatarColor(resident.name)}`}>
                {getInitials(resident.name)}
              </div>
              <div>
                <h2 className="text-[13px] font-black text-slate-800 dark:text-white uppercase tracking-tight">
                  {isEdit ? 'Edit Resident Record' : 'Resident Information'}
                </h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System ID: #{resident.id}</p>
              </div>
            </div>
            <button type="button" onClick={onClose} className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors text-slate-400">
              <X size={18} />
            </button>
          </div>

          {/* Body - Matched with Table Cell Spacing */}
          <div className="p-6 space-y-6">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <User size={10} /> Full Name
              </label>
              {!isEdit ? (
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 px-1">{formData.name}</p>
              ) : (
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Age */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Age</label>
                {!isEdit ? (
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 px-1">{formData.age} yrs old</p>
                ) : (
                  <input 
                    type="number" name="age" value={formData.age} onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold outline-none focus:border-emerald-500 transition-all"
                  />
                )}
              </div>

              {/* Purok */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Purok / Zone</label>
                {!isEdit ? (
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 px-1">Zone {formData.purok}</p>
                ) : (
                  <input 
                    type="text" name="purok" value={formData.purok} onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold outline-none focus:border-emerald-500 transition-all"
                  />
                )}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Home Address</label>
              {!isEdit ? (
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 px-1 leading-relaxed">{formData.address}</p>
              ) : (
                <textarea 
                  name="address" value={formData.address} onChange={handleChange} rows={2}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold outline-none focus:border-emerald-500 transition-all resize-none"
                />
              )}
            </div>

            {/* Classification Badges - Matched with Table Badges */}
            <div className="pt-2 flex flex-wrap gap-3">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Status</span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter w-fit ${
                  formData.status === 'Verified' 
                  ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' 
                  : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                  {formData.status}
                </span>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Sector</span>
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-[10px] font-black uppercase tracking-tighter w-fit border border-slate-200 dark:border-slate-700">
                  {formData.sector}
                </span>
              </div>
            </div>
          </div>

          {/* Footer - Consistent with Dashboard Buttons */}
          <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/10 flex justify-between items-center">
            <div>
              {!isEdit && (
                <button 
                  type="button" onClick={() => setIsEdit(true)}
                  className="text-emerald-600 dark:text-emerald-400 font-black text-[11px] uppercase tracking-widest hover:text-emerald-700 transition-colors flex items-center gap-1"
                >
                  <Info size={12} /> Edit Details
                </button>
              )}
            </div>
            
            <div className="flex gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">
                {isEdit ? 'Discard' : 'Close'}
              </button>
              {isEdit && (
                <button type="submit" className="px-6 py-2 bg-slate-900 dark:bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 shadow-lg transition-all active:scale-95">
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResidentDetailsModal;