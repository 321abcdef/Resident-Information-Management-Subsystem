import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BarChart3, CreditCard, 
  HelpCircle, Settings, LogOut, X 
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: 'Dashboard', icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
    { id: 'Residents', icon: Users, label: 'Residents', to: '/residents' },
    { id: 'Analytics', icon: BarChart3, label: 'Analytics', to: '/analytics' },
    { id: 'Verification', icon: CreditCard, label: 'ID Verification', to: '/verification' },
  ];

  const bottomItems = [
    { id: 'Support', icon: HelpCircle, label: 'Help/Support', to: '/support' },
    // { id: 'Settings', icon: Settings, label: 'Settings', to: '/settings' },
  ];

  const linkClass = ({ isActive }) => `
    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
    ${isActive 
      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
      : 'text-slate-500 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400'}
  `;

  return (
    <aside className={`
      fixed top-0 left-0 z-40 h-screen w-[280px] bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col transition-all duration-300
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
    `}>
      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
            <span className="font-black text-xl">SB</span>
          </div>
          <div className="leading-none">
            <p className="text-sm font-black text-slate-900 dark:text-white tracking-tighter">BARANGAY SAN BARTOLOME</p>
            {/* <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">Barangay System</p> */}
          </div>
        </div>
        <button onClick={toggleSidebar} className="lg:hidden p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 px-4 mb-4 uppercase tracking-[3px]">Menu</p>
        {menuItems.map(item => (
  <NavLink
    key={item.id}
    to={item.to}
    onClick={() => window.innerWidth < 1024 && toggleSidebar()}
    className={linkClass}
  >
    {({ isActive }) => (
      <>
        <item.icon
          size={20}
          strokeWidth={isActive ? 2.5 : 2}
        />
        <span className="text-sm font-bold tracking-tight">
          {item.label}
        </span>
      </>
    )}
  </NavLink>
))}

      </nav>

      {/* Footer Nav */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-1 bg-slate-50/50 dark:bg-slate-900/50">
        {bottomItems.map(item => (
          <NavLink key={item.id} to={item.to} onClick={() => window.innerWidth < 1024 && toggleSidebar()} className={linkClass}>
            <item.icon size={20} />
            <span className="text-sm font-bold tracking-tight">{item.label}</span>
          </NavLink>
        ))}
        
        {/* <button 
          onClick={() => confirm("Are you sure you want to logout?")} 
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200 mt-2 group"
        >
          <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-sm font-black uppercase tracking-widest">Logout Account</span>
        </button> */}
      </div>
    </aside>
  );
};

export default Sidebar;