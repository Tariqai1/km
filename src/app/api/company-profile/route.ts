import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import CompanyProfile from "@/models/CompanyProfile";

export async function GET() {
  try {
    await dbConnect();
    let profile = await CompanyProfile.findOne();

    if (!profile) {
      profile = await CompanyProfile.create({
        companyName: "K.M. Engineering Works",
        tagline: "Manufacturer of Food Machines & Equipments",
        description: "Mumbai's leading manufacturer of high-performance food processing plants including Tutti Frutti Plants, Commercial Bakery Plants, Potato Chips Lines, Sweets & Namkeen Machinery, and Customized Industrial Equipment.",
        contactPerson: "Abdul Kaleem Sayyed",
        designation: "Founder & Managing Director",
        logoUrl: "/logo.png",
        phones: [
          { number: "+91-9821669131", label: "Primary Sales & Technical", isPrimary: true },
          { number: "+91-8828489550", label: "Works & Support", isPrimary: false }
        ],
        whatsappNumber: "+919821669131",
        defaultWhatsappMessage: "Hello K.M. Engineering Works, I would like to know more about your food processing machinery and plants.",
        email: "kmengineering1973@gmail.com",
        website: "https://www.kmengineeringworks.com",
        address: "Workshop No. 58, Near Kwality Bakery, Azmi Compound, Khairani Road, Sakinaka, Mumbai – 400072, India",
        googleMapsUrl: "https://maps.google.com/?q=Workshop+No.+58,+Near+Kwality+Bakery,+Azmi+Compound,+Khairani+Road,+Sakinaka,+Mumbai+400072",
        showWhatsapp: true,
        showCall: true,
        showEmail: true,
        showSaveContact: true,
        showWebsite: true,
        showCompanyProfile: true,
        showCatalogue: true,
        showDirections: true,
        showShareProfile: true,
        showAgmBanner: true
      });
    }

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error("Failed to fetch company profile:", error);
    return NextResponse.json({ error: "Failed to fetch company profile" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    let profile = await CompanyProfile.findOne();
    if (profile) {
      Object.assign(profile, body);
      await profile.save();
    } else {
      profile = await CompanyProfile.create(body);
    }

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error("Failed to update company profile:", error);
    return NextResponse.json({ error: "Failed to update company profile" }, { status: 500 });
  }
}
