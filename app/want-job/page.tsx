"use client"

import { useEffect } from "react"

export default function WantJobPage() {
  useEffect(() => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+9779876543210"
    const message = "Hello! I am interested in foreign employment opportunities."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    window.history.back()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to WhatsApp...</p>
    </div>
  )
}
