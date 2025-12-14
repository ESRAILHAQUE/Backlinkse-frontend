"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MoreHorizontal, Eye, Ban, Trash2, Mail, UserPlus, Download, RefreshCcw } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getAllUsers, deleteUser, type User } from "@/lib/users"

interface UserWithExtras extends User {
  plan?: string
  status?: string
  orders?: number
  joined?: string
}

export default function UsersManagerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState<UserWithExtras[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>("")

  const fetchUsers = async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await getAllUsers()
      // Transform backend users to match frontend format
      const transformedUsers: UserWithExtras[] = response.users.map((user) => ({
        ...user,
        plan: "Growth", // Default plan - can be extended when backend supports it
        status: "active", // Default status - can be extended when backend supports it
        orders: 0, // Default orders - can be extended when backend supports it
        joined: user.createdAt ? new Date(user.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      }))
      setUsers(transformedUsers)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users")
      console.error("Error fetching users:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    try {
      await deleteUser(id)
      await fetchUsers() // Refresh the list
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete user")
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage all registered users</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchUsers} disabled={isLoading}>
            <RefreshCcw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">{isLoading ? "..." : users.length}</p>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">
              {isLoading ? "..." : users.filter((u) => u.status === "active").length}
            </p>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">
              {isLoading
                ? "..."
                : users.filter((u) => {
                  const joinedDate = u.joined ? new Date(u.joined) : new Date()
                  const now = new Date()
                  return joinedDate.getMonth() === now.getMonth() && joinedDate.getFullYear() === now.getFullYear()
                }).length}
            </p>
            <p className="text-sm text-muted-foreground">New This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">
              {isLoading ? "..." : users.filter((u) => u.status === "suspended").length}
            </p>
            <p className="text-sm text-muted-foreground">Suspended</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>View and manage user accounts</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Plan</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Orders</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Joined</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      Loading users...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b last:border-0 hover:bg-secondary/30">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{user.plan || "N/A"}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={user.status === "active" ? "default" : "destructive"}>
                          {user.status || "active"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{user.orders || 0}</td>
                      <td className="py-3 px-4 text-muted-foreground">{user.joined || "N/A"}</td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Ban className="h-4 w-4 mr-2" />
                              {user.status === "active" ? "Suspend" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteUser(user._id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
