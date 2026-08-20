"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TrustBadges from "@/components/shared/TrustBadges";
import CategoryCard from "@/components/shared/CategoryCard";
import ProductCard from "@/components/shared/ProductCard";
import AboutSection from "@/components/shared/AboutSection";
import MachineReviews from "@/components/shared/MachineReviews";
import { Cog, ShieldCheck, Headphones } from "lucide-react";
import { useEffect, useState } from "react";

// Mock data for fallback
const mockCategories = [
  { name: "Food Processing", slug: "food-processing", coverImage: "/placeholder.jpg", productCount: 12 },
  { name: "Bakery Machinery", slug: "bakery", coverImage: "/placeholder.jpg", productCount: 8 },
  { name: "Industrial Mixers", slug: "mixers", coverImage: "/placeholder.jpg", productCount: 5 }
];

const mockProducts = [
  { title: "Tutti Frutti Processing Machine", slug: "tutti-frutti-machine", category: "Food Processing", images: [{url: "/placeholder.jpg"}] },
  { title: "Vibro Sifter 48 Inch", slug: "vibro-sifter", category: "Food Processing", images: [{url: "/placeholder.jpg"}] },
  { title: "Commercial Dough Mixer 50kg", slug: "dough-mixer-50kg", category: "Bakery Machinery", images: [{url: "/placeholder.jpg"}] },
  { title: "Namkeen Making Machine", slug: "namkeen-machine", category: "Food Processing", images: [{url: "/placeholder.jpg"}] }
];

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    // Fetch settings
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error("Error fetching settings:", err));

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
      .catch(err => {
        console.error("Error fetching categories:", err);
        setCategories(mockCategories);
      });

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
      .catch(err => {
        console.error("Error fetching products:", err);
        setProducts(mockProducts);
      });
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative bg-brand-dark text-white min-h-[90vh] flex items-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/90 via-brand-dark to-brand-secondary"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://res.cloudinary.com/gksfzjxf/image/upload/v1/products/placeholder.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 mix-blend-overlay"
        ></motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl -z-10 mix-blend-screen"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-brand-primary/30 rounded-full blur-3xl -z-10 mix-blend-screen"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-10 pb-16 md:pt-16 md:pb-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-[55%]"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-brand-light text-sm font-medium mb-6 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                Leading B2B Machinery Manufacturer
              </motion.div>
              
              <h1 className="font-extrabold font-display leading-[1.15] tracking-tight mb-6 text-[clamp(1.875rem,3.8vw,3.25rem)] [text-wrap:balance]">
                {settings?.heroHeading ? (
                  <>
                    {settings.heroHeading.split(' ').slice(0, -1).join(' ')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-accent/80">{settings.heroHeading.split(' ').slice(-1)}</span>
                  </>
                ) : (
                  <>Precision-Engineered <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-accent/80">Machinery</span> for Modern Industry</>
                )}
              </h1>
              <p className="text-[clamp(0.95rem,1.3vw,1.125rem)] text-brand-light/80 mb-10 max-w-2xl font-light leading-relaxed whitespace-pre-line">
                {settings?.heroSubheading || "K.M. Engineering Works is Mumbai's trusted manufacturer of high-quality, durable, and efficient machinery for the food and bakery industry."}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-brand-accent hover:bg-brand-accent-hover text-white text-lg h-14 px-8 shadow-lg shadow-brand-accent/20 transition-all hover:-translate-y-1">
                  <Link href="/products">Explore Machines</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-brand-primary text-lg h-14 px-8 bg-white/5 backdrop-blur-sm transition-all hover:-translate-y-1">
                  <Link href="/contact">Request a Quote</Link>
                </Button>
              </div>
            </motion.div>

            {/* Premium Banner Image Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="w-full lg:w-[45%] hidden md:block relative mt-8 lg:mt-0"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                {/* Skeleton Loader placeholder */}
                <div className="absolute inset-0 bg-slate-800 animate-pulse z-0"></div>
                
                {/* Overlay for premium feel */}
                <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors duration-500 z-20 mix-blend-overlay pointer-events-none"></div>
                
                {/* Banner Image */}
                <Image 
                  src={settings?.heroBannerUrl || "https://picsum.photos/1200/800?random=1"} 
                  alt="Industrial Machinery Banner" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 z-10 opacity-90"
                />
                
                {/* Floating Glassmorphism Badge */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  className="absolute bottom-6 -left-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-2xl flex items-center gap-4 hidden lg:flex"
                >
                  <div className="h-12 w-12 rounded-full bg-brand-accent flex items-center justify-center text-white shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white font-bold font-display text-lg leading-tight">ISO 9001:2015</div>
                    <div className="text-white/80 text-sm">Certified Quality</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <TrustBadges />
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-dark mb-4">
              Our Machine Categories
            </h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <CategoryCard category={cat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-dark mb-4">
                Bestselling Machinery
              </h2>
              <div className="w-24 h-1 bg-brand-accent rounded-full"></div>
            </div>
            <Link href="/products" className="text-brand-primary font-medium hover:text-brand-accent hidden md:block">
              View All Products &rarr;
            </Link>
          </motion.div>
          
          <div className="flex overflow-x-auto pb-8 gap-6 scrollbar-hide snap-x">
            {products.map((prod, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="min-w-[300px] md:min-w-[350px] snap-start"
              >
                <ProductCard product={prod} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT COMPANY HERITAGE & INFRASTRUCTURE */}
      <AboutSection />

      {/* COMPANY STATS SECTION */}
      <section className="py-16 bg-brand-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {settings?.companyStats?.map((stat: { value: string, label: string }, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.1, duration: 0.5, type: "spring" }}
              >
                <div className="text-4xl md:text-5xl font-bold font-display text-brand-accent mb-2">{stat.value}</div>
                <div className="text-brand-light/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
            {/* Fallback if no stats in settings yet */}
            {(!settings?.companyStats || settings.companyStats.length === 0) && (
              <>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                  <div className="text-4xl md:text-5xl font-bold font-display text-brand-accent mb-2">15+</div>
                  <div className="text-brand-light/80 font-medium">Years Experience</div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                  <div className="text-4xl md:text-5xl font-bold font-display text-brand-accent mb-2">500+</div>
                  <div className="text-brand-light/80 font-medium">Machines Delivered</div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <div className="text-4xl md:text-5xl font-bold font-display text-brand-accent mb-2">200+</div>
                  <div className="text-brand-light/80 font-medium">Happy Clients</div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                  <div className="text-4xl md:text-5xl font-bold font-display text-brand-accent mb-2">Pan-India</div>
                  <div className="text-brand-light/80 font-medium">Service Network</div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-dark mb-4">
              Why Choose K.M. Engineering?
            </h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-2 transition-transform"
            >
              <div className="w-16 h-16 mx-auto bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-6">
                <Cog className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-display text-brand-dark mb-3">Precision Engineering</h3>
              <p className="text-gray-600">Manufactured with high precision using advanced technology to ensure flawless operation and longevity.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-2 transition-transform"
            >
              <div className="w-16 h-16 mx-auto bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-display text-brand-dark mb-3">Food-Grade Materials</h3>
              <p className="text-gray-600">All contact parts are made from premium SS-304/316 stainless steel complying with food safety standards.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-2 transition-transform"
            >
              <div className="w-16 h-16 mx-auto bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-6">
                <Headphones className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-display text-brand-dark mb-3">After-Sales Support</h3>
              <p className="text-gray-600">Dedicated support team for installation, maintenance, and prompt availability of spare parts.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CLIENT REVIEWS & VERIFIED PERFORMANCE */}
      <MachineReviews />

    </div>
  );
}