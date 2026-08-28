"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Award, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare, 
  FileDown, 
  ShieldCheck, 
  Factory, 
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AgmGoaCampaignPage() {
  const tuttiFruttiLine = [
    {
      step: "01",
      title: "High-Speed Papaya Peeling & Slicing",
      desc: "Uniform outer skin removal minimizing raw fruit flesh wastage to under 3%."
    },
    {
      step: "02",
      title: "Precision Rotary Dicing Machine",
      desc: "Sharp cross-cut rotary blades delivering perfectly clean 6mm, 8mm, or 10mm cubes with zero edge crushing."
    },
    {
      step: "03",
      title: "SS-304 Boiling & Blanching Line",
      desc: "Steam-jacketed stainless steel vessels with automatic temperature controls for uniform fruit texture."
    },
    {
      step: "04",
      title: "Sugar Syrup Infusion & Impregnation",
      desc: "Vacuum-assisted multi-stage color infusion for bright, long-lasting Red, Green, and Yellow Tutti Frutti."
    },
    {
      step: "05",
      title: "Vibratory De-Watering & Drying System",
      desc: "Continuous sanitary vibro screeners removing excess syrup followed by controlled moisture drying."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-accent selection:text-white font-sans">
      
      {/* 1. HERO SPONSORSHIP BANNER */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#061426] via-[#0F2440] to-slate-950 border-b border-slate-800">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          {/* Official Sponsor Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Award className="w-4 h-4 text-amber-400" /> Official Machinery Sponsor • 1st AGM
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight text-white leading-tight">
            All India Tutti Frutti &amp; Karonda Manufacturers Association
          </h1>

          {/* Event Meta Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-slate-200">
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
              <Calendar className="w-4 h-4 text-brand-accent" /> 26 September 2026
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
              <MapPin className="w-4 h-4 text-emerald-400" /> Goa, India
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
              <Factory className="w-4 h-4 text-blue-400" /> K.M. Engineering Works Stall
            </div>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed pt-1">
            Welcome to the official AGM showcase of <strong>K.M. Engineering Works</strong>. Discover our next-generation automated Tutti Frutti processing lines, precision dicing machinery, and zero-vibration food equipment designed exclusively for commercial Indian fruit processors.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Button
              asChild
              size="default"
              className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold px-6 h-11 rounded-xl shadow-lg shadow-brand-accent/30 text-xs sm:text-sm"
            >
              <a
                href="https://wa.me/919821669131?text=Hello%20Abdul%20Kaleem%20sir,%20I%20am%20attending%20the%20Goa%20AGM%20and%20want%20to%20discuss%20Tutti%20Frutti%20plant%20machinery."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="w-4 h-4 mr-1.5" /> Book AGM Meeting on WhatsApp
              </a>
            </Button>

            <Button
              asChild
              size="default"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 font-semibold px-5 h-11 rounded-xl text-xs sm:text-sm"
            >
              <Link href="/connect">
                View Digital Business Profile <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </div>

        </div>

      </section>

      {/* 2. COMPLETE TUTTI FRUTTI AUTOMATION PROCESS */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-accent">Turnkey Engineering</div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-white">
            Complete Automated Tutti Frutti Processing Line
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
            From raw green papaya handling to packaging-ready colored Tutti Frutti cubes.
          </p>
        </div>

        <div className="space-y-4">
          {tuttiFruttiLine.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-brand-accent/50 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-md"
            >
              <div className="text-2xl font-black font-display text-brand-accent bg-brand-accent/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-brand-accent/30">
                {item.step}
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
              </div>
              <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 shrink-0">
                SS-304 Certified
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* 3. DIRECT CONTACT WITH FOUNDER */}
      <section className="py-12 px-4 sm:px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#061426] via-[#0F2440] to-[#1B365D] rounded-3xl p-8 sm:p-10 border border-slate-700 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 text-center sm:text-left">
            <div className="text-xs font-bold text-brand-accent uppercase tracking-widest">Connect at the AGM</div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              Abdul Kaleem Sayyed
            </h3>
            <p className="text-xs text-slate-300">Founder &amp; Managing Director • K.M. Engineering Works</p>
            <div className="pt-2 text-xs text-slate-300 space-y-1">
              <div>📞 <strong>Direct Hotline:</strong> +91-9821669131 / +91-8828489550</div>
              <div>✉️ <strong>Email:</strong> kmengineering1973@gmail.com</div>
              <div>📍 <strong>Works:</strong> Workshop No. 58, Azmi Compound, Sakinaka, Mumbai – 400072</div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full sm:w-auto shrink-0">
            <Button
              asChild
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 px-6 rounded-xl shadow-lg"
            >
              <a href="https://wa.me/919821669131" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="w-4 h-4 mr-2" /> Direct WhatsApp Chat
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 h-11 px-6 rounded-xl"
            >
              <a href="tel:+919821669131">
                <PhoneCall className="w-4 h-4 mr-2" /> Call +91 9821669131
              </a>
            </Button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-900">
        &copy; {new Date().getFullYear()} K.M. Engineering Works • 1st AGM Official Machinery Sponsor
      </footer>

    </div>
  );
}
