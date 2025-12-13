import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Calendar, TrendingUp } from "lucide-react"

const reports = [
  { name: "December 2024 Report", type: "Monthly", date: "Dec 1, 2024", links: 8, status: "In Progress" },
  { name: "November 2024 Report", type: "Monthly", date: "Nov 1, 2024", links: 12, status: "Ready" },
  { name: "Q3 2024 Summary", type: "Quarterly", date: "Oct 1, 2024", links: 38, status: "Ready" },
  { name: "October 2024 Report", type: "Monthly", date: "Oct 1, 2024", links: 14, status: "Ready" },
  { name: "September 2024 Report", type: "Monthly", date: "Sep 1, 2024", links: 12, status: "Ready" },
  { name: "August 2024 Report", type: "Monthly", date: "Aug 1, 2024", links: 12, status: "Ready" },
]

export default function ReportsPage() {
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
            <CardTitle className="text-3xl">{reports.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Available for download</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Links This Year</CardDescription>
            <CardTitle className="text-3xl">96</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-primary">+45% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Monthly Links</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
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
            {reports.map((report) => (
              <div
                key={report.name}
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
                        {report.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {report.links} links
                      </span>
                      <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{report.type}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant={report.status === "Ready" ? "default" : "outline"}
                  size="sm"
                  disabled={report.status !== "Ready"}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {report.status === "Ready" ? "Download PDF" : report.status}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
