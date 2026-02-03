import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getInitials, getAvatarColor } from '../../utils/avatar';

const ResidentDetailsModal = ({ isOpen, onClose, resident, mode, onSave }) => {
  const [formData, setFormData] = useState({});

  // Sync internal state when the resident prop changes
  useEffect(() => {
    if (resident) setFormData(resident);
  }, [resident]);

  if (!isOpen || !resident) return null;

  const isEdit = mode === 'edit';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl border border-gray-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <form onSubmit={handleSubmit}>
          {/* Header with Dynamic Avatar Integration */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50">
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-black text-sm shadow-sm border-2 border-white dark:border-slate-700 ${getAvatarColor(resident.name)}`}>
                {getInitials(resident.name)}
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white leading-none">
                  {isEdit ? 'Edit Resident Record' : 'Resident Full Profile'}
                </h2>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold mt-1 uppercase">
                  System Reference ID: #{resident.id}
                </p>
              </div>
            </div>
            <button type="button" onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
            {/* Field Mapping */}
            {[
              { label: 'Full Name', name: 'name', type: 'input' },
              { label: 'Age', name: 'age', type: 'input' },
              { label: 'Complete Address', name: 'address', type: 'textarea', colSpan: 'md:col-span-2' },
              { label: 'Purok', name: 'purok', type: 'input' },
            ].map((field) => (
              <div key={field.name} className={`space-y-1 ${field.colSpan || ''}`}>
                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase">{field.label}</label>
                {field.type === 'input' ? (
                  <input 
                    name={field.name}
                    disabled={!isEdit}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-none text-sm focus:border-emerald-500 outline-none disabled:bg-gray-50 dark:disabled:bg-slate-800 font-bold text-gray-800 dark:text-gray-200 transition-colors"
                  />
                ) : (
                  <textarea 
                    name={field.name}
                    disabled={!isEdit}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-none text-sm focus:border-emerald-500 outline-none disabled:bg-gray-50 dark:disabled:bg-slate-800 resize-none font-bold text-gray-800 dark:text-gray-200 transition-colors"
                  />
                )}
              </div>
            ))}

            {/* Locked Status Field */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase">ID Status</label>
              <select 
                name="status"
                disabled={true} 
                value={formData.status || ''}
                className="w-full p-3 border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 rounded-none text-sm outline-none cursor-not-allowed font-bold text-emerald-600 dark:text-emerald-400 transition-colors appearance-none"
              >
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/30 flex justify-end gap-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-2.5 text-[11px] font-black uppercase tracking-widest border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all shadow-sm"
            >
              {isEdit ? 'Cancel' : 'Close'}
            </button>
            {isEdit && (
              <button 
                type="submit" 
                className="px-6 py-2.5 text-[11px] font-black uppercase tracking-widest bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100 dark:shadow-none"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResidentDetailsModal;