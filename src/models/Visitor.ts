import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IVisitor extends Document {
  ip: string;
  city: string;
  region: string;
  country: string;
  device: string;
  browser: string;
  os: string;
  path: string;
  productTitle?: string;
  referrer: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const visitorSchema = new Schema<IVisitor>(
  {
    ip: { type: String, default: "Unknown" },
    city: { type: String, default: "Mumbai" },
    region: { type: String, default: "Maharashtra" },
    country: { type: String, default: "India" },
    device: { type: String, default: "Mobile" },
    browser: { type: String, default: "Chrome" },
    os: { type: String, default: "Android" },
    path: { type: String, required: true },
    productTitle: { type: String, default: "" },
    referrer: { type: String, default: "Direct" },
    userAgent: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

// Optimize query performance for admin dashboard stats
visitorSchema.index({ createdAt: -1 });
visitorSchema.index({ path: 1 });
visitorSchema.index({ city: 1 });

export const Visitor: Model<IVisitor> = mongoose.models.Visitor || mongoose.model<IVisitor>('Visitor', visitorSchema);
export default Visitor;
