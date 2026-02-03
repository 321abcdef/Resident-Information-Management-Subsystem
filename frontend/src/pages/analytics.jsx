import React, { useState, useEffect } from "react";
import AnalyticsCard from "../components/common/analyticscard";
import { MapPin, Lightbulb, ChevronRight, X } from "lucide-react";
import { getAnalyticsData } from "../services/analytics";

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("total");
  const [selectedPurok, setSelectedPurok] = useState(null);

  useEffect(() => {
    const load = async () => {
      const result = await getAnalyticsData();
      setData(result);
      setLoading(false);
    };
    load();
  }, []);

  if (loading || !data) return (
    <div className="p-8 text-emerald-600 dark:text-emerald-400 font-black uppercase text-xs tracking-widest animate-pulse">
      Loading Analytics Data...
    </div>
  );

  const displayData = data.purokDistribution.map(p => ({
    ...p,
    currentCount: activeFilter === "total" ? p.count : p[activeFilter]
  }));

  const recommendation = [...displayData].sort((a, b) => b.currentCount - a.currentCount)[0];

  const getBoxStyle = (count) => {
    const thresholds = activeFilter === "total" ? [400, 200] : [50, 20];
    if (count >= thresholds[0]) return "bg-orange-500 text-white border-orange-600 shadow-lg shadow-orange-500/20"; 
    if (count >= thresholds[1]) return "bg-emerald-500 text-white border-emerald-600"; 
    return "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"; 
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 transition-colors">
      {/* Page Header - Matches Dashboard style */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
            Heat Map
          </h1>
        </div>

        {/* Category Filters */}
        <div className="flex bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-1 rounded-2xl shadow-sm">
          {['total', 'seniors', 'pwd', 'minors'].map(id => (
            <button
              key={id}
              onClick={() => setActiveFilter(id)}
              className={`px-4 py-2 text-[10px] font-black uppercase rounded-xl transition-all ${
                activeFilter === id 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              {id}
            </button>
          ))}
        </div>
      </div>
      
      {/* Main Grid Container */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm transition-colors p-6 rounded-sm">
          <div className="flex flex-wrap items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
              District Intensity: {activeFilter}
            </h2>
            <div className="flex items-center gap-4 text-[9px] font-black uppercase">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" /> 
                <span className="text-slate-700 dark:text-slate-300">High Density</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> 
                <span className="text-slate-700 dark:text-slate-300">Moderate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full" /> 
                <span className="text-slate-700 dark:text-slate-300">Low</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayData.map((p, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedPurok(p)}
                className={`p-6 rounded-[1.5rem] border transition-all cursor-pointer hover:scale-[1.02] ${getBoxStyle(p.currentCount)}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">{p.name}</span>
                  <MapPin size={14} className="opacity-40" />
                </div>
                <div className="text-5xl font-black tracking-tighter">{p.currentCount}</div>
                <p className="text-[10px] font-bold uppercase opacity-60 mt-1">{activeFilter}</p>
              </div>
            ))}
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recommendation Card */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 text-white p-8 rounded-2xl flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-orange-400 mb-6 bg-orange-400/10 w-fit px-3 py-1 rounded-full">
              <Lightbulb size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Recommended Action</span>
            </div>
            <h2 className="text-2xl font-bold leading-tight tracking-tight">
              Focus resources on <span className="text-orange-400">{recommendation.name}</span> for targeted {activeFilter} assistance.
            </h2>
          </div>
          <div className="mt-8 flex justify-end">
             <button 
                onClick={() => setSelectedPurok(recommendation)}
                className="p-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-all shadow-lg active:scale-95"
             >
                <ChevronRight size={24} />
             </button>
          </div>
        </div>

        {/* Employment Status Card */}
        <div className="lg:col-span-2">
          <AnalyticsCard title="Employment Status">
            <div className="space-y-5 pt-2">
              {data.employment.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] font-black uppercase mb-1.5">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-slate-900 dark:text-white">{item.count}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${(item.count / 600) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </AnalyticsCard>
        </div>
      </div>

      {/* Modal */}
      {selectedPurok && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
              <h3 className="font-black text-slate-800 dark:text-white uppercase text-sm">{selectedPurok.name} Summary</h3>
              <button onClick={() => setSelectedPurok(null)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20}/>
              </button>
            </div>
            <div className="p-8 space-y-3">
              <ModalRow label="Total Residents" val={selectedPurok.count} />
              <ModalRow label="Senior Citizens" val={selectedPurok.seniors} />
              <ModalRow label="PWD Population" val={selectedPurok.pwd} />
              <ModalRow label="Underage (Minors)" val={selectedPurok.minors} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const ModalRow = ({ label, val }) => (
  <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-colors">
    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">{label}</span>
    <span className="font-black text-slate-900 dark:text-white">{val}</span>
  </div>
);