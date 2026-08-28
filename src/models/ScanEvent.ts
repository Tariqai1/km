import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IScanEvent extends Document {
  qrSlug: string;
  eventType: 'scan' | 'whatsapp' | 'call' | 'email' | 'vcard' | 'website' | 'catalogue' | 'profile_pdf' | 'direction' | 'share' | 'agm_click';
  device: string;
  browser: string;
  os: string;
  city: string;
  region: string;
  country: string;
  referrer: string;
  timestamp: Date;
}

const scanEventSchema = new Schema<IScanEvent>(
  {
    qrSlug: { 
      type: String, 
      required: true, 
      index: true 
    },
    eventType: { 
      type: String, 
      enum: ['scan', 'whatsapp', 'call', 'email', 'vcard', 'website', 'catalogue', 'profile_pdf', 'direction', 'share', 'agm_click'],
      default: 'scan',
      index: true 
    },
    device: { type: String, default: "Mobile" },
    browser: { type: String, default: "Chrome" },
    os: { type: String, default: "Android" },
    city: { type: String, default: "Mumbai" },
    region: { type: String, default: "Maharashtra" },
    country: { type: String, default: "India" },
    referrer: { type: String, default: "" },
    timestamp: { type: Date, default: Date.now, index: true }
  },
  {
    timestamps: true
  }
);

export const ScanEvent: Model<IScanEvent> = 
  mongoose.models.ScanEvent || mongoose.model<IScanEvent>('ScanEvent', scanEventSchema);

export default ScanEvent;
