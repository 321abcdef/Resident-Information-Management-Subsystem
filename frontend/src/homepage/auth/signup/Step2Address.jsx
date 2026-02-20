import React from 'react';

const Step2Address = ({ 
  formData, 
  handleChange, 
  isDarkMode, 
  setStep, 
  streets, 
  purokList, 
  handleHouseNumberChange 
}) => {
  const labelClass = `text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`;
  const requiredStar = <span className="text-rose-500 ml-0.5">*</span>;

 
  const getStreetName = () => {
    if (!formData.street || !streets.length) return '';
    const street = streets.find(s => s.id.toString() === formData.street.toString());
    return street ? street.name : '';
  };


  const getPurokDisplay = () => {
    if (!formData.purok || !purokList?.length) return '';
    const purok = purokList.find(p => p.id.toString() === formData.purok.toString());
    return purok ? (purok.number || purok.name) : formData.purok;
  };

  const fullAddress = `${formData.houseNumber || ''} ${getStreetName()}, PUROK ${getPurokDisplay()}, BRGY. GULOD NOVALICHES`.trim();

  const isStep2Valid = 
    formData.houseNumber?.trim() && 
    formData.purok && 
    formData.street &&
    formData.residencyStatus &&
    formData.residencyStartDate;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
      {/* Residency Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className={labelClass}>Residency Type{requiredStar}</label>
          <select name="residencyStatus" value={formData.residencyStatus || ""} onChange={handleChange} className="full-input-sm">
            <option value="">Select Type</option>
            <option value="Old Resident">Old Resident</option>
            <option value="New Resident">New Resident</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Date Started{requiredStar}</label>
          <input 
            type="date" 
            name="residencyStartDate" 
            value={formData.residencyStartDate || ""} 
            onChange={handleChange} 
            max={new Date().toISOString().split("T")[0]} 
            className="full-input-sm focus:ring-2 focus:ring-blue-500" 
          />
          {formData.residencyStatus === "New Resident"}
        </div>
      </div>

      {/* House Number & Purok Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className={labelClass}>House No.{requiredStar}</label>
          <input 
            type="text" 
            name="houseNumber" 
            value={formData.houseNumber || ""} 
            onChange={handleHouseNumberChange} 
            className="full-input-sm" 
            placeholder="123-A" 
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Purok{requiredStar}</label>
          <select name="purok" value={formData.purok || ""} onChange={handleChange} className="full-input-sm">
            <option value="">Select Purok</option>
            {/* DYNAMIC PUROK LOOP */}
            {purokList && purokList.map(purok => (
              <option key={purok.id} value={purok.id.toString()}>
                {purok.name || `Purok ${purok.number}`}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Street Selection */}
      <div className="space-y-1">
        <label className={labelClass}>Street{requiredStar}</label>
        <select 
          name="street" 
          value={formData.street || ""} 
          disabled={!formData.purok} 
          onChange={handleChange} 
          className="full-input-sm disabled:opacity-30"
        >
          <option value="">Select Street</option>
          {/* FILTERED STREETS */}
          {streets.map(street => (
            <option key={street.id} value={street.id.toString()}>
              {street.name}
            </option>
          ))}
        </select>
      </div>

      {/* Live Preview of Address */}
      <div className="p-4 bg-green-500/5 border border-green-600/20 rounded-2xl">
        <p className="text-xs font-black uppercase text-slate-700 dark:text-green-400">
          {isStep2Valid ? fullAddress : "Please complete residency & address details..."}
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button 
          type="button" 
          onClick={() => setStep(1)} 
          className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border transition-colors ${
            isDarkMode
              ? "bg-slate-900 border-white/10 text-slate-200 hover:bg-slate-800"
              : "bg-slate-100 border-black/10 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Back
        </button>
        <button 
          type="button" 
          disabled={!isStep2Valid} 
          onClick={() => setStep(3)} 
          className="sm:flex-[2] py-4 bg-emerald-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-30 transition-colors hover:bg-emerald-800"
        >
          Next: Education & Work
        </button>
      </div>
    </div>
  );
};

export default Step2Address;
