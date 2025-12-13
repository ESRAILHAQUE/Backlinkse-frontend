import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { IntroSection } from "@/components/intro-section"
import { ResultsShowcaseSection } from "@/components/results-showcase-section"
import { ClientLogosSection } from "@/components/client-logos-section"
import { PricingSection } from "@/components/pricing-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { ComparisonSection } from "@/components/comparison-section"
import { ReviewsSection } from "@/components/reviews-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        {/* 1. Trusted by 500+ companies */}
        <ClientLogosSection />
        {/* 2. We build authoritative backlinks */}
        <IntroSection />
        {/* 3. We get results */}
        <ResultsShowcaseSection />
        <ReviewsSection />
        {/* 4. Our Link Building Pricing */}
        <PricingSection />
        {/* 5. Client Testimonials */}
        <TestimonialsSection />
        {/* 6. Why choose Backlinkse? */}
        <ComparisonSection />
        {/* 7. FAQs */}
        <FAQSection />
        {/* 8. Ready to Build Your Authority? (CTA) */}
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
