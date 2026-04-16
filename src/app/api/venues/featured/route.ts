import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    products: [
      {
        id: 1,
        title: "Goblin Green Park",
        category: "Park",
        brand: "Taipei",
      },
      {
        id: 2,
        title: "Paws & Beans Cafe",
        category: "Cafe",
        brand: "Taichung",
      },
      {
        id: 3,
        title: "Wagging Trails",
        category: "Trail",
        brand: "Kaohsiung",
      },
    ],
  });
}
