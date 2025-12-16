"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Save, Trash2, GripVertical, ChevronUp, ChevronDown, Star, ImageIcon, Loader2 } from "lucide-react"
import {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  type Testimonial,
} from "@/lib/testimonials"
import { toast } from "sonner"

export default function TestimonialsManagerPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [activeTestimonialId, setActiveTestimonialId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const activeTestimonial = useMemo(
    () => testimonials.find((t) => t._id === activeTestimonialId) || null,
    [testimonials, activeTestimonialId]
  )

  const loadTestimonials = async () => {
    try {
      setLoading(true)
      const data = await getAllTestimonials()
      setTestimonials(data)
      if (!activeTestimonialId && data.length > 0) {
        setActiveTestimonialId(data[0]._id)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load testimonials")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTestimonials()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateLocalTestimonial = (id: string, changes: Partial<Testimonial>) => {
    setTestimonials((prev) => prev.map((t) => (t._id === id ? { ...t, ...changes } : t)))
  }

  const handleFieldChange = (field: keyof Testimonial, value: string | number | boolean) => {
    if (!activeTestimonial) return
    updateLocalTestimonial(activeTestimonial._id, { [field]: value } as Partial<Testimonial>)
  }

  const handleSave = async () => {
    if (!activeTestimonial) return
    try {
      setSaving(true)
      await updateTestimonial(activeTestimonial._id, {
        name: activeTestimonial.name,
        role: activeTestimonial.role,
        company: activeTestimonial.company,
        quote: activeTestimonial.quote,
        rating: activeTestimonial.rating,
        photo: activeTestimonial.photo,
        visible: activeTestimonial.visible,
        status: activeTestimonial.status,
        sortOrder: activeTestimonial.sortOrder,
      })
      toast.success("Testimonial saved successfully")
      loadTestimonials()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save testimonial")
    } finally {
      setSaving(false)
    }
  }

  const handleAddTestimonial = async () => {
    try {
      setSaving(true)
      const testimonial = await createTestimonial({
        name: "New Client",
        role: "Position",
        company: "Company Name",
        quote: "Add testimonial quote here...",
        rating: 5,
        visible: true,
        sortOrder: testimonials.length,
      })
      toast.success("Testimonial created")
      setTestimonials((prev) => [...prev, testimonial])
      setActiveTestimonialId(testimonial._id)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create testimonial")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteTestimonial = async () => {
    if (!activeTestimonial) return
    if (!confirm(`Are you sure you want to delete testimonial from "${activeTestimonial.name}"?`)) return

    try {
      setSaving(true)
      await deleteTestimonial(activeTestimonial._id)
      toast.success("Testimonial deleted")
      const remaining = testimonials.filter((t) => t._id !== activeTestimonial._id)
      setTestimonials(remaining)
      setActiveTestimonialId(remaining[0]?._id ?? null)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete testimonial")
    } finally {
      setSaving(false)
    }
  }

  const moveTestimonial = async (id: string, direction: "up" | "down") => {
    const index = testimonials.findIndex((t) => t._id === id)
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === testimonials.length - 1)
    ) {
      return
    }

    const newList = [...testimonials]
    const targetIndex = direction === "up" ? index - 1 : index + 1
      ;[newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]]

    // Update sort orders
    newList.forEach((t, i) => {
      t.sortOrder = i
    })

    setTestimonials(newList)

    // Update both testimonials in the backend
    try {
      await Promise.all([
        updateTestimonial(newList[index]._id, { sortOrder: newList[index].sortOrder }),
        updateTestimonial(newList[targetIndex]._id, { sortOrder: newList[targetIndex].sortOrder }),
      ])
      toast.success("Order updated")
    } catch (err) {
      toast.error("Failed to update order")
      loadTestimonials()
    }
  }

  const handleVisibleToggle = async (visible: boolean) => {
    if (!activeTestimonial) return
    updateLocalTestimonial(activeTestimonial._id, { visible })
    try {
      await updateTestimonial(activeTestimonial._id, { visible })
      toast.success(`Testimonial ${visible ? "shown" : "hidden"}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update testimonial")
      loadTestimonials()
    }
  }

  const handleRatingChange = (rating: number) => {
    if (!activeTestimonial) return
    updateLocalTestimonial(activeTestimonial._id, { rating })
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
          <h1 className="text-2xl font-bold">Testimonials Manager</h1>
          <p className="text-muted-foreground">Manage client reviews and testimonials</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddTestimonial} disabled={saving}>
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
          <Button onClick={handleSave} disabled={saving || !activeTestimonial}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Testimonials List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">All Testimonials</CardTitle>
              <CardDescription>Click to reorder display order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial._id}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-colors cursor-pointer ${activeTestimonialId === testimonial._id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-secondary/50"
                    }`}
                  onClick={() => setActiveTestimonialId(testimonial._id)}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{testimonial.company}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        moveTestimonial(testimonial._id, "up")
                      }}
                      disabled={index === 0}
                      className="p-1 hover:bg-secondary rounded disabled:opacity-30"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        moveTestimonial(testimonial._id, "down")
                      }}
                      disabled={index === testimonials.length - 1}
                      className="p-1 hover:bg-secondary rounded disabled:opacity-30"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Testimonial Editor */}
        <div className="lg:col-span-2">
          {activeTestimonial ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit: {activeTestimonial.name}</CardTitle>
                <CardDescription>Update testimonial details and visibility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Client Name</Label>
                    <Input
                      value={activeTestimonial.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role/Position</Label>
                    <Input
                      value={activeTestimonial.role}
                      onChange={(e) => handleFieldChange("role", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    value={activeTestimonial.company}
                    onChange={(e) => handleFieldChange("company", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Testimonial Quote</Label>
                  <Textarea
                    rows={4}
                    value={activeTestimonial.quote}
                    onChange={(e) => handleFieldChange("quote", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRatingChange(star)}
                        className="p-1 hover:bg-secondary rounded"
                      >
                        <Star
                          className={`h-5 w-5 ${star <= activeTestimonial.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Client Photo URL</Label>
                  <Input
                    value={activeTestimonial.photo || ""}
                    onChange={(e) => handleFieldChange("photo", e.target.value)}
                    placeholder="/path/to/photo.jpg"
                  />
                  {activeTestimonial.photo ? (
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                        <img
                          src={activeTestimonial.photo}
                          alt={activeTestimonial.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none"
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Visibility */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Show on Website</p>
                    <p className="text-sm text-muted-foreground">Display this testimonial on the homepage</p>
                  </div>
                  <Switch
                    checked={activeTestimonial.visible}
                    onCheckedChange={handleVisibleToggle}
                  />
                </div>

                {/* Delete */}
                <Button
                  variant="outline"
                  className="text-destructive hover:bg-destructive/10 bg-transparent"
                  onClick={handleDeleteTestimonial}
                  disabled={saving}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Testimonial
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No testimonial selected. Select a testimonial from the list to edit.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
