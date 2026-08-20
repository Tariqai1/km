"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Loader2,
  Download,
  Eye,
  Edit3,
  MessageSquare,
  Phone,
  Mail,
  Building,
  Save,
  X,
  Inbox, // Added for Empty State
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { toast } from "sonner"; // Assuming you use sonner for toasts (shadcn default)
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

// Types
interface ProductInterest {
  title?: string;
}

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  productInterest: string | ProductInterest;
  message?: string;
  status: string;
  adminNotes?: string;
  createdAt: string;
}

// Helper to safely extract product name
const getProductName = (productInterest: Enquiry["productInterest"]): string => {
  if (typeof productInterest === "object" && productInterest !== null) {
    return productInterest.title || "General Inquiry";
  }
  if (typeof productInterest === "string" && productInterest.trim() !== "") {
    return productInterest;
  }
  return "General Inquiry";
};

export default function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isExporting, setIsExporting] = useState(false);

  // Sheet & Edit States
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    productInterest: "",
    status: "new",
    message: "",
    adminNotes: "",
  });

  const fetchEnquiries = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/enquiries");
      if (!res.ok) throw new Error("Failed to fetch data");
      
      const data = await res.json();
      setEnquiries(data.enquiries || data);
    } catch (error) {
      console.error("Failed to fetch enquiries:", error);
      toast.error("Failed to load enquiries. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const openEnquirySheet = (enquiry: Enquiry, editMode: boolean = false) => {
    setSelectedEnquiry(enquiry);
    setFormData({
      name: enquiry.name || "",
      email: enquiry.email || "",
      phone: enquiry.phone || "",
      company: enquiry.company || "",
      productInterest: getProductName(enquiry.productInterest),
      status: enquiry.status || "new",
      message: enquiry.message || "",
      adminNotes: enquiry.adminNotes || "",
    });
    setIsEditing(editMode);
    setIsSheetOpen(true);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    // Optimistic update
    const previousEnquiries = [...enquiries];
    setEnquiries((prev) =>
      prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
    );

    if (selectedEnquiry?._id === id) {
      setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      setFormData((prev) => ({ ...prev, status: newStatus }));
    }

    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!res.ok) throw new Error("Failed to update status");
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Failed to update status.");
      // Revert optimistic update on failure
      setEnquiries(previousEnquiries);
    }
  };

  const handleSaveEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save enquiry");

      const updatedEnquiry = { ...selectedEnquiry, ...formData } as Enquiry;
      
      setEnquiries((prev) =>
        prev.map((item) => (item._id === selectedEnquiry._id ? updatedEnquiry : item))
      );
      
      setSelectedEnquiry(updatedEnquiry);
      setIsEditing(false);
      toast.success("Enquiry updated successfully!");
    } catch (error) {
      console.error("Save enquiry error:", error);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      setIsExporting(true);
      const res = await fetch("/api/admin/enquiries/export");
      if (!res.ok) throw new Error("Export failed");
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `enquiries-${format(new Date(), "yyyy-MM-dd")}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      toast.success("CSV Exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export CSV.");
    } finally {
      setIsExporting(false);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const prodName = getProductName(e.productInterest).toLowerCase();
    const query = searchQuery.toLowerCase();
    
    const matchesSearch =
      e.name.toLowerCase().includes(query) ||
      e.email.toLowerCase().includes(query) ||
      e.phone.includes(query) ||
      prodName.includes(query);

    const matchesTab = activeTab === "all" || e.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "new": return "default";
      case "in-progress": return "secondary";
      case "contacted": return "outline";
      case "archived": return "destructive"; // Changed to red/destructive for archived
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-brand-primary">Enquiries</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage leads and customer requests.</p>
        </div>
        <Button 
          onClick={handleExportCSV} 
          variant="outline" 
          disabled={isExporting || enquiries.length === 0}
          className="shrink-0 border-slate-300 shadow-sm"
        >
          {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
          Export CSV
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-5">
        
        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full lg:w-auto">
            <TabsList className="w-full sm:w-auto justify-start overflow-x-auto h-10">
              <TabsTrigger value="all">All Leads</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="contacted">Contacted</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full lg:max-w-sm shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search name, email, product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-slate-50 focus-visible:bg-white transition-colors"
            />
            {searchQuery && (
               <X 
                 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" 
                 onClick={() => setSearchQuery("")}
               />
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Product Interest</TableHead>
                <TableHead className="w-[150px]">Status</TableHead>
                <TableHead className="text-right w-[180px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Skeleton Loader
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><div className="h-4 w-20 bg-slate-100 animate-pulse rounded" /></TableCell>
                    <TableCell>
                      <div className="h-4 w-32 bg-slate-100 animate-pulse rounded mb-2" />
                      <div className="h-3 w-24 bg-slate-50 animate-pulse rounded" />
                    </TableCell>
                    <TableCell><div className="h-4 w-28 bg-slate-100 animate-pulse rounded" /></TableCell>
                    <TableCell><div className="h-8 w-24 bg-slate-100 animate-pulse rounded-md" /></TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                       <div className="h-8 w-16 bg-slate-100 animate-pulse rounded-md" />
                       <div className="h-8 w-16 bg-slate-100 animate-pulse rounded-md" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredEnquiries.length === 0 ? (
                // Beautiful Empty State
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                        <Inbox className="h-6 w-6 text-slate-400" />
                      </div>
                      <p className="text-base font-medium text-slate-900">No enquiries found</p>
                      <p className="text-sm mt-1">
                        {searchQuery ? "Try adjusting your search filters." : "You're all caught up!"}
                      </p>
                      {searchQuery && (
                        <Button variant="link" onClick={() => setSearchQuery("")} className="mt-2">
                          Clear Search
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                // Data Rows
                filteredEnquiries.map((enquiry) => (
                  <TableRow key={enquiry._id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="text-sm whitespace-nowrap text-slate-600">
                      {format(new Date(enquiry.createdAt), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-slate-900">{enquiry.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{enquiry.phone}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal bg-white">
                        {getProductName(enquiry.productInterest)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={enquiry.status}
                        onValueChange={(val) => handleStatusChange(enquiry._id, val)}
                      >
                        <SelectTrigger className="h-8 text-xs bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                          onClick={() => openEnquirySheet(enquiry, false)}
                        >
                          <Eye className="h-4 w-4 sm:mr-1" /> <span className="hidden sm:inline">View</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => openEnquirySheet(enquiry, true)}
                        >
                          <Edit3 className="h-4 w-4 sm:mr-1" /> <span className="hidden sm:inline">Edit</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Global Controlled Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto border-l-0 sm:border-l">
          {selectedEnquiry && (
            <div className="space-y-6 mt-4">
              <SheetHeader>
                <div className="flex items-center justify-between pr-6">
                  <SheetTitle className="text-xl">
                    {isEditing ? "Edit Enquiry" : "Enquiry Details"}
                  </SheetTitle>
                  <Button
                    type="button"
                    variant={isEditing ? "ghost" : "outline"}
                    size="sm"
                    className="h-8"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <><X className="h-4 w-4 mr-1" /> Cancel</>
                    ) : (
                      <><Edit3 className="h-4 w-4 mr-1" /> Edit</>
                    )}
                  </Button>
                </div>
                <SheetDescription>
                  Submitted on {format(new Date(selectedEnquiry.createdAt), "PPP 'at' p")}
                </SheetDescription>
              </SheetHeader>

              {isEditing ? (
                /* Editable Form Mode */
                <form onSubmit={handleSaveEnquiry} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700">Full Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={isSaving}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700">Phone</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        disabled={isSaving}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={isSaving}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700">Company / Location</label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company name"
                        disabled={isSaving}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700">Status</label>
                      <Select
                        value={formData.status}
                        onValueChange={(val) => setFormData({ ...formData, status: val })}
                      
                      >
                        <SelectTrigger disabled={isSaving}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700">Product Interest</label>
                    <Input
                      value={formData.productInterest}
                      onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                      disabled={isSaving}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700">Customer Message</label>
                    <Textarea
                      rows={3}
                      className="resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={isSaving}
                    />
                  </div>

                  <div className="space-y-1.5 pt-4 border-t border-slate-100">
                    <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5" /> Admin Notes (Internal)
                    </label>
                    <Textarea
                      rows={4}
                      className="bg-amber-50/30 resize-none"
                      placeholder="Add internal notes about this lead..."
                      value={formData.adminNotes}
                      onChange={(e) => setFormData({ ...formData, adminNotes: e.target.value })}
                      disabled={isSaving}
                    />
                  </div>

                  <Button type="submit" disabled={isSaving} className="w-full mt-6">
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    {isSaving ? "Saving Changes..." : "Save Changes"}
                  </Button>
                </form>
              ) : (
                /* Read-Only View Mode */
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Status</p>
                      <Badge variant={getStatusBadgeVariant(selectedEnquiry.status)} className="capitalize px-2.5 py-0.5">
                        {selectedEnquiry.status.replace("-", " ")}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Product</p>
                      <p className="font-medium text-sm text-slate-900">
                        {getProductName(selectedEnquiry.productInterest)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-900 border-b pb-2">Contact Details</h3>
                    <div className="grid gap-4 pt-1">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                          <Eye className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-500 font-medium">NAME</p>
                          <p className="font-medium text-slate-900">{selectedEnquiry.name}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                          <Phone className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-500 font-medium">PHONE</p>
                          <a href={`tel:${selectedEnquiry.phone}`} className="font-medium text-emerald-700 hover:underline">
                            {selectedEnquiry.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-full bg-purple-50 flex items-center justify-center shrink-0 mt-0.5">
                          <Mail className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-500 font-medium">EMAIL</p>
                          <a href={`mailto:${selectedEnquiry.email}`} className="font-medium text-purple-700 hover:underline break-all">
                            {selectedEnquiry.email}
                          </a>
                        </div>
                      </div>

                      {selectedEnquiry.company && (
                        <div className="flex items-start gap-3">
                          <div className="h-9 w-9 rounded-full bg-orange-50 flex items-center justify-center shrink-0 mt-0.5">
                            <Building className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-[11px] text-slate-500 font-medium">COMPANY / LOCATION</p>
                            <p className="font-medium text-slate-900">{selectedEnquiry.company}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedEnquiry.message && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-slate-900 border-b pb-2">Message</h3>
                      <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {selectedEnquiry.message}
                      </div>
                    </div>
                  )}

                  {selectedEnquiry.adminNotes && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-slate-900 border-b pb-2 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-amber-600" /> Internal Notes
                      </h3>
                      <div className="bg-amber-50/60 border border-amber-100 p-4 rounded-lg text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                        {selectedEnquiry.adminNotes}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}