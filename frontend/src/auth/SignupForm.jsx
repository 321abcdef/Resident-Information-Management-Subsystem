import React, { useState } from 'react';

const SignupForm = ({ formData, handleChange, isDarkMode }) => {
  const [step, setStep] = useState(1);
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

  // --- VALIDATION CHECKS ---
  const isStep1Valid = formData.firstName && formData.lastName && formData.birthdate && formData.gender && formData.age !== 'Invalid' && formData.age !== "";
  const isStep2Valid = formData.houseNumber && formData.purok && formData.street;
  const isStep3Valid = formData.idFront && formData.idBack && formData.contact?.length === 11;

  const fullAddress = `${formData.houseNumber || ''} ${formData.street || ''}, PUROK ${formData.purok || ''}, BRGY. SAN BARTOLOME`.replace(/^\s+/, '').trim();

  const labelClass = `text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`;
  const requiredStar = <span className="text-rose-500 ml-0.5">*</span>;

  // --- FILE HANDLING ---
  const handleFile = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      if (previews[side]) URL.revokeObjectURL(previews[side]);
      setPreviews(prev => ({ ...prev, [side]: URL.createObjectURL(file) }));
      handleChange({ target: { name: side === 'front' ? 'idFront' : 'idBack', value: file } });
    }
  };

  return (
    <div className="space-y-6">
      {/* STEP INDICATOR */}
      <div className="flex items-center justify-between mb-8 px-2">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center flex-1 last:flex-none">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 
              ${step >= num ? 'bg-green-600 text-white shadow-lg scale-110' : 'bg-slate-200 text-slate-400'}`}>
              {num}
            </div>
            {num < 3 && <div className={`h-[2px] flex-1 mx-2 ${step > num ? 'bg-green-600' : 'bg-slate-200'}`} />}
          </div>
        ))}
      </div>

      {/* STEP 1: PERSONAL INFO */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="col-span-1 space-y-1">
              <label className={labelClass}>First Name{requiredStar}</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="full-input-sm" placeholder="Juan" />
            </div>
            <div className="col-span-1 space-y-1">
              <label className={labelClass}>Middle Name <span className="lowercase font-medium opacity-50">(Optional)</span></label>
              <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="full-input-sm" placeholder="Santos" />
            </div>
            <div className="col-span-1 space-y-1">
              <label className={labelClass}>Last Name{requiredStar}</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="full-input-sm" placeholder="Dela Cruz" />
            </div>
            <div className="col-span-1 space-y-1">
              <label className={labelClass}>Suffix</label>
              <select name="suffix" value={formData.suffix || ""} onChange={handleChange} className="full-input-sm">
                <option value="">None</option>
                <option value="Jr.">Jr.</option>
                <option value="Sr.">Sr.</option>
                <option value="III">III</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-1">
              <label className={labelClass}>Birthdate{requiredStar}</label>
              <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} className="full-input-sm" />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Age</label>
              <input type="text" value={formData.age} readOnly className={`full-input-sm text-center font-bold ${formData.age === 'Invalid' ? 'text-rose-500' : 'text-green-600'}`} />
            </div>
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Gender{requiredStar}</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="full-input-sm">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other / Prefer not to say</option>
            </select>
          </div>
          <button 
            type="button" 
            disabled={!isStep1Valid} 
            onClick={() => setStep(2)}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest disabled:opacity-20 transition-all active:scale-95"
          >
            Continue to Address
          </button>
        </div>
      )}

      {/* STEP 2: RESIDENCY */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={labelClass}>House No.{requiredStar}</label>
              <input type="text" name="houseNumber" value={formData.houseNumber} onChange={handleChange} className="full-input-sm" placeholder="123" />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Purok{requiredStar}</label>
              <select name="purok" value={formData.purok} onChange={handleChange} className="full-input-sm">
                <option value="">Select Purok</option>
                {[1, 2, 3, 4, 5, 6, 7].map(num => <option key={num} value={num.toString()}>{num}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1 relative">
            <div className="flex justify-between items-center">
               <label className={labelClass}>Street{requiredStar}</label>
               {!formData.purok && <span className="text-[8px] font-black text-rose-500 uppercase animate-pulse">Select Purok First!</span>}
            </div>
            <select 
              name="street" 
              value={formData.street} 
              disabled={!formData.purok} 
              onChange={handleChange} 
              className={`full-input-sm ${!formData.purok ? 'opacity-40 cursor-not-allowed bg-slate-100' : ''}`}
            >
              <option value="">Select Street</option>
              {(streetMapping[formData.purok] || []).map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>
          <div className="p-4 bg-green-500/5 border border-green-600/20 rounded-2xl">
             <label className="text-[9px] font-black text-green-600 uppercase tracking-widest mb-1 block">Address Review:</label>
             <p className="text-xs font-black uppercase tracking-tight text-slate-700 dark:text-green-400">
               {formData.purok ? fullAddress : "Please complete address details..."}
             </p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest">Back</button>
            <button 
              type="button" 
              disabled={!isStep2Valid} 
              onClick={() => setStep(3)} 
              className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-20 transition-all active:scale-95"
            >
              Next: Verification
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SECURITY & ID */}
      {step === 3 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
          <div className="grid grid-cols-2 gap-3">
            {['front', 'back'].map(side => (
              <div key={side} className="space-y-1">
                <label className={labelClass}>Valid ID {side}{requiredStar}</label>
                <div className={`relative h-28 border-2 border-dashed rounded-2xl flex items-center justify-center overflow-hidden bg-slate-50/50 transition-all ${!formData[`id${side === 'front' ? 'Front' : 'Back'}`] ? 'border-rose-200' : 'border-green-500'}`}>
                  {previews[side] ? (
                    <img src={previews[side]} className="w-full h-full object-cover" alt="preview" />
                  ) : (
                    <div className="text-center px-2">
                      <p className="text-[18px] mb-1">📷</p>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Upload {side} View</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" required onChange={(e) => handleFile(e, side)} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Contact Number{requiredStar}</label>
            <input 
              type="text" 
              name="contact" 
              value={formData.contact} 
              maxLength={11} 
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                // Dito yung logic para sa "Numbers Only" prompt
                if (e.target.value !== val) {
                  alert("Numbers only, please!");
                }
                handleChange({ target: { name: 'contact', value: val } });
              }} 
              className="full-input-sm font-mono text-center tracking-[0.3em]" 
              placeholder="09123456789" 
            />
            <p className="text-[9px] font-bold text-center text-slate-400 italic">Ensure 11 digits (e.g., 09171234567)</p>
          </div>
          <button type="button" onClick={() => setStep(2)} className="w-full py-3 text-slate-400 font-black text-[10px] uppercase tracking-widest">← Back to Address</button>
          
          <div className={`p-4 rounded-2xl border-2 border-dashed text-center transition-all ${isStep3Valid ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-200 text-slate-400 opacity-50'}`}>
            <p className="text-[10px] font-black uppercase tracking-widest animate-pulse">
              {isStep3Valid ? "✅ Profile Complete - Ready to Submit" : "⚠️ Upload Both IDs to Finish"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupForm;