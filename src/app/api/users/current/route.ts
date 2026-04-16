import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    id: "u_1",
    firstName: "Pet",
    lastName: "Explorer",
    image: "/avatar.svg",
  });
}
