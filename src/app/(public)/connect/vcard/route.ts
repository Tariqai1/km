import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import CompanyProfile from "@/models/CompanyProfile";

export async function GET() {
  try {
    await dbConnect();
    const profile = await CompanyProfile.findOne();

    const name = profile?.contactPerson || "Abdul Kaleem Sayyed";
    const company = profile?.companyName || "K.M. Engineering Works";
    const title = profile?.designation || "Founder & Managing Director";
    const primaryPhone = profile?.phones?.[0]?.number || "+919821669131";
    const secondaryPhone = profile?.phones?.[1]?.number || "+918828489550";
    const email = profile?.email || "kmengineering1973@gmail.com";
    const website = profile?.website || "https://www.kmengineeringworks.com";
    const address = profile?.address || "Workshop No. 58, Near Kwality Bakery, Azmi Compound, Khairani Road, Sakinaka, Mumbai – 400072, India";

    // Standard RFC 6350 vCard format
    const vCardContent = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${name}`,
      `N:Sayyed;Abdul Kaleem;;;`,
      `ORG:${company}`,
      `TITLE:${title}`,
      `TEL;TYPE=CELL,VOICE,PREF:${primaryPhone}`,
      secondaryPhone ? `TEL;TYPE=WORK,VOICE:${secondaryPhone}` : "",
      `EMAIL;TYPE=WORK,INTERNET:${email}`,
      `URL:${website}`,
      `ADR;TYPE=WORK:;;Workshop No. 58, Near Kwality Bakery;Azmi Compound, Khairani Road, Sakinaka;Mumbai;Maharashtra;400072;India`,
      `NOTE:Manufacturer of Food Machines & Equipments (Tutti Frutti Plants, Bakery Machinery, Potato Chips, Sweets & Namkeen Plants)`,
      "END:VCARD"
    ]
      .filter(Boolean)
      .join("\r\n");

    return new NextResponse(vCardContent, {
      status: 200,
      headers: {
        "Content-Type": "text/vcard; charset=utf-8",
        "Content-Disposition": `attachment; filename="KM-Engineering-Abdul-Kaleem-Sayyed.vcf"`,
        "Cache-Control": "no-cache"
      }
    });
  } catch (error) {
    console.error("Failed to generate vCard:", error);
    return new NextResponse("Error generating contact card", { status: 500 });
  }
}
