"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Factory, Layers, Flame, Wind, Cpu, Sparkles } from "lucide-react";

interface Category {
  name: string;
  slug: string;
  coverImage?: { url: string; cloudinaryId?: string } | string | null;
  productCount?: number;
  description?: string;
}

// Technical industrial scope descriptors for categories
const getCategoryScope = (name: string, slug: string): string => {
  const lower = (name + " " + slug).toLowerCase();
  if (lower.includes("tutti") || lower.includes("papaya") || lower.includes("fruit")) {
    return "Automatic cube dicing lines, steam boiling kettles & continuous drying tunnels.";
  }
  if (lower.includes("bakery") || lower.includes("bread") || lower.includes("spiral")) {
    return "Commercial dual-speed spiral dough kneaders, planetary mixers & industrial deck ovens.";
  }
  if (lower.includes("chip") || lower.includes("wafer") || lower.includes("potato") || lower.includes("banana")) {
    return "Centrifugal rotary slicers, de-watering centrifuges & automated thermic fryers.";
  }
  if (lower.includes("namkeen") || lower.includes("farsan") || lower.includes("sev") || lower.includes("snack")) {
    return "Continuous automated fryers, multi-die sev extruders & rotary seasoning drums.";
  }
  if (lower.includes("sweet") || lower.includes("mithai") || lower.includes("mawa")) {
    return "Steam & gas jacketed tilting kettles, automatic mawa makers & high-torque mixers.";
  }
  if (lower.includes("vibro") || lower.includes("sifter") || lower.includes("screen") || lower.includes("grading")) {
    return "Sanitary circular vibratory grading screeners for spices, flour & chemical powders.";
  }
  return "Heavy-duty SS-304/SS-316 food-grade processing equipment & turnkey production plants.";
};

export default function CategoryCard({ category }: { category: Category }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = typeof category.coverImage === 'object' && category.coverImage !== null 
    ? category.coverImage.url 
    : (typeof category.coverImage === 'string' ? category.coverImage : '');

  const hasValidImage = !imgError && imageUrl && !imageUrl.includes("placeholder.jpg") && !imageUrl.includes("placeholder-product");
  const techScope = category.description || getCategoryScope(category.name, category.slug);

  return (
    <Link 
      href={`/products?category=${category.slug}`} 
      className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200 hover:border-[#162A45] hover:shadow-xl transition-all duration-300 overflow-hidden focus-visible:ring-2 focus-visible:ring-[#162A45]"
    >
      {/* 1. CLEAN INDUSTRIAL IMAGE VIEWPORT (16:10 aspect ratio) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
        
        {/* Top Floating Technical Badges */}
        <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-[#162A45]/90 text-white backdrop-blur-md px-2.5 py-1 rounded-md shadow-xs">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            <span>SS-304 Plant</span>
          </span>

          <span className="inline-flex items-center text-[10px] font-mono font-semibold bg-white/95 text-slate-800 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-200/80 shadow-xs">
            {category.productCount ? `${category.productCount} Models` : "Turnkey Line"}
          </span>
        </div>

        {/* Crisp Un-Obscured Photo */}
        {!hasValidImage ? (
          <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400">
            <Factory className="w-8 h-8 stroke-[1.5] mb-1 text-slate-400" />
            <span className="font-mono text-xs font-medium">K.M. Workshop Line</span>
          </div>
        ) : (
          <Image
            src={imageUrl}
            alt={category.name}
            fill
            unoptimized
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        )}
      </div>

      {/* 2. DEDICATED HIGH-CONTRAST SPECIFICATION SECTION (Pure Solid White) */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Eyebrow Category Tag */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            <span>Industrial Turnkey Line</span>
          </div>

          {/* High-Contrast Bold Category Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#162A45] transition-colors leading-snug mt-1.5 line-clamp-1 font-display">
            {category.name}
          </h3>

          {/* 1-Line Technical Scope Snippet */}
          <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {techScope}
          </p>
        </div>

        {/* 3. Action Footer with Arrow Slide Micro-interaction */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-[#162A45] group-hover:text-amber-800 transition-colors flex items-center gap-1">
            <span>Inspect Plant Specs</span>
          </span>
          <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-[#162A45] text-slate-600 group-hover:text-white flex items-center justify-center transition-colors">
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </div>
        </div>

      </div>
    </Link>
  );
}
