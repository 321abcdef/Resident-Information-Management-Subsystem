import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = ({ toggleSidebar, userName = 'Dexter Mark B. Binongcal' }) => {
  const { isDark, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Date: February 3, 2026
  const dateStr = currentTime.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Time: 7:14pm
  const timeStr = currentTime
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .replace(' AM', 'am')
    .replace(' PM', 'pm');

  // Join with -
  const dateTimeStr = `${dateStr} - ${timeStr}`;

  return (
    <header className="relative h-[72px] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-6 sticky top-0 z-10">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* CENTER Date & Time */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {dateTimeStr}
        </span>
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-105 transition"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              {userName}
            </p>
            <p className="text-[10px] text-emerald-600 uppercase">
              Brgy. Staff
            </p>
          </div>

          <img
            src={`https://ui-avatars.com/api/?name=${userName}&background=10b981&color=fff&bold=true`}
            alt="Profile"
            className="w-9 h-9 rounded-lg"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
