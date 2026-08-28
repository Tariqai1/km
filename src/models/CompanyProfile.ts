import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPhoneNumber {
  number: string;
  label: string;
  isPrimary: boolean;
}

export interface ICompanyProfile extends Document {
  companyName: string;
  tagline: string;
  description: string;
  contactPerson: string;
  designation: string;
  logoUrl: string;
  phones: IPhoneNumber[];
  whatsappNumber: string;
  defaultWhatsappMessage: string;
  email: string;
  website: string;
  address: string;
  googleMapsUrl: string;
  companyProfilePdfUrl: string;
  productCataloguePdfUrl: string;
  // Feature On/Off Toggles (Admin Controlled)
  showWhatsapp: boolean;
  showCall: boolean;
  showEmail: boolean;
  showSaveContact: boolean;
  showWebsite: boolean;
  showCompanyProfile: boolean;
  showCatalogue: boolean;
  showDirections: boolean;
  showShareProfile: boolean;
  showAgmBanner: boolean;
  // AGM Goa 2026 Quick Highlight
  agmTitle: string;
  agmDate: string;
  agmLocation: string;
  agmMessage: string;
  agmLink: string;
  createdAt: Date;
  updatedAt: Date;
}

const phoneSchema = new Schema<IPhoneNumber>({
  number: { type: String, required: true },
  label: { type: String, default: "Sales & Inquiry" },
  isPrimary: { type: Boolean, default: false }
}, { _id: false });

const companyProfileSchema = new Schema<ICompanyProfile>(
  {
    companyName: { 
      type: String, 
      required: true, 
      default: "K.M. Engineering Works" 
    },
    tagline: { 
      type: String, 
      default: "Manufacturer of Food Machines & Equipments" 
    },
    description: { 
      type: String, 
      default: "Mumbai's leading manufacturer of high-performance food processing plants including Tutti Frutti Plants, Commercial Bakery Plants, Potato Chips Lines, Sweets & Namkeen Machinery, and Customized Industrial Equipment." 
    },
    contactPerson: { 
      type: String, 
      default: "Abdul Kaleem Sayyed" 
    },
    designation: { 
      type: String, 
      default: "Founder & Managing Director" 
    },
    logoUrl: { 
      type: String, 
      default: "/logo.png" 
    },
    phones: { 
      type: [phoneSchema], 
      default: [
        { number: "+91-9821669131", label: "Primary Sales & Technical", isPrimary: true },
        { number: "+91-8828489550", label: "Works & Support", isPrimary: false }
      ]
    },
    whatsappNumber: { 
      type: String, 
      default: "+919821669131" 
    },
    defaultWhatsappMessage: { 
      type: String, 
      default: "Hello K.M. Engineering Works, I would like to know more about your food processing machinery and plants." 
    },
    email: { 
      type: String, 
      default: "kmengineering1973@gmail.com" 
    },
    website: { 
      type: String, 
      default: "https://www.kmengineeringworks.com" 
    },
    address: { 
      type: String, 
      default: "Workshop No. 58, Near Kwality Bakery, Azmi Compound, Khairani Road, Sakinaka, Mumbai – 400072, India" 
    },
    googleMapsUrl: { 
      type: String, 
      default: "https://maps.google.com/?q=Workshop+No.+58,+Near+Kwality+Bakery,+Azmi+Compound,+Khairani+Road,+Sakinaka,+Mumbai+400072" 
    },
    companyProfilePdfUrl: { 
      type: String, 
      default: "" 
    },
    productCataloguePdfUrl: { 
      type: String, 
      default: "" 
    },
    // Admin Toggle Switches
    showWhatsapp: { type: Boolean, default: true },
    showCall: { type: Boolean, default: true },
    showEmail: { type: Boolean, default: true },
    showSaveContact: { type: Boolean, default: true },
    showWebsite: { type: Boolean, default: true },
    showCompanyProfile: { type: Boolean, default: true },
    showCatalogue: { type: Boolean, default: true },
    showDirections: { type: Boolean, default: true },
    showShareProfile: { type: Boolean, default: true },
    showAgmBanner: { type: Boolean, default: true },
    // AGM Goa 2026
    agmTitle: { 
      type: String, 
      default: "1st AGM Sponsor • All India Tutti Frutti & Karonda Manufacturers Association" 
    },
    agmDate: { 
      type: String, 
      default: "26 September 2026" 
    },
    agmLocation: { 
      type: String, 
      default: "Goa, India" 
    },
    agmMessage: { 
      type: String, 
      default: "Visit our exclusive machinery stall and meet our engineering team at the AGM in Goa!" 
    },
    agmLink: { 
      type: String, 
      default: "/campaign/agm-2026" 
    }
  },
  {
    timestamps: true,
  }
);

export const CompanyProfile: Model<ICompanyProfile> = 
  mongoose.models.CompanyProfile || mongoose.model<ICompanyProfile>('CompanyProfile', companyProfileSchema);

export default CompanyProfile;
