import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Users, Target, Shield, Award } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "100% White-Hat",
    description: "We only use ethical, Google-compliant link building strategies that protect your site long-term.",
  },
  {
    icon: Target,
    title: "Results-Focused",
    description: "Every link we build is designed to move the needle on your rankings and organic traffic.",
  },
  {
    icon: Users,
    title: "Client Partnership",
    description: "We work as an extension of your team, with transparent communication and shared goals.",
  },
  {
    icon: Award,
    title: "Quality First",
    description: "We never sacrifice quality for quantity. Every placement meets our strict editorial standards.",
  },
]

const team = [
  { name: "Sarah Chen", role: "Head of SEO", bio: "12+ years in SEO, previously at major digital agencies." },
  { name: "Michael Torres", role: "Link Building Manager", bio: "Specializes in outreach and relationship building." },
  { name: "Emily Rodriguez", role: "Content Strategist", bio: "Expert in creating link-worthy content that converts." },
  { name: "David Park", role: "SEO Specialist", bio: "Technical SEO expert with enterprise-level experience." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-primary py-24 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                We Build Links That Build Businesses
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Backlinkse is a premium link building agency dedicated to helping businesses grow through strategic,
                white-hat SEO.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Our Story</h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Backlinkse was founded with a simple mission: to provide link building services that actually work
                    and don't put your website at risk.
                  </p>
                  <p>
                    After years of working at SEO agencies and seeing the damage that low-quality link building can
                    cause, our founders set out to build something different—an agency focused on quality, transparency,
                    and real results.
                  </p>
                  <p>
                    Today, we've helped hundreds of businesses across industries improve their search rankings and grow
                    their organic traffic through strategic, white-hat link building.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "500+", label: "Clients Served" },
                  { value: "2,500+", label: "Links Built" },
                  { value: "98%", label: "Client Retention" },
                  { value: "5+ Years", label: "In Business" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-secondary p-6 text-center">
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Values</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                The principles that guide everything we do.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-background border border-border">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet the Team</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                Experienced SEO professionals dedicated to your success.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="mx-auto h-24 w-24 rounded-full bg-secondary flex items-center justify-center text-2xl font-medium">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="mt-4 font-semibold">{member.name}</h3>
                  <div className="text-sm text-accent">{member.role}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
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
