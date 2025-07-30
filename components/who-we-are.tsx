"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Globe, Award } from "lucide-react"

export function WhoWeAre() {
  const handleWhatsAppClick = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+9779876543210"
    const message = "Hello! I am interested in foreign employment opportunities."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Who We Are</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Nepal Manpower Company is a leading recruitment agency specializing in foreign employment opportunities.
              With over 10 years of experience, we have successfully placed more than 1000 workers across 15+ countries.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We are committed to providing reliable, transparent, and professional services to both job seekers and
              employers. Our team ensures that every placement meets international standards and provides growth
              opportunities for our candidates.
            </p>
            <Button
              onClick={handleWhatsAppClick}
              size="lg"
              className="text-lg px-8 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 shadow-lg hover:shadow-xl btn-animate"
            >
              Apply via WhatsApp
            </Button>
          </div>

          <div className="grid gap-6">
            <Card className="p-6 card-hover border-0 shadow-lg">
              <CardContent className="flex items-start space-x-4 p-0">
                <div className="p-3 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">Expert Team</h3>
                  <p className="text-slate-600">
                    Our experienced professionals guide you through every step of the employment process.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 card-hover border-0 shadow-lg">
              <CardContent className="flex items-start space-x-4 p-0">
                <div className="p-3 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg shadow-lg">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">Global Network</h3>
                  <p className="text-slate-600">Strong partnerships with employers across 15+ countries worldwide.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 card-hover border-0 shadow-lg">
              <CardContent className="flex items-start space-x-4 p-0">
                <div className="p-3 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">Licensed & Trusted</h3>
                  <p className="text-slate-600">Fully licensed by the Government of Nepal with proven track record.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
