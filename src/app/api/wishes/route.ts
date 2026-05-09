import { NextResponse } from "next/server";
import { parseWishPayload, type WishRecord } from "@/lib/submissions/validation";
import { supabaseRest } from "@/lib/submissions/supabase-rest";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await supabaseRest(
      "wishes?select=id,name,message,created_at&order=created_at.desc&limit=100",
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to load wishes." },
        { status: response.status },
      );
    }

    const wishes = (await response.json()) as WishRecord[];
    return NextResponse.json({ wishes });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach wishes service." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = parseWishPayload(payload);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const response = await supabaseRest("wishes?select=id,name,message,created_at", {
      method: "POST",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify(parsed.data),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to save wish right now." },
        { status: response.status },
      );
    }

    const [wish] = (await response.json()) as WishRecord[];
    return NextResponse.json({ wish });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach wishes service." },
      { status: 500 },
    );
  }
}
