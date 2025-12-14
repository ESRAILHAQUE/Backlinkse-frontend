"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Eye, Download } from "lucide-react"
import { getAllOrders, Order } from "@/lib/orders"

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const data = await getAllOrders()
      setOrders(data)
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your link building orders.</p>
      </div>

      <div className="grid gap-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order._id}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{order.packageName}</h3>
                        <Badge variant={order.status === "Completed" ? "secondary" : "default"}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Order #{order.orderNumber} • {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                      <div className="mt-2">
                        <div className="text-sm">
                          Links: {order.linksDelivered} / {order.linksTotal}
                        </div>
                        <div className="h-1.5 w-32 rounded-full bg-secondary mt-1">
                          <div
                            className="h-1.5 rounded-full bg-primary"
                            style={{ width: `${(order.linksDelivered / order.linksTotal) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold">
                      {order.currency} {order.amount.toLocaleString()}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Invoice
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No orders found
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
