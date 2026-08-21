import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Automatically optimizes Cloudinary image delivery with:
 * - f_auto: modern format (AVIF / WebP depending on browser)
 * - q_auto: smart AI compression
 * - w_{width}: responsive dimension constraint
 */
export function getOptimizedImageUrl(url: string | undefined | null, width: number = 800): string {
  if (!url) return "/placeholder.jpg";
  if (!url.includes("res.cloudinary.com")) return url;

  // Check if transformation is already present
  if (url.includes("/upload/f_auto") || url.includes("/upload/q_auto")) {
    return url;
  }

  // Replace /upload/ with /upload/f_auto,q_auto,w_{width},c_limit/
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
}
