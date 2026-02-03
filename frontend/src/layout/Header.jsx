import React, { useState, useEffect } from 'react';
import { Moon, Sun, Bell, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = ({ toggleSidebar, userName = 'Dexter Mark B. Binongcal' }) => {
  const { isDark, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Time and Date formatting
  const timeStr = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });

  const dateStr = currentTime.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <header className="h-[89px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10 w-full shrink-0 transition-all duration-300">
      <div className="flex items-center gap-6">
        {/* Mobile Menu Toggle */}
        <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
          <Menu size={24} />
        </button>

        {/* Status & Clock Section */}
        <div className="hidden sm:flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 px-4 py-2 rounded-xl">
          <div className="flex items-center gap-2 pr-3 border-r border-slate-200 dark:border-slate-700">
            {/* Live Indicator Dot */}
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-xl font-semibold text-slate-700 dark:text-slate-200 font-mono tracking-tight">{timeStr}</span>
          </div>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">{dateStr}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pr-4 border-r border-slate-100 dark:border-slate-800">
          
          {/* Custom Pill-Shaped Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="relative flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-full w-14 h-8 transition-all duration-500 group overflow-hidden border border-slate-200 dark:border-slate-700 active:scale-95"
          >
            {/* Background Icons (Visible on hover) */}
            <div className="flex justify-between w-full px-1.5 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
              <Moon size={10} className="text-slate-500" />
              <Sun size={10} className="text-yellow-500" />
            </div>

            {/* Sliding Indicator */}
            <div className={`absolute w-6 h-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out flex items-center justify-center
              ${isDark 
                ? 'translate-x-6 bg-slate-900 text-yellow-400' 
                : 'translate-x-0 bg-white text-slate-400'
              }`}
            >
              {isDark ? (
                <Sun size={12} fill="currentColor" className="animate-in spin-in-90 duration-500" />
              ) : (
                <Moon size={12} fill="currentColor" className="animate-in zoom-in duration-500" />
              )}
            </div>
          </button>
          
          {/* Notification Button */}
          {/* <button className="text-slate-400 dark:text-slate-500 hover:text-emerald-500 dark:hover:text-emerald-400 p-2 rounded-lg transition-colors relative group">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 group-hover:scale-125 transition-transform" />
          </button> */}
        </div>
        
        {/* User Profile Section */}
        <div className="flex items-center gap-3 pl-2">
          <div className="hidden md:block text-right">
            <p className="text-xs font-black text-slate-900 dark:text-white leading-none uppercase tracking-tight">{userName}</p>
            <p className="text-[9px] font-bold text-emerald-600 dark:text-emerald-500 mt-1 uppercase tracking-[2px]">Brgy. Staff</p>
          </div>
          <div className="relative group cursor-pointer">
            <img 
              src={`https://ui-avatars.com/api/?name=${userName}&background=10b981&color=fff&bold=true`} 
              alt="Profile" 
              className="w-10 h-10 rounded-xl border-2 border-white dark:border-slate-800 shadow-sm transition-transform group-hover:scale-105" 
            />
            {/* Online status indicator div has been removed from here */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;