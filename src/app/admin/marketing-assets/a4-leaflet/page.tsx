"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  PhoneCall, 
  Phone,
  Globe, 
  MapPin, 
  Mail, 
  Sparkles, 
  Factory,
  ZoomIn,
  ZoomOut,
  Maximize2,
  SlidersHorizontal,
  RotateCcw,
  Share2,
  Check,
  Smartphone,
  FileText,
  Layers,
  Flame,
  Wind,
  Cpu,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface PlantItem {
  name: string;
  icon: any;
  highlight: string;
  capacity: string;
  metallurgy: string;
  power: string;
}

const defaultPlants: PlantItem[] = [
  {
    name: "Tutti Frutti Processing Plants",
    icon: Sparkles,
    highlight: "Automatic dicing (2mm–10mm), boiling kettle, continuous syrup impregnation & drying tunnel.",
    capacity: "100 Kg/Hr – 2 Ton/Day",
    metallurgy: "SS-304 Food Grade",
    power: "3 HP – 15 HP Line"
  },
  {
    name: "Commercial Bakery Spiral Mixers",
    icon: Layers,
    highlight: "Heavy-duty dual-speed spiral dough kneader, high-torque bowl rotation, zero vibration cast frame.",
    capacity: "25 Kg, 50 Kg & 100 Kg Batch",
    metallurgy: "SS-304 Contact Parts",
    power: "5 HP – 12.5 HP Motor"
  },
  {
    name: "Potato Chips & Banana Wafers Lines",
    icon: Factory,
    highlight: "Precision centrifugal rotary slicer, batch de-watering hydro-extractor & automated thermic fryers.",
    capacity: "50 Kg/Hr – 300 Kg/Hr",
    metallurgy: "SS-304 Certified",
    power: "Continuous Drive"
  },
  {
    name: "Namkeen & Farsan Processing Plants",
    icon: Flame,
    highlight: "Multi-die automated sev/bhujia extruders, continuous fryer system & rotary seasoning drums.",
    capacity: "100 Kg/Hr – 500 Kg/Hr",
    metallurgy: "SS-304 Heavy Gauges",
    power: "Diesel / Gas / Electric"
  },
  {
    name: "Sweets & Confectionery Machinery",
    icon: Cpu,
    highlight: "Steam/Gas jacketed tilting kettles, automatic mawa making machines & high-torque syrup mixers.",
    capacity: "50 Liters – 250 Liters",
    metallurgy: "SS-304 / SS-316",
    power: "Heavy Duty Gearbox"
  },
  {
    name: "Sanitary Circular Vibro Sifters",
    icon: Wind,
    highlight: "Circular gyratory vibratory sieves for spices, flour, besan, pharmaceutical & chemical grading.",
    capacity: "20-Inch to 48-Inch Screen",
    metallurgy: "SS-304 / SS-316 Mirror",
    power: "High-Freq Vibration"
  }
];

