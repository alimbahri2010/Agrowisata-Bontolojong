import React, { useState } from "react";
import { HikingTrail, WeatherInfo } from "../types";
import { AlertOctagon, Footprints, ShieldAlert, Check, X, ArrowUpRight } from "lucide-react";
import WeatherWidget from "./WeatherWidget";

interface HikingTrailsProps {
  trails: HikingTrail[];
  weather: WeatherInfo;
  onBookNow: (trailName: string, category: string) => void;
}

export default function HikingTrails({ trails, weather, onBookNow }: HikingTrailsProps) {
  const [activeFilter, setActiveFilter] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All");

  const filteredTrails = trails.filter(
    (t) => activeFilter === "All" || t.difficulty === activeFilter
  );

  const getDifficultyBadge = (diff: typeof trails[0]["difficulty"]) => {
    switch (diff) {
      case "Beginner":
        return "text-emerald-700 bg-emerald-50 border-emerald-100";
      case "Intermediate":
        return "text-amber-700 bg-amber-50 border-amber-100";
      case "Advanced":
        return "text-rose-700 bg-rose-50 border-rose-100";
    }
  };

  const getStatusBadge = (status: typeof trails[0]["status"]) => {
    switch (status) {
      case "Open":
        return "text-emerald-700 bg-emerald-100 ring-2 ring-emerald-50";
      case "Maintenance":
        return "text-amber-700 bg-amber-100 ring-2 ring-amber-50";
      case "Closed":
        return "text-rose-700 bg-rose-100 ring-2 ring-rose-50";
    }
  };

  const difficultiesInBahasa: Record<string, string> = {
    All: "Semua Tingkat",
    Beginner: "Pemula",
    Intermediate: "Menengah",
    Advanced: "Mahir"
  };

  const statusInBahasa: Record<string, string> = {
    Open: "Buka",
    Maintenance: "Perbaikan",
    Closed: "Tutup"
  };

  const safetyRules = [
    { text: "Selalu berjalan di lintasan batas kehutanan resmi. Melanggar jalur berisiko tergelincir di lereng curam gembur.", icon: <AlertOctagon className="w-4 h-4 text-[#F28C28]" /> },
    { text: "Pastikan daya baterai gawai Anda penuh. Punggungan bukit memiliki sinyal, tetapi dasar ngarai kerap terhalang.", icon: <ShieldAlert className="w-4 h-4 text-emerald-600" /> },
    { text: "Bawa pakaian hangat berlapis. Angin kencang di punggungan bukit dapat menurunkan suhu hingga 8°C dalam sekejap.", icon: <AlertOctagon className="w-4 h-4 text-[#D4A017]" /> },
    { text: "Hargai petani lokal; dilarang keras memetik buah-buahan kebun hortikultura atau daun teh tanpa izin langsung.", icon: <Footprints className="w-4 h-4 text-[#7A4E2D]" /> }
  ];

  return (
    <section id="trails" className="py-24 bg-cream/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center gap-3 justify-center mb-2">
            <div className="h-[1px] w-8 bg-mustard"></div>
            <span className="text-mustard text-xs font-mono uppercase tracking-[0.2em] font-semibold">
              KONDISI TOPOGRAFI BONTOLOJONG
            </span>
            <div className="h-[1px] w-8 bg-mustard"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display text-charcoal tracking-tight uppercase">
            EKSPEDISI JALUR PENDAKIAN
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-mustard to-tangerine mx-auto mt-4 rounded-full" />
        </div>

        {/* Trail Layout Grid (Split Sidebar for weather + details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Weather and Safety Panel */}
          <div className="lg:col-span-4 space-y-6">
            <WeatherWidget weather={weather} />

            {/* Safety Guidelines Card */}
            <div className="bg-white rounded-2xl p-6 border border-white/40 shadow-sm hover:card-shadow transition-all duration-300">
              <h4 className="font-display text-brown text-base uppercase tracking-tight mb-4 flex items-center space-x-2">
                <span>⚠️ TIPS KESELAMATAN JALUR</span>
              </h4>
              <div className="space-y-4 text-xs font-sans text-slate-700">
                {safetyRules.map((rule, idx) => (
                  <div key={idx} className="flex items-start space-x-3 bg-cream/30 p-3 rounded-xl border border-mustard/10 leading-relaxed">
                    <span className="shrink-0 mt-0.5">{rule.icon}</span>
                    <p>{rule.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Active Trails Filter + List */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Nav Filter */}
            <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-cream/80" id="trail-level-filters">
              {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setActiveFilter(lvl)}
                  className={`px-4.5 py-2 rounded-full text-xs font-bold font-sans uppercase tracking-[0.1em] transition-all duration-300 cursor-pointer ${
                    activeFilter === lvl
                      ? "bg-charcoal text-white shadow-md border-transparent"
                      : "bg-[#FFF8EF] hover:bg-[#ffe1bf] text-slate-700 border border-mustard/15"
                  }`}
                >
                  Jalur {difficultiesInBahasa[lvl]}
                </button>
              ))}
            </div>

            {/* Trail Cards Collection */}
            <div className="space-y-6" id="trails-layout-cards">
              {filteredTrails.map((trail) => (
                <div
                  key={trail.id}
                  className="bg-white rounded-2xl border border-white/40 p-6 card-shadow hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row gap-6 justify-between items-stretch"
                >
                  
                  {/* Trail SVG topographic path simulator */}
                  <div className="w-full md:w-1/3 min-h-[140px] bg-slate-950 rounded-xl relative flex flex-col justify-between overflow-hidden p-4 text-amber-50 shadow-inner">
                    <div className="flex justify-between items-center z-10">
                      <span className="text-[10px] font-mono tracking-widest text-mustard uppercase font-semibold">LINTASAN GPS</span>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${getStatusBadge(trail.status)}`}>
                        {statusInBahasa[trail.status] || trail.status}
                      </span>
                    </div>

                    {/* Animated Route Line */}
                    <div className="absolute inset-0 flex items-center justify-center p-6 bg-slate-900/60 opacity-90">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-slate-800" strokeWidth="2">
                        {/* Grids */}
                        <line x1="10" y1="0" x2="10" y2="100" stroke="#1f2937" strokeDasharray="2" />
                        <line x1="30" y1="0" x2="30" y2="100" stroke="#1f2937" strokeDasharray="2" />
                        <line x1="50" y1="0" x2="50" y2="100" stroke="#1f2937" strokeDasharray="2" />
                        <line x1="70" y1="0" x2="70" y2="100" stroke="#1f2937" strokeDasharray="2" />
                        <line x1="90" y1="0" x2="90" y2="100" stroke="#1f2937" strokeDasharray="2" />
                        
                        {/* Elevation Route */}
                        <path
                          d={trail.trailMapUrl}
                          fill="none"
                          stroke={trail.difficulty === "Beginner" ? "#10b981" : trail.difficulty === "Intermediate" ? "#f59e0b" : "#f43f5e"}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                        {/* Start Tracker Dot */}
                        <circle cx="10" cy="90" r="4" fill="#3b82f6" />
                        {/* Active Tracker Dot */}
                        <circle cx="95" cy="15" r="4" fill="#ef4444" className="animate-ping" />
                      </svg>
                    </div>

                    <div className="z-10 flex justify-between items-baseline">
                      <span className="text-2xl font-bold font-sans tracking-tight text-white">{trail.distance}</span>
                      <span className="text-xs font-mono text-slate-400">Jarak Total</span>
                    </div>
                  </div>

                  {/* Trail Texts Block */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-[10px] font-mono tracking-wider font-bold uppercase px-2 py-0.5 rounded border ${getDifficultyBadge(trail.difficulty)}`}>
                          Jalur {difficultiesInBahasa[trail.difficulty] || trail.difficulty}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">• {trail.weatherCondition}</span>
                      </div>
                      
                      <h3 className="text-xl font-display text-charcoal uppercase tracking-tight mb-2">
                        {trail.name}
                      </h3>
                      
                      <p className="text-slate-600 font-sans text-xs leading-relaxed font-light">
                        {trail.description}
                      </p>
                    </div>

                    {/* Stats HUD layout */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center font-mono">
                      <div className="p-2 bg-[#FFF8EF]/80 rounded-lg">
                        <span className="block text-[8px] text-brown uppercase font-bold">Estimasi</span>
                        <span className="text-xs font-bold font-sans text-slate-900">{trail.duration}</span>
                      </div>
                      <div className="p-2 bg-[#FFF8EF]/80 rounded-lg">
                        <span className="block text-[8px] text-brown uppercase font-bold">Tinggi Tanjakan</span>
                        <span className="text-xs font-bold font-sans text-slate-900">{trail.elevationGain}</span>
                      </div>
                      <div className="p-2 bg-[#FFF8EF]/80 rounded-lg">
                        <span className="block text-[8px] text-brown uppercase font-bold">Butuh Pemandu</span>
                        <span className="text-xs font-bold font-sans text-slate-900 flex items-center justify-center space-x-0.5">
                          {trail.guideRequired ? (
                            <span className="text-tangerine flex items-center gap-0.5">Ya <Check className="w-3 h-3 text-amber-500 inline" /></span>
                          ) : (
                            <span className="text-emerald-700 flex items-center gap-0.5">Tidak <X className="w-3 h-3 text-red-400 inline" /></span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Trail Booking Button Column */}
                  <div className="md:w-1/6 flex md:flex-col justify-center items-stretch gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-4">
                    <button
                      disabled={trail.status === "Closed"}
                      onClick={() => onBookNow(trail.name, "Trail Hiking")}
                      className={`w-full py-3 md:h-full font-sans text-xs font-extrabold uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        trail.status === "Closed"
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-charcoal hover:bg-brown text-white hover:shadow-lg"
                      }`}
                    >
                      <span>PESAN</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
