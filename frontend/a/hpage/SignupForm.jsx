// import React, { useEffect, useState } from 'react';

// const SignupForm = ({ formData, handleChange, isDarkMode, handleSubmit }) => {
//   const [step, setStep] = useState(1);
//   const [previews, setPreviews] = useState({ front: null, back: null });
//   const [streets, setStreets] = useState([]);

//   // Street data mapping per Purok
//   const streetsByPurok = {
//     "1": [{ id: 1, name: "Sisa St." }, { id: 2, name: "Crisostomo St." }],
//     "2": [{ id: 3, name: "Ibarra St." }, { id: 4, name: "Elias St." }],
//     "3": [{ id: 5, name: "Maria Clara St." }, { id: 6, name: "Basilio St." }],
//     "4": [{ id: 7, name: "Salvi St." }, { id: 8, name: "Victoria St." }],
//     "5": [{ id: 9, name: "Tiago St." }, { id: 10, name: "Tasio St." }],
//     "6": [{ id: 11, name: "Guevarra St." }, { id: 12, name: "Sinang St." }],
//     "7": [{ id: 13, name: "Alfarez St." }, { id: 14, name: "Doña Victorina St." }]
//   };

//   const householdPositions = ["Head of Family", "Spouse", "Son", "Daughter", "Relative", "Househelp", "Others"];

//   // Effect to update streets when Purok changes
//   useEffect(() => {
//     if (formData.purok) {
//       setStreets(streetsByPurok[formData.purok] || []);
//       // Reset street selection if it doesn't belong to the new Purok
//       if (!streetsByPurok[formData.purok]?.find(s => s.id === parseInt(formData.street))) {
//         handleChange({ target: { name: 'street', value: '' } });
//       }
//     } else {
//       setStreets([]);
//     }
//   }, [formData.purok]);

//   // Auto-set Sector to Senior Citizen (Value 3) if age is 60 or above
//   useEffect(() => {
//     if (formData.age !== "" && !isNaN(formData.age) && parseInt(formData.age) >= 60) {
//       handleChange({ target: { name: 'sector', value: '3' } }); 
//     }
//   }, [formData.age]);

//   const handleHouseNumberChange = (e) => {
//     const { name, value } = e.target;
//     handleChange({ target: { name: name, value: value.toUpperCase() } });
//   };

//   const handleFile = (e, side) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         alert("Masyadong malaki ang file! Max size ay 5MB.");
//         e.target.value = "";
//         return;
//       }
//       if (previews[side]) URL.revokeObjectURL(previews[side]);
//       setPreviews(prev => ({ ...prev, [side]: URL.createObjectURL(file) }));
//       handleChange({ target: { name: side === 'front' ? 'idFront' : 'idBack', files: [file] } });
//     }
//   };

//   // --- STEP VALIDATION LOGIC ---
//   const isStep1Valid = 
//     formData.firstName?.trim() && 
//     formData.lastName?.trim() && 
//     formData.birthdate && 
//     formData.gender && 
//     formData.sector && 
//     formData.householdPosition && 
//     formData.birthRegistration &&
//     formData.age !== "" && !isNaN(formData.age);

//   const isStep2Valid = 
//     formData.houseNumber?.trim() && 
//     formData.purok && 
//     formData.street &&
//     formData.residencyStatus &&
//     formData.residencyStartDate;

//   const isStep3Valid = 
//     formData.educationalStatus && 
//     formData.highestGrade && 
//     formData.employmentStatus && 
//     formData.monthlyIncome;

//   const isStep4Valid = 
//     formData.idFront && 
//     formData.idBack && 
//     formData.contact?.length === 11;

//   const getStreetName = () => {
//     const street = streets.find(s => s.id === parseInt(formData.street));
//     return street ? street.name : '';
//   };

//   const fullAddress = `${formData.houseNumber || ''} ${getStreetName()}, PUROK ${formData.purok || ''}, BRGY. GULOD NOVALICHES`.trim();
//   const labelClass = `text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`;
//   const requiredStar = <span className="text-rose-500 ml-0.5">*</span>;
//   const today = new Date().toISOString().split("T")[0];

//   return (
//     <div className="space-y-6">
//       {/* STEP INDICATOR */}
//       <div className="flex items-center justify-between mb-8 px-2">
//         {[1, 2, 3, 4].map((num) => (
//           <div key={num} className="flex items-center flex-1 last:flex-none">
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 
//               ${step >= num ? 'bg-green-600 text-white shadow-lg scale-110' : 'bg-slate-200 text-slate-400 opacity-40'}`}>
//               {num}
//             </div>
//             {num < 4 && <div className={`h-[2px] flex-1 mx-2 ${step > num ? 'bg-green-600' : 'bg-slate-200'}`} />}
//           </div>
//         ))}
//       </div>

//       {/* STEP 1: PERSONAL INFO */}
//       {step === 1 && (
//         <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//             <div className="col-span-1 space-y-1">
//               <label className={labelClass}>First Name{requiredStar}</label>
//               <input type="text" name="firstName" value={formData.firstName || ""} onChange={handleChange} className="full-input-sm" placeholder="Juan" />
//             </div>
//             <div className="col-span-1 space-y-1">
//               <label className={labelClass}>Middle Name</label>
//               <input type="text" name="middleName" value={formData.middleName || ""} onChange={handleChange} className="full-input-sm" placeholder="Santos" />
//             </div>
//             <div className="col-span-1 space-y-1">
//               <label className={labelClass}>Last Name{requiredStar}</label>
//               <input type="text" name="lastName" value={formData.lastName || ""} onChange={handleChange} className="full-input-sm" placeholder="Dela Cruz" />
//             </div>
//             <div className="col-span-1 space-y-1">
//               <label className={labelClass}>Suffix</label>
//               <select name="suffix" value={formData.suffix || ""} onChange={handleChange} className="full-input-sm">
//                 <option value="">None</option>
//                 <option value="Jr.">Jr.</option>
//                 <option value="Sr.">Sr.</option>
//                 <option value="III">III</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-3">
//             <div className="col-span-2 space-y-1">
//               <label className={labelClass}>Birthdate{requiredStar}</label>
//               <input type="date" name="birthdate" value={formData.birthdate || ""} onChange={handleChange} max={today} className="full-input-sm" />
//             </div>
//             <div className="space-y-1">
//               <label className={labelClass}>Age</label>
//               <input type="text" value={formData.age || ""} readOnly className={`full-input-sm text-center font-bold ${formData.age === 'Invalid' ? 'text-rose-500' : 'text-green-600'}`} />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <div className="space-y-1">
//               <label className={labelClass}>Gender{requiredStar}</label>
//               <select name="gender" value={formData.gender || ""} onChange={handleChange} className="full-input-sm">
//                 <option value="">Select</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             </div>
//             <div className="space-y-1">
//               <label className={labelClass}>Nationality</label>
//               <input type="text" name="nationality" value={formData.nationality || ""} onChange={handleChange} className="full-input-sm" placeholder="Filipino" />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <div className="space-y-1">
//               <label className={labelClass}>Marital Status</label>
//               <select name="maritalStatus" value={formData.maritalStatus || ""} onChange={handleChange} className="full-input-sm">
//                 <option value="">Select</option>
//                 <option value="1">Single</option>
//                 <option value="2">Married</option>
//                 <option value="3">Living-In</option>
//                 <option value="4">Widowed</option>
//                 <option value="5">Separated</option>
//                 <option value="6">Divorced</option>
//               </select>
//             </div>
//             <div className="space-y-1">
//               <label className={labelClass}>Sector{requiredStar}</label>
//               <select name="sector" value={formData.sector || ""} onChange={handleChange} className={`full-input-sm ${parseInt(formData.age) >= 60 ? 'border-amber-500 bg-amber-50/10' : ''}`}>
//                 <option value="">Select Sector</option>
//                 <option value="7">General Population</option>
//                 <option value="1">Solo Parent</option>
//                 <option value="2">PWD</option>
//                 <option value="3">Senior Citizen</option>
//                 <option value="4">LGBTQIA+</option>
//                 <option value="5">Kasambahay</option>
//                 <option value="6">OFW</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <div className="space-y-1">
//               <label className={labelClass}>Household Position{requiredStar}</label>
//               <select name="householdPosition" value={formData.householdPosition || ""} onChange={handleChange} className="full-input-sm">
//                 <option value="">Select Position</option>
//                 {householdPositions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
//               </select>
//             </div>
//             <div className="space-y-1">
//               <label className={labelClass}>Birth Registration{requiredStar}</label>
//               <select name="birthRegistration" value={formData.birthRegistration || ""} onChange={handleChange} className="full-input-sm">
//                 <option value="">Select</option>
//                 <option value="Registered">Registered</option>
//                 <option value="Not Registered">Not Registered</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
//             <input type="checkbox" id="isVoter" name="isVoter" checked={formData.isVoter || false} onChange={handleChange} className="w-5 h-5 rounded accent-green-600" />
//             <label htmlFor="isVoter" className="text-xs font-bold text-slate-600 dark:text-slate-300">I am a registered voter in this barangay</label>
//           </div>

//           <button type="button" disabled={!isStep1Valid} onClick={() => setStep(2)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest disabled:opacity-30 transition-all">
//             Continue to Address
//           </button>
//         </div>
//       )}

//      {/* STEP 2: ADDRESS & RESIDENCY */}
// {step === 2 && (
//   <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
//     <div className="grid grid-cols-2 gap-3">
//       {/* Residency Type Selection */}
//       <div className="space-y-1">
//         <label className={labelClass}>Residency Type{requiredStar}</label>
//         <select 
//           name="residencyStatus" 
//           value={formData.residencyStatus || ""} 
//           onChange={handleChange} 
//           className="full-input-sm"
//         >
//           <option value="">Select Type</option>
//           <option value="Old Resident">Old Resident</option>
//           <option value="New Resident">New Resident</option>
//         </select>
//       </div>

//       {/* Date Started - FIXED: Editable even for New Residents */}
//       <div className="space-y-1">
//         <label className={labelClass}>Date Started{requiredStar}</label>
//         <input 
//           type="date" 
//           name="residencyStartDate" 
//           value={formData.residencyStartDate || ""} 
//           onChange={handleChange} 
//           max={new Date().toISOString().split("T")[0]} 
//           className="full-input-sm focus:ring-2 focus:ring-blue-500" 
       
//         />
//         {formData.residencyStatus === "New Resident" && (
//           <p className="text-[10px] text-blue-600">Default is today, but you can change it.</p>
//         )}
//       </div>
//     </div>

//           <div className="grid grid-cols-2 gap-3">
//             <div className="space-y-1">
//               <label className={labelClass}>House No.{requiredStar}</label>
//               <input type="text" name="houseNumber" value={formData.houseNumber || ""} onChange={handleHouseNumberChange} className="full-input-sm uppercase" placeholder="123-A" />
//             </div>
//             <div className="space-y-1">
//               <label className={labelClass}>Purok{requiredStar}</label>
//               <select name="purok" value={formData.purok || ""} onChange={handleChange} className="full-input-sm">
//                 <option value="">Select Purok</option>
//                 {[1, 2, 3, 4, 5, 6, 7].map(num => <option key={num} value={num.toString()}>{num}</option>)}
//               </select>
//             </div>
//           </div>
          
//           <div className="space-y-1">
//             <label className={labelClass}>Street{requiredStar}</label>
//             <select name="street" value={formData.street || ""} disabled={!formData.purok} onChange={handleChange} className="full-input-sm disabled:opacity-30">
//               <option value="">Select Street</option>
//               {streets.map(street => (<option key={street.id} value={street.id}>{street.name}</option>))}
//             </select>
//           </div>

//           <div className="p-4 bg-green-500/5 border border-green-600/20 rounded-2xl">
//             <p className="text-xs font-black uppercase text-slate-700 dark:text-green-400">
//               {isStep2Valid ? fullAddress : "Please complete residency & address details..."}
//             </p>
//           </div>

//           <div className="flex gap-2">
//             <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest">Back</button>
//             <button type="button" disabled={!isStep2Valid} onClick={() => setStep(3)} className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-30">
//               Next: Education & Work
//             </button>
//           </div>
//         </div>
//       )}

//       {/* STEP 3: EDUCATION & EMPLOYMENT (4 FIELDS EACH) */}
//       {step === 3 && (
//         <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
//           {/* EDUCATION SECTION (4 FIELDS) */}
//           <p className="text-xs font-black text-green-600 uppercase tracking-widest">Education Information</p>
//           <div className="grid grid-cols-2 gap-3">
//             <div className="space-y-1">
//               <label className={labelClass}>Educational Status{requiredStar}</label>
//               <select name="educationalStatus" value={formData.educationalStatus || ""} onChange={handleChange} className="full-input-sm">
//                 <option value="">Select</option>
//                 <option value="Currently Studying">Currently Studying</option>
//                 <option value="Graduated">Graduated</option>
//                 <option value="Not Studying">Not Studying</option>
//                 <option value="N/A">N/A</option>
//               </select>
//             </div>
//             <div className="space-y-1">
//               <label className={labelClass}>School Type</label>
//               <select name="schoolType" value={formData.schoolType || ""} onChange={handleChange} className="full-input-sm">
//                 <option value="">Select</option>
//                 <option value="Public">Public</option>
//                 <option value="Private">Private</option>
//                 <option value="N/A">N/A</option>
//               </select>
//             </div>
//             <div className="space-y-1">
//               <label className={labelClass}>School Level</label>
//               <select name="schoolLevel" value={formData.schoolLevel || ""} onChange={handleChange} className="full-input-sm">
//                 <option value="">Select</option>
//                 <option value="Elementary">Elementary</option>
//                 <option value="Junior High School">Junior High School</option>
//                 <option value="Senior High School">Senior High School</option>
//                 <option value="College">College</option>
//                 <option value="Vocational">Vocational</option>
//                 <option value="Graduate School">Masteral / Doctorate</option>
//               </select>
//             </div>
//             <div className="space-y-1">
//               <label className={labelClass}>Highest Grade{requiredStar}</label>
//               <select name="highestGrade" value={formData.highestGrade || ""} onChange={handleChange} className="full-input-sm">
//                 <option value="">Select</option>
//                 <option value="No Formal Education">No Formal Education</option>
//                 <option value="Elementary Undergraduate">Elementary Undergraduate</option>
//                 <option value="Elementary Graduate">Elementary Graduate</option>
//                 <option value="High School Undergraduate">High School Undergraduate</option>
//                 <option value="High School Graduate">High School Graduate</option>
//                 <option value="College Undergraduate">College Undergraduate</option>
//                 <option value="College Graduate">College Graduate</option>
//                 <option value="Vocational Graduate">Vocational Graduate</option>
//                 <option value="Post Graduate">Post Graduate</option>
//               </select>
//             </div>
//           </div>

//           <div className="h-px bg-slate-200 my-2" />

