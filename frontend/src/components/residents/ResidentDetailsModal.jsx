import React, { useState, useEffect } from 'react';
import { MapPin, Briefcase, IdCard, Navigation, CreditCard, GraduationCap, Calendar } from 'lucide-react';
import { getInitials, getAvatarColor } from '../../utils/avatar';
import ModalWrapper from '../common/ModalWrapper';
import { API_BASE_URL } from '../../config/api';
import axios from 'axios';

const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    return dateString.split('T')[0];
};

const ResidentDetailsModal = ({ isOpen, onClose, resident, onSave, mode }) => {
    const [formData, setFormData] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('basic'); 
    
    const today = new Date().toISOString().split("T")[0];

    const [refs, setRefs] = useState({ 
        puroks: [], streets: [], marital_statuses: [], sectors: [],
        genders: [], birth_registrations: [], residency_statuses: [],
        educational_statuses: [], school_types: [], school_levels: [],
        employment_statuses: [], // Ibinalik ito
        monthly_income: [], income_sources: [], nationalities: [],
        voter_options: ['Yes', 'No'],
        household_positions: [
            'Head of Family', 'Spouse', 'Son', 'Daughter', 'Relative', 'Househelp', 'Others'
        ],
        attainment_options: [
            'No Schooling', 'Elementary Level', 'Elementary Graduate', 
            'High School Level', 'High School Graduate', 'Senior High Level', 
            'Senior High Graduate', 'Vocational Course', 'College Level', 
            'College Graduate', 'Post-Graduate Study', 'N/A'
        ]
    });

    useEffect(() => {
        if (isOpen && resident) {
            fetchReferences();
            setFormData({
                ...resident,
                residency_start_date: formatDateForInput(resident.residency_start_date),
                birthdate: formatDateForInput(resident.birthdate),
                age: calculateAge(resident.birthdate), 
                is_voter: (resident.is_voter == 1 || resident.is_voter === 'Yes') ? 'Yes' : 'No'
            });
            setIsEdit(mode === 'edit');
            setActiveTab('basic');
        }
    }, [isOpen, resident, mode]);

    const fetchReferences = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/reference-data`);
            if (res.data) setRefs(prev => ({ ...prev, ...res.data }));
        } catch (err) {
            console.error("Error fetching reference data:", err);
        }
    };

    const calculateAge = (bday) => {
        if (!bday) return 'N/A';
        const birthDate = new Date(bday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'birthdate') {
            setFormData(prev => ({ ...prev, [name]: value, age: calculateAge(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = async (e) => {
        if(e) e.preventDefault();
        setLoading(true);
        const payload = { ...formData, is_voter: formData.is_voter === 'Yes' ? 1 : 0 };
        const success = await onSave(payload);
        setLoading(false);
        if (success) setIsEdit(false);
    };

    const filteredStreets = (refs.streets || []).filter(s => 
        String(s.purok_id) === String(formData.temp_purok_id)
    );

    // Dynamic Address Builder
    const getFullHardcodedAddress = () => {
        const house = formData.temp_house_number || '';
        const streetObj = refs.streets.find(s => String(s.id) === String(formData.temp_street_id));
        const streetName = streetObj ? streetObj.name : '';
        const purokObj = refs.puroks.find(p => String(p.id) === String(formData.temp_purok_id));
        const purokName = purokObj ? `Purok ${purokObj.number || purokObj.name}` : '';
        
        const parts = [house, streetName, purokName, "Brgy. Gulod, Novaliches, Quezon City"];
        return parts.filter(p => p && p.trim() !== "").join(" ");
    };

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all border-b-4 ${
                activeTab === id 
                ? 'border-emerald-500 text-emerald-600 bg-emerald-50/50' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
        >
            <Icon size={16} /> {label}
        </button>
    );

    return (
        <ModalWrapper 
            isOpen={isOpen} 
            onClose={onClose} 
            title={
                <div className="flex items-center justify-between w-full pr-4 md:pr-8">
                    <div className="flex items-center gap-3">
                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center font-black text-lg border-4 border-white dark:border-slate-800 shadow-lg ${getAvatarColor(resident?.name || '')}`}>
                            {getInitials(resident?.name || '')}
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">
                                {isEdit ? 'Edit Resident' : 'Resident Profile'}
                            </h2>
                            <p className="text-[11px] font-bold text-emerald-600 uppercase mt-1 tracking-widest bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md inline-block">
                                #{resident?.tracking_number || resident?.id}
                            </p>
                        </div>
                    </div>
                    <button type="button" onClick={() => setIsEdit(!isEdit)} className={`px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95 ${isEdit ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                        {isEdit ? 'Cancel' : 'Edit Info'}
                    </button>
                </div>
            } 
            maxWidth="max-w-4xl"
        >
            <div className="bg-white dark:bg-slate-900">
                <div className="flex border-b border-slate-100 dark:border-slate-800">
                    <TabButton id="basic" label="Identity" icon={IdCard} />
                    <TabButton id="address" label="Address" icon={MapPin} />
                    <TabButton id="socio" label="Socio-Eco" icon={Briefcase} />
                </div>

                <div className="p-6 md:p-8">
                    {/* IDENTITY TAB */}
                    {activeTab === 'basic' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {isEdit ? (
                                    <>
                                        <DetailField label="First Name" name="first_name" val={formData.first_name} isEdit={true} onChange={handleChange} />
                                        <DetailField label="Middle Name" name="middle_name" val={formData.middle_name} isEdit={true} onChange={handleChange} />
                                        <DetailField label="Last Name" name="last_name" val={formData.last_name} isEdit={true} onChange={handleChange} />
                                        <DetailField label="Suffix" name="suffix" val={formData.suffix} isEdit={true} onChange={handleChange} />
                                    </>
                                ) : (
                                    <div className="md:col-span-4 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border-2 border-slate-100 dark:border-slate-700">
                                        <DetailField label="Registered Full Name" val={formData.name} isEdit={false} className="text-xl" />
                                    </div>
                                )}
                                <DetailField label="Household Position" name="household_position" val={formData.household_position} isEdit={isEdit} onChange={handleChange} type="select" options={refs.household_positions} />
                                <DetailField label="Nationality" name="nationality_id" val={formData.nationality_id} isEdit={isEdit} onChange={handleChange} type="select" options={refs.nationalities} />
                                <DetailField label="Birthdate" name="birthdate" val={formData.birthdate} isEdit={isEdit} onChange={handleChange} type="date" max={today} />
                                <div className="flex flex-col gap-2"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Calculated Age</p><p className="text-base font-bold text-blue-600">{formData.age || '---'} yrs old</p></div>
                                <DetailField label="Gender" name="gender" val={formData.gender} isEdit={isEdit} onChange={handleChange} type="select" options={refs.genders} />
                                <DetailField label="Civil Status" name="marital_status_id" val={formData.marital_status_id} isEdit={isEdit} onChange={handleChange} type="select" options={refs.marital_statuses} />
                                <DetailField label="Sector" name="sector_id" val={formData.sector_id} isEdit={isEdit} onChange={handleChange} type="select" options={refs.sectors} />
                                <DetailField label="Voter Status" name="is_voter" val={formData.is_voter} isEdit={isEdit} onChange={handleChange} type="select" options={refs.voter_options} />
                                <DetailField label="Birth Reg." name="birth_registration" val={formData.birth_registration} isEdit={isEdit} onChange={handleChange} type="select" options={refs.birth_registrations} />
                                <DetailField label="Contact #" name="contact_number" val={formData.contact_number} isEdit={isEdit} onChange={handleChange} />
                            </div>
                        </div>
                    )}
                    
                    {/* ADDRESS TAB */}
                    {activeTab === 'address' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-slate-100 dark:border-slate-700">
                                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase mb-6 flex items-center gap-2">
                                    <Navigation size={16} className="text-blue-500" /> Location Information
                                </h4>
                                {isEdit ? (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="col-span-full mb-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-[10px] text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wider">
                                            Note: Changing address will re-group household data.
                                        </div>
                                        <DetailField label="House #" name="temp_house_number" val={formData.temp_house_number} isEdit={true} onChange={handleChange} />
                                        <DetailField label="Purok" name="temp_purok_id" val={formData.temp_purok_id} isEdit={true} onChange={handleChange} type="select" options={refs.puroks} />
                                        <DetailField label="Street / Sitio" name="temp_street_id" val={formData.temp_street_id} isEdit={true} onChange={handleChange} type="select" options={filteredStreets} />
                                    </div>
                                ) : (
                                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                        <DetailField label="Registered Full Address" val={getFullHardcodedAddress()} isEdit={false} className="text-xl" />
                                    </div>
                                )}
                            </div>
                            <div className="p-6 bg-emerald-50/30 dark:bg-emerald-900/10 rounded-3xl border-2 border-emerald-100 dark:border-emerald-900/30">
                                <h4 className="text-xs font-black text-emerald-600 uppercase mb-6 flex items-center gap-2"><Calendar size={16}/> Residency Details</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <DetailField label="Resident Since" name="residency_start_date" val={formData.residency_start_date} isEdit={isEdit} onChange={handleChange} type="date" />
                                    <div className="flex items-center"><p className="text-[11px] text-slate-400 italic font-medium">This date is used for certification duration.</p></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- TAB 3: SOCIO-ECO --- */}
{activeTab === 'socio' && (
    <div className="space-y-6 animate-in fade-in duration-300">
        <div className="p-6 bg-white dark:bg-slate-800/50 rounded-3xl border-2 border-slate-100 dark:border-slate-700">
            <h4 className="text-xs font-black text-blue-600 uppercase mb-6 flex items-center gap-2">
                <Briefcase size={16}/> Employment & Income
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <DetailField 
                    label="Employment Status" 
                    name="employment_status" 
                    val={formData.employment_status || formData.employmentStatus} 
                    isEdit={isEdit} 
                    onChange={handleChange} 
                    type="select" 
                    options={refs.employment_statuses} 
                />
                
                <DetailField 
                    label="Occupation" 
                    name="occupation" 
                    val={formData.occupation} 
                    isEdit={isEdit} 
                    onChange={handleChange} 
                />
                
                <DetailField 
                    label="Income Source" 
                    name="income_source" 
                    val={formData.income_source || formData.incomeSource} 
                    isEdit={isEdit} 
                    onChange={handleChange} 
                    type="select" 
                    options={refs.income_sources} 
                />
                
                <DetailField 
                    label="Monthly Income" 
                    name="monthly_income" 
                    val={formData.monthly_income} 
                    isEdit={isEdit} 
                    onChange={handleChange} 
                    type="select" 
                    options={refs.monthly_income} 
                />
            </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border-2 border-slate-100 dark:border-slate-700">
            <h4 className="text-xs font-black text-violet-600 uppercase mb-6 flex items-center gap-2">
                <GraduationCap size={16}/> Educational Profile
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <DetailField label="Educ. Status" name="educational_status" val={formData.educational_status || formData.educationalStatus} isEdit={isEdit} onChange={handleChange} type="select" options={refs.educational_statuses} />
                <DetailField label="Highest Attainment" name="highest_attainment" val={formData.highest_attainment || formData.highestGrade} isEdit={isEdit} onChange={handleChange} type="select" options={refs.attainment_options} />
                <DetailField label="School Level" name="school_level" val={formData.school_level || formData.schoolLevel} isEdit={isEdit} onChange={handleChange} type="select" options={refs.school_levels} />
                <DetailField label="School Type" name="school_type" val={formData.school_type || formData.schoolType} isEdit={isEdit} onChange={handleChange} type="select" options={refs.school_types} />
            </div>
        </div>
    </div>

                    )}
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <button type="button" onClick={onClose} className="px-6 py-3 text-xs font-black uppercase text-slate-500 hover:text-slate-800 transition-colors">Close Window</button>
                    {isEdit && (
                        <button type="button" onClick={handleSave} disabled={loading} className="px-12 py-4 bg-emerald-600 text-white text-xs font-black uppercase rounded-2xl shadow-xl shadow-emerald-600/20 transition-all hover:bg-emerald-500 active:scale-95 disabled:opacity-50">
                            {loading ? 'Processing...' : 'Save All Changes'}
                        </button>
                    )}
                </div>
            </div>
        </ModalWrapper>
    );
};

const DetailField = ({ label, name, val, isEdit, onChange, type = "text", options = [], max, className = "" }) => {
    const getDisplayLabel = () => {
        if (val === undefined || val === null || val === '') return '---';
        if (name === 'is_voter') return (val == 1 || val === 'Yes') ? 'Yes' : 'No';
        
        const found = (options || []).find(o => String(o.id) === String(val));
        if (found) return found.name || found.number || found;
        return val;
    };

    const inputBaseClass = "w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-base font-bold text-slate-700 dark:text-white outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm";

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</p>
            {isEdit ? (
                type === "select" ? (
                    <select name={name} value={val || ''} onChange={onChange} className={inputBaseClass}>
                        <option value="">Select Options...</option>
                        {(options || []).map((opt, i) => (
                            <option key={opt.id || i} value={opt.id || opt}>{opt.name || opt.number || opt}</option>
                        ))}
                    </select>
                ) : (
                    <input type={type} name={name} value={val || ''} onChange={onChange} max={max} className={inputBaseClass} />
                )
            ) : (
                <p className="text-base font-bold text-slate-800 dark:text-slate-100 break-words leading-tight">{getDisplayLabel()}</p>
            )}
        </div>
    );
};

export default ResidentDetailsModal;