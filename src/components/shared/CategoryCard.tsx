"use client";

import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { motion } from "framer-motion";

interface Category {
  name: string;
  slug: string;
  coverImage?: { url: string; cloudinaryId?: string } | string | null;
  productCount?: number;
}

export default function CategoryCard({ category }: { category: Category }) {
  const imageUrl = typeof category.coverImage === 'object' && category.coverImage !== null 
    ? category.coverImage.url 
    : (typeof category.coverImage === 'string' ? category.coverImage : '');

  const hasValidImage = imageUrl && !imageUrl.includes("placeholder.jpg") && !imageUrl.includes("placeholder-product");

  return (
    <Link href={`/products?category=${category.slug}`} className="block overflow-hidden rounded-2xl group">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
        
        {!hasValidImage ? (
          <div className="w-full h-full bg-brand-secondary flex items-center justify-center">
             <span className="text-brand-steel">No Image</span>
          </div>
        ) : imageUrl.startsWith("/") ? (
          <img
            src={imageUrl}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <CldImage
            src={imageUrl.includes('res.cloudinary.com') ? imageUrl.split('/upload/v1/')[1] || imageUrl : imageUrl}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        )}

        <div className="absolute bottom-0 left-0 p-6 z-20 w-full transform group-hover:-translate-y-2 transition-transform duration-300">
          <h3 className="text-2xl font-bold font-display text-white mb-1">
            {category.name}
          </h3>
          <p className="text-brand-accent font-medium">
            {category.productCount} Products
          </p>
        </div>
      </div>
    </Link>
  );
}
