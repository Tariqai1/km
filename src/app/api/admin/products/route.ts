import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { productSchema } from '@/lib/validations';
import { ZodError } from 'zod';

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find()
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const validatedData = productSchema.parse(body);
    
    const slug = slugify(validatedData.title);
    
    // Check if slug exists
    const existing = await Product.findOne({ slug });
    if (existing) {
      return NextResponse.json({ error: 'A product with a similar title already exists' }, { status: 400 });
    }
    
    const product = await Product.create({
      ...validatedData,
      category: validatedData.categoryId,
      slug
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
