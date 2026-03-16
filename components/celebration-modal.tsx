"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, Star, Sparkles, PartyPopper, Moon } from "lucide-react";
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
        <DialogContent className="bg-gradient-to-br from-card via-card to-primary/10 border-primary/30 border-2 max-w-md text-center overflow-hidden shadow-2xl shadow-primary/20">
          <DialogTitle className="sr-only">ধন্যবাদ ঈদি পাঠানোর জন্য</DialogTitle>
          <DialogDescription className="sr-only">
            আল্লাহ আপনাকে উত্তম প্রতিদান দিন। ঈদ মোবারক!
          </DialogDescription>
          
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
            <Star className="absolute top-6 left-6 h-5 w-5 text-primary/30 animate-pulse" fill="currentColor" />
            <Star className="absolute top-10 right-10 h-4 w-4 text-accent/30 animate-pulse" fill="currentColor" />
            <Moon className="absolute bottom-16 left-10 h-6 w-6 text-primary/20 animate-pulse" fill="currentColor" />
            <Sparkles className="absolute top-16 right-6 h-5 w-5 text-accent/40 animate-pulse" />
            <Sparkles className="absolute bottom-10 right-14 h-4 w-4 text-primary/30 animate-pulse" />
          </div>

          <div className="relative z-10 py-8 px-2">
            {/* Party icon with glow */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50 animate-pulse scale-125" />
                <div className="relative bg-gradient-to-br from-primary via-primary to-accent p-5 rounded-full shadow-lg">
                  <PartyPopper className="h-14 w-14 text-primary-foreground" />
                </div>
              </div>
            </div>

            {/* Thank you message */}
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              জাযাকাল্লাহ খাইরান!
            </h2>

            <p className="text-xl text-primary font-bold mb-5">
              ধন্যবাদ ঈদি পাঠানোর জন্য
            </p>

            {/* Hearts animation */}
            <div className="flex items-center justify-center gap-3 mb-6">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="h-7 w-7 text-pink-500 animate-bounce drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                  fill="currentColor"
                  style={{ animationDelay: `${i * 0.12}s` }}
                />
              ))}
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              আল্লাহ আপনাকে উত্তম প্রতিদান দিন।<br />
              <span className="text-primary font-bold text-lg">{ownerName}</span> এর পক্ষ থেকে আবারও ঈদ মোবারক!
            </p>

            {/* Dua card */}
            <div className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-2xl p-5 mb-8 border border-primary/20">
              <p className="text-2xl text-primary font-serif mb-2">
                تَقَبَّلَ اللهُ مِنَّا وَمِنكُم
              </p>
              <p className="text-sm text-foreground font-medium mb-1">
                তাকাব্বালাল্লাহু মিন্না ওয়া মিনকুম
              </p>
              <p className="text-xs text-muted-foreground">
                আল্লাহ আমাদের ও আপনাদের ইবাদত কবুল করুন
              </p>
            </div>

            <Button
              onClick={onClose}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 font-bold px-10 py-6 rounded-xl shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-[0.98]"
            >
              আমীন
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
