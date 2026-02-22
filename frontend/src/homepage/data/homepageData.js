import {
  FileText,
  ShieldCheck,
  Users,
  Phone,
  Sun,
  Facebook,
  Instagram,
  Globe,
} from "lucide-react";

import vaccineDrivePic from "../../assets/vaccine-drive.jpg";
import digitalIdPic from "../../assets/digital-id.png";
import cleanupDrivePic from "../../assets/cleanup-drive.jpg";
import picture1 from "../../assets/reynaldo-rivera.jpg";
import picture2 from "../../assets/jose-santos.jpg";
import picture3 from "../../assets/maria-ramos.jpg";
import picture4 from "../../assets/carlos-garcia.jpg";
import picture5 from "../../assets/sofia-mercado.avif";

export const announcements = [
  {
    id: "vaccination-drive-2026-02-21",
    date: "Feb 21, 2026",
    tag: "Health",
    title: "Purok Vaccination Drive",
    desc: "Free health check-ups and flu vaccines available at the Barangay Hall medical center.",
    fullContent:
      "The Barangay Health Office, in partnership with the City Health Department, will conduct a mass vaccination drive. This initiative aims to protect our residents from seasonal flu and provide basic medical check-ups for seniors and children. Please bring your health card and a valid ID.",
    urgent: true,
    image: vaccineDrivePic,
  },
  {
    id: "digital-id-rollout-2026-02-18",
    date: "Feb 18, 2026",
    tag: "Advisory",
    title: "Digital ID Rollout",
    desc: "All residents are encouraged to register for the new Digital Resident ID for faster transactions.",
    fullContent:
      "Our new Digital Resident ID system is now live! This modern identification system will streamline the process of getting clearances, permits, and other barangay documents. Residents can register through this portal or visit the registration booth at the Barangay Hall lobby starting Monday.",
    urgent: false,
    image: digitalIdPic,
  },
  {
    id: "cleanup-drive-2026-02-15",
    date: "Feb 15, 2026",
    tag: "Community",
    title: "Clean-up Drive",
    desc: "Join our 'Tapat Ko, Linis Ko' initiative this Saturday starting at 6:00 AM.",
    fullContent:
      "Let's keep Barangay Gulod clean and green! We are inviting all residents to participate in our community-wide clean-up drive. Materials like trash bags and gloves will be provided by the barangay. We will meet at the Purok centers before heading to the main streets.",
    urgent: false,
    image: cleanupDrivePic,
  },
];

export const services = [
  {
    id: "e-certifications",
    icon: FileText,
    title: "E-Certifications",
    desc: "Apply for Clearance, Indigency, and Residency from your phone.",
    color: "text-blue-500",
  },
  {
    id: "resident-id",
    icon: ShieldCheck,
    title: "Resident ID",
    desc: "Secure digital identification for all verified Gulod residents.",
    color: "text-emerald-500",
  },
  {
    id: "social-services",
    icon: Users,
    title: "Social Services",
    desc: "Access health programs, financial aid, and community training.",
    color: "text-amber-500",
  },
];

export const officials = [
  {
    id: "reynaldo-rivera",
    name: "Hon. Reynaldo B. Rivera",
    role: "Punong Barangay",
    committee: "Administration & Finance",
    image: picture1,
  },
  {
    id: "jose-santos",
    name: "Hon. Jose M. Santos",
    role: "Barangay Kagawad",
    committee: "Peace & Order / Public Safety",
    image: picture2,
  },
  {
    id: "maria-ramos",
    name: "Hon. Maria A. Ramos",
    role: "Barangay Kagawad",
    committee: "Health & Social Services",
    image: picture3,
  },
  {
    id: "carlos-garcia",
    name: "Hon. Carlos P. Garcia",
    role: "Barangay Kagawad",
    committee: "Infrastructure & Education",
    image: picture4,
  },
  {
    id: "sofia-mercado",
    name: "Hon. Sofia L. Mercado",
    role: "SK Chairperson",
    committee: "Youth & Sports Development",
    image: picture5,
  },
];

export const emergencyHotlines = [
  { id: "rescue", label: "Rescue", phone: "0912-345-6789", icon: ShieldCheck },
  { id: "police", label: "Police", phone: "8-922-1234", icon: Users },
  { id: "fire", label: "Fire", phone: "8-911-0000", icon: Sun },
];

export const socialLinks = [
  { id: "facebook", label: "Facebook", href: "#", icon: Facebook },
  { id: "instagram", label: "Instagram", href: "#", icon: Instagram },
  { id: "website", label: "Website", href: "#", icon: Globe },
];

export const defaultChatMessage = {
  id: "welcome",
  role: "bot",
  text: "Mabuhay! I am your Gulod Digital Assistant. How can I help you today?",
};

export const weatherConditions = ["Sunny", "Cloudy", "Fair"];

export const createMessageId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
