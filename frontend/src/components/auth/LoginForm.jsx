import React from 'react';

const LoginForm = ({ formData, handleChange, isDarkMode }) => {
  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Username</label>
        <input 
          type="text" 
          name="username" // Backend key
          value={formData.username} 
          onChange={handleChange} 
          required 
          className="full-input" 
          placeholder="admin_bartolome" 
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Password</label>
        <input 
          type="password" 
          name="password" // Backend key
          value={formData.password} 
          onChange={handleChange} 
          required 
          className="full-input" 
          placeholder="••••••••" 
        />
      </div>
    </div>
  );
};

export default LoginForm;