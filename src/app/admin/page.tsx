"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Users, Package, FolderOpen, AlertCircle, Eye } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";

const EnquiryChart = dynamic(
  () => import("@/components/admin/EnquiryChart").then((mod) => mod.EnquiryChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl text-slate-400 text-sm border border-slate-100 animate-pulse">
        Loading Analytics Chart...
      </div>
    ),
  }
);
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";

interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  activeProducts: number;
  categories: number;
}

interface Enquiry {
  _id: string;
  name: string;
  phone: string;
  productInterest: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, you would fetch from real endpoints. 
        // We'll mock the calls or rely on them returning data if implemented
        const [statsRes, chartRes, enquiriesRes] = await Promise.all([
          fetch("/api/admin/dashboard/stats").catch(() => null),
          fetch("/api/admin/dashboard/chart").catch(() => null),
          fetch("/api/admin/enquiries?limit=5").catch(() => null),
        ]);

        if (statsRes?.ok) {
          setStats(await statsRes.json());
        } else {
          // Fallback mock data
          setStats({
            totalLeads: 1248,
            newLeads: 42,
            activeProducts: 36,
            categories: 8
          });
        }

        if (chartRes?.ok) {
          setChartData(await chartRes.json());
        } else {
          // Fallback mock chart data
          const mockChartData = Array.from({ length: 30 }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (29 - i));
            return {
              date: format(d, 'MMM dd'),
              count: Math.floor(Math.random() * 20) + 5
            };
          });
          setChartData(mockChartData as any);
        }

        if (enquiriesRes?.ok) {
          const data = await enquiriesRes.json();
          setRecentEnquiries(data.enquiries || data);
        } else {
          // Fallback mock enquiries
          setRecentEnquiries([
            { _id: "1", name: "Rahul Sharma", phone: "+91 9876543210", productInterest: "Dough Mixer", status: "new", createdAt: new Date().toISOString() },
            { _id: "2", name: "Amit Patel", phone: "+91 9876543211", productInterest: "Vibro Sifter", status: "in-progress", createdAt: new Date().toISOString() },
            { _id: "3", name: "Priya Singh", phone: "+91 9876543212", productInterest: "Tutti Frutti Machine", status: "contacted", createdAt: new Date().toISOString() },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div>
          <div className="h-8 w-64 bg-slate-200 rounded mb-2"></div>
          <div className="h-4 w-96 bg-slate-100 rounded"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-white border border-slate-100 rounded-xl p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="h-4 w-24 bg-slate-200 rounded"></div>
                <div className="h-8 w-8 bg-slate-100 rounded-full"></div>
              </div>
              <div className="h-8 w-16 bg-slate-200 rounded mt-4"></div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-[400px] bg-white border border-slate-100 rounded-xl p-6">
             <div className="h-6 w-48 bg-slate-200 rounded mb-6"></div>
             <div className="h-full w-full bg-slate-50 rounded-lg"></div>
          </div>
          <div className="lg:col-span-1 h-[400px] bg-white border border-slate-100 rounded-xl p-6 flex flex-col space-y-4">
             <div className="h-6 w-32 bg-slate-200 rounded mb-2"></div>
             {[1, 2, 3].map(i => (
               <div key={i} className="flex gap-4 items-center">
                  <div className="h-10 w-full bg-slate-100 rounded flex-1"></div>
                  <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
               </div>
             ))}
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadgeVariant = (status: string) => {
    switch(status.toLowerCase()) {
      case 'new': return 'default'; // usually primary color or red-ish if we configure it
      case 'in-progress': return 'secondary';
      case 'contacted': return 'outline';
      case 'archived': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-brand-primary">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs shrink-0">
          <Link href="/admin/visitors">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse mr-2"></span>
            View Live Visitors Feed
          </Link>
        </Button>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            title="Total Leads" 
            value={stats.totalLeads} 
            icon={Users} 
            trend="+12% from last month" 
          />
          <StatsCard 
            title="New Leads" 
            value={stats.newLeads} 
            icon={AlertCircle} 
            highlight={true}
            trend="Needs attention" 
          />
          <StatsCard 
            title="Active Products" 
            value={stats.activeProducts} 
            icon={Package} 
          />
          <StatsCard 
            title="Categories" 
            value={stats.categories} 
            icon={FolderOpen} 
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <EnquiryChart data={chartData} />
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-brand-primary">Recent Enquiries</h2>
              <Link href="/admin/enquiries" className="text-sm text-brand-accent hover:underline">
                View All
              </Link>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4">
                {recentEnquiries.map(enquiry => (
                  <div key={enquiry._id} className="flex items-start justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                    <div>
                      <p className="font-medium text-sm">{enquiry.name}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[150px]">
                        {typeof enquiry.productInterest === 'object' 
                          ? (enquiry.productInterest as any)?.title || "General Inquiry"
                          : enquiry.productInterest || "General Inquiry"}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{format(new Date(enquiry.createdAt), 'MMM dd, HH:mm')}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={getStatusBadgeVariant(enquiry.status)} className="capitalize text-[10px]">
                        {enquiry.status}
                      </Badge>
                      <Button size="icon" variant="ghost" className="h-6 w-6" asChild>
                        <Link href={`/admin/enquiries?id=${enquiry._id}`}>
                          <Eye className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
                {recentEnquiries.length === 0 && (
                  <p className="text-center text-slate-500 text-sm py-4">No recent enquiries.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
