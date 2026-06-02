import React, { useState } from "react";
import { Trees, Send, Instagram, Facebook, Youtube, ShieldAlert } from "lucide-react";

interface FooterProps {
  logoName: string;
  tagline: string;
  setView: (v: "landing" | "booking" | "login" | "dashboard") => void;
  scrollToSection: (id: string) => void;
}

export default function Footer({ logoName, tagline, setView, scrollToSection }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subSuccess, setSubSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubSuccess(true);
    setTimeout(() => {
      setSubSuccess(false);
      setEmail("");
    }, 3000);
  };

  const footerLinksLeft = [
    { label: "Beranda Utama", id: "home" },
    { label: "Tentang Konservasi", id: "about" },
    { label: "Spot Wisata Alam", id: "destinations" },
    { label: "Jalur Pendakian", id: "trails" },
    { label: "SOP Pendakian Resmi", id: "sop" },
  ];

  const footerLinksRight = [
    { label: "Galeri Foto", id: "gallery" },
    { label: "Agenda Kegiatan", id: "events" },
    { label: "Ulasan Pengunjung", id: "testimonials" },
    { label: "Hubungi Basecamp", id: "contact" },
  ];

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-orange-950/20 relative z-10" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Logo Brand columns */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <div className="p-2 bg-gradient-to-br from-[#D4A017] to-[#F28C28] rounded-xl text-white shadow-xl">
                <Trees className="w-6 h-6" />
              </div>
              <div>
                <span className="font-sans font-black text-xl tracking-wider block leading-none text-white uppercase">
                  AGROWISATA BONTOLOJONG
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFF8EF]/60 block mt-1">
                  AGROWISATA • KAWASAN HIJAU
                </span>
              </div>
            </div>

            <p className="text-[#FFF8EF]/75 font-sans text-xs leading-relaxed max-w-sm">
              Temukan ladang pertanian hortikultura yang indah serta rute menanjak hutan awan pegunungan tinggi yang masih asri. Kami melestarikan alam tinggi Gowa sekaligus menyuguhkan keindahan petualangan sejati.
            </p>

            <div className="flex space-x-3.5" id="social-footer-networks">
              <a href="#" className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white hover:text-[#D4A017] border border-white/10 transition-colors">
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white hover:text-[#F28C28] border border-white/10 transition-colors">
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white hover:text-red-500 border border-white/10 transition-colors">
                <Youtube className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Nav Links columns */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-mono text-[10px] text-orange-200 uppercase tracking-widest font-black mb-4">TEMUKAN</h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
                {footerLinksLeft.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="hover:text-[#D4A017] transition-all flex items-center group text-left cursor-pointer"
                    >
                      <span className="size-1 bg-[#D4A017]/50 rounded-full mr-1 px-1 py-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[10px] text-orange-200 uppercase tracking-widest font-black mb-4">TERLIBAT</h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
                {footerLinksRight.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="hover:text-[#F28C28] transition-all flex items-center group text-left cursor-pointer"
                    >
                      <span className="size-1 bg-[#F28C28]/50 rounded-full mr-1 px-1 py-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter columns */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-mono text-[10px] text-orange-200 uppercase tracking-widest font-black">BULETIN INFORMASI</h4>
            <p className="text-slate-400 font-sans text-xs leading-relaxed">
              Berlangganan untuk mendapatkan pengumuman prakiraan cuaca, info pembukaan jalur pendakian, serta jadwal pelayanan ranger terupdate.
            </p>

            {subSuccess ? (
              <div className="p-3.5 bg-emerald-950/40 text-emerald-300 border border-emerald-900/40 rounded-xl text-center text-xs font-sans">
                ✓ Berhasil didaftarkan! Alamat email Anda telah tercatat.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  required
                  type="email"
                  className="w-full text-slate-100 bg-white/5 border border-white/10 p-2.5 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:bg-white/10 text-slate-100 placeholder:text-slate-500"
                  placeholder="nama@explorer.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#D4A017] hover:bg-[#F28C28] text-slate-950 hover:text-white rounded-xl transition-all shadow shadow-amber-900/50 flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright block */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500" id="footer-credits">
          <p>© 2026 Agrowisata Bontolojong Gowa. Semua hak dilindungi undang-undang.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              onClick={() => setView("login")}
              className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1 py-1 px-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-tangerine shrink-0" />
              <span>Akses Staf Admin</span>
            </button>
            <span className="text-slate-800 hidden sm:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <span className="text-slate-800 hidden sm:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Panduan Ekowisata</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
