"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, ImageIcon, TrendingUp, Link2, Clock, ExternalLink, Trash2, Loader2 } from "lucide-react"
import {
  getAllCaseStudies,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  type CaseStudy,
} from "@/lib/case-studies"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function CaseStudiesManagerPage() {
  const router = useRouter()
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [activeStudyId, setActiveStudyId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const activeStudy = useMemo(
    () => caseStudies.find((s) => s._id === activeStudyId) || null,
    [caseStudies, activeStudyId]
  )

  const loadCaseStudies = async () => {
    try {
      setLoading(true)
      const data = await getAllCaseStudies()
      setCaseStudies(data)
      if (!activeStudyId && data.length > 0) {
        setActiveStudyId(data[0]._id)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load case studies")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCaseStudies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateLocalStudy = (id: string, changes: Partial<CaseStudy>) => {
    setCaseStudies((prev) => prev.map((s) => (s._id === id ? { ...s, ...changes } : s)))
  }

  const handleFieldChange = (field: keyof CaseStudy, value: string | number | boolean) => {
    if (!activeStudy) return
    updateLocalStudy(activeStudy._id, { [field]: value } as Partial<CaseStudy>)
  }

  const handleSave = async () => {
    if (!activeStudy) return
    try {
      setSaving(true)
      await updateCaseStudy(activeStudy._id, {
        client: activeStudy.client,
        name: activeStudy.name || activeStudy.client,
        industry: activeStudy.industry,
        trafficGrowth: activeStudy.trafficGrowth || activeStudy.trafficIncrease,
        trafficIncrease: activeStudy.trafficIncrease || activeStudy.trafficGrowth,
        trafficBefore: activeStudy.trafficBefore,
        trafficAfter: activeStudy.trafficAfter,
        linksBuilt: activeStudy.linksBuilt,
        duration: activeStudy.duration,
        description: activeStudy.description || activeStudy.overview,
        overview: activeStudy.overview || activeStudy.description,
        status: activeStudy.status,
        sortOrder: activeStudy.sortOrder,
      })
      toast.success("Case study saved successfully")
      loadCaseStudies()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save case study")
    } finally {
      setSaving(false)
    }
  }

  const handleAddCaseStudy = async () => {
    try {
      setSaving(true)
      const slug = `case-study-${Date.now()}`
      const caseStudy = await createCaseStudy({
        slug,
        client: "New Client",
        name: "New Case Study",
        industry: "Industry",
        trafficGrowth: "0%",
        linksBuilt: 0,
        duration: "0 months",
        status: "draft",
        sortOrder: caseStudies.length,
      })
      toast.success("Case study created")
      setCaseStudies((prev) => [...prev, caseStudy])
      setActiveStudyId(caseStudy._id)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create case study")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteCaseStudy = async () => {
    if (!activeStudy) return
    if (!confirm(`Are you sure you want to delete "${activeStudy.client}"?`)) return

    try {
      setSaving(true)
      await deleteCaseStudy(activeStudy._id)
      toast.success("Case study deleted")
      const remaining = caseStudies.filter((s) => s._id !== activeStudy._id)
      setCaseStudies(remaining)
      setActiveStudyId(remaining[0]?._id ?? null)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete case study")
    } finally {
      setSaving(false)
    }
  }

  const handleStatusToggle = async (status: "published" | "draft") => {
    if (!activeStudy) return
    updateLocalStudy(activeStudy._id, { status })
    try {
      await updateCaseStudy(activeStudy._id, { status })
      toast.success(`Case study ${status === "published" ? "published" : "unpublished"}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update case study")
      loadCaseStudies()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
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
          <Button variant="outline" onClick={handleAddCaseStudy} disabled={saving}>
            <Plus className="h-4 w-4 mr-2" />
            Add Case Study
          </Button>
          <Button onClick={handleSave} disabled={saving || !activeStudy}>
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
              <CardDescription>{caseStudies.length} total case studies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {caseStudies.map((study) => (
                <div
                  key={study._id}
                  className={`p-3 rounded-lg border transition-colors cursor-pointer ${activeStudyId === study._id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-secondary/50"
                    }`}
                  onClick={() => setActiveStudyId(study._id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{study.name || study.client}</p>
                      <p className="text-xs text-muted-foreground">{study.industry}</p>
                    </div>
                    <Badge variant={study.status === "published" ? "default" : "secondary"}>
                      {study.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {study.trafficGrowth || study.trafficIncrease || "N/A"}
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
          {activeStudy ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Edit: {activeStudy.name || activeStudy.client}</CardTitle>
                    <CardDescription>Update metrics, images, and content</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/case-studies/${activeStudy.slug}`} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Preview
                      </a>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleDeleteCaseStudy} disabled={saving}>
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Client/Project Name</Label>
                    <Input
                      value={activeStudy.name || activeStudy.client}
                      onChange={(e) => {
                        handleFieldChange("name", e.target.value)
                        handleFieldChange("client", e.target.value)
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <Input
                      value={activeStudy.industry}
                      onChange={(e) => handleFieldChange("industry", e.target.value)}
                    />
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      Traffic Growth
                    </Label>
                    <Input
                      value={activeStudy.trafficGrowth || activeStudy.trafficIncrease || ""}
                      onChange={(e) => {
                        handleFieldChange("trafficGrowth", e.target.value)
                        handleFieldChange("trafficIncrease", e.target.value)
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Link2 className="h-4 w-4 text-primary" />
                      Links Built
                    </Label>
                    <Input
                      type="number"
                      value={activeStudy.linksBuilt}
                      onChange={(e) => handleFieldChange("linksBuilt", parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Duration
                    </Label>
                    <Input
                      value={activeStudy.duration}
                      onChange={(e) => handleFieldChange("duration", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Before/After Traffic</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      placeholder="Before (e.g., 241)"
                      value={activeStudy.trafficBefore || ""}
                      onChange={(e) => handleFieldChange("trafficBefore", e.target.value)}
                    />
                    <Input
                      placeholder="After (e.g., 36,000)"
                      value={activeStudy.trafficAfter || ""}
                      onChange={(e) => handleFieldChange("trafficAfter", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Case Study Description</Label>
                  <Textarea
                    rows={4}
                    value={activeStudy.description || activeStudy.overview || ""}
                    onChange={(e) => {
                      handleFieldChange("description", e.target.value)
                      handleFieldChange("overview", e.target.value)
                    }}
                    placeholder="Through strategic link building and content optimization, we helped this client achieve remarkable organic traffic growth..."
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Featured Image URL</Label>
                  <Input
                    value={activeStudy.featuredImage || ""}
                    onChange={(e) => handleFieldChange("featuredImage", e.target.value)}
                    placeholder="/path/to/image.jpg"
                  />
                  {activeStudy.featuredImage && (
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">{activeStudy.featuredImage}</p>
                    </div>
                  )}
                </div>

                {/* Publish Status */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Publish Status</p>
                    <p className="text-sm text-muted-foreground">Make this case study visible on the website</p>
                  </div>
                  <Switch
                    checked={activeStudy.status === "published"}
                    onCheckedChange={(checked) => handleStatusToggle(checked ? "published" : "draft")}
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No case study selected. Select a case study from the list to edit.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
