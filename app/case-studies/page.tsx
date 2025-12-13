import Link from "next/link"
import { ArrowUpRight, TrendingUp, Link2, Calendar } from "lucide-react"
import { caseStudies } from "@/lib/case-studies-data"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Link Building Case Studies | Proven Results & Success Stories | Backlinkse",
  description:
    "Explore detailed case studies showing 300%+ traffic increases through strategic link building. Real results from real campaigns. See rankings, traffic growth & ROI data.",
  openGraph: {
    title: "Link Building Case Studies | Proven Results | Backlinkse",
    description: "Explore detailed case studies showing 300%+ traffic increases through strategic link building.",
    type: "website",
  },
}

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: caseStudies.map((study, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Review",
                itemReviewed: {
                  "@type": "Service",
                  name: "Link Building Services",
                  provider: {
                    "@type": "Organization",
                    name: "Backlinkse",
                  },
                },
                author: {
                  "@type": "Organization",
                  name: study.client,
                },
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                  bestRating: "5",
                },
                reviewBody: `Achieved ${study.trafficIncrease} traffic increase and built ${study.linksBuilt} high-quality backlinks in ${study.duration}.`,
              },
            })),
          }),
        }}
      />

      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-[#f8f8f6] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Backlinkse{" "}
              <span className="inline-block rounded-lg bg-emerald-400 px-3 py-1 text-foreground">Case Studies</span> & Link Building Results
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              See real client results: SEO traffic growth, domain authority boosts, and backlink success stories with verified screenshots.
            </p>
          </div>
        </section>

        {/* Case Studies Table */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            {/* Table Header */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 pb-4 border-b border-border text-sm text-muted-foreground font-medium">
              <div className="col-span-4">Client</div>
              <div className="col-span-3">Traffic Increase</div>
              <div className="col-span-3">Time Span</div>
              <div className="col-span-2 text-right">Links Built</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-border">
              {caseStudies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-4 py-5 items-center hover:bg-muted/50 -mx-4 px-4 rounded-lg transition-colors"
                >
                  {/* Client */}
                  <div className="md:col-span-4 flex items-center gap-4">
                    <span className="text-2xl">{study.logo}</span>
                    <div>
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {study.client}
                      </div>
                      <div className="text-sm text-muted-foreground md:hidden">{study.industry}</div>
                    </div>
                  </div>

                  {/* Traffic Increase */}
                  <div className="md:col-span-3 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <TrendingUp className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">{study.trafficIncrease}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        {study.trafficBefore} → {study.trafficAfter}
                      </span>
                    </div>
                  </div>

                  {/* Time Span */}
                  <div className="md:col-span-3 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Calendar className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-medium text-foreground">{study.duration}</span>
                  </div>

                  {/* Links Built */}
                  <div className="md:col-span-2 flex items-center justify-end gap-2">
                    <span className="inline-flex items-center justify-center rounded-md bg-foreground px-3 py-1.5 text-sm font-semibold text-background">
                      {study.linksBuilt}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Summary */}
        <section className="bg-foreground text-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold">4,200+</div>
                <div className="mt-2 text-background/70">Links Built</div>
              </div>
              <div>
                <div className="text-4xl font-bold">850%</div>
                <div className="mt-2 text-background/70">Avg Traffic Growth</div>
              </div>
              <div>
                <div className="text-4xl font-bold">200+</div>
                <div className="mt-2 text-background/70">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold">98%</div>
                <div className="mt-2 text-background/70">Retention Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Become Our Next Success Story?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Book a strategy call to discuss how we can help you achieve similar results for your website.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book a Call
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent" asChild>
                <Link href="/dashboard">
                  <Link2 className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
