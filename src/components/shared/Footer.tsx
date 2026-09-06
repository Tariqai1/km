import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer({ companyName = "K.M. Engineering Works", settings = "{}" }: { companyName?: string, settings?: string }) {
  let parsedSettings: any = {};
  try {
    parsedSettings = JSON.parse(settings);
  } catch (e) {}

  const email = parsedSettings?.contactEmail || "info@kmengineering.com";
  const phone = parsedSettings?.contactPhone || "+91 98765 43210";
  const address = parsedSettings?.contactAddress || "Gala No.58, Azmi Compound, Near Kwality Bakery, Mumbai - 400072, Maharashtra, India";

  return (
    <footer className="bg-brand-dark text-white pt-12 sm:pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <div className="bg-white p-2 rounded-xl inline-block shadow-sm">
                <Image
                  src="/logo-full.png"
                  alt="K.M. Engineering Works"
                  width={200}
                  height={50}
                  unoptimized
                  className="h-9 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-brand-steel text-xs sm:text-sm leading-relaxed mb-4">
              {parsedSettings?.heroSubheading || "Precision-Engineered Food Processing & Bakery Machinery. Trusted manufacturer based in Mumbai."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="text-brand-steel hover:text-brand-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-brand-steel hover:text-brand-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-brand-steel hover:text-brand-accent transition-colors">
                  Products & Machinery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-brand-steel hover:text-brand-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/connect" className="text-brand-steel hover:text-brand-accent transition-colors">
                  Digital Business Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white mb-3">Categories</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/products?category=tutti-frutti" className="text-brand-steel hover:text-brand-accent transition-colors">
                  Tutti Frutti Plants
                </Link>
              </li>
              <li>
                <Link href="/products?category=bakery" className="text-brand-steel hover:text-brand-accent transition-colors">
                  Bakery Machinery
                </Link>
              </li>
              <li>
                <Link href="/products?category=chips" className="text-brand-steel hover:text-brand-accent transition-colors">
                  Potato Chips Lines
                </Link>
              </li>
              <li>
                <Link href="/products?category=vibro-sifter" className="text-brand-steel hover:text-brand-accent transition-colors">
                  Vibro Sifters
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white mb-3">Contact Us</h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5 text-brand-steel">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                <span className="whitespace-pre-line leading-snug">{address}</span>
              </li>
              <li className="flex items-center gap-2.5 text-brand-steel">
                <Phone className="w-4 h-4 text-brand-accent shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{phone}</a>
              </li>
              <li className="flex items-center gap-2.5 text-brand-steel">
                <Mail className="w-4 h-4 text-brand-accent shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-brand-steel">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <p>
            Precision Food Machinery Manufacturer Mumbai
          </p>
        </div>
      </div>
    </footer>
  );
}
