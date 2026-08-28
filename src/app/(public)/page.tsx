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
    : products.filter(p => (p.categoryName || p.category || "").toLowerCase().includes(selectedCategoryFilter.toLowerCase()));

  const primaryPhone = settings?.contactPhone || "+91 9821669131";

  return (
    <div className="bg-white overflow-hidden selection:bg-brand-accent selection:text-white">
      
      {/* 1. HERO SECTION (High-Impact Industrial Navy with Glowing Halo) */}
      <section className="relative bg-[#071324] text-white min-h-[78vh] sm:min-h-[85vh] flex items-center overflow-hidden">
        
        {/* Ambient Gradient Lighting */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-brand-accent/15 rounded-full blur-[120px] pointer-events-none -z-0"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none -z-0"></div>
        
        {/* Subtle Engineering Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 pb-12 sm:pt-12 sm:pb-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Hero Copy & Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-5"
            >
              
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-semibold backdrop-blur-md shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ISO &amp; GST Registered Food Machinery Manufacturer</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight text-white leading-tight">
                Precision-Engineered <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-orange-400">Food &amp; Bakery</span> Machinery
              </h1>

              {/* Subheading */}
              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-normal">
                {settings?.heroSubheading || "K.M. Engineering Works is Mumbai's trusted manufacturer of high-performance Tutti Frutti processing plants, commercial spiral bakery mixers, potato chips lines, and custom stainless steel machinery."}
              </p>

              {/* 4 Fast Feature Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-1">
                <div className="bg-white/5 backdrop-blur-sm p-2.5 rounded-xl border border-white/10 text-center">
                  <div className="text-xs font-bold text-white">100% SS-304</div>
                  <div className="text-[10px] text-slate-400">Certified Food Grade</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-2.5 rounded-xl border border-white/10 text-center">
                  <div className="text-xs font-bold text-orange-400">Zero Vibration</div>
                  <div className="text-[10px] text-slate-400">Balanced Heavy Base</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-2.5 rounded-xl border border-white/10 text-center">
                  <div className="text-xs font-bold text-emerald-400">1-Yr Warranty</div>
                  <div className="text-[10px] text-slate-400">Comprehensive Spares</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-2.5 rounded-xl border border-white/10 text-center">
                  <div className="text-xs font-bold text-blue-400">Pan-India</div>
                  <div className="text-[10px] text-slate-400">On-Site Dispatch</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Button
                  asChild
                  size="default"
                  className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 h-11 rounded-xl shadow-lg shadow-orange-600/30 text-xs sm:text-sm transition-transform active:scale-[0.98]"
                >
                  <Link href="/products">
                    Explore Machines <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="default"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 font-semibold px-5 h-11 rounded-xl backdrop-blur-md text-xs sm:text-sm"
                >
                  <a
                    href={`https://wa.me/91${primaryPhone.replace(/\D/g, "")}?text=Hello%20KM%20Engineering,%20I%20want%20to%20inquire%20about%20machinery.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="w-4 h-4 mr-1.5 text-emerald-400" /> WhatsApp Sales
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="text-slate-300 hover:text-white hover:bg-white/10 text-xs font-semibold px-4"
                >
                  <Link href="/connect">
                    <QrCode className="w-3.5 h-3.5 mr-1.5 text-brand-accent" /> Digital Business Profile
                  </Link>
                </Button>
              </div>

            </motion.div>

            {/* Right Column: 3D Multi-Image Showcase Slider & Founder Guarantee */}
            {settings?.showHeroShowcase !== false && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="lg:col-span-5 relative"
              >
                <HeroShowcaseSlider 
                  images={settings?.heroImages} 
                  fallbackProducts={products} 
                />
              </motion.div>
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
        <section className="py-20 bg-slate-50 relative">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-brand-accent" /> Manufacturing Capabilities
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display tracking-tight text-slate-900">
                Turnkey Food Processing Plants &amp; Machines
              </h2>
              <div className="w-16 h-1 bg-brand-accent mx-auto rounded-full"></div>
              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                Custom-engineered processing lines fabricated in certified SS-304 &amp; SS-316 stainless steel for maximum operational throughput.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat.slug || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <CategoryCard category={cat} />
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 5. BESTSELLING MACHINERY SHOWCASE (With Category Filters) */}
      {settings?.showFeaturedProducts !== false && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> High-Performance Engineering
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display tracking-tight text-slate-900">
                  Featured Industrial Machinery
                </h2>
              </div>

              <Button asChild variant="outline" size="sm" className="border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 shrink-0 h-9 rounded-xl">
                <Link href="/products">
                  View All Machinery &rarr;
                </Link>
              </Button>
            </div>

            {/* Machinery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((prod, idx) => (
                <motion.div
                  key={prod.slug || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <ProductCard product={prod} />
                </motion.div>
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

      {/* 9. FACTORY MILESTONES COUNTER SECTION */}
      {settings?.showStatsCounter !== false && (
        <section className="py-14 sm:py-16 bg-[#071324] text-white border-t border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
              {settings?.companyStats?.map((stat: { value: string, label: string }, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }} 
                  whileInView={{ opacity: 1, scale: 1 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-brand-accent mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium">{stat.label}</div>
                </motion.div>
              ))}
              {(!settings?.companyStats || settings.companyStats.length === 0) && (
                <>
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-brand-accent mb-1">15+</div>
                    <div className="text-xs sm:text-sm text-slate-300 font-medium">Years Manufacturing</div>
                  </div>
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white mb-1">500+</div>
                    <div className="text-xs sm:text-sm text-slate-300 font-medium">Machines Delivered</div>
                  </div>
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-emerald-400 mb-1">200+</div>
                    <div className="text-xs sm:text-sm text-slate-300 font-medium">Corporate Clients</div>
                  </div>
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-blue-400 mb-1">Pan-India</div>
                    <div className="text-xs sm:text-sm text-slate-300 font-medium">Service Network</div>
                  </div>
                </>
              )}
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