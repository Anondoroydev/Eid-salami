"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Heart, Star, Sparkles, PartyPopper } from "lucide-react";
import { Confetti } from "@/components/confetti";

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  ownerName: string;
}

export function CelebrationModal({
  isOpen,
  onClose,
  ownerName,
}: CelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      {showConfetti && <Confetti />}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-gradient-to-br from-card via-card to-secondary/30 border-primary/30 border-2 max-w-md text-center overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>ধন্যবাদ ঈদি পাঠানোর জন্য</DialogTitle>
          </VisuallyHidden>
          {/* Decorative stars */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Star className="absolute top-4 left-4 h-6 w-6 text-primary/40 animate-pulse" fill="currentColor" />
            <Star className="absolute top-8 right-8 h-4 w-4 text-accent/40 animate-pulse" fill="currentColor" />
            <Star className="absolute bottom-12 left-8 h-5 w-5 text-primary/30 animate-pulse" fill="currentColor" />
            <Sparkles className="absolute top-12 right-4 h-5 w-5 text-accent/50 animate-pulse" />
            <Sparkles className="absolute bottom-8 right-12 h-4 w-4 text-primary/40 animate-pulse" />
          </div>

          <div className="relative z-10 py-6">
            {/* Party icon */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <div className="relative bg-gradient-to-br from-primary to-accent p-4 rounded-full">
                  <PartyPopper className="h-12 w-12 text-primary-foreground" />
                </div>
              </div>
            </div>

            {/* Thank you message */}
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              জাযাকাল্লাহ খাইরান!
            </h2>

            <p className="text-xl text-primary font-semibold mb-4">
              ধন্যবাদ ঈদি পাঠানোর জন্য
            </p>

            {/* Hearts animation */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="h-6 w-6 text-pink-500 animate-bounce"
                  fill="currentColor"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>

            <p className="text-muted-foreground mb-6">
              আল্লাহ আপনাকে উত্তম প্রতিদান দিন।<br />
              <span className="text-primary font-semibold">{ownerName}</span> এর পক্ষ থেকে আবারও ঈদ মোবারক!
            </p>

            {/* Dua */}
            <div className="bg-background/50 rounded-lg p-4 mb-6">
              <p className="text-lg text-primary font-serif">
                تَقَبَّلَ اللهُ مِنَّا وَمِنكُم
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                তাকাব্বালাল্লাহু মিন্না ওয়া মিনকুম
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                আল্লাহ আমাদের ও আপনাদের ইবাদত কবুল করুন
              </p>
            </div>

            <Button
              onClick={onClose}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8"
            >
              আমীন
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
