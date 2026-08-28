"use client";

import Link from "next/link";
import { 
  FileText, 
  Download, 
  Printer, 
  Sparkles, 
  Image as ImageIcon, 
  QrCode, 
  ExternalLink, 
  Award, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  Factory
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MarketingAssetsHub() {
  const brandAssets = [
    {
      title: "Master Vector Logo (SVG)",
      desc: "Mathematical CAD-precision 3-gears K-M-E logo with clean transparent background. Infinite scalability.",
      fileUrl: "/logo.svg",
      fileName: "KM-Engineering-Logo-Master.svg",
      type: "Vector SVG",
      badge: "Master Asset",
      preview: "/logo.svg"
    },
    {
      title: "Full Corporate Brand Lockup (SVG)",
      desc: "3-Gears Icon + Official K.M. Engineering Works Wordmark + Specialization Subtitle.",
      fileUrl: "/logo-full.svg",
      fileName: "KM-Engineering-Full-Lockup.svg",
      type: "Vector SVG",
      badge: "Header & Signboard",
      preview: "/logo-full.svg"
    },
    {
      title: "Laser Engraving Monotone (SVG)",
      desc: "Single-color black vector for stainless steel SS-304 laser marking and cast machine nameplates.",
      fileUrl: "/logo-monotone.svg",
      fileName: "KM-Engineering-Laser-Engraving-Monotone.svg",
      type: "Single-Color SVG",
      badge: "Machine Nameplates",
      preview: "/logo-monotone.svg"
    },
    {
      title: "High-Res Transparent PNG (300 DPI)",
      desc: "High-resolution transparent raster graphic for visiting cards, digital leaflets, and presentations.",
      fileUrl: "/logo.png",
      fileName: "KM-Engineering-Logo-300DPI.png",
      type: "300 DPI PNG",
      badge: "Print & Web",
      preview: "/logo.png"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-brand-primary">
              Marketing Assets &amp; Print System
            </h1>
            <Badge className="bg-brand-accent text-white border-none font-bold text-xs">
              300 DPI Print Ready
            </Badge>
          </div>
          <p className="text-slate-500 text-sm mt-0.5">
            Official high-resolution brand assets, vector logos, and print-ready A4 / A5 marketing leaflet generators.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold shadow-md">
            <Link href="/admin/marketing-assets/a4-leaflet">
              <Printer className="w-4 h-4 mr-2" /> Open A4 Leaflet Generator
            </Link>
          </Button>
        </div>
      </div>

      {/* 1. PRINT-READY LEAFLET & FLYER SYSTEM */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-brand-accent" /> Print-Ready Leaflet &amp; Handout Generators
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* A4 Leaflet Card */}
          <Card className="border-2 border-brand-primary/30 hover:border-brand-primary transition-all shadow-xs flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-brand-primary text-white font-bold text-xs">210 × 297 mm</Badge>
                <span className="text-xs font-bold text-slate-400">Standard Leaflet</span>
              </div>
              <CardTitle className="text-xl font-bold mt-2">A4 Corporate Machinery Leaflet</CardTitle>
              <CardDescription>
                Full-page product catalogue sheet featuring dynamic QR code, official KME logo, all 6 turnkey food processing plants, and factory contact details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                <div>✓ <strong>Print Margins:</strong> 10mm Safe Print Margins included</div>
                <div>✓ <strong>Colors:</strong> CMYK / High-Contrast Industrial Blue &amp; White</div>
                <div>✓ <strong>QR Code:</strong> Points dynamically to <code>/qr/connect</code></div>
              </div>
              <Button asChild className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold">
                <Link href="/admin/marketing-assets/a4-leaflet">
                  <Printer className="w-4 h-4 mr-2" /> Open &amp; Print A4 Leaflet
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* A5 Leaflet Card */}
          <Card className="border-2 border-slate-200 hover:border-brand-accent transition-all shadow-xs flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-brand-accent text-white font-bold text-xs">148 × 210 mm</Badge>
                <span className="text-xs font-bold text-slate-400">Handout Flyer</span>
              </div>
              <CardTitle className="text-xl font-bold mt-2">A5 Compact Exhibition Flyer</CardTitle>
              <CardDescription>
                Compact half-page flyer ideal for fast distribution at food expos, trade fairs, client meetings, and packaging insertions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                <div>✓ <strong>Compact Size:</strong> Perfect for expo handovers &amp; courier packets</div>
                <div>✓ <strong>High-Impact QR:</strong> Large prominent QR for 1-scan connection</div>
                <div>✓ <strong>Fast Direct Lines:</strong> +91-9821669131 &amp; +91-8828489550</div>
              </div>
              <Button asChild variant="outline" className="w-full border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white font-bold">
                <Link href="/admin/marketing-assets/a5-leaflet">
                  <Printer className="w-4 h-4 mr-2" /> Open &amp; Print A5 Flyer
                </Link>
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* 2. OFFICIAL BRAND IDENTITY & LOGO ASSETS */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-primary" /> Official Brand Identity &amp; Logo Assets
          </h2>
          <span className="text-xs text-slate-500 font-medium">Mathematical CAD Precision</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandAssets.map((asset, idx) => (
            <Card key={idx} className="border border-slate-200 shadow-xs flex flex-col justify-between overflow-hidden">
              <div>
                {/* Preview Box */}
                <div className="h-36 bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-center">
                  <img src={asset.preview} alt={asset.title} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">
                      {asset.badge}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">{asset.type}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">{asset.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{asset.desc}</p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Button asChild variant="outline" size="sm" className="w-full border-slate-300 font-semibold text-xs hover:bg-slate-50">
                  <a href={asset.fileUrl} download={asset.fileName}>
                    <Download className="w-3.5 h-3.5 mr-1.5 text-brand-primary" /> Download Asset
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 3. AGM GOA 2026 CAMPAIGN ASSETS */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" /> AGM Goa 2026 Sponsorship Campaign
        </h2>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0F2440] via-[#1B365D] to-[#0F2440] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" /> 26 September 2026 • Goa, India
            </div>
            <h3 className="text-2xl font-extrabold font-display leading-tight">
              1st AGM • All India Tutti Frutti &amp; Karonda Manufacturers Association
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Dedicated sponsor landing page and custom campaign QR code for Tutti Frutti plant machinery demonstration in Goa.
            </p>
          </div>

          <div className="flex sm:flex-col gap-3 shrink-0">
            <Button asChild className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold px-6 shadow-md">
              <Link href="/campaign/agm-2026" target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" /> Open AGM Page
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 font-medium">
              <a href="/api/qr/generate?text=https://kmengineeringworks.com/campaign/agm-2026&format=png&size=800" download="KM-AGM-2026-QR.png">
                <Download className="w-4 h-4 mr-2" /> Download AGM QR
              </a>
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
