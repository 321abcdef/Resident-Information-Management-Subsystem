import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Loader2, CheckCircle2, AlertCircle, ClipboardCheck } from "lucide-react";
import LoginForm from "../components/auth/LogInForm";
import SignupForm from "../components/auth/SignUpForm";
import bsbPic from "../assets/bsb.png";
import logoPic from "../assets/logo.png";
import { authService } from "../services/auth"; 

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [trackingNum, setTrackingNum] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(null); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "", middleName: "", lastName: "", birthdate: "", age: "",
    gender: "", sector: "", purok: "", street: "", houseNumber: "", 
    contact: "", idFront: null, idBack: null, username: "", password: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTrackSearch = async (val) => {
    const input = val.toUpperCase();
    setTrackingNum(input);
    if (input.length >= 6) {
      try {
        const res = await authService.track(input);
        setSearchResult(res || { status: "FOR VERIFICATION", message: "Visit Brgy. Hall for ID check." });
      } catch (err) {
        setSearchResult({ status: "NOT_FOUND", message: "Application not found." });
      }
    } else {
      setSearchResult(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthSuccess(null);

    try {
      if (isSignup) {
        const res = await authService.register(formData);
        if (res.success) {
          setAuthSuccess({
            title: "Registration Success!",
            msg: `Copy your tracking number: ${res.trackingNumber}`,
            code: res.trackingNumber
          });
        }
      } else {
        const res = await authService.login({
          username: formData.username,
          password: formData.password
        });
        if (res.success) {
          localStorage.setItem("token", res.token);
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen w-screen flex items-center justify-center relative overflow-x-hidden transition-colors duration-500 py-6 lg:py-0 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-200 text-slate-900'}`}>
      
      {/* FIXED BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <img src={bsbPic} alt="BG" className="w-full h-full object-cover opacity-50" />
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/70' : 'bg-white/30'}`} />
      </div>

      {/* THEME TOGGLE */}
      <button onClick={() => setIsDarkMode(!isDarkMode)} className="fixed top-4 right-4 z-50 p-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl active:scale-95 transition-all">
        {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-green-800" />}
      </button>

      {/* MAIN WRAPPER */}
      <div className={`relative z-20 w-full px-4 transition-all duration-500 ${isSignup ? 'max-w-6xl' : 'max-w-4xl'}`}>
        <div className={`w-full flex flex-col lg:flex-row rounded-[32px] shadow-2xl overflow-hidden border backdrop-blur-lg transition-all
          ${isDarkMode ? 'bg-slate-900/95 border-white/10' : 'bg-white/90 border-white/50'}`}>
          
          {/* LEFT PANEL: BRANDING */}
          <div className={`lg:w-1/3 p-8 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r 
            ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-white/40 border-black/5'}`}>
            
            <img src={logoPic} alt="Logo" className="w-20 h-20 lg:w-28 lg:h-28 object-contain mb-4 drop-shadow-xl" />
            <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-[0.9] mb-4 text-green-700">Barangay<br/>San Bartolome</h1>
            <div className="h-1.5 w-16 bg-green-600 rounded-full mb-8"></div>
            
            {!isSignup && (
              <div className="w-full max-w-[240px] space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 block">Track Application</label>
                <input 
                  type="text" 
                  value={trackingNum} 
                  onChange={(e) => handleTrackSearch(e.target.value)}
                  placeholder="BSB-XXXX-XXXX"
                  className={`w-full px-4 py-4 rounded-2xl border-2 outline-none text-sm font-black text-center uppercase tracking-widest transition-all
                    ${isDarkMode ? 'bg-black border-slate-700 focus:border-green-500' : 'bg-white border-slate-200 focus:border-green-600'}`}
                />
                {searchResult && (
                  <div className="flex flex-col items-center gap-1 animate-in fade-in slide-in-from-bottom-2">
                    <p className={`text-[11px] font-black uppercase tracking-tighter ${searchResult.status === "NOT_FOUND" ? 'text-red-500' : 'text-green-600'}`}>
                      {searchResult.status}
                    </p>
                    <p className="text-[11px] font-bold opacity-80 leading-tight text-center">{searchResult.message}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT PANEL: FORMS */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="p-8 lg:p-10 pb-4">
              <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none">
                {isSignup ? "Create Profile" : "Staff Login"}
              </h3>
              {authSuccess && (
                <div className="mt-6 p-5 rounded-[24px] bg-green-600/10 border border-green-600/20 flex items-center gap-4 animate-in zoom-in-95">
                  <ClipboardCheck className="text-green-600 flex-shrink-0" size={32} />
                  <div className="min-w-0">
                    <p className="text-sm font-black text-green-600 uppercase tracking-tight">{authSuccess.title}</p>
                    <p className="text-[11px] font-bold opacity-80 uppercase leading-none break-all">{authSuccess.msg}</p>
                  </div>
                </div>
              )}
            </div>

            {/* FORM AREA - Readable and Spaced */}
            <div className="px-8 lg:px-10 pb-8 lg:max-h-[55vh] lg:overflow-y-auto custom-scrollbar">
              <div className="pt-2">
                <form id="auth-form" onSubmit={handleSubmit}>
                  {isSignup ? (
                    <SignupForm formData={formData} handleChange={handleChange} isDarkMode={isDarkMode} />
                  ) : (
                    <div className="max-w-md mx-auto lg:mx-0">
                      <LoginForm formData={formData} handleChange={handleChange} isDarkMode={isDarkMode} />
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div className={`p-8 border-t flex flex-col sm:flex-row items-center justify-between gap-6 ${isDarkMode ? 'bg-black/40' : 'bg-gray-50/50'}`}>
              <button 
                type="button" 
                onClick={() => {setIsSignup(!isSignup); setSearchResult(null); setAuthSuccess(null); window.scrollTo(0,0);}} 
                className="text-xs font-black uppercase text-green-700 hover:text-green-500 tracking-[0.2em] transition-colors order-2 sm:order-1"
              >
                {isSignup ? "← Back to Login" : "No account? Signup here"}
              </button>

              <button 
                type="submit" 
                form="auth-form" 
                disabled={loading}
                className="w-full sm:w-56 bg-green-700 hover:bg-green-800 text-white py-5 rounded-[20px] font-black text-lg uppercase tracking-widest shadow-xl active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-3 order-1 sm:order-2"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : (isSignup ? "Submit" : "Sign In")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* READABLE INPUT STYLES */}
      <style dangerouslySetInnerHTML={{ __html: `
        .full-input { 
          width: 100%; padding: 1.2rem 1.5rem; border: 2.5px solid ${isDarkMode ? '#334155' : '#e2e8f0'}; 
          border-radius: 18px; background: ${isDarkMode ? '#000' : '#fff'}; color: inherit; 
          outline: none; transition: 0.3s; font-size: 1.1rem; font-weight: 700; 
        }
        .full-input-sm { 
          width: 100%; padding: 0.8rem 1.2rem; border: 2px solid ${isDarkMode ? '#334155' : '#e2e8f0'}; 
          border-radius: 14px; background: ${isDarkMode ? '#000' : '#fff'}; color: inherit; 
          outline: none; transition: 0.2s; font-size: 0.95rem; font-weight: 600; 
        }
        .full-input:focus, .full-input-sm:focus { 
          border-color: #15803d; box-shadow: 0 0 20px rgba(21, 128, 61, 0.15); 
        }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #15803d; border-radius: 10px; }
      `}} />
    </div>
  );
}