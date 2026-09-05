"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppCTA() {
  const phoneNumber = "919821669131";
  const message = encodeURIComponent("Hello K.M. Engineering Works, I would like to inquire about industrial food machinery specifications and quote.");
  const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Sales Desk"
        className="flex items-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white px-4 py-3 rounded-full shadow-lg transition-colors border border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-700"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="font-semibold text-xs tracking-wide hidden sm:inline">WhatsApp Sales Desk</span>
      </a>
    </div>
  );
}
