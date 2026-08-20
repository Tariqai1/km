"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { 
  Loader2, 
  Save, 
  Paintbrush, 
  Building2, 
  Type, 
  Image as ImageIcon,
  BarChart3, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  Eye,
  Plus,
  Trash2
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"branding" | "hero" | "stats" | "contact">("branding");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Settings State
  const [companyName, setCompanyName] = useState("");
  const [logoImages, setLogoImages] = useState<{url: string, cloudinaryId: string}[]>([]);
  const [heroBannerImages, setHeroBannerImages] = useState<{url: string, cloudinaryId: string}[]>([]);
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSubheading, setHeroSubheading] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#1B365D");
  const [accentColor, setAccentColor] = useState("#E8590C");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [companyStats, setCompanyStats] = useState<{value: string, label: string}[]>([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setCompanyName(data.companyName || "");
          if (data.logoUrl) {
            setLogoImages([{ url: data.logoUrl, cloudinaryId: data.logoUrl }]);
          }
          if (data.heroBannerUrl) {
            setHeroBannerImages([{ url: data.heroBannerUrl, cloudinaryId: data.heroBannerUrl }]);
          }
          setHeroHeading(data.heroHeading || "");
          setHeroSubheading(data.heroSubheading || "");
          setPrimaryColor(data.primaryColor || "#1B365D");
          setAccentColor(data.accentColor || "#E8590C");
          setContactEmail(data.contactEmail || "");
          setContactPhone(data.contactPhone || "");
          setContactAddress(data.contactAddress || "");
          if (data.companyStats && Array.isArray(data.companyStats)) {
            setCompanyStats(data.companyStats);
          }
        }
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          logoUrl: logoImages.length > 0 ? logoImages[0].url : "",
          heroBannerUrl: heroBannerImages.length > 0 ? heroBannerImages[0].url : "",
          heroHeading,
          heroSubheading,
          primaryColor,
          accentColor,
          contactEmail,
          contactPhone,
          contactAddress,
          companyStats
        }),
      });

      if (res.ok) {
        setSuccess("Settings updated successfully! Changes are live across the website.");
        setTimeout(() => setSuccess(""), 4000);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update settings");
      }
    } catch (err) {
      setError("An unexpected error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
          <p className="text-sm text-slate-500 font-medium">Loading settings...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "branding", label: "Branding & Identity", icon: Building2, desc: "Company name, logo & theme colors" },
    { id: "hero", label: "Hero & Homepage Banner", icon: ImageIcon, desc: "Main heading, subheading & banner image" },
    { id: "stats", label: "Company Stats & Metrics", icon: BarChart3, desc: "Homepage counter statistics" },
    { id: "contact", label: "Contact Information", icon: MapPin, desc: "Email, phone & factory address" },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Sticky Header with Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs sticky top-0 z-30">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-brand-primary">Website Settings</h1>
          <p className="text-slate-500 text-sm mt-0.5">Customize your brand identity, colors, and live homepage content.</p>
        </div>
        <Button 
          onClick={handleSubmit} 
          size="lg" 
          disabled={isSubmitting}
          className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold shadow-md shrink-0 h-11 px-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Save All Settings
            </>
          )}
        </Button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm flex items-center gap-2">
          <span className="font-bold">Error:</span> {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 text-sm flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-medium">{success}</span>
        </div>
      )}

      {/* Section-Wise Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs lg:sticky lg:top-28">
          <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Configuration Sections
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left p-3.5 rounded-xl transition-all flex items-start gap-3.5 ${
                  isActive 
                    ? "bg-brand-primary text-white shadow-sm font-medium" 
                    : "hover:bg-slate-100 text-slate-700"
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-sm font-semibold ${isActive ? "text-white" : "text-slate-900"}`}>
                    {item.label}
                  </div>
                  <div className={`text-xs mt-0.5 line-clamp-1 ${isActive ? "text-white/80" : "text-slate-500"}`}>
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. BRANDING & IDENTITY */}
          {activeTab === "branding" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-brand-primary" /> Company Identity
                  </CardTitle>
                  <CardDescription>Configure your business name and high-resolution logo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company / Brand Name</Label>
                    <Input 
                      id="companyName" 
                      value={companyName} 
                      onChange={(e) => setCompanyName(e.target.value)} 
                      placeholder="K.M. Engineering Works"
                      className="h-11 font-medium"
                      required 
                    />
                    <p className="text-xs text-slate-500">Appears in header, footer, SEO titles, and invoices.</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <Label>Company Logo</Label>
                    <p className="text-xs text-slate-500 mb-2">Recommended: Transparent PNG, 250x80px ratio.</p>
                    <ImageUploader 
                      images={logoImages} 
                      onChange={setLogoImages} 
                      maxImages={1} 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Paintbrush className="w-5 h-5 text-brand-primary" /> Brand Theme Colors
                  </CardTitle>
                  <CardDescription>Live palette that applies across all buttons, headings, and navbar highlights.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2 p-4 rounded-xl border border-slate-100 bg-slate-50">
                      <Label htmlFor="primaryColor" className="font-semibold text-slate-800">Primary Brand Color</Label>
                      <div className="flex items-center gap-3 pt-1">
                        <Input 
                          type="color" 
                          id="primaryColor" 
                          value={primaryColor} 
                          onChange={(e) => setPrimaryColor(e.target.value)} 
                          className="w-12 h-10 p-1 cursor-pointer rounded-lg shrink-0"
                        />
                        <Input 
                          value={primaryColor} 
                          onChange={(e) => setPrimaryColor(e.target.value)} 
                          className="font-mono text-sm uppercase bg-white"
                        />
                      </div>
                      <p className="text-xs text-slate-500">Used for headers, dark cards, and main buttons.</p>
                    </div>

                    <div className="space-y-2 p-4 rounded-xl border border-slate-100 bg-slate-50">
                      <Label htmlFor="accentColor" className="font-semibold text-slate-800">Accent Action Color</Label>
                      <div className="flex items-center gap-3 pt-1">
                        <Input 
                          type="color" 
                          id="accentColor" 
                          value={accentColor} 
                          onChange={(e) => setAccentColor(e.target.value)} 
                          className="w-12 h-10 p-1 cursor-pointer rounded-lg shrink-0"
                        />
                        <Input 
                          value={accentColor} 
                          onChange={(e) => setAccentColor(e.target.value)} 
                          className="font-mono text-sm uppercase bg-white"
                        />
                      </div>
                      <p className="text-xs text-slate-500">Used for CTA quote buttons, highlights, and icons.</p>
                    </div>
                  </div>

                  {/* Live Mini Color Swatch */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-600">Live Button Preview:</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        type="button" 
                        style={{ backgroundColor: primaryColor }}
                        className="px-4 py-1.5 rounded-lg text-white text-xs font-semibold shadow-xs"
                      >
                        Primary Action
                      </button>
                      <button 
                        type="button" 
                        style={{ backgroundColor: accentColor }}
                        className="px-4 py-1.5 rounded-lg text-white text-xs font-semibold shadow-xs"
                      >
                        Get a Quote
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 2. HERO & HOMEPAGE BANNER */}
          {activeTab === "hero" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="w-5 h-5 text-brand-primary" /> Hero Text & Headlines
                  </CardTitle>
                  <CardDescription>The very first text that prospective buyers see on your landing page.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="heroHeading">Main Hero Heading</Label>
                    <Textarea 
                      id="heroHeading" 
                      value={heroHeading} 
                      onChange={(e) => setHeroHeading(e.target.value)} 
                      placeholder="e.g. Precision-Engineered Machinery for Modern Industry"
                      className="min-h-[80px] font-medium leading-relaxed"
                      required 
                    />
                    <p className="text-xs text-slate-500">Keep it bold and punchy (1-2 sentences).</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heroSubheading">Subheading & Value Proposition</Label>
                    <Textarea 
                      id="heroSubheading" 
                      value={heroSubheading} 
                      onChange={(e) => setHeroSubheading(e.target.value)} 
                      placeholder="e.g. Mumbai's trusted manufacturer of high-quality, durable machinery..."
                      className="min-h-[100px] leading-relaxed"
                      required 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-brand-primary" /> Hero Banner Image
                  </CardTitle>
                  <CardDescription>The showcase banner image displayed on the homepage hero section.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ImageUploader 
                    images={heroBannerImages} 
                    onChange={setHeroBannerImages} 
                    maxImages={1} 
                  />
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-800 space-y-1">
                    <p className="font-semibold">💡 Optimal Banner Dimensions:</p>
                    <p>Resolution: <strong>1200 x 800 px</strong> or <strong>16:10 aspect ratio</strong>. Clean high-contrast factory or machine photos look best.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 3. COMPANY STATS */}
          {activeTab === "stats" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-brand-primary" /> Key Company Milestones
                      </CardTitle>
                      <CardDescription>Credibility metrics displayed in the counter section.</CardDescription>
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCompanyStats([...companyStats, { value: "", label: "" }])}
                      className="border-slate-300"
                    >
                      <Plus className="w-4 h-4 mr-1.5" /> Add Metric
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {companyStats.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-sm">
                      No metrics added. Click &quot;Add Metric&quot; to create one.
                    </div>
                  ) : (
                    companyStats.map((stat, idx) => (
                      <div key={idx} className="flex gap-4 items-center p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="w-1/3 space-y-1.5">
                          <Label className="text-xs text-slate-500">Value (e.g. 15+, 500+)</Label>
                          <Input 
                            value={stat.value}
                            placeholder="500+"
                            onChange={(e) => {
                              const newStats = [...companyStats];
                              newStats[idx].value = e.target.value;
                              setCompanyStats(newStats);
                            }}
                            className="bg-white font-bold text-brand-accent"
                          />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <Label className="text-xs text-slate-500">Label (e.g. Machines Delivered)</Label>
                          <Input 
                            value={stat.label}
                            placeholder="Machines Delivered"
                            onChange={(e) => {
                              const newStats = [...companyStats];
                              newStats[idx].label = e.target.value;
                              setCompanyStats(newStats);
                            }}
                            className="bg-white"
                          />
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          className="mt-5 text-slate-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => {
                            const newStats = companyStats.filter((_, i) => i !== idx);
                            setCompanyStats(newStats);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* 4. CONTACT & BUSINESS INFO */}
          {activeTab === "contact" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-brand-primary" /> Contact & Location Details
                  </CardTitle>
                  <CardDescription>Displayed in the Contact Us page, footer, and schema metadata.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Official Email</Label>
                      <Input 
                        id="contactEmail" 
                        type="email"
                        value={contactEmail} 
                        onChange={(e) => setContactEmail(e.target.value)} 
                        placeholder="info@kmengineering.com"
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Sales & Inquiry Phone</Label>
                      <Input 
                        id="contactPhone" 
                        value={contactPhone} 
                        onChange={(e) => setContactPhone(e.target.value)} 
                        placeholder="+91 98765 43210"
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactAddress">Factory & Office Address</Label>
                    <Textarea 
                      id="contactAddress" 
                      value={contactAddress} 
                      onChange={(e) => setContactAddress(e.target.value)} 
                      placeholder="Gala No.58, Azmi Compound, Near Kwality Bakery, Mumbai - 400072"
                      className="min-h-[90px]"
                      required 
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
