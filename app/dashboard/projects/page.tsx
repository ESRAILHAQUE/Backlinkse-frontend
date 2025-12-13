import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, ExternalLink, Edit, Trash2, BarChart3 } from "lucide-react"

const projects = [
  {
    id: "PRJ-001",
    name: "TechStartup.io",
    domain: "techstartup.io",
    status: "Active",
    linksBuilt: 45,
    targetLinks: 100,
    startDate: "Oct 15, 2024",
    lastActivity: "2 hours ago",
  },
  {
    id: "PRJ-002",
    name: "HealthCare Plus",
    domain: "healthcareplus.com",
    status: "Active",
    linksBuilt: 78,
    targetLinks: 150,
    startDate: "Sep 1, 2024",
    lastActivity: "1 day ago",
  },
  {
    id: "PRJ-003",
    name: "E-Commerce Store",
    domain: "myecomstore.com",
    status: "Paused",
    linksBuilt: 32,
    targetLinks: 50,
    startDate: "Nov 1, 2024",
    lastActivity: "5 days ago",
  },
  {
    id: "PRJ-004",
    name: "SaaS Dashboard",
    domain: "saasapp.co",
    status: "Active",
    linksBuilt: 120,
    targetLinks: 200,
    startDate: "Jul 20, 2024",
    lastActivity: "3 hours ago",
  },
  {
    id: "PRJ-005",
    name: "Legal Services",
    domain: "legalfirm.law",
    status: "Completed",
    linksBuilt: 50,
    targetLinks: 50,
    startDate: "Jun 1, 2024",
    lastActivity: "2 weeks ago",
  },
]

function getStatusVariant(status: string) {
  switch (status) {
    case "Active":
      return "default"
    case "Paused":
      return "secondary"
    case "Completed":
      return "outline"
    default:
      return "secondary"
  }
}

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Projects</h1>
          <p className="text-muted-foreground">Manage and track all your link building projects.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">Total Projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Active Projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">325</div>
            <p className="text-sm text-muted-foreground">Total Links Built</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">59%</div>
            <p className="text-sm text-muted-foreground">Avg. Progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>All Projects</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search projects..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          {project.domain}
                          <ExternalLink className="h-3 w-3" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(project.status)}>{project.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          {project.linksBuilt} / {project.targetLinks} links
                        </div>
                        <div className="h-1.5 w-24 rounded-full bg-secondary">
                          <div
                            className="h-1.5 rounded-full bg-primary"
                            style={{ width: `${(project.linksBuilt / project.targetLinks) * 100}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{project.startDate}</TableCell>
                    <TableCell className="text-muted-foreground">{project.lastActivity}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Report
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
