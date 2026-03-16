"use client";

import { useState, useEffect, useRef } from "react";
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
import { Save, X, QrCode, Sparkles, User, Phone } from "lucide-react";
import type { PaymentInfo } from "@/lib/types";

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
  const bkashInputRef = useRef<HTMLInputElement>(null);
  const nagadInputRef = useRef<HTMLInputElement>(null);
  const rocketInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData(paymentInfo);
  }, [paymentInfo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleQRUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'bkashQR' | 'nagadQR' | 'rocketQR') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeQR = (field: 'bkashQR' | 'nagadQR' | 'rocketQR') => {
    setFormData({ ...formData, [field]: undefined });
  };

  const paymentServices = [
    { id: 'bkash', name: 'bKash', color: 'from-[#E2136E] to-[#C4105D]', bgColor: 'bg-[#E2136E]/10', borderColor: 'border-[#E2136E]/20', field: 'bkash' as keyof PaymentInfo, qrField: 'bkashQR' as 'bkashQR', inputRef: bkashInputRef },
    { id: 'nagad', name: 'Nagad', color: 'from-[#F6921E] to-[#E07D0C]', bgColor: 'bg-[#F6921E]/10', borderColor: 'border-[#F6921E]/20', field: 'nagad' as keyof PaymentInfo, qrField: 'nagadQR' as 'nagadQR', inputRef: nagadInputRef },
    { id: 'rocket', name: 'Rocket', color: 'from-[#8B3A9B] to-[#6A2B77]', bgColor: 'bg-[#8B3A9B]/10', borderColor: 'border-[#8B3A9B]/20', field: 'rocket' as keyof PaymentInfo, qrField: 'rocketQR' as 'rocketQR', inputRef: rocketInputRef },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card/95 backdrop-blur-xl border-primary/20 max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            সেটিংস
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            আপনার পেমেন্ট নম্বরগুলো এখানে দিন
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Owner Name */}
          <div className="space-y-2">
            <Label htmlFor="ownerName" className="text-foreground flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-primary" />
              আপনার নাম
            </Label>
            <Input
              id="ownerName"
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
              placeholder="আপনার নাম লিখুন"
              className="bg-background/50 border-border/50 text-foreground focus:border-primary/50 transition-colors"
            />
          </div>

          {/* Payment Services */}
          {paymentServices.map((service) => (
            <div key={service.id} className={`p-4 rounded-xl ${service.bgColor} ${service.borderColor} border space-y-3`}>
              <Label htmlFor={service.id} className="text-foreground flex items-center gap-2 text-sm">
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold bg-gradient-to-r ${service.color} text-white`}>
                  {service.name}
                </span>
                <Phone className="h-3 w-3 text-muted-foreground" />
                নম্বর
              </Label>
              <Input
                id={service.id}
                value={formData[service.field] as string}
                onChange={(e) => setFormData({ ...formData, [service.field]: e.target.value })}
                placeholder="01XXXXXXXXX"
                className="bg-background/70 border-border/50 text-foreground font-mono focus:border-primary/50 transition-colors"
              />
              
              {/* QR Upload */}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  ref={service.inputRef}
                  onChange={(e) => handleQRUpload(e, service.qrField)}
                  className="hidden"
                />
                {formData[service.qrField] ? (
                  <div className="relative inline-block">
                    <img 
                      src={formData[service.qrField]} 
                      alt={`${service.name} QR`} 
                      className="w-16 h-16 object-contain rounded-lg border border-border bg-white" 
                    />
                    <button
                      type="button"
                      onClick={() => removeQR(service.qrField)}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/80 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => service.inputRef.current?.click()}
                    className="text-xs bg-background/50 border-border/50 hover:bg-background/80"
                  >
                    <QrCode className="h-3 w-3 mr-1" />
                    QR কোড আপলোড
                  </Button>
                )}
              </div>
            </div>
          ))}

          {/* Save Button */}
          <Button
            type="submit"
            className="w-full py-5 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-bold shadow-lg hover:shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Save className="mr-2 h-4 w-4" />
            সেভ করুন
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
