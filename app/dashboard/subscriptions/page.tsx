"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Zap } from "lucide-react"
import { getCurrentSubscription, cancelSubscription, Subscription } from "@/lib/subscriptions"

export default function SubscriptionsPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      setLoading(true)
      const data = await getCurrentSubscription()
      setSubscription(data)
    } catch (error) {
      console.error("Failed to fetch subscription:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async () => {
    if (!subscription) return
    if (!confirm("Are you sure you want to cancel your subscription?")) return

    try {
      await cancelSubscription(subscription._id)
      await fetchSubscription()
    } catch (error) {
      console.error("Failed to cancel subscription:", error)
      alert("Failed to cancel subscription")
    }
  }

  const availablePlans = [
    { name: "Starter", price: "$1,500", links: "5 links/month" },
    { name: "Growth", price: "$3,500", links: "12 links/month", current: subscription?.planName === "Growth" },
    { name: "Scale", price: "$7,000", links: "25 links/month" },
    { name: "Enterprise", price: "Custom", links: "50+ links/month" },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <p className="text-muted-foreground">Manage your subscription plan and billing cycle.</p>
      </div>

      {subscription && (
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
                <h3 className="text-2xl font-bold">{subscription.planName} Plan</h3>
                <p className="text-muted-foreground">
                  ${subscription.price}/{subscription.billingCycle.toLowerCase()} • Next billing:{" "}
                  {new Date(subscription.nextBillingDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline">Change Plan</Button>
                <Button variant="ghost" className="text-destructive hover:text-destructive" onClick={handleCancel}>
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!subscription && (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No active subscription found
          </CardContent>
        </Card>
      )}

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
    </div>
  )
}
