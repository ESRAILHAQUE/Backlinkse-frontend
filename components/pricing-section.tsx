import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Flame } from "lucide-react"

type PricingPlan = {
  _id?: string
  name: string
  price: number
  linksPerMonth?: string
  features: string[]
  popular: boolean
  enabled: boolean
  buttonText: string
  buttonLink: string
}

const fallbackPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: 1500,
    linksPerMonth: "5",
    features: ["5 high-authority backlinks", "Monthly reporting", "Email support"],
    popular: false,
    enabled: true,
    buttonText: "Get Started",
    buttonLink: "/contact",
  },
  {
    name: "Pro",
    price: 3500,
    linksPerMonth: "15",
    features: ["15 high-authority backlinks", "Bi-weekly reporting", "Priority support"],
    popular: true,
    enabled: true,
    buttonText: "Get Started",
    buttonLink: "/contact",
  },
]

async function fetchPricing(): Promise<PricingPlan[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5004/api/v1"
  try {
    const res = await fetch(`${baseUrl}/pricing`, { next: { revalidate: 300 } })
    if (!res.ok) throw new Error("Failed to load pricing")
    const data = await res.json()
    return data?.data?.plans || fallbackPlans
  } catch {
    return fallbackPlans
  }
}

export async function PricingSection() {
  const plans = await fetchPricing()
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
              className={`relative rounded-2xl border ${plan.popular
                ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
                : "border-border bg-background"
                } p-6 transition-all hover:shadow-md`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-4 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  <Flame className="h-3 w-3" />
                  Popular
                </div>
              )}
              <div>
                <h3 className={`text-lg font-semibold ${plan.popular ? "text-primary" : ""}`}>{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">
                    {plan.price === 0 ? "Custom" : `$${plan.price.toLocaleString()}`}
                  </span>
                  <span className="text-muted-foreground text-sm">{plan.linksPerMonth ? "/month" : ""}</span>
                </div>
                {plan.linksPerMonth && (
                  <p className="mt-2 text-sm text-muted-foreground">{plan.linksPerMonth} links per month</p>
                )}
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className={`mt-6 w-full rounded-full ${plan.popular ? "" : "bg-foreground text-background hover:bg-foreground/90"}`} asChild>
                <Link href={plan.buttonLink || "/contact"}>{plan.buttonText || "Get Started"}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
