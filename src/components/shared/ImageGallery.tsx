"use client";

import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: { url: string; cloudinaryId?: string }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 flex items-center justify-center rounded-xl border border-gray-100">
        <span className="text-gray-400 font-medium">No images available</span>
      </div>
    );
  }

  // Helper to extract Cloudinary public ID or pass through the URL
  const getCldSrc = (url: string) => {
    return url.includes('res.cloudinary.com') ? url.split('/upload/v1/')[1] || url : url;
  };

  return (
    <div className="space-y-4 max-w-[500px] mx-auto lg:max-w-none">
      {/* Main Image Container */}
      <div 
        className="relative aspect-square max-h-[460px] rounded-2xl overflow-hidden cursor-zoom-in group border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-shadow flex items-center justify-center p-6"
        onClick={() => setLightboxOpen(true)}
      >
        {images[currentIndex].url.includes("placeholder.jpg") || images[currentIndex].url.includes("placeholder-product") ? (
          <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center rounded-xl">
            <span className="text-slate-400 font-medium">No Image Uploaded</span>
          </div>
        ) : images[currentIndex].url.startsWith("/") ? (
          <img
            src={images[currentIndex].url}
            alt="Product Image"
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <CldImage
            src={getCldSrc(images[currentIndex].url)}
            alt="Product Image"
            fill
            sizes="(max-width: 768px) 100vw, 450px"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            priority
          />
        )}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md text-xs font-medium text-slate-700 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-3.5 h-3.5 text-brand-primary" /> Click to Zoom
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all bg-white ${
                currentIndex === idx ? "border-brand-primary ring-2 ring-brand-primary/20" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {img.url.includes("placeholder.jpg") || img.url.includes("placeholder-product") ? (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                  <span className="text-xs text-slate-400">No Img</span>
                </div>
              ) : img.url.startsWith("/") ? (
                <img
                  src={img.url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <CldImage
                  src={getCldSrc(img.url)}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-md">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 text-white hover:bg-white/20 z-50 rounded-full h-12 w-12"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-8 h-8" />
          </Button>
          
          <div className="relative w-full max-w-6xl h-[80vh] mx-4">
            {images[currentIndex].url.includes("placeholder.jpg") || images[currentIndex].url.includes("placeholder-product") ? (
              <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                <span className="text-slate-500">No Image</span>
              </div>
            ) : images[currentIndex].url.startsWith("/") ? (
              <img
                src={images[currentIndex].url}
                alt="Fullscreen Product Image"
                className="w-full h-full object-contain"
              />
            ) : (
              <CldImage
                src={getCldSrc(images[currentIndex].url)}
                alt="Fullscreen Product Image"
                fill
                sizes="100vw"
                className="object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
