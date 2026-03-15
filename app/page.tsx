"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { EidHero } from "@/components/eid-hero";
import { PaymentCards } from "@/components/payment-cards";
import { SettingsModal } from "@/components/settings-modal";
import { CelebrationModal } from "@/components/celebration-modal";
import { FloatingElements } from "@/components/floating-elements";
import { Settings, Link2, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic"; // ✅ prerendering disable

export interface PaymentInfo {
  bkash: string;
  nagad: string;
  rocket: string;
  ownerName: string;
}

export default function EidPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showSettings, setShowSettings] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedLinkId, setSavedLinkId] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    bkash: "01XXXXXXXXX",
    nagad: "01XXXXXXXXX",
    rocket: "01XXXXXXXXX",
    ownerName: "আপনার নাম",
  });

  // ✅ client-only localStorage load
  useEffect(() => {
    const saved = localStorage.getItem("eid-payment-info");
    const savedId = localStorage.getItem("eid-link-id");
    if (saved) setPaymentInfo(JSON.parse(saved));
    if (savedId) setSavedLinkId(savedId);
  }, []);

  const handleSavePaymentInfo = async (info: PaymentInfo) => {
    setPaymentInfo(info);
    localStorage.setItem("eid-payment-info", JSON.stringify(info));
    setShowSettings(false);

    setIsSaving(true);
    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });
      if (response.ok) {
        const data = await response.json();
        setSavedLinkId(data.id);
        localStorage.setItem("eid-link-id", data.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyLink = async () => {
    let id = savedLinkId;

    if (!id) {
      setIsSaving(true);
      try {
        const res = await fetch("/api/links", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentInfo),
        });
        const data = await res.json();
        id = data.id;
        setSavedLinkId(id);
        localStorage.setItem("eid-link-id", id);
      } catch (err) {
        console.error(err);
        return;
      } finally {
        setIsSaving(false);
      }
    }

    const link = `${window.location.origin}/s/${id}`;
    await navigator.clipboard.writeText(link);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handlePaymentClick = () => setShowCelebration(true);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <FloatingElements />

      {/* Top buttons */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="bg-card/50 backdrop-blur-sm hover:bg-card text-foreground"
          onClick={handleCopyLink}
          disabled={isSaving}
          title="লিংক কপি করুন"
        >
          {isSaving ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : linkCopied ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Link2 className="h-5 w-5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="bg-card/50 backdrop-blur-sm hover:bg-card text-foreground"
          onClick={() => setShowSettings(true)}
          title="সেটিংস"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {linkCopied && (
        <div className="fixed top-16 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-in fade-in slide-in-from-top-2 text-sm font-medium">
          লিংক কপি হয়েছে! এখন শেয়ার করুন
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <EidHero ownerName={paymentInfo.ownerName} />
        <PaymentCards
          paymentInfo={paymentInfo}
          onPaymentClick={handlePaymentClick}
        />
      </div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        paymentInfo={paymentInfo}
        onSave={handleSavePaymentInfo}
      />

      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        ownerName={paymentInfo.ownerName}
      />
    </main>
  );
}
