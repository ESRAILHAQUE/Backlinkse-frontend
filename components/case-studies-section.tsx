import { ArrowUpRight, TrendingUp, Target, Globe } from "lucide-react"
import Link from "next/link"

const caseStudies = [
  {
    industry: "E-Commerce",
    title: "Fashion Retailer",
    description:
      "Helped an online fashion brand break into top 3 rankings for competitive keywords, driving a 420% increase in organic revenue.",
    metrics: [
      { label: "Organic Traffic", value: "+420%", icon: TrendingUp },
      { label: "Keywords Top 10", value: "156", icon: Target },
      { label: "Backlinks Built", value: "89", icon: Globe },
    ],
    result: "From page 3 to position 1 for main category keywords",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    industry: "SaaS",
    title: "Project Management Tool",
    description:
      "Built authority for a B2B SaaS platform competing against industry giants, achieving first-page rankings for high-intent keywords.",
    metrics: [
      { label: "Domain Rating", value: "+28", icon: TrendingUp },
      { label: "Organic Leads", value: "+312%", icon: Target },
      { label: "Referring Domains", value: "134", icon: Globe },
    ],
    result: "Outranking established competitors within 8 months",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    industry: "Healthcare",
    title: "Telehealth Platform",
    description:
      "Navigated YMYL challenges to build trust and authority for a healthcare startup in a highly competitive, regulated market.",
    metrics: [
      { label: "Organic Sessions", value: "+285%", icon: TrendingUp },
      { label: "Featured Snippets", value: "23", icon: Target },
      { label: "DR Increase", value: "+35", icon: Globe },
    ],
    result: "Established thought leadership in telehealth space",
    color: "bg-rose-500/10 text-rose-600",
  },
  {
    industry: "Finance",
    title: "Investment Advisory",
    description:
      "Built credibility and search presence for a financial services firm in one of the most competitive SEO verticals.",
    metrics: [
      { label: "Qualified Leads", value: "+180%", icon: TrendingUp },
      { label: "Page 1 Rankings", value: "67", icon: Target },
      { label: "High DR Links", value: "112", icon: Globe },
    ],
    result: "Dominant rankings for wealth management keywords",
    color: "bg-amber-500/10 text-amber-600",
  },
]

export function CaseStudiesSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              Proven Results
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Results We Have Delivered to Our Clients
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Real outcomes from real campaigns. See how our data-driven link building strategies have transformed our
              clients search visibility.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            Get similar results
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {caseStudies.map((study) => (
            <div
              key={study.title}
              className="group rounded-2xl border border-border bg-background p-8 transition-all hover:border-accent hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${study.color}`}>
                  {study.industry}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold">{study.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{study.description}</p>

              <div className="mt-6 grid grid-cols-3 gap-4">
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-secondary/50 p-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium">{study.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center">
          <h3 className="text-2xl font-bold">Ready to See Results Like These?</h3>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Join 200+ businesses that have transformed their organic growth with our proven link building strategies.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-accent px-8 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Start Your Campaign Today
          </Link>
        </div>
      </div>
    </section>
  )
}
