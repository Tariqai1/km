import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ScanEvent from "@/models/ScanEvent";
import QRCode from "@/models/QRCode";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { qrSlug = "connect", eventType = "scan" } = body;

    // Detect device & headers
    const userAgent = req.headers.get("user-agent") || "";
    let device = "Desktop";
    if (/mobile/i.test(userAgent)) device = "Mobile";
    else if (/tablet|ipad/i.test(userAgent)) device = "Tablet";

    let browser = "Other";
    if (/chrome|crios/i.test(userAgent) && !/edge|opr\//i.test(userAgent)) browser = "Chrome";
    else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = "Safari";
    else if (/firefox|fxios/i.test(userAgent)) browser = "Firefox";
    else if (/edge/i.test(userAgent)) browser = "Edge";

    let os = "Other";
    if (/android/i.test(userAgent)) os = "Android";
    else if (/iphone|ipad|ipod/i.test(userAgent)) os = "iOS";
    else if (/windows/i.test(userAgent)) os = "Windows";
    else if (/macintosh|mac os x/i.test(userAgent)) os = "macOS";

    const city = req.headers.get("x-vercel-ip-city") || "Mumbai";
    const region = req.headers.get("x-vercel-ip-country-region") || "Maharashtra";
    const country = req.headers.get("x-vercel-ip-country") || "India";
    const referrer = req.headers.get("referer") || "";

    // Increment QR Scan Count if it's a scan event
    if (eventType === "scan") {
      await QRCode.findOneAndUpdate(
        { shortSlug: qrSlug.toLowerCase() },
        { $inc: { scanCount: 1 } }
      );
    }

    // Save ScanEvent
    await ScanEvent.create({
      qrSlug,
      eventType,
      device,
      browser,
      os,
      city: decodeURIComponent(city),
      region: decodeURIComponent(region),
      country,
      referrer,
      timestamp: new Date()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to track event:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
