"use client"

import { useState, useEffect } from "react"
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
  RefreshCcw,
  Loader2,
} from "lucide-react"
import { getAdminDashboardStats, getAdminRecentActivity, type AdminDashboardStats, type RecentActivity } from "@/lib/admin-dashboard"
import { toast } from "sonner"

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

const statIcons = {
  totalUsers: Users,
  totalOrders: ShoppingCart,
  activeProjects: FolderKanban,
  supportTickets: LifeBuoy,
  monthlyRevenue: DollarSign,
  websiteTraffic: TrendingUp,
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminDashboardStats['stats'] | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [statsData, activityData] = await Promise.all([
        getAdminDashboardStats(),
        getAdminRecentActivity(),
      ])
      setStats(statsData.stats)
      setRecentActivity(activityData.activities)
    } catch (err) {
      console.error("Error fetching dashboard data:", err)
      toast.error(err instanceof Error ? err.message : "Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const statsArray = stats
    ? [
        {
          title: "Total Users",
          value: stats.totalUsers.value,
          change: stats.totalUsers.change,
          trend: stats.totalUsers.trend,
          icon: statIcons.totalUsers,
        },
        {
          title: "Total Orders",
          value: stats.totalOrders.value,
          change: stats.totalOrders.change,
          trend: stats.totalOrders.trend,
          icon: statIcons.totalOrders,
        },
        {
          title: "Active Projects",
          value: stats.activeProjects.value,
          change: stats.activeProjects.change,
          trend: stats.activeProjects.trend,
          icon: statIcons.activeProjects,
        },
        {
          title: "Support Tickets",
          value: stats.supportTickets.value,
          change: stats.supportTickets.change,
          trend: stats.supportTickets.trend,
          icon: statIcons.supportTickets,
        },
        {
          title: "Monthly Revenue",
          value: stats.monthlyRevenue.value,
          change: stats.monthlyRevenue.change,
          trend: stats.monthlyRevenue.trend,
          icon: statIcons.monthlyRevenue,
        },
        {
          title: "Website Traffic",
          value: stats.websiteTraffic.value,
          change: stats.websiteTraffic.change,
          trend: stats.websiteTraffic.trend,
          icon: statIcons.websiteTraffic,
        },
      ]
    : []

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back. Here's an overview of your website performance.</p>
        </div>
        <Button variant="outline" onClick={fetchDashboardData} disabled={loading}>
          <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {statsArray.map((stat) => (
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
      )}

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
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="h-4 bg-secondary rounded w-3/4 mb-2 animate-pulse" />
                      <div className="h-3 bg-secondary rounded w-1/2 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentActivity.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">No recent activity</div>
            ) : (
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
            )}
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
