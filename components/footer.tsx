"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  const handleWhatsAppClick = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+9779876543210"
    const message = "Hello! I would like to inquire about foreign employment opportunities."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">NM</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl">Nepal Manpower</span>
                <span className="text-xs text-slate-400">Foreign Employment</span>
              </div>
            </div>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Leading manpower company in Nepal specializing in foreign employment opportunities with 10+ years of
              experience.
            </p>
            <p className="text-sm text-slate-400 font-medium">
              License No: {process.env.NEXT_PUBLIC_COMPANY_LICENSE || "1234/2024/GON"}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-200">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-300 hover:text-white transition-colors duration-200">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-200">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-slate-400 flex-shrink-0" />
                <span className="text-slate-300">Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-slate-400 flex-shrink-0" />
                <span className="text-slate-300">+977-1-4567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-slate-400 flex-shrink-0" />
                <span className="text-slate-300">info@nepalmanpower.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media & WhatsApp */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-200">Connect With Us</h3>
            <div className="flex space-x-3 mb-6">
              <Button
                variant="outline"
                size="icon"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 hover:text-white transition-all duration-200 bg-transparent"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 hover:text-white transition-all duration-200 bg-transparent"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 hover:text-white transition-all duration-200 bg-transparent"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 hover:text-white transition-all duration-200 bg-transparent"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-200"
            >
              Contact via WhatsApp
            </Button>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_COMPANY_NAME || "Nepal Manpower Company"}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
