"use client";

import { useState, useEffect } from "react";
import { EidHero } from "@/components/eid-hero";
import { PaymentCards } from "@/components/payment-cards";
import { SettingsModal } from "@/components/settings-modal";
import { IslamicBackground } from "@/components/islamic-background";
import { Settings, Share2, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PaymentInfo } from "@/lib/types";

export type { PaymentInfo };

export default function EidPage() {
  const [showSettings, setShowSettings] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    bkash: "01XXXXXXXXX",
    nagad: "01XXXXXXXXX",
    rocket: "01XXXXXXXXX",
    ownerName: "আপনার নাম",
  });
  const [linkCopied, setLinkCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [savedSlug, setSavedSlug] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("eid-payment-info");
    const slug = localStorage.getItem("eid-payment-slug");
    if (saved) {
      setPaymentInfo(JSON.parse(saved));
    }
    if (slug) {
      setSavedSlug(slug);
    }
  }, []);

  const handleSavePaymentInfo = async (info: PaymentInfo) => {
    setPaymentInfo(info);
    localStorage.setItem("eid-payment-info", JSON.stringify(info));
    // Clear saved slug so a new one will be generated on share
    localStorage.removeItem("eid-payment-slug");
    setSavedSlug(null);
    setShowSettings(false);
  };

  const handleShareLink = async () => {
    setIsSharing(true);
    
    try {
      // Save to Supabase and get the slug
      const response = await fetch("/api/payment-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerName: paymentInfo.ownerName,
          bkash: paymentInfo.bkash,
          nagad: paymentInfo.nagad,
          rocket: paymentInfo.rocket,
          bkashQR: paymentInfo.bkashQR,
          nagadQR: paymentInfo.nagadQR,
          rocketQR: paymentInfo.rocketQR,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      const data = await response.json();
      const slug = data.slug;
      
      // Save slug locally
      localStorage.setItem("eid-payment-slug", slug);
      setSavedSlug(slug);
      
      // Create shareable link
      const shareUrl = `${window.location.origin}/p/${slug}`;
      
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error("Failed to share:", error);
      // Fallback to old method if Supabase fails
      const shareData = {
        bkash: paymentInfo.bkash,
        nagad: paymentInfo.nagad,
        rocket: paymentInfo.rocket,
        name: paymentInfo.ownerName,
      };
      const encodedData = btoa(encodeURIComponent(JSON.stringify(shareData)));
      const shareUrl = `${window.location.origin}?data=${encodedData}`;
      
      try {
        await navigator.clipboard.writeText(shareUrl);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      } catch {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      }
    } finally {
      setIsSharing(false);
    }
  };

  // Load shared data from URL on mount (for backwards compatibility)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");
    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(data)));
        if (decoded.bkash && decoded.nagad && decoded.rocket && decoded.name) {
          setPaymentInfo({
            bkash: decoded.bkash,
            nagad: decoded.nagad,
            rocket: decoded.rocket,
            ownerName: decoded.name,
          });
        }
      } catch {
        console.error("Failed to parse shared data");
      }
    }
  }, []);

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
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-5">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center gap-6 md:gap-8 my-5">
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
