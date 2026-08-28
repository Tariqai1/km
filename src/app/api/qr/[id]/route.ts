import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import QRCode from "@/models/QRCode";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const updated = await QRCode.findByIdAndUpdate(
      id,
      {
        name: body.name,
        targetUrl: body.targetUrl,
        description: body.description,
        status: body.status,
        campaignName: body.campaignName
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "QR code not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, qr: updated });
  } catch (error) {
    console.error("Failed to update QR:", error);
    return NextResponse.json({ error: "Failed to update QR code" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    await QRCode.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete QR:", error);
    return NextResponse.json({ error: "Failed to delete QR code" }, { status: 500 });
  }
}
