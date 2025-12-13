import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Flame } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$1,500",
    period: "/month",
    description: "Perfect for small businesses starting their SEO journey",
    features: [
      "5 high-authority backlinks",
      "DR 40+ websites",
      "Manual outreach only",
      "Monthly reporting",
      "Anchor text optimization",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$3,500",
    period: "/month",
    description: "Ideal for growing businesses ready to scale their SEO",
    features: [
      "15 high-authority backlinks",
      "DR 50+ websites",
      "Manual outreach only",
      "Bi-weekly reporting",
      "Competitor analysis",
      "Anchor text strategy",
      "Priority support",
      "Dashboard access",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "$6,500",
    period: "/month",
    description: "For established brands with aggressive growth goals",
    features: [
      "25+ high-authority backlinks",
      "DR 60+ websites",
      "Dedicated account manager",
      "Weekly reporting & calls",
      "Full competitor analysis",
      "Content creation included",
      "Digital PR outreach",
      "Custom dashboard",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Custom",
    price: "Custom",
    period: "",
    description: "Tailored solutions for unique requirements",
    features: [
      "Unlimited backlinks",
      "Custom DR requirements",
      "Dedicated team",
      "Custom reporting",
      "Full-service SEO",
      "Priority everything",
      "SLA guarantee",
      "White-label options",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-24 bg-background" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Our Link Building <span className="text-primary">Pricing</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Transparent pricing with no hidden fees. All packages include 100% manual outreach and white-hat link
            building strategies.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border ${
                plan.highlighted
                  ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
                  : "border-border bg-background"
              } p-6 transition-all hover:shadow-md`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 right-4 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  <Flame className="h-3 w-3" />
                  Popular
                </div>
              )}
              <div>
                <h3 className={`text-lg font-semibold ${plan.highlighted ? "text-primary" : ""}`}>{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`mt-6 w-full rounded-full ${plan.highlighted ? "" : "bg-foreground text-background hover:bg-foreground/90"}`}
                variant={plan.highlighted ? "default" : "default"}
                asChild
              >
                <Link href={plan.name === "Custom" ? "/contact" : "/contact"}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
