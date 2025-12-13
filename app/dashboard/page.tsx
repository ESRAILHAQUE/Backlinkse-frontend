import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link2, TrendingUp, Globe, ArrowUpRight, Clock } from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Total Backlinks", value: "47", change: "+12 this month", icon: Link2 },
  { label: "Avg Domain Rating", value: "54", change: "+3 from last month", icon: TrendingUp },
  { label: "Active Campaigns", value: "2", change: "1 completing soon", icon: Globe },
  { label: "Est. Traffic Value", value: "$23.4K", change: "+18% growth", icon: ArrowUpRight },
]

const recentActivity = [
  { action: "New backlink placed", site: "techcrunch.com", dr: 94, time: "2 hours ago" },
  { action: "Report generated", site: "December 2024", dr: null, time: "1 day ago" },
  { action: "New backlink placed", site: "searchenginejournal.com", dr: 88, time: "3 days ago" },
  { action: "Order completed", site: "Growth Package Q4", dr: null, time: "5 days ago" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, John. Here's your link building overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
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
        <Card>
          <CardHeader>
            <CardTitle>Campaign Progress</CardTitle>
            <CardDescription>Growth Package - Q4 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Links Delivered</span>
              <span className="font-medium">12 / 15</span>
            </div>
            <div className="h-2 rounded-full bg-secondary">
              <div className="h-2 rounded-full bg-primary" style={{ width: "80%" }} />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Next report: Dec 15, 2024</span>
              <span>3 remaining</span>
            </div>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/dashboard/orders">View Order Details</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
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
              ))}
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
