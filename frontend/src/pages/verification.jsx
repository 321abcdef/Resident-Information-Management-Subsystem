import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, XCircle, ChevronLeft, Lock, Info, AlertTriangle } from 'lucide-react';
import { verificationService } from '../services/verification';
import VerificationStats from '../components/verification/verificationstats';
import VerificationListCard from '../components/verification/verificationlistcard';
import RejectionModal from '../components/verification/rejectionmodal';

const Verification = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // Tracks 'list' or 'detail' view
  const [selectedRes, setSelectedRes] = useState(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Pending');

  /**
   * FIX: Reset scroll position to top whenever the view changes.
   * This prevents the page from staying scrolled down when opening details.
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  /**
   * Initial data fetch from the backend service
   */
  useEffect(() => {
    loadData();
  }, []);

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

  /**
   * Handles status updates (Verified/Rejected) and refreshes the UI
   */
  const handleAction = async (status, reason = "") => {
    try {
      await verificationService.updateStatus(selectedRes.id, status, reason);
      
      // Reset UI state after successful action
      setShowRejectionModal(false);
      setView('list');
      setSelectedRes(null);
      
      // Refresh the list to reflect changes
      await loadData(); 
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Error updating record. Please try again.");
    }
  };

  // Logic for stats counting and filtering
  const filteredSubmissions = submissions.filter(s => s.status === activeTab);

  const stats = [
    { label: 'Pending', count: submissions.filter(s => s.status === 'Pending').length, subtext: 'Needs Review', color: 'text-orange-400', border: 'border-orange-200 dark:border-orange-500/20', Icon: Clock },
    { label: 'Verified', count: submissions.filter(s => s.status === 'Verified').length, subtext: 'System Validated', color: 'text-emerald-500', border: 'border-emerald-200 dark:border-emerald-500/20', Icon: CheckCircle2 },
    { label: 'Rejected', count: submissions.filter(s => s.status === 'Rejected').length, subtext: 'Disapproved', color: 'text-red-500', border: 'border-red-200 dark:border-red-500/20', Icon: XCircle },
  ];

  if (loading && submissions.length === 0) return (
    <div className="h-96 flex flex-col items-center justify-center space-y-4">
      <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent animate-spin rounded-full" />
      <p className="text-[10px] font-black uppercase tracking-[4px] text-slate-400">Security Check in Progress...</p>
    </div>
  );

  return (
    <div className="font-sans min-h-screen pb-20 animate-in fade-in duration-500 transition-colors">
      {view === 'list' ? (
        <div className="space-y-8">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Identity Verification</h1>
            </div>
            {stats[0].count > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-xl">
                  <AlertTriangle size={14} className="text-amber-500 animate-pulse" />
                  <span className="text-[9px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest">Action Required: {stats[0].count} New Submissions</span>
              </div>
            )}
          </header>
          
          <VerificationStats stats={stats} />

          {/* Tab Navigation */}
          <nav className="flex gap-10 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto scrollbar-hide">
            {['Pending', 'Verified', 'Rejected'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 text-[11px] font-black uppercase tracking-widest transition-all relative ${
                  activeTab === tab 
                    ? 'text-slate-900 dark:text-white' 
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                {tab} ({submissions.filter(s => s.status === tab).length})
                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500" />}
              </button>
            ))}
          </nav>

          {/* Grid List */}
          {filteredSubmissions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredSubmissions.map((res, i) => (
                <VerificationListCard 
                  key={res.id} 
                  res={res} 
                  index={i} 
                  onReview={() => { setSelectedRes(res); setView('detail'); }} 
                />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 p-20 text-center rounded-[2rem]">
                <CheckCircle2 className="mx-auto text-slate-200 dark:text-slate-800 mb-4" size={48} />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No {activeTab} submissions found</p>
            </div>
          )}
        </div>
      ) : (
        /* Detailed Verification View */
        <DetailView 
            data={selectedRes} 
            setView={setView} 
            onApprove={() => handleAction('Verified')}
            onReject={() => setShowRejectionModal(true)} 
        />
      )}

      {/* Rejection Reason Selection Modal */}
      {showRejectionModal && (
        <RejectionModal 
          onClose={() => setShowRejectionModal(false)} 
          onConfirm={(reason) => handleAction('Rejected', reason)} 
        />
      )}
    </div>
  );
};

/**
 * Sub-component for reviewing specific resident documents
 */
const DetailView = ({ data, setView, onApprove, onReject }) => (
  <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8">
    <button onClick={() => setView('list')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-all group">
      <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Queue
    </button>
    
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div>
            <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase">Review: {data.name}</h1>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Submitted on {data.date}</p>
        </div>
        <div className="flex gap-3">
            <button onClick={onReject} className="px-8 py-4 bg-white dark:bg-slate-900 border-2 border-red-100 dark:border-red-900/30 text-red-600 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all rounded-xl">Disapprove</button>
            <button onClick={onApprove} className="px-8 py-4 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 hover:shadow-xl transition-all rounded-xl shadow-lg shadow-emerald-500/20">Verify Identity</button>
        </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Visual Evidence Section */}
      <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Info size={14} className="text-emerald-500" /> ID Evidence (Visual Audit)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 group">
                    <p className="text-center text-[9px] font-black text-slate-400 group-hover:text-emerald-500 uppercase transition-colors">Front Image</p>
                    <div className="bg-slate-100 dark:bg-slate-800 aspect-[1.6/1] rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-inner">
                        <img src={data.details.idFront} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="ID Front" />
                    </div>
                </div>
                <div className="space-y-3 group">
                    <p className="text-center text-[9px] font-black text-slate-400 group-hover:text-emerald-500 uppercase transition-colors">Back Image</p>
                    <div className="bg-slate-100 dark:bg-slate-800 aspect-[1.6/1] rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-inner">
                        <img src={data.details.idBack} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="ID Back" />
                    </div>
                </div>
            </div>
          </div>
      </div>

      {/* Sidebar: System Profile Comparison */}
      <div className="space-y-6">
        <div className="bg-slate-900 dark:bg-slate-900 border border-slate-800 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Lock size={80} />
          </div>
          <div className="flex justify-between items-center mb-10 relative z-10">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[3px]">System Profile</p>
          </div>
          <div className="space-y-6 relative z-10">
            {[
                { label: 'Full Legal Name', val: data.name },
                { label: 'Date of Birth', val: data.details.birthdate },
                { label: 'Address / Zone', val: `Purok ${data.details.purok}, ${data.details.address}` },
                { label: 'Civil Status', val: data.details.civilStatus },
                { label: 'Submission Date', val: data.date }
            ].map((item, i) => (
                <div key={i} className="group">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 group-hover:text-emerald-500 transition-colors">{item.label}</p>
                    <p className="text-sm font-bold uppercase text-slate-200">{item.val}</p>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Verification;