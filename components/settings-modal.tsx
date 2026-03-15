"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import type { PaymentInfo } from "@/app/page";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentInfo: PaymentInfo;
  onSave: (info: PaymentInfo) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  paymentInfo,
  onSave,
}: SettingsModalProps) {
  const [formData, setFormData] = useState<PaymentInfo>(paymentInfo);

  useEffect(() => {
    setFormData(paymentInfo);
  }, [paymentInfo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl">
            সেটিংস
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            আপনার পেমেন্ট নম্বরগুলো এখানে দিন। এই লিংক শেয়ার করলে অন্যরা আপনার নম্বর দেখতে পাবে।
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Owner Name */}
          <div className="space-y-2">
            <Label htmlFor="ownerName" className="text-foreground">
              আপনার নাম
            </Label>
            <Input
              id="ownerName"
              value={formData.ownerName}
              onChange={(e) =>
                setFormData({ ...formData, ownerName: e.target.value })
              }
              placeholder="আপনার নাম লিখুন"
              className="bg-input border-border text-foreground"
            />
          </div>

          {/* bKash */}
          <div className="space-y-2">
            <Label htmlFor="bkash" className="text-foreground flex items-center gap-2">
              <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-pink-500 text-white">
                bKash
              </span>
              নম্বর
            </Label>
            <Input
              id="bkash"
              value={formData.bkash}
              onChange={(e) =>
                setFormData({ ...formData, bkash: e.target.value })
              }
              placeholder="01XXXXXXXXX"
              className="bg-input border-border text-foreground font-mono"
            />
          </div>

          {/* Nagad */}
          <div className="space-y-2">
            <Label htmlFor="nagad" className="text-foreground flex items-center gap-2">
              <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-orange-500 text-white">
                Nagad
              </span>
              নম্বর
            </Label>
            <Input
              id="nagad"
              value={formData.nagad}
              onChange={(e) =>
                setFormData({ ...formData, nagad: e.target.value })
              }
              placeholder="01XXXXXXXXX"
              className="bg-input border-border text-foreground font-mono"
            />
          </div>

          {/* Rocket */}
          <div className="space-y-2">
            <Label htmlFor="rocket" className="text-foreground flex items-center gap-2">
              <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-purple-500 text-white">
                Rocket
              </span>
              নম্বর
            </Label>
            <Input
              id="rocket"
              value={formData.rocket}
              onChange={(e) =>
                setFormData({ ...formData, rocket: e.target.value })
              }
              placeholder="01XXXXXXXXX"
              className="bg-input border-border text-foreground font-mono"
            />
          </div>

          {/* Save button */}
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Save className="mr-2 h-4 w-4" />
            সেভ করুন
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
