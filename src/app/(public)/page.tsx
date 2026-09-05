"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TrustBadges from "@/components/shared/TrustBadges";
import CategoryCard from "@/components/shared/CategoryCard";
import ProductCard from "@/components/shared/ProductCard";
import AboutSection from "@/components/shared/AboutSection";
import MachineReviews from "@/components/shared/MachineReviews";
import DigitalBanner from "@/components/shared/DigitalBanner";
import HeroShowcaseSlider from "@/components/shared/HeroShowcaseSlider";
import { 
  Cog, 
  ShieldCheck, 
  Headphones, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare,
  QrCode,
  Layers,
  Award,
  Factory,
  Zap,
  TrendingUp
} from "lucide-react";
import { useEffect, useState } from "react";

// Fallback Mock data
const mockCategories = [
  { name: "Tutti Frutti Plants", slug: "tutti-frutti", coverImage: "https://km-inky.vercel.app/placeholder-product.jpg", productCount: 6 },
  { name: "Bakery Machinery", slug: "bakery", coverImage: "https://km-inky.vercel.app/placeholder-product.jpg", productCount: 8 },
  { name: "Potato Chips Lines", slug: "chips", coverImage: "https://km-inky.vercel.app/placeholder-product.jpg", productCount: 4 },
  { name: "Namkeen & Farsan", slug: "namkeen", coverImage: "https://km-inky.vercel.app/placeholder-product.jpg", productCount: 5 },
  { name: "Sweets Machinery", slug: "sweets", coverImage: "https://km-inky.vercel.app/placeholder-product.jpg", productCount: 4 },
  { name: "Vibro Screeners", slug: "vibro-sifter", coverImage: "https://km-inky.vercel.app/placeholder-product.jpg", productCount: 3 }
];

