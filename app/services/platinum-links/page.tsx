import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Crown, Shield, Globe, TrendingUp, Award, Star } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const packages = [
  {
    name: "Platinum Single",
    price: "$1,200",
    period: "/link",
    description: "Individual high-authority placements",
    features: [
      "DR 70+ websites only",
      "Major news sites & publications",
      "10,000+ monthly traffic minimum",
      "Editorial-style content",
      "Brand mention + backlink",
      "Permanent do-follow",
      "Full reporting",
    ],
    highlighted: false,
  },
  {
    name: "Platinum Package",
    price: "$5,000",
    period: "/5 links",
    description: "Discounted bundle for serious campaigns",
    features: [
      "5 x DR 70+ placements",
      "Mix of news & industry sites",
      "Custom anchor text strategy",
      "Dedicated campaign manager",
      "Priority placement queue",
      "Monthly progress reports",
      "12-month guarantee",
      "Competitor gap analysis",
    ],
    highlighted: true,
  },
  {
    name: "Platinum Elite",
    price: "$12,000",
    period: "/month",
    description: "Ongoing premium link acquisition",
    features: [
      "15+ DR 70+ links monthly",
      "Top-tier publications only",
      "Digital PR opportunities",
      "Executive bylines available",
      "Brand building strategy",
      "Weekly strategy calls",
      "Custom dashboard",
      "White-glove service",
    ],
    highlighted: false,
  },
]

const featuredSites = [
  "Forbes",
  "Entrepreneur",
  "Inc.",
  "Business Insider",
  "TechCrunch",
  "HuffPost",
  "Mashable",
  "The Next Web",
]

const faqs = [
  {
    question: "What qualifies as a 'Platinum' link?",
    answer:
      "Platinum links are placements on websites with DR 70+ (Ahrefs Domain Rating), significant real traffic (10,000+ monthly visitors), and strong editorial standards. These are typically major news outlets, industry publications, and authoritative media sites.",
  },
  {
    question: "How do you secure placements on major publications?",
    answer:
      "We've built relationships with editors and contributors at major publications over many years. Combined with our digital PR expertise and ability to create newsworthy content angles, we consistently secure placements that most agencies simply cannot access.",
  },
  {
    question: "Are these links permanent?",
    answer:
      "Yes, all Platinum links are permanent do-follow links with a 12-month guarantee. If any link is removed within 12 months, we replace it at no additional cost.",
  },
  {
    question: "What's the typical turnaround time?",
    answer:
      "Platinum link placements typically take 3-6 weeks due to the editorial process at major publications. We provide regular updates throughout and never rush quality for speed.",
  },
  {
    question: "Can you guarantee specific publications?",
    answer:
      "While we cannot guarantee specific publications (editorial decisions are ultimately theirs), we can target specific tiers and industries. We'll discuss your goals and provide realistic expectations during our consultation.",
  },
]

export default function PlatinumLinksPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Crown className="h-4 w-4" />
                Premium Service
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                <span className="text-primary">Platinum</span> Link Building
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Exclusive backlinks from the world's most authoritative websites. DR 70+ placements on major news
                outlets, industry publications, and top-tier media sites that transform your SEO.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="rounded-full px-8" asChild>
                  <Link href="/contact">Request Access</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent" asChild>
                  <Link href="#pricing">View Packages</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Sites */}
        <section className="border-y border-border py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-medium text-muted-foreground mb-6">
              Get featured on publications like:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {featuredSites.map((site) => (
                <span
                  key={site}
                  className="text-lg font-semibold text-muted-foreground/60 hover:text-foreground transition-colors"
                >
                  {site}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why <span className="text-primary">Platinum</span> Links?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Not all backlinks are created equal. Platinum links deliver exponentially more value than standard
                placements.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Crown,
                  title: "Unmatched Authority",
                  description:
                    "DR 70+ sites pass significant link equity, often equivalent to 10-20 standard backlinks.",
                },
                {
                  icon: Globe,
                  title: "Massive Reach",
                  description: "Your brand gets exposure to millions of readers on top-tier publications.",
                },
                {
                  icon: Shield,
                  title: "Algorithm-Proof",
                  description: "Editorial links from major sites are the safest, most sustainable link type possible.",
                },
                {
                  icon: TrendingUp,
                  title: "Ranking Power",
                  description: "A single Platinum link can move the needle more than months of standard link building.",
                },
                {
                  icon: Award,
                  title: "Brand Building",
                  description: "Being featured on major publications builds credibility and trust with your audience.",
                },
                {
                  icon: Star,
                  title: "Referral Traffic",
                  description: "High-traffic placements drive qualified visitors directly to your site.",
                },
              ].map((benefit) => (
                <div key={benefit.title} className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-secondary/30 py-24" id="pricing">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Platinum Link <span className="text-primary">Packages</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Investment-grade link building for serious brands.
              </p>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`relative rounded-2xl border ${
                    pkg.highlighted
                      ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
                      : "border-border bg-background"
                  } p-8`}
                >
                  {pkg.highlighted && (
                    <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      Best Value
                    </div>
                  )}
                  <div>
                    <h3 className={`text-xl font-semibold ${pkg.highlighted ? "text-primary" : ""}`}>{pkg.name}</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{pkg.price}</span>
                      <span className="text-muted-foreground">{pkg.period}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{pkg.description}</p>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="mt-8 w-full rounded-full"
                    variant={pkg.highlighted ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
            </div>
            <Accordion type="single" collapsible className="mt-12">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
