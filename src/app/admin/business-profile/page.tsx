"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Loader2, 
  Save, 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare, 
  UserPlus, 
  Globe, 
  FileText, 
  Package, 
  MapPin, 
  Share2, 
  Award,
  ExternalLink,
  Smartphone,
  Plus,
  Trash2
} from "lucide-react";

export default function BusinessProfileEditor() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/company-profile")
      .then(res => res.json())
      .then(data => {
        if (data.profile) setProfile(data.profile);
      })
      .catch(err => setError("Failed to load profile"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/company-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });

      if (res.ok) {
        setSuccess("Digital Business Profile & Feature Toggles updated successfully!");
        setTimeout(() => setSuccess(""), 4000);
      } else {
        setError("Failed to save changes.");
      }
    } catch {
      setError("An unexpected error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setProfile((prev: any) => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
          <p className="text-sm text-slate-500 font-medium">Loading Digital Profile settings...</p>
        </div>
      </div>
    );
  }

  const toggles = [
    { key: "showWhatsapp", label: "WhatsApp Chat Button", icon: MessageSquare, desc: "Direct WhatsApp link to +91 9821669131" },
    { key: "showCall", label: "Click-to-Call Button", icon: PhoneCall, desc: "Direct phone dialer for Primary & Secondary lines" },
    { key: "showSaveContact", label: "Save Contact (vCard)", icon: UserPlus, desc: "1-tap download of .vcf contact into mobile address book" },
    { key: "showWebsite", label: "Official Website Link", icon: Globe, desc: "Opens www.kmengineeringworks.com" },
    { key: "showCatalogue", label: "Product Catalogue Link", icon: Package, desc: "Direct link to machinery catalogue" },
    { key: "showCompanyProfile", label: "Company Profile PDF", icon: FileText, desc: "View/download official company brochure" },
    { key: "showDirections", label: "Factory Google Maps", icon: MapPin, desc: "Sakinaka, Mumbai factory directions" },
    { key: "showShareProfile", label: "Share Profile Button", icon: Share2, desc: "Native mobile share sheet trigger" },
    { key: "showAgmBanner", label: "AGM Goa 2026 Highlight", icon: Award, desc: "Sponsor banner for 1st AGM of Tutti Frutti Association" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Sticky Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs sticky top-0 z-30">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-brand-primary">Digital Profile & Feature Toggles</h1>
          <p className="text-slate-500 text-sm mt-0.5">Control every button, contact detail, and feature visible on <code className="bg-slate-100 text-brand-accent px-1.5 py-0.5 rounded font-mono font-bold">/connect</code></p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-slate-300 font-semibold"
          >
            <a href="/connect" target="_blank" rel="noopener noreferrer">
              <Smartphone className="w-4 h-4 mr-2 text-brand-accent" /> Live Preview
            </a>
          </Button>
          <Button 
            onClick={handleSave} 
            size="lg" 
            disabled={isSaving}
            className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold shadow-md shrink-0 px-6"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Profile
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Feature Toggles & Form Fields */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. ON / OFF FEATURE SWITCHES */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-brand-primary" /> Feature On / Off Control Switches
              </CardTitle>
              <CardDescription>Instantly show or hide specific buttons on the public mobile profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {toggles.map((item) => {
                  const Icon = item.icon;
                  const isChecked = profile[item.key] !== false;
                  return (
                    <div
                      key={item.key}
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                        isChecked ? "bg-white border-slate-200 shadow-2xs" : "bg-slate-50 border-slate-200 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3 pr-2">
                        <div className={`p-2 rounded-lg ${isChecked ? "bg-brand-primary/10 text-brand-primary" : "bg-slate-200 text-slate-400"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{item.label}</div>
                          <div className="text-[10px] text-slate-500 leading-tight">{item.desc}</div>
                        </div>
                      </div>
                      
                      {/* Toggle Switch */}
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => updateField(item.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 2. CONTACT DETAILS & DIRECT LINES */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-brand-primary" /> Verified Contact Information
              </CardTitle>
              <CardDescription>The primary contact person, phone lines, and WhatsApp configuration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Contact Person</Label>
                  <Input 
                    value={profile.contactPerson || ""} 
                    onChange={(e) => updateField("contactPerson", e.target.value)}
                    placeholder="Abdul Kaleem Sayyed"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Designation / Title</Label>
                  <Input 
                    value={profile.designation || ""} 
                    onChange={(e) => updateField("designation", e.target.value)}
                    placeholder="Founder & Managing Director"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Primary Phone Line</Label>
                  <Input 
                    value={profile.phones?.[0]?.number || ""} 
                    onChange={(e) => {
                      const updated = [...(profile.phones || [])];
                      if (!updated[0]) updated[0] = { number: "", label: "Primary Sales", isPrimary: true };
                      updated[0].number = e.target.value;
                      updateField("phones", updated);
                    }}
                    placeholder="+91-9821669131"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Secondary Phone Line (Optional)</Label>
                  <Input 
                    value={profile.phones?.[1]?.number || ""} 
                    onChange={(e) => {
                      const updated = [...(profile.phones || [])];
                      if (!updated[1]) updated[1] = { number: "", label: "Works & Support", isPrimary: false };
                      updated[1].number = e.target.value;
                      updateField("phones", updated);
                    }}
                    placeholder="+91-8828489550"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>WhatsApp Number (with country code)</Label>
                  <Input 
                    value={profile.whatsappNumber || ""} 
                    onChange={(e) => updateField("whatsappNumber", e.target.value)}
                    placeholder="+919821669131"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Official Email</Label>
                  <Input 
                    value={profile.email || ""} 
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="kmengineering1973@gmail.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Default WhatsApp Message</Label>
                <Textarea 
                  rows={2}
                  value={profile.defaultWhatsappMessage || ""} 
                  onChange={(e) => updateField("defaultWhatsappMessage", e.target.value)}
                  placeholder="Hello K.M. Engineering Works, I would like to know more about your food processing machinery..."
                />
              </div>
            </CardContent>
          </Card>

          {/* 3. FACTORY LOCATION & MAPS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-primary" /> Factory Works Address & Google Maps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Physical Factory Address</Label>
                <Textarea 
                  rows={2}
                  value={profile.address || ""} 
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="Workshop No. 58, Near Kwality Bakery, Azmi Compound, Khairani Road, Sakinaka, Mumbai – 400072"
                />
              </div>

              <div className="space-y-1.5">
                <Label>Google Maps Directions Link</Label>
                <Input 
                  value={profile.googleMapsUrl || ""} 
                  onChange={(e) => updateField("googleMapsUrl", e.target.value)}
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Col: Live Mobile Mockup Preview */}
        <div className="lg:col-span-4 sticky top-28 space-y-4">
          <div className="bg-slate-900 text-white rounded-3xl p-4 border border-slate-800 shadow-2xl space-y-3 max-w-sm mx-auto">
            
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-brand-accent" /> Live Card Preview
              </span>
              <a href="/connect" target="_blank" className="text-blue-400 hover:underline flex items-center gap-0.5">
                Open <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            {/* Mini Mobile Preview Box */}
            <div className="bg-slate-950 rounded-2xl p-4 text-center space-y-3 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-white p-1 mx-auto shadow-md">
                <img src="/logo.png" alt="KME Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">{profile.companyName || "K.M. Engineering Works"}</h4>
                <p className="text-[10px] text-brand-accent uppercase font-semibold">{profile.tagline || "Food Machinery Specialist"}</p>
                <p className="text-[10px] text-slate-400 mt-1">{profile.contactPerson} ({profile.designation})</p>
              </div>

              {/* Active Button Pills */}
              <div className="space-y-1.5 pt-2">
                {profile.showWhatsapp !== false && (
                  <div className="p-2 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Us
                  </div>
                )}
                {profile.showCall !== false && (
                  <div className="p-2 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-2">
                    <PhoneCall className="w-3.5 h-3.5" /> Call Now ({profile.phones?.[0]?.number || "+91-9821669131"})
                  </div>
                )}
                {profile.showSaveContact !== false && (
                  <div className="p-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold flex items-center justify-center gap-2">
                    <UserPlus className="w-3.5 h-3.5 text-brand-accent" /> Save Contact (.vcf)
                  </div>
                )}
              </div>
            </div>

            <div className="text-[11px] text-slate-400 text-center">
              All toggle changes update instantly on <strong className="text-white">/connect</strong>.
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
