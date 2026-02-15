import { jsPDF } from "jspdf";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Loader2, CheckCircle2, Download, ArrowLeft } from "lucide-react";
import LoginForm from "./auth/login/Login";
import SignupForm from "./auth/signup/SignUp";
import { useAuthLogic } from "./auth/hooks/useAuthLogic";
import { useUser } from "../context/UserContext"; 
import { handleDownloadSlip } from '../services/verification';

// Assets
import bsbPic from "../assets/bgygulod.png";
import logoPic from "../assets/bgylogo.png";

export default function HomePage() {
  const [isSignup, setIsSignup] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const { 
    formData, 
    handleChange, 
    submitAuth, 
    loading, 
    authSuccess, 
    setAuthSuccess, 
    trackingNum, 
    handleTrackSearch, 
    searchResult,
    purokList,  
    allStreets  
  } = useAuthLogic(navigate, updateUser);

  return (
    <div className={`min-h-screen w-screen flex items-center justify-center relative transition-colors duration-500 py-6 lg:py-0 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-200 text-slate-900'}`}>
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <img 
          src={bsbPic} 
          alt="BG" 
          className={`w-full h-full object-cover transition-opacity duration-500 ${isDarkMode ? 'opacity-30 grayscale' : 'opacity-40'}`} 
        />
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/80' : 'bg-white/40'}`} />
      </div>

      {/* Dark Mode Toggle */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)} 
        className="fixed top-4 right-4 z-50 p-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl active:scale-95 transition-all"
      >
        {isDarkMode ? (
          <Sun size={20} className="text-yellow-400" />
        ) : (
          <Moon size={20} className="text-emerald-800" />
        )}
      </button>

      {/* FIXED: Success Modal with Proper Data Passing */}
      {authSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm p-8 rounded-[40px] shadow-2xl text-center border border-white/10 relative overflow-hidden">
            
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-600" size={40} />
            </div>
            
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2 dark:text-white">
              {authSuccess.title}
            </h2>
            
            <p className="text-[11px] font-bold text-slate-500 mb-8 px-4 leading-tight uppercase">
              {authSuccess.msg}
            </p>
            
            {/* Tracking Number Display */}
            <div className="bg-slate-50 dark:bg-black p-6 rounded-3xl mb-8 border-2 border-dashed border-green-500/30">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                Tracking Number
              </p>
              <p className="text-3xl font-black text-green-600 tracking-tighter">
                {authSuccess.code}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {/* CRITICAL FIX: Proper Data Structure for PDF */}
             <button 
  type="button"
 onClick={() => {

  const fullName = authSuccess.resident?.name || 
    `${formData.firstName} ${formData.middleName || ''} ${formData.lastName} ${formData.suffix || ''}`.replace(/\s+/g, ' ').trim();

  const pdfData = {
    name: fullName.toUpperCase(), 
    trackingNumber: authSuccess.code,
    status: authSuccess.resident?.status || "Pending",
    submittedDate: authSuccess.resident?.submittedDate || new Date().toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    })
  };
  
  handleDownloadSlip(pdfData);
}}

  className="w-full py-4 bg-green-700 hover:bg-green-800 text-white font-black uppercase text-[11px] tracking-widest rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/20 active:scale-95"
>
  <Download size={16} /> 
  <span>Download Registration Slip</span>
