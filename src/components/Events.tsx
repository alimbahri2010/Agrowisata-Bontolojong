import React from "react";
import { TrailEvent } from "../types";
import { Calendar, Users, Tag } from "lucide-react";

interface EventsProps {
  events: TrailEvent[];
  onJoinEvent: (event: TrailEvent) => void;
}

export default function Events({ events, onJoinEvent }: EventsProps) {
  
  const getCategoryClass = (cat: typeof events[0]["category"]) => {
    switch (cat) {
      case "Camping":
        return "bg-amber-100 text-amber-900 border-amber-200";
      case "Hiking":
        return "bg-emerald-100 text-emerald-900 border-emerald-200";
      case "Community":
        return "bg-blue-100 text-blue-900 border-blue-200";
      case "Photography":
        return "bg-purple-100 text-purple-900 border-purple-200";
    }
  };

  const getCategoryLabel = (cat: typeof events[0]["category"]) => {
    switch (cat) {
      case "Camping":
        return "Perkemahan";
      case "Hiking":
        return "Pendakian";
      case "Community":
        return "Komunitas";
      case "Photography":
        return "Fotografi";
      default:
        return cat;
    }
  };

  const formatDateString = (dt: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dt).toLocaleDateString("id-ID", options);
    } catch {
      return dt;
    }
  };

  return (
    <section id="events" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center gap-3 justify-center mb-2">
            <div className="h-[1px] w-8 bg-mustard"></div>
            <span className="text-mustard text-xs font-mono uppercase tracking-[0.2em] font-semibold">
              KOMUNITAS & KEGIATAN ALAM
            </span>
            <div className="h-[1px] w-8 bg-mustard"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display text-charcoal tracking-tight uppercase">
            AGENDA KEGIATAN MENDATANG
          </h2>
          <p className="mt-4 text-charcoal/70 font-sans text-sm max-w-xl mx-auto font-light leading-relaxed">
            Ikuti petualangan bersama dalam safari fotografi fajar, malam pengamatan hujan meteor, serta program penanaman dan pemeliharaan jalur hutan hayati.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-mustard to-tangerine mx-auto mt-4 rounded-full" />
        </div>

        {/* Events Layout Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="events-grid-layout">
          {events.map((evt) => {
            const seatsLeft = Math.max(0, evt.capacity - evt.registeredCount);
            const percentFilled = Math.min(100, (evt.registeredCount / evt.capacity) * 100);

            return (
              <div
                key={evt.id}
                className="group bg-cream/10 hover:bg-cream/50 rounded-2xl border border-white/40 card-shadow hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Event Image Banner */}
                <div className="relative overflow-hidden aspect-video bg-slate-100">
                  <img
                    src={evt.imageUrl}
                    alt={evt.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-2.5 py-0.5 border text-[10px] font-mono font-bold uppercase tracking-wider rounded-md shadow-sm ${getCategoryClass(evt.category)}`}>
                      {getCategoryLabel(evt.category)}
                    </span>
                  </div>

                  {/* Date badge */}
                  <div className="absolute bottom-4 left-4 bg-slate-950/75 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg flex items-center space-x-1.5 border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-mustard animate-pulse-soft" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{formatDateString(evt.date)}</span>
                  </div>
                </div>

                {/* Event text body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-display text-charcoal group-hover:text-tangerine transition-colors line-clamp-2 leading-snug mb-3 uppercase tracking-tight">
                      {evt.title}
                    </h3>
                    
                    <p className="text-slate-600 font-sans text-xs leading-relaxed line-clamp-3 mb-5 font-light">
                      {evt.description}
                    </p>
                  </div>

                  {/* Seat availability HUD */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-mono mb-1.5 text-slate-500">
                        <span className="flex items-center space-x-1">
                          <Users className="w-3.5 h-3.5 text-brown" />
                          <span>Terdaftar: {evt.registeredCount}/{evt.capacity} peserta</span>
                        </span>
                        <span className="font-semibold text-brown">Tersisa {seatsLeft} kuota</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
                        <div
                          className="h-full bg-gradient-to-r from-mustard to-tangerine rounded-full transition-all duration-500"
                          style={{ width: `${percentFilled}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Tag className="w-4 h-4 text-tangerine" />
                        <span className="text-lg font-display text-charcoal leading-none">
                          {evt.price === 0 ? "GRATIS" : `$${evt.price}`}
                        </span>
                        {evt.price > 0 && <span className="text-[10px] text-slate-400 uppercase font-mono">/ orang</span>}
                      </div>

                      <button
                        disabled={seatsLeft === 0}
                        onClick={() => onJoinEvent(evt)}
                        className={`font-sans text-xs font-bold uppercase tracking-widest py-2.5 px-4.5 rounded-full border transition-all ${
                          seatsLeft === 0
                            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                            : "bg-charcoal hover:bg-brown text-white border-transparent shadow hover:shadow-lg"
                        }`}
                      >
                        {seatsLeft === 0 ? "KUOTA PENUH" : "DAFTAR SEKARANG"}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
