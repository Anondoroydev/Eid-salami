"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Check,
  QrCode,
  Heart,
  ArrowRight,
  X,
  Star,
  Sparkles,
  Moon,
  Copy,
  Wallet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { PaymentInfo } from "@/app/page";

// Custom Payment Icons
const BkashIcon = ({ className }: { className?: string }) => (
  <img src="bikash.jpeg" alt="Bikash" className={className} />
);

const NagadIcon = ({ className }: { className?: string }) => (
  <img src="nagod.svg" alt="Nagad" className={`h-10 w-10 ${className}`} />
);

const RocketIcon = ({ className }: { className?: string }) => (
  <img src="rocket.svg" alt="Rocket" className={className} />
);

const UpayIcon = ({ className }: { className?: string }) => (
  <img src="upay.svg" alt="Upay" className={className} />
);

interface PaymentCardsProps {
  paymentInfo: PaymentInfo;
}

const paymentMethods = [
  {
    id: "bkash",
    name: "বিকাশ",
    color: "from-[#E2136E] to-[#a10d4f]",
    bgGradient: "from-[#E2136E]/15 via-[#E2136E]/5 to-transparent",
    textColor: "text-[#E2136E]",
    borderColor: "border-[#E2136E]/30",
    glowColor: "rgba(226, 19, 110, 0.4)",
    shadowColor: "shadow-[#E2136E]/20",
    logo: "bKash",
    IconComponent: BkashIcon,
    steps: [
      "আপনার bKash অ্যাপ ওপেন করুন",
      '"সেন্ড মানি" অপশনে ট্যাপ করুন',
      "নিচের নম্বরটি দিন অথবা QR কোড স্ক্যান করুন",
      "আপনার ইচ্ছামত পরিমাণ টাকা দিন",
      "PIN দিয়ে কনফার্ম করুন",
    ],
  },
  {
    id: "nagad",
    name: "নগদ",
    color: "from-[#F6921E] to-[#c47415]",
    bgGradient: "from-[#F6921E]/15 via-[#F6921E]/5 to-transparent",
    textColor: "text-[#F6921E]",
    borderColor: "border-[#F6921E]/30",
    glowColor: "rgba(246, 146, 30, 0.4)",
    shadowColor: "shadow-[#F6921E]/20",
    logo: "Nagad",
    IconComponent: NagadIcon,
    steps: [
      "আপনার Nagad অ্যাপ ওপেন করুন",
      '"সেন্ড মানি" অপশনে ট্যাপ করুন',
      "নিচের নম্বরটি দিন অথবা QR কোড স্ক্যান করুন",
      "আপনার ইচ্ছামত পরিমাণ টাকা দিন",
      "PIN দিয়ে কনফার্ম করুন",
    ],
  },
  {
    id: "rocket",
    name: "রকেট",
    color: "from-[#8B3A9B] to-[#5f2769]",
    bgGradient: "from-[#8B3A9B]/15 via-[#8B3A9B]/5 to-transparent",
    textColor: "text-[#8B3A9B]",
    borderColor: "border-[#8B3A9B]/30",
    glowColor: "rgba(139, 58, 155, 0.4)",
    shadowColor: "shadow-[#8B3A9B]/20",
    logo: "Rocket",
    IconComponent: RocketIcon,
    steps: [
      "আপনার Rocket অ্যাপ ওপেন করুন",
      '"সেন্ড মানি" অপশনে ট্যাপ করুন',
      "নিচের নম্বরটি দিন অথবা QR কোড স্ক্যান করুন",
      "আপনার ইচ্ছামত পরিমাণ টাকা দিন",
      "PIN দিয়ে কনফার্ম করুন",
    ],
  },
  {
    id: "upay",
    name: "উপায়",
    color: "from-[#00A651] to-[#007A3D]",
    bgGradient: "from-[#00A651]/15 via-[#00A651]/5 to-transparent",
    textColor: "text-[#00A651]",
    borderColor: "border-[#00A651]/30",
    glowColor: "rgba(0, 166, 81, 0.4)",
    shadowColor: "shadow-[#00A651]/20",
    logo: "Upay",
    IconComponent: UpayIcon,
    steps: [
      "আপনার Upay অ্যাপ ওপেন করুন",
      '"সেন্ড মানি" অপশনে ট্যাপ করুন',
      "নিচের নম্বরটি দিন অথবা QR কোড স্ক্যান করুন",
      "আপনার ইচ্ছামত পরিমাণ টাকা দিন",
      "PIN দিয়ে কনফার্ম করুন",
    ],
  },
];

