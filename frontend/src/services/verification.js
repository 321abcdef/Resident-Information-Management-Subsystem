import axios from 'axios';
import { API_BASE_URL, STORAGE_URL } from '../config/api';
import { jsPDF } from "jspdf"; 

/**
 * Calculate age from birthdate
 */
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

/**
 * VERIFICATION SERVICE
 */
export const verificationService = {
    /**
     * Get all resident submissions
     */
    getSubmissions: async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/residents`);
        return response.data.map(res => ({
            id: res.id,
            barangay_id: res.barangay_id, 
            trackingNumber: res.tracking_number,
            name: `${res.first_name} ${res.last_name}`,
            date: new Date(res.created_at).toLocaleDateString('en-US', { 
                month: 'short', 
                day: '2-digit', 
                year: 'numeric' 
            }),
            status: res.status, 
            details: {
                birthdate: res.birthdate,
                sex: res.gender,
                
                purok: res.household?.purok?.name || res.temp_purok?.name || res.temp_purok?.number || 'N/A',
                address: res.household?.street?.name || res.temp_street?.name || 'N/A',
                houseNumber: res.household?.house_number || res.temp_house_number || 'N/A',
                idFront: `${STORAGE_URL}/${res.id_front_path}`,
                idBack: `${STORAGE_URL}/${res.id_back_path}`,
                contact: res.contact_number
            }
        }));
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
},

    /**
     * Update resident status with optional extra data
     */
    updateStatus: async (id, status, extraData = {}) => {
        try {
            const payload = { status, ...extraData };
            
            const response = await axios.put(
                `${API_BASE_URL}/residents/${id}`, 
                payload
            );
            
            return response.data;
        } catch (error) {
            console.error("Update error:", error.response?.data || error.message);
            return { success: false };
        }
    }
};

/**
 * FIXED: PDF SLIP GENERATOR
 * Now properly displays tracking number
 */
export const handleDownloadSlip = (data) => {
    try {
        const doc = new jsPDF({ 
            orientation: 'p', 
            unit: 'mm', 
            format: 'a6' 
        });

        // === HEADER SECTION (Green) ===
        doc.setFillColor(21, 128, 61); // Emerald-700
        doc.rect(0, 0, 105, 30, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("BARANGAY GULOD NOVALICHES", 52.5, 12, { align: 'center' });
        
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text("Quezon City, NCR - Philippines", 52.5, 18, { align: 'center' });
        
        doc.setFontSize(8);
        doc.text("OFFICIAL REGISTRATION SLIP", 52.5, 24, { align: 'center' });

        // === DIVIDER LINE ===
        doc.setDrawColor(21, 128, 61);
        doc.setLineWidth(0.5);
        doc.line(10, 35, 95, 35);

        // === BODY SECTION ===
        doc.setTextColor(0, 0, 0);
        
        // Name
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text("FULL NAME:", 10, 45);
        
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text(String(data?.name || "APPLICANT").toUpperCase(), 10, 52);

        // CRITICAL FIX: Tracking Number Display
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text("TRACKING NUMBER:", 10, 65);
        
        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(21, 128, 61); // Green color for tracking
        doc.text(String(data?.trackingNumber || "N/A"), 10, 73);
        
        // Status
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text("STATUS:", 10, 85);
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        const statusText = String(data?.status || "Pending").toUpperCase();
        doc.text(statusText, 10, 92);

        // Submission Date
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        const dateText = data?.submittedDate || new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        doc.text(`Submitted: ${dateText}`, 10, 103);

        // === FOOTER NOTE ===
        doc.setFillColor(245, 245, 245);
        doc.rect(0, 115, 105, 33, 'F');
        
        doc.setFontSize(7);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(100, 100, 100);
        doc.text("IMPORTANT REMINDER:", 10, 122);
        
        doc.setFont("helvetica", "normal");
        doc.text("• Keep this slip for your records", 10, 127);
        doc.text("• Use tracking number to monitor status", 10, 132);
        doc.text("• Bring valid ID for verification visit", 10, 137);
        doc.text("• Contact barangay for any concerns", 10, 142);

        // === SAVE PDF ===
        const fileName = `Registration-Slip-${data?.trackingNumber || 'BGN-XXXX'}.pdf`;
        doc.save(fileName);
        
        console.log("✅ PDF Generated:", fileName);
        
    } catch (err) {
        console.error("❌ PDF Generation Error:", err);
        alert("Failed to generate PDF slip. Please try again.");
    }
};

/**
 * DOWNLOAD QR CODE (For verified residents)
 */
export const downloadResidentQR = (qrElementId, residentData) => {
    try {
        const svg = document.getElementById(qrElementId);
        if (!svg) {
            throw new Error("QR Code element not found");
        }

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            // High resolution 1000x1000px
            canvas.width = 1000;
            canvas.height = 1000;
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const qrSize = 800;
            const margin = (1000 - qrSize) / 2;
            ctx.drawImage(img, margin, margin, qrSize, qrSize);
            
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = `QR-${residentData.barangayId}-${residentData.name}.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
        
    } catch (err) {
        console.error("❌ QR Download Error:", err);
        alert("Failed to download QR code.");
    }
};