"use client";

import { Moon, Star, Sparkles } from "lucide-react";

interface EidHeroProps {
  ownerName: string;
}

export function EidHero({ ownerName }: EidHeroProps) {
  return (
    <div className="text-center relative">
      {/* Main Content */}
      <div className="relative z-10">
        {/* Crescent Moon with Stars */}
        <div className="flex items-center justify-center gap-3 mb-4">
          {/* Left Stars */}
          <div className="flex items-center gap-2">
            <Star 
              className="h-4 w-4 text-primary/60 animate-twinkle-star" 
              fill="currentColor" 
              style={{ animationDelay: "0.3s" }}
            />
            <Sparkles className="h-5 w-5 text-accent/50 animate-spin-slow" />
            <Star 
              className="h-3 w-3 text-primary/40 animate-twinkle-star" 
              fill="currentColor"
              style={{ animationDelay: "0.7s" }}
            />
          </div>

          {/* Central Crescent Moon */}
          <div className="relative animate-moon-glow">
            <div className="absolute inset-[-8px] bg-primary/20 rounded-full blur-xl animate-breathe" />
            <Moon 
              className="h-14 w-14 md:h-18 md:w-18 text-primary relative z-10" 
              fill="currentColor" 
            />
            <Star 
              className="absolute -top-1 -right-1 h-4 w-4 text-accent animate-twinkle-star" 
              fill="currentColor"
            />
          </div>

          {/* Right Stars */}
          <div className="flex items-center gap-2">
            <Star 
              className="h-3 w-3 text-primary/40 animate-twinkle-star" 
              fill="currentColor"
              style={{ animationDelay: "0.5s" }}
            />
            <Sparkles className="h-5 w-5 text-accent/50 animate-spin-reverse" />
            <Star 
              className="h-4 w-4 text-primary/60 animate-twinkle-star" 
              fill="currentColor" 
              style={{ animationDelay: "0.9s" }}
            />
          </div>
        </div>

        {/* Arabic Greeting */}
        <div className="mb-2 opacity-0 animate-slide-up fill-forwards" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-xl md:text-2xl font-serif text-primary tracking-wider animate-golden-glow" dir="rtl" lang="ar" suppressHydrationWarning>
            {"\u0639\u064A\u062F \u0645\u0628\u0627\u0631\u0643"}
          </h2>
        </div>

        {/* Main Bengali Title */}
        <div className="mb-2 opacity-0 animate-slide-up fill-forwards" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            <span className="bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer-text">
              ঈদ মোবারক
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-xs md:text-sm text-muted-foreground max-w-sm mx-auto mb-3 leading-relaxed opacity-0 animate-slide-up fill-forwards" style={{ animationDelay: "0.3s" }}>
          সবাইকে ঈদের শুভেচ্ছা। আল্লাহ আপনার সব দোয়া কবুল করুন।
        </p>

        {/* Owner Name Card */}
        <div className="opacity-0 animate-scale-in fill-forwards" style={{ animationDelay: "0.4s" }}>
          <div className="inline-flex flex-col items-center px-6 py-3 bg-card/60 backdrop-blur-xl rounded-2xl border border-primary/20 shadow-2xl shadow-primary/10 relative overflow-hidden group hover:border-primary/40 transition-all duration-500">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer-gold" />
            </div>

            {/* Decorative Elements */}
            <Sparkles className="absolute top-2 right-3 h-4 w-4 text-primary/30 animate-spin-slow" />
            <Sparkles className="absolute bottom-2 left-3 h-3 w-3 text-accent/30 animate-spin-reverse" />

            <p className="text-muted-foreground text-xs mb-1 relative z-10">থেকে শুভেচ্ছা</p>
            <p className="text-xl md:text-2xl font-bold relative z-10">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer-text">
                {ownerName}
              </span>
            </p>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="mt-4 flex items-center justify-center gap-3 opacity-0 animate-slide-up fill-forwards" style={{ animationDelay: "0.5s" }}>
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary/50" />
          <Star className="h-3 w-3 text-primary/50" fill="currentColor" />
          <div className="h-[1px] w-16 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50" />
          <Star className="h-3 w-3 text-primary/50" fill="currentColor" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
      </div>
    </div>
  );
}
