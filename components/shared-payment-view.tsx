"use client";

import { EidHero } from "@/components/eid-hero";
import { PaymentCards } from "@/components/payment-cards";
import { IslamicBackground } from "@/components/islamic-background";
import type { PaymentInfo } from "@/app/page";

interface SharedPaymentViewProps {
  paymentInfo: PaymentInfo;
}

export function SharedPaymentView({ paymentInfo }: SharedPaymentViewProps) {
  return (
    <main className="relative h-screen overflow-hidden">
      {/* Islamic Animated Background */}
      <IslamicBackground />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-5">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center gap-6 md:gap-8 my-5">
          <EidHero ownerName={paymentInfo.ownerName} />
          <PaymentCards paymentInfo={paymentInfo} />
        </div>
      </div>
    </main>
  );
}
