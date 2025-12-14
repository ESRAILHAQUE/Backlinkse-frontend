"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Shield, Trash2, Plus } from "lucide-react"
import { getAllTeamMembers, inviteTeamMember, removeTeamMember, TeamMember } from "@/lib/team"

export default function TeamPage() {
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    role: "",
  })

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const data = await getAllTeamMembers()
      setMembers(data)
    } catch (error) {
      console.error("Failed to fetch team members:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await inviteTeamMember({
        email: formData.email,
        role: formData.role as any,
      })
      setFormData({ email: "", role: "" })
      setShowInviteForm(false)
      await fetchMembers()
    } catch (error) {
      console.error("Failed to invite team member:", error)
      alert("Failed to invite team member")
    }
  }

  const handleRemove = async (email: string) => {
    // Find member by email and remove
    const member = members.find((m) => m.email === email && m.role !== "Owner")
    if (!member) return

    if (!confirm("Are you sure you want to remove this team member?")) return

    try {
      // Note: We need the member ID from the API response
      // For now, we'll just show an alert
      alert("Remove functionality requires member ID from API")
    } catch (error) {
      console.error("Failed to remove team member:", error)
      alert("Failed to remove team member")
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

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
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="teammate@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin - Full access</SelectItem>
                      <SelectItem value="Editor">Editor - Can manage orders</SelectItem>
                      <SelectItem value="Viewer">Viewer - Read-only access</SelectItem>
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
          <CardDescription>{members.length} members in your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.length > 0 ? (
              members.map((member) => (
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleRemove(member.email)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">No team members found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
