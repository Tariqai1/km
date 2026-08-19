"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function WhatsAppCTA() {
  const phoneNumber = "+919876543210";
  const message = encodeURIComponent("Hello! I am interested in your machinery and would like to get a quote.");
  const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link href={waLink} target="_blank" rel="noopener noreferrer" className="block relative group">
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75 group-hover:opacity-100 transition-opacity"></span>
        <div className="relative bg-brand-success text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
          <MessageCircle className="w-7 h-7" />
        </div>
      </Link>
    </motion.div>
  );
}
