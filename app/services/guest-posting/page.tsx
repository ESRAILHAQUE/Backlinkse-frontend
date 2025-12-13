import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Phone, ArrowRight, FileText, Globe, Shield, BarChart } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Professional Content",
    description: "Every guest post is written by experienced writers who understand your industry and target audience.",
  },
  {
    icon: Globe,
    title: "Niche-Relevant Sites",
    description:
      "We only place content on websites that are topically relevant to your business for maximum SEO value.",
  },
  {
    icon: Shield,
    title: "Editorial Placements",
    description: "All placements are genuine editorial links within high-quality content, never paid link insertions.",
  },
  {
    icon: BarChart,
    title: "Authority Metrics",
    description: "We target sites with strong domain metrics (DR 40+) and real organic traffic.",
  },
]

const packages = [
  {
    name: "Basic",
    price: "$350",
    description: "Per placement",
    features: ["DR 40+ website", "500+ word article", "1 do-follow link", "Niche-relevant site", "Permanent placement"],
  },
  {
    name: "Premium",
    price: "$650",
    description: "Per placement",
    popular: true,
    features: [
      "DR 50+ website",
      "800+ word article",
      "2 do-follow links",
      "Tier 1 niche sites",
      "Permanent placement",
      "Social sharing",
    ],
  },
  {
    name: "Authority",
    price: "$1,200",
    description: "Per placement",
    features: [
      "DR 60+ website",
      "1,200+ word article",
      "3 do-follow links",
      "Industry publications",
      "Permanent placement",
      "Social sharing",
      "Author bio",
    ],
  },
]

export default function GuestPostingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-primary py-24 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm">
                <span>High-Quality Placements</span>
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                Guest Posting Services
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Get your content published on high-authority websites in your niche. Build backlinks, establish thought
                leadership, and drive referral traffic.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
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
                    Request Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Our Guest Posting?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                We handle everything from content creation to outreach and placement.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary/50 py-24" id="packages">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Guest Post Packages</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                Choose the authority level that matches your goals. All placements include custom content.
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
                      Best Value
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">{pkg.name}</h3>
                    <div className="mt-4 flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">{pkg.price}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{pkg.description}</p>
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
                    <Link href="/contact">Order Now</Link>
                  </Button>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Need bulk orders? Contact us for volume discounts on 10+ placements.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12 lg:p-16">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                  Get Published on Top Sites
                </h2>
                <p className="mt-4 text-primary-foreground/80 leading-relaxed">
                  Let us handle the outreach, content creation, and placement. You just watch your authority grow.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/contact" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Get Started
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
