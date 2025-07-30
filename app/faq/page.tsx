"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

const faqs = [
  {
    question: "What documents do I need for foreign employment?",
    answer:
      "You will need: Valid passport, Educational certificates, Medical fitness certificate, Police clearance certificate, Work permit (arranged by employer), and other country-specific documents. We will guide you through the complete documentation process.",
  },
  {
    question: "How much does it cost to get a job abroad?",
    answer:
      "The cost varies depending on the destination country and job type. It typically includes visa fees, medical tests, documentation, and service charges. We provide transparent pricing with no hidden costs. Contact us for detailed cost breakdown for your specific case.",
  },
  {
    question: "How long does the process take?",
    answer:
      "The complete process usually takes 2-4 months depending on the country and job type. This includes documentation, visa processing, medical tests, and final approvals. We keep you updated throughout the process.",
  },
  {
    question: "Do you provide accommodation and food?",
    answer:
      "Most of our job placements include accommodation provided by the employer. Food arrangements vary by country and employer. We ensure all terms are clearly mentioned in your contract before departure.",
  },
  {
    question: "What if I face problems abroad?",
    answer:
      "We maintain contact with our placed workers and provide support for any issues. We work with reliable employers and have local contacts in destination countries. Emergency support is available 24/7.",
  },
  {
    question: "Can I change jobs once I'm abroad?",
    answer:
      "Job changes depend on the country's labor laws and your visa type. Some countries allow job changes after completing a certain period with the original employer. We advise on the specific rules for each destination.",
  },
  {
    question: "What is the salary range for different jobs?",
    answer:
      "Salaries vary by country, job type, and experience level. Generally: Security guards ($600-1200/month), Hotel staff ($500-1000/month), Construction workers ($700-1300/month), Factory workers ($500-900/month). All salaries are as per destination country standards.",
  },
  {
    question: "Do you provide training before departure?",
    answer:
      "Yes, we provide orientation training covering work culture, basic language skills, safety guidelines, and country-specific information. Additional skill training may be provided based on job requirements.",
  },
  {
    question: "What happens if my visa gets rejected?",
    answer:
      "Visa rejection is rare when all documents are properly prepared. If rejection occurs, we analyze the reasons and reapply if possible. Our service fee is refundable in case of visa rejection due to our error.",
  },
  {
    question: "Can I bring my family later?",
    answer:
      "Family visa policies vary by country and job type. Some countries allow family visas after completing a certain period of employment. We provide guidance on family reunion procedures for eligible cases.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find answers to common questions about foreign employment process, requirements, and our services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <div className="text-center mt-12">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                  <p className="text-muted-foreground mb-6">
                    Can't find the answer you're looking for? Our team is here to help you with any specific questions
                    about foreign employment.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/contact" className="inline-block">
                      <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium">
                        Contact Us
                      </button>
                    </a>
                    <button
                      onClick={() => {
                        const phoneNumber = "+9779876543210"
                        const message = "Hello! I have some questions about foreign employment."
                        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
                        window.open(whatsappUrl, "_blank")
                      }}
                      className="bg-green-600 text-white hover:bg-green-700 h-10 px-4 py-2 rounded-md font-medium"
                    >
                      WhatsApp Us
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
