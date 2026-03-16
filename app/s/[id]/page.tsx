"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { EidHero } from "@/components/eid-hero";
import { PaymentCards } from "@/components/payment-cards";
import { CelebrationModal } from "@/components/celebration-modal";
import { FloatingElements } from "@/components/floating-elements";
import { Loader2 } from "lucide-react";

interface PaymentInfo {
  bkash: string;
  nagad: string;
  rocket: string;
  ownerName: string;
  bkashLink?: string;
  nagadLink?: string;
}

export default function SharedSalamiPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [showCelebration, setShowCelebration] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/salami?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setPaymentInfo(data);
        } else {
          setError("লিংকটি পাওয়া যায়নি");
        }
      } catch {
        setError("ডেটা লোড করতে সমস্যা হয়েছে");
      } finally {
        setIsLoading(false);
      }
    }
    
    if (id) {
      fetchData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center">
        <FloatingElements />
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-foreground/70 text-lg">লোড হচ্ছে...</p>
        </div>
      </main>
    );
  }

  if (error || !paymentInfo) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center">
        <FloatingElements />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">দুঃখিত!</h1>
          <p className="text-foreground/70">{error || "লিংকটি পাওয়া যায়নি"}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <FloatingElements />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <EidHero ownerName={paymentInfo.ownerName} />
        <PaymentCards
          paymentInfo={paymentInfo}
          onPaymentClick={() => setShowCelebration(true)}
        />
      </div>

      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        ownerName={paymentInfo.ownerName}
      />
    </main>
  );
}
