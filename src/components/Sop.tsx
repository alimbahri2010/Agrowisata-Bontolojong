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

export default function Sop() {
  const [activeTab, setActiveTab] = useState<"perlengkapan" | "ketentuan" | "sampah" | "etika" | "sanksi">("perlengkapan");

  const gearItems = [
    {
      name: "Tas Carrier/Daypack",
      desc: "Tas pendakian yang ergonomis untuk membawa logistik secara aman.",
      icon: <Backpack className="w-6 h-6 text-[#7A4E2D]" />,
      tag: "Wajib"
    },
    {
      name: "Jaket Pelindung Dingin",
      desc: "Melindungi tubuh dari suhu beku ekstrem dataran tinggi Bontolojong.",
      icon: <Thermometer className="w-6 h-6 text-[#7A4E2D]" />,
      tag: "Wajib"
    },
    {
      name: "Sepatu Gunung",
      desc: "Sepatu dengan grip kuat di medan berbatu, licin, dan berlumpur.",
      icon: <CheckCircle className="w-6 h-6 text-[#7A4E2D]" />,
      tag: "Sangat Disarankan"
    },
    {
      name: "Jas Hujan",
      desc: "Sedia payung sebelum hujan; cuaca pegunungan dapat berubah sangat cepat.",
      icon: <CloudRain className="w-6 h-6 text-[#7A4E2D]" />,
      tag: "Wajib"
    },
    {
      name: "Senter/Headlamp",
      desc: "Penerangan utama saat mendaki malam hari atau melakukan sunrise trek.",
      icon: <Clock className="w-6 h-6 text-[#7A4E2D]" />,
      tag: "Wajib"
    },
    {
      name: "Air Minum & Logistik",
      desc: "Sediaan makanan berkalori tinggi & air yang cukup selama ekspedisi.",
      icon: <Droplet className="w-6 h-6 text-[#7A4E2D]" />,
      tag: "Cukup & Wajib"
    },
    {
      name: "Obat-obatan Pribadi",
      desc: "Peralatan medis pribadi untuk pertolongan pertama mandiri.",
      icon: <Heart className="w-6 h-6 text-[#7A4E2D]" />,
      tag: "Pribadi"
    },
    {
      name: "Kantong Sampah",
      desc: "Wadah penampungan sampah bawaan pribadi untuk dibawa turun kembali.",
      icon: <Trash2 className="w-6 h-6 text-[#7A4E2D]" />,
      tag: "MUTLAK WAJIB"
    },
    {
      name: "Flysheet / Shelter",
      desc: "Lembaran kanopi pendukung pelindung angin kencang dan rembesan air.",
      icon: <Tent className="w-6 h-6 text-[#7A4E2D]" />,
      tag: "Sangat Dianjurkan"
    },
    {
      name: "Emergency Blanket",
      desc: "Selimut foil thermal penahan panas tubuh agar terhindar dari hipotermia.",
      icon: <Heater className="w-6 h-6 text-[#7A4E2D]" />,
      tag: "Hipotermia Guard"
    }
  ];

  const generalRules = [
    {
      num: "01",
      title: "Wajib Registrasi Sebelum Pendakian",
      desc: "Setiap pendaki wajib mendaftarkan diri secara sah dan resmi melalui loket gerbang masuk atau sistem online Agrowisata Bontolojong."
    },
    {
      num: "02",
      title: "Mengisi Data Lengkap Pengunjung",
      desc: "Memberikan informasi identitas riil serta mencantumkan nomor kontak darurat keluarga terdekat yang dapat dihubungi sewaktu-waktu."
    },
    {
      num: "03",
      title: "Sehat Jasmani dan Rohani",
      desc: "Pendaki harus dalam kondisi prima, memiliki stamina yang memadai, dan tidak memiliki riwayat medis berat yang berbahaya di ketinggian."
    },
    {
      num: "04",
      title: "Minimal Rombongan 2 Orang",
      desc: "Sangat tidak disarankan melakukan pendakian solo (solo hiking) demi menjaga keselamatan dan saling memantau kondisi di lapangan."
    },
    {
      num: "05",
      title: "Wajib Mengikuti Safety Briefing",
      desc: "Mendengarkan arahan dari petugas pemandu wisata / ranger mengenai kondisi jalur terkini, cuaca, serta aturan konservasi alam."
    },
    {
      num: "06",
      title: "Wajib Check-In & Check-Out",
      desc: "Melakukan proses absensi masuk saat mendaki dan wajib melapor kembali saat sudah turun guna memantau jumlah pendaki aktif."
    }
  ];

  const wasteRules = [
    {
      title: "Membawa Turun Sampah Sendiri",
      desc: "Semua logistik makanan/minuman berkemah yang berpotensi menyisakan sampah wajib ditampung kembali ke dalam trash bag milik Anda.",
      action: "Wajib Bawa Turun"
    },
    {
      title: "Dilarang Meninggalkan Sampah di Jalur",
      desc: "Sama sekali tidak diperbolehkan membuang, mengubur, atau menyembunyikan sampah plastik di punggungan maupun di puncak gunung.",
      action: "Nol Toleransi Plastik"
    },
    {
      title: "Inspeksi Sampah Check-Out",
      desc: "Petugas pos loket bawah akan mencocokkan jumlah sampah bawaan Anda dengan estimasi daftar logistik Anda saat pendaftaran pertama.",
      action: "Pembersihan Terverifikasi"
    },
    {
      title: "Prinsip Utama Pendaki Lestari",
      desc: "Memegang teguh filosofi: 'Apa yang dibawa naik ke atas, harus dan wajib hukumnya untuk dibawa turun kembali ke bawah'.",
      action: "Golden Rule"
    }
  ];

  const ethicsRules = [
    {
      title: "Dilarang Merusak Tanaman & Fasilitas",
      desc: "Dilarang mematahkan ranting, memetik bunga liar, melakukan corat-coret (vandalisme), atau merusak pos-pos peristirahatan umum.",
      icon: <Ban className="w-5 h-5 text-rose-500" />
    },
    {
      title: "Dilarang Membuat Api Unggun Tanpa Izin",
      desc: "Api unggun liar berisiko memicu kebakaran kawasan hutan pinus kering. Wajib mematuhi anjuran pembuatan api ramah lingkungan.",
      icon: <Flame className="w-5 h-5 text-[#E0A926]" />
    },
    {
      title: "Dilarang Membawa Minuman Keras & Narkoba",
      desc: "Minuman beralkohol membahayakan keselamatan diri sendiri karena merusak kesadaran, serta mengganggu lingkungan sosial sesama pendaki.",
      icon: <Ban className="w-5 h-5 text-rose-500" />
    },
    {
      title: "Wajib Menjaga Etika & Ketertiban",
      desc: "Menghormati kearifan lokal warga sekitar, berbicara sopan, tidak menyetel musik kencang (speaker bluetooth) yang merusak ketenangan hutan.",
      icon: <HeartHandshake className="w-5 h-5 text-emerald-500" />
    },
    {
      title: "Keselamatan di Atas Puncak",
      desc: "Ingatlah bahwa kepulangan Anda dengan selamat di rumah berkumpul bersama keluarga jauh lebih bernilai dari sekadar pencapaian puncak gunung.",
      icon: <ShieldAlert className="w-5 h-5 text-blue-500" />
    }
  ];

  const penalties = [
    {
      level: "Tingkat I",
      name: "Teguran Tertulis / Lisan",
      desc: "Diberikan kepada pendaki yang melakukan pelanggaran minor awal seputar kelalaian etika ringan.",
      color: "border-amber-200 bg-amber-50/50 text-amber-900"
    },
    {
      level: "Tingkat II",
      name: "Larangan Melanjutkan Pendakian",
      desc: "Bagi rombongan yang membawa perlengkapan kurang kramah lingkungan atau terbukti melalaikan aspek keselamatan keselamatan dasar.",
      color: "border-orange-200 bg-orange-50/50 text-orange-900"
    },
    {
      level: "Tingkat III",
      name: "Blacklist Sementara / Permanen",
      desc: "Berlaku keras untuk pendaki yang terbukti membuang sampah sembarangan di gunung, merusak fasilitas agrowisata secara sengaja.",
      color: "border-rose-200 bg-rose-50/50 text-rose-900"
    },
    {
      level: "Tingkat IV",
      name: "Sanksi Kebijakan Pengelola & Hukum",
      desc: "Tindakan hukum formal atau denda administratif berat demi memulihkan kerusakan ekosistem agrowisata Bontolojong.",
      color: "border-red-300 bg-red-50/70 text-red-950 font-bold"
    }
  ];

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
          <p className="text-slate-500 font-sans text-sm font-light leading-relaxed">
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
                {gearItems.map((gear, idx) => (
                  <div key={idx} className="flex gap-4 p-4.5 rounded-2xl bg-gradient-to-br from-cream/5 to-[#FFF8EF]/20 border border-[#D4A017]/10 hover:border-[#D4A017]/30 transition-all shadow-hover-sm group">
                    <div className="w-11 h-11 rounded-xl bg-orange-100/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {gear.icon}
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
                  <div key={idx} className="flex items-start space-x-4 p-5 rounded-2xl border border-slate-100 hover:border-orange-100 transition-colors bg-white shadow-sm">
                    <span className="font-mono text-xl font-extrabold text-[#D4A017] bg-orange-50 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                      {rule.num}
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
                  <div key={idx} className="p-6 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/10 flex flex-col justify-between space-y-3 shadow-sm hover:bg-emerald-50/25 transition-all">
                    <div className="space-y-1.5">
                      <span className="px-2 py-0.5 bg-emerald-100/70 text-emerald-800 text-[9px] font-mono font-bold tracking-widest uppercase rounded">
                        {rule.action}
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
                  <div key={idx} className="flex gap-4 p-5 rounded-2xl border border-slate-100 hover:border-orange-100 bg-white transition-all shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      {eth.icon}
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
                      <div key={idx} className={`p-4 border rounded-xl space-y-1 ${pen.color} shadow-sm`}>
                        <span className="text-[8px] font-mono uppercase font-bold tracking-wider opacity-70 block">{pen.level}</span>
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
                          <span className="block font-mono text-[#D4A017] text-base font-extrabold mt-1">07.00 - 17.30 WITA</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 text-xs">
                        <span className="text-lg leading-none mt-0.5">🏔️</span>
                        <div>
                          <strong className="block text-slate-800 font-sans uppercase text-[10px] tracking-wider leading-none">Batas Maksimal Naik</strong>
                          <span className="block font-mono text-rose-600 text-base font-extrabold mt-1">15.00 WITA</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 text-xs">
                        <span className="text-lg leading-none mt-0.5">🚪</span>
                        <div>
                          <strong className="block text-slate-800 font-sans uppercase text-[10px] tracking-wider leading-none">Prosedur Check-Out</strong>
                          <span className="block text-slate-500 font-sans text-[11px] font-light mt-0.5 leading-relaxed">Wajib Check-Out dan melapor kembali setelah turun dari gunung guna validasi sampah & pendata keselamatan.</span>
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
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4A017] bg-[#D4A017]/10 px-4 py-2 rounded-full border border-[#D4A017]/15">
            Naik Dengan Tanggung Jawab, Turun Dengan Selamat
          </span>
        </div>

      </div>
    </section>
  );
}
