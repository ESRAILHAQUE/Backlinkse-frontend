import { Search, Users, Mail, FileText, Link2, BarChart3 } from "lucide-react"

const processSteps = [
  {
    icon: Search,
    step: "01",
    title: "Research",
    description: "Deep-dive analysis of your niche, competitors, and backlink profile to identify opportunities.",
  },
  {
    icon: Users,
    step: "02",
    title: "Prospecting",
    description: "Manual identification of high-authority, relevant websites using 20+ quality metrics.",
  },
  {
    icon: Mail,
    step: "03",
    title: "Outreach",
    description: "Personalized, relationship-focused emails to website owners—no templates, no spam.",
  },
  {
    icon: FileText,
    step: "04",
    title: "Content Creation",
    description: "High-quality content that provides value and naturally incorporates your links.",
  },
  {
    icon: Link2,
    step: "05",
    title: "Link Placement",
    description: "Contextual placements within relevant content on DR 50+ websites.",
  },
  {
    icon: BarChart3,
    step: "06",
    title: "Reporting",
    description: "Transparent reports with full link details and ongoing optimization.",
  },
]

export function ProcessSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Our Data-Driven, <span className="text-primary">Result-Oriented</span> Process
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Every campaign follows our proven 6-step methodology, refined over years of building thousands of
            high-quality backlinks.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((item) => (
            <div
              key={item.title}
              className="relative rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="text-4xl font-bold text-muted-foreground/20">{item.step}</span>
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
