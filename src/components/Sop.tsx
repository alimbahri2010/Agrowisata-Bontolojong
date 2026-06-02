import React, { useState } from "react";
import {
  ShieldAlert,
  Trash2,
  Clock,
  CheckCircle,
  AlertTriangle,
  Flame,
  UserCheck,
  Users,
  Backpack,
  Thermometer,
  CloudRain,
  Eye,
  Heart,
  Droplet,
  HeartHandshake,
  FileCheck,
  Ban,
  Heater,
  Tent
} from "lucide-react";
import { SystemSettings } from "../types";

// Helper dynamically resolves gear icons based on keywords
const getGearIcon = (name: string) => {
  const cn = "w-6 h-6 text-[#7A4E2D]";
  const lower = name.toLowerCase();
  if (lower.includes("carrier") || lower.includes("tas") || lower.includes("backpack") || lower.includes("daypack")) return <Backpack className={cn} />;
  if (lower.includes("jaket") || lower.includes("dingin") || lower.includes("suhu") || lower.includes("hangat")) return <Thermometer className={cn} />;
  if (lower.includes("sepatu") || lower.includes("gunung") || lower.includes("alas footprint")) return <CheckCircle className={cn} />;
  if (lower.includes("jas") || lower.includes("hujan") || lower.includes("raincoat")) return <CloudRain className={cn} />;
  if (lower.includes("senter") || lower.includes("lampu") || lower.includes("headlamp") || lower.includes("penerangan")) return <Clock className={cn} />;
  if (lower.includes("air") || lower.includes("logistik") || lower.includes("minum") || lower.includes("makan")) return <Droplet className={cn} />;
  if (lower.includes("obat") || lower.includes("p3k") || lower.includes("medis") || lower.includes("perban")) return <Heart className={cn} />;
  if (lower.includes("sampah") || lower.includes("trash") || lower.includes("kantong hitam")) return <Trash2 className={cn} />;
  if (lower.includes("flysheet") || lower.includes("tenda") || lower.includes("shelter") || lower.includes("canopy")) return <Tent className={cn} />;
  if (lower.includes("blanket") || lower.includes("selimut") || lower.includes("thermal") || lower.includes("foil") || lower.includes("panas")) return <Heater className={cn} />;
  return <Backpack className={cn} />;
};

// Helper dynamically resolves ethics icons
const getEthicsIcon = (iconName: string, title?: string) => {
  const name = (iconName || title || "").toLowerCase();
  if (name.includes("merusak") || name.includes("miras") || name.includes("alkohol") || name.includes("narkoba") || name.includes("larang") || name.includes("ban")) return <Ban className="w-5 h-5 text-rose-500" />;
  if (name.includes("api") || name.includes("bakar") || name.includes("flame") || name.includes("kebakaran")) return <Flame className="w-5 h-5 text-[#E0A926]" />;
  if (name.includes("etika") || name.includes("sopan") || name.includes("hormat") || name.includes("handshake") || name.includes("tertib") || name.includes("warga") || name.includes("damai")) return <HeartHandshake className="w-5 h-5 text-emerald-500" />;
  if (name.includes("selamat") || name.includes("aman") || name.includes("puncak") || name.includes("nyawa") || name.includes("shield") || name.includes("alert")) return <ShieldAlert className="w-5 h-5 text-blue-500" />;
  return <ShieldAlert className="w-5 h-5 text-blue-500" />;
};

interface SopProps {
  gears: any[];
  generalRules: any[];
  wasteRules: any[];
  ethicsRules: any[];
  penalties: any[];
  settings: SystemSettings;
}

