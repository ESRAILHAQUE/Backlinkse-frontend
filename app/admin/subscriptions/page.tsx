"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    RefreshCcw,
    Search,
    MoreHorizontal,
    Eye,
    CheckCircle,
    TrendingUp,
    XCircle,
    CreditCard,
    Calendar,
    User,
    ChevronLeft,
    ChevronRight,
    Loader2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getAllSubscriptionsAdmin, cancelSubscriptionAdmin, type Subscription } from "@/lib/subscriptions"
import { toast } from "sonner"

type SubscriptionStatus = "Active" | "Cancelled" | "Expired"
type StatusFilter = SubscriptionStatus | "all"

interface SubscriptionWithUser extends Subscription {
    user?: {
        _id: string
        name: string
        email: string
    }
}

export default function AdminSubscriptionsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
    const [subscriptions, setSubscriptions] = useState<SubscriptionWithUser[]>([])
    const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionWithUser | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const subscriptionsPerPage = 10
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                setLoading(true)
                const data = await getAllSubscriptionsAdmin()
                // Transform userId if it's populated
                const transformed = data.map((sub) => ({
                    ...sub,
                    user:
                        typeof sub.userId === "object" && sub.userId !== null
                            ? {
                                _id: (sub.userId as any)._id || "",
                                name: (sub.userId as any).name || "Unknown",
                                email: (sub.userId as any).email || "",
                            }
                            : undefined,
                }))
                setSubscriptions(transformed)
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Failed to load subscriptions")
            } finally {
                setLoading(false)
            }
        }
        fetchSubscriptions()
    }, [])

    const filteredSubscriptions = useMemo(() => {
        return subscriptions.filter((sub) => {
            const userName = sub.user?.name?.toLowerCase() || ""
            const userEmail = sub.user?.email?.toLowerCase() || ""
            const planName = sub.planName?.toLowerCase() || ""
            const matchesSearch =
                userName.includes(searchQuery.toLowerCase()) ||
                userEmail.includes(searchQuery.toLowerCase()) ||
                planName.includes(searchQuery.toLowerCase())

            const matchesStatus = statusFilter === "all" || sub.status === statusFilter
            return matchesSearch && matchesStatus
        })
    }, [subscriptions, searchQuery, statusFilter])

    const totalPages = Math.max(1, Math.ceil(filteredSubscriptions.length / subscriptionsPerPage))
    const paginatedSubscriptions = filteredSubscriptions.slice(
        (currentPage - 1) * subscriptionsPerPage,
        currentPage * subscriptionsPerPage
    )

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Active":
                return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Active</Badge>
            case "Cancelled":
                return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">Cancelled</Badge>
            case "Expired":
                return <Badge className="bg-gray-500/10 text-gray-600 hover:bg-gray-500/20">Expired</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const stats = useMemo(() => {
        return {
            total: subscriptions.length,
            active: subscriptions.filter((s) => s.status === "Active").length,
            cancelled: subscriptions.filter((s) => s.status === "Cancelled").length,
            expired: subscriptions.filter((s) => s.status === "Expired").length,
        }
    }, [subscriptions])

    const handleCancelSubscription = async (subscription: SubscriptionWithUser) => {
        if (subscription.status !== "Active") {
            toast.error("Only active subscriptions can be cancelled")
            return
        }
        if (!confirm(`Are you sure you want to cancel this subscription?`)) return

        try {
            await cancelSubscriptionAdmin(subscription._id)
            toast.success("Subscription cancelled successfully")
            const data = await getAllSubscriptionsAdmin()
            const transformed = data.map((sub) => ({
                ...sub,
                user:
                    typeof sub.userId === "object" && sub.userId !== null
                        ? {
                            _id: (sub.userId as any)._id || "",
                            name: (sub.userId as any).name || "Unknown",
                            email: (sub.userId as any).email || "",
                        }
                        : undefined,
            }))
            setSubscriptions(transformed)
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to cancel subscription")
        }
    }

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })
        } catch {
            return dateString
        }
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Subscriptions</h1>
                    <p className="text-muted-foreground">View and manage all customer subscriptions</p>
                </div>
                <Button
                    variant="outline"
                    onClick={async () => {
                        setLoading(true)
                        try {
                            const data = await getAllSubscriptionsAdmin()
                            const transformed = data.map((sub) => ({
                                ...sub,
                                user:
                                    typeof sub.userId === "object" && sub.userId !== null
                                        ? {
                                            _id: (sub.userId as any)._id || "",
                                            name: (sub.userId as any).name || "Unknown",
                                            email: (sub.userId as any).email || "",
                                        }
                                        : undefined,
                            }))
                            setSubscriptions(transformed)
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
                                <CreditCard className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.total}</p>
                                <p className="text-sm text-muted-foreground">Total Subscriptions</p>
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
                                <p className="text-2xl font-bold">{stats.active}</p>
                                <p className="text-sm text-muted-foreground">Active</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                                <XCircle className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.cancelled}</p>
                                <p className="text-sm text-muted-foreground">Cancelled</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gray-500/10 flex items-center justify-center">
                                <TrendingUp className="h-5 w-5 text-gray-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.expired}</p>
                                <p className="text-sm text-muted-foreground">Expired</p>
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
                                    placeholder="Search by user name, email, or plan..."
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
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                    <SelectItem value="Expired">Expired</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Subscriptions</CardTitle>
                    <CardDescription>Manage customer subscriptions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">User</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Plan</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Price</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Billing Cycle</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Next Billing</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                                    <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="py-6 text-center text-muted-foreground">
                                            <div className="flex items-center justify-center gap-2">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Loading subscriptions...
                                            </div>
                                        </td>
                                    </tr>
                                ) : paginatedSubscriptions.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-6 text-center text-muted-foreground">
                                            No subscriptions found
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedSubscriptions.map((subscription) => (
                                        <tr key={subscription._id} className="border-b last:border-0 hover:bg-secondary/50">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <div className="text-sm font-medium">
                                                            {subscription.user?.name || "Unknown User"}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {subscription.user?.email || "No email"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="text-sm font-medium">{subscription.planName}</div>
                                            </td>
                                            <td className="py-3 px-4 text-sm">{formatCurrency(subscription.price)}</td>
                                            <td className="py-3 px-4 text-sm text-muted-foreground">{subscription.billingCycle}</td>
                                            <td className="py-3 px-4 text-sm text-muted-foreground">
                                                {subscription.nextBillingDate ? formatDate(subscription.nextBillingDate) : "N/A"}
                                            </td>
                                            <td className="py-3 px-4">{getStatusBadge(subscription.status)}</td>
                                            <td className="py-3 px-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => setSelectedSubscription(subscription)}>
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        {subscription.status === "Active" && (
                                                            <>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    onClick={() => handleCancelSubscription(subscription)}
                                                                    className="text-destructive"
                                                                >
                                                                    <XCircle className="h-4 w-4 mr-2" />
                                                                    Cancel Subscription
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}
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
                                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Subscription Details Dialog */}
            <Dialog open={!!selectedSubscription} onOpenChange={() => setSelectedSubscription(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Subscription Details</DialogTitle>
                        <DialogDescription>View complete subscription information</DialogDescription>
                    </DialogHeader>
                    {selectedSubscription && (
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">User</label>
                                    <div className="mt-1">
                                        <div className="text-sm font-medium">
                                            {selectedSubscription.user?.name || "Unknown User"}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {selectedSubscription.user?.email || "No email"}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Plan Name</label>
                                    <div className="mt-1 text-sm font-medium">{selectedSubscription.planName}</div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Price</label>
                                    <div className="mt-1 text-sm font-medium">{formatCurrency(selectedSubscription.price)}</div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Billing Cycle</label>
                                    <div className="mt-1 text-sm font-medium">{selectedSubscription.billingCycle}</div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                                    <div className="mt-1">{getStatusBadge(selectedSubscription.status)}</div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                                    <div className="mt-1 text-sm font-medium">
                                        {selectedSubscription.startDate ? formatDate(selectedSubscription.startDate) : "N/A"}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Next Billing Date</label>
                                    <div className="mt-1 text-sm font-medium flex items-center gap-1">
                                        <Calendar className="h-3 w-3 text-muted-foreground" />
                                        {selectedSubscription.nextBillingDate
                                            ? formatDate(selectedSubscription.nextBillingDate)
                                            : "N/A"}
                                    </div>
                                </div>
                                {selectedSubscription.cancelledAt && (
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Cancelled At</label>
                                        <div className="mt-1 text-sm font-medium">
                                            {formatDate(selectedSubscription.cancelledAt)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

