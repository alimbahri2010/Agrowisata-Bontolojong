import React, { useState } from "react";
import { Destination } from "../types";
import { MapPin, Compass, Eye, X, Calendar } from "lucide-react";

interface DestinationsProps {
  destinations: Destination[];
  onBookNow: (destName: string, category: string) => void;
}

export default function Destinations({ destinations, onBookNow }: DestinationsProps) {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  const getDifficultyColor = (diff: typeof destinations[0]["difficulty"]) => {
    switch (diff) {
      case "Easy":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Challenging":
        return "bg-rose-100 text-rose-800 border-rose-200";
    }
  };

  const categoriesInBahasa: Record<string, string> = {
    Hill: "Bukit",
    "Sunrise Area": "Area Matahari Terbit",
    Viewpoint: "Titik Pandang",
    Waterfall: "Air Terjun",
    Campsite: "Perkemahan",
    "Photo Spot": "Spot Foto"
  };

  const difficultiesInBahasa: Record<string, string> = {
    Easy: "Mudah",
    Medium: "Sedang",
    Challenging: "Menantang"
  };

  return (
    <section id="destinations" className="py-24 bg-cream/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center gap-3 justify-center mb-2">
            <div className="h-[1px] w-8 bg-mustard"></div>
            <span className="text-mustard text-xs font-mono uppercase tracking-[0.2em] font-semibold">
              PILIH PETUALANGAN INDAH ANDA
            </span>
            <div className="h-[1px] w-8 bg-mustard"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display text-charcoal tracking-tight uppercase">
            JELAJAHI SPOT DESTINASI ALAM
          </h2>
          <p className="mt-4 text-charcoal/70 font-sans text-sm max-w-xl mx-auto font-light leading-relaxed">
            Mulai dari perbukitan pinus berkabut tebal hingga ngarai air dingin alami yang asri. Setiap sudut menyuguhkan panorama fajar memikat, ketinggian sejuk, dan rute berjalan terbaik.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-mustard to-tangerine mx-auto mt-4 rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-2xl overflow-hidden border border-white/40 card-shadow hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image Block */}
              <div className="relative overflow-hidden aspect-[4/3] w-full bg-slate-100">
                <img
                  src={dest.imageUrl}
                  alt={dest.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Image Overlay HUD */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <span className="px-3 py-1 bg-white/[0.9] backdrop-blur-sm text-[10px] font-mono font-bold text-brown uppercase tracking-wider rounded-md border border-white/20 shadow-sm">
                    {categoriesInBahasa[dest.category] || dest.category}
                  </span>
                  
                  <span className={`px-2.5 py-0.5 border text-[10px] font-mono font-bold uppercase tracking-wider rounded-md shadow-sm ${getDifficultyColor(dest.difficulty)}`}>
                    {difficultiesInBahasa[dest.difficulty] || dest.difficulty}
                  </span>
                </div>

                {/* Altitude Floating tag */}
                <div className="absolute bottom-4 right-4 bg-slate-950/75 backdrop-blur-sm text-[10px] font-mono font-medium text-amber-50 px-2.5 py-1 rounded-md">
                  {dest.elevation}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1 text-brown mb-2 text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 shrink-0 animate-pulse-soft" />
                    <span>{dest.location}</span>
                  </div>
                  
                  <h3 className="text-xl font-display text-charcoal group-hover:text-tangerine transition-colors mb-2 uppercase tracking-tight">
                    {dest.title}
                  </h3>
                  
                  <p className="text-slate-600 font-sans text-xs leading-relaxed line-clamp-3">
                    {dest.description}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedDest(dest)}
                    className="flex-1 font-sans text-xs font-bold uppercase tracking-wider py-2.5 rounded-full border border-slate-200 hover:border-mustard hover:bg-cream/40 text-slate-700 hover:text-brown transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Detail</span>
                  </button>
                  
                  <button
                    onClick={() => onBookNow(dest.title, dest.category)}
                    className="flex-1 font-sans text-xs font-bold uppercase tracking-wider py-2.5 rounded-full bg-gradient-to-r from-mustard to-tangerine hover:from-tangerine hover:to-mustard text-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <Compass className="w-4 h-4 animate-spin-slow" />
                    <span>Ekspedisi</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal Overlay */}
      {selectedDest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-white/30 shadow-2xl relative animate-scale-up">
            
            <button
              onClick={() => setSelectedDest(null)}
              className="absolute top-4 right-4 p-2.5 bg-slate-900/10 hover:bg-slate-900/20 text-slate-700 hover:text-slate-950 rounded-full transition-all z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image banner */}
            <div className="relative h-64 w-full bg-slate-100">
              <img
                src={selectedDest.imageUrl}
                alt={selectedDest.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#D4A017]">
                  Spot {categoriesInBahasa[selectedDest.category] || selectedDest.category}
                </span>
                <h3 className="text-3xl font-display uppercase text-white tracking-tight leading-none mt-1">
                  {selectedDest.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="grid grid-cols-3 gap-3 text-center mb-6">
                <div className="p-3 bg-[#FFF8EF]/80 rounded-xl border border-mustard/15">
                  <span className="block text-[10px] font-mono text-brown uppercase tracking-wider mb-1 font-semibold">Tinggi</span>
                  <span className="text-sm font-sans font-bold text-slate-900">{selectedDest.elevation}</span>
                </div>
                <div className="p-3 bg-[#FFF8EF]/80 rounded-xl border border-mustard/15">
                  <span className="block text-[10px] font-mono text-brown uppercase tracking-wider mb-1 font-semibold">Kesulitan</span>
                  <span className="text-sm font-sans font-bold text-slate-900">{difficultiesInBahasa[selectedDest.difficulty] || selectedDest.difficulty}</span>
                </div>
                <div className="p-3 bg-[#FFF8EF]/80 rounded-xl border border-mustard/15">
                  <span className="block text-[10px] font-mono text-brown uppercase tracking-wider mb-1 font-semibold">Zona</span>
                  <span className="text-sm font-sans font-bold text-slate-900">{selectedDest.location.split(" ")[0]}</span>
                </div>
              </div>

              <span className="text-xs uppercase font-mono tracking-widest text-brown font-bold block mb-2">Keterangan Spot</span>
              <p className="text-slate-600 font-sans text-sm leading-relaxed mb-6 font-light">
                {selectedDest.description}
              </p>

              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100/80 text-xs text-amber-900 font-sans leading-relaxed flex items-center space-x-3 mb-6">
                <span className="text-xl">🎒</span>
                <p>
                  <strong>Persiapan:</strong> Wajib memakai alas kaki dengan sol khusus pendakian bukit yang kokoh. Harap bawa botol minum sendiri, jaket hangat penolak angin, serta kamera saku untuk merekam refleksi fajar.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedDest(null)}
                  className="flex-1 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer"
                >
                  Tutup Jendela
                </button>
                <button
                  onClick={() => {
                    const dName = selectedDest.title;
                    const dCat = selectedDest.category;
                    setSelectedDest(null);
                    onBookNow(dName, dCat);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-mustard to-tangerine hover:from-tangerine hover:to-mustard text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-tangerine/10 transition-all text-center flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reservasi Ekspedisi</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
