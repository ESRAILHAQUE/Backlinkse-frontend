import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Phone, ArrowRight } from "lucide-react"

const packages = [
  {
    name: "Starter",
    price: "$1,500",
    links: "5 links/month",
    authority: "DR 40+",
    features: [
      "5 high-authority backlinks",
      "DR 40+ websites only",
      "100% manual outreach",
      "Niche-relevant placements",
      "Natural anchor text",
      "Monthly progress report",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "$3,500",
    links: "15 links/month",
    authority: "DR 50+",
    popular: true,
    features: [
      "15 high-authority backlinks",
      "DR 50+ websites only",
      "100% manual outreach",
      "Competitor backlink analysis",
      "Strategic anchor text plan",
      "Bi-weekly reporting",
      "Dashboard access",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    links: "25+ links/month",
    authority: "DR 60+",
    features: [
      "25+ high-authority backlinks",
      "DR 60+ premium websites",
      "Dedicated account manager",
      "Full competitor analysis",
      "Custom content creation",
      "Weekly calls & reporting",
      "Custom dashboard",
      "Phone & Slack support",
    ],
  },
]

const process = [
  {
    step: "01",
    title: "Discovery & Analysis",
    description:
      "We analyze your current backlink profile, identify competitors' best links, and map out opportunities in your niche.",
  },
  {
    step: "02",
    title: "Strategy Development",
    description:
      "Based on our analysis, we create a custom link building strategy targeting the most valuable opportunities for your site.",
  },
  {
    step: "03",
    title: "Manual Outreach",
    description:
      "Our team personally reaches out to website owners and editors with tailored pitches to secure editorial placements.",
  },
  {
    step: "04",
    title: "Link Placement",
    description: "Links are placed within relevant, high-quality content on authoritative websites in your industry.",
  },
  {
    step: "05",
    title: "Reporting & Optimization",
    description:
      "You receive detailed reports on all placements with metrics. We continuously refine our approach based on results.",
  },
]

export default function LinkBuildingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-primary py-24 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm">
                  <span>Our Flagship Service</span>
                </div>
                <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                  Link Building Packages
                </h1>
                <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                  Comprehensive monthly link building campaigns designed to systematically increase your domain
                  authority and search rankings through high-quality backlinks.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="#packages" className="flex items-center gap-2">
                      View Packages
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent"
                    asChild
                  >
                    <Link href="/contact" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Book a Call
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "2,500+", label: "Links Built" },
                  { value: "DR 50+", label: "Avg. Authority" },
                  { value: "98%", label: "Client Retention" },
                  { value: "0%", label: "Spam Links" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-primary-foreground/10 p-6">
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="mt-1 text-sm text-primary-foreground/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Process</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                A proven methodology for building high-quality backlinks that deliver lasting results.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
              {process.map((item) => (
                <div key={item.step} className="relative">
                  <div className="text-5xl font-bold text-secondary">{item.step}</div>
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary/50 py-24" id="packages">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Choose Your Package</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                All packages include 100% manual outreach, white-hat strategies, and transparent reporting.
              </p>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`relative rounded-2xl border ${
                    pkg.popular ? "border-accent bg-background shadow-lg" : "border-border bg-background"
                  } p-8`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-accent-foreground">
                      Most Popular
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{pkg.name}</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{pkg.price}</span>
                      {pkg.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                    </div>
                    <div className="mt-4 flex gap-4 text-sm">
                      <span className="rounded-full bg-secondary px-3 py-1">{pkg.links}</span>
                      <span className="rounded-full bg-secondary px-3 py-1">{pkg.authority}</span>
                    </div>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 shrink-0 text-accent" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="mt-8 w-full" variant={pkg.popular ? "default" : "outline"} asChild>
                    <Link href={pkg.name === "Enterprise" ? "/contact" : "/dashboard"}>
                      {pkg.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12 lg:p-16">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                  Ready to Build Your Backlink Profile?
                </h2>
                <p className="mt-4 text-primary-foreground/80 leading-relaxed">
                  Schedule a free consultation to discuss your SEO goals and find the right package for your business.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/contact" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Book a Free Call
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
