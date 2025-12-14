"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Plus, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { getAllTickets, createTicket, SupportTicket } from "@/lib/support"

export default function SupportPage() {
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "Medium",
    message: "",
  })

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      setLoading(true)
      const data = await getAllTickets()
      setTickets(data)
    } catch (error) {
      console.error("Failed to fetch tickets:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTicket({
        subject: formData.subject,
        category: formData.category as any,
        priority: formData.priority as any,
        message: formData.message,
      })
      setFormData({ subject: "", category: "", priority: "Medium", message: "" })
      setShowNewTicket(false)
      await fetchTickets()
    } catch (error) {
      console.error("Failed to create ticket:", error)
      alert("Failed to create ticket")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "Resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Support Tickets</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Support Tickets</h1>
          <p className="text-muted-foreground">Get help from our support team.</p>
        </div>
        <Button onClick={() => setShowNewTicket(!showNewTicket)}>
          <Plus className="h-4 w-4 mr-2" />
          New Ticket
        </Button>
      </div>

      {showNewTicket && (
        <Card>
          <CardHeader>
            <CardTitle>Create Support Ticket</CardTitle>
            <CardDescription>Describe your issue and we'll get back to you shortly.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="order">Order Related</SelectItem>
                      <SelectItem value="general">General Question</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue in detail..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Submit Ticket</Button>
                <Button type="button" variant="outline" onClick={() => setShowNewTicket(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Your Tickets</CardTitle>
          <CardDescription>{tickets.length} tickets total</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{ticket.subject}</h3>
                        <Badge
                          variant={ticket.status === "Resolved" ? "secondary" : "default"}
                          className="flex items-center gap-1"
                        >
                          {getStatusIcon(ticket.status)}
                          {ticket.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        #{ticket.ticketNumber} • Created {new Date(ticket.createdAt).toLocaleDateString()} • Last
                        update: {new Date(ticket.lastUpdate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{ticket.priority}</Badge>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">No tickets found</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <div>
            <h3 className="font-semibold">Need immediate assistance?</h3>
            <p className="text-sm text-muted-foreground">Our team is available Monday-Friday, 9am-6pm EST.</p>
          </div>
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Start Live Chat
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
