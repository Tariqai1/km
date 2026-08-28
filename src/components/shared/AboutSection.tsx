"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Building2, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Factory, 
  Cog, 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AboutSectionProps {
  initialSettings?: any;
}

export default function AboutSection({ initialSettings }: AboutSectionProps) {
  const [settings, setSettings] = useState<any>(initialSettings || null);

  useEffect(() => {
    if (!initialSettings) {
      fetch("/api/settings")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) setSettings(data);
        })
        .catch(() => {});
    }
  }, [initialSettings]);

  const companyName = settings?.companyName || "K.M. Engineering Works";
  const aboutHeading = settings?.aboutHeading || "Pioneering Precision in Food Processing Machinery";
  const aboutStory = settings?.aboutStory || `Established under the visionary leadership of ${settings?.founderName || "Abdulkaleem Abdulkadar Sayyed"}, ${companyName} has grown into Mumbai's leading manufacturer of commercial bakery equipment, tutti frutti processing lines, and high-efficiency screening machinery.`;
  const founderName = settings?.founderName || "Abdulkaleem Abdulkadar Sayyed";
  const founderTitle = settings?.founderTitle || "Founder & Managing Director";
  const founderQuote = settings?.founderQuote || "Our commitment is simple: build machinery that operates reliably 24/7, minimizes food wastage, and maximizes the profitability of Indian food entrepreneurs.";

  const highlights = settings?.aboutHighlights && settings.aboutHighlights.length > 0
    ? settings.aboutHighlights
    : [
        {
          title: "15+ Years Industry Experience",
          desc: "Deep domain expertise in designing and manufacturing robust food processing machinery."
        },
        {
          title: "100% Food-Grade Metallurgy",
          desc: "All product contact parts fabricated exclusively in certified SS-304 & SS-316 stainless steel."
        },
        {
          title: "Custom Machinery Design",
          desc: "Bespoke engineering solutions tailored to your production volume, layout, and raw material."
        },
        {
          title: "Pan-India Installation & Support",
          desc: "On-site installation, technician training, and guaranteed availability of OEM spare parts."
        }
      ];

  const stats = settings?.companyStats && settings.companyStats.length >= 3
    ? settings.companyStats.slice(0, 3)
    : [
        { value: "500+", label: "Machines Built" },
        { value: "15+", label: "Years Active" },
        { value: "200+", label: "Repeat Clients" }
      ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left Column: Visual Story & Badges */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-primary to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-100">
              {/* Decorative Watermark Background */}
              <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                <Factory className="w-80 h-80 text-white" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-accent text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
                <Building2 className="w-3.5 h-3.5" /> Company Profile &amp; Legacy
              </div>

              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-display leading-snug mb-3">
                {aboutHeading}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                {aboutStory}
              </p>

              {/* Founder Quote Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15">
                <p className="text-xs sm:text-sm text-slate-200 italic mb-2.5">
                  &ldquo;{founderQuote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-white">{founderName}</h5>
                    <p className="text-[11px] text-brand-accent font-medium">{founderTitle}</p>
                  </div>
                  <div className="h-7 w-7 rounded-full bg-brand-accent/20 border border-brand-accent flex items-center justify-center text-brand-accent">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Manufacturing Stats Floating Strip */}
              <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-white/15 text-center">
                {stats.map((st: any, idx: number) => (
                  <div key={idx}>
                    <div className={`text-xl sm:text-2xl font-bold ${idx === 1 ? 'text-white' : 'text-brand-accent'} font-display`}>
                      {st.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-300 mt-0.5">{st.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Engineering Excellence & Capabilities */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 space-y-5"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-2.5">
                <Cog className="w-3.5 h-3.5" /> Engineering Standards
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-slate-900 tracking-tight leading-tight">
                Heavy-Duty Fabrication Built for Industrial Reliability
              </h2>
              <div className="w-16 h-1 bg-brand-accent rounded-full mt-2.5 mb-3"></div>
              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                Operating out of our fully-equipped workshop at <strong>{settings?.contactAddress || "Azmi Compound, Mumbai"}</strong>, we engineer every unit from ground up using CNC precision cutting, balanced rotary shafts, and food-grade hygienic welding.
              </p>
            </div>

            {/* Dynamic Core Capability Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item: any, index: number) => (
                <div key={index} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-primary/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button asChild className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 h-12 rounded-xl text-sm font-semibold shadow-md">
                <Link href="/products">
                  Explore Machinery Range <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-6 h-12 rounded-xl text-sm font-semibold">
                <Link href="/contact">
                  Visit Mumbai Works
                </Link>
              </Button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
