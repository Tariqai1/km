import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import dbConnect from "@/lib/db";
import { Settings } from "@/models/Settings";

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-family-display"
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-family-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://km-inky.vercel.app"),
  title: {
    default: "K.M. Engineering Works | Food Processing & Bakery Machinery Manufacturer Mumbai",
    template: "%s | K.M. Engineering Works"
  },
  description: "Mumbai's leading manufacturer of commercial bakery equipment, spiral dough mixers, automatic tutti frutti processing plants, sanitary vibro sifters, and snack making machines. Precision-engineered with SS-304 food-grade stainless steel.",
  keywords: [
    "food processing machinery manufacturer",
    "bakery equipment manufacturer Mumbai",
    "commercial spiral dough mixer 50kg 100kg",
    "tutti frutti processing plant India",
    "sanitary vibro sifter screener SS 304",
    "industrial planetary mixer manufacturer",
    "namkeen snack making machine",
    "K.M. Engineering Works Mumbai",
    "Abdulkaleem Abdulkadar Sayyed",
    "Azmi Compound Sakinaka machinery"
  ],
  authors: [{ name: "K.M. Engineering Works" }],
  creator: "K.M. Engineering Works",
  publisher: "K.M. Engineering Works",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "K.M. Engineering Works | Food Processing & Bakery Machinery",
    description: "Precision-engineered industrial machinery for bakeries and food processing plants. Factory direct pricing from Mumbai, India.",
    url: "https://km-inky.vercel.app",
    siteName: "K.M. Engineering Works",
    images: [
      {
        url: "/placeholder-product.jpg",
        width: 1200,
        height: 630,
        alt: "K.M. Engineering Works Machinery Showcase",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K.M. Engineering Works | Machinery Manufacturer",
    description: "Heavy-duty commercial bakery & food processing machinery manufactured in Mumbai.",
    images: ["/placeholder-product.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import VisitorTracker from "@/components/shared/VisitorTracker";
import AnimatedPageLoader from "@/components/shared/AnimatedPageLoader";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch dynamic site settings
  let settings: any = null;
  try {
    await dbConnect();
    settings = await Settings.findOne().lean();
  } catch (error) {
    console.error("Failed to fetch settings in layout", error);
  }

  const primaryColor = settings?.primaryColor || "#1B365D";
  const accentColor = settings?.accentColor || "#E8590C";
  const companyName = settings?.companyName || "K.M. Engineering Works";

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": companyName,
    "image": "https://km-inky.vercel.app/placeholder-product.jpg",
    "url": "https://km-inky.vercel.app",
    "telephone": settings?.contactPhone || "+919876543210",
    "email": settings?.contactEmail || "info@kmengineering.com",
    "priceRange": "₹₹ - ₹₹₹₹",
    "founder": {
      "@type": "Person",
      "name": settings?.founderName || "Abdulkaleem Abdulkadar Sayyed",
      "jobTitle": settings?.founderTitle || "Founder & Managing Director"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings?.contactAddress || "Gala No.58, Azmi Compound, Near Kwality Bakery",
      "addressLocality": "Mumbai",
      "postalCode": "400072",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.1025,
      "longitude": 72.8875
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "description": settings?.heroSubheading || "Leading manufacturer of precision-engineered food processing and bakery machinery in Mumbai, India."
  };

  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd)
          }}
        />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --color-brand-primary: ${primaryColor};
            --color-brand-accent: ${accentColor};
          }
        `}} />
      </head>
      <body className="antialiased min-h-screen">
        <AnimatedPageLoader />
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
