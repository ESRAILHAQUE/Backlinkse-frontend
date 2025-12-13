import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Link2, FileText, Zap, Crown, PenTool } from "lucide-react"

const services = [
  {
    icon: Link2,
    title: "Link Building Packages",
    description:
      "Comprehensive monthly link building campaigns with manual outreach to high-authority websites in your niche. Our bread-and-butter service.",
    features: ["DR 40-70+ backlinks", "Manual outreach", "Anchor text optimization", "Monthly reporting"],
    href: "/services/link-building",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: FileText,
    title: "Guest Posting",
    description:
      "High-quality guest posts placed on authoritative blogs and publications with contextual backlinks to your site.",
    features: ["Niche-relevant sites", "Custom content creation", "Editorial placements", "Permanent do-follow links"],
    href: "/services/guest-posting",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Zap,
    title: "Link Insertions",
    description:
      "Get powerful backlinks from existing, indexed content on high-authority websites. Faster results at a lower cost.",
    features: ["Already-indexed pages", "Contextual relevance", "Quick turnaround", "Per-link pricing"],
    href: "/services/link-insertions",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: Crown,
    title: "Platinum Links",
    description: "Exclusive DR 70+ placements on major news outlets, industry publications, and top-tier media sites.",
    features: ["DR 70+ only", "Major publications", "Digital PR included", "Brand building"],
    href: "/services/platinum-links",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: PenTool,
    title: "SEO Blog Writing",
    description:
      "Expert-written, SEO-optimized blog content that drives organic traffic and establishes your brand as an authority.",
    features: ["Keyword-optimized", "Expert writers", "Fast turnaround", "Original research"],
    href: "/services/seo-blog-writing",
    color: "bg-rose-500/10 text-rose-600",
  },
]

export const metadata = {
  title: "Link Building Services | White-Hat SEO Solutions | Backlinkse",
  description:
    "Professional link building services including guest posting, niche edits, digital PR, and SEO content. 100% white-hat strategies. Trusted by 500+ companies. Get a free audit.",
  openGraph: {
    title: "Professional Link Building Services | Backlinkse",
    description: "White-hat link building that drives real results. Guest posts, niche edits, platinum links & more.",
    type: "website",
  },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: services.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Service",
                name: service.title,
                description: service.description,
                provider: {
                  "@type": "Organization",
                  name: "Backlinkse",
                },
                areaServed: "Worldwide",
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: service.title,
                  itemListElement: service.features.map((feature, idx) => ({
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: feature,
                    },
                  })),
                },
              },
            })),
          }),
        }}
      />

      <Header />
      <main>
        <section className="bg-gradient-to-b from-secondary/50 to-background py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Our Services
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                Professional <span className="text-primary">Link Building</span> & SEO Services
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                From comprehensive link building campaigns to targeted guest posting and premium placements, we offer a
                full suite of white-hat SEO services designed to grow your online authority and organic traffic.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group rounded-2xl border border-border bg-background p-8 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${service.color}`}>
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h2 className="mt-6 text-xl font-bold">{service.title}</h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{service.description}</p>
                  <ul className="mt-6 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                          <svg
                            className="h-3 w-3 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-8 w-full rounded-full bg-transparent" variant="outline" asChild>
                    <Link href={service.href} className="flex items-center justify-center gap-2">
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
