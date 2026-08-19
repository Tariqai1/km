import { NextResponse } from 'next/server';
import { generateSignature } from '@/lib/cloudinary';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { folder = 'km-engineering' } = body;
    
    const timestamp = Math.round(new Date().getTime() / 1000);
    
    const paramsToSign = {
      timestamp,
      folder,
    };
    
    const signature = generateSignature(paramsToSign);
    
    return NextResponse.json({
      timestamp,
      signature,
      folder,
      api_key: process.env.CLOUDINARY_API_KEY || '659211597593824',
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'gksfzjxf',
    });
  } catch (error) {
    console.error("Signature Generation Error:", error);
    return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 });
  }
}
