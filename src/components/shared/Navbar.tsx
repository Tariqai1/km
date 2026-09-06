"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ChevronDown, 
  PhoneCall, 
  Phone,
  ArrowRight,
  ShieldCheck,
  Building2,
  Mail, 
  MapPin, 
  MessageSquare,
  Sparkles,
  Layers,
  Flame,
  Wind,
  Cpu,
  Clock,
  QrCode
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  settings?: {
    companyName?: string;
    logoUrl?: string;
    contactPhone?: string;
    contactEmail?: string;
    contactAddress?: string;
    primaryColor?: string;
    accentColor?: string;
  };
}

// 6 Core Industrial Machinery Categories
const machineryCategories = [
  {
    name: "Tutti Frutti Processing",
    slug: "tutti-frutti",
    icon: Sparkles,
    badge: "Turnkey Lines",
    desc: "Raw papaya cube cutters, boiling kettles, continuous syruping & drying plants."
  },
  {
    name: "Bakery Spiral Mixers",
    slug: "bakery",
    icon: Layers,
    badge: "25kg – 100kg",
    desc: "Heavy-duty commercial dual-speed spiral dough kneaders with zero vibration."
  },
  {
    name: "Vibro Sifters & Screeners",
    slug: "vibro-sifter",
    icon: Wind,
    badge: "SS-304/316",
    desc: "Sanitary circular vibratory sieves for spice, flour, sugar & chemical grading."
  },
  {
    name: "Namkeen & Snack Plants",
    slug: "namkeen",
    icon: Flame,
    badge: "Continuous",
    desc: "Automated sev/bhujia extruders, batch & continuous farsan fryers, seasoning drums."
  },
  {
    name: "Commercial Dough Mixers",
    slug: "dough-mixers",
    icon: Cpu,
    badge: "Heavy Duty",
    desc: "High-torque industrial planetary & slow-speed dough kneaders for bakery batches."
  },
  {
    name: "Industrial Bakery Equipment",
    slug: "industrial-bakery-equipment",
    icon: Building2,
    badge: "Plant Scale",
    desc: "Bread slicers, cookie droppers, rotary rack ovens & custom baking conveyors."
  }
];

