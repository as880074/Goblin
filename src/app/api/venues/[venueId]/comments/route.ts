import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ venueId: "1" }, { venueId: "2" }, { venueId: "3" }];
}

export async function GET(_: Request, { params }: { params: Promise<{ venueId: string }> }) {
  const { venueId } = await params;

  return NextResponse.json({
    comments: [
      {
        id: `${venueId}-1`,
        body: "Great pet water station and shade.",
      },
      {
        id: `${venueId}-2`,
        body: "Friendly staff gave treats to our dog.",
      },
    ],
  });
}
