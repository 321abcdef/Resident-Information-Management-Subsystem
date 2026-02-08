// import React, { useState } from 'react'; // Added useState
// import { AlertCircle, X, Lock } from 'lucide-react';

// export default function RejectionModal({ onClose, onConfirm }) {
//   // State to track which reason is selected
//   const [selectedReason, setSelectedReason] = useState('Blurry Image');

//   return (
//     <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all">
//       <div className="bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-slate-100 dark:border-slate-800">
//         <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
//           <div className="flex items-center gap-3">
//             <div className="bg-red-50 dark:bg-red-500/10 p-2 rounded-xl">
//               <AlertCircle className="w-5 h-5 text-red-500" />
//             </div>
//             <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">Rejection of Submission</h2>
//           </div>
//           <button onClick={onClose} className="text-slate-300 hover:text-slate-600 dark:hover:text-white transition-colors">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="p-8">
//           <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-4 rounded-2xl flex items-start gap-4 mb-8">
//             <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
//             <p className="text-[10px] text-red-800 dark:text-red-400 font-black uppercase tracking-widest leading-relaxed">
//               Resident will be notified and required to resubmit valid documentation.
//             </p>
//           </div>

//           <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-[2px]">Reason of Rejection</p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
//             {['Blurry Image', 'Expired ID', 'Info Mismatch', 'Fake ID'].map((reason) => (
//               <label 
//                 key={reason} 
//                 className={`border rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all border-l-4 ${
//                   selectedReason === reason 
//                   ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-500 border-l-red-600' 
//                   : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:bg-slate-50 border-l-transparent'
//                 }`}
//               >
//                 <input 
//                   type="radio" 
//                   name="rejection" 
//                   checked={selectedReason === reason}
//                   onChange={() => setSelectedReason(reason)}
//                   className="w-4 h-4 text-red-600 focus:ring-red-500 bg-transparent border-slate-300 dark:border-slate-700" 
//                 />
//                 <span className="text-[11px] font-black text-slate-700 dark:text-slate-200 uppercase">{reason}</span>
//               </label>
//             ))}
//           </div>

//           <div className="flex flex-col items-center gap-4 pt-4 border-t border-slate-50 dark:border-slate-800">
//             <button 
//               onClick={() => onConfirm(selectedReason)} // Pass the state value here
//               className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-red-500/20 transition-all uppercase tracking-[2px] text-xs"
//             >
//               Confirm Rejection
//             </button>
//             <div className="flex items-center gap-2 text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">
//               <Lock className="w-3 h-3" /> Data Privacy Act of 2012 Compliant
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }