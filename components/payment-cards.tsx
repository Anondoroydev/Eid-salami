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
  Gift,
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

const paymentMethods =[
  {
    id: "bkash",
    name: "বিকাশ",
    color: "from-[#E2136E] to-[#a10d4f]",
    bgGradient: "from-[#E2136E]/15 via-[#E2136E]/5 to-transparent",
    textColor: "text-[#E2136E]",
    borderColor: "border-[#E2136E]/30",
    glowColor: "rgba(226, 19, 110, 0.4)",
    shadowColor: "shadow-[#E2136E]/20",
    logo: "bKash Salami",
    IconComponent: BkashIcon,
    steps:[
      "আপনার bKash অ্যাপ ওপেন করুন",
      '"সেন্ড মানি" অপশনে ট্যাপ করুন',
      "নিচের নম্বরটি দিন অথবা QR স্ক্যান করুন",
      "সালামির পরিমাণ ও রেফারেন্স দিন",
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
    logo: "Nagad Salami",
    IconComponent: NagadIcon,
    steps:[
      "আপনার Nagad অ্যাপ ওপেন করুন",
      '"সেন্ড মানি" অপশনে ট্যাপ করুন',
      "নিচের নম্বরটি দিন অথবা QR স্ক্যান করুন",
      "সালামির পরিমাণ দিয়ে এগিয়ে যান",
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
    logo: "Rocket Salami",
    IconComponent: RocketIcon,
    steps:[
      "আপনার Rocket অ্যাপ ওপেন করুন",
      '"সেন্ড মানি" অপশনে ট্যাপ করুন',
      "নিচের নম্বরটি দিন অথবা QR স্ক্যান করুন",
      "সালামির পরিমাণ দিন",
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
    logo: "Upay Salami",
    IconComponent: UpayIcon,
    steps:[
      "আপনার Upay অ্যাপ ওপেন করুন",
      '"সেন্ড মানি" অপশনে ট্যাপ করুন',
      "নিচের নম্বরটি দিন অথবা QR স্ক্যান করুন",
      "সালামির পরিমাণ দিন",
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
  const[instructionModal, setInstructionModal] = useState<{
    open: boolean;
    method: (typeof paymentMethods)[0] | null;
  }>({ open: false, method: null });
  const[showThankYou, setShowThankYou] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const[mounted, setMounted] = useState(false);
  const[copiedId, setCopiedId] = useState<string | null>(null);

  const[displayCards, setDisplayCards] = useState([
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
  },[]);

  useEffect(() => {
    if (showThankYou) {
      const colors =["#D4AF37", "#10B981", "#E2136E", "#F6921E", "#8B3A9B", "#ffffff"];
      const newConfetti: Confetti[] =[];
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
  },[showThankYou]);

  const handleScroll = () => {
    if (scrollRef.current && !isAppending.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollWidth - (scrollLeft + clientWidth) < 1500) {
        isAppending.current = true;
        setDisplayCards((prev) => [...prev, ...paymentMethods]);
        setTimeout(() => {
          isAppending.current = false;
        }, 500);
      }
    }
  };

  useEffect(() => {
    if (!mounted || isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const firstChild = scrollRef.current.firstElementChild as HTMLElement;
        if (!firstChild) return;

        const gap = window.innerWidth >= 1024 ? 24 : 16;
        const scrollAmount = firstChild.offsetWidth + gap;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3000);

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
    <div className="w-full max-w-6xl mx-auto px-0 md:px-6 relative h-full flex flex-col justify-center">
      {/* Section Header */}
      <div
        className="text-center mb-4 md:mb-8 opacity-0 animate-slide-up fill-forwards"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-2xl" />
          <div className="relative flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 bg-background/30 backdrop-blur-xl rounded-2xl border border-primary/20">
            <Gift className="h-4 w-4 md:h-5 md:w-5 text-primary animate-pulse-slow" />
            <span className="text-xs md:text-base font-bold text-foreground">
              সালামি দেওয়ার মাধ্যম নির্বাচন করুন
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

        {/* Scrollable Area - Completely Compact */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory px-4 md:px-2 pb-6 pt-2 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {displayCards.map((method, index) => (
            <div
              key={`${method.id}-${index}`}
              className={`w-[85vw] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 snap-center opacity-0 animate-slide-up fill-forwards`}
              style={{
                animationDelay: mounted ? `${0.7 + (index < 4 ? index * 0.15 : 0)}s` : "0s",
              }}
            >
              <div
                className={`relative group cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 md:hover:-translate-y-2 ${method.shadowColor} hover:shadow-2xl`}
                onClick={() => openInstructionModal(method)}
              >
                <div className="absolute inset-0 bg-background/40 backdrop-blur-xl" />
                <div className={`absolute inset-0 bg-gradient-to-br ${method.bgGradient}`} />
                <div className={`absolute inset-0 rounded-2xl md:rounded-3xl border-2 ${method.borderColor} group-hover:border-opacity-60 transition-all duration-500`} />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block"
                  style={{ boxShadow: `inset 0 0 80px ${method.glowColor}` }}
                />

                {/* Content - Highly Compact for Mobile */}
                <div className="relative z-10 p-4 md:p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-3 md:mb-5">
                      <div className={`absolute inset-[-6px] md:inset-[-8px] bg-gradient-to-r ${method.color} rounded-full opacity-30 blur-xl animate-breathe`} />
                      <div className={`w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 p-2 md:p-3 relative`}>
                        <method.IconComponent className="w-full h-full" />
                      </div>
                    </div>

                    <div className={`px-3 py-1 md:px-5 md:py-2 rounded-md md:rounded-xl bg-gradient-to-r ${method.color} text-white text-[10px] md:text-sm font-bold shadow-md mb-2 md:mb-4 group-hover:scale-105 transition-transform duration-300`}>
                      {method.logo}
                    </div>

                    <h4 className={`text-lg md:text-2xl font-black ${method.textColor} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                      {method.name}
                    </h4>

                    <div className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-6">
                      <div className={`flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-full bg-background/50 border ${method.borderColor} text-[9px] md:text-xs font-medium`}>
                        <QrCode className={`h-2.5 w-2.5 md:h-3.5 md:w-3.5 ${method.textColor}`} />
                        <span className="text-foreground/70">QR কোড</span>
                      </div>
                      <div className={`flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-full bg-background/50 border ${method.borderColor} text-[9px] md:text-xs font-medium`}>
                        <Heart className={`h-2.5 w-2.5 md:h-3.5 md:w-3.5 ${method.textColor} fill-current`} />
                        <span className="text-foreground/70">ভালোবাসা</span>
                      </div>
                    </div>
                  </div>

                  <button className={`flex items-center justify-center gap-2 w-full py-2.5 md:py-4 rounded-xl md:rounded-2xl bg-gradient-to-r ${method.color} text-white text-xs md:text-base font-bold shadow-lg transition-all duration-500 group-hover:gap-3 group-hover:scale-[1.02]`}>
                    <span>সালামি দিন</span>
                    <ArrowRight className="h-3.5 w-3.5 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-300" />
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

      {/* Payment Instructions Modal */}
      <Dialog
        open={instructionModal.open}
        onOpenChange={(open) =>
          setInstructionModal({ open, method: open ? instructionModal.method : null })
        }
      >
        <DialogContent className="bg-background/70 backdrop-blur-2xl border-border/30 w-[calc(100%-2rem)] sm:w-full sm:max-w-md p-0 rounded-2xl md:rounded-3xl animate-scale-in shadow-2xl [&::-webkit-scrollbar]:hidden[-ms-overflow-style:none] [scrollbar-width:none]">
          {instructionModal.method && (
            <>
              {/* Header */}
              <div className={`bg-gradient-to-r ${instructionModal.method.color}/90 p-4 md:p-6 relative overflow-hidden animate-slide-down backdrop-blur-sm`}>
                <div className="absolute inset-0 bg-black/5" />
                <DialogHeader className="relative z-10">
                  <DialogTitle className="text-white text-center flex flex-col items-center gap-2">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white flex items-center justify-center animate-scale-pulse p-2 shadow-xl">
                      <instructionModal.method.IconComponent className="w-full h-full" />
                    </div>
                    <div className="opacity-0 animate-slide-up fill-forwards" style={{ animationDelay: "0.1s" }}>
                      <span className="text-lg md:text-2xl font-bold block">
                        {instructionModal.method.name}
                      </span>
                      <span className="text-white/80 text-[10px] md:text-sm block">দিয়ে সালামি পাঠান</span>
                    </div>
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    {instructionModal.method.name} দিয়ে সালামি পাঠানোর নির্দেশনা
                  </DialogDescription>
                </DialogHeader>
              </div>

              {/* Body */}
              <div className="p-4 md:p-5 space-y-3 md:space-y-4 relative bg-background/40 backdrop-blur-md">

                {/* Steps */}
                <div className="space-y-1.5 opacity-0 animate-slide-up fill-forwards relative z-10" style={{ animationDelay: "0.15s" }}>
                  <ol className="space-y-1 md:space-y-1.5">
                    {instructionModal.method.steps.map((step, index) => (
                      <li key={index} className="flex items-center gap-2 opacity-0 animate-slide-up fill-forwards hover:translate-x-1 transition-transform duration-300" style={{ animationDelay: `${0.2 + index * 0.08}s` }}>
                        <span className={`flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded bg-gradient-to-r ${instructionModal.method!.color} text-white text-[9px] md:text-[10px] font-bold flex items-center justify-center animate-scale-pulse`}>
                          {index + 1}
                        </span>
                        <span className="text-foreground/80 text-[10px] md:text-xs leading-none">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Number & QR */}
                <div className="flex items-stretch gap-2.5 opacity-0 animate-slide-up fill-forwards" style={{ animationDelay: "0.4s" }}>
                  <div className={`flex-1 p-3 rounded-xl border ${instructionModal.method.borderColor} bg-background/30 backdrop-blur-lg flex flex-col justify-center`}>
                    <p className="text-[9px] md:text-xs text-foreground/60 mb-1.5 text-center font-medium">ট্যাপ করে নম্বর কপি করুন</p>
                    <button
                      onClick={() => copyToClipboard(getNumber(instructionModal.method!.id), `modal-${instructionModal.method!.id}`)}
                      className={`w-full flex items-center justify-center gap-2 bg-background/40 hover:bg-background/60 rounded-lg p-2 md:p-3 transition-all active:scale-[0.98] border ${instructionModal.method.borderColor}`}
                    >
                      <span className={`font-mono text-sm md:text-lg tracking-wider font-bold ${instructionModal.method.textColor}`}>
                        {getNumber(instructionModal.method.id)}
                      </span>
                      <div className={`p-1.5 rounded-md transition-all ${copiedId === `modal-${instructionModal.method.id}` ? "bg-green-500/30" : `bg-gradient-to-r ${instructionModal.method.color}`}`}>
                        {copiedId === `modal-${instructionModal.method.id}` ? (
                          <Check className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3 md:h-4 md:w-4 text-white" />
                        )}
                      </div>
                    </button>
                  </div>

                  {getQRCode(instructionModal.method.id) && (
                    <div className={`w-[90px] md:w-[120px] flex-shrink-0 p-2 rounded-xl border ${instructionModal.method.borderColor} bg-background/30 backdrop-blur-lg flex flex-col items-center justify-center`}>
                      <p className="text-[9px] md:text-xs text-foreground/60 mb-1.5 text-center font-medium">QR স্ক্যান</p>
                      <div className="relative">
                        <img
                          src={getQRCode(instructionModal.method.id)}
                          alt="QR"
                          className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-lg border bg-white p-1"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handlePaymentComplete}
                  className={`w-full py-4 md:py-5 text-xs md:text-sm font-bold bg-gradient-to-r ${instructionModal.method.color} hover:opacity-90 text-white shadow-lg transition-all active:scale-[0.98] rounded-xl opacity-0 animate-slide-up fill-forwards`}
                  style={{ animationDelay: "0.5s" }}
                >
                  <Heart className="mr-1.5 h-3.5 w-3.5 md:h-4 md:w-4 animate-heartbeat" />
                  সালামি পাঠিয়েছি
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Thank You Modal */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent
          className="bg-background/60 backdrop-blur-2xl border-primary/20 w-[calc(100%-2rem)] sm:w-full sm:max-w-md p-0 rounded-2xl md:rounded-3xl text-center [&>button]:hidden animate-scale-in shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none][scrollbar-width:none]"
        >
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

          <div className="h-1.5 md:h-2 w-full bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_100%]" />

          <div className="px-4 py-6 md:px-8 md:py-8 space-y-4 md:space-y-5 relative z-10">
            <button
              onClick={() => setShowThankYou(false)}
              className="absolute right-3 top-3 md:right-4 md:top-4 rounded-full p-1.5 bg-background/50 hover:bg-background transition-all z-50"
            >
              <X className="h-4 w-4 text-foreground/60" />
            </button>

            <div className="relative mx-auto w-16 h-16 md:w-20 md:h-20 animate-scale-in">
              <div className="absolute inset-[-8px] bg-gradient-to-r from-primary to-accent rounded-full opacity-30 blur-xl animate-breathe" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl animate-scale-pulse">
                <Moon className="h-7 w-7 md:h-8 md:w-8 text-white animate-moon-glow" fill="currentColor" />
              </div>
            </div>

            <div className="space-y-1 opacity-0 animate-slide-up fill-forwards" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-xl md:text-2xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer-text">
                জাযাকাল্লাহু খাইরান!
              </h2>
              <p className="text-foreground/80 text-xs md:text-sm font-medium opacity-0 animate-slide-up fill-forwards" style={{ animationDelay: "0.3s" }}>
                আপনার সালামি পেয়ে অনেক খুশি হলাম
              </p>
            </div>

            <div className="bg-primary/5 rounded-xl p-3 md:p-4 border border-primary/10 opacity-0 animate-slide-up fill-forwards" style={{ animationDelay: "0.4s" }}>
              <p className="text-foreground/70 text-[11px] md:text-sm mb-1 leading-relaxed">
                আপনার এই ভালোবাসা ও স্নেহ আমাকে অনেক অনুপ্রাণিত করেছে।
              </p>
              <p className="text-foreground text-xs md:text-sm font-semibold">
                আল্লাহ আপনাকে উত্তম প্রতিদান দিন।
              </p>
            </div>

            <div className="opacity-0 animate-scale-in fill-forwards" style={{ animationDelay: "0.5s" }}>
              <div className="inline-block px-5 py-2.5 md:px-6 md:py-3 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 animate-border-glow">
                <p className="text-lg md:text-2xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer-text">
                  ঈদ মোবারক!
                </p>
              </div>
              <p className="text-foreground/50 text-[10px] md:text-xs mt-2 opacity-0 animate-slide-up fill-forwards" style={{ animationDelay: "0.6s" }}>
                - {paymentInfo.ownerName}
              </p>
            </div>

            <div className="flex justify-center gap-2 pt-1 opacity-0 animate-slide-up fill-forwards" style={{ animationDelay: "0.7s" }}>
              <Heart className="h-3.5 w-3.5 md:h-4 md:w-4 text-red-400 fill-red-400 animate-float-gentle" />
              <Heart className="h-5 w-5 md:h-6 md:w-6 text-red-500 fill-red-500 animate-heartbeat" />
              <Heart className="h-3.5 w-3.5 md:h-4 md:w-4 text-red-400 fill-red-400 animate-float-gentle delay-500" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
