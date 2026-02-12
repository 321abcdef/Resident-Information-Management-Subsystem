import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, XCircle, Loader2, Award } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const PublicVerify = () => {
    const { id } = useParams(); 
    const [resident, setResident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVerification = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/residents/verify-public/${id}`);
                setResident(response.data.data);
            } catch (err) {
                setError(err.response?.data?.message || "Invalid Barangay ID");
            } finally {
                setLoading(false);
            }
        };
        fetchVerification();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
            <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Verifying Identity...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border-4 border-white relative">
                
                {/* Header Section */}
                <div className={`p-8 text-center ${error ? 'bg-rose-600' : 'bg-emerald-600'}`}>
                    <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4 backdrop-blur-md">
                        {error ? <XCircle className="text-white" size={40} /> : <ShieldCheck className="text-white" size={40} />}
                    </div>
                    <h1 className="text-white font-black text-xl uppercase tracking-tighter">
                        {error ? "Verification Failed" : "Official Resident"}
                    </h1>
                </div>

                {/* Body Section */}
                <div className="p-8 pt-12 -mt-8 bg-white rounded-t-[2.5rem] relative z-10 text-center">
                    {error ? (
                        <div className="space-y-4">
                            <p className="text-slate-500 font-medium italic">{error}</p>
                            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
                                <p className="text-[10px] text-rose-600 font-black uppercase">Unauthorized or Revoked ID</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Full Legal Name</p>
                                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">{resident.full_name}</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Barangay ID</p>
                                    <p className="font-mono font-bold text-slate-900">{resident.id}</p>
                                </div>
                                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                    <p className="text-[9px] font-black text-emerald-600 uppercase mb-1">Status</p>
                                    <p className="font-black text-emerald-700 uppercase italic">Verified</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100">
                                <div className="flex items-center justify-center gap-2 text-emerald-600 mb-2">
                                    <Award size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Official Registration</span>
                                </div>
                                <p className="text-[9px] text-slate-400 font-bold uppercase">Registered since {resident.member_since}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Logo/Design */}
                <div className="bg-slate-900 p-6 text-center">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">Barangay Gulod Novaliches • Digital Verification System</p>
                </div>
            </div>
        </div>
    );
};

export default PublicVerify;