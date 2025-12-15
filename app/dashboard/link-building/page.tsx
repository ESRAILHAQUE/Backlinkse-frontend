"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { createOrder } from "@/lib/orders"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const packages = [
  {
    name: "Starter",
    price: "$1,500",
    links: "5 links/month",
    features: ["DR 30-50 websites", "Natural anchor text", "Monthly reporting", "30-day replacement guarantee"],
    popular: false,
  },
  {
    name: "Growth",
    price: "$3,500",
    links: "12 links/month",
    features: [
      "DR 40-60 websites",
      "Custom anchor strategy",
      "Bi-weekly reporting",
      "60-day replacement guarantee",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Scale",
    price: "$7,000",
    links: "25 links/month",
    features: [
      "DR 50-70 websites",
      "Full SEO strategy",
      "Weekly reporting",
      "90-day replacement guarantee",
      "Dedicated account manager",
      "Content optimization",
    ],
    popular: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    links: "50+ links/month",
    features: [
      "DR 60+ websites",
      "White-label reporting",
      "Real-time dashboard",
      "Lifetime guarantee",
      "24/7 priority support",
      "Custom integrations",
    ],
    popular: false,
  },
]

export default function LinkBuildingPage() {
  const router = useRouter()

  const handleOrder = async (pkg: (typeof packages)[0]) => {
    if (pkg.price === "Custom") {
      router.push("/contact")
      return
    }
    const numeric = Number(pkg.price.replace(/[^0-9.]/g, ""))
    const linksTotal = parseInt(pkg.links, 10) || 1
    try {
      await createOrder({
        packageName: `${pkg.name} - Link Building`,
        packageType: "link-building",
        linksTotal: linksTotal,
        amount: numeric,
        currency: "USD",
      })
      toast.success("Order placed! Check your orders page.")
      router.push("/dashboard/orders")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to place order")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Link Building Packages</h1>
        <p className="text-muted-foreground">Choose a package that fits your growth goals.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {packages.map((pkg) => (
          <Card key={pkg.name} className={pkg.popular ? "border-primary ring-1 ring-primary" : ""}>
            {pkg.popular && (
              <div className="bg-primary text-primary-foreground text-center text-xs font-medium py-1">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{pkg.name}</CardTitle>
              <CardDescription>{pkg.links}</CardDescription>
              <div className="text-3xl font-bold">{pkg.price}</div>
              <span className="text-sm text-muted-foreground">/month</span>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${pkg.popular ? "" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
              >
                {pkg.price === "Custom" ? "Contact Sales" : "Order Now"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Need a Custom Solution?</CardTitle>
          <CardDescription>We can create a tailored link building strategy for your specific needs.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
