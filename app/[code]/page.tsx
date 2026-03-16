"use client";

import { useState, useEffect } from "react";
import { EidHero } from "@/components/eid-hero";
import { PaymentCards } from "@/components/payment-cards";
import { IslamicBackground } from "@/components/islamic-background";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

interface PaymentInfo {
  bkash: string;
  nagad: string;
  rocket: string;
  upay: string;
  ownerName: string;
  bkashQR?: string;
  nagadQR?: string;
  rocketQR?: string;
  upayQR?: string;
}

export default function SharedPaymentPage() {
  const params = useParams();
  const code = params.code as string;
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPaymentData = async () => {
      if (!code) return;
      
      try {
        const response = await fetch(`/api/short-link?code=${code}`);
        if (response.ok) {
          const data = await response.json();
          setPaymentInfo({
            bkash: data.bkash,
            nagad: data.nagad,
            rocket: data.rocket,
            upay: data.upay || "01XXXXXXXXX",
            ownerName: data.ownerName,
            bkashQR: data.bkashQR,
            nagadQR: data.nagadQR,
            rocketQR: data.rocketQR,
            upayQR: data.upayQR,
          });
        } else {
          setError("লিংকটি খুঁজে পাওয়া যায়নি");
        }
      } catch {
        setError("ডাটা লোড করতে সমস্যা হয়েছে");
      } finally {
        setIsLoading(false);
      }
    };

    loadPaymentData();
  }, [code]);

  if (isLoading) {
    return (
      <main className="relative h-screen overflow-hidden">
        <IslamicBackground />
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-foreground/70 font-medium">লোড হচ্ছে...</p>
        </div>
      </main>
    );
  }

  if (error || !paymentInfo) {
    return (
      <main className="relative h-screen overflow-hidden">
        <IslamicBackground />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="bg-card/80 backdrop-blur-md rounded-2xl p-8 border border-primary/20 shadow-xl">
            <h1 className="text-2xl font-bold text-foreground mb-2">দুঃখিত!</h1>
            <p className="text-foreground/70">{error || "লিংকটি খুঁজে পাওয়া যায়নি"}</p>
            <a 
              href="/" 
              className="inline-block mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              হোম পেজে যান
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative h-screen overflow-hidden">
      <IslamicBackground />

      <div className="relative z-10 flex flex-col items-center h-full px-4 pt-16 pb-8 overflow-y-auto">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-4 md:gap-6">
          <EidHero ownerName={paymentInfo.ownerName} />
          <PaymentCards paymentInfo={paymentInfo} />
        </div>
      </div>
    </main>
  );
}
