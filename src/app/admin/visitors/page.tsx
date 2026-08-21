"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Globe, 
  Smartphone, 
  Laptop, 
  Tablet, 
  MapPin, 
  Clock, 
  Eye, 
  Search, 
  RefreshCw, 
  Radio, 
  TrendingUp, 
  ExternalLink,
  Shield,
  Activity,
  Compass
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface VisitorLog {
  _id: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  device: string;
  browser: string;
  os: string;
  path: string;
  productTitle?: string;
  referrer: string;
  createdAt: string;
}

interface AnalyticsData {
  stats: {
    totalVisits: number;
    todayVisits: number;
    uniqueVisitors: number;
    topCity: string;
  };
  deviceStats: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  topLocations: { city: string; count: number }[];
  topPages: { path: string; count: number }[];
  recentVisitors: VisitorLog[];
}

export default function AdminVisitorsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchAnalytics = async (query = "") => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/admin/visitors?search=${encodeURIComponent(query)}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to load visitor analytics", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(search);
  }, [search]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchAnalytics(search);
    }, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, search]);

  const totalDeviceHits = data
    ? data.deviceStats.mobile + data.deviceStats.desktop + data.deviceStats.tablet
    : 0;

  const getDeviceIcon = (dev: string) => {
    const d = dev.toLowerCase();
    if (d === "mobile") return <Smartphone className="w-4 h-4 text-emerald-600" />;
    if (d === "tablet") return <Tablet className="w-4 h-4 text-blue-600" />;
    return <Laptop className="w-4 h-4 text-purple-600" />;
  };

  const formatTimeAgo = (dateStr: string) => {
    const diff = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(dateStr).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-brand-primary">Live Visitor Analytics</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Live Tracking
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-0.5">Real-time visitor tracking, buyer locations, and most viewed machinery.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`border-slate-300 ${autoRefresh ? "bg-emerald-50 text-emerald-700 border-emerald-200" : ""}`}
          >
            <Radio className={`w-3.5 h-3.5 mr-1.5 ${autoRefresh ? "animate-pulse" : ""}`} />
            {autoRefresh ? "Auto-Refresh On" : "Auto-Refresh Off"}
          </Button>

          <Button
            onClick={() => fetchAnalytics(search)}
            disabled={isRefreshing}
            className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold shadow-xs"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Page Views */}
        <Card className="border-slate-200 shadow-xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Page Views</p>
                <h3 className="text-3xl font-extrabold font-display text-brand-dark mt-1">
                  {loading ? "..." : data?.stats.totalVisits || 0}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-primary flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> All-time website visits
            </p>
          </CardContent>
        </Card>

        {/* Today's Traffic */}
        <Card className="border-slate-200 shadow-xs bg-gradient-to-br from-white to-amber-50/40">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Today&apos;s Traffic</p>
                <h3 className="text-3xl font-extrabold font-display text-brand-accent mt-1">
                  {loading ? "..." : data?.stats.todayVisits || 0}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-brand-accent flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-amber-700 font-medium mt-3">
              Visits in last 24 hours
            </p>
          </CardContent>
        </Card>

        {/* Unique Potential Clients */}
        <Card className="border-slate-200 shadow-xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Unique Visitors</p>
                <h3 className="text-3xl font-extrabold font-display text-brand-dark mt-1">
                  {loading ? "..." : data?.stats.uniqueVisitors || 0}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Distinct IP addresses
            </p>
          </CardContent>
        </Card>

        {/* Top Buyer City */}
        <Card className="border-slate-200 shadow-xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Top Buyer Hub</p>
                <h3 className="text-2xl font-bold font-display text-brand-dark mt-1 truncate max-w-[150px]">
                  {loading ? "..." : data?.stats.topCity || "Mumbai"}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Highest traffic origin
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Breakdown Grid: Devices & Top Machinery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Device Breakdown Card */}
        <Card className="border-slate-200 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-brand-primary" /> Device Distribution
            </CardTitle>
            <CardDescription>How buyers are browsing your machinery.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {totalDeviceHits === 0 ? (
              <p className="text-sm text-slate-400 py-4 text-center">No traffic recorded yet.</p>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-emerald-600" /> Mobile</span>
                    <span>{Math.round(((data?.deviceStats.mobile || 0) / totalDeviceHits) * 100)}% ({data?.deviceStats.mobile})</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${Math.round(((data?.deviceStats.mobile || 0) / totalDeviceHits) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5"><Laptop className="w-3.5 h-3.5 text-purple-600" /> Desktop / PC</span>
                    <span>{Math.round(((data?.deviceStats.desktop || 0) / totalDeviceHits) * 100)}% ({data?.deviceStats.desktop})</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${Math.round(((data?.deviceStats.desktop || 0) / totalDeviceHits) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5"><Tablet className="w-3.5 h-3.5 text-blue-600" /> Tablet</span>
                    <span>{Math.round(((data?.deviceStats.tablet || 0) / totalDeviceHits) * 100)}% ({data?.deviceStats.tablet})</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${Math.round(((data?.deviceStats.tablet || 0) / totalDeviceHits) * 100)}%` }}
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Most Viewed Machinery / Pages */}
        <Card className="border-slate-200 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Compass className="w-4 h-4 text-brand-primary" /> Most Viewed Machinery
            </CardTitle>
            <CardDescription>Pages attracting the highest buyer interest.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {!data?.topPages || data.topPages.length === 0 ? (
              <p className="text-sm text-slate-400 py-4 text-center">No page views yet.</p>
            ) : (
              data.topPages.map((page, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-mono text-slate-700 truncate max-w-[180px] sm:max-w-[220px]" title={page.path}>
                    {page.path === "/" ? "Homepage (/)" : page.path.replace("/products/", "⚙️ ")}
                  </span>
                  <Badge variant="secondary" className="bg-white border-slate-200 text-brand-primary font-bold">
                    {page.count} views
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Top Cities / Regions */}
        <Card className="border-slate-200 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-primary" /> Top Buyer Locations
            </CardTitle>
            <CardDescription>Cities with highest industrial demand.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {!data?.topLocations || data.topLocations.length === 0 ? (
              <p className="text-sm text-slate-400 py-4 text-center">No location data yet.</p>
            ) : (
              data.topLocations.map((loc, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-semibold text-slate-800 flex items-center gap-2">
                    📍 {loc.city}
                  </span>
                  <Badge variant="secondary" className="bg-white border-slate-200 text-emerald-700 font-bold">
                    {loc.count} visitors
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

      </div>

      {/* Real-Time Live Activity Feed Table */}
      <Card className="border-slate-200 shadow-xs">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg flex items-center gap-2 font-display">
                <Eye className="w-5 h-5 text-brand-primary" /> Real-Time Live Visitor Feed
              </CardTitle>
              <CardDescription>Individual logs of prospective buyers visiting your website.</CardDescription>
            </div>
            
            {/* Search Filter */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by city, path, IP, or device..."
                className="pl-9 h-9 text-xs bg-slate-50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-primary" />
              Loading live visitors...
            </div>
          ) : !data?.recentVisitors || data.recentVisitors.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No live visitor records found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 text-xs">
                    <TableHead>Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Visited Page / Machine</TableHead>
                    <TableHead>Device & OS</TableHead>
                    <TableHead>Traffic Source</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.recentVisitors.map((vis) => (
                    <TableRow key={vis._id} className="text-xs hover:bg-slate-50/80">
                      
                      {/* Time */}
                      <TableCell className="font-semibold text-slate-700 whitespace-nowrap">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {formatTimeAgo(vis.createdAt)}
                        </span>
                      </TableCell>

                      {/* Location */}
                      <TableCell>
                        <div className="font-medium text-slate-900 flex items-center gap-1.5">
                          <span className="text-base">🇮🇳</span>
                          <span>{vis.city || "Mumbai"}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{vis.region || "Maharashtra"}, {vis.country || "India"}</span>
                      </TableCell>

                      {/* Visited Page */}
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Badge variant="outline" className="font-mono text-[11px] bg-slate-50 text-slate-700 border-slate-200">
                            {vis.path}
                          </Badge>
                          <a
                            href={vis.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-brand-primary"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </TableCell>

                      {/* Device & OS */}
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          {getDeviceIcon(vis.device)}
                          <span className="font-medium text-slate-800">{vis.device}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500">{vis.browser} on {vis.os}</span>
                        </div>
                      </TableCell>

                      {/* Referrer */}
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] font-semibold ${
                            vis.referrer.includes("Google")
                              ? "bg-blue-50 text-blue-700"
                              : vis.referrer.includes("WhatsApp")
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {vis.referrer}
                        </Badge>
                      </TableCell>

                      {/* IP */}
                      <TableCell className="font-mono text-slate-400 text-[11px]">
                        {vis.ip}
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
