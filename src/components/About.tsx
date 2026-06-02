import React from "react";
import { Footprints, Mountain, Trees, Camera, Tent, Sun, ShieldCheck } from "lucide-react";

export default function About() {
  const highlights = [
    {
      title: "Jalur Pendakian",
      description: "Rute setapak yang dibuat rapi menyusuri hutan pinus, dikategorikan dari penjelajah santai hingga pendaki mahir.",
      icon: <Footprints className="w-6 h-6 text-mustard" />,
      badge: "🥾 Jalur"
    },
    {
      title: "Pemandangan Gunung",
      description: "Pemandangan 360 derajat tak terhalang menghadap ke lanskap ngarai curam serta sembulan lautan awan putih.",
      icon: <Mountain className="w-6 h-6 text-tangerine" />,
      badge: "⛰️ Ketinggian"
    },
    {
      title: "Ekowisata Pertanian",
      description: "Wisata edukasi kebun buah organik dan perkebunan teh lokal yang dikelola langsung bersama petani setempat.",
      icon: <Trees className="w-6 h-6 text-green" />,
      badge: "🌿 Alam"
    },
    {
      title: "Spot Foto Indah",
      description: "Ayunan kayu eksotis dan ornamen foto artistik yang langsung menghadap ke keindahan lembah hijau zamrud.",
      icon: <Camera className="w-6 h-6 text-brown" />,
      badge: "📸 Bingkai"
    },
    {
      title: "Area Perkemahan",
      description: "Fasilitas dek platform kayu, toilet higienis, serta spot api unggun aman di bawah langit berbintang.",
      icon: <Tent className="w-6 h-6 text-tangerine" />,
      badge: "🏕️ Tenda"
    },
    {
      title: "Puncak Sunrise",
      description: "Gardu pandang khusus menghadap ke timur untuk menyaksikan matahari terbit hangat pertama dan lautan awan fajar.",
      icon: <Sun className="w-6 h-6 text-mustard" />,
      badge: "🌄 Fajar"
    }
  ];

  return (
    <section id="about" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <div className="relative group">
            {/* Double Frame Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-mustard to-tangerine rounded-3xl blur-md opacity-20 group-hover:opacity-30 transition-all duration-300" />
            <div className="relative overflow-hidden rounded-2xl card-shadow aspect-video md:aspect-[4/3] border border-white/40">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
                alt="Bontolojong Misty Valley Layout"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-orange-100 flex items-center space-x-3 shadow-lg">
                <div className="p-2.5 bg-emerald-100 rounded-full text-emerald-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold font-mono text-brown uppercase tracking-wider">Komitmen Lindung</span>
                  <span className="text-xs text-charcoal">Jalur Bebas Plastik & Perlindungan Konservasi Hijau</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[1px] w-8 bg-mustard"></div>
              <span className="text-mustard text-xs font-mono uppercase tracking-[0.2em] font-semibold">
                SEJARAH & MISI EKOWISATA
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display text-charcoal leading-none uppercase mb-6">
              Kisah Agrowisata Bontolojong
            </h2>
            <p className="text-charcoal/80 font-sans text-base leading-relaxed mb-5 font-light">
              Terletak di punggungan bukit pertanian dataran tinggi Gowa, **Agrowisata Bontolojong** memadukan petualangan pegunungan yang asri dengan warisan budidaya hortikultura lokal. Inisiatif berbasis pemberdayaan masyarakat ini bertekad melindungi kelestarian hutan asli sekaligus menawarkan wisata ramah lingkungan.
            </p>
            <p className="text-charcoal/80 font-sans text-base leading-relaxed mb-6 font-light">
              Ketika Anda menyusuri jalur pendakian atau berkemah di bawah konstelasi bintang, kunjungan Anda langsung mendukung mata pencaharian para ranger pelindung hutan, petani buah lokal, dan masyarakat setempat. Setiap jejak Anda adalah langkah pelestarian bumi.
            </p>
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/60 border border-mustard/20 gap-2 shadow-sm">
              <span className="text-4xl">🌿</span>
              <p className="font-sans text-xs text-brown leading-relaxed">
                <strong>Misi Konservasi Alam:</strong> Menanam 10.000 bibit pohon mahoni dan teh di sepanjang punggungan bukit penyangga dalam tiga tahun ke depan, sembari mengedukasi kebijakan zero-waste bagi semua pendaki.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="text-center mb-12">
          <div className="flex items-center gap-3 justify-center mb-2">
            <div className="h-[1px] w-8 bg-mustard"></div>
            <span className="text-mustard text-xs font-mono uppercase tracking-[0.2em] font-semibold">
              FITUR UNGGULAN BONTOLOJONG
            </span>
            <div className="h-[1px] w-8 bg-mustard"></div>
          </div>
          <h3 className="text-3xl sm:text-4xl font-display text-charcoal tracking-tight uppercase">
            6 Keajaiban untuk Dijelajahi
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-mustard to-tangerine mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white/50 hover:bg-white border border-white/40 shadow-sm hover:card-shadow transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-5">
                  <div className="p-3 bg-white rounded-xl shadow-md border border-orange-50 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase font-semibold text-brown tracking-wider px-2 py-1 bg-white border border-slate-200 rounded-md shadow-sm">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-lg font-sans font-bold text-charcoal group-hover:text-tangerine transition-colors mb-3">
                  {item.title}
                </h4>
                <p className="text-slate-600 font-sans text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="w-12 h-1 bg-slate-200 group-hover:bg-gradient-to-r group-hover:from-mustard group-hover:to-tangerine mt-6 transition-colors rounded-full" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
