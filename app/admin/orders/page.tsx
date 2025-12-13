"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MoreHorizontal,
  Eye,
  Download,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCcw,
  Mail,
  FileText,
  CreditCard,
  Calendar,
  User,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const orders = [
  {
    id: "ORD-2024-001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      company: "TechStart Inc.",
      avatar: "JD",
    },
    service: "Growth Plan",
    serviceType: "Link Building",
    package: "Monthly Subscription",
    amount: 5000,
    status: "completed",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    date: "2024-01-15",
    deliveryDate: "2024-02-15",
    linksOrdered: 20,
    linksDelivered: 20,
    project: "techstart-seo-campaign",
    notes: "Client requested focus on tech industry sites",
  },
  {
    id: "ORD-2024-002",
    customer: {
      name: "Sarah Johnson",
      email: "sarah@company.com",
      company: "Digital Marketing Co.",
      avatar: "SJ",
    },
    service: "Pro Plan",
    serviceType: "Link Building",
    package: "Monthly Subscription",
    amount: 3000,
    status: "in_progress",
    paymentStatus: "paid",
    paymentMethod: "PayPal",
    date: "2024-01-14",
    deliveryDate: "2024-02-14",
    linksOrdered: 15,
    linksDelivered: 8,
    project: "digital-marketing-backlinks",
    notes: "",
  },
  {
    id: "ORD-2024-003",
    customer: {
      name: "Michael Chen",
      email: "michael@startup.io",
      company: "CloudScale Systems",
      avatar: "MC",
    },
    service: "Enterprise Plan",
    serviceType: "Link Building",
    package: "Quarterly Package",
    amount: 10000,
    status: "completed",
    paymentStatus: "paid",
    paymentMethod: "Bank Transfer",
    date: "2024-01-13",
    deliveryDate: "2024-04-13",
    linksOrdered: 50,
    linksDelivered: 50,
    project: "cloudscale-authority",
    notes: "High DR sites only, minimum DR 60+",
  },
  {
    id: "ORD-2024-004",
    customer: {
      name: "Emily Davis",
      email: "emily@business.com",
      company: "GreenLeaf Organics",
      avatar: "ED",
    },
    service: "Startup Plan",
    serviceType: "Link Building",
    package: "One-time",
    amount: 1500,
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "Credit Card",
    date: "2024-01-12",
    deliveryDate: "2024-02-12",
    linksOrdered: 8,
    linksDelivered: 0,
    project: "greenleaf-launch",
    notes: "Awaiting payment confirmation",
  },
  {
    id: "ORD-2024-005",
    customer: {
      name: "Alex Wilson",
      email: "alex@tech.co",
      company: "InnovateTech",
      avatar: "AW",
    },
    service: "Guest Posting",
    serviceType: "Guest Posting",
    package: "10 Posts Package",
    amount: 2500,
    status: "in_progress",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    date: "2024-01-11",
    deliveryDate: "2024-02-11",
    linksOrdered: 10,
    linksDelivered: 6,
    project: "innovatetech-content",
    notes: "",
  },
  {
    id: "ORD-2024-006",
    customer: {
      name: "Lisa Brown",
      email: "lisa@retail.com",
      company: "FashionHub",
      avatar: "LB",
    },
    service: "Pro Plan",
    serviceType: "Link Building",
    package: "Monthly Subscription",
    amount: 3000,
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "Credit Card",
    date: "2024-01-10",
    deliveryDate: "-",
    linksOrdered: 15,
    linksDelivered: 0,
    project: "fashionhub-seo",
    notes: "Client requested cancellation due to budget constraints",
  },
  {
    id: "ORD-2024-007",
    customer: {
      name: "Robert Martinez",
      email: "robert@legal.com",
      company: "Martinez Law Firm",
      avatar: "RM",
    },
    service: "Platinum Links",
    serviceType: "Premium Links",
    package: "5 Links Package",
    amount: 7500,
    status: "in_progress",
    paymentStatus: "paid",
    paymentMethod: "Bank Transfer",
    date: "2024-01-09",
    deliveryDate: "2024-02-09",
    linksOrdered: 5,
    linksDelivered: 2,
    project: "martinez-authority",
    notes: "DR 80+ sites only, legal niche preferred",
  },
  {
    id: "ORD-2024-008",
    customer: {
      name: "Jennifer Lee",
      email: "jennifer@health.org",
      company: "HealthFirst Clinic",
      avatar: "JL",
    },
    service: "SEO Blog Writing",
    serviceType: "Content",
    package: "8 Articles/Month",
    amount: 1600,
    status: "completed",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    date: "2024-01-08",
    deliveryDate: "2024-02-08",
    linksOrdered: 8,
    linksDelivered: 8,
    project: "healthfirst-content",
    notes: "Medical topics, needs expert review",
  },
]

