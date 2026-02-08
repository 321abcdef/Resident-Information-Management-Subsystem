import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, XCircle, ChevronLeft, Maximize2 } from 'lucide-react';
import { useVerification } from '../hooks/useVerification';
import { calculateAge } from '../services/verification';
import VerificationStats from '../components/verification/verificationstats';
import PendingVerificationTable from '../components/verification/VerificationTable';
import VerificationFilters from '../components/verification/VerificationFilters';
import VerificationActions from '../components/verification/VerificationActions';

const Verification = () => {
  const { submissions, loading, updateStatus } = useVerification();
  const [view, setView] = useState('list');
  const [selectedRes, setSelectedRes] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomedImg, setZoomedImg] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  const formatName = (str) => {
    if (!str) return '';
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleAction = async (status) => {
    // Dynamic message based on action
    const actionText = status === 'Verified' ? 'APPROVE' : 
                      status === 'For Verification' ? 'set for PHYSICAL VERIFICATION' : 'DISAPPROVE';
    
    if (!window.confirm(`Are you sure you want to ${actionText} this submission?`)) return;

    const result = await updateStatus(selectedRes.id, status);
    if (result.success) {
      setView('list');
      setSelectedRes(null);
    }
  };

  const filteredSubmissions = submissions.filter(s => 
    s.status === 'Pending' && s.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="font-sans min-h-screen pb-20 px-4 md:px-0">
      {/* ZOOM MODAL */}
      {zoomedImg && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out" onClick={() => setZoomedImg(null)}>
          <div className="relative w-full h-full flex items-center justify-center">
            <img src={zoomedImg} className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300" alt="Full ID" />
            <button className="absolute top-0 right-0 m-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-md text-sm font-bold transition-all">CLOSE (ESC)</button>
          </div>
        </div>
      )}

      {view === 'list' ? (
        <div className="animate-in fade-in duration-500 space-y-8">
          <header>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Identity Verification</h1>
          </header>
          
          <VerificationStats submissions={submissions} />

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-none overflow-hidden shadow-sm">
            <VerificationFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {loading ? (
              <div className="p-10 text-center text-slate-400 text-sm italic">Updating queue...</div>
            ) : (
              <PendingVerificationTable 
                data={filteredSubmissions} 
                onReview={(res) => { setSelectedRes(res); setView('detail'); }}
              />
            )}
          </div>
        </div>
      ) : (
        <DetailView 
          data={selectedRes} 
          formatName={formatName}
          setView={setView} 
          onVisitBgy={() => handleAction('For Verification')}
          onApprove={() => handleAction('Verified')}
          onReject={() => handleAction('Rejected')} 
          onZoom={(img) => setZoomedImg(img)}
        />
      )}
    </div>
  );
};

// COMPONENT: DetailView
const DetailView = ({ data, setView, onApprove, onReject, onVisitBgy, formatName, onZoom }) => (
  <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8 relative">
    <button onClick={() => setView('list')} className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-600 flex items-center gap-2 transition-colors">
      <ChevronLeft size={18} /> Back to Queue
    </button>

    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{formatName(data?.name)}</h1>
            <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-widest">Submitted: {data?.date}</p>
        </div>

        <VerificationActions 
          onVisitBgy={onVisitBgy} 
          onApprove={onApprove} 
          onReject={onReject} 
          address={data?.details?.address} 
        />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 rounded-none">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[2px] mb-8 border-l-4 border-emerald-500 pl-3">Identity Documents</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <IDCard label="Front ID Photo" src={data?.details?.idFront} onClick={() => onZoom(data?.details?.idFront)} />
              <IDCard label="Back ID Photo" src={data?.details?.idBack} onClick={() => onZoom(data?.details?.idBack)} />
            </div>
          </div>
      </div>

      <div className="bg-slate-900 dark:bg-slate-950 p-8 rounded-none text-white border-t-4 border-emerald-500 h-fit">
          <p className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-10">User Profile</p>
          <div className="space-y-6">
              <InfoField label="Full Legal Name" val={formatName(data?.name)} />
              <InfoField label="Age / Birthdate" val={`${calculateAge(data?.details?.birthdate)} YRS OLD (${data?.details?.birthdate})`} />
              <InfoField label="Address / Purok" val={`Purok ${data?.details?.purok || 'N/A'}, ${data?.details?.address || ''}`} />
              <InfoField label="Civil Status" val={data?.details?.civilStatus} />
          </div>
      </div>
    </div>
  </div>
);

const IDCard = ({ label, src, onClick }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-bold text-slate-400 uppercase">{label}</span>
      <span className="text-[9px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">Click to expand</span>
    </div>
    <div onClick={onClick} className="group relative aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-100 dark:border-slate-800 cursor-zoom-in">
      <img src={src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={label} />
      <div className="absolute inset-0 bg-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Maximize2 className="text-white drop-shadow-md" size={32} />
      </div>
    </div>
  </div>
);

const InfoField = ({ label, val }) => (
  <div>
    <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">{label}</p>
    <p className="font-bold text-slate-200">{val || '---'}</p>
  </div>
);

export default Verification;