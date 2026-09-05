"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface HeroImageItem {
  url: string;
  title?: string;
  caption?: string;
  spec?: string;
}

interface HeroShowcaseSliderProps {
  images?: HeroImageItem[];
  fallbackProducts?: any[];
}

export default function HeroShowcaseSlider({ images, fallbackProducts }: HeroShowcaseSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Compile showcase slides
  const slides: HeroImageItem[] = [];

  if (images && images.length > 0) {
    images.forEach((img) => {
      if (img.url && !img.url.includes("placeholder-product") && !img.url.includes("placeholder.jpg")) {
        slides.push(img);
      }
    });
  }

  if (fallbackProducts && fallbackProducts.length > 0) {
    fallbackProducts.forEach((prod) => {
      const pImg = prod.images?.[0]?.url;
      if (pImg && !pImg.includes("placeholder")) {
        const catName =
          typeof prod.category === "object" && prod.category !== null
            ? prod.category.name || ""
            : typeof prod.category === "string"
            ? prod.category
            : prod.categoryName || "";

        slides.push({
          url: pImg,
          title: String(prod.title || "Commercial Machinery"),
          caption: String(catName || "Commercial Processing Machinery"),
          spec: "SS-304 Food-Grade Contact Surfaces"
        });
      }
    });
  }

  // Fallback slides with real workshop equipment names
  if (slides.length === 0) {
    slides.push(
      {
        url: "/logo.png",
        title: "50 Kg Commercial Spiral Dough Mixer",
        caption: "Dual-Speed Heavy Cast Chassis",
        spec: "SS-304 Bowl & Arm · 3-Phase 5HP"
      },
      {
        url: "/logo.svg",
        title: "30-Inch Sanitary Circular Vibro Sifter",
        caption: "High-Frequency Grading & Screening",
        spec: "SS-304 Mesh · Zero Powder Leakage"
      },
      {
        url: "/logo.png",
        title: "Automatic Tutti Frutti Dicing & Processing Plant",
        caption: "Turnkey Raw Papaya Processing Line",
        spec: "500 Kg/Hr Throughput · Continuous Flow"
      }
    );
  }

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Orchestrated auto-advance timer (pauses when user hovers or focuses)
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length, nextSlide]);

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <div
      className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Machinery Inspection Viewport"
    >
      {/* 1. Technical Inspection Console Header */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" aria-hidden="true" />
          <span className="font-mono text-[11px] font-semibold tracking-wider text-slate-700 uppercase">
            Inspection Bench · Workshop No. 58
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Pre-Dispatch Tested</span>
        </div>
      </div>

      {/* 2. Main Machinery Viewport (The ONE Orchestrated Transition) */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-[#111827] flex items-center justify-center overflow-hidden p-6">
        {/* Subtle Workshop Blueprint Grid Background */}
        <div
          className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none"
          aria-hidden="true"
        />

        {/* Machine Image with smooth transition */}
        <div className="relative w-full h-full flex items-center justify-center transition-opacity duration-300 ease-in-out">
          <img
            key={currentIndex}
            src={currentSlide.url}
            alt={currentSlide.title || "Machinery Inspection"}
            className="max-h-full max-w-full object-contain filter drop-shadow-lg"
            onError={(e: any) => {
              e.currentTarget.src = "/logo.png";
            }}
          />
        </div>

        {/* Technical Data HUD Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 pointer-events-none">
          <div className="bg-slate-900/90 backdrop-blur-xs text-white border border-slate-700/80 px-3 py-2 rounded-lg max-w-[80%] shadow-lg">
            <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
              {currentSlide.caption || "Industrial Equipment"}
            </div>
            <div className="font-semibold text-xs sm:text-sm text-slate-100 truncate">
              {currentSlide.title}
            </div>
            {currentSlide.spec && (
              <div className="font-mono text-[10px] text-amber-400 mt-0.5">
                {currentSlide.spec}
              </div>
            )}
          </div>

          <div className="bg-slate-900/90 text-slate-300 font-mono text-[11px] px-2.5 py-1 rounded border border-slate-700 shadow-sm shrink-0">
            {String(currentIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </div>
        </div>

        {/* Manual Keyboard-Accessible Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous machinery model"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 focus-visible:ring-2 focus-visible:ring-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next machinery model"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 focus-visible:ring-2 focus-visible:ring-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* 3. Selector Tabs for Machine Models */}
      {slides.length > 1 && (
        <div className="grid grid-cols-3 border-t border-slate-200 divide-x divide-slate-200 bg-slate-50 text-[11px]">
          {slides.slice(0, 3).map((slide, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`p-2.5 text-left transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 ${
                currentIndex === idx
                  ? "bg-white font-semibold text-[#162A45] border-b-2 border-b-[#162A45]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span className="font-mono text-[10px] text-slate-400 block">
                [0{idx + 1}]
              </span>
              <span className="truncate block">{slide.title?.split(" ")[0]} {slide.title?.split(" ")[1]}</span>
            </button>
          ))}
        </div>
      )}

      {/* 4. Anchored Technical Metallurgy & Verification Metrics */}
      <div className="bg-slate-50 border-t border-slate-200 p-3 sm:p-3.5 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="border border-slate-200 bg-white rounded p-2">
          <div className="font-mono font-bold text-xs sm:text-sm text-slate-900">SS-304/316</div>
          <div className="text-[10px] text-slate-500 font-medium mt-0.5">Certified Metallurgy</div>
        </div>
        <div className="border border-slate-200 bg-white rounded p-2">
          <div className="font-mono font-bold text-xs sm:text-sm text-slate-900">100% Load Trial</div>
          <div className="text-[10px] text-slate-500 font-medium mt-0.5">Pre-Dispatch Verified</div>
        </div>
        <div className="border border-slate-200 bg-white rounded p-2">
          <div className="font-mono font-bold text-xs sm:text-sm text-[#B45309]">OEM Mumbai</div>
          <div className="text-[10px] text-slate-500 font-medium mt-0.5">Factory Spares</div>
        </div>
      </div>
    </div>
  );
}
