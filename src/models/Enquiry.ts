import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  email?: string;
  phone: string;
  companyName?: string;
  productInterest?: mongoose.Types.ObjectId;
  message: string;
  country: string;
  status: 'New' | 'In-Progress' | 'Contacted' | 'Archived';
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    productInterest: {
      type: Schema.Types.Mixed,
    },
    message: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: 'India',
    },
    status: {
      type: String,
      enum: ['New', 'In-Progress', 'Contacted', 'Archived'],
      default: 'New',
    },
    adminNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

enquirySchema.index({ status: 1 });
enquirySchema.index({ createdAt: -1 });

const Enquiry: Model<IEnquiry> = mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', enquirySchema);

export default Enquiry;
