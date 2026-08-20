"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle, Quote, Factory, ThumbsUp } from "lucide-react";

interface Review {
  id: string;
  clientName: string;
  companyName: string;
  location: string;
  machineBought: string;
  rating: number;
  date: string;
  reviewText: string;
  outputMetric?: string;
}

const machineReviews: Review[] = [
  {
    id: "rev-1",
    clientName: "Rameshwar Sharma",
    companyName: "Shree Krishna Bakery & Foods",
    location: "Mumbai, Maharashtra",
    machineBought: "50 Kg Commercial Spiral Dough Mixer (SS-304)",
    rating: 5,
    date: "August 2026",
    reviewText: "Humne K.M. Engineering se 50 Kg Spiral Mixer lagwaya tha. Machine ka vibration bilkul zero hai aur heavy-duty motor daily 800 kg dough bina kisi overheating ke mix karti hai. SS-304 finish premium grade hai aur cleaning bahut aasan hai. Highly recommended!",
    outputMetric: "800+ Kg Daily Output"
  },
  {
    id: "rev-2",
    clientName: "Hitesh Patel",
    companyName: "Royal Fruit Processing Works",
    location: "Surat, Gujarat",
    machineBought: "Automatic Tutti Frutti Dicing & Processing Plant",
    rating: 5,
    date: "July 2026",
    reviewText: "Tutti Frutti cutting aur dicing machine ki cutting precision lajawab hai. Cubes ka size bilkul uniform aata hai aur papaya wastage 20% se kam ho gaya. Abdulkaleem sir ne on-time installation aur training provide ki.",
    outputMetric: "Uniform 6mm/8mm Cube Cut"
  },
  {
    id: "rev-3",
    clientName: "Mohammad Farooq",
    companyName: "Al-Barkat Sweets & Namkeen",
    location: "Hyderabad, Telangana",
    machineBought: "30-Inch Sanitary Vibro Sifter & Screener",
    rating: 5,
    date: "June 2026",
    reviewText: "Besan aur maida screening ke liye 30-inch vibro sifter liya tha. Mesh blinding ki problem completely khatam ho gayi hai. Machine continuous 12 hours run hoti hai aur noise level bahut kam hai. Pan-India dispatch bhi fast tha.",
    outputMetric: "500 Kg/Hr Sifting Capacity"
  },
  {
    id: "rev-4",
    clientName: "Satish Patil",
    companyName: "Krushna Dairy & Confectionery",
    location: "Pune, Maharashtra",
    machineBought: "Industrial Tilting Planetary Mixer (60L)",
    rating: 5,
    date: "May 2026",
    reviewText: "Cake batter aur cream whipping ke liye tilting mixer best investment raha. Build quality heavy iron base aur food-grade SS bowl ke sath aati hai jo long life ensure karti hai. After-sales service prompt hai.",
    outputMetric: "60L Batch Capacity"
  }
];

export default function MachineReviews() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-brand-accent text-xs font-semibold uppercase tracking-wider mb-4">
            <ThumbsUp className="w-3.5 h-3.5" /> Verified Machinery Feedback
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white mb-4">
            Trusted by 200+ Food & Bakery Manufacturers
          </h2>
          <div className="w-20 h-1 bg-brand-accent mx-auto rounded-full mb-4"></div>
          <p className="text-slate-300 text-base sm:text-lg">
            Real reviews and verified performance metrics from commercial bakery owners and food processing plant operators across India.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {machineReviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-700/60 shadow-xl hover:border-brand-accent/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top: Machine Name Badge & Rating */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-700/60 mb-4">
                  <div className="flex items-center gap-2 text-brand-accent font-semibold text-sm">
                    <Factory className="w-4 h-4 shrink-0" />
                    <span className="truncate">{rev.machineBought}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Review Quote */}
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-slate-600/40 absolute -top-2 -left-2 -z-0" />
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed relative z-10 italic">
                    &ldquo;{rev.reviewText}&rdquo;
                  </p>
                </div>
              </div>

              {/* Bottom: Client Profile & Output Metric */}
              <div className="pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-sm sm:text-base">{rev.clientName}</h4>
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full font-medium">
                      <CheckCircle className="w-3 h-3" /> Verified Buyer
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {rev.companyName} • <span className="text-slate-500">{rev.location}</span>
                  </p>
                </div>

                {rev.outputMetric && (
                  <div className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-lg text-right shrink-0">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Performance</div>
                    <div className="text-xs font-bold text-amber-400">{rev.outputMetric}</div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Strip */}
        <div className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-display text-white">Need a Custom Machinery Consultation?</h3>
            <p className="text-sm text-slate-300">Talk directly with our lead manufacturing engineers in Mumbai for capacity sizing and factory layout.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+919876543210"
              className="bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all text-sm inline-flex items-center gap-2"
            >
              Call Engineering Team
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
