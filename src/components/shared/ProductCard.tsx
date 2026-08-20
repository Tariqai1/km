"use client";

import { CldImage } from "next-cloudinary";
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
  const imageUrl = product.images?.[0]?.url || "/placeholder-product.jpg";

  const categoryName = typeof product.category === 'object' && product.category !== null
    ? (product.category.name || "")
    : (typeof product.category === 'string' ? product.category : (product.categoryName || ""));

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="group flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden"
    >
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
        {imageUrl.includes("placeholder.jpg") || imageUrl.includes("placeholder-product") ? (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        ) : imageUrl.startsWith("/") ? (
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <CldImage
            src={imageUrl.includes('res.cloudinary.com') ? imageUrl.split('/upload/v1/')[1] || imageUrl : imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {categoryName && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-brand-primary hover:bg-brand-secondary text-white border-none px-3 py-1">
              {categoryName}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-display font-bold text-xl text-brand-dark mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        <div className="mt-auto pt-4 flex gap-3">
          <Button asChild variant="outline" className="flex-1 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white">
            <Link href={`/products/${product.slug}`}>View Details</Link>
          </Button>
          <Button asChild className="flex-1 bg-brand-accent hover:bg-brand-accent-hover text-white">
            <Link href={`/contact?product=${product.slug}`}>Get Quote</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
