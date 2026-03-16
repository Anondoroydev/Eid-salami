import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { ownerName, bkash, nagad, rocket, bkashQR, nagadQR, rocketQR } = body;

    if (!ownerName) {
      return NextResponse.json(
        { error: "Owner name is required" },
        { status: 400 }
      );
    }

    // Generate a unique slug
    const slug = nanoid(10);

    const { data, error } = await supabase
      .from("payment_profiles")
      .insert({
        slug,
        owner_name: ownerName,
        bkash: bkash || null,
        nagad: nagad || null,
        rocket: rocket || null,
        bkash_qr: bkashQR || null,
        nagad_qr: nagadQR || null,
        rocket_qr: rocketQR || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save payment profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({ slug: data.slug, id: data.id });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("payment_profiles")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Payment profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ownerName: data.owner_name,
      bkash: data.bkash,
      nagad: data.nagad,
      rocket: data.rocket,
      bkashQR: data.bkash_qr,
      nagadQR: data.nagad_qr,
      rocketQR: data.rocket_qr,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
