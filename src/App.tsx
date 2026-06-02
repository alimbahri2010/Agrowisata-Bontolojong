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
  initialSystemSettings
} from "./data";
import { Destination, HikingTrail, Booking, TrailEvent, GalleryMedia, Testimonial, StaffMember, WeatherInfo, SystemSettings } from "./types";

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
  const handleJoinEvent = (event: TrailEvent) => {
    // If the event has capacity, let's increment it and show success
    if (event.registeredCount < event.capacity) {
      setEvents((prev) =>
        prev.map((e) => (e.id === event.id ? { ...e, registeredCount: e.registeredCount + 1 } : e))
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

      alert(`Congratulations! You have successfully registered for the "${event.title}" event. We've allocated ticket pass ${simulatedBookingId} in our admin log database!`);
    } else {
      alert("This event is fully booked.");
    }
  };

  // Trigger when a user publishes a review from list
  const handleAddReview = (review: { name: string; role: string; comment: string; rating: number }) => {
    const item: Testimonial = {
      id: "review-" + Date.now(),
      name: review.name,
      role: review.role,
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      rating: review.rating,
      comment: review.comment,
      date: "2026-05-29"
    };

    setTestimonials((prev) => [item, ...prev]);
  };

  // Trigger when booking form completes successfully
  const handleAddBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
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
            />

            {/* About story section */}
            <About />

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
            <Sop />

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
            onLogout={handleLogout}
            adminEmail={adminSession.email}
            adminRole={adminSession.role}
          />
        )}

      </div>
    </div>
  );
}
