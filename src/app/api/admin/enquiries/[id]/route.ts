import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Enquiry from '@/models/Enquiry';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    
    const { name, email, phone, company, companyName, productInterest, status, message, adminNotes } = body;
    
    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (company !== undefined || companyName !== undefined) updateData.companyName = company || companyName;
    if (productInterest !== undefined) updateData.productInterest = productInterest;
    if (message !== undefined) updateData.message = message;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    
    if (status !== undefined) {
      // Normalize status to Title Case ('New', 'In-Progress', 'Contacted', 'Archived')
      const statusMap: Record<string, string> = {
        'new': 'New',
        'in-progress': 'In-Progress',
        'contacted': 'Contacted',
        'archived': 'Archived',
        'New': 'New',
        'In-Progress': 'In-Progress',
        'Contacted': 'Contacted',
        'Archived': 'Archived',
      };
      updateData.status = statusMap[status] || status;
    }
    
    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }
    
    return NextResponse.json(enquiry);
  } catch {
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
    
    const enquiry = await Enquiry.findByIdAndDelete(id);
    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