const mockProducts = [
  { title: "50 Kg Commercial Spiral Dough Mixer (SS-304)", slug: "spiral-mixer-50kg", category: "Bakery Machinery", images: [{url: "https://km-inky.vercel.app/placeholder-product.jpg"}] },
  { title: "Automatic Tutti Frutti Dicing & Processing Plant", slug: "tutti-frutti-plant", category: "Food Processing", images: [{url: "https://km-inky.vercel.app/placeholder-product.jpg"}] },
  { title: "30-Inch Sanitary Circular Vibro Sifter", slug: "vibro-sifter-30", category: "Screening & Grading", images: [{url: "https://km-inky.vercel.app/placeholder-product.jpg"}] },
  { title: "Commercial Continuous Namkeen Frying System", slug: "namkeen-fryer", category: "Snack Processing", images: [{url: "https://km-inky.vercel.app/placeholder-product.jpg"}] }
];

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  useEffect(() => {
    // Fetch settings
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(() => {});

    // Fetch categories
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        const cats = data.categories || data;
        if (Array.isArray(cats) && cats.length > 0) {
          setCategories(cats);
        } else {
          setCategories(mockCategories);
        }
      })
      .catch(() => setCategories(mockCategories));

    // Fetch featured products
    fetch("/api/products?featured=true")
      .then(res => res.json())
      .then(data => {
        const prods = data.products || data;
        if (Array.isArray(prods) && prods.length > 0) {
          setProducts(prods);
        } else {
          setProducts(mockProducts);
        }
      })
      .catch(() => setProducts(mockProducts));
  }, []);

  const filteredProducts = selectedCategoryFilter === "all"
    ? products
    : products.filter((p) => {
        const cName =
          typeof p.category === "object" && p.category !== null
            ? p.category.name || ""
            : typeof p.category === "string"
            ? p.category
            : p.categoryName || "";
        return cName.toLowerCase().includes(selectedCategoryFilter.toLowerCase());
      });

  const primaryPhone = settings?.contactPhone || "+91 9821669131";

  return (
    <div className="bg-white overflow-hidden selection:bg-brand-accent selection:text-white">
      
      {/* 1. HERO SECTION (High-Clarity Industrial Workshop with Milled Hairlines) */}
      <section className="relative bg-[#F4F6F9] text-slate-900 border-b border-slate-300 py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Direct Procurement Information & Fabrication Credentials */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Contextual Facility & Credentials Label (Integrated, not a floating pill) */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600">
                <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" aria-hidden="true" />
                  MUMBAI WORKS · WORKSHOP NO. 58
                </span>
                <span className="text-slate-300">|</span>
                <span>ISO 9001 &amp; GST REGISTERED</span>
                <span className="text-slate-300">|</span>
                <span>SS-304 / SS-316 SPECIALIST</span>
              </div>

              {/* Main Engineering Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-[1.15]">
                Commercial Food &amp; Bakery Processing Machinery Fabricated in SS-304 Stainless Steel
              </h1>

              {/* Industrial Value Description */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                {settings?.heroSubheading || "K.M. Engineering Works is Mumbai's trusted manufacturer of high-performance Tutti Frutti processing plants, commercial spiral bakery mixers, potato chips lines, and custom stainless steel machinery built for 24/7 reliability."}
              </p>

              {/* Operational Specifications Anchored to Fabrication */}
              <div className="border-y border-slate-300 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase block">Metallurgy</span>
                  <span className="font-semibold text-slate-900">SS-304 &amp; SS-316</span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase block">Vibration Control</span>
                  <span className="font-semibold text-slate-900">Heavy Cast Iron Bed</span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase block">Verification</span>
                  <span className="font-semibold text-slate-900">100% Pre-Dispatch Trial</span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase block">Field Support</span>
                  <span className="font-semibold text-slate-900">Pan-India OEM Spares</span>
                </div>
              </div>

              {/* Action Buttons: Considered Industrial Hierarchy */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  asChild
                  size="default"
                  className="bg-[#162A45] hover:bg-[#0F1D30] text-white font-semibold px-6 h-11 rounded-lg shadow-xs text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-[#162A45]"
                >
                  <Link href="/contact">
                    Request Machinery Spec Sheet / RFQ <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="default"
                  variant="outline"
                  className="border-slate-300 bg-white hover:bg-slate-100 text-slate-800 font-semibold px-5 h-11 rounded-lg text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  <Link href="/products">
                    Browse 50+ Models
                  </Link>
                </Button>

                <Button
                  asChild
                  size="default"
                  variant="outline"
                  className="border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 h-11 rounded-lg text-xs"
                >
                  <a
                    href={`https://wa.me/91${primaryPhone.replace(/\D/g, "")}?text=Hello%20KM%20Engineering,%20I%20want%20to%20inquire%20about%20machinery.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> WhatsApp Sales Desk
                  </a>
                </Button>
              </div>

            </div>

            {/* Right Column: Orchestrated Workshop Machine Inspection Viewport */}
            {settings?.showHeroShowcase !== false && (
              <div className="lg:col-span-5 relative">
                <HeroShowcaseSlider 
                  images={settings?.heroImages} 
                  fallbackProducts={products} 
                />
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 2. TRUST PILLARS BAR */}
      <TrustBadges />

      {/* 3. PERMANENT SMART QR CALLOUT RIBBON */}
      {settings?.showQrRibbon !== false && (
        <section className="py-6 bg-slate-900 text-white border-y border-slate-800">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-brand-primary/40 via-brand-dark to-brand-primary/40 border border-brand-primary/30">
              <div className="flex items-center gap-3.5 text-center sm:text-left">
                <div className="w-11 h-11 rounded-xl bg-brand-accent/20 text-brand-accent flex items-center justify-center shrink-0 border border-brand-accent/30">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    Dynamic Smart QR &amp; Digital Business Profile Active
                  </h4>
                  <p className="text-xs text-slate-300">
                    Instant mobile access to WhatsApp, Click-to-Call, .vcf Contact Saver, and Plant Catalogues.
                  </p>
                </div>
              </div>

              <Button asChild size="sm" className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold shrink-0 shadow-md">
                <Link href="/connect">
                  Open Profile &amp; QR <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* 4. TURNKEY MACHINERY CATEGORIES GRID */}
      {settings?.showCategoriesSection !== false && (
        <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            
            <div className="max-w-3xl mx-auto mb-10 text-center space-y-2">
              <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block">
                Manufacturing Scope · Turnkey Plants
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Turnkey Food Processing Plants &amp; Production Lines
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Custom-engineered processing lines fabricated in certified SS-304 &amp; SS-316 stainless steel for maximum operational throughput and zero contamination.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {categories.map((cat, idx) => (
                <div key={cat.slug || idx}>
                  <CategoryCard category={cat} />
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 5. BESTSELLING MACHINERY SHOWCASE (With Category Filters) */}
      {settings?.showFeaturedProducts !== false && (
        <section className="py-16 sm:py-20 bg-slate-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-slate-200 pb-4">
              <div>
                <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-1">
                  Machinery Catalog · Active Stock &amp; Custom Builds
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Featured Industrial Machinery
                </h2>
              </div>

              <Button asChild variant="outline" size="sm" className="border-slate-300 font-semibold text-slate-800 hover:bg-slate-100 shrink-0 h-9 rounded-lg text-xs">
                <Link href="/products">
                  View Full Catalog (50+ Models) <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>

            {/* Machinery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((prod, idx) => (
                <div key={prod.slug || idx}>
                  <ProductCard product={prod} />
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 6. DIGITAL MARKETING BANNER & PROMO CREATIVE */}
      {settings?.showDigitalBanner !== false && <DigitalBanner settings={settings} />}

      {/* 7. AUTHENTIC B2B CLIENT CASE STUDIES & REVIEWS */}
      {settings?.showClientReviews !== false && <MachineReviews />}

      {/* 8. COMPANY HERITAGE & INFRASTRUCTURE */}
      {settings?.showAboutSection !== false && <AboutSection />}

      {/* 9. FACTORY VERIFICATION & MANUFACTURING METRICS */}
      {settings?.showStatsCounter !== false && (
        <section className="py-12 bg-[#F4F6F9] border-y border-slate-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="border border-slate-300 bg-white rounded-xl divide-y sm:divide-y-0 sm:divide-x divide-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 shadow-2xs">
              <div className="p-6">
                <div className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-1">Operational History</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0F172A]">15+ Years</div>
                <p className="text-xs text-slate-600 mt-1.5 leading-normal">
                  Continuous fabrication experience at Workshop No. 58, Sakinaka, Mumbai.
                </p>
              </div>
              <div className="p-6">
                <div className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-1">Industrial Deliveries</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0F172A]">500+ Units</div>
                <p className="text-xs text-slate-600 mt-1.5 leading-normal">
                  Commercial bakery mixers, vibro sifters, and snack frying lines commissioned.
                </p>
              </div>
              <div className="p-6">
                <div className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-1">Metallurgical Standard</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#15803D]">SS-304 / 316</div>
                <p className="text-xs text-slate-600 mt-1.5 leading-normal">
                  Certified food-grade contact fabrication with zero toxic metal migration.
                </p>
              </div>
              <div className="p-6">
                <div className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-1">Quality Assurance</div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#B45309]">100% Tested</div>
                <p className="text-xs text-slate-600 mt-1.5 leading-normal">
                  Every machine undergoes live continuous load trials before transport dispatch.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 10. WHY CHOOSE K.M. ENGINEERING */}
      {settings?.showWhyChooseUs !== false && (
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2.5">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display tracking-tight text-slate-900">
                Why Indian Food Processors Trust K.M. Engineering
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                Engineered for continuous 24/7 commercial reliability, zero ingredient wastage, and direct Mumbai factory pricing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs space-y-3 hover:border-brand-primary transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <Cog className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">Heavy Industrial Metallurgy</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  All food-contact surfaces are fabricated in certified SS-304/SS-316 stainless steel with heavy cast iron vibration-damping chassis.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs space-y-3 hover:border-brand-accent transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">100% Pre-Dispatch Trial</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Every machine undergoes a full continuous load testing trial at our Mumbai factory with live video verification before dispatch.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs space-y-3 hover:border-blue-600 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Headphones className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">Guaranteed Spares &amp; Support</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Direct technician on-site installation support across India with guaranteed immediate availability of genuine OEM spare parts.
                </p>
              </motion.div>
            </div>

          </div>
        </section>
      )}

    </div>
  );
}