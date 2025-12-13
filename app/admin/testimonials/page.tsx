"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Save, Trash2, GripVertical, ChevronUp, ChevronDown, Star, ImageIcon } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechStart Inc.",
    quote: "Backlinkse transformed our SEO strategy. We saw a 340% increase in organic traffic within 6 months.",
    rating: 5,
    visible: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "GrowthLabs",
    quote: "The quality of backlinks they deliver is exceptional. Our domain authority increased from 25 to 52.",
    rating: 5,
    visible: true,
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Head of Digital",
    company: "E-Commerce Plus",
    quote: "Professional team, transparent reporting, and real results. Highly recommend their services.",
    rating: 5,
    visible: true,
  },
]

export default function TestimonialsManagerPage() {
  const [items, setItems] = useState(testimonials)
  const [activeItem, setActiveItem] = useState<number | null>(1)
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 1000)
  }

  const moveItem = (id: number, direction: "up" | "down") => {
    const index = items.findIndex((i) => i.id === id)
    if (direction === "up" && index > 0) {
      const newList = [...items]
      ;[newList[index - 1], newList[index]] = [newList[index], newList[index - 1]]
      setItems(newList)
    } else if (direction === "down" && index < items.length - 1) {
      const newList = [...items]
      ;[newList[index], newList[index + 1]] = [newList[index + 1], newList[index]]
      setItems(newList)
    }
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
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
          <Button onClick={handleSave} disabled={saving}>
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
              <CardDescription>Drag to reorder display order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-colors cursor-pointer ${
                    activeItem === item.id ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"
                  }`}
                  onClick={() => setActiveItem(item.id)}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.company}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        moveItem(item.id, "up")
                      }}
                      disabled={index === 0}
                      className="p-1 hover:bg-secondary rounded disabled:opacity-30"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        moveItem(item.id, "down")
                      }}
                      disabled={index === items.length - 1}
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
          <Card>
            <CardHeader>
              <CardTitle>Edit: {items.find((i) => i.id === activeItem)?.name || "Select a testimonial"}</CardTitle>
              <CardDescription>Update testimonial details and visibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Client Name</Label>
                  <Input defaultValue={items.find((i) => i.id === activeItem)?.name} />
                </div>
                <div className="space-y-2">
                  <Label>Role/Position</Label>
                  <Input defaultValue={items.find((i) => i.id === activeItem)?.role} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input defaultValue={items.find((i) => i.id === activeItem)?.company} />
              </div>

              <div className="space-y-2">
                <Label>Testimonial Quote</Label>
                <Textarea rows={4} defaultValue={items.find((i) => i.id === activeItem)?.quote} />
              </div>

              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="p-1 hover:bg-secondary rounded">
                      <Star
                        className={`h-5 w-5 ${
                          star <= (items.find((i) => i.id === activeItem)?.rating || 0)
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
                <Label>Client Photo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <Button variant="outline" size="sm">
                    Upload Photo
                  </Button>
                </div>
              </div>

              {/* Visibility */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Show on Website</p>
                  <p className="text-sm text-muted-foreground">Display this testimonial on the homepage</p>
                </div>
                <Switch defaultChecked={items.find((i) => i.id === activeItem)?.visible} />
              </div>

              {/* Delete */}
              <Button variant="outline" className="text-destructive hover:bg-destructive/10 bg-transparent">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Testimonial
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
