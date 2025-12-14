"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Calendar, TrendingUp } from "lucide-react"
import { getAllReports, Report } from "@/lib/reports"

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [stats, setStats] = useState({
    totalReports: 0,
    linksThisYear: 0,
    avgMonthlyLinks: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      setLoading(true)
      const data = await getAllReports()
      setReports(data.reports)
      setStats(data.stats)
    } catch (error) {
      console.error("Failed to fetch reports:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Download and review your campaign reports.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Reports</CardDescription>
            <CardTitle className="text-3xl">{stats.totalReports}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Available for download</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Links This Year</CardDescription>
            <CardTitle className="text-3xl">{stats.linksThisYear}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-primary">+45% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Monthly Links</CardDescription>
            <CardTitle className="text-3xl">{stats.avgMonthlyLinks}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Based on current plan</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
          <CardDescription>Your campaign performance reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.length > 0 ? (
              reports.map((report) => (
                <div
                  key={report._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{report.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(report.reportDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {report.linksCount} links
                        </span>
                        <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{report.type}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant={report.status === "Ready" ? "default" : "outline"}
                    size="sm"
                    disabled={report.status !== "Ready"}
                    onClick={() => {
                      if (report.fileUrl) {
                        window.open(report.fileUrl, "_blank")
                      }
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {report.status === "Ready" ? "Download PDF" : report.status}
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">No reports available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