</button>
              
              <button 
                onClick={() => { 
                  setAuthSuccess(null); 
                  setIsSignup(false); 
                }} 
                className="w-full py-2 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-600 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className={`relative z-20 w-full px-4 transition-all duration-700 ${isSignup ? 'max-w-6xl' : 'max-w-4xl'}`}>
        <div className={`w-full flex flex-col lg:flex-row rounded-[40px] shadow-2xl overflow-hidden border backdrop-blur-2xl transition-all duration-500
          ${isDarkMode ? 'bg-slate-900/95 border-white/10' : 'bg-white/95 border-white/50'}`}>
          
          {/* Side Info & Tracker */}
          <div className={`lg:w-1/3 p-10 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r 
            ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-slate-50/50 border-black/5'}`}>
            
            <img 
              src={logoPic} 
              alt="Logo" 
              className="w-24 h-24 lg:w-32 lg:h-32 object-contain mb-6 drop-shadow-2xl" 
            />
            
            <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-[0.85] mb-4 text-green-700">
              Barangay<br/>Gulod Novaliches
            </h1>
            
            <div className="h-1.5 w-16 bg-green-600 rounded-full mb-10"></div>
            
            {/* Tracking System */}
            {!isSignup && (
              <div className="w-full max-w-[240px] space-y-3">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 block text-center">
                  Track Application
                </label>
                
                <input 
                  type="text" 
                  value={trackingNum} 
                  onChange={(e) => handleTrackSearch(e.target.value)} 
                  placeholder="BGN-XXXX"
                  className={`w-full px-4 py-4 rounded-2xl border-2 outline-none text-xs font-black text-center uppercase tracking-widest transition-all
                    ${isDarkMode 
                      ? 'bg-black border-slate-800 text-white focus:border-green-600' 
                      : 'bg-white border-slate-200 text-slate-900 focus:border-green-600'
                    }`}
                />
                
                {/* Search Result Display */}
                {searchResult && (
                  <div className="mt-4 p-4 rounded-2xl bg-white/50 dark:bg-black/30 border border-white/20 animate-in fade-in slide-in-from-top-2 text-left">
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Status
                      </p>
                     <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border 
  ${searchResult.status === 'Verified' 
    ? 'bg-emerald-100 text-emerald-600 border-emerald-200' 
    : searchResult.status === 'Rejected'
    ? 'bg-red-100 text-red-600 border-red-200'
    : searchResult.status === 'For Verification'
    ? 'bg-blue-100 text-blue-600 border-blue-200'
    : 'bg-orange-100 text-orange-600 border-orange-200' // Default for Pending
  }`}>
  {searchResult.status}
</span>

                    </div>
                    
                    <p className="text-sm font-black text-slate-800 dark:text-white leading-tight mb-1">
                      {searchResult.message}
                    </p>
                    
                    {searchResult.name && (
                      <p className="text-[10px] font-medium text-slate-500 italic">
                        Applicant: {searchResult.name}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Form Content */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="p-8 lg:p-12 pb-4">
              <h3 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none dark:text-white">
                {isSignup ? "Register" : "Sign In"}
              </h3>
            </div>
            
            <div className="px-8 lg:px-12 pb-8 lg:max-h-[50vh] lg:overflow-y-auto custom-scrollbar">
              <form 
                id="auth-form" 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  submitAuth(isSignup); 
                }} 
                className="pt-2"
              >
                {isSignup ? (
                 <SignupForm 
  formData={formData}
  handleChange={handleChange}
  isDarkMode={isDarkMode}
  handleSubmit={submitAuth}
  purokList={purokList} 
  allStreets={allStreets}
/>
                ) : (
                  <div className="max-w-md mx-auto lg:mx-0">
                    <LoginForm 
                      formData={formData} 
                      handleChange={handleChange} 
                      isDarkMode={isDarkMode} 
                    />
                  </div>
                )}
              </form>
            </div>

            {/* Form Footer */}
            <div className={`p-8 lg:px-12 border-t flex flex-col sm:flex-row items-center justify-between gap-6 
              ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-slate-50/80 border-black/5'}`}>
              
              <button 
                type="button" 
                onClick={() => {
                  setIsSignup(!isSignup); 
                  setAuthSuccess(null);
                }} 
                className="text-[10px] font-black uppercase text-slate-500 hover:text-green-600 tracking-[0.2em] transition-all flex items-center gap-2"
              >
                {isSignup ? (
                  <>
                    <ArrowLeft size={12}/> Back to Login
                  </>
                ) : (
                  "Don't have an account? Register here →"
                )}
              </button>
              
              <button 
                type="submit" 
                form="auth-form" 
                disabled={
                  loading || 
                  (isSignup && (
                    !formData.idFront || 
                    !formData.idBack || 
                    formData.contact?.length !== 11 || 
                    formData.age === 'Invalid' ||
                    !formData.firstName ||
                    !formData.lastName
                  ))
                }
                className="w-full sm:w-60 bg-green-700 hover:bg-green-800 text-white py-5 rounded-[24px] font-black text-lg uppercase tracking-widest shadow-2xl disabled:opacity-20 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  isSignup ? "Submit Registration" : "Login Portal"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .full-input-sm { 
          width: 100%; 
          padding: 1.1rem 1.3rem; 
          border: 2.5px solid ${isDarkMode ? '#334155' : '#e2e8f0'}; 
          border-radius: 20px; 
          background: ${isDarkMode ? '#0f172a' : '#fff'}; 
          color: ${isDarkMode ? '#fff' : '#0f172a'}; 
          outline: none; 
          transition: 0.2s; 
          font-size: 0.95rem; 
          font-weight: 700; 
        }
        .full-input-sm:focus { 
          border-color: #15803d; 
          box-shadow: 0 0 20px rgba(21, 128, 61, 0.15); 
        }
        .custom-scrollbar::-webkit-scrollbar { 
          width: 6px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #15803d; 
          border-radius: 10px; 
        }
      `}} />
    </div>
  );
}
