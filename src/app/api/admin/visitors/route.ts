import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Visitor from "@/models/Visitor";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const search = searchParams.get("search") || "";

    const filter: any = {};
    if (search) {
      filter.$or = [
        { city: { $regex: search, $options: "i" } },
        { path: { $regex: search, $options: "i" } },
        { ip: { $regex: search, $options: "i" } },
        { referrer: { $regex: search, $options: "i" } },
        { device: { $regex: search, $options: "i" } },
      ];
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [
      totalVisits,
      todayVisits,
      recentVisitors,
      uniqueIps,
      topPagesAgg,
      deviceAgg,
      cityAgg
    ] = await Promise.all([
      Visitor.countDocuments(),
      Visitor.countDocuments({ createdAt: { $gte: todayStart } }),
      Visitor.find(filter).sort({ createdAt: -1 }).limit(limit).lean(),
      Visitor.distinct("ip"),
      Visitor.aggregate([
        { $group: { _id: "$path", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 6 }
      ]),
      Visitor.aggregate([
        { $group: { _id: "$device", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Visitor.aggregate([
        { $group: { _id: "$city", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ])
    ]);

    const deviceStats = {
      mobile: 0,
      desktop: 0,
      tablet: 0
    };
    deviceAgg.forEach((d: any) => {
      const dev = (d._id || "").toLowerCase();
      if (dev === "mobile") deviceStats.mobile = d.count;
      else if (dev === "tablet") deviceStats.tablet = d.count;
      else deviceStats.desktop = d.count;
    });

    const topLocations = cityAgg.map((c: any) => ({
      city: c._id || "Unknown",
      count: c.count
    }));

    const topPages = topPagesAgg.map((p: any) => ({
      path: p._id || "/",
      count: p.count
    }));

    return NextResponse.json({
      success: true,
      stats: {
        totalVisits,
        todayVisits,
        uniqueVisitors: uniqueIps.length,
        topCity: topLocations[0]?.city || "Mumbai",
      },
      deviceStats,
      topLocations,
      topPages,
      recentVisitors,
    });
  } catch (error) {
    console.error("Failed to load visitor analytics:", error);
    return NextResponse.json(
      { error: "Failed to load visitor analytics" },
      { status: 500 }
    );
  }
}
