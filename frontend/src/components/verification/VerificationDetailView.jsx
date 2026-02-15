import React from 'react';
import { ChevronLeft, Maximize2, MapPin, Phone, User, Briefcase, GraduationCap, Calendar, DollarSign } from 'lucide-react';
import VerificationActions from './VerificationActions';

const DetailView = ({ data, setView, onApprove, onReject, onVisitBgy, onZoom }) => {
  const details = data?.details || {};

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8 pb-12">
      {/* Navigation */}
      <button
        onClick={() => setView('list')}
        className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-600 flex items-center gap-2 transition-colors"
      >
        <ChevronLeft size={18} /> Back to Queue
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            {data?.name}
          </h1>
          <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-widest flex items-center gap-3">
            <span>Tracking: <span className="text-slate-600 dark:text-slate-200">{data?.trackingNumber}</span></span>
            <span className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
            <span>Status: <span className="text-emerald-500">{data?.status}</span></span>
          </p>
        </div>
        <VerificationActions
          onVisitBgy={onVisitBgy}
          onApprove={onApprove}
          onReject={onReject}
          currentStatus={data?.status}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Identity Documents */}
          <div className="bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[2px] mb-8 border-l-4 border-emerald-500 pl-3">
              Identity Documents ({details.idType})
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <IDCard label="Front ID Photo" src={details.idFront} onClick={() => onZoom(details.idFront)} />
              <IDCard label="Back ID Photo" src={details.idBack} onClick={() => onZoom(details.idBack)} />
            </div>
          </div>

          {/* Residency Details & Address Summary */}
          <div className="bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[2px] mb-6 border-l-4 border-emerald-500 pl-3">
              Residency Information
            </p>

            <div className="mb-8 p-5 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
              <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <MapPin size={12} /> Address Summary
              </p>
              <p className="text-lg font-bold text-slate-800 dark:text-white leading-tight uppercase">
                {details.addressSummary}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <InfoFieldWhite label="Residency Status" val={details.residencyStatus} />
              <InfoFieldWhite label="Date Started" val={details.residencyStartDate} icon={<Calendar size={14}/>} />
              <InfoFieldWhite label="Voter Status" val={details.isVoter ? "Yes (Registered)" : "No"} />
            </div>
          </div>

          {/* Economic & Education Profile */}
          <div className="bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[2px] mb-8 border-l-4 border-emerald-500 pl-3">Economic & Education Profile</p>
            
            <div className="space-y-10">
              {/* Economic - 5 Fields Grid */}
              <div>
                <p className="text-[10px] font-bold text-emerald-600 uppercase mb-4 tracking-wider flex items-center gap-2">
                  <Briefcase size={14} /> Economic Status
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <InfoFieldWhite label="Employment" val={details.employmentStatus} />
                  <InfoFieldWhite label="Occupation" val={details.occupation} />
                  <InfoFieldWhite label="Monthly Income" val={details.monthlyIncome} />
                  <InfoFieldWhite label="Income Source" val={details.incomeSource} />
               
                </div>
              </div>

              {/* Education - 4 Fields Grid */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-8">
                <p className="text-[10px] font-bold text-emerald-600 uppercase mb-4 tracking-wider flex items-center gap-2">
                  <GraduationCap size={14} /> Educational Background
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <InfoFieldWhite label="Status" val={details.educationalStatus} />
                  <InfoFieldWhite label="School Type" val={details.schoolType} />
                  <InfoFieldWhite label="School Level" val={details.schoolLevel} />
                  <InfoFieldWhite label="Highest Grade" val={details.highestGrade} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="bg-slate-900 p-8 rounded-3xl text-white border-t-8 border-emerald-500 shadow-xl lg:sticky lg:top-8">
          <p className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-8 flex items-center gap-2">
            <User size={14} /> Personal Profile
          </p>
          <div className="space-y-5">
            <InfoField label="Full Legal Name" val={data?.name} />
            <div className="grid grid-cols-2 gap-4">
              <InfoField label="Age" val={details.age} />
              <InfoField label="Gender" val={details.sex} />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <InfoField label="Marital Status" val={details.maritalStatus} />
               <InfoField label="Nationality" val={details.nationality} />
            </div>
             <div className="grid grid-cols-2 gap-4">
               <InfoField label="Birth Registration" val={details.birthRegistration} />
               <InfoField label="Sector" val={details.sector} />
            </div>
            <div className="h-px bg-slate-800 my-4" />
            
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
               <MapPin size={14} /> Location Data
            </p>
            <InfoField label="Purok" val={details.purok} />
            <InfoField label="Street" val={details.street} />
            <InfoField label="House Number" val={details.houseNumber} />
            <InfoField label="Position in Family" val={details.householdPosition} />

            <div className="h-px bg-slate-800 my-4" />

            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
               <Phone size={14} /> Contact Details
            </p>
            <InfoField label="Mobile Number" val={details.contact} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components remain the same
const IDCard = ({ label, src, onClick }) => (
  <div className="space-y-3">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
    <div onClick={onClick} className="group relative aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden cursor-zoom-in border border-slate-200 dark:border-slate-700">
      {src ? (
        <img src={src} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" alt={label} />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs italic">No Image</div>
      )}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
        <Maximize2 className="text-white" />
      </div>
    </div>
  </div>
);

const InfoField = ({ label, val }) => (
  <div>
    <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-0.5">{label}</p>
    <p className="font-bold text-slate-200 text-sm">{val || '---'}</p>
  </div>
);

const InfoFieldWhite = ({ label, val, icon }) => (
  <div>
    <div className="flex items-center gap-1 mb-1">
      {icon && <span className="text-slate-400">{icon}</span>}
      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{label}</p>
    </div>
    <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">{val || '---'}</p>
  </div>
);

export default DetailView;