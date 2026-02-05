import React from 'react';

const Table = ({ title, headers, children }) => {
  return (
    <div className="w-full overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300"> 
      {title && (
        <div className="p-6 border-b border-gray-200 dark:border-slate-800">
          <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase">
            {title}
          </h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Ginawang solid Emerald para mas madaling ma-distinguish ang header */}
          <thead className="bg-emerald-700 dark:bg-emerald-900 border-b-2 border-emerald-800 dark:border-slate-950">
            <tr>
              {headers.map((header, index) => (
                <th 
                  key={index} 
                  className="px-6 py-5 text-left text-sm font-black text-white uppercase tracking-wider first:border-l-0 last:border-r-0"
                >
                  {/* text-sm (14px) na ang font size dito imbes na text-[10px] */}
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;