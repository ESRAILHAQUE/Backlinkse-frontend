import { Settings, BarChart3, Link2, Monitor, Star, ShieldCheck, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Settings,
    title: "Data-Driven Process",
    description:
      "We use our proprietary tools to analyze data (20+ relevant-only metrics!), assess competitors, and develop link building strategies tailored to your unique needs, driving more effective and measurable SEO results.",
  },
  {
    icon: BarChart3,
    title: "Real SEO Metrics",
    description:
      "Our expert team relies on real website metrics to select high-quality link building prospects, develop a strong link profile, and provide a strategic advantage in SERPs.",
  },
  {
    icon: Link2,
    title: "Genuine & Exclusive Backlinks",
    description:
      "Only manual outreach is used to establish long-term partnerships with website owners and exclusive sites.",
  },
  {
    icon: Monitor,
    title: "Link Monitoring",
    description:
      "We've developed a tool for backlink monitoring to ensure the highest quality of backlinks and their long-lasting impact.",
  },
  {
    icon: Star,
    title: "Tailored Solutions",
    description:
      "Our link building agency provides customized campaigns tailored to your niche, your needs, and your budget.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Guarantees",
    description:
      "We provide warranty support for backlinks throughout the entire period of cooperation and clearly outline our guarantees in the contract.",
  },
  {
    icon: TrendingUp,
    title: "Unmatched Results",
    description:
      "Our data-driven link building strategies and campaigns boost your site's visibility and traffic, enabling you to outrank your competitors in SERP rankings.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left side - headline */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              We've Curated <span className="text-primary">20,000+ Connections</span> to Amplify Your Online Presence
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Using a data-driven approach with the strategies developed over the years, our agency delivers the most
              effective white-hat link building services, helping businesses achieve sustainable growth. Even an x20
              traffic growth is possible!
            </p>

            {/* Image placeholder */}
            <div className="mt-8 rounded-2xl bg-secondary/50 p-6">
              <img
                src="/seo-expert-reviewing-google-search-results-showing.jpg"
                alt="SEO expert reviewing search rankings"
                className="w-full rounded-xl"
              />
            </div>
          </div>

          {/* Right side - features list */}
          <div className="space-y-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
