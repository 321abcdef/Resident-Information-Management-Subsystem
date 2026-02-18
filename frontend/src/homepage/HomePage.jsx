import React, { useState, useEffect } from "react";
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
} from "lucide-react";

import bsbPic from "../assets/bgygulod.png";
import logoPic from "../assets/bgylogo.png";

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      }`}
    >
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
          <div className="flex items-center gap-3">
            <img src={logoPic} alt="Logo" className="w-10 h-10 lg:w-12 lg:h-12" />
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
            <a href="#about" className="hover:text-emerald-600 transition-colors">
              About
            </a>
            <a href="#news" className="hover:text-emerald-600 transition-colors">
              News
            </a>
            <a href="#services" className="hover:text-emerald-600 transition-colors">
              Services
            </a>
            <div className={`h-6 w-[1px] mx-2 ${isDarkMode ? "bg-white/10" : "bg-slate-200"}`} />
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2" aria-label="Toggle theme">
              {isDarkMode ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-emerald-800" />
              )}
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="bg-emerald-700 text-white px-8 py-3 rounded-2xl hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/20 active:scale-95"
            >
              Login/Register
            </button>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="md:hidden p-2 rounded-xl border border-black/10 bg-white/80"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-emerald-800" />
            )}
          </button>
        </div>
      </nav>

      <section id="about" className="relative h-screen min-h-[700px] pt-20 md:pt-20 flex items-center justify-center overflow-hidden">
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
              isDarkMode
                ? "bg-emerald-900/30 text-emerald-400"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            <Info size={14} /> District 5, Quezon City
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-10 italic">
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

      <section id="news" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-[12px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-3">
              Community News
            </h2>
            <h3 className="text-5xl font-black uppercase tracking-tighter leading-none">
              Latest from <br /> the Barangay
            </h3>
          </div>
          <p className={`max-w-xs text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
            Stay updated with official announcements, health advisories, and upcoming events.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="group relative h-[450px] rounded-[40px] overflow-hidden border border-black/5 shadow-2xl transition-transform hover:-translate-y-2">
            <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-all" />
            <div className="absolute top-8 left-8">
              <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Bell size={12} className="animate-pulse" /> Advisory
              </span>
            </div>
            <div className="absolute bottom-10 left-10 right-10 text-white">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">February 18, 2026</p>
              <h4 className="text-4xl font-black uppercase tracking-tight leading-none mb-4 group-hover:text-emerald-400 transition-colors">
                Clean-up Drive and Dengue Awareness
              </h4>
              <p className="text-sm opacity-80 max-w-md">
                Join us this Saturday at 6:00 AM. Let&apos;s keep Gulod clean and safe for our families.
              </p>
            </div>
          </div>

          <div className="group relative h-[450px] rounded-[40px] overflow-hidden border border-black/5 shadow-2xl transition-transform hover:-translate-y-2">
            <div className="absolute inset-0 bg-emerald-900/60 group-hover:bg-emerald-900/40 transition-all" />
            <div className="absolute bottom-10 left-10 right-10 text-white">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">February 15, 2026</p>
              <h4 className="text-4xl font-black uppercase tracking-tight leading-none mb-4 group-hover:text-emerald-300 transition-colors">
                New Digital Hub Now Open
              </h4>
              <p className="text-sm opacity-80 max-w-md">
                The Brgy. Gulod E-Services Portal is officially launched for online document processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className={`py-24 px-6 ${isDarkMode ? "bg-slate-900/50" : "bg-emerald-50/50"}`}>
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
                <p className={`text-sm leading-relaxed max-w-xs mx-auto ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className={`py-20 px-6 border-t ${isDarkMode ? "border-white/10" : "border-black/5"}`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8 opacity-50">
              <img src={logoPic} alt="Logo" className="w-12 h-12 grayscale" />
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
            <h5 className={`text-[11px] font-black uppercase tracking-widest mb-8 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
              Official Links
            </h5>
            <ul className={`space-y-4 text-xs font-bold uppercase tracking-widest ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              <li className="hover:text-emerald-600 transition-colors cursor-pointer">BDRRMC Advisory</li>
              <li className="hover:text-emerald-600 transition-colors cursor-pointer">Local Ordinances</li>
              <li className="hover:text-emerald-600 transition-colors cursor-pointer">Public Records</li>
            </ul>
          </div>

          <div>
            <h5 className={`text-[11px] font-black uppercase tracking-widest mb-8 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
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
        <div className={`max-w-7xl mx-auto mt-20 pt-8 text-center ${isDarkMode ? "border-t border-white/10" : "border-t border-black/5"}`}>
          <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
            (c) 2026 Barangay Gulod - All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
