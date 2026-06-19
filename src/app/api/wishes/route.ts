import { NextResponse } from "next/server";
import { archivedWishes } from "@/lib/submissions/archive";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ wishes: archivedWishes });
}

export async function POST() {
  return NextResponse.json(
    { error: "Wishes are closed. This invitation is now an archive." },
    { status: 410 },
  );
}
