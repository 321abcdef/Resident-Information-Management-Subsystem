import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Loader2, CheckCircle2, Download } from "lucide-react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useAuthLogic } from "./useAuthLogic";
import bsbPic from "../assets/bsb.png";
import logoPic from "../assets/logo.png";
import { useUser } from "../context/UserContext"; 

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const { 
    formData, handleChange, submitAuth, loading, 
    authSuccess, setAuthSuccess, trackingNum, 
    handleTrackSearch, searchResult 
  } = useAuthLogic(navigate, updateUser);

  const handleDownloadTracking = (code) => {
    const element = document.createElement("a");
    const textContent = `BARANGAY SAN BARTOLOME\nTracking Number: ${code}\nResident: ${formData.firstName} ${formData.lastName}\nDate: ${new Date().toLocaleDateString()}`;
    const file = new Blob([textContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `BSB-${code}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={`min-h-screen w-screen flex items-center justify-center relative transition-colors duration-500 py-6 lg:py-0 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-200 text-slate-900'}`}>
      
      <div className="fixed inset-0 z-0">
        <img src={bsbPic} alt="BG" className={`w-full h-full object-cover transition-opacity duration-500 ${isDarkMode ? 'opacity-30 grayscale' : 'opacity-40'}`} />
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/80' : 'bg-white/40'}`} />
      </div>

      <button onClick={() => setIsDarkMode(!isDarkMode)} className="fixed top-4 right-4 z-50 p-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl active:scale-95 transition-all">
        {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-emerald-800" />}
      </button>

      {authSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm p-8 rounded-[40px] shadow-2xl text-center border border-white/10 relative overflow-hidden">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-600" size={40} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">{authSuccess.title}</h2>
            <p className="text-[11px] font-bold text-slate-500 mb-8 px-4 leading-tight uppercase">{authSuccess.msg}</p>
            <div className="bg-slate-50 dark:bg-black p-6 rounded-3xl mb-8 border-2 border-dashed border-green-500/30">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tracking Code</p>
              <p className="text-3xl font-black text-green-600 tracking-tighter">{authSuccess.code}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleDownloadTracking(authSuccess.code)} className="w-full py-4 bg-slate-900 dark:bg-slate-800 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl flex items-center justify-center gap-2">
                <Download size={14} /> Download Receipt
              </button>
              <button onClick={() => { setAuthSuccess(null); setIsSignup(false); }} className="w-full py-4 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                Back to Login
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`relative z-20 w-full px-4 transition-all duration-700 ${isSignup ? 'max-w-6xl' : 'max-w-4xl'}`}>
        <div className={`w-full flex flex-col lg:flex-row rounded-[40px] shadow-2xl overflow-hidden border backdrop-blur-2xl transition-all duration-500
          ${isDarkMode ? 'bg-slate-900/95 border-white/10' : 'bg-white/95 border-white/50'}`}>
          
          <div className={`lg:w-1/3 p-10 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r 
            ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-slate-50/50 border-black/5'}`}>
            <img src={logoPic} alt="Logo" className="w-24 h-24 lg:w-32 lg:h-32 object-contain mb-6 drop-shadow-2xl" />
            <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-[0.85] mb-4 text-green-700">Barangay<br/>San Bartolome</h1>
            <div className="h-1.5 w-16 bg-green-600 rounded-full mb-10"></div>
            {!isSignup && (
              <div className="w-full max-w-[240px] space-y-3">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 block">Resident Tracker</label>
                <input 
                  type="text" value={trackingNum} onChange={(e) => handleTrackSearch(e.target.value)} placeholder="BSB-XXXX-XXXX"
                  className={`w-full px-4 py-4 rounded-2xl border-2 outline-none text-xs font-black text-center uppercase tracking-widest transition-all
                    ${isDarkMode ? 'bg-black border-slate-800 text-white focus:border-green-600' : 'bg-white border-slate-200 text-slate-900 focus:border-green-600'}`}
                />
                {searchResult && (
                  <div className="p-3 rounded-xl bg-white/50 dark:bg-black/30 border border-white/10 animate-in fade-in">
                    <p className={`text-[10px] font-black uppercase ${searchResult.status === "NOT_FOUND" ? 'text-rose-500' : 'text-green-600'}`}>{searchResult.status}</p>
                    <p className="text-[9px] font-bold opacity-70 leading-tight">{searchResult.message}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            <div className="p-8 lg:p-12 pb-4">
              <h3 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
                {isSignup ? "Register" : "Sign In"}
              </h3>
            </div>
            <div className="px-8 lg:px-12 pb-8 lg:max-h-[50vh] lg:overflow-y-auto custom-scrollbar">
              <form id="auth-form" onSubmit={(e) => { e.preventDefault(); submitAuth(isSignup); }} className="pt-2">
                {isSignup ? (
                  <SignupForm formData={formData} handleChange={handleChange} isDarkMode={isDarkMode} />
                ) : (
                  <div className="max-w-md mx-auto lg:mx-0">
                    <LoginForm formData={formData} handleChange={handleChange} isDarkMode={isDarkMode} />
                  </div>
                )}
              </form>
            </div>
            <div className={`p-8 lg:px-12 border-t flex flex-col sm:flex-row items-center justify-between gap-6 ${isDarkMode ? 'bg-black/40' : 'bg-slate-50/80'}`}>
              <button 
                type="button" 
                onClick={() => {setIsSignup(!isSignup); setAuthSuccess(null);}} 
                className="text-[10px] font-black uppercase text-slate-500 hover:text-green-600 tracking-[0.2em] transition-all"
              >
                {isSignup ? "← Back to Login" : "New Resident? Signup here →"}
              </button>
              <button 
                type="submit" 
                form="auth-form" 
                disabled={loading || (isSignup && (!formData.idFront || !formData.idBack || formData.contact?.length !== 11 || formData.age === 'Invalid'))}
                className="w-full sm:w-60 bg-green-700 hover:bg-green-800 text-white py-5 rounded-[24px] font-black text-lg uppercase tracking-widest shadow-2xl disabled:opacity-20 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : (isSignup ? "Submit Profile" : "Login Portal")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .full-input-sm { 
          width: 100%; padding: 1.1rem 1.3rem; border: 2.5px solid ${isDarkMode ? '#334155' : '#e2e8f0'}; 
          border-radius: 20px; background: ${isDarkMode ? '#0f172a' : '#fff'}; color: inherit; 
          outline: none; transition: 0.2s; font-size: 0.95rem; font-weight: 700; 
        }
        .full-input-sm:focus { border-color: #15803d; box-shadow: 0 0 20px rgba(21, 128, 61, 0.15); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #15803d; border-radius: 10px; }
      `}} />
    </div>
  );
}