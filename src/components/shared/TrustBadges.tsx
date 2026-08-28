"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Award, MapPin } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    { icon: Shield, text: "GST Registered" },
    { icon: Clock, text: "93% Response Rate" },
    { icon: Award, text: "Leading B2B Manufacturer" },
    { icon: MapPin, text: "Made in Mumbai" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 py-6 sm:py-8"
      >
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <motion.div 
              key={idx}
              variants={item}
              className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 text-center gap-2 sm:gap-2.5 shadow-xs hover:shadow-sm transition-shadow"
            >
              <div className="p-2 sm:p-2.5 bg-brand-primary/10 rounded-xl text-brand-primary">
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-semibold text-slate-800 text-xs sm:text-sm">
                {badge.text}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
