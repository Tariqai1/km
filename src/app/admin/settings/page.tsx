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
  Plus,
  Trash2,
  BookOpen,
  Award,
  Factory,
  Cog
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"branding" | "hero" | "about" | "stats" | "contact">("branding");
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

  // About Page State
  const [aboutHeading, setAboutHeading] = useState("Pioneering Precision in Food Processing Machinery");
  const [aboutStory, setAboutStory] = useState("");
  const [founderName, setFounderName] = useState("Abdulkaleem Abdulkadar Sayyed");
  const [founderTitle, setFounderTitle] = useState("Founder & Managing Director");
  const [founderQuote, setFounderQuote] = useState("");
  const [aboutHighlights, setAboutHighlights] = useState<{title: string, desc: string}[]>([
    { title: "15+ Years Industry Experience", desc: "Deep domain expertise in designing and manufacturing robust food processing machinery." },
    { title: "100% Food-Grade Metallurgy", desc: "All product contact parts fabricated exclusively in certified SS-304 & SS-316 stainless steel." },
    { title: "Custom Machinery Design", desc: "Bespoke engineering solutions tailored to your production volume, layout, and raw material." },
    { title: "Pan-India Installation & Support", desc: "On-site installation, technician training, and guaranteed availability of OEM spare parts." }
  ]);
  const [machineryCapabilities, setMachineryCapabilities] = useState<{title: string, desc: string, capacity: string}[]>([
    { title: "Tutti Frutti Processing Plants", desc: "Complete automatic dicing, cubing, boiling, sugar syrup impregnation, and de-watering lines for raw papaya processing.", capacity: "100 Kg/Hr to 2 Ton/Day" },
    { title: "Commercial Spiral Dough Mixers", desc: "Dual-speed heavy duty mixers engineered for bakeries, bread plants, and pizza dough with zero bowl vibration.", capacity: "25 Kg, 50 Kg, 100 Kg & 150 Kg" },
    { title: "Sanitary Vibro Sifters & Screeners", desc: "High-frequency circular vibro screening machines for flour, spices, starch, chemicals, and snack seasonings.", capacity: "20-inch to 48-inch Diameters" }
  ]);

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

          // About fields
          if (data.aboutHeading) setAboutHeading(data.aboutHeading);
          if (data.aboutStory) setAboutStory(data.aboutStory);
          if (data.founderName) setFounderName(data.founderName);
          if (data.founderTitle) setFounderTitle(data.founderTitle);
          if (data.founderQuote) setFounderQuote(data.founderQuote);
          if (data.aboutHighlights && Array.isArray(data.aboutHighlights) && data.aboutHighlights.length > 0) {
            setAboutHighlights(data.aboutHighlights);
          }
          if (data.machineryCapabilities && Array.isArray(data.machineryCapabilities) && data.machineryCapabilities.length > 0) {
            setMachineryCapabilities(data.machineryCapabilities);
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
          companyStats,
          aboutHeading,
          aboutStory,
          founderName,
          founderTitle,
          founderQuote,
          aboutHighlights,
          machineryCapabilities
        }),
      });

      if (res.ok) {
        setSuccess("Settings updated successfully! Changes are live across the website.");
        setTimeout(() => setSuccess(""), 4000);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update settings");
      }
    } catch {
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
    { id: "about", label: "About Page & Story", icon: BookOpen, desc: "Founder details, company story & capabilities" },
    { id: "stats", label: "Company Stats & Metrics", icon: BarChart3, desc: "Homepage counter statistics" },
    { id: "contact", label: "Contact Information", icon: MapPin, desc: "Email, phone & factory address" },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Sticky Header with Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs sticky top-0 z-30">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-brand-primary">Website Settings</h1>
          <p className="text-slate-500 text-sm mt-0.5">Customize your brand identity, colors, About Us page, and live content.</p>
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
          <span>{success}</span>
        </div>
      )}

      {/* Layout Grid: Sidebar Nav on Left, Content on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <div className="md:col-span-4 bg-white rounded-2xl border border-slate-200 p-3 space-y-1 shadow-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                type="button"
                className={`w-full flex items-start gap-3.5 p-3.5 rounded-xl text-left transition-all ${
                  isActive 
                    ? "bg-brand-primary text-white shadow-sm font-semibold" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${isActive ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-snug">{item.label}</p>
                  <p className={`text-xs mt-0.5 ${isActive ? "text-white/80" : "text-slate-400"}`}>{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="md:col-span-8 space-y-6">
          
          {/* 1. BRANDING & IDENTITY */}
          {activeTab === "branding" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-brand-primary" /> Company Identity
                  </CardTitle>
                  <CardDescription>Configure your registered company name and official brand logo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company / Factory Name</Label>
                    <Input 
                      id="companyName" 
                      value={companyName} 
                      onChange={(e) => setCompanyName(e.target.value)} 
                      placeholder="K.M. Engineering Works" 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Brand Logo</Label>
                    <ImageUploader 
                      images={logoImages} 
                      onChange={setLogoImages} 
                      maxImages={1} 
                    />
                    <p className="text-xs text-slate-400">Recommended: Square or horizontal PNG with transparent background.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Paintbrush className="w-5 h-5 text-brand-primary" /> Brand Theme Colors
                  </CardTitle>
                  <CardDescription>Customize the primary industrial theme colors used across the website.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color (Navbars, Headings)</Label>
                      <div className="flex items-center gap-3">
                        <input 
                          type="color" 
                          id="primaryColorPicker"
                          value={primaryColor} 
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="h-10 w-12 rounded border border-slate-200 cursor-pointer p-1 bg-white"
                        />
                        <Input 
                          id="primaryColor" 
                          value={primaryColor} 
                          onChange={(e) => setPrimaryColor(e.target.value)} 
                          placeholder="#1B365D"
                          className="font-mono uppercase text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accentColor">Accent / CTA Color (Buttons, Highlights)</Label>
                      <div className="flex items-center gap-3">
                        <input 
                          type="color" 
                          id="accentColorPicker"
                          value={accentColor} 
                          onChange={(e) => setAccentColor(e.target.value)}
                          className="h-10 w-12 rounded border border-slate-200 cursor-pointer p-1 bg-white"
                        />
                        <Input 
                          id="accentColor" 
                          value={accentColor} 
                          onChange={(e) => setAccentColor(e.target.value)} 
                          placeholder="#E8590C"
                          className="font-mono uppercase text-sm"
                        />
                      </div>
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
                </CardContent>
              </Card>
            </div>
          )}

          {/* 3. ABOUT US & STORY (FULL CRUD) */}
          {activeTab === "about" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              
              {/* Main Headline & Story */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-brand-primary" /> About Page Story & Mission
                  </CardTitle>
                  <CardDescription>Edit the company heritage and manufacturing narrative.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="aboutHeading">About Section Headline</Label>
                    <Input 
                      id="aboutHeading"
                      value={aboutHeading}
                      onChange={(e) => setAboutHeading(e.target.value)}
                      placeholder="e.g. Pioneering Precision in Food Processing Machinery"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aboutStory">Company Heritage & Manufacturing Story</Label>
                    <Textarea 
                      id="aboutStory"
                      rows={5}
                      value={aboutStory}
                      onChange={(e) => setAboutStory(e.target.value)}
                      placeholder="Describe your factory background, manufacturing experience, and quality standards..."
                      className="leading-relaxed"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Founder Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-brand-primary" /> Founder Profile & Vision
                  </CardTitle>
                  <CardDescription>Founder credentials displayed in the leadership highlight card.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="founderName">Founder & MD Name</Label>
                      <Input 
                        id="founderName"
                        value={founderName}
                        onChange={(e) => setFounderName(e.target.value)}
                        placeholder="Abdulkaleem Abdulkadar Sayyed"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="founderTitle">Official Title</Label>
                      <Input 
                        id="founderTitle"
                        value={founderTitle}
                        onChange={(e) => setFounderTitle(e.target.value)}
                        placeholder="Founder & Managing Director"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="founderQuote">Founder Commitment / Quote</Label>
                    <Textarea 
                      id="founderQuote"
                      rows={3}
                      value={founderQuote}
                      onChange={(e) => setFounderQuote(e.target.value)}
                      placeholder="Our commitment is simple: build machinery that operates reliably 24/7..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Key Highlights / Pillars (Add / Remove CRUD) */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Factory className="w-5 h-5 text-brand-primary" /> Key Highlights & Quality Standards
                      </CardTitle>
                      <CardDescription>The 4 feature cards highlighting your manufacturing edge.</CardDescription>
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAboutHighlights([...aboutHighlights, { title: "", desc: "" }])}
                      className="border-slate-300"
                    >
                      <Plus className="w-4 h-4 mr-1.5" /> Add Pillar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aboutHighlights.map((hl, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Highlight #{idx + 1}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setAboutHighlights(aboutHighlights.filter((_, i) => i !== idx))}
                          className="h-7 w-7 text-slate-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Input 
                          value={hl.title}
                          placeholder="e.g. 100% Food-Grade Metallurgy"
                          onChange={(e) => {
                            const updated = [...aboutHighlights];
                            updated[idx].title = e.target.value;
                            setAboutHighlights(updated);
                          }}
                          className="font-semibold text-sm bg-white"
                        />
                        <Textarea 
                          rows={2}
                          value={hl.desc}
                          placeholder="e.g. All product contact parts fabricated exclusively in certified SS-304..."
                          onChange={(e) => {
                            const updated = [...aboutHighlights];
                            updated[idx].desc = e.target.value;
                            setAboutHighlights(updated);
                          }}
                          className="text-xs bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Machinery Capabilities (Add / Remove CRUD) */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Cog className="w-5 h-5 text-brand-primary" /> Machinery Expertise & Capabilities
                      </CardTitle>
                      <CardDescription>List of machinery lines displayed on the About page grid.</CardDescription>
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setMachineryCapabilities([...machineryCapabilities, { title: "", desc: "", capacity: "" }])}
                      className="border-slate-300"
                    >
                      <Plus className="w-4 h-4 mr-1.5" /> Add Capability
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {machineryCapabilities.map((cap, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Capability #{idx + 1}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setMachineryCapabilities(machineryCapabilities.filter((_, i) => i !== idx))}
                          className="h-7 w-7 text-slate-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs text-slate-500">Machine Name / Type</Label>
                          <Input 
                            value={cap.title}
                            placeholder="e.g. Commercial Spiral Dough Mixers"
                            onChange={(e) => {
                              const updated = [...machineryCapabilities];
                              updated[idx].title = e.target.value;
                              setMachineryCapabilities(updated);
                            }}
                            className="font-medium text-sm bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-slate-500">Standard Capacity</Label>
                          <Input 
                            value={cap.capacity}
                            placeholder="e.g. 25 Kg, 50 Kg, 100 Kg"
                            onChange={(e) => {
                              const updated = [...machineryCapabilities];
                              updated[idx].capacity = e.target.value;
                              setMachineryCapabilities(updated);
                            }}
                            className="text-sm bg-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-slate-500">Description</Label>
                        <Textarea 
                          rows={2}
                          value={cap.desc}
                          placeholder="Dual-speed heavy duty mixers engineered for bakeries..."
                          onChange={(e) => {
                            const updated = [...machineryCapabilities];
                            updated[idx].desc = e.target.value;
                            setMachineryCapabilities(updated);
                          }}
                          className="text-xs bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

            </div>
          )}

          {/* 4. COMPANY STATS */}
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
                              const updated = [...companyStats];
                              updated[idx].value = e.target.value;
                              setCompanyStats(updated);
                            }}
                            className="font-bold text-brand-accent bg-white"
                          />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <Label className="text-xs text-slate-500">Label (e.g. Machines Delivered)</Label>
                          <Input 
                            value={stat.label} 
                            placeholder="Machines Delivered" 
                            onChange={(e) => {
                              const updated = [...companyStats];
                              updated[idx].label = e.target.value;
                              setCompanyStats(updated);
                            }}
                            className="bg-white"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setCompanyStats(companyStats.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-600 hover:bg-red-50 self-end mb-1"
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

          {/* 5. CONTACT INFORMATION */}
          {activeTab === "contact" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-brand-primary" /> Official Communication Details
                  </CardTitle>
                  <CardDescription>Contact details displayed across Header, Footer, and Contact Us page.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Official Support Email</Label>
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
                      <Label htmlFor="contactPhone">Primary Sales Phone</Label>
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
                    <Label htmlFor="contactAddress">Factory / Works Address</Label>
                    <Textarea 
                      id="contactAddress" 
                      rows={3}
                      value={contactAddress} 
                      onChange={(e) => setContactAddress(e.target.value)} 
                      placeholder="Gala No.58, Azmi Compound, Near Kwality Bakery, Mumbai - 400072, Maharashtra, India"
                      className="leading-relaxed"
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
