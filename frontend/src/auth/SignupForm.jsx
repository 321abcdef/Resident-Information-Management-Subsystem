import React, { useEffect, useState } from 'react';

const SignupForm = ({ formData, handleChange, isDarkMode, handleSubmit }) => {
  const [step, setStep] = useState(1);
  const [previews, setPreviews] = useState({ front: null, back: null });
  const [streets, setStreets] = useState([]);

  // Street mapping with IDs
  const streetsByPurok = {
    "1": [{ id: 1, name: "Sisa St." }, { id: 2, name: "Crisostomo St." }],
    "2": [{ id: 3, name: "Ibarra St." }, { id: 4, name: "Elias St." }],
    "3": [{ id: 5, name: "Maria Clara St." }, { id: 6, name: "Basilio St." }],
    "4": [{ id: 7, name: "Salvi St." }, { id: 8, name: "Victoria St." }],
    "5": [{ id: 9, name: "Tiago St." }, { id: 10, name: "Tasio St." }],
    "6": [{ id: 11, name: "Guevarra St." }, { id: 12, name: "Sinang St." }],
    "7": [{ id: 13, name: "Alfarez St." }, { id: 14, name: "Doña Victorina St." }]
  };

  const householdPositions = ["Head of Family", "Spouse", "Son", "Daughter", "Relative", "Househelp", "Others"];

  // Update streets when purok changes
  useEffect(() => {
    if (formData.purok) {
      setStreets(streetsByPurok[formData.purok] || []);
      if (!streetsByPurok[formData.purok]?.find(s => s.id === parseInt(formData.street))) {
        handleChange({ target: { name: 'street', value: '' } });
      }
    } else {
      setStreets([]);
    }
  }, [formData.purok]);

  // Auto-detect Senior Citizen
  useEffect(() => {
    if (formData.age !== 'Invalid' && parseInt(formData.age) >= 60) {
      handleChange({ target: { name: 'sector', value: '2' } });
    }
  }, [formData.age]);

  // Validation checks
  const isStep1Valid = 
    formData.firstName?.trim() && 
    formData.lastName?.trim() && 
    formData.birthdate && 
    formData.gender && 
    formData.sector && 
    formData.householdPosition && 
    formData.age !== 'Invalid' && 
    formData.age !== "" && 
    !isNaN(formData.age);

  const isStep2Valid = 
    formData.houseNumber?.trim() && 
    formData.purok && 
    formData.street;

  const isStep3Valid = 
    formData.employmentStatus &&
    formData.educationalStatus &&
    formData.highestGrade;

  const isStep4Valid = 
    formData.idFront && 
    formData.idBack && 
    formData.contact?.length === 11;

  const getStreetName = () => {
    const street = streets.find(s => s.id === parseInt(formData.street));
    return street ? street.name : '';
  };

  const fullAddress = `${formData.houseNumber || ''} ${getStreetName()}, PUROK ${formData.purok || ''}, BRGY. GULOD NOVALICHES`.replace(/^\s+/, '').trim();

  const labelClass = `text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`;
  const requiredStar = <span className="text-rose-500 ml-0.5">*</span>;

  const handleFile = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      if (previews[side]) URL.revokeObjectURL(previews[side]);
      setPreviews(prev => ({ ...prev, [side]: URL.createObjectURL(file) }));
      handleChange({ target: { name: side === 'front' ? 'idFront' : 'idBack', value: file, type: 'file' } });
    }
  };

  return (
    <div className="space-y-6">
      {/* STEP INDICATOR */}
      <div className="flex items-center justify-between mb-8 px-2">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex items-center flex-1 last:flex-none">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 
              ${step >= num ? 'bg-green-600 text-white shadow-lg scale-110' : 'bg-slate-200 text-slate-400 opacity-40'}`}>
              {num}
            </div>
            {num < 4 && <div className={`h-[2px] flex-1 mx-2 ${step > num ? 'bg-green-600' : 'bg-slate-200'}`} />}
          </div>
        ))}
      </div>

      {/* STEP 1: PERSONAL INFO */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="col-span-1 space-y-1">
              <label className={labelClass}>First Name{requiredStar}</label>
              <input type="text" name="firstName" value={formData.firstName || ""} onChange={handleChange} className="full-input-sm" placeholder="Juan" />
            </div>
            <div className="col-span-1 space-y-1">
              <label className={labelClass}>Middle Name</label>
              <input type="text" name="middleName" value={formData.middleName || ""} onChange={handleChange} className="full-input-sm" placeholder="Santos" />
            </div>
            <div className="col-span-1 space-y-1">
              <label className={labelClass}>Last Name{requiredStar}</label>
              <input type="text" name="lastName" value={formData.lastName || ""} onChange={handleChange} className="full-input-sm" placeholder="Dela Cruz" />
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
              <input type="date" name="birthdate" value={formData.birthdate || ""} onChange={handleChange} className="full-input-sm" />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Age</label>
              <input type="text" value={formData.age || ""} readOnly className={`full-input-sm text-center font-bold ${formData.age === 'Invalid' ? 'text-rose-500' : 'text-green-600'}`} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={labelClass}>Gender{requiredStar}</label>
              <select name="gender" value={formData.gender || ""} onChange={handleChange} className="full-input-sm">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            {/* ✅ FIXED: Nationality is now a text input */}
            <div className="space-y-1">
              <label className={labelClass}>Nationality</label>
              <input 
                type="text" 
                name="nationality" 
                value={formData.nationality || ""} 
                onChange={handleChange} 
                className="full-input-sm" 
                placeholder="Filipino"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={labelClass}>Marital Status</label>
              <select name="maritalStatus" value={formData.maritalStatus || ""} onChange={handleChange} className="full-input-sm">
                <option value="">Select</option>
                <option value="1">Single</option>
                <option value="2">Married</option>
                <option value="3">Widowed</option>
                <option value="4">Separated</option>
                <option value="5">Divorced</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Sector{requiredStar}</label>
              <select name="sector" value={formData.sector || ""} onChange={handleChange} className={`full-input-sm ${parseInt(formData.age) >= 60 ? 'border-amber-500 bg-amber-50/10' : ''}`}>
                <option value="">Select Sector</option>
                <option value="1">General Population</option>
                <option value="2">Senior Citizen</option>
                <option value="3">PWD</option>
                <option value="4">Solo Parent</option>
                <option value="5">Student</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Household Position{requiredStar}</label>
            <select name="householdPosition" value={formData.householdPosition || ""} onChange={handleChange} className="full-input-sm">
              <option value="">Select Position</option>
              {householdPositions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
            </select>
          </div>

          {/* ✅ OPTIONAL: Voter Registration Checkbox */}
          <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
            <input 
              type="checkbox" 
              id="isVoter" 
              name="isVoter" 
              checked={formData.isVoter || false}
              onChange={handleChange}
              className="w-5 h-5 rounded accent-green-600"
            />
            <label htmlFor="isVoter" className="text-xs font-bold text-slate-600 dark:text-slate-300">
              I am a registered voter in this barangay
            </label>
          </div>

          <button type="button" disabled={!isStep1Valid} onClick={() => setStep(2)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest disabled:opacity-10 disabled:grayscale transition-all active:scale-95">
            Continue to Address
          </button>
        </div>
      )}

      {/* STEP 2: ADDRESS */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={labelClass}>House No.{requiredStar}</label>
              <input type="text" name="houseNumber" value={formData.houseNumber || ""} onChange={handleChange} className="full-input-sm" placeholder="123" />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Purok{requiredStar}</label>
              <select name="purok" value={formData.purok || ""} onChange={handleChange} className="full-input-sm">
                <option value="">Select Purok</option>
                {[1, 2, 3, 4, 5, 6, 7].map(num => <option key={num} value={num.toString()}>{num}</option>)}
              </select>
            </div>
          </div>
          
          <div className="space-y-1">
            <label className={labelClass}>Street{requiredStar}</label>
            <select name="street" value={formData.street || ""} disabled={!formData.purok} onChange={handleChange} className="full-input-sm disabled:opacity-30">
              <option value="">Select Street</option>
              {streets.map(street => (<option key={street.id} value={street.id}>{street.name}</option>))}
            </select>
          </div>
          
          <div className="p-4 bg-green-500/5 border border-green-600/20 rounded-2xl">
            <label className="text-[9px] font-black text-green-600 uppercase tracking-widest mb-1 block">Address Review:</label>
            <p className="text-xs font-black uppercase tracking-tight text-slate-700 dark:text-green-400">
              {isStep2Valid ? fullAddress : "Please complete address details..."}
            </p>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest">Back</button>
            <button type="button" disabled={!isStep2Valid} onClick={() => setStep(3)} className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-10 transition-all active:scale-95">
              Next: Employment & Education
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: EMPLOYMENT & EDUCATION */}
      {step === 3 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
          <p className="text-xs font-black text-green-600 uppercase tracking-widest">Employment Information</p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={labelClass}>Employment Status{requiredStar}</label>
              <select name="employmentStatus" value={formData.employmentStatus || ""} onChange={handleChange} className="full-input-sm">
                <option value="">Select</option>
                <option value="Employed">Employed</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Student">Student</option>
                <option value="Retired">Retired</option>
                <option value="N/A">N/A</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Occupation</label>
              <input type="text" name="occupation" value={formData.occupation || ""} onChange={handleChange} className="full-input-sm" placeholder="Engineer, Teacher, etc." />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={labelClass}>Income Source</label>
              <select name="incomeSource" value={formData.incomeSource || ""} onChange={handleChange} className="full-input-sm">
                <option value="">Select</option>
                <option value="Salary">Salary</option>
                <option value="Business">Business</option>
                <option value="Pension">Pension</option>
                <option value="Remittance">Remittance</option>
                <option value="Others">Others</option>
                <option value="N/A">N/A</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Monthly Income (PHP)</label>
              <input type="number" name="monthlyIncome" value={formData.monthlyIncome || ""} onChange={handleChange} className="full-input-sm" placeholder="0" />
            </div>
          </div>

          <div className="h-px bg-slate-200 my-4"></div>
          
          <p className="text-xs font-black text-green-600 uppercase tracking-widest">Education Information</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={labelClass}>Educational Status{requiredStar}</label>
              <select name="educationalStatus" value={formData.educationalStatus || ""} onChange={handleChange} className="full-input-sm">
                <option value="">Select</option>
                <option value="Currently Studying">Currently Studying</option>
                <option value="Graduated">Graduated</option>
                <option value="Not Studying">Not Studying</option>
                <option value="N/A">N/A</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClass}>School Type</label>
              <select name="schoolType" value={formData.schoolType || ""} onChange={handleChange} className="full-input-sm">
                <option value="">Select</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="N/A">N/A</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={labelClass}>School Level</label>
              <select name="schoolLevel" value={formData.schoolLevel || ""} onChange={handleChange} className="full-input-sm">
                <option value="">Select</option>
                <option value="Elementary">Elementary</option>
                <option value="Junior High School">Junior High School</option>
                <option value="Senior High School">Senior High School</option>
                <option value="College">College</option>
                <option value="Vocational">Vocational</option>
                <option value="Graduate School">Graduate School</option>
                <option value="N/A">N/A</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Highest Grade{requiredStar}</label>
              <select name="highestGrade" value={formData.highestGrade || ""} onChange={handleChange} className="full-input-sm">
                <option value="">Select</option>
                <option value="No Formal Education">No Formal Education</option>
                <option value="Elementary Undergraduate">Elementary Undergraduate</option>
                <option value="Elementary Graduate">Elementary Graduate</option>
                <option value="High School Undergraduate">High School Undergraduate</option>
                <option value="High School Graduate">High School Graduate</option>
                <option value="College Undergraduate">College Undergraduate</option>
                <option value="College Graduate">College Graduate</option>
                <option value="Vocational Graduate">Vocational Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
                <option value="N/A">N/A</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest">Back</button>
            <button type="button" disabled={!isStep3Valid} onClick={() => setStep(4)} className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-10 transition-all active:scale-95">
              Next: ID Upload
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: ID UPLOAD */}
      {step === 4 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
          <div className="grid grid-cols-2 gap-3">
            {['front', 'back'].map(side => (
              <div key={side} className="space-y-1">
                <label className={labelClass}>Valid ID {side}{requiredStar}</label>
                <div className={`relative h-28 border-2 border-dashed rounded-2xl flex items-center justify-center overflow-hidden transition-all ${!formData[side === 'front' ? 'idFront' : 'idBack'] ? 'border-rose-200 bg-rose-50/20' : 'border-green-500 bg-green-50/20'}`}>
                  {previews[side] ? <img src={previews[side]} className="w-full h-full object-cover" /> : <p className="text-[8px] font-black text-slate-400 uppercase">Upload {side}</p>}
                  <input type="file" accept="image/*" onChange={(e) => handleFile(e, side)} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Contact Number{requiredStar}</label>
            <input type="text" name="contact" value={formData.contact || ""} maxLength={11} onChange={(e) => handleChange({ target: { name: 'contact', value: e.target.value.replace(/\D/g, '') } })} className="full-input-sm font-mono text-center tracking-[0.3em]" placeholder="09123456789" />
          </div>
          <button type="button" onClick={() => setStep(3)} className="w-full py-3 text-slate-400 font-black text-[10px] uppercase tracking-widest">← Back to Employment</button>
          
          <div onClick={() => isStep4Valid && handleSubmit && handleSubmit()} className={`p-4 rounded-2xl border-2 border-dashed text-center transition-all cursor-pointer ${isStep4Valid ? 'border-green-500 bg-green-50 text-green-700 active:scale-95 shadow-lg' : 'border-slate-200 text-slate-400 opacity-20 pointer-events-none'}`}>
            <p className="text-[10px] font-black uppercase tracking-widest">
              {isStep4Valid ? "✅ Submit Profile Now" : "⚠️ Upload Both IDs to Finish"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupForm;