import { NextRequest, NextResponse } from "next/server";
import QRCodeLib from "qrcode";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text") || "https://www.kmengineeringworks.com/connect";
    const format = searchParams.get("format") || "png"; // 'png' | 'svg'
    const size = parseInt(searchParams.get("size") || "800", 10);

    if (format === "svg") {
      const svgString = await QRCodeLib.toString(text, {
        type: "svg",
        margin: 2,
        color: {
          dark: "#0F2440",
          light: "#FFFFFF"
        },
        errorCorrectionLevel: "H"
      });

      return new NextResponse(svgString, {
        status: 200,
        headers: {
          "Content-Type": "image/svg+xml",
          "Content-Disposition": `inline; filename="km-qr.svg"`,
          "Cache-Control": "public, max-age=31536000, immutable"
        }
      });
    }

    // Default: High-Res PNG
    const pngBuffer = await QRCodeLib.toBuffer(text, {
      type: "png",
      width: size,
      margin: 2,
      color: {
        dark: "#0F2440",
        light: "#FFFFFF"
      },
      errorCorrectionLevel: "H"
    });

    return new NextResponse(pngBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `inline; filename="km-qr.png"`,
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch (error) {
    console.error("QR Generation error:", error);
    return new NextResponse("Failed to generate QR image", { status: 500 });
  }
}
