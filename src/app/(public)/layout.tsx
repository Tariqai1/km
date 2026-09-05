"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  Home, 
  Package, 
  PhoneCall, 
  Phone,
  MessageSquare,
  ChevronRight, 
  Mail, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Building2,
  QrCode,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/shared/Footer";
import dynamic from "next/dynamic";

const WhatsAppCTA = dynamic(() => import("@/components/shared/WhatsAppCTA"), {
  ssr: false,
});

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data) setSettings(data);
      })
      .catch((err) => console.error("Failed to load settings in layout", err));
  }, []);

  const companyName = settings?.companyName || "K.M. Engineering Works";
  const logoUrl = settings?.logoUrl;
  const primaryColor = settings?.primaryColor || "#162A45";
  const accentColor = settings?.accentColor === "#E8590C" || !settings?.accentColor ? "#B45309" : settings.accentColor;
  const secondaryColor = settings?.secondaryColor || "#0F172A";
  const whatsappColor = settings?.whatsappColor || "#15803D";
  const contactPhone = settings?.contactPhone || "+91 98216 69131";
  const contactEmail = settings?.contactEmail || "kmengineering1973@gmail.com";
  const contactAddress = settings?.contactAddress || "Workshop No. 58, Azmi Compound, Sakinaka, Mumbai – 400072";

  const navLinks = [
    { num: "01", name: "Home", href: "/", icon: Home, subtitle: "Turnkey Plant Overview & Scope" },
    { num: "02", name: "Machinery Catalog", href: "/products", icon: Package, badge: "50+ Models", subtitle: "SS-304/316 Food Processing Machines" },
    { num: "03", name: "Company Heritage", href: "/about", icon: Building2, subtitle: "15+ Years Fabrication, Standards & Workshop" },
    { num: "04", name: "Engineering Contact", href: "/contact", icon: PhoneCall, subtitle: "Direct Mumbai Factory Demos & Pricing" },
    { num: "05", name: "Digital Business Profile", href: "/connect", icon: QrCode, badge: "vCard / QR", subtitle: "Instant Phonebook Save & Fast Links" },
  ];

  return (
    <>
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            {logoUrl ? (
              <div className="relative h-10 w-10 sm:h-11 sm:w-11 overflow-hidden rounded-xl border border-slate-200">
                <Image
                  src={logoUrl}
                  alt={companyName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div 
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl text-white flex items-center justify-center font-bold font-display text-lg shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                KM
              </div>
            )}
            <div>
              <span className="font-bold text-slate-900 leading-tight text-sm sm:text-base tracking-tight block">
                {companyName}
              </span>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium">
                Industrial Machinery Specialist
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive =
                pathname === item.href ||
                (pathname.startsWith(item.href) && item.href !== "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                  style={isActive ? { backgroundColor: primaryColor } : {}}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA Section */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a 
              href={`tel:${contactPhone}`} 
              className="text-xs font-mono font-semibold text-slate-700 hover:text-[#162A45] flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" /> {contactPhone}
            </a>
            <Button
              asChild
              className="bg-[#162A45] hover:bg-[#0F1D30] text-white font-semibold text-xs px-4 h-9 rounded-lg shadow-2xs transition-colors focus-visible:ring-2 focus-visible:ring-[#162A45]"
            >
              <Link href="/contact">
                Request RFQ <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Mobile & Tablet Hamburger Trigger */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsOpen(true)}
            className="lg:hidden h-10 w-10 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 shrink-0"
            aria-label="Open Navigation Menu"
          >
            <Menu className="h-5 w-5 stroke-[2.2]" />
          </Button>
        </div>
      </header>

      {/* Full-Screen Immersive Industrial Navigation Console */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 backdrop-blur-2xl text-white flex flex-col justify-between overflow-y-auto lg:hidden animate-in fade-in duration-200"
          style={{ backgroundColor: `${secondaryColor}FA` }}
        >
          
          {/* Ambient Industrial Glow Highlights */}
          <div 
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-25" 
            style={{ backgroundColor: accentColor }}
          />
          <div 
            className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20" 
            style={{ backgroundColor: primaryColor }}
          />

          {/* Top Bar: Brand Crest & Circular Close Button */}
          <div className="relative z-10 px-5 sm:px-6 pt-5 pb-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="h-10 w-10 rounded-xl text-white flex items-center justify-center font-black font-display text-sm tracking-wider shadow-lg"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
              >
                KM
              </div>
              <div>
                <span className="font-bold text-white text-sm sm:text-base block tracking-tight leading-tight">
                  {companyName}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold uppercase tracking-wider mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Mumbai Factory Active
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/15 backdrop-blur-md transition-all active:scale-90"
              aria-label="Close menu"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider">Close</span>
              <X className="h-4 w-4 stroke-[2.2] group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="relative z-10 flex-1 px-5 sm:px-6 py-6 space-y-6">
            
            {/* Primary Editorial Navigation List (01, 02, 03, 04, 05) */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block px-1 mb-2">
                Main Index
              </span>

              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (pathname.startsWith(item.href) && item.href !== "/");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 border ${
                      isActive
                        ? "text-white shadow-lg"
                        : "border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/15 text-slate-300 hover:text-white"
                    }`}
                    style={isActive ? { 
                      borderColor: accentColor, 
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      boxShadow: `0 4px 20px ${accentColor}25`
                    } : {}}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span 
                        className={`font-mono text-xs font-bold shrink-0 transition-colors ${
                          isActive ? "" : "text-slate-500 group-hover:text-amber-400"
                        }`}
                        style={isActive ? { color: accentColor } : {}}
                      >
                        {item.num}
                      </span>

                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? "text-white"
                            : "bg-white/5 text-slate-400 group-hover:text-amber-400 group-hover:bg-white/10"
                        }`}
                        style={isActive ? { backgroundColor: accentColor } : {}}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm sm:text-base font-bold truncate ${isActive ? "text-white" : "text-slate-200"}`}>
                            {item.name}
                          </span>
                          {item.badge && (
                            <span 
                              className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
                              style={{ 
                                borderColor: `${accentColor}60`, 
                                color: accentColor, 
                                backgroundColor: `${accentColor}15` 
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        isActive
                          ? "translate-x-1"
                          : "text-slate-600 group-hover:text-slate-300 group-hover:translate-x-1"
                      }`}
                      style={isActive ? { color: accentColor } : {}}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Turnkey Machinery Quick Access Grid */}
            <div className="pt-1">
              <div className="flex items-center justify-between px-1 mb-2.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Direct Plant Discovery
                </span>
                <span className="text-[10px] font-semibold" style={{ color: accentColor }}>SS-304 Certified</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/products"
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 transition-all text-left group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">Tutti Frutti Plants</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Automatic dicing lines</div>
                </Link>

                <Link
                  href="/products"
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 transition-all text-left group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">Bakery Mixers</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Spiral &amp; Planetary 50kg</div>
                </Link>

                <Link
                  href="/products"
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 transition-all text-left group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">Vibro Sifters</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Sanitary circular grading</div>
                </Link>

                <Link
                  href="/products"
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 transition-all text-left group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">Snack Lines</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Continuous chips &amp; namkeen</div>
                </Link>
              </div>
            </div>

            {/* Direct Factory Works Desk Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/15 space-y-2.5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accentColor }}>
                  Factory Works &amp; Engineering Desk
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Mumbai, India</span>
              </div>
              
              <a
                href={`tel:${contactPhone}`}
                className="flex items-center gap-3 text-xs sm:text-sm text-white hover:text-amber-300 font-semibold transition-colors pt-1"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <span>{contactPhone}</span>
              </a>

              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-3 text-xs text-slate-300 hover:text-white transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <span className="truncate">{contactEmail}</span>
              </a>
            </div>

          </div>

          {/* Sticky Bottom Dual Action Dock */}
          <div 
            className="relative z-10 p-4 sm:p-5 border-t border-white/10 backdrop-blur-xl space-y-2.5 shrink-0"
            style={{ backgroundColor: `${secondaryColor}E6` }}
          >
            <div className="grid grid-cols-2 gap-2.5">
              <Button
                asChild
                className="w-full text-white font-bold h-11 rounded-xl shadow-lg flex items-center justify-center gap-1.5 text-xs sm:text-sm transition-transform active:scale-[0.98]"
                style={{ backgroundColor: accentColor }}
              >
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Instant Quote <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>

              <a
                href={`https://wa.me/${contactPhone.replace(/[^0-9]/g, "")}?text=Hello%20KM%20Engineering,%20I%20want%20information%20about%20machinery.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full text-white font-semibold h-11 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow-md transition-all active:scale-[0.98]"
                style={{ backgroundColor: whatsappColor }}
              >
                <MessageSquare className="h-3.5 w-3.5 fill-white" /> WhatsApp Sales
              </a>
            </div>

            <p className="text-[10px] text-center text-slate-400 font-medium flex items-center justify-center gap-1">
              <MapPin className="h-3 w-3 text-slate-500" /> {contactAddress}
            </p>
          </div>

        </div>
      )}

      {/* Main Pages Content */}
      <main className="min-h-[calc(100vh-80px)]">{children}</main>

      {/* Render Global Footer & WhatsApp CTA unless on standalone digital connect or campaign card */}
      {pathname !== "/connect" && !pathname?.startsWith("/campaign") && (
        <>
          <Footer />
          <WhatsAppCTA />
        </>
      )}
    </>
  );
}