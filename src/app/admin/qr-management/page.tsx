"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  QrCode, 
  Download, 
  Printer, 
  ExternalLink, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  Copy, 
  Eye, 
  Activity, 
  Sparkles,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  Share2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function QrManagementPage() {
  const [qrs, setQrs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Create / Edit Dialog State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQr, setEditingQr] = useState<any>(null);
  const [name, setName] = useState("");
  const [shortSlug, setShortSlug] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [description, setDescription] = useState("");
  const [qrType, setQrType] = useState("dynamic");
  const [status, setStatus] = useState("active");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Test QR Preview Modal
  const [previewQr, setPreviewQr] = useState<any>(null);

  const fetchQrs = async () => {
    try {
      const res = await fetch("/api/qr");
      const data = await res.json();
      if (data.qrs) setQrs(data.qrs);
    } catch (err) {
      console.error("Failed to fetch QRs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQrs();
  }, []);

  const openCreateModal = () => {
    setEditingQr(null);
    setName("");
    setShortSlug("");
    setTargetUrl("/connect");
    setDescription("");
    setQrType("dynamic");
    setStatus("active");
    setIsModalOpen(true);
  };

  const openEditModal = (qr: any) => {
    setEditingQr(qr);
    setName(qr.name);
    setShortSlug(qr.shortSlug);
    setTargetUrl(qr.targetUrl);
    setDescription(qr.description || "");
    setQrType(qr.qrType || "dynamic");
    setStatus(qr.status || "active");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      if (editingQr) {
        // PUT update
        const res = await fetch(`/api/qr/${editingQr._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, targetUrl, description, status })
        });
        if (res.ok) {
          setMessage("QR Destination updated successfully! Existing printed QRs now redirect to the new target.");
          fetchQrs();
          setIsModalOpen(false);
        }
      } else {
        // POST create
        const res = await fetch("/api/qr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, shortSlug, targetUrl, description, qrType, status })
        });
        if (res.ok) {
          setMessage("New Dynamic QR generated successfully!");
          fetchQrs();
          setIsModalOpen(false);
        }
      }
    } catch {
      setMessage("Error saving QR code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this QR code?")) return;
    try {
      await fetch(`/api/qr/${id}`, { method: "DELETE" });
      fetchQrs();
    } catch (err) {
      console.error(err);
    }
  };

  const copyQrLink = (slug: string, id: string) => {
    const fullUrl = `${window.location.origin}/qr/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
          <p className="text-sm text-slate-500 font-medium">Loading Smart QR Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-brand-primary">
              Smart QR Management Hub
            </h1>
            <Badge className="bg-brand-accent text-white border-none font-bold text-xs">
              Dynamic & Reusable
            </Badge>
          </div>
          <p className="text-slate-500 text-sm mt-0.5">
            Manage permanent QR codes for visiting cards, leaflets, brochures, packaging, and exhibition banners.
          </p>
        </div>

        <Button
          onClick={openCreateModal}
          size="lg"
          className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold shadow-md shrink-0 px-5"
        >
          <Plus className="w-4 h-4 mr-2" /> Generate New Dynamic QR
        </Button>
      </div>

      {message && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* QR Codes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qrs.map((qr) => {
          const qrUrl = typeof window !== "undefined" ? `${window.location.origin}/qr/${qr.shortSlug}` : `https://kmengineeringworks.com/qr/${qr.shortSlug}`;
          const qrPngApiUrl = `/api/qr/generate?text=${encodeURIComponent(qrUrl)}&format=png&size=1000`;
          const qrSvgApiUrl = `/api/qr/generate?text=${encodeURIComponent(qrUrl)}&format=svg`;
          const isMain = qr.shortSlug === "connect";

          return (
            <Card key={qr._id} className={`overflow-hidden border-2 transition-all flex flex-col justify-between ${isMain ? "border-brand-primary shadow-md" : "border-slate-200"}`}>
              <div>
                
                {/* Card Top Header */}
                <div className={`p-4 border-b flex items-start justify-between gap-2 ${isMain ? "bg-brand-primary/5 border-brand-primary/20" : "bg-slate-50/70 border-slate-100"}`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-base leading-snug">
                        {qr.name}
                      </h3>
                    </div>
                    {isMain && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full mt-1">
                        ⭐ Primary Recommended QR
                      </span>
                    )}
                  </div>
                  <Badge variant={qr.status === "active" ? "default" : "secondary"} className={qr.status === "active" ? "bg-emerald-600" : ""}>
                    {qr.status}
                  </Badge>
                </div>

                {/* Center QR Preview Showcase */}
                <div className="p-6 flex flex-col items-center text-center space-y-4">
                  
                  {/* High-Resolution QR Card with KME Logo */}
                  <div className="relative p-4 bg-white rounded-2xl border-2 border-slate-100 shadow-md group">
                    <img 
                      src={qrPngApiUrl} 
                      alt={qr.name} 
                      className="w-44 h-44 object-contain rounded-lg"
                    />
                    
                    {/* Centered KME Gears Stamp Logo */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 bg-white rounded-lg p-1 shadow-md border border-slate-200 flex items-center justify-center">
                        <img src="/logo.png" alt="KME" className="w-full h-full object-contain" />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Short URL & Target */}
                  <div className="w-full space-y-1 text-left bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-semibold uppercase text-[10px]">Short URL:</span>
                      <button
                        onClick={() => copyQrLink(qr.shortSlug, qr._id)}
                        className="text-brand-primary hover:underline font-bold flex items-center gap-1 text-[11px]"
                      >
                        {copiedId === qr._id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        {copiedId === qr._id ? "Copied!" : "Copy Link"}
                      </button>
                    </div>
                    <div className="font-mono font-bold text-slate-800 break-all text-[11.5px]">
                      /qr/{qr.shortSlug}
                    </div>
                    
                    <div className="pt-1.5 border-t border-slate-200 text-slate-500">
                      <span className="text-[10px] uppercase font-semibold">Points to:</span>{" "}
                      <span className="font-semibold text-slate-700">{qr.targetUrl}</span>
                    </div>
                  </div>

                  {/* Scan Counter Metric */}
                  <div className="w-full flex items-center justify-between px-2 text-xs text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Activity className="w-3.5 h-3.5 text-brand-accent" /> Total Scans:
                    </span>
                    <span className="font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md font-mono text-sm">
                      {qr.scanCount || 0}
                    </span>
                  </div>

                </div>

              </div>

              {/* Bottom Actions Bar */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100 space-y-2">
                
                {/* Download High-Res PNG & Vector SVG */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-semibold border-slate-300 hover:bg-white"
                  >
                    <a href={qrPngApiUrl} download={`KM-QR-${qr.shortSlug}-300DPI.png`}>
                      <Download className="w-3.5 h-3.5 mr-1.5 text-brand-primary" /> PNG (300 DPI)
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-semibold border-slate-300 hover:bg-white"
                  >
                    <a href={qrSvgApiUrl} download={`KM-QR-${qr.shortSlug}-Vector.svg`}>
                      <Download className="w-3.5 h-3.5 mr-1.5 text-brand-accent" /> Vector SVG
                    </a>
                  </Button>
                </div>

                {/* Edit Destination & Test QR Buttons */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditModal(qr)}
                    className="text-xs font-semibold text-slate-700 hover:text-brand-primary hover:bg-slate-200/60"
                  >
                    <Edit3 className="w-3.5 h-3.5 mr-1.5" /> Edit Target
                  </Button>

                  <div className="flex items-center gap-1">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <a href={`/qr/${qr.shortSlug}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3.5 h-3.5 mr-1" /> Test Scan
                      </a>
                    </Button>

                    {!isMain && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(qr._id)}
                        className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </div>

              </div>

            </Card>
          );
        })}
      </div>

      {/* Modal: Create / Edit Dynamic QR Code */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 w-full max-w-lg shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-display font-bold text-xl text-slate-900">
                  {editingQr ? "Edit Dynamic QR Destination" : "Create New Dynamic QR Code"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {editingQr ? "Change where this printed QR code redirects without re-printing." : "Generate a permanent trackable QR code."}
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              
              <div className="space-y-1.5">
                <Label>QR Code Name / Purpose</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 2026 Exhibition Flex Banner QR"
                  required
                />
              </div>

              {!editingQr && (
                <div className="space-y-1.5">
                  <Label>Short URL Identifier (Permanent)</Label>
                  <div className="flex items-center">
                    <span className="bg-slate-100 text-slate-500 px-3 py-2 border border-r-0 rounded-l-md text-xs font-mono">
                      /qr/
                    </span>
                    <Input
                      value={shortSlug}
                      onChange={(e) => setShortSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
                      placeholder="exhibition-2026"
                      className="rounded-l-none font-mono"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">Once printed, this short URL remains permanent.</p>
                </div>
              )}

              <div className="space-y-1.5">
                <Label>Destination Target URL (Can be changed anytime)</Label>
                <Input
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="/connect or https://www.kmengineeringworks.com"
                  required
                />
                <p className="text-[11px] text-slate-400">Enter a page path (e.g. <code>/connect</code>, <code>/products</code>) or full external URL.</p>
              </div>

              <div className="space-y-1.5">
                <Label>Description / Usage Location (Optional)</Label>
                <Textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Printed on A4/A5 leaflets, visiting cards, and factory brochures..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {editingQr ? "Save Destination" : "Generate Dynamic QR"}
                </Button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
