import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// Generate a random 5 character code
function generateShortCode(): string {
  const chars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// POST - Create a new short link
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bkash, nagad, rocket, upay, ownerName, bkashQR, nagadQR, rocketQR, upayQR } = body;

    if (!bkash || !nagad || !rocket || !ownerName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    // Generate a unique short code
    let code = generateShortCode();
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      const { data: existing } = await supabase
        .from("short_links")
        .select("code")
        .eq("code", code)
        .single();

      if (!existing) break;
      code = generateShortCode();
      attempts++;
    }

    if (attempts === maxAttempts) {
      return NextResponse.json(
        { error: "Failed to generate unique code" },
        { status: 500 }
      );
    }

    // Insert the new short link
    const { data, error } = await supabase
      .from("short_links")
      .insert({
        code,
        bkash,
        nagad,
        rocket,
        upay: upay || null,
        owner_name: ownerName,
        bkash_qr: bkashQR || null,
        nagad_qr: nagadQR || null,
        rocket_qr: rocketQR || null,
        upay_qr: upayQR || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create short link" },
        { status: 500 }
      );
    }

    return NextResponse.json({ code: data.code });
  } catch (error) {
    console.error("Error creating short link:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET - Fetch short link data by code
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Missing code parameter" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("short_links")
      .select("*")
      .eq("code", code)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Short link not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      bkash: data.bkash,
      nagad: data.nagad,
      rocket: data.rocket,
      upay: data.upay,
      ownerName: data.owner_name,
      bkashQR: data.bkash_qr,
      nagadQR: data.nagad_qr,
      rocketQR: data.rocket_qr,
      upayQR: data.upay_qr,
    });
  } catch (error) {
    console.error("Error fetching short link:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
