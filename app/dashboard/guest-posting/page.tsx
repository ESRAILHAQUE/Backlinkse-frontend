"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, FileText, Globe, Zap, Loader2 } from "lucide-react"
import { getPublicPackages, type GuestPostingPackage } from "@/lib/guest-posting-packages"
import { createOrder } from "@/lib/orders"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Globe,
  Zap,
}

export default function GuestPostingPage() {
  const router = useRouter()
  const [packages, setPackages] = useState<GuestPostingPackage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      setLoading(true)
      const data = await getPublicPackages()
      setPackages(data.packages)
    } catch (error) {
      console.error("Failed to fetch packages:", error)
      toast.error("Failed to load packages")
    } finally {
      setLoading(false)
    }
  }

  const handleOrder = async (pkg: GuestPostingPackage) => {
    if (pkg.price === null) {
      router.push("/contact")
      return
    }
    try {
      await createOrder({
        packageName: `${pkg.name} - Guest Posting`,
        packageType: "guest-posting",
        linksTotal: 1, // Guest posting is per post, so 1 link per order
        amount: pkg.price,
        currency: "USD",
      })
      toast.success("Order placed! Check your orders page.")
      router.push("/dashboard/orders")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to place order")
    }
  }

  const formatPrice = (price: number | null): string => {
    if (price === null) return "Custom"
    return `$${price.toLocaleString()}`
  }

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || FileText
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Guest Posting Services</h1>
          <p className="text-muted-foreground">Get published on high-authority websites in your niche.</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Guest Posting Services</h1>
        <p className="text-muted-foreground">Get published on high-authority websites in your niche.</p>
      </div>

      {packages.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No packages available at the moment.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => {
            const IconComponent = getIcon(pkg.icon)
            return (
              <Card key={pkg._id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{pkg.name}</CardTitle>
                      <CardDescription>{pkg.description}</CardDescription>
                    </div>
                  </div>
                  <div className="pt-4">
                    <span className="text-3xl font-bold">{formatPrice(pkg.price)}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => handleOrder(pkg)} className="w-full">
                    Order Now
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

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
