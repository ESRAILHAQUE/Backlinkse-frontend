import { Shield, Clock, Users, Award, HeadphonesIcon, FileCheck } from "lucide-react"

const reasons = [
  {
    icon: Shield,
    title: "100% White-Hat Only",
    description:
      "We strictly follow search engine guidelines. No PBNs, no link farms, no shortcuts—just genuine, editorial backlinks that stand the test of time.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "Most agencies take months to deliver. We start building links within 7 days and deliver your first batch within 2-3 weeks of campaign kickoff.",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description:
      "You get a dedicated account manager and direct access to our link building specialists. No ticketing systems, no waiting—real people, real support.",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description:
      "Every link comes with a 12-month replacement guarantee. If a link drops within a year, we replace it at no additional cost.",
  },
  {
    icon: HeadphonesIcon,
    title: "Transparent Reporting",
    description:
      "Real-time dashboard access, monthly reports with full link details, and regular strategy calls. You always know exactly what you're getting.",
  },
  {
    icon: FileCheck,
    title: "Proven Track Record",
    description:
      "Over 15,000 links built for 500+ clients across 40+ industries. Our case studies speak for themselves with documented, verifiable results.",
  },
]

export function WhyChooseSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Why Backlinkse
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Why Choose Us for Your Link Building
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            We're not just another link building agency. Here's what sets us apart from the competition.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <reason.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">{reason.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
