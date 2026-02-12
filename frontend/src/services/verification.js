import axios from 'axios';
import { API_BASE_URL, STORAGE_URL } from '../config/api';
import { jsPDF } from "jspdf";

/**
 * Street ID → name mapping (matches SignupForm streetsByPurok)
 * Used as fallback when the Street relationship isn't loaded yet
 */
const STREET_MAP = {
  1: "Sisa St.",
  2: "Crisostomo St.",
  3: "Ibarra St.",
  4: "Elias St.",
  5: "Maria Clara St.",
  6: "Basilio St.",
  7: "Salvi St.",
  8: "Victoria St.",
  9: "Tiago St.",
  10: "Tasio St.",
  11: "Guevarra St.",
  12: "Sinang St.",
  13: "Alfarez St.",
  14: "Doña Victorina St.",
};

/**
 * Calculate age from birthdate string
 */
export const calculateAge = (birthdate) => {
  if (!birthdate) return 'N/A';
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

// ─── Verification Service ────────────────────────────────────────────────────

export const verificationService = {

  /**
   * Fetch all residents.
   * Address priority:
   *   1. Loaded relationship (temp_purok / temp_street) — works when with() is active
   *   2. Raw ID fallback via STREET_MAP — works even when with() is commented out
   *   3. Assigned household (after verification)
   */
  getSubmissions: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/residents`);

      return response.data.map(res => {
        // --- Purok resolution ---
        const purok =
          res.temp_purok?.number ||
          res.temp_purok?.name   ||
          res.temp_purok_id      ||   // raw numeric ID as last resort
          res.household?.purok?.number ||
          res.household?.purok?.name   ||
          'N/A';

        // --- Street resolution ---
        const street =
          res.temp_street?.name         ||
          STREET_MAP[res.temp_street_id] ||  // JS-side fallback map
          res.household?.street?.name    ||
          'N/A';

        // --- House number ---
        const houseNumber =
          res.temp_house_number ||
          res.household?.house_number ||
          'N/A';

        return {
          id:             res.id,
          barangay_id:    res.barangay_id,
          trackingNumber: res.tracking_number,
          name:           `${res.first_name} ${res.last_name}`,
          date: new Date(res.created_at).toLocaleDateString('en-US', {
            month: 'short', day: '2-digit', year: 'numeric',
          }),
          status: res.status,
          details: {
            birthdate:   res.birthdate,
            sex:         res.gender,
            houseNumber,
            purok,
            address:     street,
            idFront:     `${STORAGE_URL}/${res.id_front_path}`,
            idBack:      `${STORAGE_URL}/${res.id_back_path}`,
            contact:     res.contact_number,
          },
        };
      });

    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  },

  /**
   * Update resident status.
   * Only sends { status } — all household + account logic is server-side.
   * Returns full server response so callers can read accountDetails.
   */
  updateStatus: async (id, status) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/residents/${id}`,
            { status }
        );
        
        return response.data; 
    } catch (error) {
        console.error("Update error:", error.response?.data || error.message);
        return {
            success: false,
            message: error.response?.data?.message || 'Database update failed.',
        };
    }
},
};

// ─── PDF Slip ────────────────────────────────────────────────────────────────

export const handleDownloadSlip = (data) => {
  try {
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a6' });

    doc.setFillColor(21, 128, 61);
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

    doc.setDrawColor(21, 128, 61);
    doc.setLineWidth(0.5);
    doc.line(10, 35, 95, 35);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("FULL NAME:", 10, 45);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(String(data?.name || "APPLICANT").toUpperCase(), 10, 52);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("TRACKING NUMBER:", 10, 65);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(21, 128, 61);
    doc.text(String(data?.trackingNumber || "N/A"), 10, 73);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("STATUS:", 10, 85);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(String(data?.status || "Pending").toUpperCase(), 10, 92);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    const dateText = data?.submittedDate || new Date().toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
    });
    doc.text(`Submitted: ${dateText}`, 10, 103);

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

    doc.save(`Registration-Slip-${data?.trackingNumber || 'BGN-XXXX'}.pdf`);

  } catch (err) {
    console.error("PDF Generation Error:", err);
    alert("Failed to generate PDF slip. Please try again.");
  }
};

// ─── QR Download ─────────────────────────────────────────────────────────────

export const downloadResidentQR = (qrElementId, residentData) => {
  try {
    const svg = document.getElementById(qrElementId);
    if (!svg) throw new Error("QR Code element not found");

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas  = document.createElement("canvas");
    const ctx     = canvas.getContext("2d");
    const img     = new Image();

    img.onload = () => {
      canvas.width = canvas.height = 1000;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 1000, 1000);
      ctx.drawImage(img, 100, 100, 800, 800);

      const link = document.createElement("a");
      link.download = `QR-${residentData.barangayId}-${residentData.name}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  } catch (err) {
    console.error("QR Download Error:", err);
    alert("Failed to download QR code.");
  }
};