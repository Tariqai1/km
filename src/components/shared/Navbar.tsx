"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar({ companyName = "K.M. Engineering Works", logoUrl = "" }: { companyName?: string, logoUrl?: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {logoUrl && (
            <img src={logoUrl} alt={companyName} className="h-10 w-auto object-contain" />
          )}
          <span className={cn(
            "font-bold text-brand-primary font-display",
            logoUrl ? "text-lg md:text-xl hidden sm:block" : "text-xl md:text-2xl"
          )}>
            {companyName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-brand-dark hover:text-brand-accent transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="bg-brand-accent hover:bg-brand-accent-hover text-white">
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-brand-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white">
              <SheetTitle className="text-brand-primary font-display mb-6">Navigation</SheetTitle>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg text-brand-dark font-medium border-b pb-2"
                  >
                    {link.name}
                  </Link>
                ))}
                <Button asChild className="bg-brand-accent hover:bg-brand-accent-hover text-white mt-4 w-full">
                  <Link href="/contact">Get a Quote</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
