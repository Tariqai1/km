import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import Product from '@/models/Product';
import Category from '@/models/Category';

export async function GET() {
  try {
    await dbConnect();
    
    const [
      totalEnquiries,
      newEnquiries,
      activeProducts,
      totalCategories
    ] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'New' }),
      Product.countDocuments({ status: 'Active' }),
      Category.countDocuments()
    ]);
    
    return NextResponse.json({
      totalEnquiries,
      newEnquiries,
      activeProducts,
      totalCategories
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
