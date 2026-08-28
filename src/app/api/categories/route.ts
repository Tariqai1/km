import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';

const fallbackCategories = [
  { _id: "cat-tf", name: "Tutti Frutti Processing", slug: "tutti-frutti" },
  { _id: "cat-bakery", name: "Bakery Machinery", slug: "bakery" },
  { _id: "cat-chips", name: "Potato Chips Lines", slug: "chips" },
  { _id: "cat-namkeen", name: "Namkeen & Farsan", slug: "namkeen" },
  { _id: "cat-sweets", name: "Sweets Machinery", slug: "sweets" },
  { _id: "cat-vibro", name: "Screening & Grading", slug: "vibro-sifter" }
];

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find().sort({ name: 1 });
    if (!categories || categories.length === 0) {
      return NextResponse.json(fallbackCategories);
    }
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Categories API error:", error);
    return NextResponse.json(fallbackCategories);
  }
}
