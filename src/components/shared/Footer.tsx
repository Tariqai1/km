import Link from "next/link";
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
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-display font-bold text-white mb-4">
              {companyName}
            </h3>
            <p className="text-brand-steel mb-6">
              {parsedSettings?.heroSubheading || "Precision-Engineered Food Processing & Bakery Machinery. Trusted manufacturer based in Mumbai."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
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
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-brand-steel hover:text-brand-accent transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products?category=food-processing" className="text-brand-steel hover:text-brand-accent transition-colors">
                  Food Processing
                </Link>
              </li>
              <li>
                <Link href="/products?category=bakery" className="text-brand-steel hover:text-brand-accent transition-colors">
                  Bakery Machinery
                </Link>
              </li>
              <li>
                <Link href="/products?category=mixers" className="text-brand-steel hover:text-brand-accent transition-colors">
                  Industrial Mixers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-brand-steel">
                <MapPin className="w-5 h-5 text-brand-accent shrink-0 mt-1" />
                <span className="whitespace-pre-line">{address}</span>
              </li>
              <li className="flex items-center gap-3 text-brand-steel">
                <Phone className="w-5 h-5 text-brand-accent shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{phone}</a>
              </li>
              <li className="flex items-center gap-3 text-brand-steel">
                <Mail className="w-5 h-5 text-brand-accent shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-steel/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-steel text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <p className="text-brand-steel text-sm">
            Designed with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
