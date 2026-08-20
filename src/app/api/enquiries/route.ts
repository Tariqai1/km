import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import { enquirySchema } from '@/lib/validations';
import { ZodError } from 'zod';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const validatedData = enquirySchema.parse(body);
    
    const enquiryData: Record<string, unknown> = {
      name: validatedData.name.trim(),
      phone: validatedData.phone.trim(),
      message: validatedData.message.trim(),
      country: validatedData.country || 'India',
    };

    if (validatedData.email && validatedData.email.trim()) {
      enquiryData.email = validatedData.email.trim();
    }
    if (validatedData.companyName && validatedData.companyName.trim()) {
      enquiryData.companyName = validatedData.companyName.trim();
    }
    if (validatedData.productInterest && validatedData.productInterest.trim()) {
      enquiryData.productInterest = validatedData.productInterest.trim();
    }
    
    const enquiry = await Enquiry.create(enquiryData);
    
    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Enquiry creation error:', error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
