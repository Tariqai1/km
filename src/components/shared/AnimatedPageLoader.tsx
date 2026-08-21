"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AnimatedPageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show smooth animated splash on page load / refresh
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#071324] text-white select-none overflow-hidden"
        >
          {/* Ambient Glowing Halo Behind Logo */}
          <div className="absolute w-96 h-96 bg-brand-primary/40 rounded-full blur-[100px] pointer-events-none -z-0"></div>
          <div className="absolute w-64 h-64 bg-brand-accent/20 rounded-full blur-[80px] pointer-events-none -z-0"></div>

          {/* Center Logo Showcase */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            
            {/* Animated Gears Logo Container */}
            <div className="relative flex items-center justify-center mb-6">
              
              {/* Outer Energy Pulse Ring */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-44 h-44 rounded-full border border-brand-accent/30 pointer-events-none"
              />

              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-36 h-36 rounded-full border border-blue-400/30 pointer-events-none"
              />

              {/* Logo Card with Gentle Floating & Rotation Bounce */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative w-28 h-28 sm:w-32 sm:h-32 bg-white/95 backdrop-blur-md rounded-3xl p-3.5 shadow-2xl shadow-blue-500/20 border border-white/20 flex items-center justify-center"
              >
                {/* Rotating Gears Logo */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-full h-full relative"
                >
                  <Image
                    src="/logo.png"
                    alt="K.M. Engineering Works Logo"
                    fill
                    sizes="128px"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </motion.div>

            </div>

            {/* Brand Title with Text Reveal */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white uppercase"
            >
              K.M. ENGINEERING WORKS
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xs sm:text-sm font-semibold tracking-widest text-brand-accent uppercase mt-1.5"
            >
              Precision Food Processing & Bakery Machinery
            </motion.p>

            {/* Futuristic Loading Bar */}
            <div className="w-48 sm:w-56 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-6 border border-slate-700/50">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.1,
                  ease: "easeInOut",
                }}
                className="w-full h-full bg-gradient-to-r from-blue-500 via-brand-accent to-emerald-400 rounded-full"
              />
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-[10px] text-slate-400 font-mono tracking-wider mt-3"
            >
              INITIALIZING INDUSTRIAL CATALOG...
            </motion.span>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
