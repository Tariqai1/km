import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { productSchema } from '@/lib/validations';
import { ZodError } from 'zod';
import cloudinary from '@/lib/cloudinary';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const product = await Product.findById(id).populate('category', 'name slug').lean();
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    
    // Use partial validation so status toggle and partial updates work
    const validatedData = productSchema.partial().parse(body);
    
    // Map categoryId to category field for Mongoose
    const updateData: Record<string, unknown> = { ...validatedData };
    if (validatedData.categoryId) {
      updateData.category = validatedData.categoryId;
      delete updateData.categoryId;
    }
    
    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    // Delete images from cloudinary
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map((img: { cloudinaryId?: string }) => {
        if (img.cloudinaryId) {
          return cloudinary.uploader.destroy(img.cloudinaryId);
        }
        return Promise.resolve();
      });
      await Promise.allSettled(deletePromises);
    }
    
    await Product.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
