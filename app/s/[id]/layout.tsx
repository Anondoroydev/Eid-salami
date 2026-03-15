import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

interface Props {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  const supabase = await createClient();
  const { data } = await supabase
    .from("salami_links")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) {
    return {
      title: "ঈদ মোবারক | Eid Mubarak",
      description: "ঈদের শুভেচ্ছা জানান প্রিয়জনদের",
    };
  }

  const title = `${data.owner_name} - ঈদ মোবারক`;
  const description = `${data.owner_name} আপনাকে ঈদের শুভেচ্ছা জানাচ্ছে। ঈদি পাঠাতে বিকাশ: ${data.bkash}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function SharedLayout({ children }: Props) {
  return <>{children}</>;
}