//           {/* ECONOMIC ACTIVITY SECTION (4 FIELDS) */}
//           <p className="text-xs font-black text-green-600 uppercase tracking-widest">Economic Activity</p>
//           <div className="grid grid-cols-2 gap-3">
//             <div className="space-y-1">
//               <label className={labelClass}>Work Status{requiredStar}</label>
//               <select name="employmentStatus" value={formData.employmentStatus || ""} onChange={handleChange} className="full-input-sm">
//                 <option value="">Select Status</option>
//                 <option value="Permanent">Permanent</option>
//                 <option value="Contractual">Contractual</option>
//                 <option value="Shared">Shared</option>
//                 <option value="Business Owner">Business Owner</option>
//                 <option value="Self-Employed">Self-Employed</option>
//                 <option value="N/A">N/A</option>
//               </select>
//             </div>
//             <div className="space-y-1">
//               <label className={labelClass}>Occupation</label>
//               <input type="text" name="occupation" value={formData.occupation || ""} onChange={handleChange} className="full-input-sm" placeholder="e.g. Teacher, Driver" />
//             </div>
//             <div className="space-y-1">
//               <label className={labelClass}>Income Source</label>
//               <select name="incomeSource" value={formData.incomeSource || ""} onChange={handleChange} className="full-input-sm">
//                 <option value="">Select Source</option>
//                 <option value="Salary">Salary/Wages</option>
//                 <option value="Business">Business</option>
//                 <option value="Remittance">Remittance</option>
//                 <option value="Pension">Pension</option>
//                 <option value="Others">Others</option>
//                 <option value="N/A">N/A</option>
//               </select>
//             </div>
//             <div className="space-y-1">
//               <label className={labelClass}>Monthly Income{requiredStar}</label>
//               <select name="monthlyIncome" value={formData.monthlyIncome || ""} onChange={handleChange} className="full-input-sm">
//                 <option value="">Select Range</option>
//                 <option value="No Income">No Income</option>
//                 <option value="Below 5,000">Below 5,000</option>
//                 <option value="5,001-10,000">5,001-10,000</option>
//                 <option value="10,001-20,000">10,001-20,000</option>
//                 <option value="20,001-40,000">20,001-40,000</option>
//                 <option value="40,001-70,000">40,001-70,000</option>
//                 <option value="70,001-100,000">70,001-100,000</option>
//                 <option value="Above 100,000">Above 100,000</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex gap-2 pt-4">
//             <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest">Back</button>
//             <button type="button" disabled={!isStep3Valid} onClick={() => setStep(4)} className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-30">
//               Next: ID Upload
//             </button>
//           </div>
//         </div>
//       )}

//       {/* STEP 4: ID UPLOAD & CONTACT */}
//       {step === 4 && (
//         <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
//           <div className="p-4 bg-slate-900/5 dark:bg-slate-100/5 border border-slate-200 dark:border-slate-800 rounded-2xl">
//             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">ID Requirement:</p>
//             <p className="text-[11px] font-medium leading-relaxed text-slate-600 dark:text-slate-400">
//               I-upload ang Valid ID (Brgy. Gulod address), Cedula, o Utility Bill.
//             </p>
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             {['front', 'back'].map(side => (
//               <div key={side} className="space-y-1">
//                 <label className={labelClass}>Document {side}{requiredStar}</label>
//                 <div className={`relative h-28 border-2 border-dashed rounded-2xl flex items-center justify-center overflow-hidden transition-all ${!formData[side === 'front' ? 'idFront' : 'idBack'] ? 'border-rose-200 bg-rose-50/20' : 'border-green-500 bg-green-50/20'}`}>
//                   {previews[side] ? <img src={previews[side]} className="w-full h-full object-cover" alt="Preview" /> : <p className="text-[8px] font-black text-slate-400 uppercase">Upload {side}</p>}
//                   <input type="file" accept="image/*" onChange={(e) => handleFile(e, side)} className="absolute inset-0 opacity-0 cursor-pointer" />
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="space-y-1">
//             <label className={labelClass}>Contact Number{requiredStar}</label>
//             <input type="text" name="contact" value={formData.contact || ""} maxLength={11} onChange={handleChange} className="full-input-sm font-mono text-center tracking-[0.3em]" placeholder="09123456789" />
//           </div>
          
//           <button type="button" onClick={handleSubmit} disabled={!isStep4Valid} className={`w-full p-5 rounded-2xl border-2 border-dashed text-center transition-all ${isStep4Valid ? 'border-green-600 bg-green-600/10 text-green-600 active:scale-95 cursor-pointer' : 'border-slate-200 text-slate-400 opacity-40 pointer-events-none'}`}>
//               <p className="text-[10px] font-black uppercase tracking-[0.2em]">{isStep4Valid ? "🚀 I-submit ang Profile" : "Kumpletuhin ang Requirements"}</p>
//           </button>
//           <button type="button" onClick={() => setStep(3)} className="w-full py-2 text-slate-400 font-black text-[9px] uppercase">← Back</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SignupForm;