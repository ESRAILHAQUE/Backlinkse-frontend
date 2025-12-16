"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GripVertical, Edit, Eye, EyeOff, ChevronDown, ChevronUp, Save, Plus, Trash2, ImageIcon, Loader2 } from "lucide-react"
import {
  getAllHomepageSections,
  updateHomepageSection,
  type HomepageSection,
} from "@/lib/homepage"
import { toast } from "sonner"

export default function HomepageSectionsPage() {
  const [sections, setSections] = useState<HomepageSection[]>([])
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const activeSection = useMemo(
    () => sections.find((s) => s.sectionId === activeSectionId) || null,
    [sections, activeSectionId]
  )

  const loadSections = async () => {
    try {
      setLoading(true)
      const data = await getAllHomepageSections()
      setSections(data)
      if (!activeSectionId && data.length > 0) {
        setActiveSectionId(data[0].sectionId)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load homepage sections")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateLocalSection = (id: string, changes: Partial<HomepageSection>) => {
    setSections((prev) => prev.map((s) => (s._id === id ? { ...s, ...changes } : s)))
  }

  const updateContentField = (field: string, value: any) => {
    if (!activeSection) return
    updateLocalSection(activeSection._id, {
      content: { ...activeSection.content, [field]: value },
    })
  }

  const handleSave = async () => {
    if (!activeSection) return
    try {
      setSaving(true)
      await updateHomepageSection(activeSection._id, {
        name: activeSection.name,
        enabled: activeSection.enabled,
        sortOrder: activeSection.sortOrder,
        content: activeSection.content,
      })
      toast.success("Homepage section saved successfully")
      loadSections()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save homepage section")
    } finally {
      setSaving(false)
    }
  }

  const moveSection = async (id: string, direction: "up" | "down") => {
    const section = sections.find((s) => s._id === id)
    if (!section) return

    const index = sections.findIndex((s) => s._id === id)
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === sections.length - 1)
    ) {
      return
    }

    const newList = [...sections]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    const targetSection = newList[targetIndex]

    // Swap sort orders
    const tempOrder = section.sortOrder
    section.sortOrder = targetSection.sortOrder
    targetSection.sortOrder = tempOrder

    // Update in database
    try {
      await Promise.all([
        updateHomepageSection(section._id, { sortOrder: section.sortOrder }),
        updateHomepageSection(targetSection._id, { sortOrder: targetSection.sortOrder }),
      ])
      loadSections()
      toast.success("Order updated")
    } catch (err) {
      toast.error("Failed to update order")
      loadSections()
    }
  }

  const toggleSection = async (id: string) => {
    const section = sections.find((s) => s._id === id)
    if (!section) return

    const newEnabled = !section.enabled
    updateLocalSection(id, { enabled: newEnabled })
    try {
      await updateHomepageSection(id, { enabled: newEnabled })
      toast.success(`Section ${newEnabled ? "enabled" : "disabled"}`)
    } catch (err) {
      toast.error("Failed to update section")
      loadSections()
    }
  }

  const addArrayItem = (field: string, value: string = "") => {
    if (!activeSection) return
    const currentArray = activeSection.content[field] || []
    updateContentField(field, [...currentArray, value])
  }

  const updateArrayItem = (field: string, index: number, value: string) => {
    if (!activeSection) return
    const currentArray = [...(activeSection.content[field] || [])]
    currentArray[index] = value
    updateContentField(field, currentArray)
  }

  const removeArrayItem = (field: string, index: number) => {
    if (!activeSection) return
    const currentArray = [...(activeSection.content[field] || [])]
    currentArray.splice(index, 1)
    updateContentField(field, currentArray)
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
          <h1 className="text-2xl font-bold">Homepage Sections</h1>
          <p className="text-muted-foreground">Manage and reorder homepage sections</p>
        </div>
        <Button onClick={handleSave} disabled={saving || !activeSection}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Section List */}
        <div className="lg:col-span-1 space-y-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Section Order</CardTitle>
              <CardDescription>Click to reorder or toggle visibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {sections.map((section, index) => (
                <div
                  key={section._id}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-colors cursor-pointer ${activeSectionId === section.sectionId
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-secondary/50"
                    }`}
                  onClick={() => setActiveSectionId(section.sectionId)}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                  <span className="flex-1 text-sm font-medium truncate">{section.name}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        moveSection(section._id, "up")
                      }}
                      disabled={index === 0}
                      className="p-1 hover:bg-secondary rounded disabled:opacity-30"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        moveSection(section._id, "down")
                      }}
                      disabled={index === sections.length - 1}
                      className="p-1 hover:bg-secondary rounded disabled:opacity-30"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSection(section._id)
                      }}
                      className="p-1 hover:bg-secondary rounded"
                    >
                      {section.enabled ? (
                        <Eye className="h-3 w-3 text-primary" />
                      ) : (
                        <EyeOff className="h-3 w-3 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Section Editor */}
        <div className="lg:col-span-2">
          {activeSection ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit: {activeSection.name}</CardTitle>
                <CardDescription>Modify content, images, and settings for this section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {activeSection.sectionId === "intro" && (
                  <>
                    <div className="space-y-2">
                      <Label>Section Badge</Label>
                      <Input
                        value={activeSection.content.badge || ""}
                        onChange={(e) => updateContentField("badge", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Main Heading</Label>
                      <Input
                        value={activeSection.content.mainHeading || ""}
                        onChange={(e) => updateContentField("mainHeading", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Highlighted Text</Label>
                      <Input
                        value={activeSection.content.highlightedText || ""}
                        onChange={(e) => updateContentField("highlightedText", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description Paragraphs</Label>
                      <Textarea
                        rows={4}
                        value={activeSection.content.description || ""}
                        onChange={(e) => updateContentField("description", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Section Image URL</Label>
                      <Input
                        value={activeSection.content.sectionImage || ""}
                        onChange={(e) => updateContentField("sectionImage", e.target.value)}
                        placeholder="/path/to/image.jpg"
                      />
                    </div>
                  </>
                )}

                {activeSection.sectionId === "results" && (
                  <>
                    <div className="space-y-2">
                      <Label>Section Label</Label>
                      <Input
                        value={activeSection.content.sectionLabel || ""}
                        onChange={(e) => updateContentField("sectionLabel", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Main Heading</Label>
                      <Input
                        value={activeSection.content.mainHeading || ""}
                        onChange={(e) => updateContentField("mainHeading", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Highlighted Word</Label>
                      <Input
                        value={activeSection.content.highlightedWord || ""}
                        onChange={(e) => updateContentField("highlightedWord", e.target.value)}
                      />
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-3">
                        <Label>Featured Case Studies</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addArrayItem("featuredCaseStudies")}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Case Study
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {(activeSection.content.featuredCaseStudies || []).map((name: string, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <Input
                              value={name}
                              onChange={(e) => updateArrayItem("featuredCaseStudies", index, e.target.value)}
                              className="flex-1"
                            />
                            <div className="flex gap-1 ml-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeArrayItem("featuredCaseStudies", index)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeSection.sectionId === "pricing" && (
                  <>
                    <div className="space-y-2">
                      <Label>Section Heading</Label>
                      <Input
                        value={activeSection.content.heading || ""}
                        onChange={(e) => updateContentField("heading", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Section Description</Label>
                      <Textarea
                        rows={2}
                        value={activeSection.content.description || ""}
                        onChange={(e) => updateContentField("description", e.target.value)}
                      />
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-3">
                        For detailed pricing management, go to{" "}
                        <a href="/admin/pricing" className="text-primary hover:underline">
                          Pricing Manager
                        </a>
                      </p>
                    </div>
                  </>
                )}

                {activeSection.sectionId === "client-logos" && (
                  <>
                    <div className="space-y-2">
                      <Label>Section Heading</Label>
                      <Input
                        value={activeSection.content.heading || ""}
                        onChange={(e) => updateContentField("heading", e.target.value)}
                      />
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-3">
                        <Label>Client Logos</Label>
                        <Button variant="outline" size="sm" onClick={() => addArrayItem("logos")}>
                          <Plus className="h-3 w-3 mr-1" />
                          Add Logo
                        </Button>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {(activeSection.content.logos || []).map((logo: string, index: number) => (
                          <div key={index} className="aspect-3/2 border rounded-lg p-2">
                            <Input
                              value={logo}
                              onChange={(e) => updateArrayItem("logos", index, e.target.value)}
                              placeholder="/logo.jpg"
                              className="text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeSection.sectionId === "testimonials" && (
                  <p className="text-sm text-muted-foreground">
                    Manage testimonials from the{" "}
                    <a href="/admin/testimonials" className="text-primary hover:underline">
                      Testimonials Manager
                    </a>
                  </p>
                )}

                {activeSection.sectionId === "comparison" && (
                  <>
                    <div className="space-y-2">
                      <Label>Section Label</Label>
                      <Input
                        value={activeSection.content.sectionLabel || ""}
                        onChange={(e) => updateContentField("sectionLabel", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Main Heading</Label>
                      <Input
                        value={activeSection.content.mainHeading || ""}
                        onChange={(e) => updateContentField("mainHeading", e.target.value)}
                      />
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-3">
                        <Label>Comparison Features</Label>
                        <Button variant="outline" size="sm" onClick={() => addArrayItem("features")}>
                          <Plus className="h-3 w-3 mr-1" />
                          Add Feature
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {(activeSection.content.features || []).map((feature: string, index: number) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <Input
                              value={feature}
                              onChange={(e) => updateArrayItem("features", index, e.target.value)}
                              className="border-0 p-0 h-auto"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive"
                              onClick={() => removeArrayItem("features", index)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeSection.sectionId === "faq" && (
                  <p className="text-sm text-muted-foreground">
                    Manage FAQs from the{" "}
                    <a href="/admin/faqs" className="text-primary hover:underline">
                      FAQ Manager
                    </a>
                  </p>
                )}

                {activeSection.sectionId === "cta" && (
                  <>
                    <div className="space-y-2">
                      <Label>Heading</Label>
                      <Input
                        value={activeSection.content.heading || ""}
                        onChange={(e) => updateContentField("heading", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        rows={2}
                        value={activeSection.content.description || ""}
                        onChange={(e) => updateContentField("description", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Primary Button Text</Label>
                      <Input
                        value={activeSection.content.primaryButtonText || ""}
                        onChange={(e) => updateContentField("primaryButtonText", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Primary Button Link</Label>
                      <Input
                        value={activeSection.content.primaryButtonLink || ""}
                        onChange={(e) => updateContentField("primaryButtonLink", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary Button Text</Label>
                      <Input
                        value={activeSection.content.secondaryButtonText || ""}
                        onChange={(e) => updateContentField("secondaryButtonText", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary Button Link</Label>
                      <Input
                        value={activeSection.content.secondaryButtonLink || ""}
                        onChange={(e) => updateContentField("secondaryButtonLink", e.target.value)}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No section selected. Select a section from the list to edit.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
