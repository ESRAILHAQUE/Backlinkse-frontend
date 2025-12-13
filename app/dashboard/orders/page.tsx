import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Eye, Download } from "lucide-react"

const orders = [
  {
    id: "ORD-2024-001",
    package: "Growth Package",
    date: "Dec 1, 2024",
    status: "In Progress",
    linksDelivered: 8,
    linksTotal: 12,
    amount: "$3,500",
  },
  {
    id: "ORD-2024-002",
    package: "Guest Post - Premium",
    date: "Nov 20, 2024",
    status: "Completed",
    linksDelivered: 5,
    linksTotal: 5,
    amount: "$2,995",
  },
  {
    id: "ORD-2023-015",
    package: "Scale Package",
    date: "Oct 1, 2024",
    status: "Completed",
    linksDelivered: 25,
    linksTotal: 25,
    amount: "$7,000",
  },
  {
    id: "ORD-2023-012",
    package: "Starter Package",
    date: "Sep 1, 2024",
    status: "Completed",
    linksDelivered: 5,
    linksTotal: 5,
    amount: "$1,500",
  },
]

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your link building orders.</p>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{order.package}</h3>
                      <Badge variant={order.status === "Completed" ? "secondary" : "default"}>{order.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Order #{order.id} • {order.date}
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
                  <p className="text-lg font-semibold">{order.amount}</p>
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
        ))}
      </div>
    </div>
  )
}
