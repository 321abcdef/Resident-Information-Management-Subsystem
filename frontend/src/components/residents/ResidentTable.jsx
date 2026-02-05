import React, { useState, useEffect } from 'react';
import { Pencil, Eye, Trash2, CheckCircle, Clock } from 'lucide-react';
import Table from '../common/table';
import ResidentDetailsModal from './ResidentDetailsModal';

// --- HELPERS (Consistent with Dashboard updates)
const getInitials = (name) => {
  if (!name) return "??";
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getAvatarColor = (name) => {
  const colors = [
    'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400',
    'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400',
    'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const ResidentTable = ({ residents: initialResidents }) => {
  const [localResidents, setLocalResidents] = useState(initialResidents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const [modalMode, setModalMode] = useState('view');

  useEffect(() => {
    setLocalResidents(initialResidents);
  }, [initialResidents]);

  const headers = ["Name", "Age", "Address", "Purok", "Sector", "Status", "Actions"];

  const handleView = (resident) => {
    setSelectedResident(resident);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEdit = (resident) => {
    setSelectedResident(resident);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setLocalResidents(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleSave = (updatedData) => {
    setLocalResidents(prev => 
      prev.map(r => r.id === updatedData.id ? { ...r, ...updatedData } : r)
    );
    setIsModalOpen(false);
  };

  return (
    <>
      <Table headers={headers}>
        {localResidents.length > 0 ? (
          localResidents.map((r) => (
            <tr key={r.id} className="border-b last:border-none border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all">
              
              {/* Name Column: Larger Text & Avatar */}
              <td className="px-6 py-5 flex items-center gap-4">
                <div className={`h-11 w-11 rounded-full border-2 border-white dark:border-slate-700 shadow-sm flex items-center justify-center font-bold text-sm ${getAvatarColor(r.name)}`}>
                  {getInitials(r.name)}
                </div>
                <div>
                  <p className="text-base font-bold text-slate-900 dark:text-white leading-tight">{r.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mt-0.5 uppercase tracking-tight">
                    {(r.role || 'Resident')}
                  </p>
                </div>
              </td>

              {/* Age, Address, Purok: Standardized to text-base (16px) */}
              <td className="px-6 py-5 text-base text-slate-800 dark:text-slate-200 font-medium">{r.age}</td>
              <td className="px-6 py-5 text-base text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{r.address}</td>
              <td className="px-6 py-5 text-base font-bold text-slate-900 dark:text-white">Purok {r.purok}</td>
              
              {/* Sector Badge: Increased size and contrast */}
              <td className="px-6 py-5">
                <span className={`px-3 py-1.5 text-xs font-black uppercase tracking-wide rounded-md border-2 ${
                  r.sector === 'Senior' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                  r.sector === 'PWD' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                  r.sector === 'Minor' ? 'bg-rose-100 text-rose-800 border-rose-200' :
                  'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {r.sector}
                </span>
              </td>

              {/* Status Badge: Bigger font and icons */}
              <td className="px-6 py-5">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-black uppercase tracking-tight ${
                  r.status === 'Verified' 
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                    : 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                }`}>
                  {r.status === 'Verified' ? <CheckCircle size={18} strokeWidth={2.5} /> : <Clock size={18} strokeWidth={2.5} />}
                  <span>{r.status}</span>
                </div>
              </td>

              {/* Actions Column: Larger touch targets */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-0 border border-slate-300 dark:border-slate-600 w-fit bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-md">
                  <button onClick={() => handleView(r)} title="View" className="p-3 text-slate-600 dark:text-slate-300 hover:bg-emerald-600 hover:text-white transition-all border-r border-slate-300 dark:border-slate-600">
                    <Eye size={20} />
                  </button>
                  <button onClick={() => handleEdit(r)} title="Edit" className="p-3 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-all border-r border-slate-300 dark:border-slate-600">
                    <Pencil size={20} />
                  </button>
                  <button onClick={() => handleDelete(r.id, r.name)} title="Delete" className="p-3 text-slate-600 dark:text-slate-300 hover:bg-rose-600 hover:text-white transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={7} className="px-6 py-24 text-center text-lg font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
              No records match your filter.
            </td>
          </tr>
        )}
      </Table>

      <ResidentDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        resident={selectedResident}
        mode={modalMode}
        onSave={handleSave}
      />
    </>
  );
};

export default ResidentTable;