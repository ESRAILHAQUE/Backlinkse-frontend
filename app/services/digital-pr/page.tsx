import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Phone, Newspaper, Mic, Users, TrendingUp } from "lucide-react"

const services = [
  {
    icon: Newspaper,
    title: "Media Placements",
    description:
      "Get featured in major online publications, news sites, and industry blogs with editorial coverage and backlinks.",
  },
  {
    icon: Mic,
    title: "HARO Outreach",
    description:
      "Expert responses to journalist queries on Help A Reporter Out and similar platforms to earn media mentions.",
  },
  {
    icon: Users,
    title: "Influencer Outreach",
    description:
      "Connect with industry influencers and thought leaders for collaborative content and link opportunities.",
  },
  {
    icon: TrendingUp,
    title: "Brand Mentions",
    description: "Turn unlinked brand mentions into valuable backlinks and increase your brand's online presence.",
  },
]

export default function DigitalPRPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-primary py-24 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm">
                <span>Earn Media Coverage</span>
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl text-balance">Digital PR & Outreach</h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Build brand authority and earn high-quality backlinks through strategic digital PR campaigns, media
                outreach, and HARO responses.
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
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Digital PR Services</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                Multiple strategies to earn media coverage and build your brand's authority.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-2xl border border-border bg-background p-8 transition-all hover:border-accent/50"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary/50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                  Why Digital PR for Link Building?
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Digital PR combines brand building with SEO to earn the highest quality backlinks available—editorial
                  links from major publications that money can't buy through traditional outreach.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Links from DR 70+ news sites and publications",
                    "Brand exposure to new audiences",
                    "Referral traffic from high-authority sites",
                    "Social proof and credibility building",
                    "Long-term SEO benefits",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-background p-8">
                <h3 className="text-xl font-semibold">Monthly PR Package</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$4,500</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Minimum 3-month commitment</p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Dedicated PR strategist",
                    "Daily HARO monitoring & responses",
                    "Custom press releases",
                    "Media list development",
                    "Journalist relationship building",
                    "Monthly reporting & analysis",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-accent" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full" asChild>
                  <Link href="/contact">Request Proposal</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12 lg:p-16">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                  Ready to Get Media Coverage?
                </h2>
                <p className="mt-4 text-primary-foreground/80 leading-relaxed">
                  Let's discuss how digital PR can help grow your brand and build high-authority backlinks.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/contact" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Schedule a Call
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
