import React, { useState } from "react";
import { GalleryMedia } from "../types";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryProps {
  galleryItems: GalleryMedia[];
}

export default function Gallery({ galleryItems }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Nature", "Sunrise", "Hiking", "Camping", "Drone Shot"];

  const categoriesInBahasa: Record<string, string> = {
    All: "Semua",
    Nature: "Alam",
    Sunrise: "Matahari Terbit",
    Hiking: "Pendakian",
    Camping: "Perkemahan",
    "Drone Shot": "Foto Udara"
  };

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-cream/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center gap-3 justify-center mb-2">
            <div className="h-[1px] w-8 bg-mustard"></div>
            <span className="text-mustard text-xs font-mono uppercase tracking-[0.2em] font-semibold">
              ALBUM BONTOLOJONG
            </span>
            <div className="h-[1px] w-8 bg-mustard"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display text-charcoal tracking-tight uppercase">
            GALERI VISUAL ALAM
          </h2>
          <p className="mt-4 text-charcoal/70 font-sans text-sm max-w-xl mx-auto font-light leading-relaxed">
            Menyajikan fenomena fajar yang memukau, momen kedamaian di camping ground, serta lanskap asri rimbun yang diabadikan oleh ranger dan pengunjung kami.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-mustard to-tangerine mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" id="gallery-category-chips">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-mustard text-white shadow-md border-transparent"
                  : "bg-white/80 hover:bg-cream text-slate-700 border border-slate-200"
              }`}
            >
              {categoriesInBahasa[cat] || cat}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-masonry-grid">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/40 card-shadow aspect-square bg-slate-100"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Glassmorphic Overlay HUD */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-[950]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] font-mono text-mustard uppercase tracking-widest font-semibold">
                  {categoriesInBahasa[item.category] || item.category}
                </span>
                <h4 className="text-white text-lg font-display tracking-tight mt-1 uppercase">
                  {item.title}
                </h4>
                <div className="mt-3 inline-flex items-center space-x-1.5 text-xs text-amber-50">
                  <ZoomIn className="w-4.5 h-4.5" />
                  <span>Perbesar Foto</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal Carousel */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/25 text-white rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Button */}
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/25 text-white rounded-full transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image Canvas Container */}
          <div
            className="relative max-w-4xl w-full max-h-[80vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[lightboxIndex].imageUrl}
              alt={filteredItems[lightboxIndex].title}
              className="max-w-full max-h-[70vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
            />
            
            {/* Image Details Banner */}
            <div className="text-center text-white mt-4 max-w-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-mustard">
                Fotografi {categoriesInBahasa[filteredItems[lightboxIndex].category] || filteredItems[lightboxIndex].category}
              </span>
              <h3 className="text-xl font-display uppercase tracking-tight text-slate-100 mt-1">
                {filteredItems[lightboxIndex].title}
              </h3>
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/25 text-white rounded-full transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
