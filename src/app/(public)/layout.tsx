"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  Home, 
  Package, 
  PhoneCall, 
  ChevronRight, 
  Mail, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  companyName?: string;
  logoUrl?: string;
}

export default function Navbar({
  companyName = "K.M. Engineering Works",
  logoUrl,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products & Machines", href: "/products", icon: Package, badge: "Catalog" },
    { name: "About Us", href: "/about", icon: Building2 },
    { name: "Contact Us",href: "/contact", icon: PhoneCall },
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
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-brand-primary text-white flex items-center justify-center font-bold font-display text-lg shadow-sm shadow-brand-primary/20">
                KM
              </div>
            )}
            <div>
              <h1 className="font-bold text-slate-900 leading-tight text-sm sm:text-base lg:text-lg tracking-tight">
                {companyName}
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium">
                Industrial Machinery Specialist
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Menu (Visible >1024px) */}
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
                      ? "bg-brand-primary/10 text-brand-primary"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA Section */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a 
              href="tel:+919876543210" 
              className="text-xs font-semibold text-slate-600 hover:text-brand-primary flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" /> +91 98765 43210
            </a>
            <Button
              asChild
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm px-5 h-10 rounded-xl shadow-xs transition-all active:scale-95"
            >
              <Link href="/contact">
                Get Best Quote <ArrowRight className="w-4 h-4 ml-1 stroke-[2.5]" />
              </Link>
            </Button>
          </div>

          {/* Mobile & Tablet Hamburger Trigger (<1024px) */}
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

      {/* Backdrop Overlay for Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200 lg:hidden"
        />
      )}

      {/* Mobile & Tablet Navigation Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[88vw] sm:w-[380px] max-w-full bg-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5 min-w-0">
            {logoUrl ? (
              <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-slate-200 shrink-0">
                <Image src={logoUrl} alt={companyName} fill className="object-cover" />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-4 w-4 stroke-[2.5]" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <span className="font-bold text-slate-900 text-sm block truncate">{companyName}</span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> ISO Certified
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 shrink-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
            Navigation Menu
          </p>

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
                className={`group flex items-center justify-between p-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-brand-primary/10 text-brand-primary font-semibold"
                    : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-brand-primary text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-800"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span>{item.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isActive
                        ? "text-brand-primary translate-x-0.5"
                        : "text-slate-300 group-hover:text-slate-500"
                    }`}
                  />
                </div>
              </Link>
            );
          })}

          {/* Contact Box in Mobile Menu */}
          <div className="mt-6 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Direct Assistance
            </span>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-brand-primary font-medium"
            >
              <PhoneCall className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>+91 98765 43210</span>
            </a>
            <a
              href="mailto:info@kmengineering.com"
              className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-brand-primary font-medium"
            >
              <Mail className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <span className="truncate">info@kmengineering.com</span>
            </a>
          </div>
        </div>

        {/* Drawer Sticky Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 space-y-2.5 shrink-0">
          <Button
            asChild
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold h-11 rounded-xl shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Get Best Quote <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
          </Button>

          <p className="text-[11px] text-center text-slate-400 font-medium flex items-center justify-center gap-1">
            <MapPin className="h-3 w-3" /> Mumbai, Maharashtra, India
          </p>
        </div>
      </aside>
    </>
  );
}