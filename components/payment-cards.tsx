"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Send } from "lucide-react";
import type { PaymentInfo } from "@/app/page";

interface PaymentCardsProps {
  paymentInfo: PaymentInfo;
  onPaymentClick: () => void;
}

const paymentMethods = [
  {
    id: "bkash",
    name: "বিকাশ",
    color: "from-pink-600 to-pink-500",
    bgColor: "bg-pink-500/10",
    textColor: "text-pink-400",
    borderColor: "border-pink-500/30",
    logo: "bKash",
  },
  {
    id: "nagad",
    name: "নগদ",
    color: "from-orange-600 to-orange-500",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-400",
    borderColor: "border-orange-500/30",
    logo: "Nagad",
  },
  {
    id: "rocket",
    name: "রকেট",
    color: "from-purple-600 to-purple-500",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-400",
    borderColor: "border-purple-500/30",
    logo: "Rocket",
  },
];

export function PaymentCards({ paymentInfo, onPaymentClick }: PaymentCardsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, number: string) => {
    await navigator.clipboard.writeText(number);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getNumber = (id: string) => {
    return paymentInfo[id as keyof PaymentInfo] as string;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Section title */}
      <div className="text-center mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          ঈদি পাঠান
        </h3>
        <p className="text-muted-foreground text-sm">
          নিচের যেকোনো নম্বরে ঈদি পাঠাতে পারেন
        </p>
      </div>

      {/* Payment cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {paymentMethods.map((method) => (
          <Card
            key={method.id}
            className={`${method.bgColor} ${method.borderColor} border-2 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-${method.id === 'bkash' ? 'pink' : method.id === 'nagad' ? 'orange' : 'purple'}-500/20`}
          >
            <CardContent className="p-6">
              {/* Logo/Header */}
              <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${method.color} text-white text-sm font-bold mb-4`}>
                {method.logo}
              </div>

              {/* Method name */}
              <h4 className={`text-lg font-bold ${method.textColor} mb-2`}>
                {method.name}
              </h4>

              {/* Number display */}
              <div className="flex items-center gap-2 bg-background/50 rounded-lg p-3">
                <span className="text-foreground font-mono text-lg flex-1 tracking-wider">
                  {getNumber(method.id)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 ${method.textColor} hover:bg-background/50`}
                  onClick={() => handleCopy(method.id, getNumber(method.id))}
                >
                  {copiedId === method.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Copy feedback */}
              {copiedId === method.id && (
                <p className={`text-xs ${method.textColor} mt-2 text-center animate-in fade-in`}>
                  কপি হয়েছে!
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Send Eidi button */}
      <div className="text-center">
        <Button
          size="lg"
          className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
          onClick={onPaymentClick}
        >
          <Send className="mr-2 h-5 w-5" />
          ঈদি পাঠিয়েছি
        </Button>
        <p className="text-muted-foreground text-xs mt-3">
          টাকা পাঠানোর পর এই বাটনে ক্লিক করুন
        </p>
      </div>
    </div>
  );
}
