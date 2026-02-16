import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const ModalWrapper = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.6)] rounded-[2rem] border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-200 flex flex-col">
        
        {/* Header: padding  (p-5) */}
        <div className="flex items-center justify-between p-5 md:px-8 border-b dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex-1">
            {title}
          </div>
          <button 
            onClick={onClose} 
            className="ml-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all active:scale-90"
          >
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;