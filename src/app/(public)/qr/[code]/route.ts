import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import QRCode from "@/models/QRCode";
import ScanEvent from "@/models/ScanEvent";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    await dbConnect();
    const { code } = await params;
    const slug = (code || "").toLowerCase().trim();

    // Find dynamic QR
    const qrRecord = await QRCode.findOne({ shortSlug: slug });

    // Track Scan event
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

    // Increment scan counter and log event non-blocking
    if (qrRecord) {
      await QRCode.updateOne({ _id: qrRecord._id }, { $inc: { scanCount: 1 } });
    }

    await ScanEvent.create({
      qrSlug: slug,
      eventType: "scan",
      device,
      browser,
      os,
      city: decodeURIComponent(city),
      region: decodeURIComponent(region),
      country,
      referrer,
      timestamp: new Date()
    });

    // Destination target URL
    const destination = qrRecord && qrRecord.status === "active" ? qrRecord.targetUrl : "/connect";

    // Absolute or relative URL redirection
    if (destination.startsWith("http://") || destination.startsWith("https://")) {
      return NextResponse.redirect(destination, 307);
    }

    const host = req.headers.get("host") || "www.kmengineeringworks.com";
    const protocol = req.headers.get("x-forwarded-proto") || "https";
    const absoluteUrl = new URL(destination, `${protocol}://${host}`);

    return NextResponse.redirect(absoluteUrl, 307);
  } catch (error) {
    console.error("QR Redirection Error:", error);
    return NextResponse.redirect(new URL("/connect", req.url), 307);
  }
}
