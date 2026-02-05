import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, XCircle, ChevronLeft, Lock, Info, Search } from 'lucide-react';
import { verificationService } from '../services/verification';
import VerificationStats from '../components/verification/verificationstats';
import PendingVerificationTable from '../components/verification/VerificationTable';
import RejectionModal from '../components/verification/rejectionmodal';
import Pagination from '../components/common/pagination';

const Verification = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); 
  const [selectedRes, setSelectedRes] = useState(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  const formatName = (str) => {
    if (!str) return '';
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    loadData();
  }, []);

  // Reset to page 1 when the user searches
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await verificationService.getSubmissions();
      setSubmissions(data || []);
    } catch (error) {
      console.error("Backend Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (status, reason = "") => {
    try {
      await verificationService.updateStatus(selectedRes.id, status, reason);
      setShowRejectionModal(false);
      setView('list');
      setSelectedRes(null);
      await loadData(); 
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // 1. FILTER LOGIC: First, get all pending matches for the search
  const filteredSubmissions = submissions.filter(s => 
    s.status === 'Pending' && 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. PAGINATION LOGIC: Split the filtered list
  const totalItems = filteredSubmissions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);

  const stats = [
    { label: 'Pending', count: submissions.filter(s => s.status === 'Pending').length, subtext: 'Needs Review', color: 'text-orange-400', border: 'border-orange-200 dark:border-orange-500/20', Icon: Clock },
    { label: 'Verified', count: submissions.filter(s => s.status === 'Verified').length, subtext: 'Validated', color: 'text-emerald-500', border: 'border-emerald-200 dark:border-emerald-500/20', Icon: CheckCircle2 },
    { label: 'Rejected', count: submissions.filter(s => s.status === 'Rejected').length, subtext: 'Disapproved', color: 'text-red-500', border: 'border-red-200 dark:border-red-500/20', Icon: XCircle },
  ];

  if (loading && submissions.length === 0) return (
    <div className="h-96 flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent animate-spin rounded-full" />
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Records...</p>
    </div>
  );

  return (
    <div className="font-sans min-h-screen pb-20 animate-in fade-in duration-500 px-4 md:px-0">
      {view === 'list' ? (
        <div className="space-y-8">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Identity Verification</h1>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Approval Queue</p>
            </div>
          </header>
          
          <VerificationStats stats={stats} />

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Pass currentRecords instead of filteredSubmissions */}
            <PendingVerificationTable 
              data={currentRecords} 
              onReview={(res) => {
                setSelectedRes(res);
                setView('detail');
              }}
            />

            {/* Pagination Component */}
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      ) : (
        <DetailView 
            data={selectedRes} 
            formatName={formatName}
            setView={setView} 
            onApprove={() => handleAction('Verified')}
            onReject={() => setShowRejectionModal(true)} 
        />
      )}

      {showRejectionModal && (
        <RejectionModal 
          onClose={() => setShowRejectionModal(false)} 
          onConfirm={(reason) => handleAction('Rejected', reason)} 
        />
      )}
    </div>
  );
};

// --- DETAIL VIEW COMPONENT ---
const DetailView = ({ data, setView, onApprove, onReject, formatName }) => (
  <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8">
    <button onClick={() => setView('list')} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-all group">
      <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Queue
    </button>
    
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{formatName(data.name)}</h1>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mt-2 flex items-center gap-2">
              <Clock size={14} /> Submitted on {data.date}
            </p>
        </div>
        <div className="flex gap-3">
            <button onClick={onReject} className="px-6 py-3 bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/30 text-red-600 text-xs font-bold uppercase tracking-widest hover:bg-red-50 dark:hover:bg-red-950 transition-all rounded-xl">Disapprove</button>
            <button onClick={onApprove} className="px-6 py-3 bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all rounded-xl shadow-lg shadow-emerald-500/20">Verify Identity</button>
        </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                <Info size={16} className="text-emerald-500" /> Identity Documents
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Front Image</p>
                    <div className="bg-slate-100 dark:bg-slate-800 aspect-[1.6/1] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner">
                        <img src={data.details?.idFront} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="ID Front" />
                    </div>
                </div>
                <div className="space-y-4">
                    <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Back Image</p>
                    <div className="bg-slate-100 dark:bg-slate-800 aspect-[1.6/1] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner">
                        <img src={data.details?.idBack} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="ID Back" />
                    </div>
                </div>
            </div>
          </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900 dark:bg-slate-950 border border-slate-800 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Lock size={120} />
          </div>
          <p className="text-xs font-bold text-emerald-500 uppercase tracking-[3px] mb-10">System Profile</p>
          <div className="space-y-8 relative z-10">
            {[
                { label: 'Full Legal Name', val: formatName(data.name) },
                { label: 'Date of Birth', val: data.details?.birthdate },
                { label: 'Address / Zone', val: data.details ? `Purok ${data.details.purok}, ${data.details.address}` : 'N/A' },
                { label: 'Civil Status', val: data.details?.civilStatus },
            ].map((item, i) => (
                <div key={i} className="border-l-2 border-slate-800 pl-4">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-md font-semibold text-slate-200">{item.val}</p>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Verification;