"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
    <Link href={`/products?category=${category.slug}`} className="block overflow-hidden rounded-2xl group border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"></div>
        
        {!hasValidImage ? (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center">
             <span className="text-xs text-slate-400 font-medium">Category Showcase</span>
          </div>
        ) : (
          <Image
            src={imageUrl}
            alt={category.name}
            fill
            unoptimized
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}

        <div className="absolute bottom-0 left-0 p-4 sm:p-5 z-20 w-full transform group-hover:-translate-y-1 transition-transform duration-300">
          <h3 className="text-base sm:text-lg font-bold font-display text-white mb-0.5 leading-snug">
            {category.name}
          </h3>
          <p className="text-xs text-brand-accent font-semibold">
            {category.productCount ? `${category.productCount} Machines` : "Turnkey Plant Solution"}
          </p>
        </div>
      </div>
    </Link>
  );
}
