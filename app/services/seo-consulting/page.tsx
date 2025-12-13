import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Phone, ArrowRight, Target, Search, FileSearch, BarChart3 } from "lucide-react"

const services = [
  {
    icon: FileSearch,
    title: "Backlink Audit",
    description:
      "Comprehensive analysis of your current backlink profile to identify toxic links, opportunities, and gaps.",
    deliverables: ["Full backlink analysis", "Toxic link identification", "Disavow file creation", "Action plan"],
  },
  {
    icon: Target,
    title: "Competitor Analysis",
    description: "Deep dive into your competitors' backlink strategies to uncover their best link sources.",
    deliverables: [
      "Top 5 competitor analysis",
      "Link gap identification",
      "Opportunity mapping",
      "Priority target list",
    ],
  },
  {
    icon: Search,
    title: "Keyword Research",
    description:
      "Strategic keyword research focused on finding opportunities where link building can have the most impact.",
    deliverables: ["Keyword opportunity map", "Difficulty analysis", "Content gap report", "Target recommendations"],
  },
  {
    icon: BarChart3,
    title: "SEO Strategy",
    description: "Complete SEO roadmap tailored to your business goals, timeline, and resources.",
    deliverables: ["90-day action plan", "Priority recommendations", "Resource allocation", "KPI framework"],
  },
]

export default function SEOConsultingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-primary py-24 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm">
                <span>Expert Guidance</span>
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl text-balance">SEO Consulting</h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Strategic SEO guidance from experienced professionals. Get actionable insights, detailed audits, and
                clear roadmaps to improve your search visibility.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Book Consultation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Consulting Services</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                Expert analysis and strategic guidance to accelerate your SEO results.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {services.map((service) => (
                <div key={service.title} className="rounded-2xl border border-border bg-background p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{service.description}</p>
                  <div className="mt-6">
                    <div className="text-sm font-medium mb-3">What you'll get:</div>
                    <ul className="space-y-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-accent" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary/50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                  One-Time Audit or Ongoing Support
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Whether you need a comprehensive one-time audit or ongoing strategic support, we offer flexible
                  engagement options to match your needs.
                </p>
                <div className="mt-8 space-y-6">
                  <div className="rounded-xl border border-border bg-background p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">One-Time Audit</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Comprehensive analysis with actionable recommendations
                        </p>
                      </div>
                      <div className="text-2xl font-bold">$2,500</div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Monthly Retainer</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Ongoing strategic support and monthly consultations
                        </p>
                      </div>
                      <div className="text-2xl font-bold">$1,500/mo</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-background p-8">
                <h3 className="text-xl font-semibold">What's Included</h3>
                <ul className="mt-6 space-y-4">
                  {[
                    "Complete backlink profile audit",
                    "Competitor backlink analysis (top 5)",
                    "Keyword opportunity research",
                    "Technical SEO recommendations",
                    "Content strategy guidance",
                    "90-day action plan",
                    "1-hour strategy call",
                    "Email support for questions",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full" asChild>
                  <Link href="/contact" className="flex items-center gap-2">
                    Schedule Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12 lg:p-16">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Get Expert SEO Guidance</h2>
                <p className="mt-4 text-primary-foreground/80 leading-relaxed">
                  Book a free discovery call to discuss your SEO challenges and how we can help.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/contact" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Book Free Call
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
