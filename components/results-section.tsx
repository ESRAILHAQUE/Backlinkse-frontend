import { TrendingUp, Users, Globe, Award } from "lucide-react"

const results = [
  {
    icon: TrendingUp,
    metric: "312%",
    label: "Average Traffic Increase",
    description: "Our clients see significant organic traffic growth within 6 months",
  },
  {
    icon: Users,
    metric: "45+",
    label: "Keywords in Top 10",
    description: "Average number of keywords ranking on page one after our campaigns",
  },
  {
    icon: Globe,
    metric: "89",
    label: "Countries Served",
    description: "We build links for businesses across multiple industries worldwide",
  },
  {
    icon: Award,
    metric: "4.9/5",
    label: "Client Satisfaction",
    description: "Based on 200+ verified client reviews and testimonials",
  },
]

export function ResultsSection() {
  return (
    <section className="bg-secondary/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">We Get Results That Matter</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our white-hat link building strategies have helped hundreds of businesses improve their search rankings,
              increase organic traffic, and grow their online authority.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "Manual outreach to real websites",
                "Contextual links within relevant content",
                "No PBNs, no spam, no shortcuts",
                "Detailed reporting and transparency",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent">
                    <svg
                      className="h-3.5 w-3.5 text-accent-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {results.map((result) => (
              <div key={result.label} className="rounded-2xl border border-border bg-background p-6">
                <result.icon className="h-8 w-8 text-accent" />
                <div className="mt-4 text-3xl font-bold">{result.metric}</div>
                <div className="mt-1 font-medium">{result.label}</div>
                <p className="mt-2 text-sm text-muted-foreground">{result.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
