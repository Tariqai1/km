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
    
    const enquiry = await Enquiry.create(validatedData);
    
    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
