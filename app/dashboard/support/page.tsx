"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Plus, Clock, CheckCircle, AlertCircle } from "lucide-react"

const tickets = [
  {
    id: "TKT-001",
    subject: "Question about link placement",
    status: "Open",
    priority: "Medium",
    created: "Dec 10, 2024",
    lastUpdate: "2 hours ago",
  },
  {
    id: "TKT-002",
    subject: "Request for additional anchor text variation",
    status: "In Progress",
    priority: "Low",
    created: "Dec 5, 2024",
    lastUpdate: "1 day ago",
  },
  {
    id: "TKT-003",
    subject: "Invoice clarification",
    status: "Resolved",
    priority: "High",
    created: "Nov 28, 2024",
    lastUpdate: "5 days ago",
  },
]

export default function SupportPage() {
  const [showNewTicket, setShowNewTicket] = useState(false)

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
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description of your issue" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
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
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Describe your issue in detail..." rows={5} />
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
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
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
                      #{ticket.id} • Created {ticket.created} • Last update: {ticket.lastUpdate}
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
            ))}
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
