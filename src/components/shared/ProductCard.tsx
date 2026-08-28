"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden"
    >
      <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
        {isPlaceholder ? (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <span className="text-xs text-slate-400 font-medium">Machine Photo</span>
          </div>
        ) : (
          <Image
            src={rawUrl}
            alt={product.title}
            fill
            unoptimized
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {categoryName && (
          <div className="absolute top-2.5 left-2.5">
            <Badge className="bg-brand-primary/90 backdrop-blur-xs hover:bg-brand-primary text-white border-none px-2.5 py-0.5 text-[11px] font-semibold rounded-lg shadow-xs">
              {categoryName}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
        <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 line-clamp-2 leading-snug group-hover:text-brand-primary transition-colors">
          {product.title}
        </h3>
        
        <div className="pt-2 flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold h-8.5 rounded-lg">
            <Link href={`/products/${product.slug}`}>Details</Link>
          </Button>
          <Button asChild size="sm" className="flex-1 bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold h-8.5 rounded-lg shadow-xs">
            <Link href={`/contact?product=${product.slug}`}>Get Quote</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
