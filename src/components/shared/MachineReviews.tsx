"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, MapPin, Building2, TrendingUp, Award, CheckCircle2, Factory } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ClientReview {
  id: string;
  clientName: string;
  designation: string;
  companyName: string;
  location: string;
  industrialZone: string;
  machineModel: string;
  yearInstalled: string;
  rating: number;
  operationalHighlight: string;
  reviewTitle: string;
  reviewText: string;
  initials: string;
  avatarBg: string;
}

const verifiedReviews: ClientReview[] = [
  {
    id: "rev-1",
    clientName: "Rameshwar Sharma",
    designation: "Managing Director & Head Baker",
    companyName: "Shree Krishna Bakery & Foods",
    location: "Mumbai, Maharashtra",
    industrialZone: "Bhiwandi Commercial Bakery Cluster",
    machineModel: "50 Kg Commercial Spiral Dough Mixer (SS-304)",
    yearInstalled: "Running 3+ Years • Daily 2 Shifts",
    rating: 5,
    operationalHighlight: "850 Kg Daily Dough • Zero Motor Heating",
    reviewTitle: "Heavy-duty cast base with absolute zero bowl vibration",
    reviewText: "We run our bakery plant 14 hours every single day. Our earlier imported mixer had gear slippage and motor overheating issues after 4 hours of continuous kneading. We switched to K.M. Engineering's 50kg dual-speed spiral mixer in 2023. The heavy-duty copper drive motor handles 800+ kg daily dough effortlessly, and the food-grade SS-304 bowl cleaning takes less than 5 minutes. Abdulkaleem Sayyed and his team delivered and commissioned the machine on schedule.",
    initials: "RS",
    avatarBg: "bg-blue-600",
  },
  {
    id: "rev-2",
    clientName: "Hitesh Patel",
    designation: "Plant Operations Director",
    companyName: "Royal Fruit Processing Works",
    location: "Surat, Gujarat",
    industrialZone: "Surat GIDC Mega Food Park",
    machineModel: "Automatic Tutti Frutti Dicing & Processing Plant",
    yearInstalled: "Installed 2022 • 1.5 Ton/Day Capacity",
    rating: 5,
    operationalHighlight: "6mm/8mm Cube Precision • 22% Yield Boost",
    reviewTitle: "Papaya raw material wastage dropped significantly",
    reviewText: "Manual cutting of raw papaya used to cause inconsistent cube dimensions and almost 25% edge wastage. K.M. Engineering custom-fabricated our automatic dicing and syrup impregnation plant. The precision cutting rotary blades produce perfectly uniform 6mm and 8mm cubes with clean sharp edges. Machine breakdown has been zero across 2 peak seasons, and spare parts availability from Mumbai is fast.",
    initials: "HP",
    avatarBg: "bg-amber-600",
  },
  {
    id: "rev-3",
    clientName: "Mohammad Farooq",
    designation: "Production Head",
    companyName: "Al-Barkat Sweets & Namkeen Hub",
    location: "Hyderabad, Telangana",
    industrialZone: "Katedan Industrial Area",
    machineModel: "30-Inch Sanitary Circular Vibro Sifter",
    yearInstalled: "Installed 2024 • Continuous Line",
    rating: 5,
    operationalHighlight: "600 Kg/Hr Sifting • Zero Mesh Blinding",
    reviewTitle: "Eliminated besan lumps and fine spice contamination",
    reviewText: "For our commercial sev and bhujia manufacturing lines, sifting fine gram flour (besan) and ground spices without mesh choking was our biggest headache. The 30-inch vibratory screener from K.M. Engineering with self-cleaning silicone debinding balls solved the problem completely. The machine runs silently without bolting to the floor and passed all our food safety quality audits easily.",
    initials: "MF",
    avatarBg: "bg-emerald-600",
  },
  {
    id: "rev-4",
    clientName: "Satish Patil",
    designation: "General Manager",
    companyName: "Krushna Confectionery & Dairy",
    location: "Pune, Maharashtra",
    industrialZone: "Hadapsar Industrial Estate",
    machineModel: "60L Industrial Tilting Planetary Mixer",
    yearInstalled: "Running 2 Years • Multi-Attachment",
    rating: 5,
    operationalHighlight: "60L Batch Size • Uniform Cream Aeration",
    reviewTitle: "Robust transmission gearbox with smooth tilt unloading",
    reviewText: "We produce 400+ fresh cream cakes and pastry batches every morning. The 60L planetary mixer's multi-speed transmission provides smooth whisking and heavy batter mixing. The hydraulic-assisted manual tilting mechanism makes pouring thick batters completely strain-free for our kitchen staff. Very solid build quality and honest factory direct pricing.",
    initials: "SP",
    avatarBg: "bg-purple-600",
  }
];

export default function MachineReviews() {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-brand-accent" /> Verified Commercial Client Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-brand-dark">
              Performance Reports From Plant Operators
            </h2>
            <div className="w-20 h-1.5 bg-brand-accent rounded-full mt-3"></div>
          </div>

          {/* Aggregate Rating Score Card */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 shrink-0">
            <div className="text-center pr-4 border-r border-slate-200">
              <div className="text-3xl font-extrabold font-display text-slate-900">4.9<span className="text-sm font-bold text-slate-400">/5</span></div>
              <div className="flex items-center justify-center gap-0.5 text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">200+ Verified Plants</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Commercial installations across India</p>
              <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> 100% Verified Buyer Invoices
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Realistic Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {verifiedReviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              
              <div className="space-y-4">
                
                {/* Header: Machine Tag & Live Metric */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Factory className="w-4 h-4 text-brand-primary shrink-0" />
                    <span className="font-bold text-xs text-brand-primary">{rev.machineModel}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">{rev.yearInstalled}</span>
                </div>

                {/* Star Rating & Review Title */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-700">Verified Factory Review</span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug">
                    &ldquo;{rev.reviewTitle}&rdquo;
                  </h3>
                </div>

                {/* Natural Review Body */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {rev.reviewText}
                </p>

                {/* Performance Output Badge */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Verified Plant Output:
                  </span>
                  <span className="font-bold text-brand-dark bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-[11px]">
                    {rev.operationalHighlight}
                  </span>
                </div>

              </div>

              {/* Client Profile Footer */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${rev.avatarBg} text-white font-extrabold flex items-center justify-center text-sm shadow-xs`}>
                    {rev.initials}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <span>{rev.clientName}</span>
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        <ShieldCheck className="w-3 h-3" /> Verified Buyer
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium">{rev.designation} • {rev.companyName}</div>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <div className="text-[11px] font-semibold text-slate-700 flex items-center gap-1 justify-end">
                    <MapPin className="w-3 h-3 text-brand-accent" /> {rev.location}
                  </div>
                  <div className="text-[10px] text-slate-400">{rev.industrialZone}</div>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Assurance Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Want to inspect running customer machinery in your city?</h4>
              <p className="text-xs text-slate-500">We arrange client reference visits across Mumbai, Surat, Pune, Hyderabad, and Delhi-NCR industrial belts.</p>
            </div>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs shrink-0 transition-colors"
          >
            Request Factory Reference Contact
          </a>
        </div>

      </div>
    </section>
  );
}
