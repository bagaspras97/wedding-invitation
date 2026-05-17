import { NextResponse } from "next/server";
import type { RsvpRecord, WishRecord } from "@/lib/submissions/validation";
import { supabaseAdminRest } from "@/lib/submissions/supabase-rest";

export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "yollatyo";

const isAuthorized = (request: Request) => {
  return request.headers.get("x-admin-password") === ADMIN_PASSWORD;
};

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const [rsvpResponse, wishesResponse] = await Promise.all([
      supabaseAdminRest("rsvps?select=id,name,guests,attendance,created_at&order=created_at.desc"),
      supabaseAdminRest("wishes?select=id,name,message,created_at&order=created_at.desc"),
    ]);

    if (!rsvpResponse.ok || !wishesResponse.ok) {
      return NextResponse.json(
        { error: "Unable to load admin responses." },
        { status: rsvpResponse.ok ? wishesResponse.status : rsvpResponse.status },
      );
    }

    const [rsvps, wishes] = (await Promise.all([
      rsvpResponse.json(),
      wishesResponse.json(),
    ])) as [RsvpRecord[], WishRecord[]];

    const attending = rsvps.filter((rsvp) => rsvp.attendance === "attending");
    const declined = rsvps.filter((rsvp) => rsvp.attendance === "declined");
    const guestCount = attending.reduce((total, rsvp) => total + rsvp.guests, 0);

    return NextResponse.json({
      rsvps,
      wishes,
      summary: {
        totalRsvps: rsvps.length,
        attending: attending.length,
        declined: declined.length,
        guestCount,
        wishes: wishes.length,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("service role key")) {
      return NextResponse.json(
        {
          error:
            "Admin database key is not configured. Add SUPABASE_SERVICE_ROLE_KEY to .env.local, then restart the dev server.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Unable to reach admin response service." },
      { status: 500 },
    );
  }
}
