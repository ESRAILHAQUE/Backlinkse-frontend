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
    AlertCircle,
    MessageSquare,
    User,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Clock,
    CheckCircle,
    XCircle,
    TrendingUp,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getAllTicketsAdmin, updateTicketAdmin, type SupportTicket } from "@/lib/support"
import { toast } from "sonner"

type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed"
type TicketPriority = "Low" | "Medium" | "High"
type StatusFilter = TicketStatus | "all"
type PriorityFilter = TicketPriority | "all"
type CategoryFilter = "billing" | "technical" | "order" | "general" | "all"

interface TicketWithUser extends SupportTicket {
    user?: {
        _id: string
        name: string
        email: string
    }
}

export default function AdminSupportPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
    const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all")
    const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all")
    const [tickets, setTickets] = useState<TicketWithUser[]>([])
    const [selectedTicket, setSelectedTicket] = useState<TicketWithUser | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const ticketsPerPage = 10
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setLoading(true)
                const data = await getAllTicketsAdmin()
                // Transform userId if it's populated
                const transformed = data.map((ticket) => ({
                    ...ticket,
                    user:
                        typeof ticket.userId === "object" && ticket.userId !== null
                            ? {
                                _id: (ticket.userId as any)._id || "",
                                name: (ticket.userId as any).name || "Unknown",
                                email: (ticket.userId as any).email || "",
                            }
                            : undefined,
                }))
                setTickets(transformed)
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Failed to load support tickets")
            } finally {
                setLoading(false)
            }
        }
        fetchTickets()
    }, [])

    const filteredTickets = useMemo(() => {
        return tickets.filter((ticket) => {
            const userName = ticket.user?.name?.toLowerCase() || ""
            const userEmail = ticket.user?.email?.toLowerCase() || ""
            const subject = ticket.subject?.toLowerCase() || ""
            const ticketNumber = ticket.ticketNumber?.toLowerCase() || ""
            const matchesSearch =
                userName.includes(searchQuery.toLowerCase()) ||
                userEmail.includes(searchQuery.toLowerCase()) ||
                subject.includes(searchQuery.toLowerCase()) ||
                ticketNumber.includes(searchQuery.toLowerCase())

            const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
            const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter
            const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter

            return matchesSearch && matchesStatus && matchesPriority && matchesCategory
        })
    }, [tickets, searchQuery, statusFilter, priorityFilter, categoryFilter])

    const totalPages = Math.max(1, Math.ceil(filteredTickets.length / ticketsPerPage))
    const paginatedTickets = filteredTickets.slice((currentPage - 1) * ticketsPerPage, currentPage * ticketsPerPage)

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Open":
                return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Open</Badge>
            case "In Progress":
                return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">In Progress</Badge>
            case "Resolved":
                return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Resolved</Badge>
            case "Closed":
                return <Badge className="bg-gray-500/10 text-gray-600 hover:bg-gray-500/20">Closed</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case "High":
                return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">High</Badge>
            case "Medium":
                return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Medium</Badge>
            case "Low":
                return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">Low</Badge>
            default:
                return <Badge variant="outline">{priority}</Badge>
        }
    }

    const getCategoryBadge = (category: string) => {
        const categoryMap: Record<string, { label: string; className: string }> = {
            billing: { label: "Billing", className: "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20" },
            technical: { label: "Technical", className: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20" },
            order: { label: "Order", className: "bg-green-500/10 text-green-600 hover:bg-green-500/20" },
            general: { label: "General", className: "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20" },
        }
        const cat = categoryMap[category] || { label: category, className: "bg-gray-500/10 text-gray-600" }
        return <Badge className={cat.className}>{cat.label}</Badge>
    }

    const stats = useMemo(() => {
        return {
            total: tickets.length,
            open: tickets.filter((t) => t.status === "Open").length,
            inProgress: tickets.filter((t) => t.status === "In Progress").length,
            resolved: tickets.filter((t) => t.status === "Resolved" || t.status === "Closed").length,
        }
    }, [tickets])

    const handleStatusChange = async (ticket: TicketWithUser, status: TicketStatus) => {
        try {
            await updateTicketAdmin(ticket._id, { status })
            toast.success("Ticket status updated")
            const data = await getAllTicketsAdmin()
            const transformed = data.map((t) => ({
                ...t,
                user:
                    typeof t.userId === "object" && t.userId !== null
                        ? {
                            _id: (t.userId as any)._id || "",
                            name: (t.userId as any).name || "Unknown",
                            email: (t.userId as any).email || "",
                        }
                        : undefined,
            }))
            setTickets(transformed)
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to update ticket")
        }
    }

    const handlePriorityChange = async (ticket: TicketWithUser, priority: TicketPriority) => {
        try {
            await updateTicketAdmin(ticket._id, { priority })
            toast.success("Ticket priority updated")
            const data = await getAllTicketsAdmin()
            const transformed = data.map((t) => ({
                ...t,
                user:
                    typeof t.userId === "object" && t.userId !== null
                        ? {
                            _id: (t.userId as any)._id || "",
                            name: (t.userId as any).name || "Unknown",
                            email: (t.userId as any).email || "",
                        }
                        : undefined,
            }))
            setTickets(transformed)
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to update ticket")
        }
    }

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })
        } catch {
            return dateString
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Open":
                return <Clock className="h-4 w-4 text-yellow-500" />
            case "In Progress":
                return <TrendingUp className="h-4 w-4 text-blue-500" />
            case "Resolved":
                return <CheckCircle className="h-4 w-4 text-green-500" />
            case "Closed":
                return <XCircle className="h-4 w-4 text-gray-500" />
            default:
                return <AlertCircle className="h-4 w-4 text-muted-foreground" />
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Support Tickets</h1>
                    <p className="text-muted-foreground">View and manage all customer support tickets</p>
                </div>
                <Button
                    variant="outline"
                    onClick={async () => {
                        setLoading(true)
                        try {
                            const data = await getAllTicketsAdmin()
                            const transformed = data.map((t) => ({
                                ...t,
                                user:
                                    typeof t.userId === "object" && t.userId !== null
                                        ? {
                                            _id: (t.userId as any)._id || "",
                                            name: (t.userId as any).name || "Unknown",
                                            email: (t.userId as any).email || "",
                                        }
                                        : undefined,
                            }))
                            setTickets(transformed)
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
                                <MessageSquare className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.total}</p>
                                <p className="text-sm text-muted-foreground">Total Tickets</p>
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
                                <p className="text-2xl font-bold">{stats.open}</p>
                                <p className="text-sm text-muted-foreground">Open</p>
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
                            <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.resolved}</p>
                                <p className="text-sm text-muted-foreground">Resolved</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
                        <div className="flex flex-1 items-center gap-3 flex-wrap">
                            <div className="relative w-full lg:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by ticket number, subject, user name, or email..."
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
                                    <SelectItem value="Open">Open</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Resolved">Resolved</SelectItem>
                                    <SelectItem value="Closed">Closed</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={priorityFilter} onValueChange={(v) => setPriorityFilter(v as PriorityFilter)}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Priorities</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as CategoryFilter)}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="billing">Billing</SelectItem>
                                    <SelectItem value="technical">Technical</SelectItem>
                                    <SelectItem value="order">Order</SelectItem>
                                    <SelectItem value="general">General</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Support Tickets</CardTitle>
                    <CardDescription>Manage and update ticket statuses and priorities</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Ticket #</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">User</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Subject</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Category</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Priority</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Created</th>
                                    <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={8} className="py-6 text-center text-muted-foreground">
                                            <div className="flex items-center justify-center gap-2">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Loading tickets...
                                            </div>
                                        </td>
                                    </tr>
                                ) : paginatedTickets.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="py-6 text-center text-muted-foreground">
                                            No tickets found
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedTickets.map((ticket) => (
                                        <tr key={ticket._id} className="border-b last:border-0 hover:bg-secondary/50">
                                            <td className="py-3 px-4 font-mono text-sm font-medium">{ticket.ticketNumber}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <div className="text-sm font-medium">
                                                            {ticket.user?.name || "Unknown User"}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {ticket.user?.email || "No email"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="text-sm font-medium max-w-xs truncate">{ticket.subject}</div>
                                            </td>
                                            <td className="py-3 px-4">{getCategoryBadge(ticket.category)}</td>
                                            <td className="py-3 px-4">{getPriorityBadge(ticket.priority)}</td>
                                            <td className="py-3 px-4">{getStatusBadge(ticket.status)}</td>
                                            <td className="py-3 px-4 text-sm text-muted-foreground">
                                                {formatDate(ticket.createdAt)}
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => setSelectedTicket(ticket)}>
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                                                            Change Status
                                                        </div>
                                                        {(["Open", "In Progress", "Resolved", "Closed"] as TicketStatus[]).map(
                                                            (s) => (
                                                                <DropdownMenuItem key={s} onClick={() => handleStatusChange(ticket, s)}>
                                                                    {getStatusIcon(s)}
                                                                    <span className="ml-2">{s}</span>
                                                                </DropdownMenuItem>
                                                            )
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                                                            Change Priority
                                                        </div>
                                                        {(["Low", "Medium", "High"] as TicketPriority[]).map((p) => (
                                                            <DropdownMenuItem key={p} onClick={() => handlePriorityChange(ticket, p)}>
                                                                <AlertCircle className="h-4 w-4 mr-2" />
                                                                <span>{p}</span>
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

            {/* Ticket Details Dialog */}
            <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            Ticket #{selectedTicket?.ticketNumber}
                        </DialogTitle>
                        <DialogDescription>View complete ticket information and message</DialogDescription>
                    </DialogHeader>
                    {selectedTicket && (
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">User</label>
                                    <div className="mt-1">
                                        <div className="text-sm font-medium flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            {selectedTicket.user?.name || "Unknown User"}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {selectedTicket.user?.email || "No email"}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Subject</label>
                                    <div className="mt-1 text-sm font-medium">{selectedTicket.subject}</div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Category</label>
                                    <div className="mt-1">{getCategoryBadge(selectedTicket.category)}</div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Priority</label>
                                    <div className="mt-1">{getPriorityBadge(selectedTicket.priority)}</div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                                    <div className="mt-1">{getStatusBadge(selectedTicket.status)}</div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Created</label>
                                    <div className="mt-1 text-sm font-medium">
                                        {formatDate(selectedTicket.createdAt)}
                                    </div>
                                </div>
                                {selectedTicket.lastUpdate && (
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                                        <div className="mt-1 text-sm font-medium">
                                            {formatDate(selectedTicket.lastUpdate)}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="pt-4 border-t">
                                <label className="text-sm font-medium text-muted-foreground">Message</label>
                                <div className="mt-2 p-4 bg-secondary/50 rounded-lg">
                                    <p className="text-sm whitespace-pre-wrap">{selectedTicket.message}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

