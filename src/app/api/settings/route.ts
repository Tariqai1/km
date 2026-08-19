import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Settings } from "@/models/Settings";

export async function GET() {
  try {
    await dbConnect();
    
    // Fetch the single settings document
    let settings = await Settings.findOne();
    
    // If no settings exist yet, create default settings
    if (!settings) {
      settings = await Settings.create({});
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}
