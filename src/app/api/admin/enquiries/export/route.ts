import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import '@/models/Product';

export async function GET() {
  try {
    await dbConnect();
    
    const enquiries = await Enquiry.find().populate('productInterest', 'title').sort({ createdAt: -1 });
    
    // Generate CSV string
    const headers = ['Date', 'Name', 'Email', 'Phone', 'Company', 'Country', 'Product Interest', 'Status', 'Message', 'Admin Notes'];
    
    const escapeCsv = (str: string) => {
      if (!str) return '';
      const stringified = String(str);
      if (stringified.includes(',') || stringified.includes('"') || stringified.includes('\n')) {
        return `"${stringified.replace(/"/g, '""')}"`;
      }
      return stringified;
    };
    
    const rows = enquiries.map((eq: any) => [
      eq.createdAt.toISOString().split('T')[0],
      escapeCsv(eq.name),
      escapeCsv(eq.email),
      escapeCsv(eq.phone),
      escapeCsv(eq.companyName),
      escapeCsv(eq.country),
      escapeCsv(eq.productInterest ? eq.productInterest.title : ''),
      escapeCsv(eq.status),
      escapeCsv(eq.message),
      escapeCsv(eq.adminNotes)
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const response = new NextResponse(csvContent);
    response.headers.set('Content-Type', 'text/csv');
    response.headers.set('Content-Disposition', 'attachment; filename="enquiries.csv"');
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
