"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Shield, Trash2, Plus } from "lucide-react"

const existingMembers = [
  { name: "John Doe", email: "john@company.com", role: "Owner", initials: "JD" },
  { name: "Sarah Smith", email: "sarah@company.com", role: "Admin", initials: "SS" },
  { name: "Mike Johnson", email: "mike@company.com", role: "Viewer", initials: "MJ" },
]

export default function TeamPage() {
  const [showInviteForm, setShowInviteForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team Management</h1>
          <p className="text-muted-foreground">Invite team members to collaborate on your account.</p>
        </div>
        <Button onClick={() => setShowInviteForm(!showInviteForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {showInviteForm && (
        <Card>
          <CardHeader>
            <CardTitle>Invite New Team Member</CardTitle>
            <CardDescription>Send an invitation to join your team.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="teammate@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin - Full access</SelectItem>
                      <SelectItem value="editor">Editor - Can manage orders</SelectItem>
                      <SelectItem value="viewer">Viewer - Read-only access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Send Invitation</Button>
                <Button type="button" variant="outline" onClick={() => setShowInviteForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>{existingMembers.length} members in your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {existingMembers.map((member) => (
              <div key={member.email} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {member.initials}
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    {member.role}
                  </span>
                  {member.role !== "Owner" && (
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
