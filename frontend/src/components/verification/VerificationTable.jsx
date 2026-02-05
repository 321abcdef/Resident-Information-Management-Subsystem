import React from 'react';
import { Eye, Calendar } from 'lucide-react';
import Table from '../common/table';

// --- HELPERS (Synced with ResidentTable and Dashboard)
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

const formatName = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

const calculateAge = (birthDateString) => {
  if (!birthDateString) return 'N/A';
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};

const PendingVerificationTable = ({ data, onReview }) => {
  const headers = ["Name", "Age", "Address", "Submitted", "Actions"];

  return (
    <Table headers={headers}>
      {data.length > 0 ? (
        data.map((res, index) => {
          const initials = getInitials(res.name);
          const colorClass = getAvatarColor(res.name);
          const formattedName = formatName(res.name);
          const age = calculateAge(res.details?.birthdate);
          const fullAddress = res.details ? `Purok ${res.details.purok}, ${res.details.address}` : 'N/A';

          return (
            <tr key={res.id || index} className="border-b last:border-none border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all">

              {/* Name Column: Clean version (Name only) */}
              <td className="px-6 py-5 flex items-center gap-4">
                <div className={`h-11 w-11 rounded-full border-2 border-white dark:border-slate-700 shadow-sm flex items-center justify-center font-bold text-sm ${colorClass}`}>
                  {initials}
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  {formattedName}
                </div>
              </td>

              {/* Age Column */}
              <td className="px-6 py-5 text-base text-slate-800 dark:text-slate-200 font-medium">
                {age}
              </td>

              {/* Address Column */}
              <td className="px-6 py-5 text-base text-slate-700 dark:text-slate-300 truncate max-w-[250px]">
                {fullAddress}
              </td>

              {/* Submitted Column */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm font-bold">
                  <Calendar size={16} className="text-emerald-600 dark:text-emerald-400" />
                  <span>{res.date}</span>
                </div>
              </td>

              {/* Actions Column */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-0 border border-slate-300 dark:border-slate-600 w-fit bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-md">
                  <button 
                    onClick={() => onReview(res)} 
                    title="Review Submission" 
                    className="flex items-center gap-2 px-5 py-3 text-sm font-black uppercase text-slate-700 dark:text-slate-200 hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    <Eye size={18} strokeWidth={2.5} />
                    Review
                  </button>
                </div>
              </td>
            </tr>
          )
        })
      ) : (
        <tr>
          <td colSpan={5} className="px-6 py-24 text-center text-lg font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
            No pending verifications found.
          </td>
        </tr>
      )}
    </Table>
  );
};

export default PendingVerificationTable;