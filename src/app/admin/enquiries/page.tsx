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
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
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

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  productInterest: string | { title?: string };
  message?: string;
  status: string;
  adminNotes?: string;
  createdAt: string;
}

export default function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Sheet & Edit States
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  
  // Form State for Editing
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
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || data);
      }
    } catch (error) {
      console.error("Failed to fetch enquiries:", error);
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
      productInterest: typeof enquiry.productInterest === "object" 
        ? (enquiry.productInterest as any)?.title || "" 
        : enquiry.productInterest || "",
      status: enquiry.status || "new",
      message: enquiry.message || "",
      adminNotes: enquiry.adminNotes || "",
    });
    setIsEditing(editMode);
    setIsSheetOpen(true);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    // Optimistic update
    setEnquiries((prev) =>
      prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
    );
    if (selectedEnquiry && selectedEnquiry._id === id) {
      setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      setFormData((prev) => ({ ...prev, status: newStatus }));
    }

    try {
      await fetch(`/api/admin/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error("Status update error:", error);
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

      if (res.ok) {
        const updated = { ...selectedEnquiry, ...formData };
        setEnquiries((prev) =>
          prev.map((item) => (item._id === selectedEnquiry._id ? (updated as Enquiry) : item))
        );
        setSelectedEnquiry(updated as Enquiry);
        setIsEditing(false);
      } else {
        console.error("Failed to save enquiry update");
      }
    } catch (error) {
      console.error("Save enquiry error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await fetch("/api/admin/enquiries/export");
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `enquiries-${format(new Date(), "yyyy-MM-dd")}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const prod = typeof e.productInterest === "object" 
      ? (e.productInterest as any)?.title || "" 
      : e.productInterest || "";
    
    const matchesSearch =
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.includes(searchQuery) ||
      prod.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === "all" || e.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "new": return "default";
      case "in-progress": return "secondary";
      case "contacted": return "outline";
      case "archived": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-brand-primary">Enquiries</h1>
          <p className="text-slate-500 mt-1">Manage leads and customer requests.</p>
        </div>
        <Button onClick={handleExportCSV} variant="outline" className="shrink-0 border-slate-300">
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
            <TabsList className="w-full justify-start overflow-x-auto h-auto py-1">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="contacted">Contacted</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full sm:max-w-xs shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="py-12 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto border rounded-lg">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Product Interest</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                      No enquiries match your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEnquiries.map((enquiry) => (
                    <TableRow key={enquiry._id}>
                      <TableCell className="text-sm whitespace-nowrap">
                        {format(new Date(enquiry.createdAt), "dd MMM yyyy")}
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-brand-primary">{enquiry.name}</p>
                        <p className="text-xs text-slate-500">{enquiry.phone}</p>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">
                          {typeof enquiry.productInterest === "object"
                            ? (enquiry.productInterest as any)?.title
                            : enquiry.productInterest}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={enquiry.status}
                          onValueChange={(val) => handleStatusChange(enquiry._id, val)}
                        >
                          <SelectTrigger className="w-[130px] h-8 text-xs">
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
                      <TableCell className="text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-600 hover:text-slate-900"
                          onClick={() => openEnquirySheet(enquiry, false)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-brand-accent hover:text-brand-accent/80 hover:bg-brand-accent/10"
                          onClick={() => openEnquirySheet(enquiry, true)}
                        >
                          <Edit3 className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Global Controlled Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          {selectedEnquiry && (
            <div className="space-y-6">
              <SheetHeader>
                <div className="flex items-center justify-between pr-4">
                  <SheetTitle className="text-2xl text-brand-primary">
                    {isEditing ? "Edit Enquiry" : "Enquiry Details"}
                  </SheetTitle>
                  <Button
                    type="button"
                    variant={isEditing ? "ghost" : "outline"}
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <>
                        <X className="h-4 w-4 mr-1" /> Cancel Edit
                      </>
                    ) : (
                      <>
                        <Edit3 className="h-4 w-4 mr-1" /> Edit
                      </>
                    )}
                  </Button>
                </div>
                <SheetDescription>
                  Submitted on {format(new Date(selectedEnquiry.createdAt), "PPP p")}
                </SheetDescription>
              </SheetHeader>

              {isEditing ? (
                /* Editable Form Mode */
                <form onSubmit={handleSaveEnquiry} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">Full Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-600">Phone</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-600">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-600">Company / Location</label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-600">Status</label>
                      <Select
                        value={formData.status}
                        onValueChange={(val) => setFormData({ ...formData, status: val })}
                      >
                        <SelectTrigger>
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
                    <label className="text-xs font-medium text-slate-600">Product Interest</label>
                    <Input
                      value={formData.productInterest}
                      onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">Customer Message</label>
                    <Textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5 pt-2 border-t">
                    <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5" /> Admin Notes
                    </label>
                    <Textarea
                      rows={4}
                      placeholder="Add internal notes about this lead..."
                      value={formData.adminNotes}
                      onChange={(e) => setFormData({ ...formData, adminNotes: e.target.value })}
                    />
                  </div>

                  <Button type="submit" disabled={isSaving} className="w-full bg-brand-primary mt-4">
                    {isSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                  </Button>
                </form>
              ) : (
                /* Read-Only View Mode */
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <div>
                      <p className="text-xs text-slate-500 font-medium mb-1">Status</p>
                      <Badge variant={getStatusBadgeVariant(selectedEnquiry.status)} className="capitalize">
                        {selectedEnquiry.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium mb-1">Product</p>
                      <p className="font-medium text-sm">
                        {typeof selectedEnquiry.productInterest === "object"
                          ? (selectedEnquiry.productInterest as any)?.title
                          : selectedEnquiry.productInterest}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-brand-primary border-b pb-2">Contact Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <Eye className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Name</p>
                          <p className="font-medium">{selectedEnquiry.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                          <Phone className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Phone</p>
                          <a href={`tel:${selectedEnquiry.phone}`} className="font-medium hover:underline text-brand-primary">
                            {selectedEnquiry.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                          <Mail className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Email</p>
                          <a href={`mailto:${selectedEnquiry.email}`} className="font-medium hover:underline text-brand-primary">
                            {selectedEnquiry.email}
                          </a>
                        </div>
                      </div>

                      {selectedEnquiry.company && (
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                            <Building className="h-4 w-4 text-brand-accent" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Company / Location</p>
                            <p className="font-medium">{selectedEnquiry.company}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedEnquiry.message && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-brand-primary border-b pb-2">Message</h3>
                      <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 whitespace-pre-wrap">
                        {selectedEnquiry.message}
                      </div>
                    </div>
                  )}

                  {selectedEnquiry.adminNotes && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-brand-primary border-b pb-2 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" /> Admin Notes
                      </h3>
                      <div className="bg-amber-50/60 border border-amber-100 p-4 rounded-lg text-sm text-slate-700 whitespace-pre-wrap">
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