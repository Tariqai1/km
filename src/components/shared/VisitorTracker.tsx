"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string>("");

  useEffect(() => {
    // Only track public pages
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    // Avoid duplicate tracking on same page re-renders
    if (lastTrackedPath.current === pathname) {
      return;
    }
    lastTrackedPath.current = pathname;

    const trackVisit = async () => {
      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: pathname,
            referrer: document.referrer || "",
          }),
          keepalive: true,
        });
      } catch {
        // Silently catch to never disturb visitor experience
      }
    };

    // Delay slightly to let the page load smoothly
    const timer = setTimeout(trackVisit, 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
