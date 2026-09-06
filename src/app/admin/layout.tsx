"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Exclude login page from the admin shell layout
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [pathname, router, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row print:bg-white print:block print:min-h-0">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen pt-16 lg:pt-0 print:pt-0 print:min-h-0 print:block">
        {/* Top bar can go here if needed, but sidebar has mobile header */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto w-full max-w-7xl mx-auto print:p-0 print:m-0 print:max-w-none print:w-full print:overflow-visible">
          {children}
        </main>
      </div>
    </div>
  );
}
