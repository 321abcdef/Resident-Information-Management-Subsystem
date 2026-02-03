import React, { useState } from 'react';
import { Building2, Lock, Bell, Database, Save, RefreshCw, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-w-5xl space-y-8 pb-10 animate-in fade-in duration-500">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">System Settings</h1>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[3px]">Global Configuration & Security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-8 rounded-[2rem] shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-emerald-50 dark:bg-emerald-500/10 p-2 rounded-xl text-emerald-600"><Building2 size={20}/></div>
              <h2 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">Barangay Profile</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Barangay Name</label>
                <input type="text" defaultValue="Barangay 526" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Zone / District</label>
                <input type="text" defaultValue="Zone 52" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white" />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Municipality / City</label>
                <input type="text" defaultValue="Sampaloc, Manila City" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-8 rounded-[2rem] shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-slate-900 dark:bg-emerald-500 p-2 rounded-xl text-white dark:text-slate-900"><Lock size={20}/></div>
              <h2 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">Admin Security</h2>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 block mb-1">New Admin Password</label>
                <input type={showPassword ? "text" : "password"} placeholder="••••••••••••" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white" />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[34px] text-slate-400 hover:text-emerald-600">
                  {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
              <button className="bg-slate-900 dark:bg-emerald-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">Update Password</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-600 p-8 rounded-[2rem] text-white shadow-xl shadow-emerald-500/10 relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                   <Bell size={18} className="text-emerald-200" />
                   <p className="text-[10px] font-black uppercase tracking-[3px]">Alert Thresholds</p>
                </div>
                <div className="space-y-4">
                  <input type="range" className="w-full accent-white opacity-70" />
                  <div className="flex justify-between text-[9px] font-black uppercase">
                    <span>Low Density</span>
                    <span>High Density</span>
                  </div>
                </div>
             </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm">
             <div className="flex items-center gap-2 mb-6">
                <Database className="text-slate-400" size={18} />
                <h3 className="text-[10px] font-black text-slate-800 dark:text-white uppercase tracking-widest">Data Management</h3>
             </div>
             <div className="space-y-3">
                <button className="w-full p-4 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 rounded-2xl flex items-center justify-between group transition-all">
                  <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase group-hover:text-emerald-600">Export All Data</span>
                  <RefreshCw size={14} className="text-slate-300 group-hover:text-emerald-600 group-hover:rotate-180 transition-all" />
                </button>
                <button className="w-full p-4 bg-red-50 dark:bg-red-500/10 hover:bg-red-600 rounded-2xl flex items-center justify-between group transition-all">
                  <span className="text-[10px] font-black text-red-600 group-hover:text-white uppercase">Clear Logs</span>
                  <ShieldCheck size={14} className="text-red-300 group-hover:text-white" />
                </button>
             </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-10 right-10 z-20">
         <button className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-500/40 transition-all hover:-translate-y-1 active:scale-95">
            <Save size={18} /> Save All Changes
         </button>
      </div>
    </div>
  );
}