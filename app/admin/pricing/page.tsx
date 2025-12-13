"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, Trash2, Check } from "lucide-react"

const pricingPlans = [
  {
    id: "startup",
    name: "Startup",
    price: 1500,
    linksPerMonth: "5-8",
    popular: false,
    enabled: true,
    features: ["5-8 high-quality links/month", "DR 30-50 websites", "Monthly reporting", "Email support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 3000,
    linksPerMonth: "10-15",
    popular: true,
    enabled: true,
    features: [
      "10-15 high-quality links/month",
      "DR 40-60 websites",
      "Bi-weekly reporting",
      "Priority support",
      "Dedicated account manager",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: 5000,
    linksPerMonth: "20-25",
    popular: false,
    enabled: true,
    features: [
      "20-25 high-quality links/month",
      "DR 50-70 websites",
      "Weekly reporting",
      "24/7 support",
      "Dedicated team",
      "Custom strategy",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 10000,
    linksPerMonth: "50+",
    popular: false,
    enabled: true,
    features: [
      "50+ high-quality links/month",
      "DR 60+ websites",
      "Real-time dashboard",
      "Dedicated team",
      "Custom everything",
      "SLA guarantee",
    ],
  },
]

export default function PricingManagerPage() {
  const [plans, setPlans] = useState(pricingPlans)
  const [activePlan, setActivePlan] = useState<string | null>("pro")
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 1000)
  }

  const togglePlan = (id: string) => {
    setPlans((prev) => prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)))
  }

  const setPopular = (id: string) => {
    setPlans((prev) => prev.map((p) => ({ ...p, popular: p.id === id })))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pricing Manager</h1>
          <p className="text-muted-foreground">Manage pricing plans and features</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Plan
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Plans Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`cursor-pointer transition-all ${
              activePlan === plan.id ? "ring-2 ring-primary" : ""
            } ${!plan.enabled ? "opacity-50" : ""}`}
            onClick={() => setActivePlan(plan.id)}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="text-2xl font-bold mt-1">${plan.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">per month</p>
                </div>
                {plan.popular && <Badge>Popular</Badge>}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{plan.linksPerMonth} links/mo</span>
                <Switch
                  checked={plan.enabled}
                  onCheckedChange={() => togglePlan(plan.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Plan Editor */}
      {activePlan && (
        <Card>
          <CardHeader>
            <CardTitle>Edit: {plans.find((p) => p.id === activePlan)?.name} Plan</CardTitle>
            <CardDescription>Modify pricing, features, and visibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Plan Name</Label>
                <Input defaultValue={plans.find((p) => p.id === activePlan)?.name} />
              </div>
              <div className="space-y-2">
                <Label>Monthly Price ($)</Label>
                <Input type="number" defaultValue={plans.find((p) => p.id === activePlan)?.price} />
              </div>
              <div className="space-y-2">
                <Label>Links Per Month</Label>
                <Input defaultValue={plans.find((p) => p.id === activePlan)?.linksPerMonth} />
              </div>
            </div>

            <div className="flex items-center gap-6 p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Switch
                  checked={plans.find((p) => p.id === activePlan)?.enabled}
                  onCheckedChange={() => togglePlan(activePlan)}
                />
                <div>
                  <p className="font-medium">Enabled</p>
                  <p className="text-xs text-muted-foreground">Show on pricing page</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={plans.find((p) => p.id === activePlan)?.popular}
                  onCheckedChange={() => setPopular(activePlan)}
                />
                <div>
                  <p className="font-medium">Mark as Popular</p>
                  <p className="text-xs text-muted-foreground">Highlight this plan</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base">Plan Features</Label>
                <Button variant="outline" size="sm">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {plans
                  .find((p) => p.id === activePlan)
                  ?.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded-lg">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <Input defaultValue={feature} className="border-0 p-0 h-auto" />
                      <Button variant="ghost" size="sm" className="text-destructive shrink-0">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>

            {/* CTA Settings */}
            <div className="pt-4 border-t space-y-4">
              <Label className="text-base">Call-to-Action</Label>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Button Text</Label>
                  <Input defaultValue="Get Started" />
                </div>
                <div className="space-y-2">
                  <Label>Button Link</Label>
                  <Input defaultValue="/contact" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
