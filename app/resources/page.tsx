import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Download, ExternalLink, FileText, CheckCircle2, TrendingUp, Target } from "lucide-react"

export const metadata = {
  title: "Free SEO & Link Building Resources | Guides, Templates & Tools | Backlinkse",
  description:
    "Download free SEO resources: link building templates, outreach scripts, DR checker tools, competitor analysis guides. Actionable resources used by 500+ marketers.",
  openGraph: {
    title: "Free SEO & Link Building Resources | Backlinkse",
    description: "Free templates, guides & tools for link building success. Download now.",
    type: "website",
  },
}

const resources = [
  {
    title: "Link Building Outreach Email Templates",
    description:
      "50+ proven email templates for guest posting, niche edits, and broken link building. Includes follow-up sequences and personalization tips.",
    category: "Template",
    icon: FileText,
    downloadUrl: "#",
    format: "PDF",
  },
  {
    title: "Competitor Backlink Analysis Guide",
    description:
      "Step-by-step guide to analyzing competitor backlink profiles, finding link gaps, and replicating their best links.",
    category: "Guide",
    icon: Target,
    downloadUrl: "#",
    format: "PDF",
  },
  {
    title: "White-Hat Link Building Checklist",
    description:
      "Complete checklist covering 47 actionable link building tactics. From broken link building to digital PR campaigns.",
    category: "Checklist",
    icon: CheckCircle2,
    downloadUrl: "#",
    format: "PDF",
  },
  {
    title: "Domain Authority Calculator",
    description:
      "Free tool to check DR, DA, and backlink metrics for any domain. Compare against competitors instantly.",
    category: "Tool",
    icon: TrendingUp,
    downloadUrl: "#",
    format: "Online Tool",
  },
]

const guides = [
  {
    title: "The Ultimate Guide to Guest Posting in 2024",
    excerpt:
      "Everything you need to know about finding opportunities, pitching editors, and securing high-quality guest post placements.",
    readTime: "15 min read",
    href: "/blog/guest-posting-guide",
  },
  {
    title: "How to Evaluate Backlink Quality",
    excerpt:
      "Learn which metrics matter when assessing link opportunities. Go beyond DR and DA to find truly valuable links.",
    readTime: "10 min read",
    href: "/blog/evaluate-backlink-quality",
  },
  {
    title: "White-Hat Link Building Complete Guide",
    excerpt:
      "Master ethical link building strategies that comply with Google guidelines and deliver sustainable ranking improvements.",
    readTime: "12 min read",
    href: "/blog/white-hat-link-building-guide",
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Free Resources
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                SEO & Link Building <span className="text-primary">Resources</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Download free templates, guides, and tools to accelerate your link building success. Used by 500+
                marketers and SEO professionals.
              </p>
            </div>
          </div>
        </section>

        {/* Downloadable Resources */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12">Free Downloads</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {resources.map((resource) => (
                <div
                  key={resource.title}
                  className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <resource.icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">{resource.category}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{resource.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{resource.format}</span>
                    <Button size="sm" className="rounded-full" asChild>
                      <a href={resource.downloadUrl}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Free
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Educational Guides */}
        <section className="py-20 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12">Educational Guides</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {guides.map((guide) => (
                <Link
                  key={guide.title}
                  href={guide.href}
                  className="group rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <FileText className="h-4 w-4" />
                    <span>{guide.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{guide.excerpt}</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    Read Guide
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/blog">View All Blog Posts</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-primary p-8 sm:p-12 text-center text-primary-foreground">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Need Professional Link Building Help?</h2>
              <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                While these resources will help you get started, our team can handle the heavy lifting and deliver
                results faster.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="secondary" className="rounded-full px-8" asChild>
                  <Link href="/contact">Get a Free Audit</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                  asChild
                >
                  <Link href="/pricing">View Pricing</Link>
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
