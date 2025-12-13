"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Users,
  ShoppingCart,
  FolderKanban,
  LifeBuoy,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Home,
  Briefcase,
  FileText,
  Settings,
  Eye,
  Clock,
} from "lucide-react"

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Active Projects",
    value: "456",
    change: "+15.3%",
    trend: "up",
    icon: FolderKanban,
  },
  {
    title: "Support Tickets",
    value: "23",
    change: "-5.1%",
    trend: "down",
    icon: LifeBuoy,
  },
  {
    title: "Monthly Revenue",
    value: "$128,450",
    change: "+22.4%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Website Traffic",
    value: "45.2K",
    change: "+18.7%",
    trend: "up",
    icon: TrendingUp,
  },
]

const quickActions = [
  { name: "Edit Homepage", href: "/admin/homepage", icon: Home },
  { name: "Manage Services", href: "/admin/services", icon: Briefcase },
  { name: "View Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Manage Users", href: "/admin/users", icon: Users },
  { name: "Support Tickets", href: "/admin/support", icon: LifeBuoy },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText },
  { name: "Theme Settings", href: "/admin/theme", icon: Settings },
  { name: "View Website", href: "/", icon: Eye },
]

const recentActivity = [
  { action: "New user registered", user: "john@example.com", time: "2 minutes ago" },
  { action: "Order #1234 placed", user: "sarah@company.com", time: "15 minutes ago" },
  { action: "Support ticket opened", user: "mike@startup.io", time: "32 minutes ago" },
  { action: "Case study published", user: "Admin", time: "1 hour ago" },
  { action: "New subscription", user: "lisa@business.com", time: "2 hours ago" },
  { action: "Blog post updated", user: "Admin", time: "3 hours ago" },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here's an overview of your website performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                  {stat.trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Shortcuts to common admin tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Button
                  key={action.name}
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center gap-2 bg-transparent hover:bg-secondary"
                  asChild
                >
                  <Link href={action.href}>
                    <action.icon className="h-5 w-5 text-primary" />
                    <span className="text-xs">{action.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Overview Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Website Traffic Overview</CardTitle>
          <CardDescription>Visitors over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Traffic analytics chart will be displayed here</p>
              <p className="text-xs text-muted-foreground mt-1">Connect Google Analytics for real data</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
