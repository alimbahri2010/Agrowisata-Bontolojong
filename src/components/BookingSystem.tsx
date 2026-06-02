import React, { useState } from "react";
import { Booking } from "../types";
import { ArrowLeft, Calculator, CreditCard, Ticket, CheckCircle2, Calendar } from "lucide-react";

interface BookingSystemProps {
  setView: (view: "landing" | "booking" | "login" | "dashboard") => void;
  onAddBooking: (booking: Booking) => void;
  preSelectedName?: string;
  preSelectedCategory?: string;
  baseCampingPrice?: number;
  baseHikingPrice?: number;
}

export default function BookingSystem({
  setView,
  onAddBooking,
  preSelectedName = "",
  preSelectedCategory = "",
  baseCampingPrice = 15,
  baseHikingPrice = 10
}: BookingSystemProps) {
  // Mapping logic to map design cards to selection items
  const getInitialActivity = (): Booking["activityType"] => {
    if (!preSelectedCategory) return "Trail Hiking";
    if (preSelectedCategory === "Camping" || preSelectedCategory === "Campsite" || preSelectedCategory.toLowerCase().includes("camp")) {
      return "Camping";
    }
    if (preSelectedCategory === "Trail Hiking" || preSelectedCategory.toLowerCase().includes("trail")) {
      return "Trail Hiking";
    }
    if (preSelectedCategory.toLowerCase().includes("photo")) {
      return "Photography Session";
    }
    return "Eco-Tour";
  };

  const [step, setStep] = useState(1);
  const [visitorName, setVisitorName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const [activityType, setActivityType] = useState<Booking["activityType"]>(getInitialActivity());
  const [bookingDate, setBookingDate] = useState("");
  
  const [trailName, setTrailName] = useState(() => {
    if (preSelectedName && getInitialActivity() === "Trail Hiking") {
      return preSelectedName;
    }
    return "Pine Forest Walk";
  });

  const [campSiteName, setCampSiteName] = useState(() => {
    if (preSelectedName && getInitialActivity() === "Camping") {
      return preSelectedName;
    }
    return "Sunset Hammock Camping Area";
  });

  const [guestsCount, setGuestsCount] = useState(1);
  const [notes, setNotes] = useState("");

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "4111 2222 3333 4444",
    expiry: "12/28",
    cvv: "321"
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [ticketId, setTicketId] = useState("");

  // Determine pricing dynamically
  const getBasePrice = () => {
    switch (activityType) {
      case "Trail Hiking":
        return baseHikingPrice; 
      case "Camping":
        return baseCampingPrice; 
      case "Eco-Tour":
        return 12;
      case "Photography Session":
        return 12;
      default:
        return 10;
    }
  };

  const basePrice = getBasePrice();
  const totalAmount = basePrice * guestsCount;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(Math.max(1, step - 1));
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment response
    setTimeout(() => {
      setIsProcessing(false);
      const generatedId = "B-" + Math.floor(100000 + Math.random() * 900000);
      setTicketId(generatedId);

      const newBooking: Booking = {
        id: generatedId,
        visitorName,
        email,
        phone,
        activityType,
        bookingDate,
        guestsCount,
        totalAmount,
        paymentStatus: "Paid",
        bookingStatus: "Confirmed",
        notes: notes || undefined
      };

      if (activityType === "Trail Hiking") {
        newBooking.trailName = trailName;
      } else if (activityType === "Camping") {
        newBooking.campSiteName = campSiteName;
      }

      onAddBooking(newBooking);
      setStep(4);
    }, 2000);
  };

  const getActivityLabel = (act: Booking["activityType"]) => {
    switch (act) {
      case "Trail Hiking":
        return "Pendakian Jalur / Punggungan";
      case "Camping":
        return "Area Perkemahan Dek Kayu";
      case "Eco-Tour":
        return "Tur Alam Edukasi Kebun";
      case "Photography Session":
        return "Sesi Foto Khusus Prewedding";
      default:
        return act;
    }
  };

  const getTargetLocation = () => {
    if (activityType === "Trail Hiking") {
      return trailName;
    } else if (activityType === "Camping") {
      return campSiteName;
    } else {
      return "Agrowisata Gardens Gowa";
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 max-w-4xl mx-auto bg-cream/15 min-h-screen" id="booking-wizard-root">
      
      {/* Header Indicator */}
      <div className="flex justify-between items-center mb-8 border-b border-cream pb-5">
        <button
          onClick={() => setView("landing")}
          className="text-brown hover:text-tangerine text-xs font-bold font-mono uppercase tracking-widest flex items-center space-x-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Batalkan Pemesanan</span>
        </button>

        <h2 className="text-xl font-display text-charcoal uppercase tracking-tight">
          PENJADWAL EKSPEDISI
        </h2>

        <span className="px-3.5 py-1.5 bg-white rounded-full text-[10px] font-mono tracking-widest text-brown border border-mustard/15 font-bold uppercase shadow-sm">
          Langkah {step} / 4
        </span>
      </div>

      {/* Progress Circles */}
      <div className="hidden sm:flex items-center justify-between max-w-xl mx-auto mb-12 relative" id="wizard-progress-bar">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200/50 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-mustard -translate-y-1/2 z-0 transition-all duration-300"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        />

        {[
          { text: "Pengunjung", icon: "👤" },
          { text: "Jadwal", icon: "🗓️" },
          { text: "Kuitansi", icon: "💳" },
          { text: "Konfirmasi", icon: "🏕️" }
        ].map((pt, i) => (
          <div key={i} className="flex flex-col items-center relative z-10 font-sans">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm shadow border transition-colors ${
              step > i + 1
                ? "bg-charcoal border-transparent text-white"
                : step === i + 1
                  ? "bg-mustard border-transparent text-white ring-4 ring-[#FFF8EF]"
                  : "bg-white border-slate-200 text-slate-400"
            }`}>
              <span>{pt.icon}</span>
            </div>
            <span className={`text-[10px] uppercase font-mono tracking-wider mt-2 font-bold ${
              step >= i + 1 ? "text-slate-900" : "text-slate-400"
            }`}>{pt.text}</span>
          </div>
        ))}
      </div>

      {/* Step Contents */}
      <div className="p-8 border border-white/40 rounded-3xl bg-white/80 card-shadow min-h-[440px] flex flex-col justify-between">
        
        {/* Step 1: Visitor details */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-6 animate-fade-in flex-1 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-display text-charcoal uppercase tracking-tight">Rincian Data Pengunjung</h3>
                <p className="text-slate-500 font-sans text-xs mt-0.5">Berikan data identitas asli Anda untuk keperluan penerbitan pas asuransi & keselamatan rute.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1">Nama Lengkap Pemegang Tiket</label>
                  <input
                    required
                    type="text"
                    className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard"
                    placeholder="misal: Budi Wijaya"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1 font-semibold">Alamat Identitas E-Mail</label>
                    <input
                      required
                      type="email"
                      className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard"
                      placeholder="misal: budi@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1 font-semibold">Nomor Handphone WhatsApp</label>
                    <input
                      required
                      type="text"
                      className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard"
                      placeholder="misal: +62 812-3456-7890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3.5 bg-gradient-to-r from-mustard to-tangerine hover:from-tangerine hover:to-mustard text-white font-sans text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-md cursor-pointer"
              >
                Konfigurasi Jadwal Petualangan →
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Activity configurations */}
        {step === 2 && (
          <form onSubmit={handleNextStep} className="space-y-6 animate-fade-in flex-1 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-display text-charcoal uppercase tracking-tight">Kategori Petualangan & Jadwal</h3>
                <p className="text-slate-500 font-sans text-xs mt-0.5">Tentukan paket aktivitas, pilih tanggal kunjungan, serta rincian jumlah rombongan.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1">Kategori Aktivitas</label>
                    <select
                      className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard"
                      value={activityType}
                      onChange={(e) => setActivityType(e.target.value as any)}
                    >
                      <option value="Trail Hiking">Mendaki Jalur Hutan & Punggungan (+${baseHikingPrice}/orang)</option>
                      <option value="Camping">Berkemah di Dek Platform Kayu (+${baseCampingPrice}/orang)</option>
                      <option value="Eco-Tour">Tur Edukasi Kebun Buah Hortikultura (+$12/orang)</option>
                      <option value="Photography Session">Sesi Foto Prewedding & Komersial (+$12/orang)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1">Tanggal Ekspedisi</label>
                    <input
                      required
                      type="date"
                      className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {activityType === "Trail Hiking" && (
                    <div>
                      <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1">Pilih Jalur Hutan</label>
                      <select
                        className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard"
                        value={trailName}
                        onChange={(e) => setTrailName(e.target.value)}
                      >
                        <option value="Pine Forest Walk">Pine Forest Walk (Pemula)</option>
                        <option value="Sappan Ridge Sunrise Quest">Sappan Ridge Sunrise Quest (Menengah)</option>
                        <option value="Batu Pelantikan Crest Trail">Batu Pelantikan Crest Trail (Mahir - Wajib Pemandu)</option>
                      </select>
                    </div>
                  )}

                  {activityType === "Camping" && (
                    <div>
                      <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1">Pilih Lokasi Berkemah</label>
                      <select
                        className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard"
                        value={campSiteName}
                        onChange={(e) => setCampSiteName(e.target.value)}
                      >
                        <option value="Sunset Hammock Camping Area">Sunset Hammock Wood Deck</option>
                        <option value="Starry Meadows Cleared Ridge">Starry Meadows Ridge Peak</option>
                        <option value="Pine Forest Bottom Clearing">Hutan Pinus Bottom Basecamp</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1">Jumlah Rombongan</label>
                    <div className="flex items-center space-x-2">
                      <input
                        required
                        type="number"
                        min={1}
                        max={15}
                        className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard"
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(parseInt(e.target.value) || 1)}
                      />
                      <span className="text-xs text-slate-400 font-mono tracking-wider shrink-0 uppercase">orang</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1 font-semibold">Catatan Kebutuhan Tambahan</label>
                  <textarea
                    rows={2}
                    className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard leading-relaxed"
                    placeholder="Butuh meminjam alat tenda? Membawa rombongan keluarga besar? Permintaan pemandu lokal khusus? Jelaskan detailnya di sini..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Calculations widget footer */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-2 bg-[#FFF8EF]/80 px-4 py-2 rounded-full border border-mustard/20 text-brown">
                <Calculator className="w-4.5 h-4.5 shrink-0" />
                <span className="text-xs font-mono">Estimasi Biaya: ${basePrice} × {guestsCount} orang = <strong>${totalAmount} USD</strong></span>
              </div>

              <div className="flex space-x-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex-1 sm:flex-initial px-5 py-3 border border-slate-200 text-slate-700 font-sans text-xs font-bold uppercase tracking-wider rounded-full hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial px-8 py-3.5 bg-gradient-to-r from-mustard to-tangerine hover:from-tangerine hover:to-mustard text-white font-sans text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-md cursor-pointer animate-pulse-soft"
                >
                  Buat Checkout Tiket →
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Step 3: Checkout Receipts & Payment */}
        {step === 3 && (
          <form onSubmit={handlePaymentSubmit} className="space-y-6 animate-fade-in flex-1 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-display text-charcoal uppercase tracking-tight">Konfirmasi Invoice & Checkout Aman</h3>
                <p className="text-slate-500 font-sans text-xs mt-0.5">Simulasi pembayaran aman. Transaksi ini bersifat simulasi pembelajaran sistem.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                {/* Visual Invoice */}
                <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 font-sans text-xs shadow-sm">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-brown pb-2 border-b border-slate-100 flex items-center space-x-1.5">
                    <Ticket className="w-4 h-4 text-mustard animate-pulse-soft" />
                    <span>Voucher Izin Masuk Petualangan</span>
                  </h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Nama Pemegang Izin:</span>
                      <span className="font-extrabold text-slate-900">{visitorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Kategori Aktivitas:</span>
                      <span className="font-semibold text-tangerine">{getActivityLabel(activityType)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Lokasi/Rute:</span>
                      <span className="font-semibold text-slate-900">
                        {getTargetLocation()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tanggal Kedatangan:</span>
                      <span className="font-semibold text-slate-900">{bookingDate}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-dashed border-slate-200">
                      <span className="text-slate-400">Jumlah Peserta:</span>
                      <span className="font-semibold text-slate-900">{guestsCount} orang</span>
                    </div>
                    <div className="flex justify-between text-base pt-1 font-black">
                      <span className="text-slate-900 font-display">TAGIHAN BERSIH TOTAL:</span>
                      <span className="text-mustard font-display">${totalAmount} USD</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Credit Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1">Nama Pemilik Kartu (Simulasi)</label>
                    <input
                      required
                      type="text"
                      className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard"
                      placeholder="e.g., Ahmd Gunawan"
                      defaultValue={visitorName}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1 font-semibold">Nomor Kartu Kredit (Simulasi)</label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-2.5 pl-9 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-mustard"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                      />
                      <CreditCard className="w-4.5 h-4.5 text-slate-400 absolute left-2.5 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1">Masa Berlaku</label>
                      <input
                        required
                        type="text"
                        className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-mustard"
                        value={paymentDetails.expiry}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1">CVV Keamanan</label>
                      <input
                        required
                        type="password"
                        className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-mustard"
                        value={paymentDetails.cvv}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Simulated Payment Submittals */}
            <div className="pt-6 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-3 border border-slate-200 text-slate-700 font-sans text-xs font-bold uppercase tracking-wider rounded-full hover:bg-slate-50 transition-all cursor-pointer"
              >
                Kembali ke Detail
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-8 py-3.5 bg-gradient-to-r from-mustard to-tangerine text-white font-sans text-xs font-bold uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{isProcessing ? "MEMPROSES PEMBAYARAN..." : "SIMULASIKAN PEMBAYARAN SELESAI"}</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Success confirmation */}
        {step === 4 && (
          <div className="p-8 text-center space-y-6 animate-scale-up flex-1 flex flex-col justify-center items-center">
            <CheckCircle2 className="w-20 h-20 text-emerald-500 animate-bounce" />
            
            <div className="space-y-2 max-w-md">
              <h3 className="text-2xl font-display text-charcoal tracking-tight uppercase">TRANSAKSI BERHASIL DIKONFIRMASI!</h3>
              <p className="text-slate-600 font-sans text-sm">
                Pas masuk hutan dataran tinggi Anda telah dibuat dengan Kode Tiket: <strong className="font-mono text-slate-900 bg-amber-100 px-1.5 py-0.5 rounded">{ticketId}</strong>.
              </p>
              <p className="text-slate-500 font-sans text-xs leading-relaxed font-light">
                Voucher digital serta notifikasi invoice WhatsApp telah dikirimkan ke database check-in Siti Rahma. Simpan tiket ini untuk divalidasi ketika melewati pos gerbang masuk kehutanan.
              </p>
            </div>

            <div className="p-4 bg-[#FFF8EF]/80 rounded-2xl border border-mustard/15 flex items-start text-left space-x-3 text-xs text-amber-950 font-sans leading-relaxed max-w-md">
              <span className="text-2xl mt-0.5">🎒</span>
              <p>
                <strong>Persiapan Sebelum Berangkat:</strong> Baca panduan keselamatan kami. Wajib membawa kartu identitas diri yang sah, pakaian/selimut ekstra untuk melindungi dari udara beku pegunungan malam hari, serta patuhi komitmen zero-waste bebas sampah plastik.
              </p>
            </div>

            <div className="pt-6 flex gap-3 text-center w-full max-w-sm justify-center">
              <button
                onClick={() => setView("landing")}
                className="px-6 py-3.5 border border-slate-200 text-slate-700 hover:bg-slate-150 font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all flex-1 cursor-pointer"
              >
                Kembali ke Website
              </button>
              <button
                onClick={() => {
                  setView("dashboard");
                }}
                className="px-6 py-3.5 bg-charcoal text-white font-sans text-xs font-bold uppercase tracking-widest rounded-full shadow hover:bg-brown hover:shadow-lg transition-all flex-1 cursor-pointer"
              >
                Periksa Database Tiket
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
