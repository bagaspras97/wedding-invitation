import { NextResponse } from "next/server";
import { archivedRsvps, archivedSummary, archivedWishes } from "@/lib/submissions/archive";

export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "yollatyo";

const isAuthorized = (request: Request) => {
  return request.headers.get("x-admin-password") === ADMIN_PASSWORD;
};

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json({
    rsvps: archivedRsvps,
    wishes: archivedWishes,
    summary: archivedSummary,
  });
}
