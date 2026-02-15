import React, { useEffect, useState } from 'react';
import Step1PersonalInfo from './Step1PersonalInfo';
import Step2Address from './Step2Address';
import Step3WorkEducation from './Step3WorkEducation';
import Step4Upload from './Step4Upload';

const SignupForm = ({ 
  formData, 
  handleChange, 
  isDarkMode, 
  handleSubmit, 
  purokList = [], 
  allStreets = [] 
}) => {
  const [step, setStep] = useState(1);
  const [previews, setPreviews] = useState({ front: null, back: null });
  const [filteredStreets, setFilteredStreets] = useState([]);

 
  useEffect(() => {
    if (formData.purok && allStreets.length > 0) {
     
      const matched = allStreets.filter(
        (s) => s.purok_id?.toString() === formData.purok.toString()
      );
      setFilteredStreets(matched);

      const isStillValid = matched.some(
        (s) => s.id.toString() === formData.street?.toString()
      );
      
      if (!isStillValid && formData.street && matched.length > 0) {
        handleChange({ target: { name: 'street', value: '' } });
      }
    } else {
      setFilteredStreets([]);
    }
  }, [formData.purok, allStreets]);

  // Handle House Number to Uppercase
  const handleHouseNumberChange = (e) => {
    const { name, value } = e.target;
    handleChange({ target: { name: name, value: value.toUpperCase() } });
  };

  // Handle File Upload & Previews
  const handleFile = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Masyadong malaki ang file! Max size ay 5MB.");
        e.target.value = "";
        return;
      }
      if (previews[side]) URL.revokeObjectURL(previews[side]);
      setPreviews(prev => ({ ...prev, [side]: URL.createObjectURL(file) }));

      handleChange({ 
        target: { 
          name: side === 'front' ? 'idFront' : 'idBack', 
          files: [file] 
        } 
      });
    }
  };

  const commonProps = { formData, handleChange, isDarkMode, setStep };

  return (
    <div className="space-y-6">
      {/* STEP INDICATOR */}
      <div className="flex items-center justify-between mb-8 px-2">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex items-center flex-1 last:flex-none">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 
              ${step >= num 
                ? 'bg-green-600 text-white shadow-lg scale-110' 
                : 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600'}`}>
              {num}
            </div>
            {num < 4 && (
              <div className={`h-[2px] flex-1 mx-2 transition-colors duration-500 ${step > num ? 'bg-green-600' : 'bg-slate-200 dark:bg-slate-800'}`} />
            )}
          </div>
        ))}
      </div>

      {/* FORM STEPS CONTENT */}
      <div className="min-h-[300px]">
        {step === 1 && <Step1PersonalInfo {...commonProps} />}
        
        {step === 2 && (
          <Step2Address 
            {...commonProps} 
            streets={filteredStreets} 
            purokList={purokList} 
            handleHouseNumberChange={handleHouseNumberChange} 
          />
        )}
        
        {step === 3 && <Step3WorkEducation {...commonProps} />}
        
        {step === 4 && (
          <Step4Upload 
            {...commonProps} 
            previews={previews} 
            handleFile={handleFile} 
            handleSubmit={handleSubmit} 
          />
        )}
      </div>
    </div>
  );
};

export default SignupForm;