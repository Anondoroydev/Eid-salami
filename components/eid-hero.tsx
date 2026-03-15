"use client";

import { Moon, Star } from "lucide-react";

interface EidHeroProps {
  ownerName: string;
}

export function EidHero({ ownerName }: EidHeroProps) {
  return (
    <div className="text-center mb-12">
      {/* Decorative crescent and star */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <Star className="h-6 w-6 text-primary animate-pulse" fill="currentColor" />
        <Moon className="h-16 w-16 text-primary" fill="currentColor" />
        <Star className="h-6 w-6 text-primary animate-pulse" fill="currentColor" />
      </div>

      {/* Arabic greeting */}
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 font-serif">
        عيد مبارك
      </h2>

      {/* Main title */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
        ঈদ মোবারক
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-xl mx-auto text-pretty">
        সবাইকে ঈদের শুভেচ্ছা জানাচ্ছি। আল্লাহ আপনার সব দোয়া কবুল করুন।
      </p>

      {/* Owner name */}
      <div className="inline-block px-6 py-3 bg-card rounded-full border border-border">
        <p className="text-muted-foreground text-sm">থেকে শুভেচ্ছা</p>
        <p className="text-xl font-bold text-primary">{ownerName}</p>
      </div>

      {/* Decorative pattern */}
      <div className="mt-8 flex items-center justify-center gap-1">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary/60"
            style={{
              animationDelay: `${i * 0.1}s`,
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        ))}
      </div>
    </div>
  );
}
