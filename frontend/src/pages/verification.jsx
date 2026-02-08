import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, Maximize2, Clock, MapPin, 
  CheckCircle2, XCircle, History, Key 
} from 'lucide-react';
import { useVerification } from '../hooks/useVerification';
import { calculateAge } from '../services/verification';
import VerificationStats from '../components/verification/verificationstats';
import PendingVerificationTable from '../components/verification/VerificationTable';
import VerificationFilters from '../components/verification/VerificationFilters';
import VerificationActions from '../components/verification/VerificationActions';
import VerificationSuccessModal from '../components/verification/VerificationSuccessModal';

const Verification = () => {
  const { submissions, loading, updateStatus } = useVerification();
  const [view, setView] = useState('list');
  const [activeTab, setActiveTab] = useState('Pending');
  const [selectedRes, setSelectedRes] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomedImg, setZoomedImg] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);
  const [lastVerified, setLastVerified] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  // FIXED: Eto yung nawala kanina kaya nag-error
  const filteredSubmissions = submissions.filter(s => {
    const matchesTab = s.status === activeTab;
    const matchesSearch = s.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const generateTempPass = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) { result += chars.charAt(Math.floor(Math.random() * chars.length)); }
    return result;
  };

  const handleAction = async (status) => {
    const actionText = status === 'Verified' ? 'APPROVE' : 
                      status === 'For Verification' ? 'set for PHYSICAL VERIFICATION' : 'DISAPPROVE';
    
    if (!window.confirm(`Are you sure you want to ${actionText} this submission?`)) return;

    let extraData = {};
    if (status === 'Verified') {
      const generatedBrgyId = `BSB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const tempPass = generateTempPass();
      extraData = {
        barangay_id: generatedBrgyId,
        temp_password: tempPass,
        verified_at: new Date().toISOString()
      };

      const details = {
        name: selectedRes.name,
        id: generatedBrgyId,
        user: selectedRes.contact || selectedRes.details?.contact,
        pass: tempPass
      };
      
      setAccountDetails(details);
      setLastVerified(details);
    }

    const result = await updateStatus(selectedRes.id, status, extraData);
    
    if (result.success) {
      if (status === 'Verified') {
        setShowSuccess(true);
      } else {
        setView('list');
        setSelectedRes(null);
        setActiveTab(status);
      }
    } else {
      alert("Error: Database update failed.");
    }
  };

  const tabs = [
    { id: 'Pending', label: 'New Requests', icon: Clock },
    { id: 'For Verification', label: 'For Visit', icon: MapPin },
    { id: 'Verified', label: 'Verified', icon: CheckCircle2 },
    { id: 'Rejected', label: 'Rejected', icon: XCircle },
  ];

  return (
    <div className="font-sans min-h-screen pb-20 px-4 md:px-0 relative">
      
      {/* HISTORY BUTTON */}
      {lastVerified && !showSuccess && (
        <button 
          onClick={() => {
            setAccountDetails(lastVerified);
            setShowSuccess(true);
          }}
          className="fixed bottom-8 right-8 z-[50] flex items-center gap-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-4 rounded-[2rem] shadow-2xl hover:scale-105 transition-all border border-emerald-500/50"
        >
          <div className="bg-emerald-500 p-2 rounded-full text-white">
            <History size={18} />
          </div>
          <div className="text-left pr-4">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Last Verified</p>
            <p className="text-xs font-bold truncate max-w-[150px]">{lastVerified.name}</p>
          </div>
        </button>
      )}

      <VerificationSuccessModal 
        isOpen={showSuccess} 
        onClose={() => {
          setShowSuccess(false);
          setView('list');
          setSelectedRes(null);
          setActiveTab('Verified');
        }} 
        data={accountDetails} 
      />

      {zoomedImg && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/95 flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setZoomedImg(null)}>
          <img src={zoomedImg} className="max-w-full max-h-full object-contain shadow-2xl" alt="Full ID" />
        </div>
      )}

      {view === 'list' ? (
        <div className="animate-in fade-in duration-500 space-y-8">
          <header><h1 className="text-2xl font-bold uppercase tracking-tight text-slate-900 dark:text-white">Identity Verification</h1></header>
          <VerificationStats submissions={submissions} />
          <div className="flex overflow-x-auto gap-1 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-black uppercase transition-all
                  ${activeTab === tab.id ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                <tab.icon size={14} /> {tab.label}
              </button>
            ))}
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <VerificationFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {loading ? <div className="p-10 text-center text-slate-400 italic">Updating queue...</div> : (
              <PendingVerificationTable data={filteredSubmissions} onReview={(res) => { setSelectedRes(res); setView('detail'); }} />
            )}
          </div>
        </div>
      ) : (
        <DetailView 
          data={selectedRes} 
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

const DetailView = ({ data, setView, onApprove, onReject, onVisitBgy, onZoom }) => (
  <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8">
    <button onClick={() => setView('list')} className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-600 flex items-center gap-2 transition-colors">
      <ChevronLeft size={18} /> Back to Queue
    </button>
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{data?.name}</h1>
            <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-widest">Status: {data?.status} | Submitted: {data?.date}</p>
        </div>
        <VerificationActions 
          onVisitBgy={onVisitBgy} 
          onApprove={onApprove} 
          onReject={onReject} 
          currentStatus={data?.status}
        />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[2px] mb-8 border-l-4 border-emerald-500 pl-3">Identity Documents</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <IDCard label="Front ID Photo" src={data?.details?.idFront} onClick={() => onZoom(data?.details?.idFront)} />
              <IDCard label="Back ID Photo" src={data?.details?.idBack} onClick={() => onZoom(data?.details?.idBack)} />
            </div>
          </div>
      </div>
      <div className="bg-slate-900 p-8 rounded-2xl text-white border-t-4 border-emerald-500 h-fit">
          <p className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-10">User Profile</p>
          <div className="space-y-6">
              <InfoField label="Full Legal Name" val={data?.name} />
              <InfoField label="Age" val={`${calculateAge(data?.details?.birthdate)} YRS OLD`} />
              <InfoField label="Address" val={`Purok ${data?.details?.purok}, ${data?.details?.address}`} />
              <InfoField label="Contact" val={data?.details?.contact} />
          </div>
      </div>
    </div>
  </div>
);

const IDCard = ({ label, src, onClick }) => (
  <div className="space-y-3">
    <span className="text-[10px] font-bold text-slate-400 uppercase">{label}</span>
    <div onClick={onClick} className="group relative aspect-video bg-slate-100 rounded-xl overflow-hidden cursor-zoom-in border border-slate-200">
      <img src={src} className="w-full h-full object-cover group-hover:scale-105 transition-all" alt={label} />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
        <Maximize2 className="text-white" />
      </div>
    </div>
  </div>
);

const InfoField = ({ label, val }) => (
  <div>
    <p className="text-[10px] text-slate-500 uppercase font-black">{label}</p>
    <p className="font-bold text-slate-200">{val || '---'}</p>
  </div>
);

export default Verification;