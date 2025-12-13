import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Zap } from "lucide-react"

const currentPlan = {
  name: "Growth",
  price: "$3,500",
  billingCycle: "Monthly",
  nextBilling: "Jan 1, 2025",
  features: ["12 links/month", "DR 40-60 websites", "Bi-weekly reporting", "Priority support"],
}

const availablePlans = [
  { name: "Starter", price: "$1,500", links: "5 links/month" },
  { name: "Growth", price: "$3,500", links: "12 links/month", current: true },
  { name: "Scale", price: "$7,000", links: "25 links/month" },
  { name: "Enterprise", price: "Custom", links: "50+ links/month" },
]

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <p className="text-muted-foreground">Manage your subscription plan and billing cycle.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Current Plan
                <Badge>Active</Badge>
              </CardTitle>
              <CardDescription>Your active subscription</CardDescription>
            </div>
            <Zap className="h-8 w-8 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold">{currentPlan.name} Plan</h3>
              <p className="text-muted-foreground">
                {currentPlan.price}/month • Next billing: {currentPlan.nextBilling}
              </p>
              <ul className="mt-4 space-y-2">
                {currentPlan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline">Change Plan</Button>
              <Button variant="ghost" className="text-destructive hover:text-destructive">
                Cancel Subscription
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>Upgrade or downgrade your subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {availablePlans.map((plan) => (
              <div
                key={plan.name}
                className={`p-4 rounded-lg border ${plan.current ? "border-primary bg-primary/5" : "border-border"}`}
              >
                <h4 className="font-semibold">{plan.name}</h4>
                <p className="text-2xl font-bold mt-1">{plan.price}</p>
                <p className="text-sm text-muted-foreground">{plan.links}</p>
                {plan.current ? (
                  <Badge className="mt-4" variant="secondary">
                    Current Plan
                  </Badge>
                ) : (
                  <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">
                    {plan.price === "Custom" ? "Contact Sales" : "Switch"}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your recent invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "Dec 1, 2024", amount: "$3,500", status: "Paid" },
              { date: "Nov 1, 2024", amount: "$3,500", status: "Paid" },
              { date: "Oct 1, 2024", amount: "$3,500", status: "Paid" },
            ].map((invoice) => (
              <div
                key={invoice.date}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium">{invoice.date}</p>
                  <p className="text-sm text-muted-foreground">Growth Plan - Monthly</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">{invoice.amount}</span>
                  <Badge variant="secondary">{invoice.status}</Badge>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
