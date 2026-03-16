"use client";

import { useState, useEffect } from "react";
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

const UpayIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#00A651"/>
    <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2"/>
  </svg>
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
      "\"সেন্ড মানি\" অপশনে ট্যাপ করুন",
      "নিচের নম্বরটি দিন অথবা QR কোড স্ক্যান করুন",
      "আপনার ইচ্ছামত পরিমাণ টাকা দিন",
      "PIN দিয়ে কনফার্ম করুন"
    ]
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

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Section Header - Unique Design */}
      <div
        className="text-center mb-8 opacity-0 animate-slide-up fill-forwards"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-2xl" />
          <div className="relative flex items-center gap-3 px-6 py-3 bg-background/30 backdrop-blur-xl rounded-2xl border border-primary/20">
            <Wallet className="h-5 w-5 text-primary animate-pulse-slow" />
            <span className="text-base font-bold text-foreground">
              পেমেন্ট মাধ্যম নির্বাচন করুন
            </span>
            <Sparkles className="h-5 w-5 text-accent animate-spin-slow" />
          </div>
        </div>
      </div>

      {/* Payment Cards - Horizontal Scroll on Mobile, Grid on Desktop */}
      <div className="flex md:grid md:grid-cols-4 gap-5 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-hide px-2 md:px-0">
        {paymentMethods.map((method, index) => (
          <div
            key={method.id}
            className={`flex-shrink-0 w-[85vw] md:w-auto snap-center opacity-0 animate-slide-up fill-forwards`}
            style={{
              animationDelay: mounted ? `${0.7 + index * 0.15}s` : "0s",
            }}
          >
            <div
              className={`relative group cursor-pointer rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] ${method.shadowColor} hover:shadow-2xl`}
              onClick={() => openInstructionModal(method)}
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-background/40 backdrop-blur-xl" />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${method.bgGradient}`}
              />

              {/* Animated Border */}
              <div
                className={`absolute inset-0 rounded-3xl border-2 ${method.borderColor} group-hover:border-opacity-60 transition-all duration-500`}
              />

              {/* Glow Effect on Hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: `inset 0 0 80px ${method.glowColor}` }}
              />

              {/* Floating Corner Decoration */}
              <div
                className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${method.color} rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500`}
              />

              {/* Content */}
              <div className="relative z-10 p-6">
                {/* Center Icon with Glow */}
                <div className="flex flex-col items-center text-center">
                  {/* Large Icon Circle with Pulse */}
                  <div className="relative mb-5">
                    <div
                      className={`absolute inset-[-8px] bg-gradient-to-r ${method.color} rounded-full opacity-30 blur-xl animate-breathe`}
                    />
                    <div
                      className={`w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 p-3 relative`}
                    >
                      <method.IconComponent className="w-full h-full" />
                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>

                  {/* Logo Badge */}
                  <div
                    className={`px-5 py-2 rounded-xl bg-gradient-to-r ${method.color} text-white text-sm font-bold shadow-lg mb-4 group-hover:scale-105 transition-transform duration-300`}
                  >
                    {method.logo}
                  </div>

                  {/* Method Name */}
                  <h4
                    className={`text-2xl font-black ${method.textColor} mb-2 group-hover:scale-105 transition-transform duration-300`}
                  >
                    {method.name}
                  </h4>
                  <p className="text-sm text-foreground/60 mb-6"></p>

                  {/* Features */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 border ${method.borderColor} text-xs font-medium`}
                    >
                      <QrCode className={`h-3.5 w-3.5 ${method.textColor}`} />
                      <span className="text-foreground/70">QR কোড</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 border ${method.borderColor} text-xs font-medium`}
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${method.textColor} fill-current`}
                      />
                      <span className="text-foreground/70">নিরাপদ</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className={`flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r ${method.color} text-white text-base font-bold shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:gap-4 group-hover:scale-[1.02]`}
                >
                  <span>পেমেন্ট করুন</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Instructions Modal - Clean Design */}
      <Dialog
        open={instructionModal.open}
        onOpenChange={(open) =>
          setInstructionModal({
            open,
            method: open ? instructionModal.method : null,
          })
        }
      >
        <DialogContent className="bg-background/70 backdrop-blur-2xl border-border/30 max-w-md p-0 overflow-hidden rounded-3xl animate-scale-in shadow-2xl">
          {instructionModal.method && (
            <>
              {/* Header with animated decorations */}
              <div
                className={`bg-gradient-to-r ${instructionModal.method.color}/90 p-6 relative overflow-hidden animate-slide-down backdrop-blur-sm`}
              >
                <div className="absolute inset-0 bg-black/5" />

                {/* Animated floating decorations */}
                <div className="absolute top-2 left-4 animate-float-gentle">
                  <Star className="h-4 w-4 text-white/40 fill-white/40" />
                </div>
                <div className="absolute top-6 right-8 animate-float-gentle delay-300">
                  <Moon className="h-5 w-5 text-white/30 fill-white/30" />
                </div>
                <div className="absolute bottom-4 left-8 animate-twinkle-star">
                  <Sparkles className="h-4 w-4 text-white/40" />
                </div>
                <div className="absolute bottom-2 right-4 animate-float-gentle delay-500">
                  <Star className="h-3 w-3 text-white/30 fill-white/30" />
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-breathe" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 animate-breathe delay-700" />

                <DialogHeader className="relative z-10">
                  <DialogTitle className="text-white text-center flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center animate-scale-pulse p-3 shadow-xl">
                      <instructionModal.method.IconComponent className="w-full h-full" />
                    </div>
                    <div
                      className="opacity-0 animate-slide-up fill-forwards"
                      style={{ animationDelay: "0.1s" }}
                    >
                      <span className="text-2xl font-bold block">
                        {instructionModal.method.name}
                      </span>
                      <span className="text-white/80 text-sm">
                        দিয়ে ঈদি পাঠান
                      </span>
                    </div>
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    {instructionModal.method.name} দিয়ে পেমেন্ট করার নির্দেশনা
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="p-6 space-y-5 relative bg-background/40 backdrop-blur-md">
                {/* Background animated decorations */}
                <div className="absolute top-4 right-4 opacity-10 animate-spin-slow">
                  <Moon
                    className={`h-12 w-12 ${instructionModal.method.textColor}`}
                  />
                </div>
                <div className="absolute bottom-20 left-2 opacity-10 animate-float-gentle">
                  <Star
                    className={`h-8 w-8 ${instructionModal.method.textColor} fill-current`}
                  />
                </div>

                {/* Steps */}
                <div
                  className="space-y-3 opacity-0 animate-slide-up fill-forwards relative z-10"
                  style={{ animationDelay: "0.15s" }}
                >
                  <h5 className="font-bold text-foreground text-sm flex items-center gap-2">
                    <Sparkles
                      className={`h-4 w-4 ${instructionModal.method.textColor} animate-spin-slow`}
                    />
                    পেমেন্ট নির্দেশনা
                  </h5>
                  <ol className="space-y-2">
                    {instructionModal.method.steps.map((step, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 opacity-0 animate-slide-up fill-forwards hover:translate-x-1 transition-transform duration-300"
                        style={{ animationDelay: `${0.2 + index * 0.08}s` }}
                      >
                        <span
                          className={`flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-r ${instructionModal.method!.color} text-white text-xs font-bold flex items-center justify-center animate-scale-pulse`}
                        >
                          {index + 1}
                        </span>
                        <span className="text-foreground/70 text-sm">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Number Display - Updated colors */}
                <div
                  className={`p-5 rounded-2xl border ${instructionModal.method.borderColor} bg-background/30 backdrop-blur-lg relative overflow-hidden opacity-0 animate-slide-up fill-forwards`}
                  style={{ animationDelay: "0.5s" }}
                >
                  {/* Animated corner decorations */}
                  <div className="absolute top-2 right-2 animate-twinkle-star">
                    <Star
                      className={`h-3 w-3 ${instructionModal.method.textColor} opacity-40`}
                    />
                  </div>
                  <div className="absolute bottom-2 left-2 animate-twinkle-star delay-500">
                    <Star
                      className={`h-2 w-2 ${instructionModal.method.textColor} opacity-30`}
                    />
                  </div>

                  <p className="text-xs text-foreground/60 mb-3 text-center font-medium">
                    ট্যাপ করে নম্বর কপি করুন
                  </p>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        getNumber(instructionModal.method!.id),
                        `modal-${instructionModal.method!.id}`,
                      )
                    }
                    className={`w-full flex items-center justify-center gap-4 bg-background/40 hover:bg-background/60 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 active:scale-[0.98] border ${instructionModal.method.borderColor}`}
                  >
                    <span
                      className={`font-mono text-2xl tracking-wider font-bold ${instructionModal.method.textColor}`}
                    >
                      {getNumber(instructionModal.method.id)}
                    </span>
                    <div
                      className={`p-2.5 rounded-xl transition-all duration-300 ${copiedId === `modal-${instructionModal.method.id}` ? "bg-green-500/30" : `bg-gradient-to-r ${instructionModal.method.color}`}`}
                    >
                      {copiedId === `modal-${instructionModal.method.id}` ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy className="h-5 w-5 text-white" />
                      )}
                    </div>
                  </button>
                  {copiedId === `modal-${instructionModal.method.id}` && (
                    <p className="text-center text-green-500 text-xs mt-2 animate-slide-up font-medium">
                      কপি হয়েছে!
                    </p>
                  )}
                </div>

                {/* QR Code */}
                {getQRCode(instructionModal.method.id) && (
                  <div
                    className="flex flex-col items-center opacity-0 animate-slide-up fill-forwards rounded-2xl bg-background/20 backdrop-blur-lg p-5 border border-border/20 relative"
                    style={{ animationDelay: "0.6s" }}
                  >
                    {/* Animated decorations around QR */}
                    <div className="absolute top-3 left-3 animate-float-gentle">
                      <Sparkles
                        className={`h-4 w-4 ${instructionModal.method.textColor} opacity-30`}
                      />
                    </div>
                    <div className="absolute top-3 right-3 animate-float-gentle delay-300">
                      <Star
                        className={`h-3 w-3 ${instructionModal.method.textColor} opacity-30 fill-current`}
                      />
                    </div>

                    <p className="text-xs text-foreground/60 mb-4 font-medium">
                      অথবা QR কোড স্ক্যান করুন
                    </p>
                    <div className="relative">
                      <div
                        className={`absolute inset-[-8px] bg-gradient-to-r ${instructionModal.method.color} rounded-2xl opacity-30 blur-xl animate-breathe`}
                      />
                      <img
                        src={getQRCode(instructionModal.method.id)}
                        alt={`${instructionModal.method.name} QR Code`}
                        className="relative w-36 h-36 object-contain rounded-xl border-2 border-border bg-white p-2 shadow-xl"
                      />
                    </div>
                  </div>
                )}

                {/* Complete Button */}
                <Button
                  onClick={handlePaymentComplete}
                  className={`w-full py-6 text-base font-bold bg-gradient-to-r ${instructionModal.method.color} hover:opacity-90 text-white shadow-xl transition-all active:scale-[0.98] rounded-2xl opacity-0 animate-slide-up fill-forwards hover:scale-[1.02]`}
                  style={{ animationDelay: "0.7s" }}
                >
                  <Heart className="mr-2 h-5 w-5 animate-heartbeat" />
                  ঈদি পাঠিয়েছি
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Thank You Modal - Congratulations Card */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent
          className="bg-background/60 backdrop-blur-2xl border-primary/20 max-w-md text-center overflow-hidden p-0 rounded-3xl [&>button]:hidden animate-scale-in shadow-2xl"
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

          {/* Header Gradient with animation */}
          <div className="h-2 w-full bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_100%]" />

          <div className="px-8 py-10 space-y-6 relative z-10">
            {/* Close Button */}
            <button
              onClick={() => setShowThankYou(false)}
              className="absolute right-4 top-4 rounded-full p-2 bg-background/50 hover:bg-background hover:scale-110 transition-all z-50"
            >
              <X className="h-4 w-4 text-foreground/60" />
            </button>

            {/* Success Icon with enhanced animation */}
            <div className="relative mx-auto w-24 h-24 animate-scale-in">
              <div className="absolute inset-[-16px] bg-gradient-to-r from-primary to-accent rounded-full opacity-30 blur-2xl animate-breathe" />
              <div className="absolute inset-[-8px] bg-gradient-to-r from-accent to-primary rounded-full opacity-20 blur-xl animate-breathe delay-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl animate-scale-pulse">
                <Moon
                  className="h-10 w-10 text-white animate-moon-glow"
                  fill="currentColor"
                />
              </div>
              <Star className="absolute -top-2 right-0 h-6 w-6 text-accent fill-accent animate-twinkle-star" />
              <Star className="absolute -bottom-2 -left-2 h-5 w-5 text-primary fill-primary animate-twinkle-star delay-300" />
              <Star className="absolute top-0 -left-3 h-4 w-4 text-accent fill-accent animate-twinkle-star delay-600" />
            </div>

            {/* Message with enhanced animation */}
            <div
              className="space-y-2 opacity-0 animate-slide-up fill-forwards"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="text-3xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer-text">
                জাযাকাল্লাহু খাইরান!
              </h2>
              <p
                className="text-foreground/80 font-medium opacity-0 animate-slide-up fill-forwards"
                style={{ animationDelay: "0.3s" }}
              >
                আপনার ঈদি পেয়ে খুশি হলাম
              </p>
            </div>

            {/* Thank You Box with glow */}
            <div
              className="bg-primary/5 rounded-2xl p-5 border border-primary/10 opacity-0 animate-slide-up fill-forwards hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10"
              style={{ animationDelay: "0.4s" }}
            >
              <p className="text-foreground/60 text-sm mb-2">
                আপনার এই ভালোবাসা ও স্নেহ আমাকে অনুপ্রাণিত করেছে।
              </p>
              <p className="text-foreground font-semibold">
                আল্লাহ আপনাকে উত্তম প্রতিদান দিন।
              </p>
            </div>

            {/* Eid Mubarak with enhanced animation */}
            <div
              className="opacity-0 animate-scale-in fill-forwards"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 animate-border-glow hover:scale-105 transition-transform duration-300">
                <p className="text-3xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer-text">
                  ঈদ মোবারক!
                </p>
              </div>
              <p
                className="text-foreground/50 text-sm mt-4 opacity-0 animate-slide-up fill-forwards"
                style={{ animationDelay: "0.6s" }}
              >
                - {paymentInfo.ownerName}
              </p>
            </div>

            {/* Hearts with enhanced animation */}
            <div
              className="flex justify-center gap-4 pt-2 opacity-0 animate-slide-up fill-forwards"
              style={{ animationDelay: "0.7s" }}
            >
              <Heart className="h-5 w-5 text-red-400 fill-red-400 animate-float-gentle" />
              <Heart className="h-7 w-7 text-red-500 fill-red-500 animate-heartbeat" />
              <Heart className="h-5 w-5 text-red-400 fill-red-400 animate-float-gentle delay-500" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
