import React, { useState, useEffect } from "react";
import { Trees, Calendar, ShieldAlert, Menu, X, Mountain, Compass, Sun, Leaf } from "lucide-react";

interface NavbarProps {
  currentView: "landing" | "booking" | "login" | "dashboard";
  setView: (view: "landing" | "booking" | "login" | "dashboard") => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  logoName?: string;
  logoImageUrl?: string;
  logoShape?: string;
  tagline?: string;
}

export default function Navbar({
  currentView,
  setView,
  activeSection,
  setActiveSection,
  logoName = "AGROWISATA BONTOLOJONG",
  logoImageUrl = "",
  logoShape = "mountain",
  tagline = "EXPLORE NATURE • FEEL THE ADVENTURE"
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Beranda", id: "home" },
    { label: "Tentang Kami", id: "about" },
    { label: "Destinasi", id: "destinations" },
    { label: "Jalur Pendakian", id: "trails" },
    { label: "SOP Pendakian", id: "sop" },
    { label: "Galeri", id: "gallery" },
    { label: "Agenda", id: "events" },
    { label: "Ulasan", id: "testimonials" },
    { label: "Kontak", id: "contact" },
  ];

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentView !== "landing") {
      setView("landing");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(sectionId);
  };

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || currentView !== "landing"
          ? "bg-white/80 backdrop-blur-md shadow-md border-b border-orange-100 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Brand Logo */}
        <div
          id="nav-logo"
          onClick={() => {
            setView("landing");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-[#D4A017] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform overflow-hidden">
            {logoImageUrl ? (
              <img
                src={logoImageUrl}
                alt="Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              (() => {
                const className = "w-5 h-5 text-white";
                switch (logoShape) {
                  case "tree":
                    return <Trees className={className} />;
                  case "compass":
                    return <Compass className={className} />;
                  case "sun":
                    return <Sun className={className} />;
                  case "leaf":
                    return <Leaf className={className} />;
                  case "mountain":
                  default:
                    return <Mountain className={className} />;
                }
              })()
            )}
          </div>
          <div className="text-left font-sans">
            <span className={`font-sans font-bold text-sm tracking-tight uppercase block leading-none transition-colors duration-200 ${
              isScrolled || currentView !== "landing" ? "text-charcoal" : "text-white"
            }`}>
              {logoName}
            </span>
            <span className={`font-mono text-[8px] uppercase tracking-widest block mt-1 transition-colors duration-200 ${
              isScrolled || currentView !== "landing" ? "text-[#7A4E2D]" : "text-white"
            }`}>
              {tagline}
            </span>
          </div>
        </div>

        {/* Desktop nav list */}
        {currentView === "landing" && (
          <div className="hidden lg:flex items-center space-x-6" id="desktop-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-sans text-xs font-semibold uppercase tracking-widest transition-colors relative pb-1 cursor-pointer ${
                  activeSection === item.id
                    ? "text-mustard"
                    : isScrolled || currentView !== "landing"
                      ? "text-slate-700 hover:text-mustard"
                      : "text-white hover:text-mustard"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-mustard to-tangerine rounded-full" />
                )}
              </button>
            ))}
          </div>
        )}

        {currentView !== "landing" && (
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => setView("landing")}
              className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              ← Kembali ke Beranda Utama
            </button>
          </div>
        )}

        {/* Call to actions */}
        <div className="hidden md:flex items-center space-x-3" id="nav-actions">
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center md:hidden" id="nav-mobile-toggle">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-700 hover:text-[#F28C28] p-2 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-xl py-4 px-6 animate-fade-in" id="mobile-drawer">
          {currentView === "landing" && (
            <div className="flex flex-col space-y-3.5 pt-2 pb-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left font-sans text-base font-medium py-1.5 cursor-pointer ${
                    activeSection === item.id ? "text-mustard border-l-2 border-mustard pl-2" : "text-slate-700 pl-2"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {currentView !== "landing" && (
            <button
              onClick={() => {
                setView("landing");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left font-sans text-sm font-semibold text-brown py-2 cursor-pointer"
            >
              ← Kembali ke Beranda Utama
            </button>
          )}

          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
            <button
              onClick={() => {
                setView("booking");
                setMobileMenuOpen(false);
              }}
              className="w-full text-center font-sans text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-mustard to-tangerine py-2.5 rounded-full shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Calendar className="w-4.5 h-4.5" />
              <span>Pesan Sekarang</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
