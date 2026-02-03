import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import { getInitials, getAvatarColor } from "../utils/avatar";

const Header = ({ toggleSidebar }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const datePart = currentTime.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const timePart = currentTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const dateTime = `${datePart} - ${timePart}`;

  return (
    <header className="h-[89px] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-6 sticky top-0 z-10">
      <button onClick={toggleSidebar} className="lg:hidden p-2">
        <Menu size={22} />
      </button>

      <div className="absolute left-1/2 -translate-x-1/2 text-sm text-slate-600 dark:text-slate-300">
        {dateTime}
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md bg-slate-100 dark:bg-slate-800"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {user.name}
            </p>
            <p className="text-xs text-emerald-600">
              {user.role}
            </p>
          </div>

          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-semibold ${getAvatarColor(
              user.name
            )}`}
          >
            {getInitials(user.name)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
