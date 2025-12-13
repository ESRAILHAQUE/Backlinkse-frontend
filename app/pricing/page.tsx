import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check, Rocket, Zap, TrendingUp, Building2, Sparkles, Bot } from "lucide-react"
import Link from "next/link"

const monthlyPlans = [
  {
    name: "Startup",
    icon: Rocket,
    price: "$2,999",
    linksPerMonth: "8 Links Per Month",
    features: [
      "Average DR 50-90 Links",
      "Detailed Link Planning",
      "Competitor Backlink Gap Analysis",
      "Keyword Analysis",
      "Custom Reporting Dashboard",
      "Boosts visibility in Google search and AI-generated answers",
    ],
    cta: "Book a Call",
    ctaSecondary: "Request Quote",
    popular: false,
  },
  {
    name: "Pro",
    icon: Zap,
    price: "$5,999",
    linksPerMonth: "16+ Links Per Month",
    features: [
      "Average DR 50-90 Links",
      "Authority Links Included",
      "Target Page Planning",
      "Anchor Text Optimization",
      "Competitor Backlink Gap Analysis",
      "Keyword Analysis",
      "Custom Reporting Dashboard",
      "Boosts visibility in Google search and AI-generated answers",
    ],
    cta: "Request a Quote",
    ctaSecondary: "Book a Call",
    popular: false,
  },
  {
    name: "Growth",
    icon: TrendingUp,
    price: "$9,999",
    linksPerMonth: "26+ Links Per Month",
    features: [
      "Average DR 50-90 Links",
      "Authority Links Included",
      "Anchor Text Optimization",
      "Keyword Analysis",
      "Can spread across multiple domains",
      "Target Page Planning",
      "Competitor Backlink Gap Analysis",
      "Custom Reporting Dashboard",
      "Internal Linking Optimization",
      "Toxic Backlink Audit",
      "Boosts visibility in Google search and AI-generated answers",
    ],
    cta: "Book a Call",
    ctaSecondary: "Request Quote",
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "$19,999",
    linksPerMonth: "53+ Links Per Month",
    features: [
      "Average DR 50-90 Links",
      "Authority Links Included",
      "Anchor Text Optimization",
      "Keyword Analysis",
      "Can spread across multiple domains",
      "Target Page Planning",
      "Competitor Backlink Gap Analysis",
      "Custom Reporting Dashboard",
      "Internal Linking Optimization",
      "Toxic Backlink Audit",
      "Anytime Call Scheduling with Our Founder",
      "Boosts visibility in Google search and AI-generated answers",
    ],
    cta: "Book a Call",
    ctaSecondary: "Request Quote",
    popular: false,
  },
]

const aiPlans = [
  {
    name: "AI Starter",
    icon: Sparkles,
    price: "$1,499",
    period: "/mo",
    description: "Perfect for businesses starting their AI visibility journey",
    features: [
      "4 AI-optimized content pieces",
      "ChatGPT & Perplexity optimization",
      "Brand mention monitoring",
      "Monthly AI visibility report",
      "Keyword research for AI search",
    ],
  },
  {
    name: "AI Growth",
    icon: Bot,
    price: "$3,499",
    period: "/mo",
    description: "Scale your presence across AI platforms",
    features: [
      "10 AI-optimized content pieces",
      "Full AI platform coverage",
      "Advanced brand monitoring",
      "Weekly performance reports",
      "AI citation building",
      "Competitor AI visibility analysis",
      "Dedicated AI strategist",
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-secondary/50 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium text-primary mb-4">Monthly Packages</p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                Premium Link Building Services — {" "}
                <span className="bg-[#c8f7c5] px-2 py-1 rounded"> Built for Rankings</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Get high-authority backlinks that influence Google search results and boost your online visibility. Choose from affordable link-building packages designed for real SEO growth.
              </p>
            </div>
          </div>
        </section>

        {/* Monthly Plans Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              {monthlyPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border bg-card p-8 ${
                    plan.popular ? "border-primary ring-2 ring-primary" : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 right-8">
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                        POPULAR
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <plan.icon className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-semibold">{plan.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary/80 px-3 py-1.5 rounded-full">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">{plan.linksPerMonth}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground"> / mo</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1 rounded-full" asChild>
                      <Link href="/contact">{plan.cta}</Link>
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-full bg-transparent" asChild>
                      <Link href="/contact">{plan.ctaSecondary}</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Add-On Packages */}
        

        {/* Benefits Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Why Our Link Building Plans Deliver Results
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 text-left mt-10">
                <div className="bg-secondary/50 rounded-xl p-6">
                  <h3 className="font-semibold mb-2">Authority Growth</h3>
                  <p className="text-sm text-muted-foreground">
                    Every link we build is from a high-authority, relevant website in your niche, improving your domain
                    authority over time.
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-6">
                  <h3 className="font-semibold mb-2">Manual Outreach Only</h3>
                  <p className="text-sm text-muted-foreground">
                    No automation, no spam. Our team personally reaches out to webmasters and editors to secure genuine
                    editorial placements.
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-6">
                  <h3 className="font-semibold mb-2">Transparent Reporting</h3>
                  <p className="text-sm text-muted-foreground">
                    Access your custom dashboard anytime to see every link, its metrics, and performance data in real
                    time.
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-6">
                  <h3 className="font-semibold mb-2">Strategic Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    We analyze your competitors, identify link gaps, and build a customized strategy to help you outrank
                    them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-foreground text-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Ready to Scale Your Rankings?</h2>
              <p className="text-lg text-background/70 mb-8">
                Book a free strategy call to discuss your goals and get a custom link building plan tailored to your
                business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" asChild>
                  <Link href="/contact">Book a Call</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-background/30 text-background hover:bg-background/10 bg-transparent"
                  asChild
                >
                  <Link href="/contact">Request a Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