interface Confetti {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
}

export function PaymentCards({ paymentInfo }: PaymentCardsProps) {
  const [instructionModal, setInstructionModal] = useState<{
    open: boolean;
    method: (typeof paymentMethods)[0] | null;
  }>({ open: false, method: null });
  const [showThankYou, setShowThankYou] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [mounted, setMounted] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // স্লাইডারের জন্য স্টেট
  const [displayCards, setDisplayCards] = useState([
    ...paymentMethods,
    ...paymentMethods,
    ...paymentMethods,
    ...paymentMethods,
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isAppending = useRef(false);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      console.error("Failed to copy");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showThankYou) {
      const colors = [
        "#D4AF37",
        "#10B981",
        "#E2136E",
        "#F6921E",
        "#8B3A9B",
        "#ffffff",
      ];
      const newConfetti: Confetti[] = [];
      for (let i = 0; i < 60; i++) {
        newConfetti.push({
          id: i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 6 + Math.random() * 6,
          delay: Math.random() * 2,
        });
      }
      setConfetti(newConfetti);
    }
  }, [showThankYou]);

  // Infinite Scroll Handler (শেষের দিকে আসলে নতুন কার্ড যুক্ত করবে)
  const handleScroll = () => {
    if (scrollRef.current && !isAppending.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // স্ক্রল যখন শেষের কাছাকাছি চলে আসবে
      if (scrollWidth - (scrollLeft + clientWidth) < 1500) {
        isAppending.current = true;
        setDisplayCards((prev) => [...prev, ...paymentMethods]);
        setTimeout(() => {
          isAppending.current = false;
        }, 500); // Cooldown prevent multiple triggers
      }
    }
  };

  // Auto Scroll Effect - চলতেই থাকবে
  useEffect(() => {
    if (!mounted || isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const firstChild = scrollRef.current.firstElementChild as HTMLElement;
        if (!firstChild) return;

        // কার্ডের সাইজ + গ্যাপ ক্যালকুলেশন
        const gap = window.innerWidth >= 1024 ? 24 : 16;
        const scrollAmount = firstChild.offsetWidth + gap;

        // ডান দিকে স্মুথলি এক কার্ড পরিমাণ সরবে
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3000); // স্লাইড হওয়ার সময় (৩ সেকেন্ড)

    return () => clearInterval(interval);
  }, [mounted, isPaused]);

  const getNumber = (id: string) => {
    return paymentInfo[id as keyof PaymentInfo] as string;
  };

  const getQRCode = (id: string) => {
    if (id === "bkash") return paymentInfo.bkashQR;
    if (id === "nagad") return paymentInfo.nagadQR;
    if (id === "rocket") return paymentInfo.rocketQR;
    if (id === "upay") return paymentInfo.upayQR;
    return undefined;
  };

  const openInstructionModal = (method: (typeof paymentMethods)[0]) => {
    setInstructionModal({ open: true, method });
  };

  const handlePaymentComplete = () => {
    setInstructionModal({ open: false, method: null });
    setShowThankYou(true);
  };

  // Manual Scroll Function (Left/Right Buttons)
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const firstChild = scrollRef.current.firstElementChild as HTMLElement;
      const gap = window.innerWidth >= 1024 ? 24 : 16;
      const scrollAmount = firstChild ? firstChild.offsetWidth + gap : 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-0 md:px-6 relative">
      {/* Section Header */}
      <div
        className="text-center mb-6 md:mb-10 opacity-0 animate-slide-up fill-forwards"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-2xl" />
          <div className="relative flex items-center gap-2 md:gap-3 px-5 py-2.5 md:px-6 md:py-3 bg-background/30 backdrop-blur-xl rounded-2xl border border-primary/20">
            <Wallet className="h-4 w-4 md:h-5 md:w-5 text-primary animate-pulse-slow" />
            <span className="text-sm md:text-base font-bold text-foreground">
              পেমেন্ট মাধ্যম নির্বাচন করুন
            </span>
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-accent animate-spin-slow" />
          </div>
        </div>
      </div>

      {/* Slider Container */}
      <div
        className="relative group w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left Arrow - Desktop Only */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg text-foreground/70 hover:text-foreground hover:bg-background hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Scrollable Area - Scrollbar Hidden */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory px-4 md:px-2 pb-8 pt-4 scroll-smooth [&::-webkit-scrollbar]:hidden[-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {displayCards.map((method, index) => (
            <div
              key={`${method.id}-${index}`}
              className={`w-[85vw] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 snap-center opacity-0 animate-slide-up fill-forwards`}
              style={{
                animationDelay: mounted
                  ? `${0.7 + (index < 4 ? index * 0.15 : 0)}s`
                  : "0s",
              }}
            >
              <div
                className={`relative group cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 ${method.shadowColor} hover:shadow-2xl`}
                onClick={() => openInstructionModal(method)}
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-background/40 backdrop-blur-xl" />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${method.bgGradient}`}
                />

                {/* Animated Border */}
                <div
                  className={`absolute inset-0 rounded-2xl md:rounded-3xl border-2 ${method.borderColor} group-hover:border-opacity-60 transition-all duration-500`}
                />

                {/* Glow Effect on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block"
                  style={{ boxShadow: `inset 0 0 80px ${method.glowColor}` }}
                />

                {/* Floating Corner Decoration */}
                <div
                  className={`absolute -top-6 -right-6 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${method.color} rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative z-10 p-5 md:p-6">
                  {/* Center Icon with Glow */}
                  <div className="flex flex-col items-center text-center">
                    {/* Large Icon Circle with Pulse */}
                    <div className="relative mb-4 md:mb-5">
                      <div
                        className={`absolute inset-[-8px] bg-gradient-to-r ${method.color} rounded-full opacity-30 blur-xl animate-breathe`}
                      />
                      <div
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 p-2.5 md:p-3 relative`}
                      >
                        <method.IconComponent className="w-full h-full" />
                        {/* Shine effect */}
                        <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>

                    {/* Logo Badge */}
                    <div
                      className={`px-4 py-1.5 md:px-5 md:py-2 rounded-lg md:rounded-xl bg-gradient-to-r ${method.color} text-white text-xs md:text-sm font-bold shadow-lg mb-3 md:mb-4 group-hover:scale-105 transition-transform duration-300`}
                    >
                      {method.logo}
                    </div>

                    {/* Method Name */}
                    <h4
                      className={`text-xl md:text-2xl font-black ${method.textColor} mb-2 group-hover:scale-105 transition-transform duration-300`}
                    >
                      {method.name}
                    </h4>
                    <p className="text-xs md:text-sm text-foreground/60 mb-5 md:mb-6"></p>

                    {/* Features */}
                    <div className="flex items-center justify-center gap-3 md:gap-4 mb-5 md:mb-6">
                      <div
                        className={`flex items-center gap-1.5 md:gap-2 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-background/50 border ${method.borderColor} text-[10px] md:text-xs font-medium`}
                      >
                        <QrCode
                          className={`h-3 w-3 md:h-3.5 md:w-3.5 ${method.textColor}`}
                        />
                        <span className="text-foreground/70">QR কোড</span>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 md:gap-2 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-background/50 border ${method.borderColor} text-[10px] md:text-xs font-medium`}
                      >
                        <Heart
                          className={`h-3 w-3 md:h-3.5 md:w-3.5 ${method.textColor} fill-current`}
                        />
                        <span className="text-foreground/70">নিরাপদ</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    className={`flex items-center justify-center gap-2 md:gap-3 w-full py-3 md:py-4 rounded-xl md:rounded-2xl bg-gradient-to-r ${method.color} text-white text-sm md:text-base font-bold shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:gap-4 group-hover:scale-[1.02]`}
                  >
                    <span>পেমেন্ট করুন</span>
                    <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow - Desktop Only */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg text-foreground/70 hover:text-foreground hover:bg-background hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Payment Instructions Modal - Scrollbar Hidden */}
      <Dialog
        open={instructionModal.open}
        onOpenChange={(open) =>
          setInstructionModal({
            open,
            method: open ? instructionModal.method : null,
          })
        }
      >
        <DialogContent className="bg-background/70 backdrop-blur-2xl border-border/30 w-[calc(100%-2rem)] sm:w-full sm:max-w-md max-h-[90vh] overflow-y-auto p-0 rounded-2xl md:rounded-3xl animate-scale-in shadow-2xl[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {instructionModal.method && (
            <>
              {/* Header with animated decorations */}
              <div
                className={`bg-gradient-to-r ${instructionModal.method.color}/90 p-5 md:p-6 relative overflow-hidden animate-slide-down backdrop-blur-sm`}
              >
                <div className="absolute inset-0 bg-black/5" />

                {/* Animated floating decorations */}
                <div className="absolute top-2 left-4 animate-float-gentle hidden md:block">
                  <Star className="h-4 w-4 text-white/40 fill-white/40" />
                </div>
                <div className="absolute top-6 right-8 animate-float-gentle delay-300">
                  <Moon className="h-4 w-4 md:h-5 md:w-5 text-white/30 fill-white/30" />
                </div>
                <div className="absolute bottom-4 left-8 animate-twinkle-star">
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-white/40" />
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-breathe" />
                <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 animate-breathe delay-700" />

                <DialogHeader className="relative z-10">
                  <DialogTitle className="text-white text-center flex flex-col items-center gap-2 md:gap-3">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white flex items-center justify-center animate-scale-pulse p-2.5 md:p-3 shadow-xl">
                      <instructionModal.method.IconComponent className="w-full h-full" />
                    </div>
                    <div
                      className="opacity-0 animate-slide-up fill-forwards"
                      style={{ animationDelay: "0.1s" }}
                    >
                      <span className="text-xl md:text-2xl font-bold block">
                        {instructionModal.method.name}
                      </span>
                      <span className="text-white/80 text-xs md:text-sm mt-0.5 md:mt-0 block">
                        দিয়ে ঈদি পাঠান
                      </span>
                    </div>
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    {instructionModal.method.name} দিয়ে পেমেন্ট করার নির্দেশনা
                  </DialogDescription>
                </DialogHeader>
              </div>

              {/* Body: Compact Spacing */}
              <div className="p-4 md:p-5 space-y-4 relative bg-background/40 backdrop-blur-md">
                {/* Background animated decorations */}
                <div className="absolute top-4 right-4 opacity-10 animate-spin-slow">
                  <Moon
                    className={`h-8 w-8 md:h-12 md:w-12 ${instructionModal.method.textColor}`}
                  />
                </div>

                {/* Steps */}
                <div
                  className="space-y-2 opacity-0 animate-slide-up fill-forwards relative z-10"
                  style={{ animationDelay: "0.15s" }}
                >
                  <h5 className="font-bold text-foreground/80 text-[11px] md:text-xs flex items-center gap-1.5">
                    <Sparkles
                      className={`h-3 w-3 ${instructionModal.method.textColor} animate-spin-slow`}
                    />
                    পেমেন্ট নির্দেশনা
                  </h5>
                  <ol className="space-y-1.5 md:space-y-1.5">
                    {instructionModal.method.steps.map((step, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 opacity-0 animate-slide-up fill-forwards hover:translate-x-1 transition-transform duration-300"
                        style={{ animationDelay: `${0.2 + index * 0.08}s` }}
                      >
                        <span
                          className={`flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded md:rounded-md bg-gradient-to-r ${instructionModal.method!.color} text-white text-[9px] md:text-[10px] font-bold flex items-center justify-center animate-scale-pulse mt-px md:mt-0.5`}
                        >
                          {index + 1}
                        </span>
                        <span className="text-foreground/70 text-[11px] md:text-xs leading-snug">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Number Display */}
                <div
                  className={`p-4 md:p-5 rounded-xl md:rounded-2xl border ${instructionModal.method.borderColor} bg-background/30 backdrop-blur-lg relative overflow-hidden opacity-0 animate-slide-up fill-forwards`}
                  style={{ animationDelay: "0.5s" }}
                >
                  <p className="text-[11px] md:text-xs text-foreground/60 mb-2 md:mb-3 text-center font-medium">
                    ট্যাপ করে নম্বর কপি করুন
                  </p>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        getNumber(instructionModal.method!.id),
                        `modal-${instructionModal.method!.id}`,
                      )
                    }
                    className={`w-full flex items-center justify-center gap-3 md:gap-4 bg-background/40 hover:bg-background/60 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 transition-all duration-300 active:scale-[0.98] border ${instructionModal.method.borderColor}`}
                  >
                    <span
                      className={`font-mono text-xl md:text-2xl tracking-wider font-bold ${instructionModal.method.textColor}`}
                    >
                      {getNumber(instructionModal.method.id)}
                    </span>
                    <div
                      className={`p-2 md:p-2.5 rounded-lg md:rounded-xl transition-all duration-300 ${copiedId === `modal-${instructionModal.method.id}` ? "bg-green-500/30" : `bg-gradient-to-r ${instructionModal.method.color}`}`}
                    >
                      {copiedId === `modal-${instructionModal.method.id}` ? (
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 md:h-5 md:w-5 text-white" />
                      )}
                    </div>
                  </button>
                  {copiedId === `modal-${instructionModal.method.id}` && (
                    <p className="text-center text-green-500 text-[10px] md:text-xs mt-2 animate-slide-up font-medium">
                      কপি হয়েছে!
                    </p>
                  )}
                </div>

                {/* QR Code */}
                {getQRCode(instructionModal.method.id) && (
                  <div
                    className="flex flex-col items-center opacity-0 animate-slide-up fill-forwards rounded-xl md:rounded-2xl bg-background/20 backdrop-blur-lg p-4 md:p-5 border border-border/20 relative"
                    style={{ animationDelay: "0.6s" }}
                  >
                    <p className="text-[11px] md:text-xs text-foreground/60 mb-3 md:mb-4 font-medium">
                      অথবা QR কোড স্ক্যান করুন
                    </p>
                    <div className="relative">
                      <div
                        className={`absolute inset-[-6px] md:inset-[-8px] bg-gradient-to-r ${instructionModal.method.color} rounded-xl md:rounded-2xl opacity-30 blur-xl animate-breathe`}
                      />
                      <img
                        src={getQRCode(instructionModal.method.id)}
                        alt={`${instructionModal.method.name} QR Code`}
                        className="relative w-28 h-28 md:w-36 md:h-36 object-contain rounded-lg md:rounded-xl border-2 border-border bg-white p-2 shadow-xl"
                      />
                    </div>
                  </div>
                )}

                {/* Complete Button */}
                <Button
                  onClick={handlePaymentComplete}
                  className={`w-full py-5 md:py-6 text-sm md:text-base font-bold bg-gradient-to-r ${instructionModal.method.color} hover:opacity-90 text-white shadow-xl transition-all active:scale-[0.98] rounded-xl md:rounded-2xl opacity-0 animate-slide-up fill-forwards hover:scale-[1.02]`}
                  style={{ animationDelay: "0.7s" }}
                >
                  <Heart className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-heartbeat" />
                  ঈদি পাঠিয়েছি
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Thank You Modal - Scrollbar Hidden */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent
          className="bg-background/60 backdrop-blur-2xl border-primary/20 w-[calc(100%-2rem)] sm:w-full sm:max-w-md max-h-[90vh] overflow-y-auto text-center p-0 rounded-2xl md:rounded-3xl [&>button]:hidden animate-scale-in shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none][scrollbar-width:none]"
          aria-describedby="thank-you-description"
        >
          <DialogTitle className="sr-only">ধন্যবাদ</DialogTitle>
          <DialogDescription id="thank-you-description" className="sr-only">
            আপনার ঈদি পেয়ে খুশি হলাম। জাযাকাল্লাহু খাইরান।
          </DialogDescription>
          {/* Confetti */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {confetti.map((c) => (
              <div
                key={c.id}
                className="absolute animate-confetti-fall"
                style={{
                  left: `${c.x}%`,
                  top: "-20px",
                  width: `${c.size}px`,
                  height: `${c.size}px`,
                  backgroundColor: c.color,
                  animationDelay: `${c.delay}s`,
                  borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                }}
              />
            ))}
          </div>

          {/* Header Gradient */}
          <div className="h-1.5 md:h-2 w-full bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_100%]" />

          <div className="px-5 py-8 md:px-8 md:py-10 space-y-5 md:space-y-6 relative z-10">
            {/* Close Button */}
            <button
              onClick={() => setShowThankYou(false)}
              className="absolute right-3 top-3 md:right-4 md:top-4 rounded-full p-2 bg-background/50 hover:bg-background hover:scale-110 transition-all z-50"
            >
              <X className="h-4 w-4 text-foreground/60" />
            </button>

            {/* Success Icon */}
            <div className="relative mx-auto w-20 h-20 md:w-24 md:h-24 animate-scale-in">
              <div className="absolute inset-[-12px] md:inset-[-16px] bg-gradient-to-r from-primary to-accent rounded-full opacity-30 blur-2xl animate-breathe" />
              <div className="absolute inset-[-6px] md:inset-[-8px] bg-gradient-to-r from-accent to-primary rounded-full opacity-20 blur-xl animate-breathe delay-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl animate-scale-pulse">
                <Moon
                  className="h-8 w-8 md:h-10 md:w-10 text-white animate-moon-glow"
                  fill="currentColor"
                />
              </div>
            </div>

            {/* Message */}
            <div
              className="space-y-1.5 md:space-y-2 opacity-0 animate-slide-up fill-forwards"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer-text">
                জাযাকাল্লাহু খাইরান!
              </h2>
              <p
                className="text-foreground/80 text-sm md:text-base font-medium opacity-0 animate-slide-up fill-forwards"
                style={{ animationDelay: "0.3s" }}
              >
                আপনার ঈদি পেয়ে খুশি হলাম
              </p>
            </div>

            {/* Thank You Box */}
            <div
              className="bg-primary/5 rounded-xl md:rounded-2xl p-4 md:p-5 border border-primary/10 opacity-0 animate-slide-up fill-forwards hover:border-primary/30 transition-all duration-500"
              style={{ animationDelay: "0.4s" }}
            >
              <p className="text-foreground/70 text-[13px] md:text-sm mb-1.5 md:mb-2 leading-relaxed">
                আপনার এই ভালোবাসা ও স্নেহ আমাকে অনুপ্রাণিত করেছে।
              </p>
              <p className="text-foreground text-sm md:text-base font-semibold">
                আল্লাহ আপনাকে উত্তম প্রতিদান দিন।
              </p>
            </div>

            {/* Eid Mubarak */}
            <div
              className="opacity-0 animate-scale-in fill-forwards"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="inline-block px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 animate-border-glow">
                <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer-text">
                  ঈদ মোবারক!
                </p>
              </div>
              <p
                className="text-foreground/50 text-xs md:text-sm mt-3 md:mt-4 opacity-0 animate-slide-up fill-forwards"
                style={{ animationDelay: "0.6s" }}
              >
                - {paymentInfo.ownerName}
              </p>
            </div>

            {/* Hearts */}
            <div
              className="flex justify-center gap-3 md:gap-4 pt-1 md:pt-2 opacity-0 animate-slide-up fill-forwards"
              style={{ animationDelay: "0.7s" }}
            >
              <Heart className="h-4 w-4 md:h-5 md:w-5 text-red-400 fill-red-400 animate-float-gentle" />
              <Heart className="h-6 w-6 md:h-7 md:w-7 text-red-500 fill-red-500 animate-heartbeat" />
              <Heart className="h-4 w-4 md:h-5 md:w-5 text-red-400 fill-red-400 animate-float-gentle delay-500" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
