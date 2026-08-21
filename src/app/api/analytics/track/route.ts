import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Visitor from "@/models/Visitor";

function parseUserAgent(ua: string) {
  let device = "Desktop";
  let browser = "Chrome";
  let os = "Windows";

  const lowerUa = ua.toLowerCase();

  // Device detection
  if (/mobile|android|iphone|ipad|ipod|blackberry|opera mini|iemobile/i.test(lowerUa)) {
    device = /ipad|tablet/i.test(lowerUa) ? "Tablet" : "Mobile";
  }

  // OS detection
  if (/android/i.test(lowerUa)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(lowerUa)) os = "iOS";
  else if (/windows/i.test(lowerUa)) os = "Windows";
  else if (/macintosh|mac os x/i.test(lowerUa)) os = "macOS";
  else if (/linux/i.test(lowerUa)) os = "Linux";

  // Browser detection
  if (/edg/i.test(lowerUa)) browser = "Edge";
  else if (/opr|opera/i.test(lowerUa)) browser = "Opera";
  else if (/chrome|crios/i.test(lowerUa)) browser = "Chrome";
  else if (/safari/i.test(lowerUa)) browser = "Safari";
  else if (/firefox|fxios/i.test(lowerUa)) browser = "Firefox";

  return { device, browser, os };
}

function parseReferrer(refUrl: string) {
  if (!refUrl) return "Direct / WhatsApp";
  const lower = refUrl.toLowerCase();
  if (lower.includes("google")) return "Google Search";
  if (lower.includes("whatsapp") || lower.includes("wa.me")) return "WhatsApp";
  if (lower.includes("facebook") || lower.includes("fb.com")) return "Facebook";
  if (lower.includes("instagram")) return "Instagram";
  if (lower.includes("linkedin")) return "LinkedIn";
  if (lower.includes("indiamart")) return "IndiaMART";
  if (lower.includes("tradeindia")) return "TradeIndia";
  if (lower.includes("youtube")) return "YouTube";
  return "Direct";
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const path = body.path || "/";

    // Do not track admin panel or internal API routes
    if (path.startsWith("/admin") || path.startsWith("/api")) {
      return NextResponse.json({ success: true, ignored: true });
    }

    const headers = req.headers;
    const rawIp = headers.get("x-forwarded-for") || headers.get("x-real-ip") || "127.0.0.1";
    const ip = rawIp.split(",")[0].trim();

    // Vercel Geolocation Headers
    const city = headers.get("x-vercel-ip-city") || body.city || "Mumbai";
    const region = headers.get("x-vercel-ip-country-region") || "Maharashtra";
    const country = headers.get("x-vercel-ip-country") || "India";

    const userAgent = headers.get("user-agent") || "";
    const { device, browser, os } = parseUserAgent(userAgent);

    const rawRef = headers.get("referer") || body.referrer || "";
    const referrer = parseReferrer(rawRef);

    await dbConnect();

    // Save visitor record asynchronously
    await Visitor.create({
      ip,
      city: decodeURIComponent(city),
      region,
      country,
      device,
      browser,
      os,
      path,
      productTitle: body.productTitle || "",
      referrer,
      userAgent: userAgent.slice(0, 200),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tracking error:", error);
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
