"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, ImageIcon, TrendingUp, Link2, Clock, ExternalLink } from "lucide-react"

const caseStudies = [
  {
    id: 1,
    name: "Career Guidance Service",
    industry: "Education",
    trafficGrowth: "14,582%",
    linksBuilt: 551,
    duration: "12 months",
    status: "published",
  },
  {
    id: 2,
    name: "Employee Relocation Service",
    industry: "HR/Corporate",
    trafficGrowth: "6,098%",
    linksBuilt: 262,
    duration: "24 months",
    status: "published",
  },
  {
    id: 3,
    name: "Online Courses Platform",
    industry: "EdTech",
    trafficGrowth: "84%",
    linksBuilt: 682,
    duration: "24 months",
    status: "published",
  },
  {
    id: 4,
    name: "Snack Delivery Service",
    industry: "E-Commerce",
    trafficGrowth: "2,341%",
    linksBuilt: 423,
    duration: "18 months",
    status: "draft",
  },
]

export default function CaseStudiesManagerPage() {
  const [studies, setStudies] = useState(caseStudies)
  const [activeStudy, setActiveStudy] = useState<number | null>(1)
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 1000)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Case Studies Manager</h1>
          <p className="text-muted-foreground">Manage client success stories and metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Case Study
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Case Studies List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">All Case Studies</CardTitle>
              <CardDescription>{studies.length} total case studies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {studies.map((study) => (
                <div
                  key={study.id}
                  className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                    activeStudy === study.id ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"
                  }`}
                  onClick={() => setActiveStudy(study.id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{study.name}</p>
                      <p className="text-xs text-muted-foreground">{study.industry}</p>
                    </div>
                    <Badge variant={study.status === "published" ? "default" : "secondary"}>{study.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {study.trafficGrowth}
                    </span>
                    <span className="flex items-center gap-1">
                      <Link2 className="h-3 w-3" />
                      {study.linksBuilt}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Case Study Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    Edit: {studies.find((s) => s.id === activeStudy)?.name || "Select a case study"}
                  </CardTitle>
                  <CardDescription>Update metrics, images, and content</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="/case-studies" target="_blank" rel="noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Preview
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Client/Project Name</Label>
                  <Input defaultValue={studies.find((s) => s.id === activeStudy)?.name} />
                </div>
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Input defaultValue={studies.find((s) => s.id === activeStudy)?.industry} />
                </div>
              </div>

              {/* Metrics */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Traffic Growth
                  </Label>
                  <Input defaultValue={studies.find((s) => s.id === activeStudy)?.trafficGrowth} />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-primary" />
                    Links Built
                  </Label>
                  <Input type="number" defaultValue={studies.find((s) => s.id === activeStudy)?.linksBuilt} />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Duration
                  </Label>
                  <Input defaultValue={studies.find((s) => s.id === activeStudy)?.duration} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Before/After Traffic</Label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input placeholder="Before (e.g., 241)" defaultValue="241" />
                  <Input placeholder="After (e.g., 36,000)" defaultValue="36,000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Case Study Description</Label>
                <Textarea
                  rows={4}
                  defaultValue="Through strategic link building and content optimization, we helped this client achieve remarkable organic traffic growth..."
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Featured Image</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Upload a screenshot or chart showing results</p>
                  <Button variant="outline" size="sm">
                    Choose Image
                  </Button>
                </div>
              </div>

              {/* Publish Status */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Publish Status</p>
                  <p className="text-sm text-muted-foreground">Make this case study visible on the website</p>
                </div>
                <Switch defaultChecked={studies.find((s) => s.id === activeStudy)?.status === "published"} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
