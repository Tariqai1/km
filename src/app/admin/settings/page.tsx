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
  Cog,
  Sparkles,
  ToggleLeft,
  Sliders,
  Layers,
  QrCode
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"branding" | "hero" | "features" | "banner" | "about" | "stats" | "contact">("branding");
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
  const [secondaryColor, setSecondaryColor] = useState("#071324");
  const [whatsappColor, setWhatsappColor] = useState("#25D366");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [companyStats, setCompanyStats] = useState<{value: string, label: string}[]>([]);

  // Hero Showcase Multi-Images State
  const [heroImages, setHeroImages] = useState<{url: string, title: string, caption?: string}[]>([
    {
      url: "https://res.cloudinary.com/gksfzjxf/image/upload/v1/products/placeholder.jpg",
      title: "50 Kg Commercial Spiral Dough Mixer",
      caption: "Heavy Duty Dual-Speed Cast Chassis"
    }
  ]);

  // Master Homepage Section On/Off Switches
  const [showHeroShowcase, setShowHeroShowcase] = useState(true);
  const [showQrRibbon, setShowQrRibbon] = useState(true);
  const [showCategoriesSection, setShowCategoriesSection] = useState(true);
  const [showFeaturedProducts, setShowFeaturedProducts] = useState(true);
  const [showDigitalBanner, setShowDigitalBanner] = useState(true);
  const [showClientReviews, setShowClientReviews] = useState(true);
  const [showAboutSection, setShowAboutSection] = useState(true);
  const [showStatsCounter, setShowStatsCounter] = useState(true);
  const [showWhyChooseUs, setShowWhyChooseUs] = useState(true);

  // Digital Banner State
  const [bannerActive, setBannerActive] = useState(true);
  const [bannerBadge, setBannerBadge] = useState("🔥 Special B2B Factory Initiative");
  const [bannerHeading, setBannerHeading] = useState("Turnkey Commercial Bakery & Food Processing Plant Setup");
  const [bannerSubheading, setBannerSubheading] = useState("Get customized 3D plant layout engineering, genuine SS-304 food-grade machinery fabrication, and on-site commissioning with zero-vibration guarantee.");
  const [bannerCtaText, setBannerCtaText] = useState("Request Custom Plant Consultation");
  const [bannerCtaLink, setBannerCtaLink] = useState("/contact");

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
          setSecondaryColor(data.secondaryColor || "#071324");
          setWhatsappColor(data.whatsappColor || "#25D366");
          setContactEmail(data.contactEmail || "");
          setContactPhone(data.contactPhone || "");
          setContactAddress(data.contactAddress || "");
          
          if (data.companyStats && Array.isArray(data.companyStats)) {
            setCompanyStats(data.companyStats);
          }

          if (data.heroImages && Array.isArray(data.heroImages)) {
            setHeroImages(data.heroImages);
          }

          // Section On/Off Switches
          if (data.showHeroShowcase !== undefined) setShowHeroShowcase(data.showHeroShowcase);
          if (data.showQrRibbon !== undefined) setShowQrRibbon(data.showQrRibbon);
          if (data.showCategoriesSection !== undefined) setShowCategoriesSection(data.showCategoriesSection);
          if (data.showFeaturedProducts !== undefined) setShowFeaturedProducts(data.showFeaturedProducts);
          if (data.showDigitalBanner !== undefined) setShowDigitalBanner(data.showDigitalBanner);
          if (data.showClientReviews !== undefined) setShowClientReviews(data.showClientReviews);
          if (data.showAboutSection !== undefined) setShowAboutSection(data.showAboutSection);
          if (data.showStatsCounter !== undefined) setShowStatsCounter(data.showStatsCounter);
          if (data.showWhyChooseUs !== undefined) setShowWhyChooseUs(data.showWhyChooseUs);

          // Digital Banner
          if (data.bannerActive !== undefined) setBannerActive(data.bannerActive);
          if (data.bannerBadge) setBannerBadge(data.bannerBadge);
          if (data.bannerHeading) setBannerHeading(data.bannerHeading);
          if (data.bannerSubheading) setBannerSubheading(data.bannerSubheading);
          if (data.bannerCtaText) setBannerCtaText(data.bannerCtaText);
          if (data.bannerCtaLink) setBannerCtaLink(data.bannerCtaLink);

          // About Page
          if (data.aboutHeading) setAboutHeading(data.aboutHeading);
          if (data.aboutStory) setAboutStory(data.aboutStory);
          if (data.founderName) setFounderName(data.founderName);
          if (data.founderTitle) setFounderTitle(data.founderTitle);
          if (data.founderQuote) setFounderQuote(data.founderQuote);
          if (data.aboutHighlights && Array.isArray(data.aboutHighlights)) {
            setAboutHighlights(data.aboutHighlights);
          }
          if (data.machineryCapabilities && Array.isArray(data.machineryCapabilities)) {
            setMachineryCapabilities(data.machineryCapabilities);
          }
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
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
      const payload = {
        companyName,
        logoUrl: logoImages[0]?.url || "/logo.png",
        heroBannerUrl: heroBannerImages[0]?.url || "",
        heroHeading,
        heroSubheading,
        primaryColor,
        accentColor,
        secondaryColor,
        whatsappColor,
        contactEmail,
        contactPhone,
        contactAddress,
        companyStats,
        heroImages,
        // Section Switches
        showHeroShowcase,
        showQrRibbon,
        showCategoriesSection,
        showFeaturedProducts,
        showDigitalBanner,
        showClientReviews,
        showAboutSection,
        showStatsCounter,
        showWhyChooseUs,
        // Digital Banner
        bannerActive,
        bannerBadge,
        bannerHeading,
        bannerSubheading,
        bannerCtaText,
        bannerCtaLink,
        // About Page
        aboutHeading,
        aboutStory,
        founderName,
        founderTitle,
        founderQuote,
        aboutHighlights,
        machineryCapabilities
      };

      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSuccess("Settings updated successfully! Changes are live across the website.");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update settings.");
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper functions for hero images
  const addHeroImage = () => {
    setHeroImages([...heroImages, { url: "", title: "New Machinery Model", caption: "Precision SS-304" }]);
  };

  const updateHeroImage = (index: number, field: string, value: string) => {
    const updated = [...heroImages];
    updated[index] = { ...updated[index], [field]: value };
    setHeroImages(updated);
  };

  const removeHeroImage = (index: number) => {
    setHeroImages(heroImages.filter((_, i) => i !== index));
  };

  // Helper functions for stats
  const addStat = () => {
    setCompanyStats([...companyStats, { value: "100+", label: "New Metric" }]);
  };

  const updateStat = (index: number, field: "value" | "label", val: string) => {
    const updated = [...companyStats];
    updated[index][field] = val;
    setCompanyStats(updated);
  };

  const removeStat = (index: number) => {
    setCompanyStats(companyStats.filter((_, i) => i !== index));
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

  const tabs = [
    { id: "branding", label: "Branding & Identity", icon: Building2, desc: "Company name, logo & theme colors" },
    { id: "features", label: "Feature On/Off Switches", icon: ToggleLeft, desc: "Activate or deactivate website sections" },
    { id: "hero", label: "Hero & Showcase Slider", icon: Type, desc: "Main headline & multi-image carousel" },
    { id: "banner", label: "Digital Marketing Banner", icon: Sparkles, desc: "Custom plant consultation creative" },
    { id: "about", label: "About Page & Story", icon: BookOpen, desc: "Founder biography & factory capabilities" },
    { id: "stats", label: "Factory Milestones", icon: BarChart3, desc: "Experience, plants built & metrics" },
    { id: "contact", label: "Contact & Works Location", icon: MapPin, desc: "Phones, email & factory address" },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-brand-primary">
            Website &amp; Brand Settings
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Manage company credentials, hero slider photos, and activate/deactivate website features.
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          size="lg"
          className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold shadow-md shrink-0 px-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving Changes...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" /> Save All Settings
            </>
          )}
        </Button>
      </div>

      {/* Notifications */}
      {success && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Main Layout Grid: Left Sidebar Tabs + Right Form Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <div className="md:col-span-4 bg-white rounded-2xl border border-slate-200 p-3 space-y-1.5 shadow-xs sticky top-6">
          {tabs.map((item) => {
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
                    <Paintbrush className="w-5 h-5 text-brand-primary" /> Brand Theme &amp; Color Studio
                  </CardTitle>
                  <CardDescription>
                    Admin can fully control all website colors — navbars, buttons, mobile menus, and backgrounds.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  
                  {/* 1-Click Industrial Theme Presets */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        ⚡ 1-Click Theme Presets
                      </Label>
                      <span className="text-xs text-slate-400">Click any theme to apply instantly</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        {
                          name: "Industrial Amber & Navy",
                          tag: "Default Factory",
                          p: "#1B365D",
                          a: "#E8590C",
                          s: "#071324",
                          w: "#25D366"
                        },
                        {
                          name: "Titanium Sapphire",
                          tag: "Precision Tech",
                          p: "#0F2942",
                          a: "#0284C7",
                          s: "#081320",
                          w: "#25D366"
                        },
                        {
                          name: "High-Tech Emerald",
                          tag: "Clean Energy",
                          p: "#1E293B",
                          a: "#10B981",
                          s: "#0A1118",
                          w: "#25D366"
                        },
                        {
                          name: "Royal Bronze Gold",
                          tag: "Luxury Heritage",
                          p: "#251814",
                          a: "#D97706",
                          s: "#110C0A",
                          w: "#25D366"
                        },
                        {
                          name: "Engineering Crimson",
                          tag: "Bold Heavy Duty",
                          p: "#18181B",
                          a: "#E11D48",
                          s: "#09090B",
                          w: "#25D366"
                        },
                        {
                          name: "Swiss Precision Violet",
                          tag: "Modern Modernist",
                          p: "#1E1B4B",
                          a: "#6366F1",
                          s: "#0B0A1A",
                          w: "#25D366"
                        }
                      ].map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setPrimaryColor(preset.p);
                            setAccentColor(preset.a);
                            setSecondaryColor(preset.s);
                            setWhatsappColor(preset.w);
                          }}
                          className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-brand-primary bg-slate-50/60 hover:bg-slate-50 transition-all text-left group cursor-pointer"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-brand-primary transition-colors">
                              {preset.name}
                            </div>
                            <div className="text-[10px] text-slate-500">{preset.tag}</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-3.5 h-3.5 rounded-full border border-white shadow-xs" style={{ backgroundColor: preset.p }} title="Primary" />
                            <span className="w-3.5 h-3.5 rounded-full border border-white shadow-xs" style={{ backgroundColor: preset.a }} title="Accent" />
                            <span className="w-3.5 h-3.5 rounded-full border border-white shadow-xs" style={{ backgroundColor: preset.s }} title="Background" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4 Granular Color Pickers */}
                  <div className="space-y-4 pt-2 border-t border-slate-100">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Custom Color Palette Controls
                    </Label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* 1. Primary Color */}
                      <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="primaryColor" className="text-xs font-bold text-slate-800">
                            1. Primary Brand Color
                          </Label>
                          <span className="text-[10px] text-slate-400">Desktop Navbars, Monograms</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <input 
                            type="color" 
                            id="primaryColorPicker"
                            value={primaryColor} 
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="h-10 w-12 rounded border border-slate-200 cursor-pointer p-1 bg-white shrink-0 shadow-xs"
                          />
                          <Input 
                            id="primaryColor" 
                            value={primaryColor} 
                            onChange={(e) => setPrimaryColor(e.target.value)} 
                            placeholder="#1B365D"
                            className="font-mono uppercase text-sm bg-white"
                          />
                        </div>
                      </div>

                      {/* 2. Accent / CTA Color */}
                      <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="accentColor" className="text-xs font-bold text-slate-800">
                            2. Accent / CTA Color
                          </Label>
                          <span className="text-[10px] text-slate-400">Quote Buttons, Active Borders</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <input 
                            type="color" 
                            id="accentColorPicker"
                            value={accentColor} 
                            onChange={(e) => setAccentColor(e.target.value)}
                            className="h-10 w-12 rounded border border-slate-200 cursor-pointer p-1 bg-white shrink-0 shadow-xs"
                          />
                          <Input 
                            id="accentColor" 
                            value={accentColor} 
                            onChange={(e) => setAccentColor(e.target.value)} 
                            placeholder="#E8590C"
                            className="font-mono uppercase text-sm bg-white"
                          />
                        </div>
                      </div>

                      {/* 3. Dark Console & Background Color */}
                      <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="secondaryColor" className="text-xs font-bold text-slate-800">
                            3. Dark Console / Hero Color
                          </Label>
                          <span className="text-[10px] text-slate-400">Mobile Menu Canvas, Hero Base</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <input 
                            type="color" 
                            id="secondaryColorPicker"
                            value={secondaryColor} 
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            className="h-10 w-12 rounded border border-slate-200 cursor-pointer p-1 bg-white shrink-0 shadow-xs"
                          />
                          <Input 
                            id="secondaryColor" 
                            value={secondaryColor} 
                            onChange={(e) => setSecondaryColor(e.target.value)} 
                            placeholder="#071324"
                            className="font-mono uppercase text-sm bg-white"
                          />
                        </div>
                      </div>

                      {/* 4. WhatsApp CTA Color */}
                      <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="whatsappColor" className="text-xs font-bold text-slate-800">
                            4. WhatsApp Sales Color
                          </Label>
                          <span className="text-[10px] text-slate-400">WhatsApp Buttons &amp; Floating Chat</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <input 
                            type="color" 
                            id="whatsappColorPicker"
                            value={whatsappColor} 
                            onChange={(e) => setWhatsappColor(e.target.value)}
                            className="h-10 w-12 rounded border border-slate-200 cursor-pointer p-1 bg-white shrink-0 shadow-xs"
                          />
                          <Input 
                            id="whatsappColor" 
                            value={whatsappColor} 
                            onChange={(e) => setWhatsappColor(e.target.value)} 
                            placeholder="#25D366"
                            className="font-mono uppercase text-sm bg-white"
                          />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Live Real-Time Interactive Preview Widget */}
                  <div className="pt-2 border-t border-slate-100 space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Live Real-Time Preview (Instant Simulation)
                    </Label>

                    <div 
                      className="p-6 rounded-2xl border border-slate-800 transition-all text-white relative overflow-hidden shadow-xl"
                      style={{ backgroundColor: secondaryColor }}
                    >
                      {/* Ambient corner glow */}
                      <div 
                        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl opacity-30 pointer-events-none"
                        style={{ backgroundColor: accentColor }}
                      />

                      <div className="relative z-10 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div 
                              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-xs"
                              style={{ backgroundColor: primaryColor }}
                            >
                              KM
                            </div>
                            <div>
                              <span className="font-bold text-xs block text-white">{companyName || "K.M. Engineering Works"}</span>
                              <span className="text-[9px] block text-slate-400">Previewing Custom Colors</span>
                            </div>
                          </div>

                          <span 
                            className="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase border"
                            style={{ 
                              borderColor: `${accentColor}80`, 
                              color: accentColor, 
                              backgroundColor: `${accentColor}20` 
                            }}
                          >
                            Live Active Badge
                          </span>
                        </div>

                        {/* Sample Active Mobile Link */}
                        <div 
                          className="p-3 rounded-xl border flex items-center justify-between"
                          style={{ 
                            borderColor: accentColor, 
                            backgroundColor: "rgba(255, 255, 255, 0.08)" 
                          }}
                        >
                          <div className="flex items-center gap-2.5">
                            <div 
                              className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white"
                              style={{ backgroundColor: accentColor }}
                            >
                              02
                            </div>
                            <span className="text-xs font-bold text-white">Machinery Catalog (Active State)</span>
                          </div>
                          <span className="text-xs font-bold" style={{ color: accentColor }}>→</span>
                        </div>

                        {/* Sample Dual Action Buttons */}
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <button
                            type="button"
                            className="py-2.5 px-3 rounded-xl font-bold text-xs text-white shadow-md flex items-center justify-center gap-1.5 transition-transform"
                            style={{ backgroundColor: accentColor }}
                          >
                            Instant Quote →
                          </button>
                          <button
                            type="button"
                            className="py-2.5 px-3 rounded-xl font-bold text-xs text-white shadow-md flex items-center justify-center gap-1.5 transition-transform"
                            style={{ backgroundColor: whatsappColor }}
                          >
                            WhatsApp Sales
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </div>
          )}

          {/* 2. FEATURE ON/OFF SWITCHES */}
          {activeTab === "features" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ToggleLeft className="w-5 h-5 text-brand-primary" /> Master Homepage Section Switches
                  </CardTitle>
                  <CardDescription>
                    Turn individual sections on the public homepage ON or OFF with a single click.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  {[
                    { label: "Hero Machine Showcase Slider", desc: "3D animated multi-photo carousel in hero section", state: showHeroShowcase, setter: setShowHeroShowcase },
                    { label: "Smart Dynamic QR Ribbon", desc: "Permanent visual strip linking to /connect profile", state: showQrRibbon, setter: setShowQrRibbon },
                    { label: "Turnkey Plant Categories Grid", desc: "Tutti Frutti, Bakery, Chips, Namkeen, Sweets cards", state: showCategoriesSection, setter: setShowCategoriesSection },
                    { label: "Featured Machinery Grid", desc: "Bestselling machines with specs & quote buttons", state: showFeaturedProducts, setter: setShowFeaturedProducts },
                    { label: "Digital Marketing Banner", desc: "High-impact turnkey consultation creative offer", state: showDigitalBanner, setter: setShowDigitalBanner },
                    { label: "Verified Client Reviews & Case Studies", desc: "Authentic customer testimonials from industrial clusters", state: showClientReviews, setter: setShowClientReviews },
                    { label: "Company Heritage & Infrastructure Section", desc: "Founder story & factory machinery capabilities", state: showAboutSection, setter: setShowAboutSection },
                    { label: "Factory Milestones Stats Counter", desc: "Years active, machines delivered, and clients strip", state: showStatsCounter, setter: setShowStatsCounter },
                    { label: "Why Choose K.M. Engineering (3 Pillars)", desc: "Heavy metallurgy, 100% trial, and spare parts cards", state: showWhyChooseUs, setter: setShowWhyChooseUs },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{item.label}</h4>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={item.state} 
                          onChange={(e) => item.setter(e.target.checked)} 
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>
                  ))}

                </CardContent>
              </Card>
            </div>
          )}

          {/* 3. HERO & SHOWCASE SLIDER */}
          {activeTab === "hero" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="w-5 h-5 text-brand-primary" /> Hero Text &amp; Headlines
                  </CardTitle>
                  <CardDescription>The main headline and value proposition that prospective buyers see.</CardDescription>
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
                    <Label htmlFor="heroSubheading">Subheading &amp; Value Proposition</Label>
                    <Textarea 
                      id="heroSubheading" 
                      value={heroSubheading} 
                      onChange={(e) => setHeroSubheading(e.target.value)} 
                      placeholder="e.g. Mumbai's trusted manufacturer of high-quality machinery..."
                      className="min-h-[100px] leading-relaxed"
                      required 
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Multi-Image Showcase Carousel Manager */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-brand-primary" /> Multi-Image Showcase Slider
                      </CardTitle>
                      <CardDescription>Images displayed in the 3D smooth auto-cycling carousel on the homepage.</CardDescription>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addHeroImage}
                      className="text-xs font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Slide
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {heroImages.map((img, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">Slide #{idx + 1}</span>
                        {heroImages.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeHeroImage(idx)}
                            className="h-7 w-7 text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Image URL / Cloudinary Link</Label>
                          <Input
                            value={img.url}
                            onChange={(e) => updateHeroImage(idx, "url", e.target.value)}
                            placeholder="https://res.cloudinary.com/..."
                            className="text-xs font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Machine Model Title</Label>
                          <Input
                            value={img.title}
                            onChange={(e) => updateHeroImage(idx, "title", e.target.value)}
                            placeholder="e.g. 50 Kg Commercial Spiral Dough Mixer"
                            className="text-xs font-semibold"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* 4. DIGITAL MARKETING BANNER */}
          {activeTab === "banner" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-accent" /> Digital Banner &amp; Turnkey Offer Creative
                  </CardTitle>
                  <CardDescription>Configure the marketing banner displayed on the homepage.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Show Digital Banner on Website</h4>
                      <p className="text-xs text-slate-500">Enable or disable this marketing creative on the homepage.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={bannerActive} 
                        onChange={(e) => setBannerActive(e.target.checked)} 
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bannerBadge">Promo Badge / Tagline</Label>
                    <Input 
                      id="bannerBadge" 
                      value={bannerBadge} 
                      onChange={(e) => setBannerBadge(e.target.value)} 
                      placeholder="🔥 Special B2B Factory Initiative"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bannerHeading">Main Offer Heading</Label>
                    <Input 
                      id="bannerHeading" 
                      value={bannerHeading} 
                      onChange={(e) => setBannerHeading(e.target.value)} 
                      placeholder="Turnkey Commercial Bakery & Food Processing Plant Setup"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bannerSubheading">Detailed Pitch & Guarantee</Label>
                    <Textarea 
                      id="bannerSubheading" 
                      value={bannerSubheading} 
                      onChange={(e) => setBannerSubheading(e.target.value)} 
                      placeholder="Get customized 3D plant layout engineering..."
                      className="min-h-[90px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bannerCtaText">CTA Button Text</Label>
                      <Input 
                        id="bannerCtaText" 
                        value={bannerCtaText} 
                        onChange={(e) => setBannerCtaText(e.target.value)} 
                        placeholder="Request Custom Plant Consultation"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bannerCtaLink">CTA Button Link</Label>
                      <Input 
                        id="bannerCtaLink" 
                        value={bannerCtaLink} 
                        onChange={(e) => setBannerCtaLink(e.target.value)} 
                        placeholder="/contact"
                      />
                    </div>
                  </div>

                </CardContent>
              </Card>
            </div>
          )}

          {/* 5. ABOUT PAGE & STORY */}
          {activeTab === "about" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-brand-primary" /> Founder &amp; Heritage
                  </CardTitle>
                  <CardDescription>Story and leadership credentials of K.M. Engineering Works.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="founderName">Founder &amp; MD Name</Label>
                      <Input 
                        id="founderName" 
                        value={founderName} 
                        onChange={(e) => setFounderName(e.target.value)} 
                        placeholder="Abdul Kaleem Sayyed"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="founderTitle">Leadership Title</Label>
                      <Input 
                        id="founderTitle" 
                        value={founderTitle} 
                        onChange={(e) => setFounderTitle(e.target.value)} 
                        placeholder="Founder & Managing Director"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="founderQuote">Founder's Vision / Quote</Label>
                    <Textarea 
                      id="founderQuote" 
                      value={founderQuote} 
                      onChange={(e) => setFounderQuote(e.target.value)} 
                      placeholder="Our commitment is simple: build machinery that operates reliably 24/7..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aboutStory">Company Biography &amp; Factory Background</Label>
                    <Textarea 
                      id="aboutStory" 
                      value={aboutStory} 
                      onChange={(e) => setAboutStory(e.target.value)} 
                      placeholder="Established under the visionary leadership of Abdul Kaleem Sayyed..."
                      className="min-h-[120px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 6. FACTORY MILESTONES */}
          {activeTab === "stats" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-brand-primary" /> Key Industrial Milestones
                      </CardTitle>
                      <CardDescription>Numeric proof points shown on the homepage counter strip.</CardDescription>
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={addStat}
                      className="text-xs font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Milestone
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {companyStats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="w-1/3 space-y-1">
                        <Label className="text-xs">Value (e.g. 15+, 500+)</Label>
                        <Input 
                          value={stat.value} 
                          onChange={(e) => updateStat(idx, "value", e.target.value)} 
                          className="font-bold text-brand-primary"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <Label className="text-xs">Description Label</Label>
                        <Input 
                          value={stat.label} 
                          onChange={(e) => updateStat(idx, "label", e.target.value)} 
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeStat(idx)}
                        className="text-slate-400 hover:text-red-600 hover:bg-red-50 shrink-0 mt-5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* 7. CONTACT & LOCATION */}
          {activeTab === "contact" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-brand-primary" /> Contact Details &amp; Factory Address
                  </CardTitle>
                  <CardDescription>Shown in the website header, footer, contact page, and digital business profile.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Primary Hotline / WhatsApp</Label>
                      <Input 
                        id="contactPhone" 
                        value={contactPhone} 
                        onChange={(e) => setContactPhone(e.target.value)} 
                        placeholder="+91 9821669131"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Official Inquiries Email</Label>
                      <Input 
                        id="contactEmail" 
                        type="email" 
                        value={contactEmail} 
                        onChange={(e) => setContactEmail(e.target.value)} 
                        placeholder="kmengineering1973@gmail.com"
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactAddress">Factory / Works Address</Label>
                    <Textarea 
                      id="contactAddress" 
                      value={contactAddress} 
                      onChange={(e) => setContactAddress(e.target.value)} 
                      placeholder="Workshop No. 58, Near Kwality Bakery, Azmi Compound, Khairani Road, Sakinaka, Mumbai – 400072"
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
