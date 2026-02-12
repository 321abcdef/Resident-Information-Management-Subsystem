import axios from 'axios';
import { API_BASE_URL, STORAGE_URL } from '../config/api';
import { jsPDF } from "jspdf"; 

export const calculateAge = (birthdate) => {
    if (!birthdate) return 'N/A';
    const birthDateObj = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    return age;
};

export const verificationService = {
    getSubmissions: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/residents`);
            return response.data.map(res => ({
                id: res.id,
                barangay_id: res.barangay_id, 
                name: `${res.first_name} ${res.last_name}`,
                date: new Date(res.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                status: res.status, 
                details: {
                    birthdate: res.birthdate,
                    sex: res.gender,
                    purok: res.purok,
                    address: res.street,
                    sector: res.sector,
                    idFront: `${STORAGE_URL}/${res.id_front_path}`,
                    idBack: `${STORAGE_URL}/${res.id_back_path}`,
                    contact: res.contact
                }
            }));
        } catch (error) {
            console.error("Fetch error:", error);
            return [];
        }
    },

    updateStatus: async (id, status, extraData = {}) => {
        try {
        
            const payload = { status, ...extraData };
            
            const response = await axios.put(`${API_BASE_URL}/residents/${id}`, payload);
            return response.data;
        } catch (error) {
            console.error("Update error detail:", error.response?.data || error.message);
            return { success: false };
        }
    }
};

export const handleDownloadSlip = (data) => {
    try {
        const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a6' });
        doc.setFillColor(21, 128, 61);
        doc.rect(0, 0, 105, 25, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.text("BARANGAY SAN BARTOLOME", 10, 12);
        doc.setFontSize(8);
        doc.text("OFFICIAL REGISTRATION SLIP", 10, 18);
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text("NAME:", 10, 35);
        doc.setFont("helvetica", "bold");
        doc.text(String(data?.name || "RESIDENT").toUpperCase(), 10, 42);
        doc.setFont("helvetica", "normal");
        doc.text("ID / TRACKING:", 10, 55);
        doc.setTextColor(0, 102, 204);
        doc.text(String(data?.barangay_id || data?.id || "N/A"), 10, 63);
        doc.save(`Slip-${data?.name}.pdf`);
    } catch (err) { console.error(err); }
};