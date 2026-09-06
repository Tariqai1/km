"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import MobileBottomBar from "@/components/shared/MobileBottomBar";
import Footer from "@/components/shared/Footer";
import dynamic from "next/dynamic";

const WhatsAppCTA = dynamic(() => import("@/components/shared/WhatsAppCTA"), {
  ssr: false,
});

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [settings, setSettings] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data) setSettings(data);
      })
      .catch((err) => console.error("Failed to load settings in layout", err));
  }, []);

  const isStandalonePage = pathname === "/connect" || pathname?.startsWith("/campaign");

  return (
    <>
      {/* Redesigned Industrial Corporate Header / Navbar */}
      <Navbar settings={settings} />

      {/* Main Content Area (with safe bottom padding on mobile for the fixed dock) */}
      <main className={`min-h-[calc(100vh-80px)] ${isStandalonePage ? "" : "pb-16 lg:pb-0"}`}>
        {children}
      </main>

      {/* Global Footer & WhatsApp Widgets */}
      {!isStandalonePage && (
        <>
          <Footer />
          <WhatsAppCTA />
          <MobileBottomBar contactPhone={settings?.contactPhone} />
        </>
      )}
    </>
  );
}