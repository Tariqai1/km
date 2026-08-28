"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Wrench, 
  PhoneCall, 
  CheckCircle2, 
  MessageSquare,
  Factory,
  Zap,
  TrendingUp,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DigitalBannerProps {
  settings?: {
    bannerActive?: boolean;
    bannerBadge?: string;
    bannerHeading?: string;
    bannerSubheading?: string;
    bannerCtaText?: string;
    bannerCtaLink?: string;
    contactPhone?: string;
  };
}

export default function DigitalBanner({ settings }: DigitalBannerProps) {
  if (settings?.bannerActive === false) {
    return null;
  }

  const badgeText = settings?.bannerBadge || "🔥 Special B2B Factory Initiative";
  const heading = settings?.bannerHeading || "Turnkey Commercial Bakery & Food Processing Plant Setup";
  const subheading = settings?.bannerSubheading || "Get customized 3D plant layout engineering, genuine SS-304 food-grade machinery fabrication, and on-site commissioning with zero-vibration guarantee.";
  const ctaText = settings?.bannerCtaText || "Request Custom Plant Consultation";
  const ctaLink = settings?.bannerCtaLink || "/contact";
  const phone = settings?.contactPhone || "+91 98765 43210";

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Main Creative Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#061426] via-[#0F2440] to-[#1B365D] text-white p-8 sm:p-12 lg:p-14 shadow-2xl border border-slate-800"
        >
          {/* Glowing Ambient Background Orbs */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-accent/25 rounded-full blur-3xl pointer-events-none -z-0"></div>
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none -z-0"></div>

          {/* Technical Blueprint Watermark */}
          <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none -z-0">
            <Factory className="w-96 h-96 text-white" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Col: Creative Pitch & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Glowing Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/40 text-brand-accent text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>{badgeText}</span>
              </div>

              {/* Bold Title */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display tracking-tight text-white leading-tight">
                {heading}
              </h2>

              {/* Subheading */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                {subheading}
              </p>

              {/* 4 Value Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">100% SS-304 Certified Metallurgy</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                  <Wrench className="w-4 h-4 text-brand-accent shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">Custom 3D CAD Factory Layout</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">Zero-Vibration Balanced Drive</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                  <TrendingUp className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">Direct Factory Pricing (Zero Markup)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  asChild
                  size="default"
                  className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold px-6 h-11 rounded-xl shadow-md text-xs sm:text-sm transition-transform active:scale-[0.98]"
                >
                  <Link href={ctaLink}>
                    {ctaText} <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="default"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 font-semibold px-5 h-11 rounded-xl backdrop-blur-md text-xs sm:text-sm"
                >
                  <a
                    href={`https://wa.me/91${phone.replace(/\D/g, "")}?text=Hello%20K.M.%20Engineering,%20I%20want%20information%20about%20turnkey%20food%20processing%20machinery.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="w-4 h-4 mr-1.5 text-emerald-400" /> WhatsApp Engineer
                  </a>
                </Button>
              </div>

            </div>

            {/* Right Col: 3D Visual Metric Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/15 shadow-xl space-y-6 text-center">
                
                <div className="w-16 h-16 rounded-2xl bg-brand-accent/20 border border-brand-accent/40 text-brand-accent flex items-center justify-center mx-auto shadow-inner">
                  <Award className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-accent">Official Guarantee</div>
                  <h4 className="text-xl font-bold font-display text-white">K.M. Engineering Works</h4>
                  <p className="text-xs text-slate-300">Mumbai&apos;s Trusted Machinery Manufacturer Since 2010</p>
                </div>

                {/* 3 Stats Strip */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
                  <div className="p-2">
                    <div className="text-2xl font-extrabold font-display text-brand-accent">15+</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Years Active</div>
                  </div>
                  <div className="p-2 border-x border-white/10">
                    <div className="text-2xl font-extrabold font-display text-white">500+</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Plants Built</div>
                  </div>
                  <div className="p-2">
                    <div className="text-2xl font-extrabold font-display text-emerald-400">100%</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">SS-304 Food Grade</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/20 border border-white/10 text-xs text-slate-300 flex items-center justify-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct Hotline: <strong>{phone}</strong></span>
                </div>

              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
