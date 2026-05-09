import { NextResponse } from "next/server";
import { parseRsvpPayload } from "@/lib/submissions/validation";
import { supabaseRest } from "@/lib/submissions/supabase-rest";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = parseRsvpPayload(payload);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const response = await supabaseRest("rsvps", {
      method: "POST",
      headers: {
        Prefer: "return=minimal",
      },
      body: JSON.stringify(parsed.data),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to save RSVP right now." },
        { status: response.status },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach RSVP service." },
      { status: 500 },
    );
  }
}
