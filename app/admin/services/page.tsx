"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Edit,
  Trash2,
  Save,
  ExternalLink,
  DollarSign,
  FileText,
  Link2,
  Award,
  PenTool,
  Package,
} from "lucide-react"

const services = [
  {
    id: "link-building",
    name: "Monthly Link Building Packages",
    slug: "/services/link-building",
    status: "published",
    icon: Link2,
    packages: 4,
  },
  {
    id: "guest-posting",
    name: "Guest Posting Packages",
    slug: "/services/guest-posting",
    status: "published",
    icon: FileText,
    packages: 3,
  },
  {
    id: "seo-blog-writing",
    name: "SEO Blog Writing Services",
    slug: "/services/seo-blog-writing",
    status: "published",
    icon: PenTool,
    packages: 3,
  },
  {
    id: "link-insertions",
    name: "Link Insertions",
    slug: "/services/link-insertions",
    status: "published",
    icon: Package,
    packages: 3,
  },
  {
    id: "platinum-links",
    name: "Platinum Links",
    slug: "/services/platinum-links",
    status: "published",
    icon: Award,
    packages: 3,
  },
]

export default function ServicesManagerPage() {
  const [activeService, setActiveService] = useState<string | null>("link-building")
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
          <h1 className="text-2xl font-bold">Services Manager</h1>
          <p className="text-muted-foreground">Manage all service pages and packages</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Service List */}
        <div className="lg:col-span-1 space-y-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">All Services</CardTitle>
              <CardDescription>Click to edit service details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                    activeService === service.id ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"
                  }`}
                  onClick={() => setActiveService(service.id)}
                >
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <service.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{service.name}</p>
                    <p className="text-xs text-muted-foreground">{service.packages} packages</p>
                  </div>
                  <Badge variant={service.status === "published" ? "default" : "secondary"}>{service.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Service Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    Edit: {services.find((s) => s.id === activeService)?.name || "Select a service"}
                  </CardTitle>
                  <CardDescription>Modify service details, pricing, and packages</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={services.find((s) => s.id === activeService)?.slug} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Preview
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Service Name</Label>
                  <Input defaultValue={services.find((s) => s.id === activeService)?.name} />
                </div>
                <div className="space-y-2">
                  <Label>URL Slug</Label>
                  <Input defaultValue={services.find((s) => s.id === activeService)?.slug} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Service Description</Label>
                <Textarea
                  rows={3}
                  defaultValue="Build high-quality backlinks from authoritative websites in your niche. Our white-hat link building strategies help improve your search rankings."
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Publish Status</p>
                  <p className="text-sm text-muted-foreground">Make this service visible on the website</p>
                </div>
                <Switch defaultChecked />
              </div>

              {/* Packages Section */}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base">Pricing Packages</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Package
                  </Button>
                </div>
                <div className="space-y-3">
                  {["Starter", "Professional", "Enterprise"].map((pkg, index) => (
                    <div key={pkg} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Input defaultValue={pkg} className="font-medium w-40" />
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <Input defaultValue={[499, 999, 1999][index]} className="w-24" type="number" />
                            <span className="text-sm text-muted-foreground">/mo</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
