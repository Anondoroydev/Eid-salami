"use client";

import { useState, useEffect } from "react";
import { EidHero } from "@/components/eid-hero";
import { PaymentCards } from "@/components/payment-cards";
import { SettingsModal } from "@/components/settings-modal";
import { IslamicBackground } from "@/components/islamic-background";
import { Settings, Share2, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PaymentInfo {
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

export default function EidPage() {
  const [showSettings, setShowSettings] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    bkash: "01XXXXXXXXX",
    nagad: "01XXXXXXXXX",
    rocket: "01XXXXXXXXX",
    upay: "01XXXXXXXXX",
    ownerName: "আপনার নাম",
  });
  const [linkCopied, setLinkCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("eid-payment-info");
    if (saved) {
      setPaymentInfo(JSON.parse(saved));
    }
  }, []);

  const handleSavePaymentInfo = (info: PaymentInfo) => {
    setPaymentInfo(info);
    localStorage.setItem("eid-payment-info", JSON.stringify(info));
    setShowSettings(false);
  };

  const copyToClipboard = async (text: string) => {
    // Try modern clipboard API first
    if (navigator.clipboard && document.hasFocus()) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // Fall through to fallback
      }
    }
    
    // Fallback for older browsers or when document is not focused
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand("copy");
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const handleShareLink = async () => {
    if (isSharing) return;
    
    setIsSharing(true);
    
    try {
      // Create short link via API
      const response = await fetch("/api/short-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bkash: paymentInfo.bkash,
          nagad: paymentInfo.nagad,
          rocket: paymentInfo.rocket,
          upay: paymentInfo.upay,
          ownerName: paymentInfo.ownerName,
          bkashQR: paymentInfo.bkashQR,
          nagadQR: paymentInfo.nagadQR,
          rocketQR: paymentInfo.rocketQR,
          upayQR: paymentInfo.upayQR,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create short link");
      }

      const { code } = await response.json();
      const shareUrl = `${window.location.origin}/${code}`;
      
      await copyToClipboard(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error("Error creating short link:", error);
      alert("শেয়ার লিংক তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSharing(false);
    }
  };

  

  return (
    <main className="relative h-screen overflow-hidden">
      {/* Islamic Animated Background with Real Image */}
      <IslamicBackground />

      {/* Top Right Buttons - Share Link & Settings */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {/* Share Link Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`h-10 w-10 backdrop-blur-md border shadow-lg transition-all duration-300 hover:scale-105 ${
            linkCopied 
              ? 'bg-accent/20 border-accent/40 text-accent hover:bg-accent/30' 
              : 'bg-card/50 hover:bg-card/80 text-foreground border-primary/20 hover:border-primary/40 hover:shadow-primary/20'
          }`}
          onClick={handleShareLink}
          disabled={isSharing}
          title={linkCopied ? "লিংক কপি হয়েছে!" : "লিংক শেয়ার করুন"}
        >
          {isSharing ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : linkCopied ? (
            <Check className="h-5 w-5 animate-scale-in" />
          ) : (
            <Share2 className="h-5 w-5" />
          )}
        </Button>

        {/* Settings Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 bg-card/50 backdrop-blur-md hover:bg-card/80 text-foreground border border-primary/20 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 hover:border-primary/40"
          onClick={() => setShowSettings(true)}
          title="সেটিংস"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Copy Success Toast */}
      {linkCopied && (
        <div className="fixed top-16 right-4 z-50 animate-slide-up">
          <div className="bg-accent/20 backdrop-blur-md border border-accent/30 rounded-lg px-4 py-2 text-accent text-sm font-medium shadow-lg">
            লিংক কপি হয়েছে!
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center h-full px-4 pt-16 pb-8 overflow-y-auto">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-4 md:gap-6">
          <EidHero ownerName={paymentInfo.ownerName} />
          <PaymentCards paymentInfo={paymentInfo} />
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        paymentInfo={paymentInfo}
        onSave={handleSavePaymentInfo}
      />
    </main>
  );
}
