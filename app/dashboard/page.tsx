"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link2, TrendingUp, Globe, ArrowUpRight, Clock } from "lucide-react"
import Link from "next/link"
import { getDashboardStats, getRecentActivity, getCampaignProgress } from "@/lib/dashboard"
import { Activity, CampaignProgress } from "@/lib/dashboard"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalBacklinks: 0,
    avgDomainRating: 0,
    activeCampaigns: 0,
    estTrafficValue: "$0K",
    backlinksChange: "",
  })
  const [recentActivity, setRecentActivity] = useState<Activity[]>([])
  const [campaign, setCampaign] = useState<CampaignProgress | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [statsData, activityData, campaignData] = await Promise.all([
          getDashboardStats(),
          getRecentActivity(),
          getCampaignProgress(),
        ])
        setStats(statsData)
        setRecentActivity(activityData)
        setCampaign(campaignData)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const statsList = [
    { label: "Total Backlinks", value: stats.totalBacklinks.toString(), change: stats.backlinksChange, icon: Link2 },
    { label: "Avg Domain Rating", value: stats.avgDomainRating.toString(), change: "+3 from last month", icon: TrendingUp },
    { label: "Active Campaigns", value: stats.activeCampaigns.toString(), change: "1 completing soon", icon: Globe },
    { label: "Est. Traffic Value", value: stats.estTrafficValue, change: "+18% growth", icon: ArrowUpRight },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here's your link building overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsList.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-primary">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Campaign Progress */}
        {campaign && (
          <Card>
            <CardHeader>
              <CardTitle>Campaign Progress</CardTitle>
              <CardDescription>{campaign.packageName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Links Delivered</span>
                <span className="font-medium">{campaign.linksDelivered} / {campaign.linksTotal}</span>
              </div>
              <div className="h-2 rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${campaign.progress}%` }} />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Next report: {new Date(campaign.nextReportDate).toLocaleDateString()}</span>
                <span>{campaign.remaining} remaining</span>
              </div>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/dashboard/orders">View Order Details</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{item.action}</p>
                      <p className="text-xs text-muted-foreground">{item.site}</p>
                    </div>
                    <div className="text-right">
                      {item.dr && (
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          DR {item.dr}
                        </span>
                      )}
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent" asChild>
              <Link href="/dashboard/link-building">
                <Link2 className="h-5 w-5" />
                <span>Order Links</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent" asChild>
              <Link href="/dashboard/reports">
                <TrendingUp className="h-5 w-5" />
                <span>View Reports</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent" asChild>
              <Link href="/dashboard/support">
                <Globe className="h-5 w-5" />
                <span>Get Support</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent" asChild>
              <Link href="/dashboard/team">
                <ArrowUpRight className="h-5 w-5" />
                <span>Add Team Member</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
