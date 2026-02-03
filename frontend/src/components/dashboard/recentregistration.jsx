import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import Table from '../common/table';
import { getInitials, getAvatarColor } from '../../utils/avatar';

const RecentRegistration = ({ registrations = [] }) => {
  const headers = ["Name", "Age", "Address", "Purok", "ID Status"];

  return (
    <Table title="Recent Registration" headers={headers}>
      {registrations.length > 0 ? (
        registrations.map((person) => (
          <tr key={person.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors group">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-3">
                {/* Dynamic Initials Avatar */}
                <div className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 dark:border-slate-700 font-bold text-xs shadow-sm ${getAvatarColor(person.name)}`}>
                  {getInitials(person.name)}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{person.name}</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{person.role}</div>
                </div>
              </div>
            </td>
            {/* ... rest of the table row remains the same */}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{person.age}</td>
            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 max-w-[300px] truncate">{person.address}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-bold">
              <span className="bg-gray-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-[10px]">Purok {person.purok}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-tighter ${
                person.status === 'Verified' 
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' 
                  : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
              }`}>
                {person.status === 'Verified' ? <CheckCircle size={14} /> : <Clock size={14} />}
                <span>{person.status}</span>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} className="px-6 py-10 text-center text-gray-400 dark:text-gray-500 italic">No registrations found.</td>
        </tr>
      )}
    </Table>
  );
};

export default RecentRegistration;