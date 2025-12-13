import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Link2, Zap, Shield, Target, BarChart3, Clock } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const packages = [
  {
    name: "Basic",
    price: "$150",
    period: "/link",
    description: "Quality niche edits on established blogs",
    features: [
      "DR 30-40 websites",
      "Real traffic sites",
      "Niche-relevant placements",
      "Do-follow links",
      "Natural anchor text",
      "14-day turnaround",
    ],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$300",
    period: "/link",
    description: "High-authority placements for serious results",
    features: [
      "DR 50-60 websites",
      "1,000+ monthly traffic",
      "Contextual placements",
      "Permanent do-follow",
      "Anchor text optimization",
      "7-day turnaround",
      "Link monitoring",
    ],
    highlighted: true,
  },
  {
    name: "Elite",
    price: "$500",
    period: "/link",
    description: "Premium placements on top-tier sites",
    features: [
      "DR 60+ websites",
      "5,000+ monthly traffic",
      "Hand-picked sites only",
      "Editorial review",
      "Custom anchor strategy",
      "Priority placement",
      "12-month guarantee",
      "Detailed reporting",
    ],
    highlighted: false,
  },
]

const faqs = [
  {
    question: "What are link insertions (niche edits)?",
    answer:
      "Link insertions, also known as niche edits or curated links, involve adding your link to existing, already-indexed content on relevant websites. Unlike guest posts, your link is placed in content that already has authority and rankings.",
  },
  {
    question: "Are link insertions safe for SEO?",
    answer:
      "When done properly with natural anchor text and relevant placements, link insertions are completely safe and effective. We only work with real websites with genuine traffic, never PBNs or link farms.",
  },
  {
    question: "How do you find placement opportunities?",
    answer:
      "We use proprietary tools to identify relevant articles that are already ranking and receiving traffic. We then reach out to site owners to negotiate contextual link placements that add value to their content.",
  },
  {
    question: "What's your guarantee policy?",
    answer:
      "All link insertions come with a minimum 12-month guarantee. If a link is removed within that period, we'll replace it at no additional cost.",
  },
  {
    question: "How long until links are live?",
    answer:
      "Basic placements typically go live within 14 days, Premium within 7 days, and Elite placements are prioritized for the fastest possible turnaround, usually 3-5 days.",
  },
]

export default function LinkInsertionsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Niche Edits
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                Link Insertion <span className="text-primary">Services</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Get powerful backlinks from existing, indexed content on high-authority websites. Faster results, lower
                cost, and proven effectiveness for boosting your rankings.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="rounded-full px-8" asChild>
                  <Link href="/contact">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent" asChild>
                  <Link href="#pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Zap,
                  title: "Faster Results",
                  description:
                    "Links on already-indexed pages pass authority immediately, often showing results within weeks.",
                },
                {
                  icon: Target,
                  title: "Contextual Relevance",
                  description: "Placements in existing, topically relevant content for maximum SEO impact.",
                },
                {
                  icon: Shield,
                  title: "Safe & Natural",
                  description: "Only real websites with genuine traffic. No PBNs, no link farms, ever.",
                },
                {
                  icon: BarChart3,
                  title: "Proven Authority",
                  description: "Links from pages that already rank and have established domain authority.",
                },
                {
                  icon: Clock,
                  title: "Quick Turnaround",
                  description: "Most placements completed within 7-14 days depending on package.",
                },
                {
                  icon: Link2,
                  title: "Permanent Links",
                  description: "Do-follow links with 12-month guarantee and replacement policy.",
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
                Link Insertion <span className="text-primary">Packages</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Flexible per-link pricing to fit any budget and campaign size.
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
                    <Link href="/contact">Order Now</Link>
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
