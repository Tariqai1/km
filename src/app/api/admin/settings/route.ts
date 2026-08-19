import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Settings } from "@/models/Settings";

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Since we only have one settings document, we update the first one we find
    // or create it if it doesn't exist
    let settings = await Settings.findOne();

    if (settings) {
      settings.companyName = body.companyName ?? settings.companyName;
      settings.logoUrl = body.logoUrl ?? settings.logoUrl;
      settings.heroBannerUrl = body.heroBannerUrl ?? settings.heroBannerUrl;
      settings.heroHeading = body.heroHeading ?? settings.heroHeading;
      settings.heroSubheading = body.heroSubheading ?? settings.heroSubheading;
      settings.primaryColor = body.primaryColor ?? settings.primaryColor;
      settings.accentColor = body.accentColor ?? settings.accentColor;
      settings.contactEmail = body.contactEmail ?? settings.contactEmail;
      settings.contactPhone = body.contactPhone ?? settings.contactPhone;
      settings.contactAddress = body.contactAddress ?? settings.contactAddress;
      
      if (body.companyStats && Array.isArray(body.companyStats)) {
        settings.companyStats = body.companyStats;
      }
      
      await settings.save();
    } else {
      settings = await Settings.create(body);
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
