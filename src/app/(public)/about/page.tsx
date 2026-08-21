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
      <section className="bg-gradient-to-r from-brand-primary via-slate-900 to-brand-secondary text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-brand-accent text-xs font-semibold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5" /> Company Heritage & Capabilities
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white mb-6">
            Engineering Precision for India&apos;s Food & Bakery Industry
          </h1>
          <div className="w-20 h-1 bg-brand-accent mx-auto rounded-full mb-6"></div>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
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
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200/80">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-3">
              <Factory className="w-3.5 h-3.5" /> Manufacturing Scope
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-dark">
              Our Core Machinery Capabilities
            </h2>
            <div className="w-20 h-1 bg-brand-accent mx-auto rounded-full mt-3 mb-4"></div>
            <p className="text-slate-600 text-base">
              Every machine is fabricated with certified SS-304/SS-316 stainless steel, heavy cast frames, and premium electrical drive gearboxes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machineryCapabilities.map((item: any, idx: number) => (
              <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl font-bold font-display text-brand-dark mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.desc}</p>
                </div>
                {item.capacity && (
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Standard Capacities:</span>
                    <span className="text-xs font-bold text-brand-accent">{item.capacity}</span>
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
      <section className="py-16 bg-brand-primary text-white text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-display">
            Plan a Factory Visit or Request Machine Demos
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Visit our Mumbai manufacturing works at <strong>{address}</strong> to inspect running demo units.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button asChild size="lg" className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold px-8 h-12 rounded-xl">
              <Link href="/contact">
                Contact Engineering Office <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12 rounded-xl">
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
