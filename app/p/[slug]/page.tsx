import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { SharedPaymentView } from "@/components/shared-payment-view";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data } = await supabase
    .from("payment_profiles")
    .select("owner_name")
    .eq("slug", slug)
    .single();

  if (!data) {
    return {
      title: "Payment Profile Not Found",
    };
  }

  return {
    title: `${data.owner_name} - ঈদ মোবারক পেমেন্ট`,
    description: `${data.owner_name} কে ঈদের সালামী পাঠান bKash, Nagad বা Rocket এ`,
  };
}

export default async function SharedPaymentPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("payment_profiles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    notFound();
  }

  const paymentInfo = {
    ownerName: data.owner_name,
    bkash: data.bkash || "",
    nagad: data.nagad || "",
    rocket: data.rocket || "",
    bkashQR: data.bkash_qr || undefined,
    nagadQR: data.nagad_qr || undefined,
    rocketQR: data.rocket_qr || undefined,
  };

  return <SharedPaymentView paymentInfo={paymentInfo} />;
}
