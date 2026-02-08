import React, { useState, useEffect } from 'react';
import { User, Info, MapPin, Calendar, Shield, Users } from 'lucide-react';
import { getInitials, getAvatarColor } from '../../utils/avatar';
import ModalWrapper from '../common/ModalWrapper';

const ResidentDetailsModal = ({ isOpen, onClose, resident, mode, onSave }) => {
  const [formData, setFormData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (isOpen && resident) {
      setFormData(resident);
      setIsEdit(mode === 'edit');
    }
  }, [isOpen, resident, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const ModalHeader = (
    <div className="flex items-center gap-4">
      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-md border-2 border-white dark:border-slate-700 ${getAvatarColor(resident?.name || '')}`}>
        {getInitials(resident?.name || '')}
      </div>
      <div>
        <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">
          {isEdit ? 'Edit Record' : 'Resident Profile'}
        </h2>
        <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[2px] mt-1">
          ID Reference: #{resident?.id}
        </p>
      </div>
    </div>
  );

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title={ModalHeader}>
      <form onSubmit={handleSubmit} className="p-2">
        <div className="space-y-8">
          
          {/* Section: Personal Identity */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <User size={12} className="text-emerald-500" /> Full Legal Name
              </label>
              {!isEdit ? (
                <p className="text-xl font-black text-slate-800 dark:text-slate-100">{formData.name}</p>
              ) : (
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-base font-bold text-slate-900 dark:text-white focus:border-emerald-500 outline-none transition-all"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={12} className="text-emerald-500" /> Age
                </label>
                {!isEdit ? (
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-200">{formData.age} <span className="text-sm text-slate-400 uppercase font-black">Years Old</span></p>
                ) : (
                  <input 
                    type="number" name="age" value={formData.age} onChange={handleChange}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-base font-bold focus:border-emerald-500 outline-none transition-all"
                  />
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={12} className="text-emerald-500" /> Purok / Zone
                </label>
                {!isEdit ? (
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-200">Zone {formData.purok}</p>
                ) : (
                  <input 
                    type="text" name="purok" value={formData.purok} onChange={handleChange}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-base font-bold focus:border-emerald-500 outline-none transition-all"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Section: Address */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Shield size={12} className="text-emerald-500" /> Residential Address
            </label>
            {!isEdit ? (
              <p className="text-base font-medium text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl italic border border-dashed border-slate-200 dark:border-slate-700">
                "{formData.address}"
              </p>
            ) : (
              <textarea 
                name="address" value={formData.address} onChange={handleChange} rows={2}
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-base font-medium outline-none focus:border-emerald-500 transition-all resize-none"
              />
            )}
          </div>

          {/* Section: Sector Group (Full Width now) */}
          <div className="pt-2">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[2px] block mb-2 text-center">Sectoral Group</span>
              <div className="mx-auto flex items-center gap-2 px-6 py-2 bg-white dark:bg-slate-700 text-slate-700 dark:text-white rounded-full text-[12px] font-black uppercase tracking-widest w-fit border border-slate-200 dark:border-slate-600 shadow-sm">
                <Users size={14} className="text-emerald-500" /> {formData.sector}
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            {!isEdit && (
              <button 
                type="button" onClick={() => setIsEdit(true)}
                className="text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-widest hover:underline transition-all flex items-center gap-2"
              >
                <Info size={14} /> Update Record
              </button>
            )}
          </div>
          
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">
              {isEdit ? 'Cancel' : 'Close'}
            </button>
            {isEdit && (
              <button type="submit" className="px-8 py-3 bg-slate-900 dark:bg-emerald-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:scale-105 shadow-xl shadow-emerald-500/10 transition-all active:scale-95">
                Save Changes
              </button>
            )}
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default ResidentDetailsModal;