"use client";

import { useState } from "react";
import { Printer, Download, ArrowLeft, ShieldCheck, PhoneCall, Globe, MapPin, Mail, Sparkles, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function A4LeafletGenerator() {
  const qrUrl = typeof window !== "undefined" ? `${window.location.origin}/qr/connect` : "https://kmengineeringworks.com/qr/connect";
  const qrImage = `/api/qr/generate?text=${encodeURIComponent(qrUrl)}&format=png&size=800`;

  const plants = [
    {
      name: "Tutti Frutti Processing Plants",
      highlight: "Automatic dicing, boiling & syrup impregnation line",
      capacity: "100 Kg/Hr to 2 Ton/Day"
    },
    {
      name: "Commercial Bakery Plants",
      highlight: "Dual-speed spiral mixers, planetary mixers & deck ovens",
      capacity: "25 Kg, 50 Kg & 100 Kg Batch"
    },
    {
      name: "Potato Chips & Banana Wafers Plants",
      highlight: "High-speed slicers, de-watering centrifuges & batch fryers",
      capacity: "50 Kg/Hr to 300 Kg/Hr"
    },
    {
      name: "Namkeen & Farsan Processing Plants",
      highlight: "Continuous frying systems & multi-die extruder machines",
      capacity: "100 Kg/Hr to 500 Kg/Hr"
    },
    {
      name: "Sweets & Confectionery Machinery",
      highlight: "Heavy mawa making machines, steam kettles & dough kneaders",
      capacity: "50 Liters to 200 Liters"
    },
    {
      name: "Sanitary Circular Vibro Sifters",
      highlight: "Grading screeners for flour, spices, besan & food powders",
      capacity: "20-Inch to 48-Inch"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4 font-sans text-slate-900">
      
      {/* Top Floating Action Bar (Hidden during print) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white print:hidden">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Link href="/admin/marketing-assets">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Assets
            </Link>
          </Button>
          <div>
            <h2 className="text-base font-bold">Print-Ready A4 Leaflet Template</h2>
            <p className="text-xs text-slate-300">Exact 210 × 297 mm (300 DPI Standard Dimensions with Safe Print Margins)</p>
          </div>
        </div>

        <Button
          onClick={() => window.print()}
          size="lg"
          className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold shadow-lg px-6"
        >
          <Printer className="w-4 h-4 mr-2" /> Print / Save as PDF
        </Button>
      </div>

      {/* A4 Printable Sheet Container */}
      <div className="max-w-[210mm] min-h-[297mm] mx-auto bg-white p-[12mm] shadow-2xl rounded-sm print:shadow-none print:p-[10mm] print:m-0 print:max-w-none print:w-full print:rounded-none flex flex-col justify-between border border-slate-200">
        
        <div>
          {/* 1. Header with Full Brand Lockup */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b-2 border-[#1B365D]">
            <div className="flex items-center gap-3.5">
              <div className="w-16 h-16 bg-white p-1 rounded-xl border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
                <img src="/logo.svg" alt="K.M. Engineering" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-black font-display tracking-tight text-[#0F2440] uppercase">
                  K.M. ENGINEERING WORKS
                </h1>
                <div className="text-[11px] font-bold text-[#E8590C] tracking-wide uppercase">
                  Manufacturer of Food Machines &amp; Equipments
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  ISO &amp; GST Registered • 100% Food-Grade SS-304 / SS-316 Fabrication
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="inline-block bg-[#1B365D] text-white text-[9.5px] font-extrabold uppercase px-2.5 py-1 rounded">
                Official Factory Catalogue
              </div>
              <div className="text-[10px] text-slate-500 font-semibold mt-1">Sakinaka, Mumbai</div>
            </div>
          </div>

          {/* 2. Hero Innovation Banner */}
          <div className="my-3.5 p-3 rounded-xl bg-gradient-to-r from-[#0F2440] via-[#1B365D] to-[#0F2440] text-white flex items-center justify-between">
            <div>
              <div className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider">
                Heavy Industrial Duty • Zero Vibration Guarantee
              </div>
              <div className="text-base font-extrabold font-display leading-tight mt-0.5">
                Turnkey Food Processing &amp; Commercial Bakery Plants
              </div>
            </div>
            <div className="text-right text-[10px] text-slate-300 leading-tight">
              Direct Factory Pricing<br />
              <strong className="text-white">Pan-India Installation</strong>
            </div>
          </div>

          {/* 3. Six Machinery Plants Showcase Grid */}
          <div className="grid grid-cols-2 gap-2.5 my-3">
            {plants.map((plant, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 text-[#1B365D] font-bold text-[11.5px]">
                  <Factory className="w-3.5 h-3.5 text-[#E8590C] shrink-0" />
                  <span>{plant.name}</span>
                </div>
                <div className="text-[10px] text-slate-600 mt-1 leading-snug">
                  {plant.highlight}
                </div>
                <div className="text-[9.5px] font-bold text-slate-800 mt-1 flex items-center justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-500">Capacity:</span>
                  <span className="text-[#0F2440] bg-white px-1.5 py-0.2 rounded border border-slate-200">{plant.capacity}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 4. Trust & Metallurgy Highlights */}
          <div className="grid grid-cols-4 gap-2 my-3 text-center">
            <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
              <div className="text-[10px] font-extrabold text-[#1B365D]">100% SS-304 Grade</div>
              <div className="text-[8.5px] text-slate-500">Certified Food Surfaces</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
              <div className="text-[10px] font-extrabold text-[#1B365D]">1-Year Warranty</div>
              <div className="text-[8.5px] text-slate-500">Motor &amp; Drive Gearbox</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
              <div className="text-[10px] font-extrabold text-[#1B365D]">Pre-Dispatch Video</div>
              <div className="text-[8.5px] text-slate-500">100% Live Factory Trial</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
              <div className="text-[10px] font-extrabold text-[#1B365D]">Pan-India Support</div>
              <div className="text-[8.5px] text-slate-500">Technicians &amp; Spares</div>
            </div>
          </div>
        </div>

        {/* 5. Bottom Connect & Dynamic QR Action Card */}
        <div className="mt-2 pt-3 border-t-2 border-[#1B365D] bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Contact Details */}
            <div className="space-y-1.5 text-[10.5px]">
              <div>
                <strong className="text-slate-900 text-xs">Managing Director:</strong>{" "}
                <span className="font-bold text-[#1B365D]">Abdul Kaleem Sayyed</span>
              </div>
              <div className="flex items-center gap-4 text-slate-700">
                <span>📞 <strong>+91-9821669131</strong> / +91-8828489550</span>
                <span>💬 <strong>WhatsApp:</strong> +91 9821669131</span>
              </div>
              <div className="text-slate-600">
                ✉️ <strong>Email:</strong> kmengineering1973@gmail.com | 🌐 <strong>Web:</strong> www.kmengineeringworks.com
              </div>
              <div className="text-slate-500 text-[9.5px]">
                📍 <strong>Works:</strong> Workshop No. 58, Near Kwality Bakery, Azmi Compound, Khairani Rd, Sakinaka, Mumbai – 400072
              </div>
            </div>

            {/* Right: Permanent Dynamic QR Code Frame */}
            <div className="text-center shrink-0 bg-white p-2 rounded-xl border-2 border-[#1B365D] shadow-sm">
              <img src={qrImage} alt="Scan QR" className="w-24 h-24 object-contain mx-auto" />
              <div className="text-[9px] font-extrabold uppercase text-[#1B365D] mt-1 leading-none">
                Scan for Digital Profile
              </div>
              <div className="text-[8px] text-[#E8590C] font-mono font-bold mt-0.5">
                kmengineeringworks.com
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
