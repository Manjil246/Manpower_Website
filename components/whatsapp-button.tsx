"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const phoneNumber =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+9779876543210";
    const message =
      "Hello! I am interested in foreign employment opportunities.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-600 animate-bounce"
      size="icon"
    >
      <MessageCircle className="h-6 w-6 text-white" />
      <span className="sr-only">Contact via WhatsApp</span>
    </Button>
  );
}
