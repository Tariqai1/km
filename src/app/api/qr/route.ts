import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import QRCode from "@/models/QRCode";

export async function GET() {
  try {
    await dbConnect();
    let qrs = await QRCode.find().sort({ createdAt: -1 });

    // Seed standard initial QRs if database is empty
    if (qrs.length === 0) {
      const defaultQrs = [
        {
          name: "Main Business Profile QR (Recommended for all leaflets & visiting cards)",
          shortSlug: "connect",
          qrType: "dynamic",
          targetUrl: "/connect",
          description: "Permanent Master QR code for leaflets, visiting cards, exhibition banners, and social profiles.",
          status: "active"
        },
        {
          name: "Company Website Direct QR",
          shortSlug: "website",
          qrType: "dynamic",
          targetUrl: "https://www.kmengineeringworks.com",
          description: "Directs visitors to official engineering homepage.",
          status: "active"
        },
        {
          name: "WhatsApp Direct Inquiry QR",
          shortSlug: "whatsapp",
          qrType: "dynamic",
          targetUrl: "https://wa.me/919821669131?text=Hello%20KM%20Engineering,%20I%20scanned%20your%20QR%20code.",
          description: "Instant chat with sales engineering on WhatsApp.",
          status: "active"
        },
        {
          name: "Machinery Product Catalogue QR",
          shortSlug: "catalogue",
          qrType: "dynamic",
          targetUrl: "/products",
          description: "Opens full machinery catalog with PDF technical specs.",
          status: "active"
        },
        {
          name: "AGM Goa 2026 Campaign QR",
          shortSlug: "agm-2026",
          qrType: "campaign",
          targetUrl: "/campaign/agm-2026",
          description: "Sponsor campaign for 1st AGM of All India Tutti Frutti Association in Goa.",
          status: "active"
        },
        {
          name: "1-Tap Save Contact (vCard) QR",
          shortSlug: "contact",
          qrType: "dynamic",
          targetUrl: "/connect/vcard",
          description: "Downloads Abdul Kaleem Sayyed vCard directly into mobile contacts.",
          status: "active"
        }
      ];

      await QRCode.insertMany(defaultQrs);
      qrs = await QRCode.find().sort({ createdAt: -1 });
    }

    return NextResponse.json({ success: true, qrs });
  } catch (error) {
    console.error("Failed to fetch QRs:", error);
    return NextResponse.json({ error: "Failed to fetch QR codes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const shortSlug = (body.shortSlug || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-_]/g, "");

    if (!shortSlug) {
      return NextResponse.json({ error: "Valid Short URL Slug is required" }, { status: 400 });
    }

    const existing = await QRCode.findOne({ shortSlug });
    if (existing) {
      return NextResponse.json({ error: "This Short URL slug is already in use" }, { status: 400 });
    }

    const newQr = await QRCode.create({
      name: body.name,
      shortSlug,
      qrType: body.qrType || "dynamic",
      targetUrl: body.targetUrl,
      description: body.description || "",
      campaignName: body.campaignName || "",
      status: body.status || "active"
    });

    return NextResponse.json({ success: true, qr: newQr });
  } catch (error) {
    console.error("Failed to create QR:", error);
    return NextResponse.json({ error: "Failed to create QR code" }, { status: 500 });
  }
}
