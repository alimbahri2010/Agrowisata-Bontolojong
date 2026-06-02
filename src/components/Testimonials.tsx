import React, { useState, useEffect } from "react";
import { Testimonial } from "../types";
import { Star, MessageSquare, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TestimonialsProps {
  testimonials: Testimonial[];
  onAddReview: (review: { name: string; role: string; comment: string; rating: number }) => void;
}

export default function Testimonials({ testimonials, onAddReview }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "Pengunjung Biasa",
    rating: 5,
    comment: ""
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Auto-sliding interval for testimonials
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;
    
    onAddReview(formData);
    setFormData({ name: "", role: "Pengunjung Biasa", rating: 5, comment: "" });
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowReviewForm(false);
    }, 2000);
  };

  return (
    <section id="testimonials" className="py-24 bg-cream/30 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center gap-3 justify-center mb-2">
            <div className="h-[1px] w-8 bg-mustard"></div>
            <span className="text-mustard text-xs font-mono uppercase tracking-[0.2em] font-semibold">
              PENGALAMAN PENGUNJUNG
            </span>
            <div className="h-[1px] w-8 bg-mustard"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display text-charcoal tracking-tight uppercase">
            TESTIMONI BONTOLOJONG
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-mustard to-tangerine mx-auto mt-4 rounded-full" />
        </div>

        {/* Main Slider Carousel */}
        <div className="relative mb-16">
          <div className="absolute top-0 left-0 text-mustard/10 pointer-events-none transform -translate-x-10 -translate-y-12">
            <Quote className="w-32 h-32 fill-current" />
          </div>

          <div className="min-h-[220px] bg-white rounded-3xl p-8 sm:p-12 border border-white/40 card-shadow relative transition-all duration-500 overflow-hidden">
            {testimonials[activeIndex] && (
              <div className="animate-fade-in flex flex-col sm:flex-row items-center sm:items-start gap-6">
                
                {/* Photo frame */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-mustard/25 relative">
                  <img
                    src={testimonials[activeIndex].avatarUrl}
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  {/* Rating Stars */}
                  <div className="flex justify-center sm:justify-start space-x-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonials[activeIndex].rating
                            ? "text-mustard fill-current"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-charcoal/90 font-sans italic text-base sm:text-lg leading-relaxed mb-6 font-light">
                    "{testimonials[activeIndex].comment}"
                  </p>

                  {/* Author meta */}
                  <div>
                    <h4 className="text-base font-display text-charcoal uppercase tracking-tight">
                      {testimonials[activeIndex].name}
                    </h4>
                    <span className="text-[10px] uppercase font-mono font-bold text-brown tracking-widest mt-1 block">
                      {testimonials[activeIndex].role} • {testimonials[activeIndex].date}
                    </span>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              onClick={handlePrev}
              className="p-3 bg-white hover:bg-cream border border-slate-200 text-slate-700 rounded-full transition-all shadow-md focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-500">
              {activeIndex + 1} / {testimonials.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 bg-white hover:bg-cream border border-slate-200 text-slate-700 rounded-full transition-all shadow-md focus:outline-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Leave a review button controller */}
        <div className="text-center">
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="font-sans text-xs font-bold uppercase tracking-wider text-brown hover:text-white bg-transparent hover:bg-brown border border-brown py-3 px-6 rounded-full transition-all shadow-md flex items-center justify-center space-x-2 mx-auto cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 shrink-0 animate-pulse-soft" />
            <span>{showReviewForm ? "Sembunyikan Formulir" : "Bagikan Pengalaman Anda"}</span>
          </button>
        </div>

        {/* Floating Add Review form block */}
        {showReviewForm && (
          <div className="mt-8 p-8 bg-white border border-white/40 rounded-2xl card-shadow max-w-xl mx-auto anim-fade-in flex flex-col">
            <h4 className="font-display text-charcoal uppercase tracking-tight mb-4 text-center text-lg">
              KIRIM ULASAN EKSPEDISI TERBARU
            </h4>
            
            {submitSuccess ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-center font-sans text-xs flex items-center justify-center gap-2">
                <span>🌟 Ulasan berhasil disimpan! Memproses ulasan ke halaman...</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1">Nama Anda</label>
                    <input
                      required
                      type="text"
                      className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard focus:bg-white"
                      placeholder="misal: Haris Riadi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1 font-semibold">Predikat / Pekerjaan</label>
                    <input
                      required
                      type="text"
                      className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard focus:bg-white"
                      placeholder="misal: Pecinta Hiking"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1">Skor Petualangan (1 sampai 5 Bintang)</label>
                  <div className="flex space-x-1.5" id="review-star-selector">
                    {[1, 2, 3, 4, 5].map((stars) => (
                      <button
                        type="button"
                        key={stars}
                        onClick={() => setFormData({ ...formData, rating: stars })}
                        className="p-1 focus:outline-none hover:scale-115 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            stars <= formData.rating
                              ? "text-mustard fill-current"
                              : "text-slate-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-brown uppercase font-bold mb-1">Tulis Ulasan & Komentar</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full text-slate-800 bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs font-sans focus:outline-none focus:ring-1 focus:ring-mustard focus:bg-white leading-relaxed"
                    placeholder="Ceritakan ke penjelajah lain mengenai asrinya jalur pinus, lautan awan fajar, area perkemahan, atau keramahan para pemandu kehutanan..."
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-mustard to-tangerine hover:from-tangerine hover:to-mustard text-white font-sans text-xs font-bold uppercase tracking-widest rounded-full shadow-md cursor-pointer hover:shadow-lg transition-all text-center"
                >
                  Publikasikan Ulasan Pengalaman
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
