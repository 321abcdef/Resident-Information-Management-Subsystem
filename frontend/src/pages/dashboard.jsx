import React, { useState, useEffect } from 'react';
import StatsOverview from '../components/dashboard/statsoverview';
import SectorDistribution from '../components/dashboard/SectorDistribution';
import PurokDistribution from '../components/dashboard/PurokDistribution';
import RecentRegistration from '../components/dashboard/recentregistration';
import Pagination from '../components/common/pagination'; 
import { getDashboardData } from '../services/dashboard';

const Dashboard = () => {
  const [data, setData] = useState({ stats: null, registrations: [] });
  const [loading, setLoading] = useState(true);
  
  // Dashboard Table Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  useEffect(() => {
    getDashboardData().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="p-8 text-emerald-600 dark:text-emerald-400 font-black uppercase text-xs tracking-widest animate-pulse">
      Loading System Data...
    </div>
  );

  // Pagination Logic for Dashboard Table
  const totalPages = Math.ceil(data.registrations.length / itemsPerPage);
  const currentRegs = data.registrations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 transition-colors">
      <h1 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
        Dashboard Overview
      </h1>
      
      <StatsOverview stats={data.stats} />
      
      {/* Charts Section */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectorDistribution />
        <PurokDistribution />
      </div> */}

      {/* Recent Registrations Table Section */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm transition-colors">
        <RecentRegistration registrations={currentRegs} />
        
        {/* Sharp Pagination remains at the bottom of the card */}
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={data.registrations.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;