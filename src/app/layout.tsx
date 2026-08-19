import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-family-display"
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-family-sans"
});

export const metadata: Metadata = {
  title: "K.M. Engineering Works | Food Processing Machinery Manufacturer",
  description: "Precision-Engineered Food Processing & Bakery Machinery. Trusted manufacturer of Tutti Frutti Machines, Vibro Sifters, Dough Mixers, Namkeen Machines & Bakery Equipment. Based in Mumbai, India.",
  keywords: ["food processing machinery", "bakery equipment", "tutti frutti machine", "vibro sifter", "dough mixer", "namkeen machine", "Mumbai manufacturer"],
};

import dbConnect from "@/lib/db";
import { Settings } from "@/models/Settings";

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

  // Hex to HSL or RGB conversion can be complex for tailwind, but modern browsers support css variables natively.
  // Tailwind v4 uses standard css variables.

  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": companyName,
              "url": "https://www.kmengineering.com",
              "telephone": settings?.contactPhone || "+919876543210",
              "founder": {
                "@type": "Person",
                "name": "Abdulkaleem Abdulkadar Sayyed"
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
                "latitude": 19.1,
                "longitude": 72.9
              },
              "description": settings?.heroSubheading || "Leading manufacturer of precision-engineered food processing and bakery machinery in Mumbai, India."
            })
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
        {children}
      </body>
    </html>
  );
}
