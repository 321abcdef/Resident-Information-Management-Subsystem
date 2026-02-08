import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const ModalWrapper = ({ isOpen, onClose, title, children }) => {
  // Listen for Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Lock scroll
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset'; // Unlock scroll
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop - High contrast dark blur */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Content - Added rounded corners and tighter animations */}
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)] rounded-[2.5rem] border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-200">
        
        {/* Header - Fixed to top */}
        <div className="flex items-center justify-between p-6 border-b dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex-1">
            {title}
          </div>
          <button 
            onClick={onClose} 
            className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors"
            title="Press ESC to close"
          >
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-100px)] custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;