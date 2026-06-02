import React, { useState } from "react";
import {
  Destination,
  HikingTrail,
  Booking,
  TrailEvent,
  GalleryMedia,
  Testimonial,
  StaffMember,
  WeatherInfo,
  SystemSettings
} from "../types";
import {
  LayoutDashboard,
  Compass,
  Map,
  CalendarDays,
  Image,
  Users,
  TrendingUp,
  Sliders,
  LogOut,
  Plus,
  Trash2,
  Check,
  X,
  Search,
  Bell,
  Sun,
  Moon,
  Printer,
  ChevronRight,
  Shield,
  HelpCircle,
  FileText,
  Save,
  Clock,
  Briefcase,
  Trees,
  Leaf,
  Mountain,
  Upload
} from "lucide-react";

interface AdminDashboardProps {
  destinations: Destination[];
  setDestinations: React.Dispatch<React.SetStateAction<Destination[]>>;
  trails: HikingTrail[];
  setTrails: React.Dispatch<React.SetStateAction<HikingTrail[]>>;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  events: TrailEvent[];
  setEvents: React.Dispatch<React.SetStateAction<TrailEvent[]>>;
  gallery: GalleryMedia[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryMedia[]>>;
  staff: StaffMember[];
  setStaff: React.Dispatch<React.SetStateAction<StaffMember[]>>;
  weather: WeatherInfo;
  setWeather: React.Dispatch<React.SetStateAction<WeatherInfo>>;
  settings: SystemSettings;
  setSettings: React.Dispatch<React.SetStateAction<SystemSettings>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  sopGears: any[];
  setSopGears: React.Dispatch<React.SetStateAction<any[]>>;
  sopGeneralRules: any[];
  setSopGeneralRules: React.Dispatch<React.SetStateAction<any[]>>;
  sopWasteRules: any[];
  setSopWasteRules: React.Dispatch<React.SetStateAction<any[]>>;
  sopEthicsRules: any[];
  setSopEthicsRules: React.Dispatch<React.SetStateAction<any[]>>;
  sopPenalties: any[];
  setSopPenalties: React.Dispatch<React.SetStateAction<any[]>>;
  onLogout: () => void;
  adminEmail: string;
  adminRole: string;
}

export default function AdminDashboard({
  destinations,
  setDestinations,
  trails,
  setTrails,
  bookings,
  setBookings,
  events,
  setEvents,
  gallery,
  setGallery,
  staff,
  setStaff,
  weather,
  setWeather,
  settings,
  setSettings,
  testimonials,
  setTestimonials,
  sopGears,
  setSopGears,
  sopGeneralRules,
  setSopGeneralRules,
  sopWasteRules,
  setSopWasteRules,
  sopEthicsRules,
  setSopEthicsRules,
  sopPenalties,
  setSopPenalties,
  onLogout,
  adminEmail,
  adminRole
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "destinations" | "trails" | "bookings" | "events" | "gallery" | "visitors" | "analytics" | "staff" | "settings" | "edit-beranda" | "edit-tentang-kami" | "edit-testimoni" | "edit-sop"
  >("overview");

  // Local utility states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    "Budi Wijaya mereservasi area Sunset Hammock.",
    "Ahmad Gunawan menerbitkan ulasan bintang 5 baru.",
    "status Jalur Batu Pelantikan diperbarui ke status Perbaikan."
  ]);
  const [showNotificationCount, setShowNotificationCount] = useState(true);

  // Print ticket modal holder
  const [printedBooking, setPrintedBooking] = useState<Booking | null>(null);

  // Logo file upload states & handlers
  const [logoUploadDragActive, setLogoUploadDragActive] = useState(false);

