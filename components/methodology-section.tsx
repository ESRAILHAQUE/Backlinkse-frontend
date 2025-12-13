import { Search, Mail, Link2, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Strategy",
    description:
      "We analyze your niche, competitors, and existing backlink profile to create a custom outreach strategy.",
  },
  {
    icon: Mail,
    title: "Outreach",
    description:
      "Manual, personalized outreach to high-authority websites in your industry for genuine editorial placements.",
  },
  {
    icon: Link2,
    title: "Backlinks",
    description: "Quality links from DR 50+ sites with relevant anchor text and contextual placement within content.",
  },
  {
    icon: TrendingUp,
    title: "Results",
    description: "Track your progress with our real-time dashboard. See rankings improve and organic traffic grow.",
  },
]

export function MethodologySection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            The Link Building Agency That Gets Results
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Our proven methodology combines strategic planning with manual outreach to deliver high-quality backlinks
            that move the needle on your SEO.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-12 hidden h-px w-[calc(100%-3rem)] bg-border lg:block" />
              )}
              <div className="flex flex-col items-start">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent">Step {index + 1}</div>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
