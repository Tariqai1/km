"use client";

import { Printer, ArrowLeft, Factory, PhoneCall, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function A5LeafletGenerator() {
  const qrUrl = typeof window !== "undefined" ? `${window.location.origin}/qr/connect` : "https://kmengineeringworks.com/qr/connect";
  const qrImage = `/api/qr/generate?text=${encodeURIComponent(qrUrl)}&format=png&size=800`;

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4 font-sans text-slate-900">
      
      {/* Top Floating Action Bar */}
      <div className="max-w-xl mx-auto mb-6 flex items-center justify-between bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white print:hidden">
        <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10">
          <Link href="/admin/marketing-assets">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Link>
        </Button>
        <Button
          onClick={() => window.print()}
          size="sm"
          className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold px-5"
        >
          <Printer className="w-4 h-4 mr-2" /> Print A5 Flyer
        </Button>
      </div>

      {/* A5 Printable Sheet (148 x 210 mm) */}
      <div className="max-w-[148mm] min-h-[210mm] mx-auto bg-white p-[8mm] shadow-2xl rounded-sm print:shadow-none print:p-[6mm] print:m-0 print:max-w-none print:w-full print:rounded-none flex flex-col justify-between border border-slate-200 text-slate-900">
        
        <div>
          {/* Header */}
          <div className="flex items-center gap-2.5 pb-2.5 border-b-2 border-[#1B365D]">
            <div className="w-12 h-12 bg-white p-1 rounded-lg border border-slate-200 flex items-center justify-center shrink-0">
              <img src="/logo.svg" alt="KME Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-black font-display text-[#0F2440] leading-none uppercase">
                K.M. ENGINEERING WORKS
              </h1>
              <p className="text-[9px] font-bold text-[#E8590C] uppercase mt-0.5">
                Manufacturer of Food Machines &amp; Equipments
              </p>
              <p className="text-[8px] text-slate-500 font-medium">
                100% SS-304 Certified • Mumbai, India
              </p>
            </div>
          </div>

          {/* Plant Categories Pill List */}
          <div className="my-2.5 p-2 rounded-lg bg-[#0F2440] text-white text-center">
            <div className="text-[8.5px] font-bold text-amber-400 uppercase">Commercial Turnkey Plants</div>
            <div className="text-xs font-black font-display mt-0.5">Tutti Frutti • Bakery • Chips • Namkeen • Sweets</div>
          </div>

          {/* 4 Core Machinery Plants Grid */}
          <div className="grid grid-cols-2 gap-2 my-2 text-[9.5px]">
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <div className="font-bold text-[#1B365D]">🥭 Tutti Frutti Plants</div>
              <div className="text-[8.5px] text-slate-600">Dicing, boiling &amp; syrup lines</div>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <div className="font-bold text-[#1B365D]">🍞 Commercial Bakery</div>
              <div className="text-[8.5px] text-slate-600">Spiral &amp; planetary mixers</div>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <div className="font-bold text-[#1B365D]">🥔 Potato Chips Plants</div>
              <div className="text-[8.5px] text-slate-600">Slicers, dryers &amp; fryers</div>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <div className="font-bold text-[#1B365D]">🔄 Vibro Screeners</div>
              <div className="text-[8.5px] text-slate-600">Sanitary grading sifters</div>
            </div>
          </div>
        </div>

        {/* Bottom QR & Contact Section */}
        <div className="pt-2 border-t-2 border-[#1B365D] bg-slate-50 p-2 rounded-lg border border-slate-200 flex items-center justify-between gap-2">
          <div className="text-[8.5px] leading-tight space-y-1">
            <div>
              <strong className="text-slate-900">Contact:</strong> Abdul Kaleem Sayyed
            </div>
            <div className="font-bold text-slate-800">
              📞 +91-9821669131 / +91-8828489550
            </div>
            <div className="text-slate-600">
              ✉️ kmengineering1973@gmail.com
            </div>
            <div className="text-slate-500 text-[7.5px]">
              📍 Workshop No. 58, Sakinaka, Mumbai – 400072
            </div>
          </div>

          <div className="text-center bg-white p-1 rounded-lg border border-slate-300 shrink-0">
            <img src={qrImage} alt="Scan QR" className="w-16 h-16 object-contain mx-auto" />
            <div className="text-[7.5px] font-extrabold text-[#1B365D] uppercase mt-0.5">Scan Profile</div>
          </div>
        </div>

      </div>

    </div>
  );
}
