"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  User, 
  Copy, 
  Check, 
  Send, 
  MessageCircle, 
  Navigation, 
  Building2, 
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import InquiryForm from "@/components/shared/InquiryForm";
import { Button } from "@/components/ui/button";

function ContactContent() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product") || "";

  const [settings, setSettings] = useState<{
    companyName?: string;
    founderName?: string;
    contactAddress?: string;
    contactPhone?: string;
    contactEmail?: string;
    businessHours?: string;
  } | null>(null);

  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setSettings(data);
      })
      .catch(() => {});
  }, []);

  const companyName = settings?.companyName || "K.M. Engineering Works";
  const founderName = settings?.founderName || "Abdulkaleem Abdulkadar Sayyed";
  const address = settings?.contactAddress || "Gala No.58, Azmi Compound, Near Kwality Bakery, Mumbai - 400072, Maharashtra, India";
  const phone = settings?.contactPhone || "+91 98765 43210";
  const email = settings?.contactEmail || "info@kmengineering.com";
  const hours = settings?.businessHours || "Monday - Saturday: 9:00 AM - 7:00 PM";

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const cleanPhone = phone.replace(/\s+/g, "");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${companyName} ${address}`)}`;
  const whatsappUrl = `https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(
    `Hello ${companyName}, I would like to inquire about your machinery.`
  )}`;

  return (
    <div className="bg-slate-50/60 min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs sm:text-sm font-semibold">
            <Building2 className="w-3.5 h-3.5" /> Direct Manufacturer Support
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 tracking-tight">
            Let's Build Your <span className="text-brand-primary">Factory Solution</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
            Have questions about custom specifications or urgent quotations? Reach out to our technical engineering team directly.
          </p>
        </div>

        {/* Quick Action Floating Bar for Mobile/Tablet */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8 lg:hidden">
          <a
            href={`tel:${cleanPhone}`}
            className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs text-slate-800 font-semibold text-xs text-center active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Call Now</span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 p-3 rounded-xl bg-emerald-500 text-white font-semibold text-xs text-center active:scale-95 transition-transform shadow-xs"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>WhatsApp</span>
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs text-slate-800 font-semibold text-xs text-center active:scale-95 transition-transform"
          >
            <Navigation className="w-4 h-4 text-brand-primary shrink-0" />
            <span>Directions</span>
          </a>
        </div>

        {/* Main 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start mb-16">
          
          {/* Left Column: Interactive Contact Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
            
            {/* Header Banner */}
            <div className="bg-slate-900 text-white p-5 sm:p-7 relative overflow-hidden">
              <div className="relative z-10 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold font-display text-white">{companyName}</h3>
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
                <p className="text-slate-300 text-xs sm:text-sm font-medium">
                  Precision Food Processing &amp; Bakery Machinery
                </p>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-brand-primary/20 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Contact Details List */}
            <div className="p-5 sm:p-7 space-y-6">
              
              {/* Founder */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Founder & MD</p>
                  <p className="text-sm sm:text-base font-bold text-slate-800 mt-0.5">{founderName}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Factory Location</p>
                    <button
                      onClick={() => handleCopy(address, "address")}
                      className="text-xs text-slate-400 hover:text-brand-primary flex items-center gap-1 transition-colors"
                      title="Copy Address"
                    >
                      {copiedField === "address" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Direct Hotline</p>
                    <button
                      onClick={() => handleCopy(phone, "phone")}
                      className="text-xs text-slate-400 hover:text-brand-primary flex items-center gap-1 transition-colors"
                      title="Copy Phone"
                    >
                      {copiedField === "phone" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <a href={`tel:${cleanPhone}`} className="text-sm sm:text-base font-bold text-slate-900 hover:text-brand-primary transition-colors block">
                    {phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Inquiry</p>
                    <button
                      onClick={() => handleCopy(email, "email")}
                      className="text-xs text-slate-400 hover:text-brand-primary flex items-center gap-1 transition-colors"
                      title="Copy Email"
                    >
                      {copiedField === "email" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <a href={`mailto:${email}`} className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand-primary transition-colors truncate block">
                    {email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Operating Hours</p>
                  <p className="text-xs sm:text-sm font-medium text-slate-700 mt-0.5">{hours}</p>
                </div>
              </div>

            </div>

            {/* Desktop Action Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 hidden lg:flex items-center justify-between gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs text-center flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" /> Quick WhatsApp
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs text-center flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
              >
                <Navigation className="w-4 h-4 text-brand-primary" /> Open Maps
              </a>
            </div>

          </div>

          {/* Right Column: Inquiry Form Wrapper */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xs border border-slate-200/80 space-y-6">
            
            <div className="space-y-1.5 border-b border-slate-100 pb-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-2xl font-bold font-display text-slate-900">Send Machinery Request</h3>
                <span className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Replies within 24 Hrs
                </span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm">
                Fill out your details below and our sales engineering team will prepare a formal proposal.
              </p>

              {/* Product Context Badge */}
              {productParam && (
                <div className="mt-3 p-3 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-between gap-2">
                  <span className="text-xs text-brand-primary font-medium">Inquiring about product:</span>
                  <span className="text-xs font-bold text-brand-primary capitalize bg-white px-2.5 py-0.5 rounded-md shadow-2xs">
                    {productParam}
                  </span>
                </div>
              )}
            </div>

            {/* Embedded Form */}
            <InquiryForm 
              productName={productParam || undefined} 
              productId={productParam || undefined} 
            />

          </div>

        </div>

        {/* Full-width Map Container with Header & CTA Overlay */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-bold text-slate-900 text-base sm:text-lg">Visit Our Manufacturing Facility</h4>
              <p className="text-xs text-slate-500">Azmi Compound, Sakinaka, Mumbai, Maharashtra</p>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-xl border-slate-200 text-xs font-semibold gap-2"
            >
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="w-3.5 h-3.5 text-brand-primary" /> Open in Google Maps ↗
              </a>
            </Button>
          </div>

          <div className="w-full h-[320px] sm:h-[400px] lg:h-[460px] bg-slate-100 relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0!2d72.9!3d19.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA2JzAwLjAiTiA3MsKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="K.M. Engineering Works Factory Location"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-12 text-slate-400 gap-3">
        <div className="h-8 w-8 border-3 border-brand-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-medium text-slate-500">Loading contact details...</p>
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}