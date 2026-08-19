import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICompanyStat {
  value: string;
  label: string;
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
  createdAt: Date;
  updatedAt: Date;
}

const statSchema = new Schema<ICompanyStat>({
  value: { type: String, required: true },
  label: { type: String, required: true }
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
    contactAddress: { type: String, required: true, default: "Mumbai, Maharashtra, India" },
    companyStats: { 
      type: [statSchema], 
      default: [
        { value: "15+", label: "Years Experience" },
        { value: "500+", label: "Machines Delivered" },
        { value: "200+", label: "Happy Clients" },
        { value: "Pan-India", label: "Service Network" }
      ]
    },
  },
  {
    timestamps: true,
  }
);

// We only ever need one document for settings.
export const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>('Settings', settingsSchema);
