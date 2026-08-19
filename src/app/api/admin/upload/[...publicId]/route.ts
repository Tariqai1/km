import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ publicId: string[] }> }
) {
  try {
    const { publicId } = await params;
    const fullPublicId = publicId.join('/');
    
    const result = await cloudinary.uploader.destroy(fullPublicId);
    
    if (result.result === 'ok') {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to delete image' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