export default function Sop({ gears, generalRules, wasteRules, ethicsRules, penalties, settings }: SopProps) {
  const [activeTab, setActiveTab] = useState<"perlengkapan" | "ketentuan" | "sampah" | "etika" | "sanksi" >("perlengkapan");

  const simaksiHours = settings.sopSimaksiHours || "07.00 - 17.30 WITA";
  const maxAscentHours = settings.sopMaxAscentHours || "15.00 WITA";
  const checkoutDesc = settings.sopCheckoutDesc || "Wajib Check-Out dan melapor kembali setelah turun dari gunung guna validasi sampah & pendata keselamatan.";

  return (
    <section id="sop" className="py-24 px-4 bg-gradient-to-b from-slate-50 to-[#FFF8EF]/20 border-t border-orange-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Section */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="px-3.5 py-1.5 bg-gradient-to-r from-[#D4A017]/15 to-orange-100 rounded-full text-[10px] font-mono tracking-widest text-[#7A4E2D] font-bold uppercase inline-block pr-4">
            🛡️ STANDAR PROSEDUR KESELAMATAN
          </span>
          <h2 className="text-3xl sm:text-5xl font-display text-charcoal tracking-tight uppercase mt-4 mb-3">
            SOP PENDAKIAN KAWASAN
          </h2>
          <p className="text-slate-500 font-sans text-sm font-light leading-relaxed font-sans">
            Regulasi operasional resmi pendakian Gunung Lembah Bontolojong &amp; Gunung Bulu Bialo demi mewujudkan petualangan ramah lingkungan, aman, dan lestari.
          </p>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto" id="sop-tab-navigation">
          {[
            { id: "perlengkapan", label: "🎒 Perlengkapan Wajib", color: "hover:border-amber-300 active:bg-amber-100" },
            { id: "ketentuan", label: "📋 Ketentuan Umum", color: "hover:border-amber-300" },
            { id: "sampah", label: "♻️ Aturan Sampah", color: "hover:border-[#D4A017]" },
            { id: "etika", label: "🌲 Etika Selama Pendakian", color: "hover:border-emerald-300" },
            { id: "sanksi", label: "⚖️ Sanksi & Operasional", color: "hover:border-red-300" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-full text-xs font-sans uppercase font-bold tracking-widest transition-all shadow-sm border cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#D4A017] border-[#D4A017] text-white scale-105 shadow-md"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Panel Viewports */}
        <div className="bg-white border border-orange-100/40 rounded-3xl p-6 sm:p-10 card-shadow transition-all min-h-[460px] flex flex-col justify-between" id="sop-view-panel">
          
          {/* Perlengkapan Wajib */}
          {activeTab === "perlengkapan" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-orange-100 pb-5">
                <div>
                  <h3 className="text-xl font-display text-charcoal uppercase tracking-tight">Perlengkapan Wajib Pendakian</h3>
                  <p className="text-slate-500 text-xs font-sans mt-0.5">Harus dipersiapkan demi mengantisipasi tantangan kondisi alam, cuaca es, dan kelancaran trekking.</p>
                </div>
                <span className="mt-3 sm:mt-0 px-4 py-2 bg-rose-50 text-rose-700 text-[10px] font-mono uppercase tracking-widest rounded-lg border border-rose-100 font-extrabold shadow-sm">
                  ★ Wajib Dibawa Naik
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {gears.map((gear, idx) => (
                  <div key={gear.id || idx} className="flex gap-4 p-4.5 rounded-2xl bg-gradient-to-br from-cream/5 to-[#FFF8EF]/20 border border-[#D4A017]/10 hover:border-[#D4A017]/30 transition-all shadow-hover-sm group">
                    <div className="w-11 h-11 rounded-xl bg-orange-100/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {getGearIcon(gear.name)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-sans font-bold text-xs text-charcoal leading-none">{gear.name}</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-100/70 text-[#7A4E2D] text-[8px] font-mono font-bold tracking-wider uppercase leading-none">{gear.tag}</span>
                      </div>
                      <p className="text-slate-500 font-sans text-[11px] leading-relaxed font-light">{gear.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/50 flex items-center space-x-3 text-xs text-amber-950 font-sans">
                <span className="text-xl">⚠️</span>
                <p><strong>Inspeksi Petugas:</strong> Rombongan pendaki yang kedapatan tidak membawa salah satu perlengkapan wajib di atas dapat dilarang muncak demi keamanan diri.</p>
              </div>
            </div>
          )}

          {/* Ketentuan Umum */}
          {activeTab === "ketentuan" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-orange-100 pb-5">
                <div>
                  <h3 className="text-xl font-display text-charcoal uppercase tracking-tight">Ketentuan Umum Pendaki</h3>
                  <p className="text-slate-500 text-xs font-sans mt-0.5">Aturan dasar administrasi dan etika operasi dasar yang berlaku bagi seluruh pengunjung pegunungan.</p>
                </div>
                <span className="mt-3 sm:mt-0 px-4 py-2 bg-emerald-50 text-emerald-700 text-[10px] font-mono uppercase tracking-widest rounded-lg border border-emerald-100 font-extrabold shadow-sm">
                  📋 Registrasi Valid
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {generalRules.map((rule, idx) => (
                  <div key={rule.id || idx} className="flex items-start space-x-4 p-5 rounded-2xl border border-slate-100 hover:border-orange-100 transition-colors bg-white shadow-sm">
                    <span className="font-mono text-xl font-extrabold text-[#D4A017] bg-orange-50 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                      {rule.num || `0${idx + 1}`}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-sans font-bold text-xs text-[#7A4E2D] uppercase tracking-wide">{rule.title}</h4>
                      <p className="text-slate-500 font-sans text-xs leading-relaxed font-light">{rule.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Aturan Sampah */}
          {activeTab === "sampah" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-orange-100 pb-5">
                <div>
                  <h3 className="text-xl font-display text-charcoal uppercase tracking-tight">Aturan Penanganan Sampah</h3>
                  <p className="text-slate-500 text-xs font-sans mt-0.5">Agrowisata Bontolojong mewajibkan zero plastic waste demi memelihara ekosistem pegunungan.</p>
                </div>
                <span className="mt-3 sm:mt-0 px-4 py-2 bg-emerald-50 text-emerald-700 text-[10px] font-mono uppercase tracking-widest rounded-lg border border-emerald-100 font-extrabold shadow-sm">
                  ♻ Zero Waste Pledge
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5.5">
                {wasteRules.map((rule, idx) => (
                  <div key={rule.id || idx} className="p-6 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/10 flex flex-col justify-between space-y-3 shadow-sm hover:bg-emerald-50/25 transition-all">
                    <div className="space-y-1.5">
                      <span className="px-2 py-0.5 bg-emerald-100/70 text-emerald-800 text-[9px] font-mono font-bold tracking-widest uppercase rounded">
                        {rule.action || "Wajib"}
                      </span>
                      <h4 className="font-sans font-black text-xs text-emerald-950 uppercase mt-2">{rule.title}</h4>
                      <p className="text-slate-600 font-sans text-xs leading-relaxed font-light">{rule.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-[#4a0e17] text-white rounded-2xl shadow-inner border border-rose-950/20 text-center max-w-2xl mx-auto space-y-2">
                <span className="text-2xl">🌱</span>
                <h4 className="font-display text-sm tracking-widest uppercase text-[#E0A926]">PRINSIP KELAYAKAN ALAM</h4>
                <p className="font-mono text-xs italic tracking-wide text-orange-100">"Apa yang dibawa naik, wajib dibawa turun kembali."</p>
              </div>
            </div>
          )}

          {/* Etika Pendakian */}
          {activeTab === "etika" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-orange-100 pb-5">
                <div>
                  <h3 className="text-xl font-display text-charcoal uppercase tracking-tight">Aturan Selama Pendakian</h3>
                  <p className="text-slate-500 text-xs font-sans mt-0.5">Etika sosial serta rukun konservasi yang harus dipatuhi ketika bernafas di dalam pelukan rimba alam.</p>
                </div>
                <span className="mt-3 sm:mt-0 px-4 py-2 bg-amber-50 text-[#7A4E2D] text-[10px] font-mono uppercase tracking-widest rounded-lg border border-amber-100 font-extrabold shadow-sm">
                  🤝 Jaga Alam lestari
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {ethicsRules.map((eth, idx) => (
                  <div key={eth.id || idx} className="flex gap-4 p-5 rounded-2xl border border-slate-100 hover:border-orange-100 bg-white transition-all shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      {getEthicsIcon(eth.iconName, eth.title)}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-sans font-bold text-xs text-charcoal leading-snug">{eth.title}</h4>
                      <p className="text-slate-500 font-sans text-xs leading-relaxed font-light">{eth.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sanksi & Operasional */}
          {activeTab === "sanksi" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-orange-100 pb-5">
                <div>
                  <h3 className="text-xl font-display text-charcoal uppercase tracking-tight">Jam Operasional & Sanksi Pelanggaran</h3>
                  <p className="text-slate-500 text-xs font-sans mt-0.5">Rincian waktu kunjungan aman harian serta konsekuensi bertingkat bagi pelanggar regulasi.</p>
                </div>
                <span className="mt-3 sm:mt-0 px-4 py-2 bg-red-50 text-red-700 text-[10px] font-mono uppercase tracking-widest rounded-lg border border-red-100 font-extrabold shadow-sm">
                  ⚠️ Penegakan Sanksi Tegas
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Penalties Grid */}
                <div className="lg:col-span-8 space-y-3.5">
                  <h4 className="text-[10px] font-mono text-[#7A4E2D] uppercase font-bold tracking-widest block mb-1">Daftar Sanksi Pengelola</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {penalties.map((pen, idx) => (
                      <div key={pen.id || idx} className={`p-4 border rounded-xl space-y-1 ${pen.color || "border-amber-200 bg-amber-50/50 text-amber-900"} shadow-sm`}>
                        <span className="text-[8px] font-mono uppercase font-bold tracking-wider opacity-70 block">{pen.level || "Info"}</span>
                        <h5 className="font-sans font-black text-xs uppercase leading-tight">{pen.name}</h5>
                        <p className="text-[11px] font-sans font-light leading-relaxed opacity-90">{pen.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operating Hours Info */}
                <div className="lg:col-span-4 bg-gradient-to-br from-cream/20 to-[#FFF8EF]/40 border border-[#D4A017]/15 p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-[10px] font-mono text-[#7A4E2D] uppercase font-bold tracking-widest block mb-3.5">⏳ JADWAL JAM OPERASIONAL</h4>
                    
                    <div className="space-y-4">
                      
                      <div className="flex items-start space-x-3 text-xs">
                        <span className="text-lg leading-none mt-0.5">👤</span>
                        <div>
                          <strong className="block text-slate-800 font-sans uppercase text-[10px] tracking-wider leading-none">Registrasi / Simaksi</strong>
                          <span className="block font-mono text-[#D4A017] text-base font-extrabold mt-1">{simaksiHours}</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 text-xs">
                        <span className="text-lg leading-none mt-0.5">🏔️</span>
                        <div>
                          <strong className="block text-slate-800 font-sans uppercase text-[10px] tracking-wider leading-none">Batas Maksimal Naik</strong>
                          <span className="block font-mono text-rose-600 text-base font-extrabold mt-1">{maxAscentHours}</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 text-xs">
                        <span className="text-lg leading-none mt-0.5">🚪</span>
                        <div>
                          <strong className="block text-slate-800 font-sans uppercase text-[10px] tracking-wider leading-none">Prosedur Check-Out</strong>
                          <span className="block text-slate-500 font-sans text-[11px] font-light mt-0.5 leading-relaxed">{checkoutDesc}</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-center text-[#7A4E2D] uppercase tracking-wider border-t border-orange-100 pt-3 mt-4">
                    PENGELOLA AGROWISATA BONTOLOJONG
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Footer Slogans inside SOP box */}
        <div id="sop-infographic-slogan" className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:px-8 border border-white/50 bg-[#FFF8EF]/50 rounded-2xl max-w-4xl mx-auto shadow-sm">
          <div className="flex items-center space-x-3 text-left">
            <span className="text-2xl shrink-0">🏕️</span>
            <div>
              <p className="font-display text-xs text-charcoal uppercase tracking-widest leading-none">"Jaga Alam, Alam Menjaga Kita"</p>
              <p className="text-[10px] text-slate-500 font-sans mt-1">Slogan mulia pelindung kelestarian sirkuit Gunung Lembah Bontolojong.</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4A017] bg-[#D4A017]/10 px-4 py-2 rounded-full border border-[#D4A017]/15 leading-none">
            Naik Dengan Tanggung Jawab, Turun Dengan Selamat
          </span>
        </div>

      </div>
    </section>
  );
}
