"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Product {
  title: string;
  slug: string;
  category?: string | { name?: string; slug?: string; _id?: string } | null;
  categoryName?: string;
  images: { url: string }[];
  description?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  const rawUrl = product.images?.[0]?.url;
  const isPlaceholder = !rawUrl || imgError || rawUrl.includes("placeholder.jpg") || rawUrl.includes("placeholder-product");

  const categoryName = typeof product.category === 'object' && product.category !== null
    ? (product.category.name || "")
    : (typeof product.category === 'string' ? product.category : (product.categoryName || ""));

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-slate-300 hover:border-slate-500 transition-colors shadow-2xs overflow-hidden h-full">
      {/* Machinery Inspection Image Viewport */}
      <div className="relative w-full aspect-[4/3] bg-slate-100 border-b border-slate-200 overflow-hidden">
        {isPlaceholder ? (
          <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-4 text-center">
            <span className="font-mono text-xs font-semibold text-slate-500 uppercase tracking-wider">K.M. Workshop Unit</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Machine Photo Archive</span>
          </div>
        ) : (
          <Image
            src={rawUrl}
            alt={product.title}
            fill
            unoptimized
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-2"
          />
        )}

        {/* Metallurgy & Category Spec Tag */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider bg-white/95 text-slate-700 px-2 py-0.5 rounded border border-slate-300 shadow-2xs">
            {categoryName || "Food Machinery"}
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded border border-slate-700 shadow-2xs">
            SS-304
          </span>
        </div>
      </div>

      {/* Machine Details & Actions */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <h3 className="font-semibold text-sm sm:text-base text-slate-900 line-clamp-2 leading-snug group-hover:text-[#162A45] transition-colors">
            {product.title}
          </h3>
          {product.description && (
            <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>
        
        {/* Considered Industrial Button Pair */}
        <div className="pt-2 flex items-center gap-2 border-t border-slate-100">
          <Button 
            asChild 
            variant="outline" 
            size="sm" 
            className="flex-1 border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold h-9 rounded-lg focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            <Link href={`/products/${product.slug}`}>Technical Specs</Link>
          </Button>
          <Button 
            asChild 
            size="sm" 
            className="flex-1 bg-[#162A45] hover:bg-[#0F1D30] text-white text-xs font-semibold h-9 rounded-lg shadow-2xs focus-visible:ring-2 focus-visible:ring-[#162A45]"
          >
            <Link href={`/contact?product=${product.slug}`}>Request Quote</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
