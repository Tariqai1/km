"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, ArrowRight } from "lucide-react";

interface MobileBottomBarProps {
  contactPhone?: string;
}

export default function MobileBottomBar({ contactPhone = "+91 98216 69131" }: MobileBottomBarProps) {
  const pathname = usePathname();

  // Hide on connect page, admin, or print routes
  if (pathname === "/connect" || pathname?.startsWith("/admin") || pathname?.startsWith("/campaign")) {
    return null;
  }

  const cleanPhone = contactPhone.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    "Hello K.M. Engineering Works, I would like to inquire about industrial machinery specifications and get a price quote."
  )}`;

  return (
    <aside 
      aria-label="Mobile Quick Inquiries"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]"
    >
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
        {/* WhatsApp Inquiry Button */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 bg-[#15803D] hover:bg-[#166534] active:scale-[0.98] text-white font-bold text-xs py-2.5 px-3 rounded-lg shadow-2xs transition-all tracking-tight"
          aria-label="Inquire on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 fill-white shrink-0" />
          <span>WhatsApp Inquiry</span>
        </a>

        {/* Request RFQ Button */}
        <Link
          href="/contact"
          className="flex items-center justify-center gap-1.5 bg-[#162A45] hover:bg-[#0F1D30] active:scale-[0.98] text-white font-bold text-xs py-2.5 px-3 rounded-lg shadow-2xs transition-all tracking-tight"
          aria-label="Request a Quotation"
        >
          <span>Request Quote</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
        </Link>
      </div>
    </aside>
  );
}
