import React from "react";
import { motion } from "motion/react";
import { ArrowDown, Mountain, Map } from "lucide-react";

interface HeroProps {
  logoName: string;
  tagline: string;
  setView: (view: "landing" | "booking" | "login" | "dashboard") => void;
  scrollToSection: (id: string) => void;
  openAdminDirectly?: () => void;
}

export default function Hero({ logoName, tagline, setView, scrollToSection }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFF8EF]"
    >
      {/* Immersive Parallax & Animated Background Layers */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80"
          alt="Bontolojong Mountains Backdrop"
          className="w-full h-full object-cover object-bottom filter brightness-75 select-none"
        />
        {/* Soft Warm Sunset Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8EF] via-slate-900/40 to-slate-900/60 mix-blend-multiply" />
      </div>

      {/* Floating Animated Fog Clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-35">
        <div className="absolute -left-1/4 bottom-1/4 w-full h-[300px] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-3xl animate-pulse" />
        <div className="absolute -right-1/4 bottom-1/3 w-full h-[250px] bg-gradient-to-l from-transparent via-orange-100/30 to-transparent blur-3xl animate-pulse duration-1000" />
      </div>

      {/* Hero Central Branding */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-flex flex-col items-center mb-6"
        >
          <div className="flex items-center gap-3 mb-2 justify-center">
            <div className="h-[1.5px] w-10 bg-mustard" />
            <span className="text-mustard text-xs sm:text-sm font-bold tracking-[0.3em] uppercase">
              EST. 2024 • SULAWESI SELATAN
            </span>
            <div className="h-[1.5px] w-10 bg-mustard" />
          </div>

        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
          className="font-display text-5xl sm:text-7xl md:text-[100px] text-white tracking-tighter leading-[0.95] uppercase drop-shadow-2xl text-center"
        >
          {logoName.split(" ").map((word, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {word === "Bontolojong" || word === "BONTOLOJONG" ? (
                <span className="gradient-text">{word}</span>
              ) : (
                <span>{word}</span>
              )}
            </React.Fragment>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="mt-6 font-sans text-sm sm:text-base md:text-xl text-amber-50 uppercase tracking-[0.3em] font-medium max-w-2xl mx-auto drop-shadow-md text-center"
        >
          {tagline}
        </motion.p>

        {/* Action Widgets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.0 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection("trails")}
            className="w-full sm:w-auto font-sans text-sm font-bold uppercase tracking-wider text-charcoal bg-white/95 hover:bg-cream border border-mustard/25 px-8 py-4 rounded-xl shadow-2xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Map className="w-4 h-4 text-tangerine" />
            <span>Jelajahi Jalur</span>
          </button>

          <button
            onClick={() => setView("booking")}
            className="w-full sm:w-auto font-sans text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-mustard to-tangerine hover:from-tangerine hover:to-mustard px-8 py-4 rounded-xl shadow-2xl shadow-tangerine/10 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Mountain className="w-5 h-5" />
            <span>Pesan Petualangan</span>
          </button>
        </motion.div>

        {/* Quick features summary strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 1.2, duration: 1.0 }}
          className="mt-16 max-w-3xl mx-auto grid grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-950/40 backdrop-blur-lg border border-white/10 text-white select-none text-center"
        >
          <div>
            <span className="block text-xl md:text-2xl font-bold text-mustard">1.450m</span>
            <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-300">Tinggi Puncak</span>
          </div>
          <div className="border-x border-white/10">
            <span className="block text-xl md:text-2xl font-bold text-tangerine">3+ Jalur</span>
            <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-300">Rute Sesuai Pilihan</span>
          </div>
          <div>
            <span className="block text-xl md:text-2xl font-bold text-green">100%</span>
            <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-300">Konservasi Alami</span>
          </div>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={() => scrollToSection("about")}
          className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 transition-all animate-bounce cursor-pointer"
        >
          <ArrowDown className="w-5 h-5 text-amber-100" />
        </button>
      </div>
    </section>
  );
}
