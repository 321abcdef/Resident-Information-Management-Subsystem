import React, { useState, useEffect } from 'react';

const SignupForm = ({ formData, handleChange, isDarkMode }) => {
  const [error, setError] = useState("");
  const [previews, setPreviews] = useState({ front: null, back: null });

  const streetMapping = {
    "1": ["Sisa St.", "Crisostomo St."],
    "2": ["Ibarra St.", "Elias St."],
    "3": ["Maria Clara St.", "Basilio St."],
    "4": ["Salvi St.", "Victoria St."],
    "5": ["Tiago St.", "Tasio St."],
    "6": ["Guevarra St.", "Sinang St."],
    "7": ["Alfarez St.", "Doña Victorina St."]
  };

  // --- ADDRESS PREVIEW LOGIC ---
  const fullAddress = `${formData.houseNumber || ''} ${formData.street || ''}, PUROK ${formData.purok || ''}, BRGY. SAN BARTOLOME`.replace(/^\s+/, '').trim();

  // --- BIRTHDATE VALIDATION (Limit Year & Auto-Age) ---
  const handleDateChange = (e) => {
    const val = e.target.value; // Format: YYYY-MM-DD
    const year = val.split('-')[0];
    
    // Do not allow if the year exceeds 4 digits or is in the future
    if (year.length > 4 || parseInt(year) > 2026) return;
    
    handleChange(e);
  };

  useEffect(() => {
    if (formData.birthdate) {
      const birthDate = new Date(formData.birthdate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      if (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) age--;
      handleChange({ target: { name: 'age', value: age >= 0 ? age : 0 } });
    }
  }, [formData.birthdate]);

  const handleFileChange = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      setPreviews(prev => ({ ...prev, [side]: URL.createObjectURL(file) }));
      handleChange({ target: { name: side === 'front' ? 'idFront' : 'idBack', value: file } });
    }
  };

  const labelClass = `text-[10px] font-black uppercase tracking-tighter ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`;

  return (
    <div className="space-y-4 pr-2 animate-in fade-in slide-in-from-right-4 duration-500 pb-4">
      
      {/* FULL NAME SECTION */}
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className={labelClass}>First Name</label>
          <input type="text" name="firstName" value={formData.firstName} required onChange={handleChange} className="full-input" placeholder="Juan" />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Middle Name <span className="lowercase font-medium opacity-50">(Opt)</span></label>
          <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="full-input" placeholder="Santos" />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} required onChange={handleChange} className="full-input" placeholder="Dela Cruz" />
        </div>
      </div>

      {/* BIRTHDATE & AGE */}
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 space-y-1">
          <label className={labelClass}>Birthdate</label>
          <input 
            type="date" 
            name="birthdate" 
            value={formData.birthdate} 
            required 
            max="2026-12-31"
            onChange={handleDateChange} 
            className="full-input" 
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Age</label>
          <input type="text" value={formData.age} readOnly className={`full-input font-bold text-center ${isDarkMode ? 'bg-gray-800 text-green-400' : 'bg-gray-50 text-green-700'}`} />
        </div>
      </div>

      {/* GENDER & SECTOR */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className={labelClass}>Gender</label>
          <select name="gender" value={formData.gender} required onChange={handleChange} className="full-input">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Sector</label>
          <select name="sector" value={formData.sector} required onChange={handleChange} className="full-input">
            <option value="">Select Sector</option>
            <option value="General">General Population</option>
            <option value="PWD">PWD</option>
            <option value="Senior">Senior Citizen</option>
            <option value="Solo Parent">Solo Parent</option>
          </select>
        </div>
      </div>

      {/* ADDRESS SECTION */}
      <div className={`p-3 rounded-xl border-2 border-dashed ${isDarkMode ? 'border-gray-800 bg-gray-900/20' : 'border-gray-400 bg-gray-50/50'} space-y-3`}>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className={labelClass}>House No.</label>
            <input type="text" name="houseNumber" value={formData.houseNumber} required onChange={handleChange} className="full-input" placeholder="e.g. 123" />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Purok</label>
            <select name="purok" value={formData.purok} required onChange={handleChange} className="full-input">
              <option value="">Select</option>
              {[1, 2, 3, 4, 5, 6, 7].map(num => <option key={num} value={num.toString()}>{num}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Street (Select Purok First)</label>
          <select name="street" value={formData.street} required disabled={!formData.purok} onChange={handleChange} className="full-input">
            <option value="">Select Street</option>
            {(streetMapping[formData.purok] || []).map(st => <option key={st} value={st}>{st}</option>)}
          </select>
        </div>
      </div>

      {/* COMPLETE ADDRESS DISPLAY (Double Check) */}
      <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-green-900/20 border-green-800/30' : 'bg-green-50 border-green-100'}`}>
        <label className="text-[9px] font-black text-green-600 uppercase tracking-widest">Address Summary (Verify):</label>
        <p className={`text-[11px] font-bold mt-1 leading-tight uppercase ${isDarkMode ? 'text-green-400' : 'text-green-800'}`}>
          {formData.houseNumber || formData.street || formData.purok ? fullAddress : "Awaiting address details..."}
        </p>
      </div>

      {/* TWO ID UPLOAD */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className={labelClass}>ID Front View</label>
          <div className="relative group h-24 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center overflow-hidden bg-gray-50/10 transition-all hover:border-green-500">
            {previews.front ? <img src={previews.front} className="w-full h-full object-cover" alt="Front Preview" /> : <span className="text-[10px] font-bold text-gray-400">Click to Upload</span>}
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'front')} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
        </div>
        <div className="space-y-1">
          <label className={labelClass}>ID Back View</label>
          <div className="relative group h-24 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center overflow-hidden bg-gray-50/10 transition-all hover:border-green-500">
            {previews.back ? <img src={previews.back} className="w-full h-full object-cover" alt="Back Preview" /> : <span className="text-[10px] font-bold text-gray-400">Click to Upload</span>}
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'back')} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="space-y-1">
        <div className="flex justify-between">
          <label className={labelClass}>Contact Number</label>
          {error && <span className="text-red-500 text-[10px] font-black animate-pulse uppercase">{error}</span>}
        </div>
        <div className="relative">
          <input 
            type="text" 
            name="contact" 
            value={formData.contact} 
            required 
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 11);
              handleChange({ target: { name: 'contact', value: val } });
              if (/[^0-9]/.test(e.target.value)) { 
                setError("Numbers only!"); 
                setTimeout(() => setError(""), 2000); 
              }
            }} 
            /* Removed pl-10 since there's no icon/flag inside anymore */
            className="full-input-sm font-mono tracking-widest" 
            placeholder="09123456789" 
          />
        </div>
        <p className={`text-[9px] font-bold italic ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Format: <span className="text-green-600 font-black">09</span>XXXXXXXXX (11 digits)
        </p>
      </div>
    </div>
  );
};

export default SignupForm;