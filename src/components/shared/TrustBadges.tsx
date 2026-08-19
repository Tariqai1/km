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
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8"
    >
      {badges.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <motion.div 
            key={idx}
            variants={item}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-brand-light border border-gray-100 text-center gap-3 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-3 bg-brand-primary/10 rounded-full text-brand-primary">
              <Icon className="w-6 h-6" />
            </div>
            <span className="font-semibold text-brand-dark text-sm md:text-base">
              {badge.text}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