type OrderStatus = "all" | "pending" | "in_progress" | "completed" | "cancelled"

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus>("all")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 10

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesService = serviceFilter === "all" || order.serviceType === serviceFilter

    return matchesSearch && matchesStatus && matchesService
  })

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Completed</Badge>
      case "in_progress":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">In Progress</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="outline" className="border-green-500 text-green-600">
            Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-600">
            Pending
          </Badge>
        )
      case "refunded":
        return (
          <Badge variant="outline" className="border-red-500 text-red-600">
            Refunded
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const stats = {
    total: orders.length,
    completed: orders.filter((o) => o.status === "completed").length,
    inProgress: orders.filter((o) => o.status === "in_progress").length,
    pending: orders.filter((o) => o.status === "pending").length,
    revenue: orders.filter((o) => o.paymentStatus === "paid").reduce((sum, o) => sum + o.amount, 0),
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">All Orders</h1>
          <p className="text-muted-foreground">View and manage all customer orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.completed}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">${stats.revenue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID, customer name, email, or company..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as OrderStatus)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="Link Building">Link Building</SelectItem>
                  <SelectItem value="Guest Posting">Guest Posting</SelectItem>
                  <SelectItem value="Premium Links">Premium Links</SelectItem>
                  <SelectItem value="Content">Content</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Tabs */}
      <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as OrderStatus)}>
        <TabsList>
          <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({orders.filter((o) => o.status === "pending").length})</TabsTrigger>
          <TabsTrigger value="in_progress">
            In Progress ({orders.filter((o) => o.status === "in_progress").length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({orders.filter((o) => o.status === "completed").length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({orders.filter((o) => o.status === "cancelled").length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Showing {paginatedOrders.length} of {filteredOrders.length} orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Service</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Progress</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Payment</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-secondary/30">
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="font-medium text-primary hover:underline"
                      >
                        {order.id}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                          {order.customer.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{order.customer.name}</p>
                          <p className="text-xs text-muted-foreground">{order.customer.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-sm">{order.service}</p>
                        <p className="text-xs text-muted-foreground">{order.package}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{
                              width: `${order.linksOrdered > 0 ? (order.linksDelivered / order.linksOrdered) * 100 : 0}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {order.linksDelivered}/{order.linksOrdered}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">${order.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">{getPaymentBadge(order.paymentStatus)}</td>
                    <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                    <td className="py-3 px-4 text-muted-foreground text-sm">{order.date}</td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            View Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Email Customer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem>Add Note</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>View complete order information and manage status</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-medium text-primary">
                  {selectedOrder.customer.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{selectedOrder.customer.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer.company}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer.email}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </div>

              {/* Order Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Service</p>
                  <p className="font-medium">{selectedOrder.service}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Package</p>
                  <p className="font-medium">{selectedOrder.package}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-medium text-lg">${selectedOrder.amount.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{selectedOrder.paymentMethod}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{selectedOrder.date}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Expected Delivery</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{selectedOrder.deliveryDate}</span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Delivery Progress</h4>
                  <span className="text-sm text-muted-foreground">
                    {selectedOrder.linksDelivered} of {selectedOrder.linksOrdered} links delivered
                  </span>
                </div>
                <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{
                      width: `${selectedOrder.linksOrdered > 0 ? (selectedOrder.linksDelivered / selectedOrder.linksOrdered) * 100 : 0}%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>{getStatusBadge(selectedOrder.status)}</span>
                  <span>{getPaymentBadge(selectedOrder.paymentStatus)}</span>
                </div>
              </div>

              {/* Project Link */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Associated Project</p>
                    <p className="text-sm text-muted-foreground">{selectedOrder.project}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Project
                </Button>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Order Notes</h4>
                  <p className="text-sm text-muted-foreground">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                <Button className="flex-1">Update Status</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
