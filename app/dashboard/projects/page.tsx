"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, ExternalLink, Edit, Trash2, BarChart3 } from "lucide-react"
import { getAllProjects, deleteProject, Project } from "@/lib/projects"
import { useRouter } from "next/navigation"

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
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalLinksBuilt: 0,
    avgProgress: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await getAllProjects()
      setProjects(data.projects)
      setStats(data.stats)
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    try {
      await deleteProject(id)
      await fetchProjects()
    } catch (error) {
      console.error("Failed to delete project:", error)
      alert("Failed to delete project")
    }
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.domain.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Projects</h1>
          <p className="text-muted-foreground">Manage and track all your link building projects.</p>
        </div>
        <Button onClick={() => router.push("/dashboard/projects/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-sm text-muted-foreground">Total Projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
            <p className="text-sm text-muted-foreground">Active Projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.totalLinksBuilt}</div>
            <p className="text-sm text-muted-foreground">Total Links Built</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.avgProgress}%</div>
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
              <Input
                placeholder="Search projects..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <TableRow key={project._id}>
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
                        <Badge variant={getStatusVariant(project.status) as any}>{project.status}</Badge>
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
                      <TableCell className="text-muted-foreground">
                        {new Date(project.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(project.lastActivity).toLocaleDateString()}
                      </TableCell>
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
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(project._id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No projects found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
