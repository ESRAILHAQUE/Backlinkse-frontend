"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { RefreshCcw, Search, MoreHorizontal, Eye, CheckCircle, TrendingUp, Clock, XCircle, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getAllOrders, updateOrder, type Order } from "@/lib/orders"
import { toast } from "sonner"

type OrderStatus = "Pending" | "In Progress" | "Completed" | "Cancelled"
type StatusFilter = OrderStatus | "all"

export default function AdminOrdersPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
    const [orders, setOrders] = useState<Order[]>([])
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const ordersPerPage = 10
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true)
                const data = await getAllOrders()
                setOrders(data)
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Failed to load orders")
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesSearch =
                order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.packageName.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesStatus = statusFilter === "all" || order.status === statusFilter
            return matchesSearch && matchesStatus
        })
    }, [orders, searchQuery, statusFilter])

    const totalPages = Math.max(1, Math.ceil(filteredOrders.length / ordersPerPage))
    const paginatedOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage)

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Completed":
                return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Completed</Badge>
            case "In Progress":
                return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">In Progress</Badge>
            case "Pending":
                return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Pending</Badge>
            case "Cancelled":
                return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">Cancelled</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const stats = useMemo(() => {
        return {
            total: orders.length,
            completed: orders.filter((o) => o.status === "Completed").length,
            inProgress: orders.filter((o) => o.status === "In Progress").length,
            pending: orders.filter((o) => o.status === "Pending").length,
        }
    }, [orders])

    const handleStatusChange = async (order: Order, status: OrderStatus) => {
        try {
            await updateOrder(order._id, { status })
            toast.success("Order updated")
            const data = await getAllOrders()
            setOrders(data)
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to update order")
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Completed":
                return <CheckCircle className="h-4 w-4 text-green-500" />
            case "In Progress":
                return <TrendingUp className="h-4 w-4 text-blue-500" />
            case "Pending":
                return <Clock className="h-4 w-4 text-yellow-500" />
            case "Cancelled":
                return <XCircle className="h-4 w-4 text-red-500" />
            default:
                return null
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">All Orders</h1>
                    <p className="text-muted-foreground">View and manage all customer orders</p>
                </div>
                <Button
                    variant="outline"
                    onClick={async () => {
                        setLoading(true)
                        try {
                            const data = await getAllOrders()
                            setOrders(data)
                            setCurrentPage(1)
                        } catch {
                            toast.error("Failed to refresh")
                        } finally {
                            setLoading(false)
                        }
                    }}
                >
                    <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
                        <div className="flex flex-1 items-center gap-3">
                            <div className="relative w-full lg:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search orders..."
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>Manage and update order statuses</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Order #</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Package</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Links</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Amount</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                                    <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="py-6 text-center text-muted-foreground">
                                            Loading orders...
                                        </td>
                                    </tr>
                                ) : paginatedOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-6 text-center text-muted-foreground">
                                            No orders found
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedOrders.map((order) => (
                                        <tr key={order._id} className="border-b last:border-0">
                                            <td className="py-3 px-4 font-medium">{order.orderNumber}</td>
                                            <td className="py-3 px-4">
                                                <div className="text-sm font-medium">{order.packageName}</div>
                                                <div className="text-xs text-muted-foreground capitalize">{order.packageType}</div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-muted-foreground">
                                                {order.linksDelivered} / {order.linksTotal}
                                            </td>
                                            <td className="py-3 px-4 text-sm">
                                                {order.currency} {order.amount.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
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
                                                        <DropdownMenuSeparator />
                                                        {(["Pending", "In Progress", "Completed", "Cancelled"] as OrderStatus[]).map((s) => (
                                                            <DropdownMenuItem key={s} onClick={() => handleStatusChange(order, s)}>
                                                                {getStatusIcon(s)}
                                                                <span className="ml-2">{s}</span>
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-muted-foreground">
                            Page {currentPage} of {totalPages}
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogDescription>View order details and status.</DialogDescription>
                    </DialogHeader>
                    {selectedOrder && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Order #</p>
                                    <p className="font-medium">{selectedOrder.orderNumber}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Package</p>
                                    <p className="font-medium">{selectedOrder.packageName}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Links</p>
                                    <p className="font-medium">
                                        {selectedOrder.linksDelivered} / {selectedOrder.linksTotal}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Amount</p>
                                    <p className="font-medium">
                                        {selectedOrder.currency} {selectedOrder.amount.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Status</p>
                                    <p className="font-medium">{selectedOrder.status}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Ordered</p>
                                    <p className="font-medium">
                                        {selectedOrder.orderDate ? new Date(selectedOrder.orderDate).toLocaleDateString() : "-"}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Quick status update</p>
                                <div className="flex flex-wrap gap-2">
                                    {(["Pending", "In Progress", "Completed", "Cancelled"] as OrderStatus[]).map((s) => (
                                        <Button
                                            key={s}
                                            variant={selectedOrder.status === s ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handleStatusChange(selectedOrder, s)}
                                        >
                                            {s}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

