import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IQRCode extends Document {
  name: string;
  shortSlug: string;
  qrType: 'dynamic' | 'static' | 'campaign';
  targetUrl: string;
  description: string;
  scanCount: number;
  status: 'active' | 'paused' | 'archived';
  campaignName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const qrCodeSchema = new Schema<IQRCode>(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    shortSlug: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      lowercase: true 
    },
    qrType: { 
      type: String, 
      enum: ['dynamic', 'static', 'campaign'], 
      default: 'dynamic' 
    },
    targetUrl: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      default: "" 
    },
    scanCount: { 
      type: Number, 
      default: 0 
    },
    status: { 
      type: String, 
      enum: ['active', 'paused', 'archived'], 
      default: 'active' 
    },
    campaignName: { 
      type: String, 
      default: "" 
    }
  },
  {
    timestamps: true,
  }
);

export const QRCode: Model<IQRCode> = 
  mongoose.models.QRCode || mongoose.model<IQRCode>('QRCode', qrCodeSchema);

export default QRCode;
