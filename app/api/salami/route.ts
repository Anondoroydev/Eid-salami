// This file exists to clear the build cache - redirects to /api/links
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// Generate a short unique ID using built-in crypto API
function generateId(length = 10): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => chars[byte % chars.length]).join("");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ownerName, bkash, nagad, rocket, bkashLink, nagadLink } = body;

    if (!ownerName || !bkash) {
      return NextResponse.json(
        { error: "Name and bkash are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const id = generateId(10);

    const { data, error } = await supabase
      .from("salami_links")
      .insert({
        id,
        owner_name: ownerName,
        bkash,
        nagad: nagad || "",
        rocket: rocket || "",
        bkash_link: bkashLink || "",
        nagad_link: nagadLink || "",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data.id });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to create salami link" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("salami_links")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Salami link not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ownerName: data.owner_name,
      bkash: data.bkash,
      nagad: data.nagad,
      rocket: data.rocket,
      bkashLink: data.bkash_link || "",
      nagadLink: data.nagad_link || "",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch salami link" },
      { status: 500 }
    );
  }
}
