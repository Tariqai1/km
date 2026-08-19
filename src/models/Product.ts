import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  slug: string;
  description?: string;
  category: mongoose.Types.ObjectId;
  images: Array<{
    url: string;
    cloudinaryId: string;
  }>;
  features: string[];
  specifications: Map<string, string>;
  brochureUrl?: string;
  isFeatured: boolean;
  status: 'Active' | 'Draft';
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    images: {
      type: [
        {
          url: String,
          cloudinaryId: String,
        },
      ],
      validate: [
        (val: any[]) => val.length <= 8,
        'Cannot exceed 8 images',
      ],
    },
    features: {
      type: [String],
      default: [],
    },
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    brochureUrl: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['Active', 'Draft'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ category: 1 });
productSchema.index({ status: 1 });
productSchema.index({ isFeatured: 1 });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;
