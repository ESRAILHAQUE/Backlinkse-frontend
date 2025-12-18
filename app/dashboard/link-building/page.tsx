"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { createOrder } from "@/lib/orders"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { getPublicPackages, type LinkBuildingPackage } from "@/lib/link-building-packages"

export default function LinkBuildingPage() {
  const router = useRouter()
  const [packages, setPackages] = useState<LinkBuildingPackage[]>([])
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

  const handleOrder = async (pkg: LinkBuildingPackage) => {
    if (pkg.price === null) {
      router.push("/contact")
      return
    }
    // Extract number from linksPerMonth (e.g., "5 links/month" -> 5)
    const linksMatch = pkg.linksPerMonth.match(/^(\d+)/)
    const linksTotal = linksMatch ? parseInt(linksMatch[1], 10) : 1
    try {
      await createOrder({
        packageName: `${pkg.name} - Link Building`,
        packageType: "link-building",
        linksTotal: linksTotal,
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Link Building Packages</h1>
          <p className="text-muted-foreground">Choose a package that fits your growth goals.</p>
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
        <h1 className="text-2xl font-bold">Link Building Packages</h1>
        <p className="text-muted-foreground">Choose a package that fits your growth goals.</p>
      </div>

      {packages.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No packages available at the moment.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg) => (
            <Card key={pkg._id} className={pkg.popular ? "border-primary ring-1 ring-primary" : ""}>
              {pkg.popular && (
                <div className="bg-primary text-primary-foreground text-center text-xs font-medium py-1">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription>{pkg.linksPerMonth}</CardDescription>
                <div className="text-3xl font-bold">{formatPrice(pkg.price)}</div>
                {pkg.price !== null && <span className="text-sm text-muted-foreground">/month</span>}
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
                <Button
                  onClick={() => handleOrder(pkg)}
                  className={`w-full ${pkg.popular ? "" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                >
                  {pkg.price === null ? "Contact Sales" : "Order Now"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
