import React from "react";

const Step4Upload = ({ formData, handleChange, isDarkMode, setStep, previews, handleFile, onReviewSubmit, loading = false }) => {
  const labelClass = `text-[10px] font-black uppercase tracking-wider ${isDarkMode ? "text-gray-400" : "text-gray-500"}`;
  const isReady = formData.idFront && formData.idBack && formData.contact?.length === 11 && !loading;

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {["idFront", "idBack"].map((fieldName) => {
          const side = fieldName === "idFront" ? "front" : "back";
          return (
            <div key={fieldName} className="space-y-1">
              <label className={labelClass}>{side.toUpperCase()} ID Image *</label>
              <div
                className={`relative h-28 border-2 border-dashed rounded-2xl flex items-center justify-center overflow-hidden transition-all ${
                  !formData[fieldName] ? "border-rose-200 bg-rose-50/10" : "border-emerald-500 bg-emerald-50/10"
                }`}
              >
                {previews[side] ? (
                  <img src={previews[side]} className="w-full h-full object-cover" alt={`${side} id preview`} />
                ) : (
                  <div className="text-center px-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click to upload</p>
                  </div>
                )}

                <input
                  type="file"
                  name={fieldName}
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={(e) => {
                    handleFile(e, side);
                    handleChange(e);
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>

            <button 
                type="button" 
                onClick={handleSubmit} 
                disabled={!isReady}
                className={`w-full p-5 rounded-2xl font-black uppercase tracking-widest transition-all 
                    ${isReady ? 'bg-green-600 text-white shadow-xl scale-[1.02] active:scale-95' : 'bg-slate-100 text-slate-400 opacity-50 cursor-not-allowed'}`}
            >
                {isReady ? "🚀 I-submit Registration" : "Complete the form"}
            </button>
            
            <button type="button" onClick={() => setStep(3)} className="w-full py-2 text-black font-black text-[10px] text-xs uppercase">BACK</button>
        </div>
    );
};

export default Step4Upload;
