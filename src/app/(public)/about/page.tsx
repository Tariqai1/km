import { Metadata } from "next";
import AboutSection from "@/components/shared/AboutSection";
import MachineReviews from "@/components/shared/MachineReviews";
import TrustBadges from "@/components/shared/TrustBadges";
import { 
  Building2, 
  Factory, 
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dbConnect from "@/lib/db";
import { Settings } from "@/models/Settings";

export const metadata: Metadata = {
  title: "About Us | K.M. Engineering Works - Mumbai",
  description: "Learn about K.M. Engineering Works, Mumbai's trusted manufacturer of food processing and bakery machinery since 2010. Founder Abdulkaleem Abdulkadar Sayyed.",
};

// Enable ISR (Incremental Static Regeneration) - Cache for 60 seconds
export const revalidate = 60;

const defaultCapabilities = [
  {
    title: "Tutti Frutti Processing Plants",
    desc: "Complete automatic dicing, cubing, boiling, sugar syrup impregnation, and de-watering lines for raw papaya processing.",
    capacity: "100 Kg/Hr to 2 Ton/Day"
  },
  {
    title: "Commercial Spiral Dough Mixers",
    desc: "Dual-speed heavy duty mixers engineered for bakeries, bread plants, and pizza dough with zero bowl vibration.",
    capacity: "25 Kg, 50 Kg, 100 Kg & 150 Kg"
  },
  {
    title: "Sanitary Vibro Sifters & Screeners",
    desc: "High-frequency circular vibro screening machines for flour, spices, starch, chemicals, and snack seasonings.",
    capacity: "20-inch to 48-inch Diameters"
  },
  {
    title: "Planetary Mixers & Cream Whippers",
    desc: "Multi-attachment planetary mixers with food-grade stainless steel bowls for pastry dough, batters, and creams.",
    capacity: "20L, 40L, 60L & 80L"
  },
  {
    title: "Namkeen & Snack Extruders / Fryers",
    desc: "Semi-automatic and continuous frying and extruder systems for sev, bhujia, gathiya, and farsan snacks.",
    capacity: "50 Kg/Hr to 300 Kg/Hr"
  },
  {
    title: "Custom Fabrication & Turnkey Plants",
    desc: "End-to-end bespoke machinery designed according to factory layout, electrical voltage, and raw material characteristics.",
    capacity: "Customized as per drawings"
  }
];

export default async function AboutPage() {
  let settings: any = null;
  try {
    await dbConnect();
    settings = await Settings.findOne().lean();
  } catch (e) {
    console.error("Failed to load settings on about page", e);
  }

  const machineryCapabilities = settings?.machineryCapabilities && settings.machineryCapabilities.length > 0
    ? settings.machineryCapabilities
    : defaultCapabilities;

  const address = settings?.contactAddress || "Gala No.58, Azmi Compound, Near Kwality Bakery, Mumbai - 400072";

  return (
    <div className="bg-brand-light min-h-screen">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-brand-primary via-slate-900 to-brand-secondary text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-brand-accent text-xs font-semibold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" /> Company Heritage &amp; Capabilities
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight text-white mb-4 leading-tight">
            Engineering Precision for India&apos;s Food &amp; Bakery Industry
          </h1>
          <div className="w-16 h-1 bg-brand-accent mx-auto rounded-full mb-4"></div>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Delivering heavy-duty, food-grade stainless steel machinery with unmatched durability, low maintenance, and pan-India technical support.
          </p>
        </div>
      </section>

      {/* Trust Badges Strip */}
      <div className="border-b border-slate-200 bg-white">
        <TrustBadges />
      </div>

      {/* Main Dynamic About Section */}
      <AboutSection initialSettings={settings ? JSON.parse(JSON.stringify(settings)) : null} />

      {/* Machinery Manufacturing Capabilities Grid */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-200/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-2.5">
              <Factory className="w-3.5 h-3.5" /> Manufacturing Scope
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-slate-900">
              Our Core Machinery Capabilities
            </h2>
            <div className="w-16 h-1 bg-brand-accent mx-auto rounded-full mt-2.5 mb-3"></div>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
              Every machine is fabricated with certified SS-304/SS-316 stainless steel, heavy cast frames, and premium electrical drive gearboxes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machineryCapabilities.map((item: any, idx: number) => (
              <div key={idx} className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-xs mb-3.5">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 mb-1.5">{item.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">{item.desc}</p>
                </div>
                {item.capacity && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Capacities:</span>
                    <span className="font-bold text-brand-accent">{item.capacity}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Machine Reviews / Customer Testimonials Section */}
      <MachineReviews />

      {/* Factory Visit & Consultation CTA */}
      <section className="py-14 sm:py-16 bg-brand-primary text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display">
            Plan a Factory Visit or Request Machine Demos
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Visit our Mumbai manufacturing works at <strong>{address}</strong> to inspect running demo units.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild size="default" className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold px-6 h-11 rounded-xl text-xs sm:text-sm">
              <Link href="/contact">
                Contact Engineering Office <ArrowRight className="ml-1.5 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="default" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-11 px-5 rounded-xl text-xs sm:text-sm">
              <Link href="/products">
                Browse Full Catalog
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