export default function Navbar({ settings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMachineryOpen, setMobileMachineryOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const companyName = settings?.companyName || "K.M. Engineering Works";
  const contactPhone = settings?.contactPhone || "+91 98216 69131";
  const contactEmail = settings?.contactEmail || "kmengineering1973@gmail.com";
  const contactAddress = settings?.contactAddress || "Workshop No. 58, Azmi Compound, Sakinaka, Mumbai – 400072";

  // Scroll detection for sticky navbar elevation & compact state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Machinery", href: "/products", hasDropdown: true },
    { name: "Company Heritage", href: "/about" },
    { name: "Engineering Contact", href: "/contact" },
    { name: "Digital Profile", href: "/connect", badge: "vCard" },
  ];

  return (
    <>
      {/* 1. TOP INDUSTRIAL UTILITY STRIP (Desktop only) */}
      <div className="hidden lg:block bg-[#0F172A] text-slate-300 text-xs border-b border-slate-800 tracking-tight select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-6 text-[11px] font-medium">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <strong className="text-white font-semibold">Mumbai Workshop Active:</strong> Sakinaka, Andheri East
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              ISO 9001:2015 &amp; GST Registered Fabricator
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3 text-slate-400" /> Mon – Sat: 09:00 – 19:00 IST
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href={`mailto:${contactEmail}`}
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <Mail className="w-3 h-3 text-slate-400" />
              <span>{contactEmail}</span>
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-mono font-medium">Direct Mumbai Factory Delivery</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER / NAVBAR */}
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled 
            ? "bg-white/98 shadow-sm border-b border-slate-200/90 backdrop-blur-md py-0" 
            : "bg-white border-b border-slate-200/80 py-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-200 ${isScrolled ? "h-16" : "h-20"}`}>
            
            {/* BRANDING & IDENTITY (LEFT AREA) */}
            <Link 
              href="/" 
              className="flex items-center shrink-0 group focus:outline-hidden py-1"
              aria-label={`${companyName} - Home`}
            >
              <div className="relative h-11 sm:h-13 w-auto flex items-center">
                <Image
                  src="/logo-full.png"
                  alt="K.M. Engineering Works - Industrial Machinery Specialist"
                  width={280}
                  height={68}
                  unoptimized
                  priority
                  className="h-11 sm:h-13 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.01]"
                />
              </div>
            </Link>

            {/* NAVIGATION LINKS (CENTER AREA - Desktop > 1024px) */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {navLinks.map((item) => {
                const isActive = item.href === "/" 
                  ? pathname === "/" 
                  : pathname.startsWith(item.href);

                // Machinery item with Dropdown / Mega Menu
                if (item.hasDropdown) {
                  return (
                    <div 
                      key={item.name} 
                      ref={dropdownRef} 
                      className="relative"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        aria-expanded={dropdownOpen}
                        aria-haspopup="true"
                        className={`relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-md transition-colors ${
                          isActive || dropdownOpen
                            ? "text-[#162A45] bg-slate-100/70"
                            : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown 
                          className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                            dropdownOpen ? "rotate-180 text-[#162A45]" : ""
                          }`} 
                        />
                        {/* Architectural active underline indicator */}
                        {isActive && (
                          <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#162A45] rounded-full" />
                        )}
                      </button>

                      {/* Mega Dropdown Panel */}
                      {dropdownOpen && (
                        <div 
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[680px] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                        >
                          <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden ring-1 ring-slate-900/5">
                            
                            {/* Dropdown Header Banner */}
                            <div className="bg-slate-50/80 px-6 py-3 border-b border-slate-200/80 flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-sm bg-[#162A45]" />
                                Industrial Food Processing Machinery Catalog
                              </div>
                              <span className="text-[11px] font-mono font-semibold text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded">
                                SS-304 / SS-316 Certified
                              </span>
                            </div>

                            {/* 6 Category Grid */}
                            <div className="grid grid-cols-2 gap-1 p-3 bg-white">
                              {machineryCategories.map((cat) => {
                                const Icon = cat.icon;
                                return (
                                  <Link
                                    key={cat.slug}
                                    href={`/products?category=${cat.slug}`}
                                    onClick={() => setDropdownOpen(false)}
                                    className="group p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200/80 transition-all text-left flex items-start gap-3"
                                  >
                                    <div className="w-8 h-8 rounded-md bg-slate-100 group-hover:bg-[#162A45] text-[#162A45] group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                                      <Icon className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center justify-between gap-1">
                                        <span className="text-xs font-bold text-slate-900 group-hover:text-[#162A45] transition-colors leading-tight">
                                          {cat.name}
                                        </span>
                                        <span className="text-[10px] font-mono text-slate-500 bg-slate-100 group-hover:bg-slate-200/70 px-1.5 py-0.2 rounded shrink-0">
                                          {cat.badge}
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                                        {cat.desc}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>

                            {/* Dropdown Footer Strip */}
                            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                              <span className="text-slate-500">
                                Need custom fabrication or turnkey installation?
                              </span>
                              <Link 
                                href="/products"
                                onClick={() => setDropdownOpen(false)}
                                className="font-bold text-[#162A45] hover:text-[#0F1D30] inline-flex items-center gap-1.5 transition-colors group"
                              >
                                <span>Browse Complete 50+ Machine Catalog</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </Link>
                            </div>

                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Standard Nav Links
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-3.5 py-2 text-sm font-semibold rounded-md transition-colors ${
                      isActive
                        ? "text-[#162A45] bg-slate-100/70"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-1.5 text-[9px] font-mono font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                    {/* Architectural active underline indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#162A45] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CALL TO ACTION & CONTACT (RIGHT AREA - Desktop) */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              {/* Engineering Phone Desk */}
              <a 
                href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2.5 text-left py-1 px-2 rounded-md hover:bg-slate-50 transition-colors group"
                aria-label={`Call Engineering Team at ${contactPhone}`}
              >
                <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 leading-none">
                    Engineering Desk
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900 group-hover:text-[#162A45] transition-colors leading-normal block">
                    {contactPhone}
                  </span>
                </div>
              </a>

              {/* Primary RFQ Button */}
              <Button
                asChild
                className="bg-[#162A45] hover:bg-[#0F1D30] text-white font-bold text-xs h-10 px-5 rounded-lg shadow-2xs transition-all duration-150 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#162A45] tracking-wide"
              >
                <Link href="/contact">
                  <span>Request a Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 stroke-[2.5]" />
                </Link>
              </Button>
            </div>

            {/* MOBILE & TABLET RIGHT ACTIONS (< 1024px) */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Quick Call Icon Button */}
              <a
                href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                className="h-10 w-10 rounded-lg border border-slate-200 text-slate-700 hover:text-emerald-700 hover:bg-slate-50 flex items-center justify-center transition-colors shrink-0"
                aria-label={`Call Factory Desk ${contactPhone}`}
              >
                <Phone className="h-4 w-4" />
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="h-10 w-10 rounded-lg border border-slate-200 text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0"
                aria-label="Open Navigation Menu"
                aria-expanded={isOpen}
              >
                <Menu className="h-5 w-5 stroke-[2.2]" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 3. MOBILE OFF-CANVAS SLIDE-OVER DRAWER (< 1024px) */}
      {/* Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-[88vw] sm:w-[400px] max-w-full bg-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-8 w-auto flex items-center">
              <Image
                src="/logo-full.png"
                alt={companyName}
                width={170}
                height={42}
                unoptimized
                priority
                className="h-8 w-auto object-contain"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200/80 flex items-center justify-center transition-colors shrink-0"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* Main Links */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 mb-1">
              Industrial Directory
            </div>

            {/* Home Link */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between p-3 rounded-lg text-sm font-semibold transition-colors ${
                pathname === "/" 
                  ? "bg-[#162A45] text-white" 
                  : "text-slate-800 hover:bg-slate-100"
              }`}
            >
              <span>Home</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>

            {/* Machinery Accordion */}
            <div className="rounded-lg border border-slate-200 overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setMobileMachineryOpen(!mobileMachineryOpen)}
                className={`w-full flex items-center justify-between p-3 text-sm font-semibold text-left transition-colors ${
                  pathname.startsWith("/products")
                    ? "text-[#162A45] bg-slate-50"
                    : "text-slate-800 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>Machinery Catalog</span>
                  <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                    50+ Models
                  </span>
                </div>
                <ChevronDown 
                  className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                    mobileMachineryOpen ? "rotate-180 text-[#162A45]" : ""
                  }`} 
                />
              </button>

              {mobileMachineryOpen && (
                <div className="bg-slate-50/70 p-2 space-y-1 border-t border-slate-200">
                  {machineryCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.slug}
                        href={`/products?category=${cat.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-md hover:bg-white text-slate-700 hover:text-[#162A45] text-xs font-medium transition-colors border border-transparent hover:border-slate-200"
                      >
                        <Icon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{cat.name}</span>
                      </Link>
                    );
                  })}
                  <Link
                    href="/products"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-2 rounded-md bg-[#162A45]/5 hover:bg-[#162A45]/10 text-[#162A45] text-xs font-bold transition-colors mt-1"
                  >
                    <span>Browse All Machinery</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Company Heritage */}
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between p-3 rounded-lg text-sm font-semibold transition-colors ${
                pathname === "/about" 
                  ? "bg-[#162A45] text-white" 
                  : "text-slate-800 hover:bg-slate-100"
              }`}
            >
              <span>Company Heritage</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>

            {/* Engineering Contact */}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between p-3 rounded-lg text-sm font-semibold transition-colors ${
                pathname === "/contact" 
                  ? "bg-[#162A45] text-white" 
                  : "text-slate-800 hover:bg-slate-100"
              }`}
            >
              <span>Engineering Contact &amp; RFQ</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>

            {/* Digital Business Profile */}
            <Link
              href="/connect"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between p-3 rounded-lg text-sm font-semibold transition-colors ${
                pathname === "/connect" 
                  ? "bg-[#162A45] text-white" 
                  : "text-slate-800 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-slate-500" />
                <span>Digital Business Profile</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                vCard
              </span>
            </Link>
          </div>

          {/* Workshop Contact Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <span>Direct Factory Desk</span>
              <span className="text-amber-800 font-semibold font-mono">Mumbai Works</span>
            </div>

            <a
              href={`tel:${contactPhone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2.5 text-xs text-slate-900 font-bold hover:text-[#162A45] transition-colors"
            >
              <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono">{contactPhone}</span>
            </a>

            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 transition-colors"
            >
              <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">{contactEmail}</span>
            </a>

            <div className="flex items-start gap-2.5 text-[11px] text-slate-500 pt-1 border-t border-slate-200/80">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>{contactAddress}</span>
            </div>
          </div>

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-2 shrink-0">
          <Button
            asChild
            className="w-full bg-[#162A45] hover:bg-[#0F1D30] text-white font-bold h-11 rounded-lg shadow-xs flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
          >
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <span>Request Factory Quotation</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </Button>

          <a
            href={`https://wa.me/${contactPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello K.M. Engineering Works, I would like to inquire about industrial machinery specifications.")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full bg-[#15803D] hover:bg-[#166534] text-white font-bold h-10 rounded-lg flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-colors shadow-2xs"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>WhatsApp Engineering</span>
          </a>
        </div>

      </div>
    </>
  );
}