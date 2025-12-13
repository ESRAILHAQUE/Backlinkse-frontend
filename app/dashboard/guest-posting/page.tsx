import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, FileText, Globe, Zap } from "lucide-react"

const guestPostPackages = [
  {
    name: "Basic",
    price: "$299",
    description: "Per post placement",
    features: [
      "DR 30-40 websites",
      "500+ word article",
      "1 dofollow link",
      "Industry relevant sites",
      "Published within 14 days",
    ],
    icon: FileText,
  },
  {
    name: "Premium",
    price: "$599",
    description: "Per post placement",
    features: [
      "DR 50-60 websites",
      "1000+ word article",
      "2 dofollow links",
      "High-traffic sites",
      "Published within 7 days",
      "Social media promotion",
    ],
    icon: Globe,
  },
  {
    name: "Authority",
    price: "$999",
    description: "Per post placement",
    features: [
      "DR 70+ websites",
      "1500+ word article",
      "3 dofollow links",
      "Top-tier publications",
      "Published within 5 days",
      "Guaranteed indexing",
      "Press release distribution",
    ],
    icon: Zap,
  },
]

export default function GuestPostingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Guest Posting Services</h1>
        <p className="text-muted-foreground">Get published on high-authority websites in your niche.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {guestPostPackages.map((pkg) => (
          <Card key={pkg.name}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <pkg.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </div>
              </div>
              <div className="pt-4">
                <span className="text-3xl font-bold">{pkg.price}</span>
              </div>
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
              <Button className="w-full">Order Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bulk Discounts Available</CardTitle>
          <CardDescription>Order 5+ guest posts and save up to 20% on your order.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">View Bulk Pricing</Button>
        </CardContent>
      </Card>
    </div>
  )
}
