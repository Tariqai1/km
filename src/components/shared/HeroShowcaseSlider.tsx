"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Factory } from "lucide-react";

interface HeroImageItem {
  url: string;
  title?: string;
  caption?: string;
}

interface HeroShowcaseSliderProps {
  images?: HeroImageItem[];
  fallbackProducts?: any[];
}

export default function HeroShowcaseSlider({ images, fallbackProducts }: HeroShowcaseSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Compile showcase slides
  const slides: HeroImageItem[] = [];

  // 1. Admin uploaded custom hero images
  if (images && images.length > 0) {
    images.forEach(img => {
      if (img.url && !img.url.includes("placeholder-product") && !img.url.includes("placeholder.jpg")) {
        slides.push(img);
      }
    });
  }

  // 2. Add active products with images
  if (fallbackProducts && fallbackProducts.length > 0) {
    fallbackProducts.forEach(prod => {
      const pImg = prod.images?.[0]?.url;
      if (pImg && !pImg.includes("placeholder")) {
        slides.push({
          url: pImg,
          title: prod.title,
          caption: prod.categoryName || prod.category || "Commercial Food Machinery"
        });
      }
    });
  }

  // 3. Guaranteed fallback slides
  if (slides.length === 0) {
    slides.push(
      {
        url: "/logo.png",
        title: "K.M. Engineering Machinery Works",
        caption: "Workshop No. 58, Sakinaka, Mumbai"
      },
      {
        url: "/logo.svg",
        title: "Turnkey Food Processing Plants",
        caption: "Tutti Frutti • Bakery • Potato Chips • Namkeen"
      }
    );
  }

  // Auto slide timer
  useEffect(() => {
    if (isHovered || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isHovered, slides.length]);

  const currentSlide = slides[currentIndex] || slides[0];

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div 
      className="relative bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-5 sm:p-7 border border-white/15 shadow-2xl space-y-5 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white p-1 shadow-sm flex items-center justify-center">
            <img src="/logo.png" alt="KME" className="w-full h-full object-contain" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white leading-tight">K.M. Engineering Works</h4>
            <p className="text-[10px] text-slate-400">Mumbai Works • Workshop No. 58</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">
            Live Testing Video
          </span>
        </div>
      </div>

      {/* Main Image Slider Viewport */}
      <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 flex items-center justify-center p-4 group">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full flex items-center justify-center relative"
          >
            <img
              src={currentSlide.url}
              alt={currentSlide.title || "Machinery"}
              className="max-h-full max-w-full object-contain drop-shadow-2xl"
              onError={(e: any) => {
                e.currentTarget.src = "/logo.png";
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Machine Title Overlay Pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-xs font-bold text-white shadow-lg flex items-center gap-2 max-w-[85%] truncate">
            <span className="text-brand-accent">⭐</span>
            <span className="truncate">{currentSlide.title || "Commercial Food Machinery"}</span>
          </div>
          {slides.length > 1 && (
            <div className="bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg border border-white/15 text-[10px] font-mono text-slate-300">
              {currentIndex + 1}/{slides.length}
            </div>
          )}
        </div>

        {/* Previous / Next Arrow Controls */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

      </div>

      {/* Slide Thumbnail Dots */}
      {slides.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === idx ? "w-6 bg-brand-accent" : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* Bottom 3 Stats Strip */}
      <div className="grid grid-cols-3 gap-2 pt-1 text-center">
        <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
          <div className="text-xl font-black font-display text-brand-accent">15+</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Years Active</div>
        </div>
        <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
          <div className="text-xl font-black font-display text-white">500+</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Plants Built</div>
        </div>
        <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
          <div className="text-xl font-black font-display text-emerald-400">100%</div>
          <div className="text-[10px] text-slate-400 mt-0.5">SS-304 Grade</div>
        </div>
      </div>

    </div>
  );
}
