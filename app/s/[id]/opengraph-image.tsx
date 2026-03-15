import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";
export const alt = "ঈদ মোবারক - সালামি পাঠান";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const supabase = await createClient();
  const { data } = await supabase
    .from("salami_links")
    .select("*")
    .eq("id", id)
    .single();

  const ownerName = data?.owner_name || "প্রিয়জন";
  const bkash = data?.bkash || "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#065f46",
          backgroundImage: "linear-gradient(135deg, #065f46 0%, #047857 50%, #10b981 100%)",
        }}
      >
        {/* Decorative crescents */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "80px",
            fontSize: "80px",
            opacity: 0.3,
            display: "flex",
          }}
        >
          ☪
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "80px",
            opacity: 0.3,
            display: "flex",
          }}
        >
          ☪
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "40px",
          }}
        >
          {/* Arabic greeting */}
          <div
            style={{
              fontSize: "48px",
              color: "#fcd34d",
              marginBottom: "20px",
              fontFamily: "serif",
              display: "flex",
            }}
          >
            عيد مبارك
          </div>

          {/* Bengali greeting */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "20px",
              display: "flex",
            }}
          >
            ঈদ মোবারক
          </div>

          {/* Owner name */}
          <div
            style={{
              fontSize: "42px",
              color: "#d1fae5",
              marginBottom: "30px",
              display: "flex",
            }}
          >
            {ownerName}
          </div>

          {/* bKash info */}
          {bkash && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.15)",
                borderRadius: "16px",
                padding: "16px 32px",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  color: "white",
                  display: "flex",
                }}
              >
                বিকাশ: {bkash}
              </div>
            </div>
          )}

          {/* Tagline */}
          <div
            style={{
              fontSize: "24px",
              color: "#a7f3d0",
              marginTop: "30px",
              display: "flex",
            }}
          >
            আপনার ঈদি পাঠিয়ে আশীর্বাদ করুন
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
