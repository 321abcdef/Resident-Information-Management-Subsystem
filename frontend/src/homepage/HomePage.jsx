import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sun, Moon, FileText, ShieldCheck, Users, MapPin, Phone, Mail, 
  Send, ArrowUp, Clock, MessageSquare, ChevronDown, Facebook, 
  Instagram, Globe, X, Bell, Award, AlertTriangle, Search, Menu, Calendar
} from "lucide-react";

import bsbPic from "../assets/bgygulod.png";
import logoPic from "../assets/bgylogo.png";
import officialFallback from "../assets/atl.png";

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [weather, setWeather] = useState({ temp: "30°C", condition: "Clear" });
  const [chatHistory, setChatHistory] = useState([
    { role: "bot", text: "Mabuhay! I am your Gulod Digital Assistant. How can I help you today?" }
  ]);

  const [contactData, setContactData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      const progressBar = document.getElementById("scroll-progress");
      if (progressBar) progressBar.style.width = `${progress}%`;
    };

    const conditions = ["Sunny", "Cloudy", "Fair"];
    setWeather({ 
      temp: Math.floor(Math.random() * (32 - 26) + 26) + "°C", 
      condition: conditions[Math.floor(Math.random() * conditions.length)] 
    });

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body scroll when chat is open on mobile
  useEffect(() => {
    if (isChatOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isChatOpen]);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
      setContactData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const newHistory = [...chatHistory, { role: "user", text: chatMessage }];
    setChatHistory(newHistory);
    setChatMessage("");

    setTimeout(() => {
      let botResponse = "I'm sorry, I didn't quite get that. You can ask about 'ID', 'Clearance', or 'Location'.";
      const msg = chatMessage.toLowerCase();
      if (msg.includes("id")) botResponse = "To get a Resident ID, please Register/Login and go to Step 4 to upload your requirements.";
      if (msg.includes("clearance") || msg.includes("indigency")) botResponse = "You can apply for E-Certifications under the Services section after logging in.";
      if (msg.includes("location") || msg.includes("hall")) botResponse = "The Barangay Hall is located at Villareal St., Gulod, QC. Open Mon-Fri, 8AM-5PM.";
      setChatHistory([...newHistory, { role: "bot", text: botResponse }]);
    }, 1000);
  };

  const announcements = [
    { 
        date: "Feb 21, 2026", 
        tag: "Health", 
        title: "Purok Vaccination Drive", 
        desc: "Free health check-ups and flu vaccines available at the Barangay Hall medical center.", 
        fullContent: "The Barangay Health Office, in partnership with the City Health Department, will conduct a mass vaccination drive. This initiative aims to protect our residents from seasonal flu and provide basic medical check-ups for seniors and children. Please bring your health card and a valid ID.",
        urgent: true 
    },
    { 
        date: "Feb 18, 2026", 
        tag: "Advisory", 
        title: "Digital ID Rollout", 
        desc: "All residents are encouraged to register for the new Digital Resident ID for faster transactions.", 
        fullContent: "Our new Digital Resident ID system is now live! This modern identification system will streamline the process of getting clearances, permits, and other barangay documents. Residents can register through this portal or visit the registration booth at the Barangay Hall lobby starting Monday.",
        urgent: false 
    },
    { 
        date: "Feb 15, 2026", 
        tag: "Community", 
        title: "Clean-up Drive", 
        desc: "Join our 'Tapat Ko, Linis Ko' initiative this Saturday starting at 6:00 AM.", 
        fullContent: "Let's keep Barangay Gulod clean and green! We are inviting all residents to participate in our community-wide clean-up drive. Materials like trash bags and gloves will be provided by the barangay. We will meet at the Purok centers before heading to the main streets.",
        urgent: false 
    }
  ];

  const services = [
    { icon: FileText, title: "E-Certifications", desc: "Apply for Clearance, Indigency, and Residency from your phone.", color: "text-blue-500" },
    { icon: ShieldCheck, title: "Resident ID", desc: "Secure digital identification for all verified Gulod residents.", color: "text-emerald-500" },
    { icon: Users, title: "Social Services", desc: "Access health programs, financial aid, and community training.", color: "text-amber-500" },
  ];

  const officialImageExtensions = ["jpg", "jpeg", "png", "webp"];
  const officialImageBase = `${import.meta.env.BASE_URL}officials/`;
  const getOfficialImageSrc = (imageKey, extension = officialImageExtensions[0]) =>
    `${officialImageBase}${imageKey}.${extension}`;

  const handleOfficialImageError = (e) => {
    const currentIndex = Number(e.currentTarget.dataset.extIndex || "0");
    const imageKey = e.currentTarget.dataset.imageKey;
    const nextIndex = currentIndex + 1;

    if (imageKey && nextIndex < officialImageExtensions.length) {
      e.currentTarget.dataset.extIndex = String(nextIndex);
      e.currentTarget.src = getOfficialImageSrc(imageKey, officialImageExtensions[nextIndex]);
      return;
    }

    e.currentTarget.onerror = null;
    e.currentTarget.src = officialFallback;
  };

  const officials = [
    { name: "Hon. Reynaldo B. Rivera", role: "Punong Barangay", committee: "Administration & Finance", imgKey: "reynaldo-rivera" },
    { name: "Hon. Jose M. Santos", role: "Barangay Kagawad", committee: "Peace & Order / Public Safety", imgKey: "jose-santos" },
    { name: "Hon. Maria A. Ramos", role: "Barangay Kagawad", committee: "Health & Social Services", imgKey: "maria-ramos" },
    { name: "Hon. Carlos P. Garcia", role: "Barangay Kagawad", committee: "Infrastructure & Education", imgKey: "carlos-garcia" },
    { name: "Hon. Sofia L. Mercado", role: "SK Chairperson", committee: "Youth & Sports Development", imgKey: "sofia-mercado" },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"} overflow-x-hidden`}>
      
      {/* --- SCROLL PROGRESS BAR --- */}
      <div id="scroll-progress" className="fixed top-0 left-0 h-1 bg-emerald-500 z-[200] transition-all duration-100" />

      {/* --- NAVIGATION --- */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 backdrop-blur-md ${isScrolled ? (isDarkMode ? "bg-slate-900/90 border-b border-white/10 py-3" : "bg-white/90 border-b border-black/5 py-3") : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src={logoPic} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-emerald-500/30" />
            <div className="flex flex-col">
              <span className="font-black tracking-tighter text-lg md:text-xl uppercase italic leading-none">Gulod<span className="text-emerald-600">Digital</span></span>
              <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.2em] opacity-60 flex items-center gap-1">
                <ShieldCheck size={8} className="text-emerald-500" /> Official Portal
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5"}`}>
                <Sun size={14} className="text-amber-500" />
                <div className="text-left leading-none">
                    <p className="text-[7px] font-black uppercase opacity-50 mb-1">Local Weather</p>
                    <p className="text-[10px] font-bold uppercase">{weather.temp} • {weather.condition}</p>
                </div>
            </div>

            <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest">
                <button onClick={() => scrollToSection("news")} className="hover:text-emerald-600 transition-colors">News</button>
                <button onClick={() => scrollToSection("services")} className="hover:text-emerald-600 transition-colors">Services</button>
                <button onClick={() => scrollToSection("officials")} className="hover:text-emerald-600 transition-colors">Officials</button>
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 transition-transform hover:scale-110">
                {isDarkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-emerald-800" />}
                </button>
                <button onClick={() => navigate("/auth")} className="bg-emerald-700 text-white px-8 py-3 rounded-2xl hover:bg-emerald-800 transition-all shadow-xl active:scale-95">Login</button>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2">
                {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-emerald-800" />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
            <div className={`lg:hidden absolute top-full left-0 w-full p-6 border-b animate-in slide-in-from-top-2 duration-300 ${isDarkMode ? "bg-slate-900 border-white/10" : "bg-white border-black/5 shadow-xl"}`}>
                <div className="flex flex-col gap-6 text-center font-black uppercase tracking-widest text-xs">
                    <button onClick={() => scrollToSection("news")}>News</button>
                    <button onClick={() => scrollToSection("services")}>Services</button>
                    <button onClick={() => scrollToSection("officials")}>Officials</button>
                    <button onClick={() => navigate("/auth")} className="bg-emerald-700 text-white py-4 rounded-2xl shadow-lg">Login / Register</button>
                </div>
            </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="about" className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={bsbPic} alt="Barangay Hall" className="w-full h-full object-cover opacity-20 md:opacity-30" />
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${isDarkMode ? "to-slate-950" : "to-white"}`} />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 mb-6 md:mb-8 animate-fade-in">
            <ShieldCheck size={14} className="md:size-4" />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Opisyal na Website ng Barangay Gulod</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-8 md:mb-10 italic">
            Barangay <br /> <span className="text-emerald-600 not-italic">Gulod.</span>
          </h1>
          <p className={`text-base md:text-lg lg:text-xl mb-10 md:mb-12 max-w-2xl mx-auto font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            Ang portal para sa mas mabilis at modernong serbisyo publiko. Register your profile and access documents digitally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/auth")} className="w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 bg-emerald-700 text-white rounded-[20px] md:rounded-[24px] font-black uppercase tracking-widest text-xs md:text-sm shadow-2xl hover:bg-emerald-800 transition-all">
              Get Digital ID
            </button>
            <button onClick={() => scrollToSection("news")} className={`w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 rounded-[20px] md:rounded-[24px] font-black uppercase tracking-widest text-xs md:text-sm border transition-all ${isDarkMode ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"}`}>
              Latest News
            </button>
          </div>
        </div>
      </section>

      {/* --- ANNOUNCEMENTS SECTION --- */}
      <section id="news" className="py-16 md:py-24 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
            <div>
              <h2 className="text-[8px] md:text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-3 md:mb-4">Live Updates</h2>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Announcements</h3>
            </div>
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest flex items-center gap-2">
              <Bell size={12} className="animate-pulse text-red-500" /> Stay updated with community news
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((news, i) => (
              <div key={i} className={`group p-6 md:p-8 rounded-[32px] md:rounded-[40px] border transition-all hover:-translate-y-2 ${isDarkMode ? "bg-slate-900 border-white/5" : "bg-white border-black/5 shadow-sm hover:shadow-xl"}`}>
                <div className="flex justify-between items-center mb-6">
                  <span className={`text-[8px] md:text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${news.urgent ? "bg-red-500 text-white" : "bg-emerald-500/20 text-emerald-600"}`}>
                    {news.tag}
                  </span>
                  <span className="text-[9px] md:text-[10px] opacity-40 font-bold tracking-widest">{news.date}</span>
                </div>
                <h4 className="text-lg md:text-xl font-black uppercase mb-4 leading-tight group-hover:text-emerald-600 transition-colors">{news.title}</h4>
                <p className="text-xs md:text-sm opacity-60 leading-relaxed mb-8">{news.desc}</p>
                <button onClick={() => setSelectedNews(news)} className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-emerald-600 hover:gap-4 transition-all">
                  Read More <ArrowUp size={12} className="rotate-45" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEWS MODAL (POP-UP) --- */}
      {selectedNews && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
              <div className={`w-full max-w-2xl rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 ${isDarkMode ? "bg-slate-900 border border-white/10" : "bg-white"}`}>
                  <div className="relative h-48 md:h-64 bg-emerald-800 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                      <Bell size={64} className="text-white/20 animate-pulse" />
                      <button onClick={() => setSelectedNews(null)} className="absolute top-6 right-6 p-3 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors">
                          <X size={20} />
                      </button>
                  </div>
                  <div className="p-8 md:p-12">
                      <div className="flex items-center gap-4 mb-6">
                        <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${selectedNews.urgent ? "bg-red-500 text-white" : "bg-emerald-500/20 text-emerald-600"}`}>
                            {selectedNews.tag}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] font-bold opacity-40 uppercase tracking-widest">
                            <Calendar size={12} /> {selectedNews.date}
                        </div>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6 leading-none italic">{selectedNews.title}</h3>
                      <p className={`text-sm md:text-base leading-relaxed mb-8 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                          {selectedNews.fullContent}
                      </p>
                      <button onClick={() => setSelectedNews(null)} className="w-full py-5 bg-emerald-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-800 transition-all">
                          Got it, Thank you!
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* --- SERVICES --- */}
      <section id="services" className={`py-16 md:py-24 px-6 scroll-mt-24 ${isDarkMode ? "bg-slate-900/50" : "bg-emerald-50/50"}`}>
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 text-center">
                {services.map((s, i) => (
                    <div key={i} className="group">
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110 ${isDarkMode ? "bg-slate-800" : "bg-white"} ${s.color}`}>
                        <s.icon size={28} className="md:size-[32px]" />
                    </div>
                    <h4 className="text-lg md:text-xl font-black uppercase mb-3">{s.title}</h4>
                    <p className="text-xs md:text-sm opacity-60 max-w-xs mx-auto">{s.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- BARANGAY OFFICIALS --- */}
      <section id="officials" className="py-16 md:py-24 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[8px] md:text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-4">Serbisyo at Pamumuno</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Barangay Officials</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
            {officials.map((person, i) => (
              <div key={i} className="text-center group">
                <div className={`relative aspect-[3/4] rounded-[24px] md:rounded-[32px] overflow-hidden mb-4 md:mb-6 border-2 transition-all duration-500 group-hover:border-emerald-500 ${isDarkMode ? "border-white/5 bg-slate-900" : "border-black/5 bg-slate-50"}`}>
                  <img
                    src={getOfficialImageSrc(person.imgKey)}
                    alt={person.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    data-image-key={person.imgKey}
                    data-ext-index="0"
                    onError={handleOfficialImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <Award className="text-white mb-2" size={16} />
                  </div>
                </div>
                <h4 className="text-[10px] md:text-xs font-black uppercase tracking-tight mb-1">{person.name}</h4>
                <p className="text-[8px] md:text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">{person.role}</p>
                <p className="text-[7px] md:text-[8px] opacity-40 font-bold uppercase tracking-tighter">{person.committee}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT & LOCATION --- */}
      <section id="contact" className="py-16 md:py-24 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[8px] md:text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-4">Official Contact</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Barangay Hall</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
              <div className={`p-6 md:p-8 rounded-[32px] md:rounded-[40px] border ${isDarkMode ? "bg-slate-900 border-white/5" : "bg-slate-50 border-black/5"}`}>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input required placeholder="Your Name" className={`w-full p-4 rounded-xl text-[10px] uppercase font-black tracking-widest outline-none border transition-all ${isDarkMode ? "bg-black/40 border-white/10" : "bg-white border-black/10"}`} value={contactData.name} onChange={(e) => setContactData({...contactData, name: e.target.value})} />
                    <input required type="email" placeholder="Email Address" className={`w-full p-4 rounded-xl text-[10px] uppercase font-black tracking-widest outline-none border transition-all ${isDarkMode ? "bg-black/40 border-white/10" : "bg-white border-black/10"}`} value={contactData.email} onChange={(e) => setContactData({...contactData, email: e.target.value})} />
                  </div>
                  <textarea required rows="4" placeholder="Message to the Barangay Office" className={`w-full p-4 rounded-xl text-[10px] uppercase font-black tracking-widest outline-none border transition-all ${isDarkMode ? "bg-black/40 border-white/10" : "bg-white border-black/10"}`} value={contactData.message} onChange={(e) => setContactData({...contactData, message: e.target.value})} />
                  <button className="w-full py-4 bg-emerald-700 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-800 transition-all flex items-center justify-center gap-2">
                    {formStatus === "submitting" ? "Sending..." : formStatus === "success" ? "Message Sent!" : <><Send size={14}/> Submit Message</>}
                  </button>
                </form>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-5 rounded-2xl ${isDarkMode ? "bg-slate-900" : "bg-emerald-50"}`}>
                  <Clock className="text-emerald-600 mb-2" size={16} />
                  <p className="text-[9px] font-black uppercase tracking-widest">Mon - Fri</p>
                  <p className="text-[9px] font-bold opacity-60">8 AM - 5 PM</p>
                </div>
                <div className={`p-5 rounded-2xl ${isDarkMode ? "bg-slate-900" : "bg-emerald-50"}`}>
                  <Phone className="text-emerald-600 mb-2" size={16} />
                  <p className="text-[9px] font-black uppercase tracking-widest">Hotline</p>
                  <p className="text-[9px] font-bold opacity-60">8-920-0000</p>
                </div>
              </div>
            </div>

            <div className="h-[300px] md:h-[500px] rounded-[32px] md:rounded-[40px] overflow-hidden border border-emerald-500/20 relative order-1 lg:order-2">
              <iframe
                title="Map"
                src="https://www.google.com/maps?q=Villareal%20St.%2C%20Gulod%2C%20Quezon%20City&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: isDarkMode ? "invert(90%)" : "none" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 md:p-6 bg-emerald-800/90 backdrop-blur-md text-white rounded-[24px]">
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1">Barangay Hall Location</p>
                <p className="text-[10px] md:text-xs opacity-80 uppercase font-bold">Villareal St., Gulod, Quezon City</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className={`py-12 md:py-20 px-6 border-t ${isDarkMode ? "border-white/10" : "border-black/5"}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logoPic} className="w-8 h-8 grayscale opacity-50" alt="logo" />
              <span className="font-black text-lg md:text-xl uppercase italic">Barangay Gulod</span>
            </div>
            <p className="text-[10px] md:text-xs opacity-50 max-w-sm mb-8 font-bold leading-relaxed">
              Official Digital Portal of Barangay Gulod, District 5, Quezon City. 
              Providing efficient, transparent, and modern governance for every resident.
            </p>
            <div className="flex gap-4">
               {[Facebook, Instagram, Globe].map((Icon, i) => (
                 <div key={i} className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center hover:bg-emerald-600 hover:text-white cursor-pointer transition-all">
                    <Icon size={18} />
                 </div>
               ))}
            </div>
          </div>
          <div>
            <h5 className="font-black uppercase text-[10px] tracking-widest mb-6 opacity-40">Resources</h5>
            <div className="space-y-3 text-[10px] font-bold uppercase">
               <button onClick={() => scrollToSection("news")} className="block hover:text-emerald-600">Announcements</button>
               <button onClick={() => navigate("/auth")} className="block hover:text-emerald-600">Citizen Portal</button>
               <button onClick={() => scrollToSection("officials")} className="block hover:text-emerald-600">Local Leaders</button>
            </div>
          </div>
          <div>
            <h5 className="font-black uppercase text-[10px] tracking-widest mb-6 opacity-40">Inquiries</h5>
            <div className="space-y-3 text-[10px] font-bold uppercase">
              <div className="flex items-center gap-3"><Mail size={12} className="text-emerald-600" /> contact@gulod.gov.ph</div>
              <div className="flex items-center gap-3"><Phone size={12} className="text-emerald-600" /> (02) 8-920-0000</div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 md:mt-20 pt-8 border-t border-emerald-500/10 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 text-center">
          © 2026 Barangay Gulod Government Office.
        </div>
      </footer>

      {/* --- EMERGENCY MODAL --- */}
      {isEmergencyModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-red-950/20 backdrop-blur-sm animate-in fade-in duration-300">
            <div className={`w-full max-w-md rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 ${isDarkMode ? "bg-slate-900 border border-white/10" : "bg-white border border-black/5"}`}>
                <div className="bg-red-600 p-6 md:p-8 text-white text-center">
                    <AlertTriangle size={40} className="mx-auto mb-4 animate-bounce" />
                    <h4 className="text-xl md:text-2xl font-black uppercase italic">Emergency Hotlines</h4>
                </div>
                <div className="p-6 md:p-8 space-y-4">
                    {[
                        { label: "Rescue", phone: "0912-345-6789", icon: ShieldCheck },
                        { label: "Police", phone: "8-922-1234", icon: Users },
                        { label: "Fire", phone: "8-911-0000", icon: Sun }
                    ].map((item, idx) => (
                        <a key={idx} href={`tel:${item.phone}`} className={`flex items-center justify-between p-4 rounded-xl transition-all ${isDarkMode ? "bg-white/5" : "bg-red-50"}`}>
                            <div className="flex items-center gap-3">
                                <item.icon className="text-red-600" size={18} />
                                <span className="text-[10px] font-black uppercase tracking-tight">{item.label}</span>
                            </div>
                            <span className="text-[10px] font-bold text-red-600">{item.phone}</span>
                        </a>
                    ))}
                    <button onClick={() => setIsEmergencyModalOpen(false)} className="w-full mt-2 py-4 text-[9px] font-black uppercase tracking-widest opacity-50 hover:opacity-100">Close Window</button>
                </div>
            </div>
        </div>
      )}

      {/* --- FLOATING WIDGETS - IMPROVED RESPONSIVE --- */}
      <div className="fixed bottom-6 left-4 md:bottom-10 md:left-10 z-[150] flex flex-col gap-4">
        
        {/* EMERGENCY BUTTON */}
        <div className="relative group">
            <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-20 group-hover:opacity-40" />
            <button 
                onClick={() => setIsEmergencyModalOpen(true)} 
                className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:scale-110 transition-transform active:scale-95"
            >
                <Phone size={22} className="animate-pulse" />
            </button>
        </div>

        {/* ASSISTANCE CHAT BUTTON - ENHANCED RESPONSIVE */}
        <div className="relative">
            {/* Chat window - responsive for all devices */}
            {isChatOpen && (
                <>
                    {/* Backdrop for mobile */}
                    <div 
                        className="fixed inset-0 bg-black/50 md:hidden z-[199]"
                        onClick={() => setIsChatOpen(false)}
                    />
                    
                    {/* Chat container */}
                    <div 
                        className={`
                            fixed 
                            md:absolute 
                            md:bottom-20 
                            md:left-0 
                            z-[200]
                            
                            /* Mobile styles (full screen) */
                            inset-4
                            md:inset-auto
                            
                            /* Desktop styles */
                            md:w-[380px] 
                            md:h-[500px]
                            
                            /* Common styles */
                            rounded-[24px] 
                            md:rounded-[40px] 
                            shadow-2xl 
                            overflow-hidden 
                            flex 
                            flex-col 
                            border 
                            backdrop-blur-xl 
                            animate-in 
                            slide-in-from-bottom-5 
                            duration-300 
                            ${isDarkMode ? "bg-slate-900/95 border-white/10" : "bg-white/95 border-black/5"}
                            
                            /* Mobile adjustments */
                            h-[calc(100%-2rem)]
                        `}
                    >
                        {/* Header */}
                        <div className="p-4 md:p-6 bg-emerald-700 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                <div>
                                    <span className="font-black uppercase text-[10px] md:text-[11px] tracking-widest">Digital Assistant</span>
                                    <p className="text-[8px] md:text-[9px] opacity-80 mt-0.5">Online • Usually replies in seconds</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsChatOpen(false)} 
                                className="p-2 hover:bg-white/10 rounded-xl transition-all"
                            >
                                <X size={20} className="md:size-[22px]" />
                            </button>
                        </div>

                        {/* Chat messages */}
                        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 text-[11px] md:text-xs custom-scrollbar">
                            {chatHistory.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`
                                        max-w-[85%] 
                                        p-3 md:p-4 
                                        rounded-2xl 
                                        font-medium
                                        ${msg.role === "user" 
                                            ? "bg-emerald-600 text-white rounded-br-none" 
                                            : isDarkMode 
                                                ? "bg-slate-800 text-slate-200 rounded-bl-none" 
                                                : "bg-slate-100 text-slate-800 rounded-bl-none"
                                        }
                                    `}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input form */}
                        <form onSubmit={handleSendMessage} className="p-4 md:p-5 border-t border-white/10">
                            <div className="relative">
                                <input 
                                    value={chatMessage} 
                                    onChange={(e) => setChatMessage(e.target.value)} 
                                    type="text" 
                                    placeholder="Type your message..." 
                                    className={`
                                        w-full 
                                        py-3 md:py-4 
                                        pl-4 
                                        pr-12 
                                        rounded-xl 
                                        text-[11px] md:text-xs
                                        outline-none 
                                        transition-all
                                        ${isDarkMode 
                                            ? "bg-slate-800 text-white placeholder:text-slate-500" 
                                            : "bg-slate-100 text-slate-900 placeholder:text-slate-400"
                                        }
                                    `}
                                />
                                <button 
                                    type="submit" 
                                    className={`
                                        absolute 
                                        right-2 
                                        top-2 
                                        p-2 
                                        rounded-lg 
                                        transition-all
                                        ${chatMessage.trim() 
                                            ? "bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer" 
                                            : "bg-slate-300 text-slate-500 cursor-not-allowed"
                                        }
                                    `}
                                    disabled={!chatMessage.trim()}
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                            <p className="text-[8px] md:text-[9px] opacity-40 text-center mt-3">
                                Powered by Barangay Gulod Digital Services
                            </p>
                        </form>
                    </div>
                </>
            )}
            
            {/* Chat toggle button */}
            <button 
                onClick={() => setIsChatOpen(!isChatOpen)} 
                className={`
                    relative
                    flex 
                    items-center 
                    justify-center 
                    w-12 h-12 md:w-14 md:h-14 
                    rounded-full 
                    shadow-2xl 
                    transition-all 
                    duration-300 
                    hover:scale-110 
                    active:scale-95
                    ${isChatOpen 
                        ? "bg-slate-800 rotate-90" 
                        : "bg-emerald-700 hover:bg-emerald-600"
                    }
                `}
            >
                {isChatOpen ? (
                    <X size={22} className="text-white" />
                ) : (
                    <div className="relative">
                        <MessageSquare size={22} className="text-white" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-emerald-700 rounded-full animate-pulse" />
                    </div>
                )}
            </button>
        </div>
      </div>

      {/* --- BACK TO TOP --- */}
      {showBackToTop && (
        <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
            className="fixed bottom-6 right-4 md:bottom-10 md:right-10 z-[150] w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-emerald-700/20 backdrop-blur-md text-emerald-600 border border-emerald-600/20 rounded-full shadow-2xl hover:bg-emerald-700 hover:text-white transition-all animate-in fade-in zoom-in"
        >
          <ArrowUp size={22} />
        </button>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { 
          width: 4px; 
        } 
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #10b981; 
          border-radius: 10px; 
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        @keyframes fade-in { 
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          } 
          to { 
            opacity: 1; 
            transform: translateY(0); 
          } 
        }
        .animate-fade-in { 
          animation: fade-in 0.8s ease-out forwards; 
        }
        
        /* Mobile chat adjustments */
        @media (max-width: 768px) {
          .chat-fullscreen {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 0;
          }
        }
      ` }} />
    </div>
  );
}