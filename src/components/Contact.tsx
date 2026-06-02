import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Instagram, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    fullname: "",
    email: "",
    subject: "Trail Query",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.fullname || !formState.email || !formState.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ fullname: "", email: "", subject: "Trail Query", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 bg-cream/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center gap-3 justify-center mb-2">
            <div className="h-[1px] w-8 bg-mustard"></div>
            <span className="text-mustard text-xs font-mono uppercase tracking-[0.2em] font-semibold">
              HUBUNGI KAMI
            </span>
            <div className="h-[1px] w-8 bg-mustard"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display text-charcoal tracking-tight uppercase">
            PUSAT INFORMASI PENGUNJUNG
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-mustard to-tangerine mx-auto mt-4 rounded-full" />
        </div>

        {/* Info + Contact Form Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Interactive Info & Address Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 bg-white/85 rounded-3xl border border-white/40 card-shadow">
              <h3 className="text-xl font-display text-charcoal uppercase tracking-tight mb-5">
                BASECAMP BONTOLOJONG
              </h3>

              <div className="space-y-5">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 bg-cream/40 border border-mustard/15 rounded-xl text-tangerine shadow-sm">
                    <MapPin className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold text-brown uppercase tracking-wider">Lokasi Topografis</span>
                    <p className="text-slate-700 text-xs font-sans mt-0.5 leading-relaxed font-light">
                      Kepala Lembah Sappan, Bontolojong, Kabupaten Gowa, Sulawesi Selatan, Indonesia (92113).
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 bg-cream/40 border border-mustard/15 rounded-xl text-mustard shadow-sm">
                    <Clock className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold text-brown uppercase tracking-wider">Jam Operasional Pos</span>
                    <p className="text-slate-700 text-xs font-sans mt-0.5 leading-relaxed font-light">
                      Pos Gerbang Pengunjung: Buka Setiap Hari 05:00 - 18:00 WITA. Check-in Gerbang Perkemahan: 24 Jam Nonstop.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 bg-cream/40 border border-mustard/15 rounded-xl text-emerald-600 shadow-sm">
                    <Phone className="w-5 h-5 shrink-0 animate-pulse-soft" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold text-brown uppercase tracking-wider">Dukungan Kontak WhatsApp</span>
                    <p className="text-emerald-700 text-xs font-sans mt-0.5 leading-relaxed font-semibold">
                      +62 821-4455-9011 (Layanan Bantuan, melayani Bahasa Indonesia & Inggris)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 bg-cream/40 border border-mustard/15 rounded-xl text-indigo-600 shadow-sm">
                    <Mail className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold text-brown uppercase tracking-wider">Alamat E-Mail Resmi</span>
                    <p className="text-slate-700 text-xs font-sans mt-0.5 leading-relaxed font-light">
                      info@bontolojong-adventure.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Instagram link button */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <a
                  href="https://www.instagram.com/agrowisata.bontolojong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white hover:bg-cream border border-slate-200 hover:border-mustard rounded-full text-slate-700 text-xs font-bold font-mono tracking-wider shadow-sm transition-all text-center"
                >
                  <Instagram className="w-4.5 h-4.5 text-tangerine" />
                  <span>@agrowisata.bontolojong</span>
                </a>
              </div>
            </div>

            {/* Styled Geographic Map coordinates mock */}
            <div className="relative rounded-2xl overflow-hidden shadow-inner border border-slate-200 aspect-[16/10] bg-slate-900 flex flex-col justify-end p-4">
              {/* Topological Visual styling placeholder */}
              <div className="absolute inset-0 bg-cover bg-center filter brightness-50 opacity-80" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')" }}>
                <div className="absolute inset-0 bg-radial-gradient-to-tr from-emerald-950/60 via-slate-950/80 to-transparent" />
              </div>
              
              <div className="relative z-10 text-white">
                <div className="flex items-center space-x-2 text-amber-400 font-mono text-[10px] tracking-wider mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>KOORDINAT GPS AKTIF</span>
                </div>
                <h4 className="font-display text-base tracking-tight text-white uppercase">PUNCAK TINGGI LEMBAH SAPPAN</h4>
                <p className="text-[10px] font-mono text-slate-300 mt-0.5">Lintang: 5.2341° S | Bujur: 119.8711° E</p>
              </div>

              {/* View map action simulating link */}
              <div className="absolute top-4 right-4 z-10">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-white text-slate-950 hover:bg-cream text-[10px] font-sans font-extrabold uppercase rounded shadow cursor-pointer"
                >
                  Buka di Google Maps
                </a>
              </div>
            </div>

          </div>

          {/* Right: Modern Lead Form */}
          <div className="lg:col-span-7">
            <div className="p-8 bg-white rounded-3xl border border-white/40 card-shadow">
              <h3 className="text-xl font-display text-charcoal uppercase tracking-tight mb-6">
                FORMULIR PERTANYAAN & PESAN
              </h3>

              {submitted ? (
                <div className="p-8 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-center font-sans space-y-3 animate-fade-in">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-emerald-700 text-base font-bold">Pesan Anda Berhasil Terkirim!</h4>
                  <p className="text-xs max-w-sm mx-auto">
                    Kueri Anda telah diteruskan ke Siti Rahma di Pusat Informasi Operations. Kami akan membalas pesan Anda dalam kurun waktu maksimal 12 jam kerja.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1">Nama Lengkap Anda</label>
                      <input
                        required
                        type="text"
                        className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard focus:bg-white"
                        placeholder="misal: Gunawan Saputra"
                        value={formState.fullname}
                        onChange={(e) => setFormState({ ...formState, fullname: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1">Alamat Email Aktif</label>
                      <input
                        required
                        type="email"
                        className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard focus:bg-white"
                        placeholder="misal: gunawan@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1 font-semibold">Subjek Pertanyaan</label>
                    <select
                      className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard focus:bg-white"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    >
                      <option value="Trail Query">Tanya Mengenai Rute & Kesulitan Jalur</option>
                      <option value="Camping Space">Pemesanan Area Berkemah & Dek Kayu</option>
                      <option value="Group Events">Agenda Kelompok / Kunjungan Gathering Besar</option>
                      <option value="Conservation Issue">Pertanyaan Mengenai Ekowisata & Eko-Konservasi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1">Isi Pesan / Kueri</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard focus:bg-white leading-relaxed"
                      placeholder="Jelaskan tanggal rencana kedatangan, kuota rombongan, sewa alat kemah, atau rincian lainnya yang ingin Anda tanyakan..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4.5 bg-charcoal hover:bg-brown text-white font-sans text-xs font-bold uppercase tracking-widest rounded-full shadow-md transition-all text-center flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Kirim Pesan Ke Basecamp</span>
                    <Send className="w-4 h-4 text-mustard" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Floating Call Assistance Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://api.whatsapp.com/send?phone=6282144559011&text=Halo%20Agrowisata%20Bontolojong!"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4.5 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl hover:scale-105 transition-all text-sm font-sans font-extrabold uppercase tracking-wider relative group"
        >
          <span className="w-3 h-3 bg-white rounded-full absolute -top-1 -right-1 animate-ping" />
          <Phone className="w-5 h-5 shrink-0" />
          <span className="hidden md:inline">Bantuan WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
