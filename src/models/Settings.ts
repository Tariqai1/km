import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICompanyStat {
  value: string;
  label: string;
}

export interface IAboutHighlight {
  title: string;
  desc: string;
}

export interface IMachineryCapability {
  title: string;
  desc: string;
  capacity: string;
}

export interface ISettings extends Document {
  companyName: string;
  logoUrl: string;
  heroBannerUrl: string;
  heroHeading: string;
  heroSubheading: string;
  primaryColor: string;
  accentColor: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  companyStats: ICompanyStat[];
  // About Page Fields
  aboutHeading?: string;
  aboutStory?: string;
  founderName?: string;
  founderTitle?: string;
  founderQuote?: string;
  aboutHighlights?: IAboutHighlight[];
  machineryCapabilities?: IMachineryCapability[];
  createdAt: Date;
  updatedAt: Date;
}

const statSchema = new Schema<ICompanyStat>({
  value: { type: String, required: true },
  label: { type: String, required: true }
}, { _id: false });

const highlightSchema = new Schema<IAboutHighlight>({
  title: { type: String, required: true },
  desc: { type: String, required: true }
}, { _id: false });

const capabilitySchema = new Schema<IMachineryCapability>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  capacity: { type: String, default: "" }
}, { _id: false });

const settingsSchema = new Schema<ISettings>(
  {
    companyName: { type: String, required: true, default: "K.M. Engineering Works" },
    logoUrl: { type: String, default: "" },
    heroBannerUrl: { type: String, default: "" },
    heroHeading: { 
      type: String, 
      required: true, 
      default: "Precision-Engineered Machinery for Modern Industry" 
    },
    heroSubheading: { 
      type: String, 
      required: true, 
      default: "Mumbai's trusted manufacturer of high-quality, durable, and efficient machinery for the food and bakery industry." 
    },
    primaryColor: { type: String, required: true, default: "#1B365D" },
    accentColor: { type: String, required: true, default: "#E8590C" },
    contactEmail: { type: String, required: true, default: "info@kmengineering.com" },
    contactPhone: { type: String, required: true, default: "+91 98765 43210" },
    contactAddress: { type: String, required: true, default: "Gala No.58, Azmi Compound, Near Kwality Bakery, Mumbai - 400072, Maharashtra, India" },
    companyStats: { 
      type: [statSchema], 
      default: [
        { value: "15+", label: "Years Experience" },
        { value: "500+", label: "Machines Delivered" },
        { value: "200+", label: "Happy Clients" },
        { value: "Pan-India", label: "Service Network" }
      ]
    },
    // Dynamic About Page Configuration
    aboutHeading: { 
      type: String, 
      default: "Pioneering Precision in Food Processing Machinery" 
    },
    aboutStory: { 
      type: String, 
      default: "Established under the visionary leadership of Abdulkaleem Abdulkadar Sayyed, K.M. Engineering Works has grown into Mumbai's leading manufacturer of commercial bakery equipment, tutti frutti processing lines, and high-efficiency screening machinery." 
    },
    founderName: { 
      type: String, 
      default: "Abdulkaleem Abdulkadar Sayyed" 
    },
    founderTitle: { 
      type: String, 
      default: "Founder & Managing Director" 
    },
    founderQuote: { 
      type: String, 
      default: "Our commitment is simple: build machinery that operates reliably 24/7, minimizes food wastage, and maximizes the profitability of Indian food entrepreneurs." 
    },
    aboutHighlights: {
      type: [highlightSchema],
      default: [
        {
          title: "15+ Years Industry Experience",
          desc: "Deep domain expertise in designing and manufacturing robust food processing machinery."
        },
        {
          title: "100% Food-Grade Metallurgy",
          desc: "All product contact parts fabricated exclusively in certified SS-304 & SS-316 stainless steel."
        },
        {
          title: "Custom Machinery Design",
          desc: "Bespoke engineering solutions tailored to your production volume, layout, and raw material."
        },
        {
          title: "Pan-India Installation & Support",
          desc: "On-site installation, technician training, and guaranteed availability of OEM spare parts."
        }
      ]
    },
    machineryCapabilities: {
      type: [capabilitySchema],
      default: [
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
      ]
    }
  },
  {
    timestamps: true,
  }
);

// We only ever need one document for settings.
export const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>('Settings', settingsSchema);
