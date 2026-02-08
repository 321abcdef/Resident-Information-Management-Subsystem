import React from 'react';

const LoginForm = ({ formData, handleChange, isDarkMode }) => {
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Username
        </label>
        <input 
          type="text" 
          name="username" 
          value={formData.username || ""} 
          onChange={handleChange} 
          required 
          className="full-input-sm" 
          placeholder="admin_bartolome" 
        />
      </div>
      <div className="space-y-2">
        <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Password
        </label>
        <input 
          type="password" 
          name="password" 
          value={formData.password || ""} 
          onChange={handleChange} 
          required 
          className="full-input-sm" 
          placeholder="••••••••" 
        />
      </div>
    </div>
  );
};

export default LoginForm;