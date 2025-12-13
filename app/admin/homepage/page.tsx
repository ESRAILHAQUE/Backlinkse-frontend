"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GripVertical, Edit, Eye, EyeOff, ChevronDown, ChevronUp, Save, Plus, Trash2, ImageIcon } from "lucide-react"

const sections = [
  { id: "client-logos", name: "Trusted by 500+ Companies", enabled: true },
  { id: "intro", name: "We Build Authoritative Backlinks", enabled: true },
  { id: "results", name: "We Get Results", enabled: true },
  { id: "pricing", name: "Our Link Building Pricing", enabled: true },
  { id: "testimonials", name: "Client Testimonials", enabled: true },
  { id: "comparison", name: "Why Choose Backlinkse", enabled: true },
  { id: "faq", name: "FAQs", enabled: true },
  { id: "cta", name: "Ready to Build Your Authority", enabled: true },
]

export default function HomepageSectionsPage() {
  const [sectionList, setSectionList] = useState(sections)
  const [activeSection, setActiveSection] = useState<string | null>("intro")
  const [saving, setSaving] = useState(false)

  const toggleSection = (id: string) => {
    setSectionList((prev) => prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)))
  }

  const moveSection = (id: string, direction: "up" | "down") => {
    const index = sectionList.findIndex((s) => s.id === id)
    if (direction === "up" && index > 0) {
      const newList = [...sectionList]
      ;[newList[index - 1], newList[index]] = [newList[index], newList[index - 1]]
      setSectionList(newList)
    } else if (direction === "down" && index < sectionList.length - 1) {
      const newList = [...sectionList]
      ;[newList[index], newList[index + 1]] = [newList[index + 1], newList[index]]
      setSectionList(newList)
    }
  }

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 1000)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Homepage Sections</h1>
          <p className="text-muted-foreground">Manage and reorder homepage sections</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
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
              <CardDescription>Drag to reorder or toggle visibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {sectionList.map((section, index) => (
                <div
                  key={section.id}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-colors cursor-pointer ${
                    activeSection === section.id ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                  <span className="flex-1 text-sm font-medium truncate">{section.name}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        moveSection(section.id, "up")
                      }}
                      disabled={index === 0}
                      className="p-1 hover:bg-secondary rounded disabled:opacity-30"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        moveSection(section.id, "down")
                      }}
                      disabled={index === sectionList.length - 1}
                      className="p-1 hover:bg-secondary rounded disabled:opacity-30"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSection(section.id)
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
          <Card>
            <CardHeader>
              <CardTitle>Edit: {sectionList.find((s) => s.id === activeSection)?.name || "Select a section"}</CardTitle>
              <CardDescription>Modify content, images, and settings for this section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {activeSection === "intro" && (
                <>
                  <div className="space-y-2">
                    <Label>Section Badge</Label>
                    <Input defaultValue="Welcome to Backlinkse" />
                  </div>
                  <div className="space-y-2">
                    <Label>Main Heading</Label>
                    <Input defaultValue="We build authoritative backlinks that" />
                  </div>
                  <div className="space-y-2">
                    <Label>Highlighted Text</Label>
                    <Input defaultValue="boost rankings and organic traffic" />
                  </div>
                  <div className="space-y-2">
                    <Label>Description Paragraphs</Label>
                    <Textarea
                      rows={4}
                      defaultValue="Using a process-driven approach with a cutting-edge link building strategy, our link building services significantly improve your search engine rankings and SEO performance."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Section Image</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                      <Button variant="outline" size="sm">
                        Choose Image
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {activeSection === "results" && (
                <>
                  <div className="space-y-2">
                    <Label>Section Label</Label>
                    <Input defaultValue="Case Studies" />
                  </div>
                  <div className="space-y-2">
                    <Label>Main Heading</Label>
                    <Input defaultValue="We get" />
                  </div>
                  <div className="space-y-2">
                    <Label>Highlighted Word</Label>
                    <Input defaultValue="results" />
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <Label>Featured Case Studies</Label>
                      <Button variant="outline" size="sm">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Case Study
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {["Career Guidance Service", "Employee Relocation", "Online Courses", "Snack Delivery"].map(
                        (name) => (
                          <div key={name} className="flex items-center justify-between p-3 border rounded-lg">
                            <span className="text-sm">{name}</span>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </>
              )}

              {activeSection === "pricing" && (
                <>
                  <div className="space-y-2">
                    <Label>Section Heading</Label>
                    <Input defaultValue="Our Link Building Pricing" />
                  </div>
                  <div className="space-y-2">
                    <Label>Section Description</Label>
                    <Textarea
                      rows={2}
                      defaultValue="Choose a plan that fits your growth goals. All plans include white-hat link building with transparent reporting."
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

              {activeSection === "client-logos" && (
                <>
                  <div className="space-y-2">
                    <Label>Section Heading</Label>
                    <Input defaultValue="Trusted by 500+ Companies Worldwide" />
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <Label>Client Logos</Label>
                      <Button variant="outline" size="sm">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Logo
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div
                          key={i}
                          className="aspect-[3/2] border-2 border-dashed border-border rounded-lg flex items-center justify-center hover:bg-secondary/50 cursor-pointer"
                        >
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeSection === "testimonials" && (
                <p className="text-sm text-muted-foreground">
                  Manage testimonials from the{" "}
                  <a href="/admin/testimonials" className="text-primary hover:underline">
                    Testimonials Manager
                  </a>
                </p>
              )}

              {activeSection === "comparison" && (
                <>
                  <div className="space-y-2">
                    <Label>Section Label</Label>
                    <Input defaultValue="Us vs. Competitors" />
                  </div>
                  <div className="space-y-2">
                    <Label>Main Heading</Label>
                    <Input defaultValue="Why choose Backlinkse?" />
                  </div>
                  <div className="pt-4 border-t">
                    <Label className="mb-3 block">Comparison Features</Label>
                    <div className="space-y-2">
                      {["Strategist", "Analysis", "Sustainable", "Relationships", "Big Scale"].map((feature) => (
                        <div key={feature} className="flex items-center justify-between p-2 border rounded">
                          <Input defaultValue={feature} className="border-0 p-0 h-auto" />
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      <Plus className="h-3 w-3 mr-1" />
                      Add Feature
                    </Button>
                  </div>
                </>
              )}

              {activeSection === "faq" && (
                <p className="text-sm text-muted-foreground">
                  Manage FAQs from the{" "}
                  <a href="/admin/faqs" className="text-primary hover:underline">
                    FAQ Manager
                  </a>
                </p>
              )}

              {activeSection === "cta" && (
                <>
                  <div className="space-y-2">
                    <Label>Heading</Label>
                    <Input defaultValue="Ready to Build Your Authority?" />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      rows={2}
                      defaultValue="Join 500+ businesses that trust us to build their online authority through strategic link building."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Button Text</Label>
                    <Input defaultValue="Get Started Today" />
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Button Link</Label>
                    <Input defaultValue="/contact" />
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary Button Text</Label>
                    <Input defaultValue="Book a Call" />
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary Button Link</Label>
                    <Input defaultValue="https://calendly.com/backlinkse" />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
