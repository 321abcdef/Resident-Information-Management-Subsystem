import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, XCircle, ChevronLeft, Maximize2 } from 'lucide-react';
import { verificationService, calculateAge } from '../services/verification';
import VerificationStats from '../components/verification/verificationstats';
import PendingVerificationTable from '../components/verification/VerificationTable';
import VerificationFilters from '../components/verification/VerificationFilters';

const Verification = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); 
  const [selectedRes, setSelectedRes] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  const formatName = (str) => {
    if (!str) return '';
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await verificationService.getSubmissions();
      setSubmissions(data || []);
    } catch (error) {
      console.error("Error loading submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (status) => {
    const actionText = status === 'Verified' ? 'APPROVE' : 'DISAPPROVE';
    const confirmAction = window.confirm(`Are you sure you want to ${actionText} this submission?`);
    
    if (!confirmAction) return;

    try {
      await verificationService.updateStatus(selectedRes.id, status, "Processed via Quick Action");
      setView('list');
      setSelectedRes(null);
      await loadData(); 
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const filteredSubmissions = submissions.filter(s => 
    s.status === 'Pending' && 
    (s.name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = [
    { label: 'Pending', count: submissions.filter(s => s.status === 'Pending').length, subtext: 'Needs Review', color: 'text-orange-400', Icon: Clock },
    { label: 'Verified', count: submissions.filter(s => s.status === 'Verified').length, subtext: 'Validated', color: 'text-emerald-500', Icon: CheckCircle2 },
    { label: 'Rejected', count: submissions.filter(s => s.status === 'Rejected').length, subtext: 'Disapproved', color: 'text-red-500', Icon: XCircle },
  ];

  return (
    <div className="font-sans min-h-screen pb-20 px-4 md:px-0">
      {view === 'list' ? (
        <div className="animate-in fade-in duration-500 space-y-8">
          <header>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Identity Verification</h1>
          </header>
          
          <VerificationStats stats={stats} />

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-none overflow-hidden shadow-sm">
            <VerificationFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {!loading || submissions.length > 0 ? (
              <PendingVerificationTable 
                data={filteredSubmissions.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage)} 
                onReview={(res) => { 
                  setSelectedRes(res); 
                  setView('detail'); 
                }}
              />
            ) : (
              <div className="p-10 text-center text-slate-400 text-sm italic">
                Updating queue...
              </div>
            )}
          </div>
        </div>
      ) : (
        <DetailView 
            data={selectedRes} 
            formatName={formatName}
            setView={setView} 
            onApprove={() => handleAction('Verified')}
            onReject={() => handleAction('Rejected')} 
        />
      )}
    </div>
  );
};

const DetailView = ({ data, setView, onApprove, onReject, formatName }) => {
  const [zoomedImg, setZoomedImg] = useState(null);

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8 relative">
      
      {/* --- IMAGE MODAL (ZOOM) --- */}
      {zoomedImg && (
        <div 
          className="fixed inset-0 z-[9999] bg-slate-950/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          onClick={() => setZoomedImg(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={zoomedImg} 
              className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300" 
              alt="Full ID" 
            />
            <button className="absolute top-0 right-0 m-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-md text-sm font-bold transition-all">
              CLOSE (ESC)
            </button>
          </div>
        </div>
      )}

      <button onClick={() => setView('list')} className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-600 flex items-center gap-2 transition-colors">
        <ChevronLeft size={18} /> Back to Queue
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{formatName(data?.name)}</h1>
              <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-widest">Submitted: {data?.date}</p>
          </div>
          <div className="flex gap-2">
              <button onClick={onReject} className="px-8 py-4 bg-white dark:bg-slate-900 border border-red-500 text-red-500 text-xs font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all rounded-none">Disapprove</button>
              <button onClick={onApprove} className="px-8 py-4 bg-emerald-600 text-white text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all rounded-none shadow-md">Approve & Verify</button>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 rounded-none">
              <p className="text-xs font-black text-slate-400 uppercase tracking-[2px] mb-8 border-l-4 border-emerald-500 pl-3">Identity Documents</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* FRONT ID */}
                  <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Front ID Photo</span>
                        <span className="text-[9px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">Click to expand</span>
                      </div>
                      <div 
                        onClick={() => setZoomedImg(data?.details?.idFront)}
                        className="group relative aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-100 dark:border-slate-800 cursor-zoom-in"
                      >
                          <img src={data?.details?.idFront} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Front ID" />
                          <div className="absolute inset-0 bg-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Maximize2 className="text-white drop-shadow-md" size={32} />
                          </div>
                      </div>
                  </div>

                  {/* BACK ID */}
                  <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Back ID Photo</span>
                        <span className="text-[9px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">Click to expand</span>
                      </div>
                      <div 
                        onClick={() => setZoomedImg(data?.details?.idBack)}
                        className="group relative aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-100 dark:border-slate-800 cursor-zoom-in"
                      >
                          <img src={data?.details?.idBack} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Back ID" />
                          <div className="absolute inset-0 bg-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Maximize2 className="text-white drop-shadow-md" size={32} />
                          </div>
                      </div>
                  </div>
              </div>
            </div>
        </div>

        <div className="bg-slate-900 dark:bg-slate-950 p-8 rounded-none text-white border-t-4 border-emerald-500 h-fit">
            <p className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-10">User Profile</p>
            <div className="space-y-6">
                {[
                  { label: 'Full Legal Name', val: formatName(data?.name) },
                  { label: 'Age / Birthdate', val: `${calculateAge(data?.details?.birthdate)} YRS OLD (${data?.details?.birthdate})` },
                  { label: 'Address / Purok', val: `Purok ${data?.details?.purok || 'N/A'}, ${data?.details?.address || ''}` },
                  { label: 'Civil Status', val: data?.details?.civilStatus }
                ].map((item, idx) => (
                  <div key={idx}>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">{item.label}</p>
                      <p className="font-bold text-slate-200">{item.val || '---'}</p>
                  </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;