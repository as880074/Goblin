import { NextResponse } from "next/server";

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
