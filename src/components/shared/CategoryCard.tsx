"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Category {
  name: string;
  slug: string;
  coverImage?: { url: string; cloudinaryId?: string } | string | null;
  productCount?: number;
}

export default function CategoryCard({ category }: { category: Category }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = typeof category.coverImage === 'object' && category.coverImage !== null 
    ? category.coverImage.url 
    : (typeof category.coverImage === 'string' ? category.coverImage : '');

  const hasValidImage = !imgError && imageUrl && !imageUrl.includes("placeholder.jpg") && !imageUrl.includes("placeholder-product");

  return (
    <Link 
      href={`/products?category=${category.slug}`} 
      className="block overflow-hidden rounded-xl group border border-slate-300 hover:border-slate-500 shadow-2xs transition-colors focus-visible:ring-2 focus-visible:ring-[#162A45]"
    >
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent opacity-90 transition-opacity"></div>
        
        {!hasValidImage ? (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center">
             <span className="font-mono text-xs text-slate-400">Workshop Section</span>
          </div>
        ) : (
          <Image
            src={imageUrl}
            alt={category.name}
            fill
            unoptimized
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}

        <div className="absolute bottom-0 left-0 p-4 sm:p-5 z-20 w-full">
          <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider block mb-1">
            {category.productCount ? `${category.productCount} Machine Models` : "Turnkey Plant Line"}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
            {category.name}
          </h3>
          <span className="font-mono text-[11px] text-slate-300 group-hover:text-white transition-colors mt-1 block">
            Inspect Line &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
