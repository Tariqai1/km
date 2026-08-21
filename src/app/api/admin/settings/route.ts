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
      if (body.companyName !== undefined) settings.companyName = body.companyName;
      if (body.logoUrl !== undefined) settings.logoUrl = body.logoUrl;
      if (body.heroBannerUrl !== undefined) settings.heroBannerUrl = body.heroBannerUrl;
      if (body.heroHeading !== undefined) settings.heroHeading = body.heroHeading;
      if (body.heroSubheading !== undefined) settings.heroSubheading = body.heroSubheading;
      if (body.primaryColor !== undefined) settings.primaryColor = body.primaryColor;
      if (body.accentColor !== undefined) settings.accentColor = body.accentColor;
      if (body.contactEmail !== undefined) settings.contactEmail = body.contactEmail;
      if (body.contactPhone !== undefined) settings.contactPhone = body.contactPhone;
      if (body.contactAddress !== undefined) settings.contactAddress = body.contactAddress;
      
      if (body.companyStats && Array.isArray(body.companyStats)) {
        settings.companyStats = body.companyStats;
      }

      // Digital Banner settings
      if (body.bannerActive !== undefined) settings.bannerActive = body.bannerActive;
      if (body.bannerBadge !== undefined) settings.bannerBadge = body.bannerBadge;
      if (body.bannerHeading !== undefined) settings.bannerHeading = body.bannerHeading;
      if (body.bannerSubheading !== undefined) settings.bannerSubheading = body.bannerSubheading;
      if (body.bannerCtaText !== undefined) settings.bannerCtaText = body.bannerCtaText;
      if (body.bannerCtaLink !== undefined) settings.bannerCtaLink = body.bannerCtaLink;

      // About page settings
      if (body.aboutHeading !== undefined) settings.aboutHeading = body.aboutHeading;
      if (body.aboutStory !== undefined) settings.aboutStory = body.aboutStory;
      if (body.founderName !== undefined) settings.founderName = body.founderName;
      if (body.founderTitle !== undefined) settings.founderTitle = body.founderTitle;
      if (body.founderQuote !== undefined) settings.founderQuote = body.founderQuote;

      if (body.aboutHighlights && Array.isArray(body.aboutHighlights)) {
        settings.aboutHighlights = body.aboutHighlights;
      }

      if (body.machineryCapabilities && Array.isArray(body.machineryCapabilities)) {
        settings.machineryCapabilities = body.machineryCapabilities;
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
