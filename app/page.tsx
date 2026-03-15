"use client";

import { useState, useEffect } from "react";
import { EidHero } from "@/components/eid-hero";
import { PaymentCards } from "@/components/payment-cards";
import { SettingsModal } from "@/components/settings-modal";
import { CelebrationModal } from "@/components/celebration-modal";
import { FloatingElements } from "@/components/floating-elements";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PaymentInfo {
  bkash: string;
  nagad: string;
  rocket: string;
  ownerName: string;
}

export default function EidPage() {
  const [showSettings, setShowSettings] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    bkash: "01XXXXXXXXX",
    nagad: "01XXXXXXXXX",
    rocket: "01XXXXXXXXX",
    ownerName: "আপনার নাম",
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("eid-payment-info");
    if (saved) {
      setPaymentInfo(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage when payment info changes
  const handleSavePaymentInfo = (info: PaymentInfo) => {
    setPaymentInfo(info);
    localStorage.setItem("eid-payment-info", JSON.stringify(info));
    setShowSettings(false);
  };

  const handlePaymentClick = () => {
    setShowCelebration(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Floating decorative elements */}
      <FloatingElements />

      {/* Settings button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 bg-card/50 backdrop-blur-sm hover:bg-card text-foreground"
        onClick={() => setShowSettings(true)}
      >
        <Settings className="h-5 w-5" />
      </Button>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <EidHero ownerName={paymentInfo.ownerName} />
        <PaymentCards
          paymentInfo={paymentInfo}
          onPaymentClick={handlePaymentClick}
        />
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        paymentInfo={paymentInfo}
        onSave={handleSavePaymentInfo}
      />

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        ownerName={paymentInfo.ownerName}
      />
    </main>
  );
}
