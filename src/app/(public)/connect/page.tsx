"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  PhoneCall, 
  UserPlus, 
  Globe, 
  FileText, 
  Package, 
  MapPin, 
  Share2, 
  Check, 
  ShieldCheck, 
  Factory, 
  Award,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Mail,
  Copy,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DigitalBusinessProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCallModal, setShowCallModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Log page scan / view
    fetch("/api/analytics/track-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qrSlug: "connect", eventType: "scan" })
    }).catch(() => {});

    // Fetch live company profile & toggle settings
    fetch("/api/company-profile")
      .then(res => res.json())
      .then(data => {
        if (data.profile) setProfile(data.profile);
      })
      .catch(err => console.error("Error loading profile:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const trackAction = (eventType: string) => {
    fetch("/api/analytics/track-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qrSlug: "connect", eventType })
    }).catch(() => {});
  };

  const handleShare = async () => {
    trackAction("share");
    const shareData = {
      title: "K.M. Engineering Works - Digital Profile",
      text: "K.M. Engineering Works | Manufacturer of Food Machines & Equipments (Tutti Frutti, Bakery, Chips, Namkeen Plants)",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Share cancelled or unsupported
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Verified Fallback Profile Data
  const companyName = profile?.companyName || "K.M. Engineering Works";
  const tagline = profile?.tagline || "Manufacturer of Food Machines & Equipments";
  const contactPerson = profile?.contactPerson || "Abdul Kaleem Sayyed";
  const designation = profile?.designation || "Founder & Managing Director";
  const primaryPhone = profile?.phones?.[0]?.number || "+91-9821669131";
  const secondaryPhone = profile?.phones?.[1]?.number || "+91-8828489550";
  const whatsappNum = profile?.whatsappNumber || "+919821669131";
  const defaultMsg = profile?.defaultWhatsappMessage || "Hello K.M. Engineering Works, I would like to know more about your food processing machinery and plants.";
  const email = profile?.email || "kmengineering1973@gmail.com";
  const website = profile?.website || "https://www.kmengineeringworks.com";
  const address = profile?.address || "Workshop No. 58, Near Kwality Bakery, Azmi Compound, Khairani Road, Sakinaka, Mumbai – 400072, India";
  const mapsUrl = profile?.googleMapsUrl || "https://maps.google.com/?q=Workshop+No.+58,+Near+Kwality+Bakery,+Azmi+Compound,+Khairani+Road,+Sakinaka,+Mumbai+400072";

  // Feature Toggles (Default: True)
  const showWhatsapp = profile?.showWhatsapp !== false;
  const showCall = profile?.showCall !== false;
  const showEmail = profile?.showEmail !== false;
  const showSaveContact = profile?.showSaveContact !== false;
  const showWebsite = profile?.showWebsite !== false;
  const showCompanyProfile = profile?.showCompanyProfile !== false;
  const showCatalogue = profile?.showCatalogue !== false;
  const showDirections = profile?.showDirections !== false;
  const showShareProfile = profile?.showShareProfile !== false;
  const showAgmBanner = profile?.showAgmBanner !== false;

  const plantsList = [
    { name: "Tutti Frutti Plant", desc: "Automatic dicing, boiling & syrup line" },
    { name: "Commercial Bakery Plant", desc: "Spiral mixers, planetary & rotary ovens" },
    { name: "Potato Chips Plant", desc: "Automatic slicing, de-watering & fryers" },
    { name: "Namkeen & Farsan Plant", desc: "Continuous fryers & multi-die extruders" },
    { name: "Sweets Processing Plant", desc: "Mawa machines, kneaders & ball formers" },
    { name: "Vibro Sifters & Screeners", desc: "Sanitary circular grading screeners" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center py-4 sm:py-8 px-3 sm:px-4 font-sans selection:bg-brand-accent selection:text-white">
      
      {/* Mobile Card Frame (Max-w-md for optimal mobile-first layout) */}
      <div className="w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden flex flex-col justify-between">
        
        <div>
          {/* Top Industrial Header Banner */}
          <div className="relative bg-gradient-to-br from-[#061426] via-[#0F2440] to-[#1B365D] pt-8 pb-10 px-6 text-center border-b border-brand-accent/30 overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Quick Share Top-Right Button */}
            {showShareProfile && (
              <button
                onClick={handleShare}
                type="button"
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/90 backdrop-blur-md transition-all active:scale-95"
                title="Share Profile"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}

            {/* Official KME Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-24 h-24 mx-auto bg-white rounded-2xl p-2.5 shadow-xl shadow-blue-900/40 border-2 border-white/20 mb-4 flex items-center justify-center"
            >
              <Image
                src="/logo.png"
                alt="K.M. Engineering Works Logo"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Company Title & Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5" /> ISO & GST Registered Manufacturer
            </div>

            <h1 className="text-2xl font-black font-display tracking-tight text-white uppercase">
              {companyName}
            </h1>

            <p className="text-xs font-semibold text-brand-accent tracking-wide uppercase mt-1">
              {tagline}
            </p>

            {/* Founder Tag */}
            <div className="mt-3 text-xs text-slate-300 font-medium">
              <span className="text-white font-bold">{contactPerson}</span>
              <span className="text-slate-400"> ({designation})</span>
            </div>

          </div>

          {/* AGM Goa 2026 Event Highlight Card (Toggleable) */}
          {showAgmBanner && (
            <div className="mx-4 -mt-4 relative z-10 bg-gradient-to-r from-amber-500/20 via-brand-accent/20 to-amber-500/20 border border-amber-500/40 backdrop-blur-md rounded-2xl p-3.5 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-md">
                      Official Sponsor
                    </span>
                    <span className="text-[10px] font-bold text-slate-300">26 Sept 2026 • Goa</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mt-1 leading-snug">
                    1st AGM • All India Tutti Frutti & Karonda Manufacturers Association
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Visit our exclusive stall to see live Tutti Frutti plant machinery & technology.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PRIMARY ACTION BUTTONS GRID */}
          <div className="p-4 space-y-3">
            
            {/* 1. WHATSAPP US (High-Visibility Primary CTA) */}
            {showWhatsapp && (
              <a
                href={`https://wa.me/${whatsappNum.replace(/\D/g, "")}?text=${encodeURIComponent(defaultMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAction("whatsapp")}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold shadow-lg shadow-emerald-900/30 transition-all active:scale-[0.98] group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-base font-extrabold leading-tight">WhatsApp Us Directly</div>
                    <div className="text-xs text-emerald-100 font-normal mt-0.5">Instant machine quote & specs</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
              </a>
            )}

            {/* 2. CALL NOW & SAVE CONTACT (Dual Grid) */}
            <div className="grid grid-cols-2 gap-2.5">
              
              {/* Call Now */}
              {showCall && (
                <button
                  type="button"
                  onClick={() => {
                    trackAction("call");
                    setShowCallModal(true);
                  }}
                  className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md transition-all active:scale-[0.98]"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-extrabold leading-none">Call Now</div>
                    <div className="text-[10px] text-blue-200 font-normal mt-1">2 Lines Available</div>
                  </div>
                </button>
              )}

              {/* Save Contact (.vcf) */}
              {showSaveContact && (
                <a
                  href="/connect/vcard"
                  download="KM-Engineering-Works.vcf"
                  onClick={() => trackAction("vcard")}
                  className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-700/80 shadow-md transition-all active:scale-[0.98]"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/20 text-brand-accent flex items-center justify-center shrink-0">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-extrabold leading-none">Save Contact</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-1">1-Tap to Phonebook</div>
                  </div>
                </a>
              )}

            </div>

            {/* 3. VISIT WEBSITE & PRODUCT CATALOGUE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              {showWebsite && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAction("website")}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-700/60 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold">Official Website</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}

              {showCatalogue && (
                <Link
                  href="/products"
                  onClick={() => trackAction("catalogue")}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-700/60 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold">Product Catalogue</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              )}

            </div>

            {/* 4. COMPANY PROFILE PDF (Download/View) */}
            {showCompanyProfile && (
              <a
                href={profile?.companyProfilePdfUrl || "/about"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAction("profile_pdf")}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-white border border-slate-700/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-brand-accent" />
                  <div className="text-left">
                    <div className="text-xs font-bold">Company Profile & Brochure</div>
                    <div className="text-[10px] text-slate-400">View factory infrastructure & credentials</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded">PDF</span>
              </a>
            )}

            {/* 5. EMAIL DIRECT */}
            {showEmail && (
              <a
                href={`mailto:${email}?subject=Machinery%20Inquiry%20from%20Digital%20Profile`}
                onClick={() => trackAction("email")}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 text-slate-300 border border-slate-800 text-xs transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{email}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </a>
            )}

            {/* 6. GET DIRECTIONS / GOOGLE MAPS */}
            {showDirections && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAction("direction")}
                className="w-full flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-left hover:border-slate-700 transition-all"
              >
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>Factory Works & Location</span>
                    <span className="text-[10px] text-blue-400 font-semibold flex items-center gap-0.5">
                      Get Directions <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                    {address}
                  </div>
                </div>
              </a>
            )}

            {/* 7. MACHINERY PLANTS SHOWCASE CHIPS */}
            <div className="pt-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Factory className="w-3 h-3 text-brand-accent" /> Key Manufacturing Plants
              </div>
              <div className="grid grid-cols-2 gap-2">
                {plantsList.map((plant, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-left">
                    <div className="text-xs font-bold text-slate-200">{plant.name}</div>
                    <div className="text-[9.5px] text-slate-400 mt-0.5">{plant.desc}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center border-t border-slate-800/80 bg-slate-950/80">
          <div className="text-[11px] text-slate-400">
            &copy; {new Date().getFullYear()} <strong>K.M. Engineering Works</strong>
          </div>
          <div className="text-[9.5px] text-slate-500 mt-0.5">
            Precision Food Machinery Manufacturer • Mumbai, India
          </div>
        </div>

      </div>

      {/* Call Options Modal (Primary vs Secondary Phone) */}
      <AnimatePresence>
        {showCallModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-sm text-white space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-blue-400" /> Select Direct Line
                </h3>
                <button
                  onClick={() => setShowCallModal(false)}
                  className="text-slate-400 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2.5">
                <a
                  href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all"
                >
                  <div>
                    <div className="text-xs text-blue-200 uppercase font-bold">Primary Sales & Tech</div>
                    <div className="text-sm font-bold mt-0.5">{primaryPhone}</div>
                  </div>
                  <PhoneCall className="w-4 h-4" />
                </a>

                {secondaryPhone && (
                  <a
                    href={`tel:${secondaryPhone.replace(/\s+/g, "")}`}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 transition-all"
                  >
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-bold">Works & Dispatch</div>
                      <div className="text-sm font-bold mt-0.5">{secondaryPhone}</div>
                    </div>
                    <PhoneCall className="w-4 h-4 text-slate-400" />
                  </a>
                )}
              </div>

              <Button
                variant="outline"
                onClick={() => setShowCallModal(false)}
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Copy link confirmation toast */}
      {copied && (
        <div className="fixed bottom-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <Check className="w-4 h-4" /> Profile Link Copied to Clipboard!
        </div>
      )}

    </div>
  );
}
