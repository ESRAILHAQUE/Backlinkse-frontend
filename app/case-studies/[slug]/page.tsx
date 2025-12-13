import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, TrendingUp, Calendar, Link2, ArrowUpRight, Quote } from "lucide-react"
import { caseStudies } from "@/lib/case-studies-data"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = caseStudies.find((s) => s.slug === slug)
  if (!study) return { title: "Case Study Not Found" }

  return {
    title: `${study.client} Case Study | Backlinkse`,
    description: study.overview.slice(0, 160),
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = caseStudies.find((s) => s.slug === slug)

  if (!study) {
    notFound()
  }

  const relatedStudies = caseStudies.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-[#f8f8f6] py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Case Studies
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{study.logo}</span>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {study.industry}
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{study.client}</h1>

            <p className="mt-4 text-lg text-muted-foreground">{study.duration} campaign</p>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="border-b border-border py-8">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-xl bg-emerald-50">
                <div className="flex items-center justify-center gap-2 text-emerald-600 mb-2">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold text-foreground">{study.trafficIncrease}</div>
                <div className="text-sm text-muted-foreground">Traffic Growth</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-blue-50">
                <div className="text-2xl font-bold text-foreground">{study.linksBuilt}</div>
                <div className="text-sm text-muted-foreground">Links Built</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-purple-50">
                <div className="text-2xl font-bold text-foreground">+{study.drAfter - study.drBefore}</div>
                <div className="text-sm text-muted-foreground">DR Increase</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-amber-50">
                <div className="text-2xl font-bold text-foreground">{study.keywordsTop10.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Keywords Top 10</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="aspect-video rounded-2xl bg-muted overflow-hidden">
              <img
                src={study.featuredImage || "/placeholder.svg"}
                alt={`${study.client} analytics dashboard`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{study.overview}</p>
          </div>
        </section>

        {/* Challenges */}
        <section className="py-12 bg-muted/30">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">The Challenges</h2>
            <ul className="space-y-4">
              {study.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground leading-relaxed">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Strategy */}
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">Our Strategy</h2>
            <ul className="space-y-4">
              {study.strategy.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    ✓
                  </span>
                  <span className="text-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Execution */}
        <section className="py-12 bg-muted/30">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">Execution Timeline</h2>
            <div className="space-y-6">
              {study.execution.map((phase, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    {index < study.execution.length - 1 && <div className="w-0.5 h-full bg-border mt-2" />}
                  </div>
                  <div className="pb-6">
                    <p className="text-muted-foreground leading-relaxed">{phase}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-center">Results Achieved</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {study.results.map((result, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="text-sm font-medium text-muted-foreground mb-4">{result.label}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">Before</div>
                      <div className="text-xl font-semibold">{result.before}</div>
                    </div>
                    <ArrowUpRight className="h-6 w-6 text-primary" />
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">After</div>
                      <div className="text-xl font-semibold text-primary">{result.after}</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                      {result.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before/After Screenshots Placeholder */}
        <section className="py-12 bg-muted/30">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-center">Ranking Improvements</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="text-sm font-medium text-muted-foreground mb-4">Before Campaign</div>
                <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                  <img
                    src="/google-search-results-page-3-ranking.jpg"
                    alt="Rankings before campaign"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Average position: Page 3-5 for target keywords</p>
              </div>
              <div className="rounded-2xl border border-primary/50 bg-background p-6">
                <div className="text-sm font-medium text-primary mb-4">After Campaign</div>
                <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                  <img
                    src="/google-search-results-page-1-top-ranking.jpg"
                    alt="Rankings after campaign"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Average position: Page 1, positions 1-5 for target keywords
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        {study.testimonial && (
          <section className="py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="rounded-2xl bg-foreground text-background p-8 md:p-12">
                <Quote className="h-10 w-10 text-primary mb-6" />
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                  &ldquo;{study.testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                    {study.logo}
                  </div>
                  <div>
                    <div className="font-semibold">{study.testimonial.author}</div>
                    <div className="text-background/70 text-sm">{study.testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Achieve Similar Results?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Let&apos;s discuss how our proven link building strategies can help grow your organic traffic and
              rankings.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book a Strategy Call
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent" asChild>
                <Link href="/dashboard">
                  <Link2 className="mr-2 h-4 w-4" />
                  Access Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Related Case Studies */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">More Case Studies</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedStudies.map((related) => (
                <Link
                  key={related.slug}
                  href={`/case-studies/${related.slug}`}
                  className="group rounded-2xl border border-border p-6 hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{related.logo}</span>
                    <span className="text-sm text-muted-foreground">{related.industry}</span>
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{related.client}</h3>
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-emerald-600">
                      <TrendingUp className="h-4 w-4" />
                      {related.trafficIncrease}
                    </div>
                    <div className="text-muted-foreground">{related.linksBuilt} links</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
