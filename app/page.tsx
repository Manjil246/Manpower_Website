import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { WhoWeAre } from "@/components/who-we-are";
import { JobCategories } from "@/components/job-categories";
import { FeaturedJobs } from "@/components/featured-jobs";
import { Testimonials } from "@/components/testimonials";
import { StatsCounter } from "@/components/stats-counter";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WhoWeAre />
        <JobCategories />
        <FeaturedJobs />
        {/* <Testimonials /> */}
        <StatsCounter />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
