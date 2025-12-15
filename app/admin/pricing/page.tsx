"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, Trash2, Check, Loader2, Trash } from "lucide-react"
import {
  getAllPricingPlans,
  createPricingPlan,
  updatePricingPlan,
  deletePricingPlan,
  type PricingPlan,
} from "@/lib/pricing"
import { toast } from "sonner"

export default function PricingManagerPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [activePlanId, setActivePlanId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const activePlan = useMemo(() => plans.find((p) => p._id === activePlanId) || null, [plans, activePlanId])

  const loadPlans = async () => {
    try {
      setLoading(true)
      const data = await getAllPricingPlans()
      setPlans(data)
      if (!activePlanId && data.length > 0) {
        setActivePlanId(data[0]._id)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load pricing plans")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPlans()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateLocalPlan = (id: string, changes: Partial<PricingPlan>) => {
    setPlans((prev) => prev.map((p) => (p._id === id ? { ...p, ...changes } : p)))
  }

  const handleFieldChange = (field: keyof PricingPlan, value: string | number | boolean) => {
    if (!activePlan) return
    updateLocalPlan(activePlan._id, { [field]: value } as Partial<PricingPlan>)
  }

  const handleFeatureChange = (index: number, value: string) => {
    if (!activePlan) return
    const nextFeatures = [...activePlan.features]
    nextFeatures[index] = value
    updateLocalPlan(activePlan._id, { features: nextFeatures })
  }

  const handleAddFeature = () => {
    if (!activePlan) return
    const nextFeatures = [...activePlan.features, "New feature"]
    updateLocalPlan(activePlan._id, { features: nextFeatures })
  }

  const handleRemoveFeature = (index: number) => {
    if (!activePlan) return
    const nextFeatures = activePlan.features.filter((_, i) => i !== index)
    updateLocalPlan(activePlan._id, { features: nextFeatures })
  }

  const handleSave = async () => {
    if (!activePlan) return
    try {
      setSaving(true)
      await updatePricingPlan(activePlan._id, {
        name: activePlan.name,
        price: activePlan.price,
        linksPerMonth: activePlan.linksPerMonth,
        features: activePlan.features,
        popular: activePlan.popular,
        enabled: activePlan.enabled,
        buttonText: activePlan.buttonText,
        buttonLink: activePlan.buttonLink,
        sortOrder: activePlan.sortOrder,
      })
      toast.success("Plan saved")
      loadPlans()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save plan")
    } finally {
      setSaving(false)
    }
  }

  const handleAddPlan = async () => {
    try {
      setSaving(true)
      const plan = await createPricingPlan({
        name: "New Plan",
        price: 0,
        linksPerMonth: "",
        features: [],
        buttonText: "Get Started",
        buttonLink: "/contact",
        sortOrder: plans.length,
      })
      toast.success("Plan created")
      setPlans((prev) => [...prev, plan])
      setActivePlanId(plan._id)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create plan")
    } finally {
      setSaving(false)
    }
  }

  const handleDeletePlan = async () => {
    if (!activePlan) return
    try {
      setSaving(true)
      await deletePricingPlan(activePlan._id)
      toast.success("Plan deleted")
      const remaining = plans.filter((p) => p._id !== activePlan._id)
      setPlans(remaining)
      setActivePlanId(remaining[0]?._id ?? null)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete plan")
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (field: "enabled" | "popular", value: boolean) => {
    if (!activePlan) return
    updateLocalPlan(activePlan._id, { [field]: value } as Partial<PricingPlan>)
    try {
      await updatePricingPlan(activePlan._id, { [field]: value } as Partial<PricingPlan>)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update plan")
      loadPlans()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pricing Manager</h1>
          <p className="text-muted-foreground">Manage pricing plans and features</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddPlan} disabled={saving}>
            <Plus className="h-4 w-4 mr-2" />
            Add Plan
          </Button>
          <Button onClick={handleSave} disabled={saving || !activePlan}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          <Button variant="destructive" onClick={handleDeletePlan} disabled={!activePlan || saving}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card
            key={plan._id}
            className={`cursor-pointer transition-all ${activePlanId === plan._id ? "ring-2 ring-primary" : ""} ${!plan.enabled ? "opacity-50" : ""
              }`}
            onClick={() => setActivePlanId(plan._id)}
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
                  onCheckedChange={(v) => handleToggle("enabled", v)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {activePlan && (
        <Card>
          <CardHeader>
            <CardTitle>Edit: {activePlan.name}</CardTitle>
            <CardDescription>Modify pricing, features, and visibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Plan Name</Label>
                <Input value={activePlan.name} onChange={(e) => handleFieldChange("name", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Monthly Price ($)</Label>
                <Input
                  type="number"
                  value={activePlan.price}
                  onChange={(e) => handleFieldChange("price", Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Links Per Month</Label>
                <Input
                  value={activePlan.linksPerMonth}
                  onChange={(e) => handleFieldChange("linksPerMonth", e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-6 p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Switch
                  checked={activePlan.enabled}
                  onCheckedChange={(v) => handleToggle("enabled", v)}
                />
                <div>
                  <p className="font-medium">Enabled</p>
                  <p className="text-xs text-muted-foreground">Show on pricing page</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={activePlan.popular}
                  onCheckedChange={(v) => {
                    updateLocalPlan(activePlan._id, { popular: v })
                    handleToggle("popular", v)
                  }}
                />
                <div>
                  <p className="font-medium">Mark as Popular</p>
                  <p className="text-xs text-muted-foreground">Highlight this plan</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base">Plan Features</Label>
                <Button variant="outline" size="sm" onClick={handleAddFeature}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {activePlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded-lg">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="border-0 p-0 h-auto"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive shrink-0"
                      onClick={() => handleRemoveFeature(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t space-y-4">
              <Label className="text-base">Call-to-Action</Label>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Button Text</Label>
                  <Input
                    value={activePlan.buttonText}
                    onChange={(e) => handleFieldChange("buttonText", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Button Link</Label>
                  <Input
                    value={activePlan.buttonLink}
                    onChange={(e) => handleFieldChange("buttonLink", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
