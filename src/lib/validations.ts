import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const imageSchema = z.object({
  url: z.string(),
  cloudinaryId: z.string().optional().default(''),
});

export const productSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters long'),
  categoryId: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  features: z.array(z.string()).default([]),
  specifications: z.record(z.string(), z.string()).default({}),
  images: z.array(imageSchema).default([]),
  brochureUrl: z.string().url().optional().or(z.literal('')),
  isFeatured: z.boolean().default(false),
  status: z.enum(['Active', 'Draft']).default('Active'),
});

export const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  slug: z.string().optional(),
  description: z.string().optional().default(''),
  coverImage: imageSchema.optional().nullable(),
});

export const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  phone: z.string().min(10, 'Phone must be at least 10 characters long'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  companyName: z.string().optional(),
  productInterest: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
  country: z.string().default('India'),
});
