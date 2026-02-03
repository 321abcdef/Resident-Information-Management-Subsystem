import React, { useState, useEffect } from 'react';
import { Pencil, Eye, Trash2, CheckCircle, Clock } from 'lucide-react';
import Table from '../common/table';
import ResidentDetailsModal from './ResidentDetailsModal';

// --- HELPERS
const getInitials = (name) => {
  if (!name) return "??";
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getAvatarColor = (name) => {
  const colors = [
    'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
    'bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400',
    'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400',
    'bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400',
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

  // Header sections 
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
            <tr key={r.id} className="border-b last:border-none border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-all">
              
              {/* Name Column with Initials Avatar */}
              <td className="px-6 py-4 flex items-center gap-3">
                <div className={`h-9 w-9 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-center font-black text-[10px] ${getAvatarColor(r.name)}`}>
                  {getInitials(r.name)}
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-sm leading-tight">{r.name}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-tight">{r.role}</p>
                </div>
              </td>

              {/* Age, Address, Purok Columns (Present and Complete) */}
              <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{r.age}</td>
              <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 truncate max-w-[180px] italic">{r.address}</td>
              <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Purok {r.purok}</td>
              
              {/* Sector Badge Column */}
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-md border ${
                  r.sector === 'Senior' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  r.sector === 'PWD' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                  r.sector === 'Minor' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                  'bg-slate-50 text-slate-500 border-slate-100'
                }`}>
                  {r.sector}
                </span>
              </td>

              {/* Status Badge Column */}
              <td className="px-6 py-4">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-tighter border rounded-full ${
                  r.status === 'Verified' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' 
                    : 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50'
                }`}>
                  {r.status === 'Verified' ? <CheckCircle size={12} /> : <Clock size={12} />}
                  {r.status}
                </div>
              </td>

              {/* Actions Column */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-0 border border-slate-200 dark:border-slate-700 w-fit bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-sm">
                  <button onClick={() => handleView(r)} title="View" className="p-2.5 text-slate-400 hover:bg-emerald-600 hover:text-white transition-all border-r border-slate-200 dark:border-slate-700">
                    <Eye size={15} />
                  </button>
                  <button onClick={() => handleEdit(r)} title="Edit" className="p-2.5 text-slate-400 hover:bg-blue-600 hover:text-white transition-all border-r border-slate-200 dark:border-slate-700">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => handleDelete(r.id, r.name)} title="Delete" className="p-2.5 text-slate-400 hover:bg-rose-600 hover:text-white transition-all">
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={7} className="px-6 py-24 text-center text-xs font-black text-slate-300 dark:text-slate-600 uppercase tracking-[4px]">
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