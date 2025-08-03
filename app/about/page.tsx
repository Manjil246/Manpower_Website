import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Eye, Award } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Nepal Manpower Company
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your trusted partner in foreign employment with over a decade of
              experience in connecting Nepalese workers with global
              opportunities.
            </p>
          </div>

          {/* Company Overview */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Established in 2014, Nepal Manpower Company has been at the
                forefront of foreign employment services in Nepal. We have
                successfully placed over 1000 workers across 15+ countries,
                helping them build better futures for themselves and their
                families.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Our commitment to transparency, professionalism, and worker
                welfare has made us one of the most trusted recruitment agencies
                in Nepal. We work closely with licensed employers worldwide to
                ensure safe and secure employment opportunities.
              </p>
              <p className="text-lg text-muted-foreground">
                Licensed by the Government of Nepal (License No: 1234/2024/GON),
                we adhere to all national and international standards for
                foreign employment services.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dsatsojpo/image/upload/v1754247132/Gemini_Generated_Image_rnfpj6rnfpj6rnfp_d11fg2.png"
                alt="Nepal Manpower Company Office"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide reliable, transparent, and professional foreign
                  employment services that create opportunities for Nepalese
                  workers to build successful careers abroad.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To be the leading manpower company in Nepal, recognized
                  globally for our commitment to worker welfare and ethical
                  recruitment practices.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Our Values</h3>
                <p className="text-muted-foreground">
                  Integrity, transparency, worker welfare, professional
                  excellence, and building long-term relationships with both
                  workers and employers.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Director Message */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-1">
                  <Image
                    src="https://res.cloudinary.com/dsatsojpo/image/upload/v1721054564/posts/e6qany1p7knwn3csdzm9.jpg"
                    alt="Company Director"
                    width={250}
                    height={300}
                    className="rounded-lg mx-auto"
                  />
                </div>
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold mb-4">
                    Message from Our Director
                  </h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    "At Nepal Manpower Company, we believe that every worker
                    deserves a fair opportunity to build a better future. Our
                    commitment goes beyond just job placement – we ensure that
                    our workers are treated with dignity and respect in their
                    workplace."
                  </p>
                  <p className="text-lg text-muted-foreground mb-4">
                    "Over the years, we have built strong relationships with
                    employers worldwide who share our values of fair employment
                    practices. This has enabled us to provide not just jobs, but
                    career opportunities that allow our workers to grow and
                    prosper."
                  </p>
                  <div className="border-l-4 border-primary pl-4">
                    <p className="font-semibold">Mr. Manjil Dhungana</p>
                    <p className="text-muted-foreground">Managing Director</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why Choose Us */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">
              Why Choose Nepal Manpower Company?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Experienced Team</h3>
                <p className="text-muted-foreground">
                  Our team of experienced professionals provides personalized
                  guidance throughout the employment process.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  Licensed & Certified
                </h3>
                <p className="text-muted-foreground">
                  Fully licensed by the Government of Nepal with all necessary
                  certifications and approvals.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  Transparent Process
                </h3>
                <p className="text-muted-foreground">
                  Clear, transparent processes with no hidden fees or charges.
                  Everything is explained upfront.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
