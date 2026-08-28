"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Cog,
  ExternalLink,
  ShieldCheck,
  User,
  Activity,
  QrCode,
  Smartphone,
  FileText,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Digital Profile", href: "/admin/business-profile", icon: Smartphone, badge: "/connect" },
  { name: "Smart QR Hub", href: "/admin/qr-management", icon: QrCode, badge: "Active" },
  { name: "Marketing Assets", href: "/admin/marketing-assets", icon: FileText, badge: "Print" },
  { name: "Live Visitors", href: "/admin/visitors", icon: Activity, badge: "Live" },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: FolderOpen },
  { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare, badge: "New" },
  { name: "Settings", href: "/admin/settings", icon: Cog },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 border-r border-slate-800/80 select-none">
      {/* Brand Header */}
      <div className="p-5 sm:p-6 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-primary text-white flex items-center justify-center font-bold text-lg shadow-md shadow-brand-primary/20 shrink-0">
            KM
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base text-white tracking-tight leading-tight">
              KM Engineering
            </span>
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
              <ShieldCheck className="h-3 w-3 text-emerald-400" /> Admin Control
            </span>
          </div>
        </div>

        {/* Mobile Close Button inside Header */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="lg:hidden text-slate-400 hover:text-white hover:bg-slate-800 h-8 w-8 rounded-lg"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
          Main Menu
        </p>

        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href) && item.href !== "/admin");
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200",
                isActive
                  ? "bg-brand-primary text-white shadow-sm font-semibold"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "h-4 w-4 transition-transform duration-200 group-hover:scale-110",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                  )}
                />
                <span>{item.name}</span>
              </div>

              {/* Badge Indicator */}
              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  )}
                >
                  {item.badge}
                </span>
              )}

              {/* Active Pill Indicator */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full" />
              )}
            </Link>
          );
        })}
      </div>

      {/* External Site Quick Link */}
      <div className="px-3 py-2 border-t border-slate-800/80">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5" />
            View Live Website
          </span>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">↗</span>
        </a>
      </div>

      {/* Bottom Profile & Logout Section */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 space-y-2">
        {/* User Card */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/40 border border-slate-800/60">
          <div className="h-8 w-8 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 shrink-0">
            <User className="h-4 w-4" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-semibold text-slate-200 truncate">Administrator</span>
            <span className="text-[10px] text-slate-400 truncate">admin@kmengineering.com</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center justify-center gap-2 px-3 py-2 w-full rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors disabled:opacity-50"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>{isLoggingOut ? "Logging out..." : "Logout Session"}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top App Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-brand-primary text-white flex items-center justify-center font-bold text-xs">
            KM
          </div>
          <span className="font-bold text-sm text-white tracking-wide">KM Admin</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-300 hover:text-white hover:bg-slate-800 h-9 w-9 rounded-lg"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </header>

      {/* Mobile Drawer Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container (Desktop Persistent + Mobile Drawer) */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}