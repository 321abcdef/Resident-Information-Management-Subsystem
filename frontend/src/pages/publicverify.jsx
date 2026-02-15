import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, XCircle, Loader2, MapPin, Calendar, Award, User, Phone, Info, RotateCcw } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const PublicVerify = () => {
    const { id } = useParams(); 
    const [resident, setResident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);

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
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
            <p className="font-bold text-slate-500 uppercase tracking-widest text-sm">Validating Credentials...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-200 flex flex-col items-center justify-center p-4 font-sans">
            
            {/* INSTRUCTION */}
            {!error && (
                <button 
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="mb-6 flex items-center gap-2 bg-white px-6 py-2 rounded-full shadow-sm text-blue-600 font-bold text-xs uppercase tracking-widest hover:bg-blue-50 transition-colors"
                >
                    <RotateCcw size={14} /> {isFlipped ? "View Front Side" : "View Back Side"}
                </button>
            )}

            <div className="relative w-full max-w-md h-[550px] [perspective:1000px]">
                <div className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                    
                    {/* FRONT SIDE */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                        <div className="h-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-300 flex flex-col">
                            {/* Header */}
                            <div className={`p-6 text-center border-b-4 ${error ? 'border-rose-500 bg-rose-50' : 'border-blue-600 bg-blue-50'}`}>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Republic of the Philippines</p>
                                <p className="text-xs font-black text-slate-800 uppercase leading-tight">City of Quezon • District V</p>
                                <h1 className="text-lg font-black text-blue-900 uppercase mt-1 tracking-tight">Barangay Gulod Novaliches</h1>
                            </div>

                            <div className="flex-1 p-8 relative">
                                {error ? (
                                    <div className="py-12 text-center space-y-4">
                                        <XCircle className="mx-auto text-rose-500" size={64} />
                                        <h2 className="text-xl font-black text-rose-600 uppercase tracking-tighter">Identity Not Found</h2>
                                        <p className="text-slate-400 text-sm font-medium">{error}</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div className="relative">
                                                <div className="w-28 h-28 bg-slate-100 rounded-2xl border-2 border-slate-200 overflow-hidden shadow-inner flex items-center justify-center">
                                                    {resident.photo_url ? <img src={resident.photo_url} alt="Resident" className="w-full h-full object-cover" /> : <User size={48} className="text-slate-300" />}
                                                </div>
                                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full border-4 border-white shadow-lg">
                                                    <ShieldCheck size={20} />
                                                </div>
                                            </div>
                                            <div className="w-20 h-20 opacity-10 grayscale"><img src="/barangay-seal.png" alt="Seal" /></div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Resident Name</p>
                                                <h2 className="text-2xl font-black text-slate-900 uppercase leading-none">{resident.full_name}</h2>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                                                    <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">Resident ID</p>
                                                    <p className="font-mono text-xs font-black text-slate-700">{resident.id}</p>
                                                </div>
                                                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                                                    <p className="text-[8px] font-bold text-emerald-600 uppercase mb-1">Status</p>
                                                    <p className="text-[10px] font-black text-emerald-700 uppercase">VERIFIED</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="h-2 flex"><div className="flex-1 bg-blue-600"></div><div className="flex-1 bg-red-600"></div><div className="flex-1 bg-yellow-400"></div></div>
                        </div>
                    </div>

                    {/* BACK SIDE */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <div className="h-full bg-slate-50 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-300 flex flex-col">
                            <div className="p-8 space-y-6 flex-1">
                                {/* Terms */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-blue-900 border-b border-slate-200 pb-2">
                                        <Info size={16} />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Terms and Conditions</p>
                                    </div>
                                    <p className="text-[9px] leading-relaxed text-slate-500 font-medium">
                                        This card is the property of <span className="font-bold">Barangay Gulod Novaliches</span>. It is non-transferable and must be presented upon request for official barangay transactions. If found, please return to the Barangay Hall.
                                    </p>
                                </div>

                                {/* Emergency Contact */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-blue-900 border-b border-slate-200 pb-2">
                                        <Phone size={16} />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Emergency Hotline</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="p-2 bg-white rounded-lg border border-slate-200">
                                            <p className="text-[8px] text-slate-400 font-bold uppercase">Barangay Hall</p>
                                            <p className="text-[10px] font-black text-slate-700">8-123-4567</p>
                                        </div>
                                        <div className="p-2 bg-white rounded-lg border border-slate-200">
                                            <p className="text-[8px] text-slate-400 font-bold uppercase">Police/Fire</p>
                                            <p className="text-[10px] font-black text-slate-700">911</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Signature Section */}
                                <div className="pt-8 text-center flex flex-col items-center">
                                    <div className="w-32 h-12 border-b-2 border-slate-900 flex items-end justify-center">
                                        {/* Signature Placeholder */}
                                        <p className="font-serif italic text-xl text-slate-400 opacity-50">Signature</p>
                                    </div>
                                    <p className="mt-2 text-[10px] font-black text-slate-900 uppercase">Hon. Alejandro S. Dela Cruz</p>
                                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Punong Barangay</p>
                                </div>
                            </div>

                            {/* Verification QR Placeholder */}
                            <div className="bg-white p-6 flex flex-col items-center justify-center border-t border-slate-200">
                                <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 mb-2">
                                    <div className="w-12 h-12 border-4 border-slate-300 opacity-30"></div>
                                </div>
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-center">System-Generated QR Code<br/>Scan to Verify Authenticity</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PublicVerify;