import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, FileText, Target, TrendingUp, Users, Clock, Award } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const packages = [
  {
    name: "Starter",
    price: "$500",
    period: "/month",
    description: "Perfect for startups building their content foundation",
    articles: "4 articles",
    wordCount: "1,500 words each",
    features: [
      "SEO-optimized content",
      "Keyword research included",
      "Meta descriptions",
      "Internal linking",
      "1 revision round",
      "7-day delivery",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$1,200",
    period: "/month",
    description: "Ideal for businesses scaling their content marketing",
    articles: "8 articles",
    wordCount: "2,000 words each",
    features: [
      "Advanced keyword research",
      "Competitor content analysis",
      "Custom featured images",
      "Schema markup",
      "2 revision rounds",
      "Priority delivery",
      "Content calendar",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$2,500",
    period: "/month",
    description: "For brands dominating their content space",
    articles: "16 articles",
    wordCount: "2,500 words each",
    features: [
      "Topic cluster strategy",
      "Expert interviews included",
      "Original research & data",
      "Infographic creation",
      "Unlimited revisions",
      "Dedicated content manager",
      "Monthly strategy calls",
      "Content performance reports",
    ],
    highlighted: false,
  },
]

const faqs = [
  {
    question: "What makes your SEO blog writing different?",
    answer:
      "Our writers are trained SEO specialists, not just content writers. They understand search intent, keyword placement, and how to structure content that ranks. Every piece is optimized for both search engines and human readers.",
  },
  {
    question: "How do you research topics and keywords?",
    answer:
      "We use professional tools like Ahrefs, SEMrush, and Clearscope to identify high-opportunity keywords with strong search volume and reasonable competition. We also analyze your competitors' top-performing content to find gaps.",
  },
  {
    question: "Do you write for any niche?",
    answer:
      "We have writers experienced in most B2B and B2C niches including SaaS, e-commerce, finance, healthcare, legal, and technology. For highly technical topics, we work with subject matter experts to ensure accuracy.",
  },
  {
    question: "What's your revision policy?",
    answer:
      "Starter packages include 1 revision round, Growth includes 2 rounds, and Enterprise has unlimited revisions. We work until you're 100% satisfied with the content.",
  },
  {
    question: "Can you publish directly to our CMS?",
    answer:
      "Yes! We can publish directly to WordPress, Webflow, HubSpot, and most other CMS platforms. We'll handle formatting, images, and meta data so content is ready to go live.",
  },
]

export default function SEOBlogWritingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Content That Ranks
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                SEO Blog Writing <span className="text-primary">Services</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Expert-written, SEO-optimized blog content that drives organic traffic and establishes your brand as an
                industry authority. Every article is crafted to rank.
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
                  icon: Target,
                  title: "Keyword-Optimized",
                  description:
                    "Every article targets specific keywords with strategic placement and semantic optimization.",
                },
                {
                  icon: TrendingUp,
                  title: "Rank-Ready Content",
                  description: "Structured for featured snippets, with proper headings, lists, and schema markup.",
                },
                {
                  icon: Users,
                  title: "Expert Writers",
                  description: "Industry-specialized writers who understand your audience and speak their language.",
                },
                {
                  icon: FileText,
                  title: "Original Research",
                  description: "Unique data, insights, and perspectives that set your content apart from competitors.",
                },
                {
                  icon: Clock,
                  title: "Fast Turnaround",
                  description: "Reliable delivery schedules so you can plan your content calendar with confidence.",
                },
                {
                  icon: Award,
                  title: "Quality Guarantee",
                  description:
                    "100% original, plagiarism-free content with unlimited revisions until you're satisfied.",
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
                SEO Blog Writing <span className="text-primary">Packages</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Consistent, high-quality content delivered on schedule every month.
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
                      Most Popular
                    </div>
                  )}
                  <div>
                    <h3 className={`text-xl font-semibold ${pkg.highlighted ? "text-primary" : ""}`}>{pkg.name}</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{pkg.price}</span>
                      <span className="text-muted-foreground">{pkg.period}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{pkg.description}</p>
                    <div className="mt-4 rounded-lg bg-secondary/50 p-3 text-center">
                      <div className="font-semibold">{pkg.articles}</div>
                      <div className="text-sm text-muted-foreground">{pkg.wordCount}</div>
                    </div>
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
