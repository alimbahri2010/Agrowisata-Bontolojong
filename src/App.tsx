import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Destinations from "./components/Destinations";
import HikingTrails from "./components/HikingTrails";
import Gallery from "./components/Gallery";
import Events from "./components/Events";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BookingSystem from "./components/BookingSystem";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Sop from "./components/Sop";

// Shared datasets
import {
  initialDestinations,
  initialHikingTrails,
  initialBookings,
  initialEvents,
  initialGallery,
  initialTestimonials,
  initialStaff,
  initialWeather,
  initialSystemSettings,
  initialSopGears,
  initialSopGeneralRules,
  initialSopWasteRules,
  initialSopEthicsRules,
  initialSopPenalties
} from "./data";
import { Destination, HikingTrail, Booking, TrailEvent, GalleryMedia, Testimonial, StaffMember, WeatherInfo, SystemSettings } from "./types";
import { supabaseManager } from "./lib/supabase";

export default function App() {
  // Navigation states
  const [currentView, setView] = useState<"landing" | "booking" | "login" | "dashboard">("landing");
  const [activeSection, setActiveSection] = useState<string>("home");

  // Synchronized Shared Application States
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
  const [trails, setTrails] = useState<HikingTrail[]>(initialHikingTrails);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [events, setEvents] = useState<TrailEvent[]>(initialEvents);
  const [gallery, setGallery] = useState<GalleryMedia[]>(initialGallery);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [weather, setWeather] = useState<WeatherInfo>(initialWeather);
  const [settings, setSettings] = useState<SystemSettings>(initialSystemSettings);

  // SOP States
  const [sopGears, setSopGears] = useState<any[]>(initialSopGears);
  const [sopGeneralRules, setSopGeneralRules] = useState<any[]>(initialSopGeneralRules);
  const [sopWasteRules, setSopWasteRules] = useState<any[]>(initialSopWasteRules);
  const [sopEthicsRules, setSopEthicsRules] = useState<any[]>(initialSopEthicsRules);
  const [sopPenalties, setSopPenalties] = useState<any[]>(initialSopPenalties);

  // Track if initial load from localStorage and/or Supabase has concluded to prevent premature saving
  const isFirstLoad = React.useRef(true);

  // Initialize and Synchronize state on Mount
  useEffect(() => {
    const loadInitialData = async () => {
      isFirstLoad.current = true;

      // 1. Load from localStorage cache for instant UI render
      const cachedDestinations = localStorage.getItem("bt_destinations");
      const cachedTrails = localStorage.getItem("bt_trails");
      const cachedBookings = localStorage.getItem("bt_bookings");
      const cachedEvents = localStorage.getItem("bt_events");
      const cachedGallery = localStorage.getItem("bt_gallery");
      const cachedTestimonials = localStorage.getItem("bt_testimonials");
      const cachedStaff = localStorage.getItem("bt_staff");
      const cachedSettings = localStorage.getItem("bt_settings");

      // SOP storage
      const cachedSopGears = localStorage.getItem("bt_sop_gears");
      const cachedSopGeneral = localStorage.getItem("bt_sop_general");
      const cachedSopWaste = localStorage.getItem("bt_sop_waste");
      const cachedSopEthics = localStorage.getItem("bt_sop_ethics");
      const cachedSopPenalties = localStorage.getItem("bt_sop_penalties");

      if (cachedDestinations) setDestinations(JSON.parse(cachedDestinations));
      if (cachedTrails) setTrails(JSON.parse(cachedTrails));
      if (cachedBookings) setBookings(JSON.parse(cachedBookings));
      if (cachedEvents) setEvents(JSON.parse(cachedEvents));
      if (cachedGallery) setGallery(JSON.parse(cachedGallery));
      if (cachedTestimonials) setTestimonials(JSON.parse(cachedTestimonials));
      if (cachedStaff) setStaff(JSON.parse(cachedStaff));
      if (cachedSettings) setSettings(JSON.parse(cachedSettings));

      if (cachedSopGears) setSopGears(JSON.parse(cachedSopGears));
      if (cachedSopGeneral) setSopGeneralRules(JSON.parse(cachedSopGeneral));
      if (cachedSopWaste) setSopWasteRules(JSON.parse(cachedSopWaste));
      if (cachedSopEthics) setSopEthicsRules(JSON.parse(cachedSopEthics));
      if (cachedSopPenalties) setSopPenalties(JSON.parse(cachedSopPenalties));

      // 2. Fetch fresh live data from Supabase DB if a connection exists
      if (supabaseManager.isConnected()) {
        try {
          // System settings
          const dbSettings = await supabaseManager.loadSettings();
          if (dbSettings) {
            setSettings(dbSettings);
            localStorage.setItem("bt_settings", JSON.stringify(dbSettings));
          }

          // Destinations list
          const dbDestinations = await supabaseManager.loadDestinations();
          if (dbDestinations && dbDestinations.length > 0) {
            setDestinations(dbDestinations);
            localStorage.setItem("bt_destinations", JSON.stringify(dbDestinations));
          }

          // Hiking Trails
          const dbTrails = await supabaseManager.loadTrails();
          if (dbTrails && dbTrails.length > 0) {
            setTrails(dbTrails);
            localStorage.setItem("bt_trails", JSON.stringify(dbTrails));
          }

          // Bookings (Real reservations)
          const dbBookings = await supabaseManager.loadBookings();
          if (dbBookings && dbBookings.length > 0) {
            setBookings(dbBookings);
            localStorage.setItem("bt_bookings", JSON.stringify(dbBookings));
          }

          // Events
          const dbEvents = await supabaseManager.loadEvents();
          if (dbEvents && dbEvents.length > 0) {
            setEvents(dbEvents);
            localStorage.setItem("bt_events", JSON.stringify(dbEvents));
          }

          // Gallery Album
          const dbGallery = await supabaseManager.loadGallery();
          if (dbGallery && dbGallery.length > 0) {
            setGallery(dbGallery);
            localStorage.setItem("bt_gallery", JSON.stringify(dbGallery));
          }

          // Testimonials
          const dbTestimonials = await supabaseManager.loadTestimonials();
          if (dbTestimonials && dbTestimonials.length > 0) {
            setTestimonials(dbTestimonials);
            localStorage.setItem("bt_testimonials", JSON.stringify(dbTestimonials));
          }

          // Staff Members
          const dbStaff = await supabaseManager.loadStaff();
          if (dbStaff && dbStaff.length > 0) {
            setStaff(dbStaff);
            localStorage.setItem("bt_staff", JSON.stringify(dbStaff));
          }
        } catch (err: any) {
          console.warn("Sinkron Supabase gagal di awal, mungkin tabel belum terinstal:", err.message);
        }
      }

      // Finish startup load
      setTimeout(() => {
        isFirstLoad.current = false;
      }, 500);
    };

    loadInitialData();
  }, [currentView]); // Re-evaluate if they trigger settings configurations

  // Synchronous localStorage persistence filters
  useEffect(() => {
    if (isFirstLoad.current) return;
    localStorage.setItem("bt_destinations", JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    if (isFirstLoad.current) return;
    localStorage.setItem("bt_trails", JSON.stringify(trails));
  }, [trails]);

  useEffect(() => {
    if (isFirstLoad.current) return;
    localStorage.setItem("bt_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (isFirstLoad.current) return;
    localStorage.setItem("bt_events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    if (isFirstLoad.current) return;
    localStorage.setItem("bt_gallery", JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    if (isFirstLoad.current) return;
    localStorage.setItem("bt_testimonials", JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    if (isFirstLoad.current) return;
    localStorage.setItem("bt_staff", JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    if (isFirstLoad.current) return;
    localStorage.setItem("bt_settings", JSON.stringify(settings));
  }, [settings]);

  // SOP persistent states
  useEffect(() => {
    if (isFirstLoad.current) return;
    localStorage.setItem("bt_sop_gears", JSON.stringify(sopGears));
  }, [sopGears]);

  useEffect(() => {
    if (isFirstLoad.current) return;
    localStorage.setItem("bt_sop_general", JSON.stringify(sopGeneralRules));
  }, [sopGeneralRules]);

  useEffect(() => {
    if (isFirstLoad.current) return;
    localStorage.setItem("bt_sop_waste", JSON.stringify(sopWasteRules));
  }, [sopWasteRules]);

  useEffect(() => {
    if (isFirstLoad.current) return;
    localStorage.setItem("bt_sop_ethics", JSON.stringify(sopEthicsRules));
  }, [sopEthicsRules]);

  useEffect(() => {
    if (isFirstLoad.current) return;
    localStorage.setItem("bt_sop_penalties", JSON.stringify(sopPenalties));
  }, [sopPenalties]);

  // Selector hooks for wizard prefill
  const [preSelectedName, setPreSelectedName] = useState<string>("");
  const [preSelectedCategory, setPreSelectedCategory] = useState<string>("");

  // Admin authentication states
  const [adminSession, setAdminSession] = useState<{ loggedIn: boolean; role: string; email: string }>({
    loggedIn: false,
    role: "Admin",
    email: "admin@bontolojong.gov"
  });

  // Automatically monitor page scroll to highlight active parts of the page in the transparent navbar
  useEffect(() => {
    if (currentView !== "landing") return;

    const sections = ["home", "about", "destinations", "trails", "sop", "gallery", "events", "testimonials", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentView]);

  // Navigate & scroll to specific sections cleanly
  const scrollToSection = (sectionId: string) => {
    setView("landing");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionId);
      }
    }, 100);
  };

  // Helper when user selects a specific booking spot from cards
  const triggerWizardPreSelection = (name: string, category: string) => {
    setPreSelectedName(name);
    setPreSelectedCategory(category);
    setView("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Trigger when joining an event directly
  const handleJoinEvent = async (event: TrailEvent) => {
    // If the event has capacity, let's increment it and show success
    if (event.registeredCount < event.capacity) {
      const updatedEvent = { ...event, registeredCount: event.registeredCount + 1 };
      setEvents((prev) =>
        prev.map((e) => (e.id === event.id ? updatedEvent : e))
      );
      
      // Seed a simulated booking so it is instantly recorded in visitor list & dashboards
      const simulatedBookingId = "B-" + Math.floor(100000 + Math.random() * 900000);
      const guestName = "Visitor Guest (Event Row)";
      const eventBooking: Booking = {
        id: simulatedBookingId,
        visitorName: guestName,
        email: "guest@event.com",
        phone: "+62 821-event-99",
        activityType: "Trail Hiking",
        bookingDate: event.date,
        guestsCount: 1,
        totalAmount: event.price,
        paymentStatus: event.price === 0 ? "Paid" : "Pending",
        bookingStatus: "Confirmed",
        notes: `Auto registered for event: ${event.title}`
      };

      setBookings((prev) => [eventBooking, ...prev]);

      if (supabaseManager.isConnected()) {
        try {
          await supabaseManager.upsertBooking(eventBooking);
          await supabaseManager.upsertEvent(updatedEvent);
        } catch (err: any) {
          console.warn("Gagal sinkron join event ke Supabase:", err.message);
        }
      }

      alert(`Congratulations! You have successfully registered for the "${event.title}" event. We've allocated ticket pass ${simulatedBookingId} in our admin log database!`);
    } else {
      alert("This event is fully booked.");
    }
  };

  // Trigger when a user publishes a review from list
  const handleAddReview = async (review: { name: string; role: string; comment: string; rating: number }) => {
    const item: Testimonial = {
      id: "review-" + Date.now(),
      name: review.name,
      role: review.role,
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString().split("T")[0]
    };

    setTestimonials((prev) => [item, ...prev]);

    if (supabaseManager.isConnected()) {
      try {
        await supabaseManager.upsertTestimonial(item);
      } catch (err: any) {
        console.warn("Gagal simpan review ke Supabase:", err.message);
      }
    }
  };

  // Trigger when booking form completes successfully
  const handleAddBooking = async (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    if (supabaseManager.isConnected()) {
      try {
        await supabaseManager.upsertBooking(newBooking);
      } catch (err: any) {
        console.warn("Gagal simpan booking baru ke Supabase:", err.message);
      }
    }
  };

  // Administrative login handling
  const handleLoginSuccess = (role: string, email: string) => {
    setAdminSession({ loggedIn: true, role, email });
    setView("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    setAdminSession({ loggedIn: false, role: "Admin", email: "admin@bontolojong.gov" });
    setView("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#FFF8EF] font-sans antialiased text-slate-900 selection:bg-[#D4A017] selection:text-white" id="main-application-wrap">
      
      {/* 1. Global Navigation header (Except when fully logged in to dashboard workspace) */}
      {currentView !== "dashboard" && (
        <Navbar
          currentView={currentView}
          setView={(v) => {
            setView(v);
            window.scrollTo({ top: 0 });
          }}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          logoName={settings.logoName}
          logoImageUrl={settings.logoImageUrl}
          logoShape={settings.logoShape}
          tagline={settings.tagline}
        />
      )}

      {/* 2. Interactive Views routing switch */}
      <div id="views-viewport" className="transition-all duration-300">
        
        {currentView === "landing" && (
          <>
            {/* Fullscreen interactive Hero */}
            <Hero
              logoName={settings.logoName}
              tagline={settings.tagline}
              setView={(v) => {
                setView(v);
                window.scrollTo({ top: 0 });
              }}
              scrollToSection={scrollToSection}
              settings={settings}
            />

            {/* About story section */}
            <About settings={settings} />

            {/* Nature spots and destinations */}
            <Destinations
              destinations={destinations}
              onBookNow={triggerWizardPreSelection}
            />

            {/* Hiking trails + Weather telemetry */}
            <HikingTrails
              trails={trails}
              weather={weather}
              onBookNow={triggerWizardPreSelection}
            />

            {/* Standard Operating Procedure (SOP) Section representing the rules info-graphic */}
            <Sop
              gears={sopGears}
              generalRules={sopGeneralRules}
              wasteRules={sopWasteRules}
              ethicsRules={sopEthicsRules}
              penalties={sopPenalties}
              settings={settings}
            />

            {/* Nature visual grids */}
            <Gallery galleryItems={gallery} />

            {/* Community Event scheduler cards */}
            <Events
              events={events}
              onJoinEvent={handleJoinEvent}
            />

            {/* Sliding Visitor Testimonials */}
            <Testimonials
              testimonials={testimonials}
              onAddReview={handleAddReview}
            />

            {/* Coordinates check & Contact lead forms */}
            <Contact />

            {/* Dynamic visual footer */}
            <Footer
              logoName={settings.logoName}
              tagline={settings.tagline}
              logoImageUrl={settings.logoImageUrl}
              logoShape={settings.logoShape}
              setView={(v) => {
                setView(v);
                window.scrollTo({ top: 0 });
              }}
              scrollToSection={scrollToSection}
            />
          </>
        )}

        {currentView === "booking" && (
          <BookingSystem
            onAddBooking={handleAddBooking}
            preSelectedName={preSelectedName}
            preSelectedCategory={preSelectedCategory}
            setView={setView}
          />
        )}

        {currentView === "login" && (
          <AdminLogin
            onLoginSuccess={handleLoginSuccess}
            setView={setView}
          />
        )}

        {currentView === "dashboard" && (
          <AdminDashboard
            destinations={destinations}
            setDestinations={setDestinations}
            trails={trails}
            setTrails={setTrails}
            bookings={bookings}
            setBookings={setBookings}
            events={events}
            setEvents={setEvents}
            gallery={gallery}
            setGallery={setGallery}
            staff={staff}
            setStaff={setStaff}
            weather={weather}
            setWeather={setWeather}
            settings={settings}
            setSettings={setSettings}
            testimonials={testimonials}
            setTestimonials={setTestimonials}
            sopGears={sopGears}
            setSopGears={setSopGears}
            sopGeneralRules={sopGeneralRules}
            setSopGeneralRules={setSopGeneralRules}
            sopWasteRules={sopWasteRules}
            setSopWasteRules={setSopWasteRules}
            sopEthicsRules={sopEthicsRules}
            setSopEthicsRules={setSopEthicsRules}
            sopPenalties={sopPenalties}
            setSopPenalties={setSopPenalties}
            onLogout={handleLogout}
            adminEmail={adminSession.email}
            adminRole={adminSession.role}
          />
        )}

      </div>
    </div>
  );
}
