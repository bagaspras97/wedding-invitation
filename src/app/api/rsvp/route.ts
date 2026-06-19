import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function POST() {
  return NextResponse.json(
    { error: "RSVP is closed. This invitation is now an archive." },
    { status: 410 },
  );
}
