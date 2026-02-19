import React from 'react';

const Step4Upload = ({ formData, handleChange, isDarkMode, setStep, previews, handleFile, handleSubmit }) => {
    const labelClass = `text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`;
    
    // Step validation
    const isReady = formData.idFront && formData.idBack && formData.contact?.length === 11;

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            <div className="grid grid-cols-2 gap-3">
                {['idFront', 'idBack'].map((fieldName) => {
                    const side = fieldName === 'idFront' ? 'front' : 'back';
                    return (
                        <div key={fieldName} className="space-y-1">
                            <label className={labelClass}>{side.toUpperCase()} ID Image *</label>
                            <div className={`relative h-28 border-2 border-dashed rounded-2xl flex items-center justify-center overflow-hidden transition-all 
                                ${!formData[fieldName] ? 'border-rose-200 bg-rose-50/10' : 'border-green-500 bg-green-50/10'}`}>
                                
                                {previews[side] ? (
                                    <img src={previews[side]} className="w-full h-full object-cover" alt="Preview" />
                                ) : (
                                    <div className="text-center">
                                        <p className="text-[18px] mb-1">📸</p>
                                        <p className="text-[8px] font-black text-slate-400 uppercase">Click to upload</p>
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
                    className="w-full p-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-transparent text-center font-mono tracking-widest focus:border-green-500 outline-none transition-all" 
                    placeholder="09XXXXXXXXX" 
                />
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