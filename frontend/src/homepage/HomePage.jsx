import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sun,
  Moon,
  FileText,
  ShieldCheck,
  Users,
  MapPin,
  Phone,
  Mail,
  Bell,
  Info,
  Globe,
  Send,
  Navigation,
  ArrowUp,
  Clock,
  Menu,
  X,
} from "lucide-react";

import bsbPic from "../assets/bgygulod.png";
import logoPic from "../assets/bgylogo.png";

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");
  const submitTimerRef = useRef(null);
  const resetTimerRef = useRef(null);
  const navigate = useNavigate();
  const mapUrl = "https://maps.google.com/?q=Gulod,+Quezon+City";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return () => {
      if (submitTimerRef.current) clearTimeout(submitTimerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (submitTimerRef.current) clearTimeout(submitTimerRef.current);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    setFormStatus("sending");
    submitTimerRef.current = setTimeout(() => {
      setFormStatus("success");
      e.target.reset();
    }, 1500);
    resetTimerRef.current = setTimeout(() => setFormStatus("idle"), 4000);
  };

  const services = [
    {
      icon: FileText,
      title: "E-Certifications",
      desc: "Apply for Clearance, Indigency, and Residency from your phone.",
      color: "text-blue-500",
    },
    {
      icon: ShieldCheck,
      title: "Resident ID",
      desc: "Secure digital identification for all verified Gulod residents.",
      color: "text-emerald-500",
    },
    {
      icon: Users,
      title: "Social Services",
      desc: "Access health programs, financial aid, and community training.",
      color: "text-amber-500",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"
      } overflow-x-hidden`}
    >
      {/* --- NAVIGATION --- */}
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-300 backdrop-blur-md ${
          isScrolled
            ? isDarkMode
              ? "bg-slate-900/90 border-b border-white/10 py-3"
              : "bg-white/90 border-b border-black/5 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src={logoPic} alt="Logo" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border border-emerald-500/30" />
            <div className="flex flex-col">
              <span className="font-black tracking-tighter text-xl uppercase italic leading-none">
                Gulod<span className="text-emerald-600">Digital</span>
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-60">
                Official Government Portal
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest">
            <button onClick={() => scrollToSection("about")} className="hover:text-emerald-600 transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection("news")} className="hover:text-emerald-600 transition-colors">
              News
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-emerald-600 transition-colors">
              Contact
            </button>
            <button onClick={() => scrollToSection("services")} className="hover:text-emerald-600 transition-colors">
              Services
            </button>
            <div className={`h-6 w-[1px] mx-2 ${isDarkMode ? "bg-white/10" : "bg-slate-200"}`} />
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 transition-transform hover:scale-110"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-emerald-800" />
              )}
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="bg-emerald-700 text-white px-8 py-3 rounded-2xl hover:bg-emerald-800 transition-all shadow-xl active:scale-95"
            >
              Login
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border ${
                isDarkMode ? "border-white/10 bg-slate-900/70" : "border-black/10 bg-white/80"
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-emerald-800" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className={`p-2 rounded-xl border ${
                isDarkMode ? "border-white/10 bg-slate-900/70" : "border-black/10 bg-white/80"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className={`md:hidden border-t ${
              isDarkMode ? "bg-slate-900/95 border-white/10" : "bg-white/95 border-black/5"
            }`}
          >
            <div className="px-6 py-4 flex flex-col gap-3 text-xs font-black uppercase tracking-widest">
              <button onClick={() => scrollToSection("about")} className="text-left hover:text-emerald-600">
                About
              </button>
              <button onClick={() => scrollToSection("news")} className="text-left hover:text-emerald-600">
                News
              </button>
              <button onClick={() => scrollToSection("services")} className="text-left hover:text-emerald-600">
                Services
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-left hover:text-emerald-600">
                Contact
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/auth");
                }}
                className="mt-2 bg-emerald-700 text-white px-5 py-3 rounded-2xl text-center"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section
        id="about"
        className="relative min-h-screen min-h-[680px] md:min-h-[760px] pt-28 pb-24 md:pb-36 flex items-center justify-center overflow-hidden scroll-mt-24"
      >
        <div className="absolute inset-0 z-0">
          <img src={bsbPic} alt="Barangay Hall" className="w-full h-full object-cover scale-105" />
          <div className={`absolute inset-0 ${isDarkMode ? "bg-slate-950/80" : "bg-white/70"}`} />
          <div
            className={`absolute inset-0 bg-gradient-to-b from-transparent ${
              isDarkMode ? "to-slate-950" : "to-white"
            }`}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 ${
              isDarkMode ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-100 text-emerald-700"
            }`}
          >
            <Info size={14} /> District 5, Quezon City
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.82] mb-8 md:mb-10 italic">
            Serbisyong <br /> <span className="text-emerald-600 not-italic font-black">Gulod.</span>
          </h1>
          <p
            className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Welcome to the official digital home of Barangay Gulod. We are committed to transparency,
            efficiency, and a faster way to serve our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/auth")}
              className="px-12 py-6 bg-emerald-700 text-white rounded-[24px] font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-emerald-800 transition-all hover:-translate-y-1 active:scale-95"
            >
              Get Your Resident ID
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`px-12 py-6 border-2 rounded-[24px] font-black uppercase tracking-widest text-sm transition-all active:scale-95 ${
                isDarkMode
                  ? "bg-slate-900 border-white/10 hover:border-emerald-400"
                  : "bg-white border-slate-200 hover:border-emerald-500"
              }`}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* --- NEWS SECTION --- */}
      <section id="news" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-[12px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-3">
              Community News
            </h2>
            <h3 className="text-5xl font-black uppercase tracking-tighter leading-none">Latest Bulletin</h3>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="group relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl transition-transform hover:-translate-y-2">
            <div className="absolute inset-0 bg-slate-900/60 transition-all" />
            <div className="absolute top-8 left-8">
              <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Bell size={12} className="animate-pulse" /> Advisory
              </span>
            </div>
            <div className="absolute bottom-10 left-10 right-10 text-white">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">February 18, 2026</p>
              <h4 className="text-4xl font-black uppercase tracking-tight leading-none mb-4 group-hover:text-emerald-400">
                Clean-up Drive
              </h4>
              <p className="text-sm opacity-80">Join us this Saturday at 6:00 AM. Keep Gulod safe.</p>
            </div>
          </div>
          <div className="group relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl transition-transform hover:-translate-y-2">
            <div className="absolute inset-0 bg-emerald-900/60 transition-all" />
            <div className="absolute bottom-10 left-10 right-10 text-white">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">February 15, 2026</p>
              <h4 className="text-4xl font-black uppercase tracking-tight leading-none mb-4 group-hover:text-emerald-300">
                Digital Hub Open
              </h4>
              <p className="text-sm opacity-80">E-Services Portal is officially launched today.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section
        id="services"
        className={`py-24 px-6 scroll-mt-24 ${isDarkMode ? "bg-slate-900/50" : "bg-emerald-50/50"}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[12px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-4">
              Our Commitment
            </h2>
            <h3 className="text-5xl font-black uppercase tracking-tighter">Digital Transparency</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {services.map((service) => (
              <div key={service.title} className="group text-center">
                <div
                  className={`w-24 h-24 rounded-[32px] shadow-xl flex items-center justify-center mx-auto mb-8 transition-all group-hover:-rotate-6 group-hover:scale-110 ${
                    isDarkMode ? "bg-slate-800" : "bg-white"
                  } ${service.color}`}
                >
                  <service.icon size={36} />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4">{service.title}</h4>
                <p
                  className={`text-sm leading-relaxed max-w-xs mx-auto ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COUNCIL --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center">
        <h3 className="text-4xl font-black uppercase tracking-tighter mb-16 italic">
          The Barangay <span className="text-emerald-600">Council</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {[
            { name: "John Doe", role: "Chairman" },
            { name: "Jane Smith", role: "Kagawad" },
            { name: "Robert Fox", role: "Kagawad" },
            { name: "Arlene McCoy", role: "Secretary" },
            { name: "Cody Fisher", role: "SK Chair" },
          ].map((m, i) => (
            <div key={i}>
              <div
                className={`w-20 h-20 md:w-28 md:h-28 rounded-full mx-auto mb-4 border-4 border-emerald-500/20 ${
                  isDarkMode ? "bg-slate-800" : "bg-slate-200"
                }`}
              />
              <h5 className="font-black uppercase text-xs tracking-tighter">{m.name}</h5>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CONTACT & MAP --- */}
      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div
            className={`p-10 md:p-14 rounded-[48px] border ${
              isDarkMode ? "bg-slate-900 border-white/5" : "bg-white border-black/5 shadow-2xl"
            }`}
          >
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-8">
              Get in <span className="text-emerald-600">Touch</span>
            </h3>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  required
                  type="text"
                  placeholder="FULL NAME"
                  className={`w-full px-6 py-4 rounded-2xl border-2 outline-none transition-all text-xs font-bold uppercase tracking-widest ${
                    isDarkMode
                      ? "bg-black border-white/5 focus:border-emerald-500"
                      : "bg-slate-50 border-transparent focus:border-emerald-500"
                  }`}
                />
                <input
                  required
                  type="email"
                  placeholder="EMAIL"
                  className={`w-full px-6 py-4 rounded-2xl border-2 outline-none transition-all text-xs font-bold uppercase tracking-widest ${
                    isDarkMode
                      ? "bg-black border-white/5 focus:border-emerald-500"
                      : "bg-slate-50 border-transparent focus:border-emerald-500"
                  }`}
                />
              </div>
              <textarea
                required
                rows="4"
                placeholder="HOW CAN WE HELP?"
                className={`w-full px-6 py-4 rounded-2xl border-2 outline-none transition-all text-xs font-bold uppercase tracking-widest resize-none ${
                  isDarkMode
                    ? "bg-black border-white/5 focus:border-emerald-500"
                    : "bg-slate-50 border-transparent focus:border-emerald-500"
                }`}
              />
              <button
                disabled={formStatus !== "idle"}
                className="w-full py-5 bg-emerald-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all hover:bg-emerald-800 active:scale-95 disabled:opacity-50"
              >
                {formStatus === "idle" ? (
                  <>
                    <Send size={16} /> Send Message
                  </>
                ) : formStatus === "sending" ? (
                  "Sending..."
                ) : (
                  "Message Received!"
                )}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div
              className={`h-[400px] rounded-[48px] overflow-hidden border relative ${
                isDarkMode ? "bg-slate-900 border-white/10" : "bg-white border-black/5 shadow-lg"
              }`}
            >
              <iframe
                title="Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15438.745486968962!2d121.03666065!3d14.6738361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b71f92e92c6b%3A0xe549f31f928e4e9a!2sGulod%2C%20Quezon%20City%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
                className="w-full h-full grayscale opacity-70"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
              <div className="absolute bottom-6 right-6">
                <button
                  onClick={() => window.open(mapUrl, "_blank", "noopener,noreferrer")}
                  className="flex items-center gap-3 bg-white text-black px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl hover:bg-emerald-600 hover:text-white transition-all"
                >
                  <Navigation size={16} /> Open in Maps
                </button>
              </div>
            </div>
            <div
              className={`p-8 rounded-[32px] border flex gap-6 items-center ${
                isDarkMode ? "bg-slate-900 border-white/10" : "bg-white border-black/5 shadow-sm"
              }`}
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700">
                <Clock size={20} />
              </div>
              <div>
                <h5 className="font-black uppercase text-[10px] tracking-widest text-slate-400">Office Hours</h5>
                <p className="text-sm font-bold uppercase tracking-tighter">Mon - Fri: 8:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className={`py-20 px-6 border-t ${isDarkMode ? "border-white/10" : "border-black/5"}`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8 opacity-50">
              <img src={logoPic} alt="Logo" className="w-12 h-12 rounded-full object-cover border border-emerald-500/20 grayscale" />
              <span className="font-black text-2xl tracking-tighter uppercase italic">Gulod Digital</span>
            </div>
            <p className={`text-sm max-w-sm leading-relaxed mb-8 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              The official portal of Barangay Gulod, Quezon City. We aim to modernize community governance
              through accessible digital technology.
            </p>
            <div className="flex gap-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                  isDarkMode
                    ? "bg-slate-800 hover:bg-emerald-600 hover:text-white"
                    : "bg-slate-100 hover:bg-emerald-600 hover:text-white"
                }`}
              >
                <Globe size={18} />
              </div>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                  isDarkMode
                    ? "bg-slate-800 hover:bg-emerald-600 hover:text-white"
                    : "bg-slate-100 hover:bg-emerald-600 hover:text-white"
                }`}
              >
                <Mail size={18} />
              </div>
            </div>
          </div>
          <div>
            <h5
              className={`text-[11px] font-black uppercase tracking-widest mb-8 ${
                isDarkMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Official Links
            </h5>
            <ul className={`space-y-4 text-xs font-bold uppercase tracking-widest ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              <li className="hover:text-emerald-600 cursor-pointer">BDRRMC Advisory</li>
              <li className="hover:text-emerald-600 cursor-pointer">Local Ordinances</li>
            </ul>
          </div>
          <div>
            <h5
              className={`text-[11px] font-black uppercase tracking-widest mb-8 ${
                isDarkMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Contact Hall
            </h5>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="text-emerald-600" size={18} />
                <p className="text-xs font-bold leading-none uppercase tracking-widest">8-920-0000</p>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="text-emerald-600" size={18} />
                <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">
                  Brgy. Hall, Villareal St. <br /> Gulod, Quezon City
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`max-w-7xl mx-auto mt-20 pt-8 text-center border-t ${
            isDarkMode ? "border-white/10" : "border-black/5"
          }`}
        >
          <p
            className={`text-[10px] font-bold uppercase tracking-[0.3em] ${
              isDarkMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
            (c) 2026 Barangay Gulod - All Rights Reserved
          </p>
        </div>
      </footer>

      {/* --- BACK TO TOP --- */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-10 right-10 z-[150] p-4 bg-emerald-700 text-white rounded-2xl shadow-2xl hover:bg-emerald-800 transition-all hover:-translate-y-2"
        >
          <ArrowUp size={24} />
        </button>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        html { scroll-behavior: smooth; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }
      `,
        }}
      />
    </div>
  );
}
