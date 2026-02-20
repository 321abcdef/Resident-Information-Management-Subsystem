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

      <div className="space-y-1">
        <label className={labelClass}>Contact Number *</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          maxLength={11}
          className={`w-full p-4 rounded-xl border-2 bg-transparent text-center font-mono tracking-widest outline-none transition-colors ${
            isDarkMode
              ? "border-slate-700 text-slate-100 focus:border-emerald-500"
              : "border-slate-200 text-slate-900 focus:border-emerald-500"
          }`}
          placeholder="09XXXXXXXXX"
        />
      </div>

      <button
        type="button"
        onClick={onReviewSubmit}
        disabled={!isReady}
        className={`w-full p-5 rounded-2xl font-black uppercase tracking-widest transition-all ${
          isReady
            ? "bg-emerald-700 text-white shadow-xl hover:bg-emerald-800 active:scale-95"
            : isDarkMode
              ? "bg-slate-800 text-slate-500 opacity-70 cursor-not-allowed"
              : "bg-slate-100 text-slate-400 opacity-60 cursor-not-allowed"
        }`}
      >
        {loading ? "Submitting..." : isReady ? "Review Information" : "Complete Required Fields"}
      </button>

      <button
        type="button"
        onClick={() => setStep(3)}
        className={`w-full py-2 font-black text-[9px] uppercase tracking-wider transition-colors ${
          isDarkMode ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"
        }`}
      >
        Back to Previous Step
      </button>
    </div>
  );
};

export default Step4Upload;
