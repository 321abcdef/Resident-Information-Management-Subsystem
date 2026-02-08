const StatusBadge = ({ status }) => {
  const config = {
    'Pending': "bg-orange-100 text-orange-600 border-orange-200",
    'For Verification': "bg-blue-100 text-blue-600 border-blue-200", // New status
    'Verified': "bg-emerald-100 text-emerald-600 border-emerald-200",
    'Rejected': "bg-red-100 text-red-600 border-red-200",
  };

  return (
    <span className={`px-2 py-1 text-[10px] font-bold uppercase border rounded-full ${config[status] || "bg-slate-100 text-slate-500"}`}>
      {status}
    </span>
  );
};
export default StatusBadge;