  const handleLogoFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Format berkas harus berupa gambar (PNG, JPG, SVG, dll).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === "string") {
        setSettings({ ...settings, logoImageUrl: e.target.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLogoDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setLogoUploadDragActive(true);
    } else if (e.type === "dragleave") {
      setLogoUploadDragActive(false);
    }
  };

  const handleLogoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLogoUploadDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLogoFile(e.dataTransfer.files[0]);
    }
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleLogoFile(e.target.files[0]);
    }
  };

  // Create Form States
  const [newDest, setNewDest] = useState<Partial<Destination>>({
    title: "",
    description: "",
    location: "",
    difficulty: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    category: "Viewpoint",
    elevation: "1,200m ASL",
    featured: false
  });

  const [newTrail, setNewTrail] = useState<Partial<HikingTrail>>({
    name: "",
    difficulty: "Intermediate",
    distance: "3.5 km",
    duration: "2 hours",
    elevationGain: "280 m",
    guideRequired: false,
    trailMapUrl: "M 10 90 Q 50 40 90 20",
    status: "Open",
    weatherCondition: "Clear skies",
    description: ""
  });

  const [newEvent, setNewEvent] = useState<Partial<TrailEvent>>({
    title: "",
    description: "",
    date: "2026-06-30",
    time: "09:00 - 13:00",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    category: "Hiking",
    price: 15,
    capacity: 25,
    registeredCount: 0
  });

  const [newMedia, setNewMedia] = useState({
    title: "",
    category: "Nature" as GalleryMedia["category"],
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  });

  const [newStaff, setNewStaff] = useState<Partial<StaffMember>>({
    name: "",
    role: "Junior Guide",
    phone: "",
    status: "Active",
    shiftSchedule: "Monday - Friday Shift"
  });

  // Calculations
  const totalRevenue = bookings
    .filter((b) => b.bookingStatus !== "Cancelled")
    .reduce((sum, current) => sum + current.totalAmount, 0);

  const activeEventsCount = events.length;

  const handleBookingStatusChange = (id: string, nextStatus: Booking["bookingStatus"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, bookingStatus: nextStatus } : b))
    );
    // Push alert
    setNotifications((prev) => [`Pass ticket update: ${id} status set to ${nextStatus}`, ...prev]);
  };

  const handleBookingPaymentChange = (id: string, nextPayment: Booking["paymentStatus"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, paymentStatus: nextPayment } : b))
    );
  };

  // Create Handlers
  const handleAddDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDest.title || !newDest.description) return;
    const item: Destination = {
      ...(newDest as Destination),
      id: "dest-" + Date.now()
    };
    setDestinations((prev) => [item, ...prev]);
    setNewDest({
      title: "",
      description: "",
      location: "",
      difficulty: "Medium",
      imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      category: "Viewpoint",
      elevation: "1,200m ASL",
      featured: false
    });
  };

  const handleAddTrail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrail.name || !newTrail.description) return;
    const item: HikingTrail = {
      ...(newTrail as HikingTrail),
      id: "trail-" + Date.now()
    };
    setTrails((prev) => [...prev, item]);
    setNewTrail({
      name: "",
      difficulty: "Intermediate",
      distance: "3.5 km",
      duration: "2 hours",
      elevationGain: "280 m",
      guideRequired: false,
      trailMapUrl: "M 10 90 Q 50 40 90 20",
      status: "Open",
      weatherCondition: "Clear skies",
      description: ""
    });
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.description) return;
    const item: TrailEvent = {
      ...(newEvent as TrailEvent),
      id: "event-" + Date.now(),
      registeredCount: 0
    };
    setEvents((prev) => [...prev, item]);
    setNewEvent({
      title: "",
      description: "",
      date: "2026-06-30",
      time: "09:00 - 13:00",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      category: "Hiking",
      price: 15,
      capacity: 25
    });
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedia.title) return;
    const item: GalleryMedia = {
      ...newMedia,
      id: "gal-" + Date.now()
    };
    setGallery((prev) => [item, ...prev]);
    setNewMedia({
      title: "",
      category: "Nature",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    });
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.phone) return;
    const item: StaffMember = {
      ...(newStaff as StaffMember),
      id: "staff-" + Date.now()
    };
    setStaff((prev) => [...prev, item]);
    setNewStaff({
      name: "",
      role: "Junior Guide",
      phone: "",
      status: "Active",
      shiftSchedule: "Monday - Friday Shift"
    });
  };

  // Local state for Testimonial editor
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    name: "",
    role: "Pengunjung",
    comment: "",
    rating: 5,
    date: new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }),
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
  });

  // Local states for SOP managers
  const [newSopGear, setNewSopGear] = useState({
    name: "",
    desc: "",
    tag: "Wajib"
  });

  const [newSopGeneralRule, setNewSopGeneralRule] = useState({
    num: "",
    title: "",
    desc: ""
  });

  const [newSopWasteRule, setNewSopWasteRule] = useState({
    title: "",
    desc: "",
    action: "Wajib Bawa Turun"
  });

  const [newSopEthicsRule, setNewSopEthicsRule] = useState({
    title: "",
    desc: "",
    iconName: "Ban"
  });

  const [newSopPenalty, setNewSopPenalty] = useState({
    level: "Tingkat I",
    name: "",
    desc: "",
    color: "border-amber-200 bg-amber-50/50 text-amber-900"
  });

  // Active sub-section for SOP management panel
  const [sopEditorSubSection, setSopEditorSubSection] = useState<"hours" | "gears" | "general" | "waste" | "ethics" | "penalties">("hours");

  const handleDeleteDest = (id: string) => {
    setDestinations((prev) => prev.filter((d) => d.id !== id));
  };

  const handleDeleteTrail = (id: string) => {
    setTrails((prev) => prev.filter((t) => t.id !== id));
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const handleDeleteMedia = (id: string) => {
    setGallery((prev) => prev.filter((m) => m.id !== id));
  };

  const handleDeleteStaff = (id: string) => {
    setStaff((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-800"}`} id="admin-dashboard-container">
      
      {/* 1. Collapsible Earth-Tone Sidebar */}
      <aside
        id="dashboard-sidebar"
        className={`bg-[#1F2937] text-white flex flex-col justify-between transition-all duration-300 relative ${
          sidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div>
          {/* Logo Heading Block */}
          <div className="p-5 border-b border-slate-700/60 flex items-center gap-2">
            <div className="p-1.5 bg-[#D4A017] rounded-lg text-slate-950 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            {!sidebarCollapsed && (
              <div className="animate-fade-in text-left">
                <span className="block font-sans font-black text-xs uppercase tracking-widest text-[#D4A017]">
                  BONTOLOJONG
                </span>
                <span className="block text-[8px] font-mono text-slate-400">KONTROL ADMIN</span>
              </div>
            )}
          </div>

          {/* Collapsible Action Button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute top-5 -right-3 bg-gradient-to-r from-[#D4A017] to-[#F28C28] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ring-2 ring-slate-900 select-none cursor-pointer"
          >
            {sidebarCollapsed ? "→" : "←"}
          </button>

          {/* Navigation links stack matches layout instructions */}
          <nav className="p-4 space-y-1.5 max-h-[75vh] overflow-y-auto" id="sidebar-navigator-list">
            {!sidebarCollapsed && (
              <span className="block px-2.5 text-[8px] font-mono text-slate-400 font-extrabold tracking-widest uppercase mb-1">Operasional</span>
            )}
            {[
              { id: "overview", label: "Dasbor Utama", icon: <LayoutDashboard className="w-4.5 h-4.5" /> },
              { id: "destinations", label: "Destinasi Spot", icon: <Compass className="w-4.5 h-4.5" /> },
              { id: "trails", label: "Jalur Pilihan", icon: <Map className="w-4.5 h-4.5" /> },
              { id: "bookings", label: "Pemesanan Tiket", icon: <CalendarDays className="w-4.5 h-4.5" /> },
              { id: "events", label: "Acara & Relawan", icon: <Plus className="w-4.5 h-4.5" /> },
              { id: "gallery", label: "Galeri Album", icon: <Image className="w-4.5 h-4.5" /> },
              { id: "visitors", label: "Pengunjung", icon: <Users className="w-4.5 h-4.5" /> },
              { id: "analytics", label: "Analisis", icon: <TrendingUp className="w-4.5 h-4.5" /> },
              { id: "staff", label: "Daftar Staf", icon: <Briefcase className="w-4.5 h-4.5" /> },
              { id: "settings", label: "Parameter Umum", icon: <Sliders className="w-4.5 h-4.5" /> }
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-sans font-semibold flex items-center space-x-3 transition-all cursor-pointer ${
                    active
                      ? "bg-[#D4A017] text-slate-950 shadow-md scale-[1.02]"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <span className="shrink-0">{tab.icon}</span>
                  {!sidebarCollapsed && <span className="truncate">{tab.label}</span>}
                </button>
              );
            })}

            <div className="pt-4 border-t border-slate-700/40 my-2" />

            {!sidebarCollapsed && (
              <span className="block px-2.5 text-[8px] font-mono text-[#D4A017] font-extrabold tracking-widest uppercase mb-1">Editor Halaman</span>
            )}
            {[
              { id: "edit-beranda", label: "Edit Beranda", icon: <Sun className="w-4.5 h-4.5 text-[#D4A017]" /> },
              { id: "edit-tentang-kami", label: "Edit Tentang Kami", icon: <FileText className="w-4.5 h-4.5 text-emerald-400" /> },
              { id: "edit-testimoni", label: "Edit Testimoni", icon: <HelpCircle className="w-4.5 h-4.5 text-blue-400" /> },
              { id: "edit-sop", label: "Edit SOP Kawasan", icon: <Shield className="w-4.5 h-4.5 text-rose-400" /> }
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-sans font-semibold flex items-center space-x-3 transition-all cursor-pointer ${
                    active
                      ? "bg-[#D4A017] text-slate-950 shadow-md scale-[1.02]"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <span className="shrink-0">{tab.icon}</span>
                  {!sidebarCollapsed && <span className="truncate">{tab.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Roster */}
        <div className="p-4 border-t border-slate-700/60 font-sans">
          <button
            onClick={onLogout}
            className="w-full p-2.5 rounded-xl hover:bg-red-500/10 hover:text-red-400 text-xs text-slate-300 font-bold flex items-center space-x-3 transition-colors text-left"
          >
            <LogOut className="w-4.5 h-4.5 shrink-0" />
            {!sidebarCollapsed && <span>Keluar Dasbor</span>}
          </button>
        </div>
      </aside>

      {/* 2. Primary Page Workspace */}
      <main className="flex-1 flex flex-col min-w-0 font-sans" id="primary-workspace">
        
        {/* Topbar sticky header */}
        <header className={`sticky top-0 z-30 flex justify-between items-center px-6 py-4 border-b ${
          darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        } select-none`}>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest hidden md:inline">Titik Periksa:</span>
            <span className="px-2.5 py-1 bg-gradient-to-r from-amber-50 to-orange-50 text-slate-700 text-[10px] font-mono border border-orange-100 rounded-md font-bold">
              {activeTab.toUpperCase()} SISTEM
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Cari data dalam database..."
                className="pl-8 pr-4 py-1.5 border border-slate-200 bg-slate-50 text-slate-800 rounded-xl text-xs focus:outline-none focus:bg-white w-48 focus:w-60 transition-all font-sans"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
            </div>

            {/* Dark Light mode toggle wrapper */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5 text-[#D4A017]" /> : <Moon className="w-4.5 h-4.5 text-slate-700" />}
            </button>

            {/* Notification alert bells */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationCount(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <Bell className="w-4.5 h-4.5" />
              </button>
              {showNotificationCount && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
              )}
            </div>

            {/* Admin visual profile badges */}
            <div className="flex items-center space-x-2.5 border-l border-slate-200 pl-4">
              <div className="size-8 rounded-full bg-gradient-to-br from-[#D4A017] to-amber-700 flex items-center justify-center text-white text-xs font-bold shadow-md">
                <span>SR</span>
              </div>
              <div className="hidden md:block text-left">
                <span className="block text-xs font-semibold leading-none text-slate-900">{adminRole}</span>
                <span className="block text-[9px] font-mono text-slate-400 mt-0.5">{adminEmail}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main tabs switch layout details */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto max-w-7xl w-full mx-auto" id="active-tab-panel">
          
          {/* TAB 1: OVERVIEW PANEL WITH HIGH QUALITY SVG GRAPHICS */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fade-in">
              {/* Alert Notice bar */}
              <div className="p-4 bg-orange-50 border border-orange-200 text-orange-950 rounded-2xl flex items-center justify-between text-xs font-sans">
                <p>
                  ⚡ Selamat datang kembali, {adminRole}! Data cuaca mikro aktif tercatat. <strong>Ranger Riadi</strong> sedang memantau pos jalur aktif.
                </p>
                <span className="font-mono text-[10px] text-orange-700">Petugas Aktif</span>
              </div>

              {/* Stat Boxes */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-[10px] font-mono tracking-wider text-slate-550 uppercase text-slate-450 block">Pendapatan Bersih Operasional</span>
                  <span className="text-2xl font-black font-sans text-slate-900 block mt-2">${totalRevenue} USD</span>
                  <span className="text-[10px] font-mono text-emerald-600 block mt-1">▲ 14.5% naik sejak siklus lalu</span>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-[10px] font-mono tracking-wider text-slate-550 uppercase text-slate-450 block">Izin Tiket Teregistrasi</span>
                  <span className="text-2xl font-black font-sans text-slate-900 block mt-2">{bookings.length} tiket</span>
                  <span className="text-[10px] font-mono text-emerald-600 block mt-1">▲ Seluruhnya sinkron</span>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-[10px] font-mono tracking-wider text-slate-550 uppercase text-slate-450 block">Ranger Pendamping Aktif</span>
                  <span className="text-2xl font-black font-sans text-slate-900 block mt-2">{staff.length} staf</span>
                  <span className="text-[10px] font-mono text-[#F28C28] block mt-1">● 2 Sedang berpatroli</span>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-[10px] font-mono tracking-wider text-[#A5682A] uppercase block">Ketinggian Puncak Kawasan</span>
                  <span className="text-2xl font-black font-sans text-slate-900 block mt-2">1,450m mdpl</span>
                  <span className="text-[10px] font-mono text-emerald-600 block mt-1">Prakiraan lautan awan stabil</span>
                </div>
              </div>

              {/* Real-time SVG line curves and chart stats */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* SVG Line Graph */}
                <div className="lg:col-span-8 p-6 bg-white border border-slate-200 rounded-3xl space-y-4">
                  <div className="flex justify-between items-baseline pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-sm font-sans font-black uppercase text-slate-900">SEASONAL VISITOR TRAFFIC</h4>
                      <p className="text-[10px] font-sans text-slate-400">Visitor volume tracker vs weather levels across five active stages.</p>
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-500">Last updated: 5 mins ago</span>
                  </div>

                  <div className="h-56 w-full flex items-center justify-center relative">
                    {/* SVG Curve Graphics */}
                    <svg className="w-full h-full text-slate-400" viewBox="0 0 500 200" preserveAspectRatio="none">
                      {/* Grid Lines */}
                      <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="160" x2="500" y2="160" stroke="#f1f5f9" strokeWidth="1" />
                      
                      {/* Chart Line Path */}
                      <path
                        d="M 20 180 Q 110 140, 200 80 T 380 40 T 480 20"
                        fill="none"
                        stroke="url(#gradient-chart)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      
                      {/* Dots on points */}
                      <circle cx="20" cy="180" r="5" fill="#D4A017" />
                      <circle cx="110" cy="140" r="5" fill="#F28C28" />
                      <circle cx="200" cy="80" r="5" fill="#7A4E2D" />
                      <circle cx="380" cy="40" r="5" fill="#4C7A34" />
                      <circle cx="481" cy="20" r="5" fill="#1F2937" />

                      <defs>
                        <linearGradient id="gradient-chart" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#D4A017" />
                          <stop offset="50%" stopColor="#F28C28" />
                          <stop offset="100%" stopColor="#7A4E2D" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Floating tracker tooltips simulating interactive chart */}
                    <div className="absolute top-1/4 left-1/2 p-2 bg-slate-900 text-white rounded-lg text-[9px] font-mono shadow border border-white/10 text-center select-none">
                      <span>Peak Weekends: 100% capacity</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>Mid-May (Base)</span>
                    <span>Late-May (Aviation)</span>
                    <span>Early-June (Peak Shower)</span>
                    <span>Late-June (Conservation)</span>
                  </div>
                </div>

                {/* Popular spots breakdown */}
                <div className="lg:col-span-4 p-6 bg-[#1F2937] text-white rounded-3xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-sans font-black uppercase text-orange-200 pb-3 border-b border-slate-700">POPULAR SPOTS DIVISION</h4>
                    <p className="text-[10px] font-sans text-slate-400 mt-2 leading-relaxed">
                      Sappan Overlook represents our highest booking density, followed by the cold water waterfalls and camping hammock clearings.
                    </p>
                  </div>

                  <div className="space-y-3.5 my-6">
                    {[
                      { name: "Sappan Overlook", p: 70, color: "bg-[#D4A017]" },
                      { name: "Cunang Waterfall", p: 48, color: "bg-[#F28C28]" },
                      { name: "Starry Camping Meadows", p: 35, color: "bg-emerald-500" }
                    ].map((spot, idx) => (
                      <div key={idx} className="space-y-1 font-sans text-xs">
                        <div className="flex justify-between text-[11px] text-slate-350">
                          <span>{spot.name}</span>
                          <span className="font-mono font-bold text-white">{spot.p}% capacity</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                          <div className={`h-full ${spot.color}`} style={{ width: `${spot.p}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <span className="text-[9px] font-mono text-slate-400 text-center block uppercase tracking-widest bg-slate-950/40 p-2 rounded-lg">
                    System health: 100% stable
                  </span>
                </div>

              </div>

              {/* Latest Notifications checklist logs */}
              <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-extrabold">Active System Notification Logs</h4>
                <div className="space-y-2.5 text-xs font-sans text-slate-600">
                  {notifications.map((not, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                        <p>{not}</p>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400">live</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DESTINATIONS EDITOR */}
          {activeTab === "destinations" && (
            <div className="space-y-8 animate-fade-in text-left">
              
              {/* Form card */}
              <div className="p-6 bg-[#FFF8EF]/40 border border-orange-100 rounded-3xl">
                <h3 className="text-base font-sans font-black uppercase text-slate-900 mb-4">Add New Nature Destination</h3>
                <form onSubmit={handleAddDestination} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Spot Title</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      placeholder="e.g., Mount Saputangan Height"
                      value={newDest.title}
                      onChange={(e) => setNewDest({ ...newDest, title: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Elevation tag</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      placeholder="e.g., 1,400m ASL"
                      value={newDest.elevation}
                      onChange={(e) => setNewDest({ ...newDest, elevation: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Sector / Location</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      placeholder="e.g., North Slope"
                      value={newDest.location}
                      onChange={(e) => setNewDest({ ...newDest, location: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Difficulty</label>
                    <select
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      value={newDest.difficulty}
                      onChange={(e: any) => setNewDest({ ...newDest, difficulty: e.target.value })}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Challenging">Challenging</option>
                    </select>
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Category type</label>
                    <select
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      value={newDest.category}
                      onChange={(e: any) => setNewDest({ ...newDest, category: e.target.value })}
                    >
                      <option value="Hill">Pine Hill</option>
                      <option value="Sunrise Area">Sunrise Spot</option>
                      <option value="Viewpoint">View Point</option>
                      <option value="Waterfall">Waterfall</option>
                      <option value="Campsite">Camping Field</option>
                      <option value="Photo Spot">Scenic swings</option>
                    </select>
                  </div>

                  <div className="md:col-span-6">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Short Description</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      placeholder="Specify misty mornings, orchids trees, local details..."
                      value={newDest.description}
                      onChange={(e) => setNewDest({ ...newDest, description: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-3 flex items-end">
                    <button
                      type="submit"
                      className="w-full p-2.5 bg-slate-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E2D] transition-colors cursor-pointer flex items-center justify-center space-x-1"
                    >
                      <Plus className="w-4.5 h-4.5" />
                      <span>Commit Spot</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Spots List */}
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="bg-[#FFF8EF] border-b border-slate-100 font-mono text-[10px] text-[#7A4E2D]">
                    <tr>
                      <th className="p-4">Spot Title & Sector</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Height Metrics</th>
                      <th className="p-4">Difficulty Level</th>
                      <th className="p-4 text-right">Settings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {destinations.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-slate-900">
                          <div>
                            <span>{d.title}</span>
                            <span className="block text-[9px] text-slate-400 font-mono mt-0.5">{d.location}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-medium">{d.category}</span>
                        </td>
                        <td className="p-4 text-slate-600 font-mono">{d.elevation}</td>
                        <td className="p-4">
                          <span className="font-semibold text-[#F28C28]">{d.difficulty}</span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteDest(d.id)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg hover:scale-105 transition-transform"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 3: HIKING TRAIL MANAGEMENT */}
          {activeTab === "trails" && (
            <div className="space-y-8 animate-fade-in text-left">
              
              <div className="p-6 bg-[#FFF8EF]/40 border border-orange-100 rounded-3xl">
                <h3 className="text-base font-sans font-black uppercase text-slate-900 mb-4">Add New Hiking path</h3>
                <form onSubmit={handleAddTrail} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Trail name</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      placeholder="e.g., Majestic Mahogany Walk"
                      value={newTrail.name}
                      onChange={(e) => setNewTrail({ ...newTrail, name: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Ranger Weather Status</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      placeholder="e.g., Clear paths, Cool wind"
                      value={newTrail.weatherCondition}
                      onChange={(e) => setNewTrail({ ...newTrail, weatherCondition: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Distance Gain</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      value={newTrail.distance}
                      onChange={(e) => setNewTrail({ ...newTrail, distance: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Difficulty level</label>
                    <select
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      value={newTrail.difficulty}
                      onChange={(e: any) => setNewTrail({ ...newTrail, difficulty: e.target.value })}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="md:col-span-6">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Detailed Description of path</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      placeholder="Detail rope assists, steep gravel hills, orchids gardens..."
                      value={newTrail.description}
                      onChange={(e) => setNewTrail({ ...newTrail, description: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Gate Status</label>
                    <select
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      value={newTrail.status}
                      onChange={(e: any) => setNewTrail({ ...newTrail, status: e.target.value })}
                    >
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>

                  <div className="md:col-span-3 flex items-end">
                    <button
                      type="submit"
                      className="w-full p-2.5 bg-slate-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E2D] transition-colors cursor-pointer"
                    >
                      Publish Trail
                    </button>
                  </div>
                </form>
              </div>

              {/* Trails List */}
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="bg-[#FFF8EF] border-b border-slate-100 font-mono text-[10px] text-[#7A4E2D]">
                    <tr>
                      <th className="p-4">Trail Name</th>
                      <th className="p-4">Level</th>
                      <th className="p-4">Distance & Timeframe</th>
                      <th className="p-4">Forecasting status</th>
                      <th className="p-4">Gate status</th>
                      <th className="p-4 text-right">Settings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {trails.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-slate-900">
                          <div>
                            <span>{t.name}</span>
                            <span className="block text-[9px] text-slate-400 font-mono mt-0.5">{t.description.substring(0, 70)}...</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 font-bold rounded text-[10px] uppercase ${
                            t.difficulty === "Beginner" ? "bg-emerald-100 text-emerald-800" : t.difficulty === "Intermediate" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"
                          }`}>{t.difficulty}</span>
                        </td>
                        <td className="p-4 text-slate-650 font-mono">{t.distance} ({t.duration})</td>
                        <td className="p-4 text-slate-600 font-sans italic text-[11px]">{t.weatherCondition}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 font-bold rounded-full text-[10px] uppercase ${
                            t.status === "Open" ? "bg-emerald-100 text-emerald-800 animate-pulse" : t.status === "Maintenance" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"
                          }`}>{t.status}</span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteTrail(t.id)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 4: BOOKING MANAGEMENT WITH TICKET GENERATORS */}
          {activeTab === "bookings" && (
            <div className="space-y-8 animate-fade-in text-left">
              
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="bg-[#FFF8EF] border-b border-slate-100 font-mono text-[10px] text-[#7A4E2D]">
                    <tr>
                      <th className="p-4">Ticket ID</th>
                      <th className="p-4">Visitor credentials</th>
                      <th className="p-4">Activity Category</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Total Fee</th>
                      <th className="p-4">Payment status</th>
                      <th className="p-4">Booking status</th>
                      <th className="p-4 text-right">Pass Tools</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {unsolicitedBookingsFilter(bookings, searchQuery).map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50">
                        <td className="p-4 font-mono font-bold text-slate-705 bg-slate-50/50">{b.id}</td>
                        <td className="p-4 font-medium text-slate-900">
                          <div>
                            <span className="font-extrabold">{b.visitorName}</span>
                            <span className="block text-[9px] text-slate-400 font-mono mt-0.5">{b.phone} | {b.email}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <span className="font-sans font-bold text-[#F28C28]">{b.activityType}</span>
                            <span className="block text-[9.5px] text-[#7A4E2D] font-mono font-bold mt-0.5 uppercase">
                              {b.activityType === "Trail Hiking" ? b.trailName : b.campSiteName ? b.campSiteName : "Pass Basecamp"}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-600 font-mono">{b.bookingDate}</td>
                        <td className="p-4 text-slate-905 font-extrabold font-mono">${b.totalAmount}</td>
                        <td className="p-4">
                          <button
                            onClick={() => handleBookingPaymentChange(b.id, b.paymentStatus === "Paid" ? "Pending" : "Paid")}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-extrabold cursor-pointer transition-colors ${
                              b.paymentStatus === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {b.paymentStatus.toUpperCase()}
                          </button>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 text-[10px] rounded-full uppercase font-bold ${
                            b.bookingStatus === "Confirmed" ? "bg-emerald-100 text-emerald-800" : b.bookingStatus === "Cancelled" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                          }`}>{b.bookingStatus}</span>
                        </td>
                        <td className="p-4 text-right flex items-center justify-end gap-1.5 pt-6">
                          
                          {/* Approve booking trigger */}
                          {b.bookingStatus === "Awaiting Approval" && (
                            <button
                              onClick={() => handleBookingStatusChange(b.id, "Confirmed")}
                              className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg hover:scale-105 transition-transform"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}

                          {/* Print ticket overlay triggers */}
                          <button
                            onClick={() => setPrintedBooking(b)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg hover:scale-105 transition-transform"
                            title="Generate Pass Passport"
                          >
                            <Printer className="w-4 h-4" />
                          </button>

                          {/* Cancel ticket booking triggers */}
                          {b.bookingStatus !== "Cancelled" && (
                            <button
                              onClick={() => handleBookingStatusChange(b.id, "Cancelled")}
                              className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg hover:scale-105 transition-transform"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 5: EVENT MANAGEMENT */}
          {activeTab === "events" && (
            <div className="space-y-8 animate-fade-in text-left">
              
              <div className="p-6 bg-[#FFF8EF]/40 border border-orange-100 rounded-3xl">
                <h3 className="text-base font-sans font-black uppercase text-slate-900 mb-4">Add Upcoming Forest event</h3>
                <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Event Title</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      placeholder="e.g., Annual Pine Tree Planting Camp"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1 font-semibold">Event schedules Date</label>
                    <input
                      required
                      type="date"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Ticket Price ($)</label>
                    <input
                      required
                      type="number"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      value={newEvent.price}
                      onChange={(e) => setNewEvent({ ...newEvent, price: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1 font-semibold">Category</label>
                    <select
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      value={newEvent.category}
                      onChange={(e: any) => setNewEvent({ ...newEvent, category: e.target.value })}
                    >
                      <option value="Hiking">Hiking Group</option>
                      <option value="Camping">Camping Out</option>
                      <option value="Community">Community Seed</option>
                      <option value="Photography">Eco Photography</option>
                    </select>
                  </div>

                  <div className="md:col-span-6">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Detailed Event Agenda</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      placeholder="Agendas, gear renting setups, timings, hot drinks configurations..."
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Total Capacity</label>
                    <input
                      required
                      type="number"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      value={newEvent.capacity}
                      onChange={(e) => setNewEvent({ ...newEvent, capacity: parseInt(e.target.value) || 1 })}
                    />
                  </div>

                  <div className="md:col-span-3 flex items-end">
                    <button
                      type="submit"
                      className="w-full p-2.5 bg-slate-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#7A4E2D]"
                    >
                      Create Event
                    </button>
                  </div>
                </form>
              </div>

              {/* Events lists table */}
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="bg-[#FFF8EF] border-b border-slate-100 font-mono text-[10px] text-[#7A4E2D]">
                    <tr>
                      <th className="p-4">Event title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Date & hour</th>
                      <th className="p-4">Total Registry</th>
                      <th className="p-4">Price Fee</th>
                      <th className="p-4 text-right">Configuration Settings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {events.map((e) => (
                      <tr key={e.id} className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-slate-900">
                          <div>
                            <span>{e.title}</span>
                            <span className="block text-[9.5px] text-slate-400 font-sans mt-0.5 leading-relaxed">{e.description.substring(0, 80)}...</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 bg-orange-50 font-medium text-[#7A4E2D] rounded">{e.category}</span>
                        </td>
                        <td className="p-4 text-slate-600 font-mono">{e.date} | {e.time}</td>
                        <td className="p-4">
                          <span className="font-extrabold">{e.registeredCount} / {e.capacity}</span>
                        </td>
                        <td className="p-4 font-bold font-mono">${e.price}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteEvent(e.id)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 6: GALLERY MEDIA MANAGEMENT */}
          {activeTab === "gallery" && (
            <div className="space-y-8 animate-fade-in text-left font-sans">
              
              <div className="p-6 bg-[#FFF8EF]/40 border border-orange-100 rounded-3xl">
                <h3 className="text-base font-sans font-black uppercase text-slate-900 mb-4">Add Media Photography to Album</h3>
                <form onSubmit={handleAddMedia} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Image Caption Title</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      placeholder="e.g., Starry Ridge constellation panorama"
                      value={newMedia.title}
                      onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Album Category allocation</label>
                    <select
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      value={newMedia.category}
                      onChange={(e: any) => setNewMedia({ ...newMedia, category: e.target.value })}
                    >
                      <option value="Nature">Valley Nature</option>
                      <option value="Sunrise">Sunrise Summit</option>
                      <option value="Hiking">Trekking Tracks</option>
                      <option value="Camping">constellations camp</option>
                      <option value="Drone Shot">Aviation drone photography</option>
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Photo Reference Content URL</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      value={newMedia.imageUrl}
                      onChange={(e) => setNewMedia({ ...newMedia, imageUrl: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2 flex items-end">
                    <button
                      type="submit"
                      className="w-full p-2.5 bg-[#D4A017] hover:bg-slate-950 text-slate-950 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Upload Snapshot
                    </button>
                  </div>
                </form>
              </div>

              {/* Grid lists */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="admin-gallery-grid-list">
                {gallery.map((m) => (
                  <div key={m.id} className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-square bg-slate-100 flex flex-col justify-end">
                    <img
                      src={m.imageUrl}
                      alt={m.title}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-100" />
                    
                    <button
                      onClick={() => handleDeleteMedia(m.id)}
                      className="p-1.5 bg-slate-900/80 hover:bg-slate-905 text-red-500 hover:text-red-400 rounded-lg absolute top-2.5 right-2.5 z-10 scale-90"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="relative z-10 p-3 text-slate-50">
                      <span className="text-[8px] font-mono text-[#D4A017] block font-semibold uppercase">{m.category}</span>
                      <h5 className="text-[10px] leading-tight font-extrabold truncate uppercase font-sans tracking-tight mt-0.5">{m.title}</h5>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 7: VISITORS LOG BOOK & REVIEWS */}
          {activeTab === "visitors" && (
            <div className="space-y-8 animate-fade-in text-left">
              <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4">
                <h3 className="text-base font-sans font-black uppercase text-slate-900">VISITOR ENQUIRIES & PASS LOGS</h3>
                <p className="text-xs text-slate-500">
                  Comprehensive listing of all travelers registered for active mountain, camping, and trekking permissions at Bontolojong gates.
                </p>

                <div className="divide-y divide-slate-100">
                  {bookings.map((v, i) => (
                    <div key={i} className="py-4.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h4 className="text-sm font-sans font-bold text-slate-905 flex items-center space-x-2">
                          <span>{v.visitorName}</span>
                          <span className="text-[10px] font-mono py-0.5 px-2 bg-slate-100 border border-slate-200 rounded-md shadow-sm text-slate-500 font-semibold">{v.id}</span>
                        </h4>
                        <div className="mt-1 text-xs text-slate-450 font-mono leading-relaxed">
                          <span>Contacts: {v.phone} | {v.email}</span>
                        </div>
                        {v.notes && (
                          <div className="mt-2 text-xs font-sans text-[#7A4E2D] italic bg-[#FFF8EF] p-2 rounded border border-[#D4A017]/10 max-w-lg leading-relaxed">
                            Ranger notes: "{v.notes}"
                          </div>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <span className="px-3 py-1 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border border-emerald-100 font-mono font-bold text-[10px] uppercase rounded-md shadow-sm">
                          Verified Pass holder
                        </span>
                        <span className="block text-[10px] text-slate-400 font-mono tracking-wide mt-1.5 font-medium">Activity: {v.activityType}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: DETAILED REVENUE & PEAKS ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-8 animate-fade-in text-left">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                
                <div className="p-6 bg-[#1F2937] text-white rounded-3xl space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4A017] font-black">PEAK EXPLORER TIME SLOTS</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Forecasting metrics of peak visitor flow coordinates within a normal 24-hour cycle at Bontolojong gatehouse checkpoints.
                  </p>

                  <div className="space-y-4 pt-4 font-mono text-xs">
                    {[
                      { hours: "04:00 AM - 07:00 AM (Sunrise peak)", level: "Extreme (clouds peak)", p: 95, c: "bg-amber-400" },
                      { hours: "08:00 AM - 12:00 PM (Orchards tour)", level: "Moderate flow", p: 45, c: "bg-indigo-400" },
                      { hours: "04:00 PM - 07:00 PM (Camp setups)", level: "High setups", p: 75, c: "bg-[#F28C28]" }
                    ].map((slot, i) => (
                      <div key={i} className="p-4.5 bg-slate-900 rounded-xl border border-slate-700/60 leading-relaxed">
                        <div className="flex justify-between font-sans text-xs">
                          <strong>{slot.hours}</strong>
                          <span className="text-[10px] uppercase text-amber-100">{slot.level}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-3">
                          <div className={`h-full ${slot.c}`} style={{ width: `${slot.p}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-black">REVENUE DISTRIBUTION LOGS</h4>
                  <div className="h-56 w-full flex items-center justify-center relative bg-orange-50/25 rounded-2xl border border-dashed border-arange-100 p-6">
                    {/* SVG Bar Chart Graphic */}
                    <svg className="w-full h-full text-slate-350" viewBox="0 0 400 150">
                      <rect x="30" y="50" width="30" height="100" fill="#D4A017" rx="3" />
                      <rect x="110" y="30" width="30" height="120" fill="#F28C28" rx="3" />
                      <rect x="190" y="70" width="30" height="80" fill="#7A4E2D" rx="3" />
                      <rect x="270" y="90" width="30" height="60" fill="#4C7A34" rx="3" />
                      <rect x="350" y="20" width="30" height="130" fill="#1F2937" rx="3" />
                    </svg>
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                    <span>Hikes</span>
                    <span>Camps</span>
                    <span>EcoTours</span>
                    <span>Photos</span>
                    <span>Merch</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 9: STAFF ROSTER SCHEDULES */}
          {activeTab === "staff" && (
            <div className="space-y-8 animate-fade-in text-left">
              
              <div className="p-6 bg-[#FFF8EF]/40 border border-orange-100 rounded-3xl">
                <h3 className="text-base font-sans font-black uppercase text-slate-900 mb-4 font-semibold">Duty Roster Guide Coordinator</h3>
                <form onSubmit={handleAddStaff} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Guide Name / Staff Hand</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      placeholder="e.g., Haris Saputra"
                      value={newStaff.name}
                      onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1 font-semibold">Active shift hours</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      placeholder="e.g., Mon - Fri, 05AM - 01PM"
                      value={newStaff.shiftSchedule}
                      onChange={(e) => setNewStaff({ ...newStaff, shiftSchedule: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">WhatsApp Mobile Contact</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      placeholder="e.g., +62 812-4455-9011"
                      value={newStaff.phone}
                      onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1 font-semibold">Designated division</label>
                    <select
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none"
                      value={newStaff.role}
                      onChange={(e: any) => setNewStaff({ ...newStaff, role: e.target.value })}
                    >
                      <option value="Lead Guide">Lead Guide</option>
                      <option value="Junior Guide">Junior Guide</option>
                      <option value="Ranger">Forest Rangers</option>
                      <option value="Operations">Operations desks</option>
                    </select>
                  </div>

                  <div className="md:col-span-12 flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-slate-950 hover:bg-[#7A4E2D] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                    >
                      Enlist Roster Guide
                    </button>
                  </div>
                </form>
              </div>

              {/* Roster list */}
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="bg-[#FFF8EF] border-b border-slate-100 font-mono text-[10px] text-[#7A4E2D]">
                    <tr>
                      <th className="p-4">Staff Team member</th>
                      <th className="p-4">Designation Role</th>
                      <th className="p-4">Roster Schedules</th>
                      <th className="p-4">Duty Status</th>
                      <th className="p-4">Whatsapp Line</th>
                      <th className="p-4 text-right">Disconnect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {staff.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-slate-905">{s.name}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 bg-slate-150 rounded text-[10.5px] font-semibold text-[#7A4E2D]">{s.role}</span>
                        </td>
                        <td className="p-4 text-slate-600 font-sans italic">{s.shiftSchedule}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                            s.status === "Active" ? "bg-emerald-100 text-emerald-800" : s.status === "On Trail" ? "bg-amber-100 text-amber-800 animate-pulse" : "bg-slate-100 text-slate-800"
                          }`}>{s.status}</span>
                        </td>
                        <td className="p-4 font-mono font-bold text-[#F28C28]">{s.phone}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteStaff(s.id)}
                            className="p-1.5 bg-red-50 hover:bg-red-105 text-red-600 rounded-lg hover:scale-105 transition-transform"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 10: ADMINISTRATIVE SETTINGS CUSTOMIZATIONS */}
          {activeTab === "settings" && (
            <div className="space-y-8 animate-fade-in text-left">
              
              <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-6">
                <div>
                  <h3 className="text-base font-sans font-black uppercase text-slate-900">Custom System Parameters settings</h3>
                  <p className="text-xs text-slate-500 mt-1">Configure global pricing thresholds and metadata changes occurring live on the website.</p>
                </div>

                {/* VISUAL LOGO & BRAND IDENTITY EDITOR MODULE */}
                <div id="visual-logo-identity-editor" className="p-5 bg-gradient-to-br from-cream/10 to-[#FFF8EF]/20 border border-orange-100 rounded-2xl space-y-5">
                  <div className="flex items-center space-x-2 pb-3 border-b border-orange-100">
                    <span className="text-lg">🎨</span>
                    <div>
                      <h4 className="text-xs font-sans font-black uppercase text-slate-900">MENGEDIT LOGO & BRANDING</h4>
                      <p className="text-[10px] text-slate-500">Edit nama logo, tagline, simbol ikon bawaan, atau atur tautan gambar logo khusus.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                    
                    {/* Brand Meta inputs */}
                    <div className="md:col-span-8 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Nama Logo Brand</label>
                          <input
                            required
                            type="text"
                            className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:bg-white text-slate-800 font-bold font-sans"
                            value={settings.logoName}
                            onChange={(e) => setSettings({ ...settings, logoName: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Tagline Slogan</label>
                          <input
                            required
                            type="text"
                            className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:bg-white text-slate-800 font-sans"
                            value={settings.tagline}
                            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-semibold mb-1">Pilih Simbol Ikon Logo</label>
                          <select
                            className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:bg-white text-slate-800 font-sans cursor-pointer"
                            value={settings.logoShape || "mountain"}
                            onChange={(e) => setSettings({ ...settings, logoShape: e.target.value })}
                            disabled={!!settings.logoImageUrl}
                          >
                            <option value="mountain">🗻 Gunung Raksasa (Mountain)</option>
                            <option value="tree">🌲 Hutan Pinus (Trees)</option>
                            <option value="compass">🧭 Kompas Petualang (Compass)</option>
                            <option value="sun">☀️ Cahaya Mentari (Sun)</option>
                            <option value="leaf">🍃 Daun Hortikultura (Leaf)</option>
                          </select>
                          {settings.logoImageUrl && (
                            <p className="text-[9px] text-red-500 mt-1">Nonaktif karena Anda menyetel tautan gambar logo khusus di samping.</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Tautan / Unggah Gambar Logo</label>
                          
                          {/* Photo Uploader Dropzone Box conforming to Usability Patterns */}
                          <div
                            onDragEnter={handleLogoDrag}
                            onDragOver={handleLogoDrag}
                            onDragLeave={handleLogoDrag}
                            onDrop={handleLogoDrop}
                            onClick={() => document.getElementById("logo-file-uploader")?.click()}
                            className={`relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[110px] ${
                              logoUploadDragActive
                                ? "border-orange-500 bg-orange-50/50"
                                : settings.logoImageUrl
                                  ? "border-emerald-300 bg-emerald-50/10 hover:bg-emerald-50/20"
                                  : "border-slate-300 hover:border-orange-400 bg-slate-50/50 hover:bg-slate-50"
                            }`}
                          >
                            <input
                              type="file"
                              id="logo-file-uploader"
                              accept="image/*"
                              onChange={handleLogoFileChange}
                              className="hidden"
                            />

                            {settings.logoImageUrl ? (
                              <div className="space-y-1.5 w-full">
                                <div className="flex items-center justify-center space-x-2">
                                  <div className="w-8 h-8 rounded border border-emerald-200 overflow-hidden bg-white shadow-sm flex items-center justify-center shrink-0">
                                    <img
                                      src={settings.logoImageUrl}
                                      alt="Uploaded logo"
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="text-left truncate max-w-[150px]">
                                    <span className="block text-[9px] font-bold text-emerald-800 uppercase tracking-wider">✔ LOGO TERUNGGAH</span>
                                    <span className="block text-[8px] font-mono text-slate-400 truncate">
                                      {settings.logoImageUrl.startsWith("data:") ? "Berkas Foto Lokal (Base64)" : settings.logoImageUrl}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSettings({ ...settings, logoImageUrl: "" });
                                  }}
                                  className="mt-1 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 font-mono text-[8px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
                                >
                                  Hapus / Ganti Foto Logo
                                </button>
                              </div>
                            ) : (
                              <>
                                <Upload className={`w-5 h-5 mb-1 ${logoUploadDragActive ? "text-orange-500" : "text-slate-400"}`} />
                                <span className="block text-[10px] text-slate-700 font-sans font-bold">
                                  {logoUploadDragActive ? "Lepaskan file sekarang!" : "Tarik & Lepas Gambar Logo"}
                                </span>
                                <span className="block text-[8px] text-slate-400 font-sans mt-0.5">
                                  Atau klik manual untuk memilih berkas foto Anda
                                </span>
                              </>
                            )}
                          </div>

                          {/* Extra text link input for advanced control/direct image links */}
                          <div className="space-y-1 mt-2 text-left">
                            <label className="block text-[8px] font-mono text-slate-450 uppercase font-bold">Atau masukkan link URL Gambar:</label>
                            <input
                              type="text"
                              placeholder="https://contoh-link.com/logo.png"
                              className="w-full p-2 text-[10px] rounded-lg bg-white border border-slate-200 focus:outline-none text-slate-800 font-mono"
                              value={settings.logoImageUrl || ""}
                              onChange={(e) => setSettings({ ...settings, logoImageUrl: e.target.value })}
                            />
                            <p className="text-[9px] text-slate-400 leading-tight">Mendukung unggahan media langsung maupun tautan URL gambar statis.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Brand Preview panel feedback */}
                    <div className="md:col-span-4 bg-white p-4 rounded-xl border border-dashed border-[#D4A017]/30 flex flex-col justify-between text-center min-h-[160px]">
                      <span className="text-[9px] font-mono font-semibold text-slate-450 uppercase tracking-wider block">Live Brand Preview</span>
                      
                      <div className="flex items-center space-x-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100/80 mx-auto w-full select-none justify-center">
                        <div className="w-10 h-10 bg-[#D4A017] rounded-lg flex items-center justify-center shadow-md overflow-hidden shrink-0">
                          {settings.logoImageUrl ? (
                            <img
                              src={settings.logoImageUrl}
                              alt="Brando Logo Preview"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            (() => {
                              const className = "w-5 h-5 text-white";
                              switch (settings.logoShape) {
                                case "tree":
                                  return <Trees className={className} />;
                                case "compass":
                                  return <Compass className={className} />;
                                case "sun":
                                  return <Sun className={className} />;
                                case "leaf":
                                  return <Leaf className={className} />;
                                case "mountain":
                                default:
                                  return <Mountain className={className} />;
                              }
                            })()
                          )}
                        </div>
                        <div className="text-left font-sans truncate">
                          <span className="block font-sans font-bold text-xs uppercase tracking-tight text-slate-900 truncate max-w-[130px]">
                            {settings.logoName || "BONTOLOJONG"}
                          </span>
                          <span className="block text-[8px] font-mono text-slate-400 mt-0.5 truncate max-w-[130px]">
                            {settings.tagline || ""}
                          </span>
                        </div>
                      </div>

                      <div className="text-[9px] font-mono text-[#D4A017] uppercase tracking-widest mt-2">
                        SINKRON KE SELURUH NAVBAR & FOOTER
                      </div>
                    </div>

                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Base hiking ticket ($)</label>
                    <input
                      required
                      type="number"
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800 font-mono"
                      value={settings.baseHikingTicketPrice}
                      onChange={(e) => setSettings({ ...settings, baseHikingTicketPrice: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Base camping ticket ($)</label>
                    <input
                      required
                      type="number"
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800 font-mono"
                      value={settings.baseCampingTicketPrice}
                      onChange={(e) => setSettings({ ...settings, baseCampingTicketPrice: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1 font-semibold">Operations email line</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-semibold text-[#7A4E2D] font-bold mb-1">Ranger Whatsapp link</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800 font-mono font-bold"
                      value={settings.contactWhatsapp}
                      onChange={(e) => setSettings({ ...settings, contactWhatsapp: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setNotifications((prev) => ["Administrative metrics updated", ...prev]);
                      alert("Administrative guidelines successfully updated!");
                    }}
                    className="px-6 py-3 bg-[#D4A017] hover:bg-[#F28C28] text-slate-950 hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-transform hover:-translate-y-0.5 shadow flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Parameters</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 12: EDIT KONTEN BERANDA */}
          {activeTab === "edit-beranda" && (
            <div className="space-y-8 animate-fade-in text-slate-800">
              <div className="border-b border-orange-100 pb-5">
                <h3 className="text-xl font-display text-slate-900 uppercase tracking-tight">Edit Konten Beranda</h3>
                <p className="text-slate-500 text-xs font-sans mt-0.5">Atur visual, tagline slogan, dan tiga metrik utama yang tampil di layar utama utama (Hero).</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Inputs card */}
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-sm">
                  <h4 className="text-[10px] font-mono text-[#D4A017] uppercase font-bold tracking-widest block mb-1">DATA LAYOUT HERO</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Nama / Logo Kawasan (Beranda)</label>
                      <input
                        type="text"
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800"
                        value={settings.logoName || ""}
                        onChange={(e) => setSettings({ ...settings, logoName: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Slogan Tagline</label>
                      <input
                        type="text"
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800"
                        value={settings.tagline || ""}
                        onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Teks Kepemilikan & Status Kawasan</label>
                      <input
                        type="text"
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800"
                        value={settings.heroEstText || ""}
                        onChange={(e) => setSettings({ ...settings, heroEstText: e.target.value })}
                        placeholder="ESTABLISHED IN 2021 | MT. LOMPOBATTANG SECTOR"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">URL Foto Background Hero</label>
                      <input
                        type="text"
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800 font-mono"
                        value={settings.heroBackgroundUrl || ""}
                        onChange={(e) => setSettings({ ...settings, heroBackgroundUrl: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div>
                        <label className="block text-[9px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Metrik 1 (Ketinggian)</label>
                        <input
                          type="text"
                          className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none text-slate-800"
                          value={settings.heroHeightMetric || ""}
                          onChange={(e) => setSettings({ ...settings, heroHeightMetric: e.target.value })}
                          placeholder="1,450M"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Metrik 2 (Jalur Trek)</label>
                        <input
                          type="text"
                          className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none text-slate-800"
                          value={settings.heroTrailsMetric || ""}
                          onChange={(e) => setSettings({ ...settings, heroTrailsMetric: e.target.value })}
                          placeholder="8 ACTIVE"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Metrik 3 (Konservasi)</label>
                        <input
                          type="text"
                          className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none text-slate-800"
                          value={settings.heroConservationMetric || ""}
                          onChange={(e) => setSettings({ ...settings, heroConservationMetric: e.target.value })}
                          placeholder="2,400 HA"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setNotifications((prev) => ["Beranda Hero metrics successfully updated!", ...prev]);
                        alert("Hero Header dan Metrik Beranda berhasil disimpan!");
                      }}
                      className="px-5 py-2.5 bg-[#D4A017] hover:bg-[#F28C28] text-slate-950 hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow cursor-pointer flex items-center space-x-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan Beranda</span>
                    </button>
                  </div>
                </div>

                {/* Simulated Preview card */}
                <div className="lg:col-span-5 space-y-4">
                  <h4 className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-widest block text-left">ESTETIKA PREVIEW</h4>
                  
                  <div className="relative rounded-3xl overflow-hidden h-[340px] border border-orange-100/50 shadow flex flex-col justify-between p-6 bg-cover bg-center text-white" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.4)), url(${settings.heroBackgroundUrl || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"})` }}>
                    <div className="text-center font-mono text-[9px] uppercase tracking-widest text-[#E0A926]">
                      {settings.heroEstText || "ESTABLISHED IN 2021 | MT. LOMPOBATTANG SECTOR"}
                    </div>

                    <div className="text-center space-y-1.5">
                      <h4 className="font-display text-2xl uppercase tracking-tighter leading-none">{settings.logoName || "BONTOLOJONG"}</h4>
                      <p className="text-[10px] font-sans tracking-wide italic text-orange-100 opacity-90">{settings.tagline || "Petualangan Luhur Di Lembah Pusaka"}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center border-t border-white/20 pt-4 font-sans bg-black/30 p-2.5 rounded-2xl">
                      <div>
                        <span className="block text-sm font-black font-display font-bold text-[#E0A926]">{settings.heroHeightMetric || "1,450M"}</span>
                        <span className="block text-[8px] font-mono uppercase text-slate-200 mt-0.5">Ketinggian</span>
                      </div>
                      <div>
                        <span className="block text-sm font-black font-display font-bold text-[#E0A926]">{settings.heroTrailsMetric || "8 ACTIVE"}</span>
                        <span className="block text-[8px] font-mono uppercase text-slate-200 mt-0.5">Jalur Trek</span>
                      </div>
                      <div>
                        <span className="block text-sm font-black font-display font-bold text-[#E0A926]">{settings.heroConservationMetric || "2,400 HA"}</span>
                        <span className="block text-[8px] font-mono uppercase text-slate-200 mt-0.5">Lindung</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 13: EDIT TENTANG KAMI */}
          {activeTab === "edit-tentang-kami" && (
            <div className="space-y-8 animate-fade-in text-slate-800">
              <div className="border-b border-orange-100 pb-5">
                <h3 className="text-xl font-display text-slate-900 uppercase tracking-tight">Edit Konten Tentang Kami</h3>
                <p className="text-slate-500 text-xs font-sans mt-0.5">Ubah histori kebangkitan kawasan, takdir konservasi, serta visi agrowisata agung Bontolojong.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Form fields */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-sm text-left">
                  <h4 className="text-[10px] font-mono text-[#D4A017] uppercase font-bold tracking-widest block mb-1">HISTORI & MISI KAWASAN</h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Tautan URL Foto Utama Tentang Kami</label>
                      <input
                        type="text"
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800 font-mono"
                        value={settings.aboutImageUrl || ""}
                        onChange={(e) => setSettings({ ...settings, aboutImageUrl: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Judul Sejarah Singkat</label>
                      <input
                        type="text"
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800"
                        value={settings.aboutHistoryTitle || ""}
                        onChange={(e) => setSettings({ ...settings, aboutHistoryTitle: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Paragraf Sejarah 1</label>
                      <textarea
                        rows={3}
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800 leading-relaxed font-sans"
                        value={settings.aboutHistoryDesc1 || ""}
                        onChange={(e) => setSettings({ ...settings, aboutHistoryDesc1: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Paragraf Sejarah 2</label>
                      <textarea
                        rows={3}
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800 leading-relaxed font-sans"
                        value={settings.aboutHistoryDesc2 || ""}
                        onChange={(e) => setSettings({ ...settings, aboutHistoryDesc2: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Visi Misi dan Semboyan Konservasi</label>
                      <textarea
                        rows={2}
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800 font-bold"
                        value={settings.aboutMissionText || ""}
                        onChange={(e) => setSettings({ ...settings, aboutMissionText: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setNotifications((prev) => ["About page data successfully saved!", ...prev]);
                        alert("Data deskripsi Tentang Kami berhasil disimpan!");
                      }}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow cursor-pointer flex items-center space-x-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan Tentang Kami</span>
                    </button>
                  </div>
                </div>

                {/* Preview layout box */}
                <div className="space-y-4 text-left">
                  <h4 className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-widest block font-bold">PREVIEW TENTANG KAMI</h4>

                  <div className="border border-slate-200 rounded-3xl bg-slate-50 p-6 space-y-4">
                    <div className="w-full h-40 rounded-2xl overflow-hidden bg-slate-200 border">
                      <img
                        src={settings.aboutImageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"}
                        alt="Tentang kami preview image"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-display text-lg uppercase text-slate-900 border-b border-orange-100 pb-1">{settings.aboutHistoryTitle || "SINKRONISASI SEJARAH PUSAKA"}</h4>
                      <p className="text-slate-650 text-[11px] leading-relaxed font-light line-clamp-3">{settings.aboutHistoryDesc1}</p>
                      <p className="text-slate-655 text-[11px] leading-relaxed font-light line-clamp-3">{settings.aboutHistoryDesc2}</p>
                      <div className="p-3 bg-emerald-100/30 border border-emerald-100 rounded-xl">
                        <span className="block text-[9px] font-mono font-bold tracking-wider text-emerald-800 mb-1">🌲 VISI &amp; MISI PETUALANGAN</span>
                        <p className="text-emerald-950 font-sans text-xs italic font-semibold">"{settings.aboutMissionText}"</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 14: EDIT TESTIMONI */}
          {activeTab === "edit-testimoni" && (
            <div className="space-y-8 animate-fade-in text-slate-800">
              <div className="border-b border-orange-100 pb-5 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <h3 className="text-xl font-display text-slate-900 uppercase tracking-tight">Edit Testimoni Pengunjung</h3>
                  <p className="text-slate-500 text-xs font-sans mt-0.5">Kelola verifikasi, bintang kepuasan, masukan, dan cerita perjalanan pendaki di Bontolojong.</p>
                </div>
                <span className="mt-2 sm:mt-0 px-3.5 py-1.5 bg-blue-50 text-blue-700 font-mono text-[9px] font-bold uppercase tracking-widest rounded-lg border border-blue-100 shadow-sm inline-block leading-none">
                  ⭐ Rekor Kepuasan Aktif
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Form to append new review */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm text-left">
                  <h4 className="text-[10px] font-mono text-[#D4A017] uppercase font-bold tracking-widest block mb-1">✏ TAMBAH REVIU TERVERIFIKASI</h4>
                  
                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Nama Lengkap Pendaki</label>
                      <input
                        type="text"
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800 font-semibold"
                        value={newTestimonial.name || ""}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                        placeholder="e.g. Rian Gumilang"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Status / Rencana</label>
                        <input
                          type="text"
                          className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none text-slate-800 animate-none"
                          value={newTestimonial.role || ""}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                          placeholder="e.g. Pendaki Backpacker"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Rating Bintang (1-5)</label>
                        <select
                          className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none text-slate-800 font-mono font-bold"
                          value={newTestimonial.rating || 5}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) || 5 })}
                        >
                          <option value="5">⭐⭐⭐⭐⭐ 5 Bintang</option>
                          <option value="4">⭐⭐⭐⭐ 4 Bintang</option>
                          <option value="3">⭐⭐⭐ 3 Bintang</option>
                          <option value="2">⭐⭐ 2 Bintang</option>
                          <option value="1">⭐ 1 Bintang</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Tautan Foto Profil Avatar</label>
                      <input
                        type="text"
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none text-slate-800 font-mono"
                        value={newTestimonial.avatarUrl || ""}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, avatarUrl: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Kesan Pesan / Feedback Ulasan</label>
                      <textarea
                        rows={3}
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800 font-light font-sans leading-relaxed"
                        value={newTestimonial.comment || ""}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })}
                        placeholder="Ketik ulasan berharga mereka disini..."
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        if (!newTestimonial.name || !newTestimonial.comment) {
                          alert("Mohon isi kolom Nama dan Kesan terlebih dahulu!");
                          return;
                        }
                        const item: Testimonial = {
                          id: "testi-" + Date.now(),
                          name: newTestimonial.name,
                          role: newTestimonial.role || "Pengunjung",
                          comment: newTestimonial.comment,
                          rating: newTestimonial.rating || 5,
                          date: newTestimonial.date || "Baru saja",
                          avatarUrl: newTestimonial.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
                        };
                        setTestimonials([item, ...testimonials]);
                        setNewTestimonial({
                          name: "",
                          role: "Pengunjung",
                          comment: "",
                          rating: 5,
                          date: new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }),
                          avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
                        });
                        setNotifications((prev) => [`Added new verified testimonial from ${item.name}`, ...prev]);
                        alert("Ulasan sukses dipasang ke dalam basis data!");
                      }}
                      className="w-full py-3 bg-[#D4A017] hover:bg-[#F28C28] text-slate-950 hover:text-white font-sans text-xs font-bold uppercase rounded-xl tracking-widest shadow transition-all cursor-pointer flex items-center justify-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Terbitkan Reviu</span>
                    </button>
                  </div>
                </div>

                {/* List editor */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-widest block text-left">DAFTAR REVIU AKTIF ({testimonials.length})</h4>
                  
                  <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2">
                    {testimonials.map((testi) => (
                      <div key={testi.id} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex justify-between items-start text-left gap-4 hover:border-slate-200 transition-colors">
                        <div className="flex gap-3">
                          <img
                            src={testi.avatarUrl}
                            alt={testi.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0 mt-0.5"
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              <strong className="block text-xs text-slate-900 leading-none">{testi.name}</strong>
                              <span className="block text-[9px] font-mono text-[#D4A017] leading-none">{"★".repeat(testi.rating)}</span>
                            </div>
                            <span className="block text-[9px] text-slate-400 mt-1 font-mono">{testi.role} • {testi.date}</span>
                            <p className="text-[11px] font-sans text-slate-650 mt-1.5 leading-relaxed font-light italic">"{testi.comment}"</p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (confirm(`Apakah Anda yakin ingin menghapus reviu milik ${testi.name}?`)) {
                              setTestimonials((prev) => prev.filter((t) => t.id !== testi.id));
                            }
                          }}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-655 hover:text-red-700 transition-colors rounded-lg cursor-pointer max-w-min align-top mt-1"
                          title="Hapus testimonial"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 15: EDIT SOP KAWASAN */}
          {activeTab === "edit-sop" && (
            <div className="space-y-8 animate-fade-in text-slate-800">
              <div className="border-b border-orange-100 pb-5">
                <h3 className="text-xl font-display text-slate-900 uppercase tracking-tight">Edit SOP Pendakian Kawasan</h3>
                <p className="text-slate-500 text-xs font-sans mt-0.5">Kelola jam operasional, registrasi, perlengkapan mandiri, aturan sampah zero-plastic, dan sanksi pengelola.</p>
              </div>

              {/* Sub tabs of SOP manager */}
              <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3 justify-start" id="sop-sub-tab-navigator">
                {[
                  { id: "hours", label: "⏱ Jam Reservasi" },
                  { id: "gears", label: "🎒 Perlengkapan Wajib" },
                  { id: "general", label: "📋 Ketentuan Umum" },
                  { id: "waste", label: "♻ Aturan Sampah" },
                  { id: "ethics", label: "🤝 Rukun Etika" },
                  { id: "penalties", label: "⚖ Skema Sanksi" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSopEditorSubSection(item.id as any)}
                    className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono tracking-wider font-extrabold uppercase transition-colors cursor-pointer ${
                      sopEditorSubSection === item.id
                        ? "bg-[#D4A017] text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* SECTION: HOURS */}
              {sopEditorSubSection === "hours" && (
                <div className="space-y-5 animate-fade-in text-left max-w-3xl">
                  <h4 className="text-[10px] font-mono text-[#D4A017] uppercase font-bold tracking-widest block">⚙ JAM OPERASIONAL &amp; PROSEDUR</h4>
                  
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Jam SIMAKSI / Registrasi Gerbang</label>
                        <input
                          type="text"
                          className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800 font-mono font-bold"
                          value={settings.sopSimaksiHours || ""}
                          onChange={(e) => setSettings({ ...settings, sopSimaksiHours: e.target.value })}
                          placeholder="e.g. 07.00 - 17.30 WITA"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Batas Maksimal Naik (Sore)</label>
                        <input
                          type="text"
                          className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800 font-mono font-bold"
                          value={settings.sopMaxAscentHours || ""}
                          onChange={(e) => setSettings({ ...settings, sopMaxAscentHours: e.target.value })}
                          placeholder="e.g. 15.00 WITA"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Prosedur Check-Out Gunung</label>
                      <textarea
                        rows={3}
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800 leading-relaxed"
                        value={settings.sopCheckoutDesc || ""}
                        onChange={(e) => setSettings({ ...settings, sopCheckoutDesc: e.target.value })}
                        placeholder="Wajib Check-Out dan melapor kembali setelah turun..."
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => {
                          setNotifications((prev) => ["SOP operational checkpoints updated", ...prev]);
                          alert("Jadwal operasional SOP berhasil disimpan!");
                        }}
                        className="px-5 py-2.5 bg-[#D4A017] hover:bg-[#F28C28] text-slate-950 hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center space-x-1"
                      >
                        <Save className="w-4 h-4" />
                        <span>Simpan Jadwal</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: GEARS */}
              {sopEditorSubSection === "gears" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left animate-fade-in">
                  
                  {/* Append gear form */}
                  <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
                    <h4 className="text-[10px] font-mono text-[#D4A017] uppercase font-bold tracking-widest block mb-1">✚ TAMBAH PERLENGKAPAN WAJIB</h4>
                    
                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Nama Alat / Perlengkapan</label>
                      <input
                        type="text"
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800 font-semibold"
                        value={newSopGear.name}
                        onChange={(e) => setNewSopGear({ ...newSopGear, name: e.target.value })}
                        placeholder="e.g. Senter / Headlamp"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Kategori Tag Label</label>
                        <input
                          type="text"
                          className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none text-slate-800"
                          value={newSopGear.tag}
                          onChange={(e) => setNewSopGear({ ...newSopGear, tag: e.target.value })}
                          placeholder="e.g. Wajib"
                        />
                      </div>
                      <div className="text-center flex flex-col justify-end">
                        <span className="text-[9px] text-slate-400 font-mono italic mb-1.5 block">Saran Ikon:</span>
                        <span className="p-2 bg-amber-50 text-[10px] font-mono uppercase font-bold rounded-lg leading-none border">AUTO-SELECTED</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Petunjuk Penggunaan</label>
                      <textarea
                        rows={2.5}
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none text-slate-800 font-light font-sans"
                        value={newSopGear.desc}
                        onChange={(e) => setNewSopGear({ ...newSopGear, desc: e.target.value })}
                        placeholder="Bawa senter cadangan untuk melakukan sunrise trekking..."
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (!newSopGear.name || !newSopGear.desc) {
                          alert("Mohon lengkapi Nama barang dan Petunjuk penggunaan!");
                          return;
                        }
                        const item = {
                          id: "gear-" + Date.now(),
                          name: newSopGear.name,
                          desc: newSopGear.desc,
                          tag: newSopGear.tag
                        };
                        setSopGears([...sopGears, item]);
                        setNewSopGear({ name: "", desc: "", tag: "Wajib" });
                        setNotifications((prev) => [`Added mandatory gear item: ${item.name}`, ...prev]);
                        alert("Perlengkapan wajib berhasil ditambahkan!");
                      }}
                      className="w-full py-3 bg-[#D4A017] hover:bg-[#F28C28] text-slate-950 hover:text-white font-sans text-xs font-bold uppercase rounded-xl tracking-widest cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambahkan Barang</span>
                    </button>
                  </div>

                  {/* Gears tabular layout */}
                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-widest block">BARANG PEMERIKSAAN AKTIF ({sopGears.length})</h4>
                    
                    <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-2">
                      {sopGears.map((g) => (
                        <div key={g.id} className="p-4 bg-white border border-slate-100 shadow-sm rounded-2xl flex justify-between items-center gap-4">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-sans font-bold text-xs text-slate-950">{g.name}</span>
                              <span className="px-1.5 py-0.5 rounded bg-amber-100 text-[#7A4E2D] text-[8.5px] font-mono uppercase font-bold leading-none">{g.tag}</span>
                            </div>
                            <p className="text-slate-500 font-sans text-[11px] mt-1 font-light leading-snug">{g.desc}</p>
                          </div>
                          
                          <button
                            onClick={() => {
                              setSopGears((prev) => prev.filter((item) => item.id !== g.id));
                            }}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-650 rounded-lg cursor-pointer shrink-0 animate-none"
                            title="Hapus barang"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* SECTION: GENERAL RULES */}
              {sopEditorSubSection === "general" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left animate-fade-in">
                  
                  {/* Form */}
                  <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
                    <h4 className="text-[10px] font-mono text-[#D4A017] uppercase font-bold tracking-widest block mb-1">✚ TAMBAH KETENTUAN UMUM</h4>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-1">
                        <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">No. Urut</label>
                        <input
                          type="text"
                          className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-center font-mono font-bold"
                          value={newSopGeneralRule.num}
                          onChange={(e) => setNewSopGeneralRule({ ...newSopGeneralRule, num: e.target.value })}
                          placeholder="e.g. 07"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Judul Aturan</label>
                        <input
                          type="text"
                          className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800 font-semibold"
                          value={newSopGeneralRule.title}
                          onChange={(e) => setNewSopGeneralRule({ ...newSopGeneralRule, title: e.target.value })}
                          placeholder="Aturan pendaftaran..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Keterangan / Deskripsi Aturan</label>
                      <textarea
                        rows={3.5}
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none text-slate-800 font-light"
                        value={newSopGeneralRule.desc}
                        onChange={(e) => setNewSopGeneralRule({ ...newSopGeneralRule, desc: e.target.value })}
                        placeholder="Berikan penjelasan formal mengenai aturan tersebut di sini..."
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (!newSopGeneralRule.title || !newSopGeneralRule.desc) {
                          alert("Mohon isi judul dan keterangan aturan!");
                          return;
                        }
                        const rIndex = sopGeneralRules.length + 1;
                        const item = {
                          id: "general-" + Date.now(),
                          num: newSopGeneralRule.num || (rIndex < 10 ? `0${rIndex}` : `${rIndex}`),
                          title: newSopGeneralRule.title,
                          desc: newSopGeneralRule.desc
                        };
                        setSopGeneralRules([...sopGeneralRules, item]);
                        setNewSopGeneralRule({ num: "", title: "", desc: "" });
                        setNotifications((prev) => [`Added general rule: ${item.title}`, ...prev]);
                        alert("Ketentuan umum sukses ditambahkan!");
                      }}
                      className="w-full py-3 bg-[#D4A017] hover:bg-[#F28C28] text-slate-950 hover:text-white font-sans text-xs font-bold uppercase rounded-xl tracking-widest cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambahkan Aturan</span>
                    </button>
                  </div>

                  {/* List panel */}
                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="text-[10px] font-mono text-slate-405 uppercase font-bold tracking-widest block font-bold">KETENTUAN UMUM AKTIF ({sopGeneralRules.length})</h4>
                    
                    <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-2">
                      {sopGeneralRules.map((rl) => (
                        <div key={rl.id} className="p-4 bg-white border border-slate-100 shadow-sm rounded-2xl flex justify-between items-start gap-4">
                          <div className="flex items-start space-x-3">
                            <span className="font-mono text-sm font-black text-[#D4A017] bg-orange-50 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                              {rl.num}
                            </span>
                            <div>
                              <strong className="block text-xs uppercase text-[#7A4E2D] font-bold">{rl.title}</strong>
                              <p className="text-slate-500 font-sans text-[11px] leading-relaxed mt-1 font-light">{rl.desc}</p>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => {
                              setSopGeneralRules((prev) => prev.filter((item) => item.id !== rl.id));
                            }}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-650 rounded-lg cursor-pointer shrink-0 animate-none"
                            title="Hapus ketentuan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* SECTION: WASTE RULES */}
              {sopEditorSubSection === "waste" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left animate-fade-in">
                  
                  {/* Form */}
                  <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
                    <h4 className="text-[10px] font-mono text-[#D4A017] uppercase font-bold tracking-widest block mb-1">✚ TAMBAH REGULASI SAMPAH</h4>
                    
                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Judul Protokol Sampah</label>
                      <input
                        type="text"
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800 font-semibold"
                        value={newSopWasteRule.title}
                        onChange={(e) => setNewSopWasteRule({ ...newSopWasteRule, title: e.target.value })}
                        placeholder="e.g. Pembatasan Sachet Sekali Pakai..."
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Semboyan Tindakan (Action tag)</label>
                      <input
                        type="text"
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none text-slate-800 animate-none"
                        value={newSopWasteRule.action}
                        onChange={(e) => setNewSopWasteRule({ ...newSopWasteRule, action: e.target.value })}
                        placeholder="e.g. Wajib Bawa Turun"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Kebijakan Sampah</label>
                      <textarea
                        rows={2.5}
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none text-slate-800 font-light"
                        value={newSopWasteRule.desc}
                        onChange={(e) => setNewSopWasteRule({ ...newSopWasteRule, desc: e.target.value })}
                        placeholder="Setiap rombongan dilarang membawa kemasan botol minuman plastik..."
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (!newSopWasteRule.title || !newSopWasteRule.desc) {
                          alert("Mohon lengkapi judul regulasi sampah dantolak ukurnya!");
                          return;
                        }
                        const item = {
                          id: "waste-" + Date.now(),
                          title: newSopWasteRule.title,
                          desc: newSopWasteRule.desc,
                          action: newSopWasteRule.action
                        };
                        setSopWasteRules([...sopWasteRules, item]);
                        setNewSopWasteRule({ title: "", desc: "", action: "Wajib Bawa Turun" });
                        setNotifications((prev) => [`Added waste eco regulation: ${item.title}`, ...prev]);
                        alert("Regulasi sampah berhasil dipasang!");
                      }}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold uppercase rounded-xl tracking-widest cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambahkan Regulasi</span>
                    </button>
                  </div>

                  {/* List display */}
                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="text-[10px] font-mono text-slate-405 uppercase font-bold tracking-widest block font-bold">REGULASI SAMPAH AKTIF ({sopWasteRules.length})</h4>
                    
                    <div className="grid grid-cols-1 gap-3.5 max-h-[460px] overflow-y-auto pr-2">
                      {sopWasteRules.map((wr) => (
                        <div key={wr.id} className="p-4 bg-white border border-dashed border-emerald-200 hover:bg-emerald-50/5 rounded-2xl flex justify-between items-center transition-colors">
                          <div>
                            <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[8px] font-mono font-bold tracking-wider uppercase rounded">
                              {wr.action}
                            </span>
                            <h5 className="font-sans font-extrabold text-xs text-emerald-950 uppercase mt-1.5 leading-tight">{wr.title}</h5>
                            <p className="text-slate-600 font-sans text-[11px] leading-relaxed mt-1 font-light">{wr.desc}</p>
                          </div>

                          <button
                            onClick={() => {
                              setSopWasteRules((prev) => prev.filter((item) => item.id !== wr.id));
                            }}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-650 rounded-lg cursor-pointer shrink-0 ml-2 animate-none"
                            title="Hapus Aturan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* SECTION: ETHICS */}
              {sopEditorSubSection === "ethics" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left animate-fade-in">
                  
                  {/* Add form */}
                  <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
                    <h4 className="text-[10px] font-mono text-[#D4A017] uppercase font-bold tracking-widest block mb-1">✚ TAMBAH ETIKA PENDAKIAN</h4>
                    
                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Nama Aturan Etika</label>
                      <input
                        type="text"
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white text-slate-800 font-semibold"
                        value={newSopEthicsRule.title}
                        onChange={(e) => setNewSopEthicsRule({ ...newSopEthicsRule, title: e.target.value })}
                        placeholder="e.g. Larangan Corat-Coret Vandalisme..."
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Saran Logo (Keyword Pengenal)</label>
                      <select
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none text-slate-800 font-mono font-bold"
                        value={newSopEthicsRule.iconName}
                        onChange={(e) => setNewSopEthicsRule({ ...newSopEthicsRule, iconName: e.target.value })}
                      >
                        <option value="Ban">🚫 Dilarang (Ban / Red Alert)</option>
                        <option value="Flame">🔥 Api / Pembakaran (Flame)</option>
                        <option value="HeartHandshake">🤝 Sosial / Kearifan Lokal (HeartHandshake)</option>
                        <option value="ShieldAlert">🛡️ Safety / Keselamatan (ShieldAlert)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Petunjuk Rukun Etika</label>
                      <textarea
                        rows={2.5}
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none text-slate-800 font-light"
                        value={newSopEthicsRule.desc}
                        onChange={(e) => setNewSopEthicsRule({ ...newSopEthicsRule, desc: e.target.value })}
                        placeholder="Harap menyapa dengan senyum sopan di sepanjang rute agrowisata setempat..."
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (!newSopEthicsRule.title || !newSopEthicsRule.desc) {
                          alert("Mohon isi judul dan petunjuk etika pendakian!");
                          return;
                        }
                        const item = {
                          id: "ethics-" + Date.now(),
                          title: newSopEthicsRule.title,
                          desc: newSopEthicsRule.desc,
                          iconName: newSopEthicsRule.iconName
                        };
                        setSopEthicsRules([...sopEthicsRules, item]);
                        setNewSopEthicsRule({ title: "", desc: "", iconName: "Ban" });
                        setNotifications((prev) => [`Added hiking ethics item: ${item.title}`, ...prev]);
                        alert("SOP etika pendakian sukses ditambah!");
                      }}
                      className="w-full py-3 bg-[#D4A017] hover:bg-[#F28C28] text-slate-950 hover:text-white font-sans text-xs font-bold uppercase rounded-xl tracking-widest cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Pasang Rukun Etika</span>
                    </button>
                  </div>

                  {/* List panels */}
                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="text-[10px] font-mono text-slate-405 uppercase font-bold tracking-widest block font-bold">RUKUN ETIKA AKTIF ({sopEthicsRules.length})</h4>
                    
                    <div className="grid grid-cols-1 gap-3.5 max-h-[460px] overflow-y-auto pr-2">
                      {sopEthicsRules.map((et) => (
                        <div key={et.id} className="p-4 bg-white border border-slate-100 shadow-sm rounded-2xl flex justify-between items-center gap-4">
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-xs">🔑</span>
                              <strong className="block text-xs text-slate-900">{et.title}</strong>
                            </div>
                            <span className="block text-[8px] font-mono text-[#FFF8EF] border bg-amber-600 uppercase font-bold mt-1.5 px-1 py-0.5 rounded tracking-wider leading-none">Ikon: {et.iconName}</span>
                            <p className="text-slate-500 font-sans text-[11px] leading-relaxed mt-1 font-light">{et.desc}</p>
                          </div>

                          <button
                            onClick={() => {
                              setSopEthicsRules((prev) => prev.filter((item) => item.id !== et.id));
                            }}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-650 rounded-lg cursor-pointer shrink-0 animate-none"
                            title="Hapus rukun etika"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* SECTION: PENALTIES */}
              {sopEditorSubSection === "penalties" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left animate-fade-in">
                  
                  {/* Add form */}
                  <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
                    <h4 className="text-[10px] font-mono text-[#D4A017] uppercase font-bold tracking-widest block mb-1">✚ TAMBAH TINGKAT SANKSI</h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Level / Tingkat</label>
                        <select
                          className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none text-slate-800 font-mono font-bold"
                          value={newSopPenalty.level}
                          onChange={(e) => {
                            const val = e.target.value;
                            let col = "border-amber-200 bg-amber-50/50 text-amber-900";
                            if (val === "Tingkat II") col = "border-orange-200 bg-orange-50/50 text-orange-900";
                            if (val === "Tingkat III") col = "border-rose-200 bg-rose-50/50 text-rose-900";
                            if (val === "Tingkat IV") col = "border-red-300 bg-red-50/70 text-red-950 font-bold";
                            setNewSopPenalty({ ...newSopPenalty, level: val, color: col });
                          }}
                        >
                          <option value="Tingkat I">Tingkat I (Teguran)</option>
                          <option value="Tingkat II">Tingkat II (Pemberhentian)</option>
                          <option value="Tingkat III">Tingkat III (Blacklist)</option>
                          <option value="Tingkat IV">Tingkat IV (Hukum/Denda)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Sanksi Pengelola</label>
                        <input
                          type="text"
                          className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none text-slate-800 font-semibold"
                          value={newSopPenalty.name}
                          onChange={(e) => setNewSopPenalty({ ...newSopPenalty, name: e.target.value })}
                          placeholder="e.g. Teguran Lisan / Tertulis"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#7A4E2D] uppercase font-bold mb-1">Deskripsi Sanksi Detail</label>
                      <textarea
                        rows={3.5}
                        className="w-full p-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none text-slate-800 font-light"
                        value={newSopPenalty.desc}
                        onChange={(e) => setNewSopPenalty({ ...newSopPenalty, desc: e.target.value })}
                        placeholder="Berlaku apabila melalaikan keselamatan dasar..."
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (!newSopPenalty.name || !newSopPenalty.desc) {
                          alert("Mohon lengkapi perincian sanksi pengelola!");
                          return;
                        }
                        const item = {
                          id: "penalty-" + Date.now(),
                          level: newSopPenalty.level,
                          name: newSopPenalty.name,
                          desc: newSopPenalty.desc,
                          color: newSopPenalty.color
                        };
                        setSopPenalties([...sopPenalties, item]);
                        setNewSopPenalty({ level: "Tingkat I", name: "", desc: "", color: "border-amber-200 bg-amber-50/50 text-amber-900" });
                        setNotifications((prev) => [`Added admin penalty level ${item.level}: ${item.name}`, ...prev]);
                        alert("Skema sanksi berhasil diletakkan!");
                      }}
                      className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-sans text-xs font-bold uppercase rounded-xl tracking-widest cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Pasang Aturan Sanksi</span>
                    </button>
                  </div>

                  {/* List displays */}
                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="text-[10px] font-mono text-slate-405 uppercase font-bold tracking-widest block font-bold">TINGKAT SANKSI AKTIF PENGELOLA ({sopPenalties.length})</h4>
                    
                    <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-2">
                      {sopPenalties.map((pen) => (
                        <div key={pen.id} className={`p-4 border rounded-xl flex justify-between items-center ${pen.color || "border-amber-200 bg-amber-50/50 text-amber-900"} shadow-sm text-left`}>
                          <div>
                            <span className="text-[8px] font-mono uppercase font-bold tracking-wider opacity-70 block">{pen.level}</span>
                            <h5 className="font-sans font-black text-xs uppercase leading-tight mt-1">{pen.name}</h5>
                            <p className="text-[11px] font-sans font-light leading-relaxed opacity-90 mt-1">{pen.desc}</p>
                          </div>

                          <button
                            onClick={() => {
                              setSopPenalties((prev) => prev.filter((item) => item.id !== pen.id));
                            }}
                            className="p-1.5 bg-white/45 hover:bg-white/85 border border-slate-300 text-red-655 rounded-lg cursor-pointer shrink-0 ml-2 animate-none"
                            title="Hapus Sanksi"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>
      </main>

      {/* 3. PRINT TICKET MODAL OVERLAY */}
      {printedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in select-none">
          <div className="bg-white rounded-3xl max-w-md w-full border border-orange-100 shadow-2xl relative text-left animate-scale-up p-8">
            
            <button
              onClick={() => setPrintedBooking(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Print badge */}
            <div className="border-4 border-slate-900 border-double p-5 text-center space-y-4 font-mono text-slate-900" id="print-vector-pass">
              <h3 className="font-sans font-black text-lg tracking-wider uppercase text-slate-950 leading-none">
                BONTOLOJONG PASS
              </h3>
              <p className="text-[9px] text-[#7A4E2D] block tracking-widest font-bold">STATE FORESTRY DEPT PASS</p>

              <div className="border-t border-b border-dashed border-slate-400 py-3 text-xs leading-relaxed space-y-2">
                <div className="flex justify-between font-bold">
                  <span>TICKET ID:</span>
                  <span className="bg-amber-100 px-1">{printedBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>VISITOR:</span>
                  <span>{printedBooking.visitorName.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>DATE:</span>
                  <span>{printedBooking.bookingDate}</span>
                </div>
                <div className="flex justify-between text-[#F28C28] font-bold">
                  <span>MODULE:</span>
                  <span>{printedBooking.activityType.toUpperCase()}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>GUESTS:</span>
                  <span>{printedBooking.guestsCount} PAX</span>
                </div>
                <div className="flex justify-between pb-1 text-xs">
                  <span>BILL FEE:</span>
                  <span>${printedBooking.totalAmount} USD</span>
                </div>
              </div>

              <div className="space-y-1.5">
                {/* Simulated barcode */}
                <div className="h-10 bg-slate-950 w-full flex items-center justify-between px-1 bg-opacity-95" style={{ backgroundImage: "repeating-linear-gradient(90deg, #000, #000 2px, #fff 2px, #fff 6px)" }} />
                <span className="text-[8px] text-slate-400 font-bold block uppercase mt-1">SCAN AT GATEHOUSE G-BONTOLOJONG</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setPrintedBooking(null)}
                className="flex-1 py-3 border border-slate-200 text-slate-700 font-sans text-xs font-bold uppercase rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                Close Ticket
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-3 bg-slate-950 hover:bg-[#7A4E2D] text-white font-sans text-xs font-bold uppercase rounded-xl shadow-md cursor-pointer flex items-center justify-center space-x-1"
              >
                <Printer className="w-4 h-4" />
                <span>Execute Print</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// Simple filter utility
function unsolicitedBookingsFilter(bookingsList: Booking[], query: string) {
  if (!query) return bookingsList;
  const q = query.toLowerCase();
  return bookingsList.filter(
    (b) =>
      b.visitorName.toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q) ||
      b.activityType.toLowerCase().includes(q)
  );
}