export default function A4LeafletGenerator() {
  const [viewMode, setViewMode] = useState<"sheet" | "mobile">("sheet");
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [autoFitScale, setAutoFitScale] = useState<number>(1);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Customization States
  const [clientName, setClientName] = useState("");
  const [salesPerson, setSalesPerson] = useState("Abdul Kaleem Sayyed");
  const [salesPhone, setSalesPhone] = useState("+91 98216 69131");
  const [promoTag, setPromoTag] = useState("Heavy Industrial Duty • SS-304/SS-316 Certified • Zero Vibration");

  const qrUrl = typeof window !== "undefined" ? `${window.location.origin}/qr/connect` : "https://kmengineeringworks.com/qr/connect";
  const qrImage = `/api/qr/generate?text=${encodeURIComponent(qrUrl)}&format=png&size=800`;

  // Calculate auto-fit scale on mount and resize for mobile/tablet
  useEffect(() => {
    const calculateFit = () => {
      const targetWidth = 794; // 210mm in screen pixels at 96 DPI
      const availableWidth = window.innerWidth - (window.innerWidth < 640 ? 24 : 48);
      const fit = Math.min(1, Math.max(0.35, availableWidth / targetWidth));
      setAutoFitScale(fit);
      
      if (window.innerWidth < 850) {
        setZoomScale(fit);
      }
    };

    calculateFit();
    window.addEventListener("resize", calculateFit);
    return () => window.removeEventListener("resize", calculateFit);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setClientName("");
    setSalesPerson("Abdul Kaleem Sayyed");
    setSalesPhone("+91 98216 69131");
    setPromoTag("Heavy Industrial Duty • SS-304/SS-316 Certified • Zero Vibration");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      
      {/* BULLETPROOF 1-PAGE A4 PRINT CSS ENGINE */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: A4 portrait;
            margin: 0 !important;
          }
          html, body {
            width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #0F172A !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body * {
            visibility: hidden !important;
          }
          #a4-printable-sheet, #a4-printable-sheet * {
            visibility: visible !important;
          }
          #a4-printable-sheet {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            margin: 0 !important;
            padding: 6mm 8mm 5mm 8mm !important;
            box-sizing: border-box !important;
            background: #ffffff !important;
            overflow: hidden !important;
            border: none !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            page-break-before: avoid !important;
            box-shadow: none !important;
            z-index: 999999 !important;
          }
        }
      `}} />

      {/* TOP CONTROL BAR (Print Hidden) */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-3 sm:px-6 py-2.5 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Document Info */}
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800 h-9 px-2.5">
              <Link href="/admin/marketing-assets">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                <span className="hidden sm:inline">Back</span>
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-white leading-tight">
                  A4 Industrial Leaflet
                </h1>
                <span className="text-[10px] font-mono font-bold bg-[#162A45] text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded">
                  Guaranteed 1-Page A4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Exact 210 × 297 mm physical print layout with zero overflow
              </p>
            </div>
          </div>

          {/* Center: View Toggle */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700/80 text-xs">
            <button
              type="button"
              onClick={() => setViewMode("sheet")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all ${
                viewMode === "sheet"
                  ? "bg-[#162A45] text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>A4 Print Sheet</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all ${
                viewMode === "mobile"
                  ? "bg-[#162A45] text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Field View</span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
              className={`h-9 text-xs border-slate-700 hover:bg-slate-800 ${
                isCustomizerOpen ? "bg-slate-800 text-amber-400 border-amber-400/40" : "text-slate-300"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Customize</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="h-9 text-xs border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
              title="Copy shareable link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </Button>

            <Button
              onClick={() => window.print()}
              size="sm"
              className="h-9 px-4 bg-[#B45309] hover:bg-[#92400E] text-white font-bold text-xs shadow-md transition-all active:scale-[0.98]"
            >
              <Printer className="w-4 h-4 mr-1.5" />
              <span>Print / Save PDF</span>
            </Button>
          </div>

        </div>

        {/* CUSTOMIZER DRAWER */}
        {isCustomizerOpen && (
          <div className="max-w-7xl mx-auto mt-2.5 pt-2.5 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">
                Client / Prospect Name:
              </label>
              <Input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. M/s Haldiram Snacks Pvt Ltd"
                className="h-8 bg-slate-800 border-slate-700 text-xs text-white placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">
                Salesperson / Desk Contact:
              </label>
              <Input
                value={salesPerson}
                onChange={(e) => setSalesPerson(e.target.value)}
                placeholder="Abdul Kaleem Sayyed"
                className="h-8 bg-slate-800 border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">
                Direct Mobile / WhatsApp:
              </label>
              <Input
                value={salesPhone}
                onChange={(e) => setSalesPhone(e.target.value)}
                placeholder="+91 98216 69131"
                className="h-8 bg-slate-800 border-slate-700 text-xs text-white"
              />
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Promotional Tag:
                </label>
                <Input
                  value={promoTag}
                  onChange={(e) => setPromoTag(e.target.value)}
                  placeholder="Heavy Duty Guarantee"
                  className="h-8 bg-slate-800 border-slate-700 text-xs text-white"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-8 text-[11px] text-slate-400 hover:text-white"
                title="Reset to Defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* FLOATING ZOOM CONTROLLER (Screen Only) */}
      {viewMode === "sheet" && (
        <div className="fixed bottom-5 right-5 z-30 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700 shadow-xl print:hidden">
          <button
            type="button"
            onClick={() => setZoomScale((prev) => Math.max(0.35, prev - 0.1))}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors text-xs font-bold"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <button
            type="button"
            onClick={() => setZoomScale(autoFitScale)}
            className="px-2.5 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 flex items-center justify-center transition-colors text-xs font-mono font-bold"
            title="Auto-Fit to Screen"
          >
            Fit ({Math.round(autoFitScale * 100)}%)
          </button>

          <button
            type="button"
            onClick={() => setZoomScale(1)}
            className={`px-2 h-8 rounded-lg text-xs font-mono font-bold transition-colors ${
              zoomScale === 1 ? "bg-[#162A45] text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
            title="100% Print Size"
          >
            100%
          </button>

          <button
            type="button"
            onClick={() => setZoomScale((prev) => Math.min(1.5, prev + 0.1))}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors text-xs font-bold"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* MAIN VIEWPORT WORKSPACE */}
      <main className="py-6 px-3 sm:px-6">
        
        {/* ========================================================= */}
        {/* 1. EXACT A4 PRINT-READY PHYSICAL SHEET (STRICT 1-PAGE)    */}
        {/* ========================================================= */}
        {viewMode === "sheet" && (
          <div 
            ref={containerRef}
            className="w-full flex justify-center items-start overflow-visible"
            style={{
              minHeight: `${297 * 3.78 * zoomScale}px`
            }}
          >
            <div 
              style={{
                transform: `scale(${zoomScale})`,
                transformOrigin: "top center",
                transition: "transform 0.15s ease-out"
              }}
            >
              {/* THE PHYSICAL A4 CANVAS: 210mm × 297mm STRICT */}
              <div 
                id="a4-printable-sheet"
                className="w-[210mm] h-[297mm] max-h-[297mm] bg-white text-slate-900 p-[7mm_9mm_6mm_9mm] shadow-2xl rounded-xs border border-slate-300 flex flex-col justify-between overflow-hidden box-border select-none"
              >
                
                {/* TOP HALF CONTAINER */}
                <div>
                  
                  {/* 1. Industrial Executive Header */}
                  <div className="flex items-center justify-between gap-3 pb-2 border-b-2 border-[#162A45]">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-auto flex items-center">
                        <img 
                          src="/logo-full.png" 
                          alt="K.M. Engineering Works - Industrial Machinery Specialist" 
                          className="h-11 w-auto object-contain" 
                        />
                      </div>
                      <div className="hidden sm:block border-l border-slate-300 pl-3">
                        <div className="text-[9px] font-bold text-[#B45309] uppercase tracking-wider">
                          Heavy Food Machinery Fabricator
                        </div>
                        <div className="text-[8.5px] text-slate-500 font-medium">
                          ISO 9001:2015 &amp; GST Registered • Est. 1973
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="inline-block bg-[#162A45] text-white text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider">
                        Official Specification Sheet
                      </div>
                      <div className="text-[9px] text-slate-500 font-mono font-semibold mt-0.5">
                        Ref: KME/CAT/2026-REV4
                      </div>
                    </div>
                  </div>

                  {/* Client Personalization Ribbon (if entered) */}
                  {clientName && (
                    <div className="mt-1.5 px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between text-[9.5px]">
                      <span>
                        <strong className="font-bold">Prepared Specially For:</strong> {clientName}
                      </span>
                      <span className="font-mono text-[8.5px] text-amber-700 font-semibold">
                        Direct Mumbai Factory Quotation
                      </span>
                    </div>
                  )}

                  {/* 2. Heavy Industrial Guarantee Banner */}
                  <div className="my-2 p-2 rounded-lg bg-gradient-to-r from-[#0F172A] via-[#162A45] to-[#0F172A] text-white flex items-center justify-between shadow-2xs">
                    <div>
                      <div className="text-[9px] font-extrabold uppercase text-amber-400 tracking-wider">
                        {promoTag}
                      </div>
                      <div className="text-[13px] font-black font-display leading-tight mt-0.5">
                        Turnkey Food Processing &amp; Commercial Bakery Plants
                      </div>
                    </div>
                    <div className="text-right text-[8.5px] text-slate-300 leading-tight shrink-0">
                      Direct Mumbai Factory Pricing<br />
                      <strong className="text-white">Pan-India Delivery &amp; Live Trials</strong>
                    </div>
                  </div>

                  {/* 3. 6 Core Machinery Plants Specification Grid */}
                  <div className="grid grid-cols-2 gap-1.5 my-1.5">
                    {defaultPlants.map((plant, idx) => {
                      const Icon = plant.icon;
                      return (
                        <div 
                          key={idx} 
                          className="p-2 rounded-md bg-slate-50/90 border border-slate-200/90 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1">
                              <div className="flex items-center gap-1.5 text-[#162A45] font-bold text-[10.5px] leading-tight">
                                <Icon className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                                <span className="line-clamp-1">{plant.name}</span>
                              </div>
                              <span className="text-[8px] font-mono font-bold bg-white text-slate-700 px-1 py-0.2 rounded border border-slate-200 shrink-0">
                                {plant.metallurgy}
                              </span>
                            </div>
                            <p className="text-[9px] text-slate-600 mt-1 leading-snug line-clamp-2">
                              {plant.highlight}
                            </p>
                          </div>

                          <div className="text-[8.5px] font-bold text-slate-800 mt-1 pt-1 border-t border-slate-200 flex items-center justify-between">
                            <span className="text-slate-500">
                              Cap: <strong className="text-slate-900">{plant.capacity}</strong>
                            </span>
                            <span className="text-[#162A45] font-mono text-[8px]">
                              {plant.power}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* 4. Trust & Metallurgy Highlights Strip */}
                  <div className="grid grid-cols-4 gap-1.5 my-1.5 text-center">
                    <div className="p-1.5 rounded-md bg-slate-100 border border-slate-200">
                      <div className="text-[9px] font-extrabold text-[#162A45]">100% SS-304/316</div>
                      <div className="text-[7.5px] text-slate-500">Certified Food Surfaces</div>
                    </div>
                    <div className="p-1.5 rounded-md bg-slate-100 border border-slate-200">
                      <div className="text-[9px] font-extrabold text-[#162A45]">1-Year Warranty</div>
                      <div className="text-[7.5px] text-slate-500">Motors &amp; Heavy Drives</div>
                    </div>
                    <div className="p-1.5 rounded-md bg-slate-100 border border-slate-200">
                      <div className="text-[9px] font-extrabold text-[#162A45]">Pre-Dispatch Trial</div>
                      <div className="text-[7.5px] text-slate-500">100% Live Video Demo</div>
                    </div>
                    <div className="p-1.5 rounded-md bg-slate-100 border border-slate-200">
                      <div className="text-[9px] font-extrabold text-[#162A45]">Pan-India Delivery</div>
                      <div className="text-[7.5px] text-slate-500">Doorstep Crating &amp; Spares</div>
                    </div>
                  </div>

                </div>

                {/* BOTTOM HALF CONTAINER: FACTORY DESK & DYNAMIC QR */}
                <div className="mt-1 pt-2 border-t-2 border-[#162A45] bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between gap-3">
                    
                    {/* Left: Contact Details */}
                    <div className="space-y-0.5 text-[9px]">
                      <div>
                        <strong className="text-slate-900">Direct Engineering Sales:</strong>{" "}
                        <span className="font-bold text-[#162A45]">{salesPerson}</span>
                        <span className="text-slate-400 mx-1.5">|</span>
                        <span className="text-slate-600">Technical Director: <strong>Tariq Sayyed</strong></span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-800 pt-0.5">
                        <span>📞 <strong>{salesPhone}</strong> / +91-8828489550</span>
                        <span>💬 <strong>WhatsApp Engineering Desk</strong></span>
                      </div>
                      <div className="text-slate-600 pt-0.5">
                        ✉️ kmengineering1973@gmail.com | 🌐 www.kmengineeringworks.com
                      </div>
                      <div className="text-slate-500 text-[8px] leading-tight pt-0.5">
                        📍 <strong>Works:</strong> Workshop No. 58, Near Kwality Bakery, Azmi Compound, Khairani Rd, Sakinaka, Mumbai – 400072
                      </div>
                    </div>

                    {/* Right: Permanent Dynamic QR Code Frame */}
                    <div className="text-center shrink-0 bg-white p-1 rounded-lg border-2 border-[#162A45] shadow-2xs">
                      <img 
                        src={qrImage} 
                        alt="Scan QR for Catalog & Videos" 
                        className="w-16 h-16 object-contain mx-auto" 
                      />
                      <div className="text-[7.5px] font-extrabold uppercase text-[#162A45] mt-0.5 leading-none">
                        Scan for Video Catalog
                      </div>
                      <div className="text-[7px] text-[#B45309] font-mono font-bold mt-0.5">
                        kmengineeringworks.com
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. MOBILE FIELD VIEW (RESPONSIVE TOUCH-FRIENDLY CARDS)    */}
        {/* ========================================================= */}
        {viewMode === "mobile" && (
          <div className="max-w-xl mx-auto space-y-3.5 print:hidden">
            
            {/* Mobile Header Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg text-white">
              <div className="flex items-center gap-3">
                <div className="h-10 w-auto flex items-center bg-white p-1 rounded-lg shrink-0">
                  <img src="/logo-full.png" alt="Logo" className="h-8 w-auto object-contain" />
                </div>
                <div>
                  <h2 className="font-black text-lg text-white uppercase tracking-tight">
                    K.M. Engineering Works
                  </h2>
                  <p className="text-xs text-amber-400 font-bold uppercase">
                    Industrial Machinery Specialist
                  </p>
                  <p className="text-[11px] text-slate-400">
                    ISO 9001:2015 Registered • Mumbai Works
                  </p>
                </div>
              </div>

              {clientName && (
                <div className="mt-3 p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs">
                  <strong>Specially Prepared For:</strong> {clientName}
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${salesPhone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Factory Desk</span>
              </a>

              <Button
                onClick={() => window.print()}
                className="bg-[#162A45] hover:bg-[#0F1D30] text-white font-bold text-xs py-3 rounded-xl shadow-md"
              >
                <Printer className="w-4 h-4 mr-1.5" />
                <span>Print / Save PDF</span>
              </Button>
            </div>

            {/* 6 Machinery Cards */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                Machinery Plants Specification Cards
              </div>

              {defaultPlants.map((plant, idx) => {
                const Icon = plant.icon;
                return (
                  <div 
                    key={idx} 
                    className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 shadow-sm space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <div className="w-7 h-7 rounded-md bg-[#162A45] text-amber-400 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span>{plant.name}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-slate-800 text-amber-400 border border-slate-700 px-2 py-0.5 rounded">
                        {plant.metallurgy}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {plant.highlight}
                    </p>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Capacity: <strong className="text-white">{plant.capacity}</strong></span>
                      <span className="text-amber-400 font-mono text-[11px]">{plant.power}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* QR Code & Contact Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
              <div className="bg-white p-1.5 rounded-lg shrink-0">
                <img src={qrImage} alt="QR" className="w-20 h-20 object-contain" />
              </div>
              <div className="space-y-1 text-xs">
                <div className="font-bold text-white">Scan for Digital Profile</div>
                <p className="text-slate-400 text-[11px]">
                  Access 50+ video trials, CAD drawings &amp; direct technical support.
                </p>
                <div className="text-amber-400 font-mono text-[10px] font-bold">
                  {salesPhone}
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
