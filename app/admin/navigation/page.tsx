"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Save, Trash2, GripVertical, ChevronUp, ChevronDown, Menu, Link2 } from "lucide-react"

const headerLinks = [
  { id: 1, label: "Home", href: "/", visible: true },
  { id: 2, label: "Services", href: "/services", visible: true },
  { id: 3, label: "Pricing", href: "/pricing", visible: true },
  { id: 4, label: "Case Studies", href: "/case-studies", visible: true },
  { id: 5, label: "Blog", href: "/blog", visible: true },
  { id: 6, label: "Contact", href: "/contact", visible: true },
]

const footerSections = [
  {
    id: 1,
    title: "Services",
    links: [
      { label: "Link Building", href: "/services/link-building" },
      { label: "Guest Posting", href: "/services/guest-posting" },
      { label: "SEO Consulting", href: "/services/seo-consulting" },
    ],
  },
  {
    id: 2,
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    id: 3,
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refund" },
    ],
  },
]

export default function NavigationManagerPage() {
  const [links, setLinks] = useState(headerLinks)
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 1000)
  }

  const moveLink = (id: number, direction: "up" | "down") => {
    const index = links.findIndex((l) => l.id === id)
    if (direction === "up" && index > 0) {
      const newList = [...links]
      ;[newList[index - 1], newList[index]] = [newList[index], newList[index - 1]]
      setLinks(newList)
    } else if (direction === "down" && index < links.length - 1) {
      const newList = [...links]
      ;[newList[index], newList[index + 1]] = [newList[index + 1], newList[index]]
      setLinks(newList)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Header & Footer</h1>
          <p className="text-muted-foreground">Manage navigation menus and links</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Header Menu */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Menu className="h-5 w-5" />
                  Header Menu
                </CardTitle>
                <CardDescription>Main navigation links</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-3 w-3 mr-1" />
                Add Link
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {links.map((link, index) => (
              <div key={link.id} className="flex items-center gap-2 p-3 border rounded-lg">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                <Input defaultValue={link.label} className="w-28" />
                <Input defaultValue={link.href} className="flex-1" />
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveLink(link.id, "up")}
                    disabled={index === 0}
                    className="p-1 hover:bg-secondary rounded disabled:opacity-30"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => moveLink(link.id, "down")}
                    disabled={index === links.length - 1}
                    className="p-1 hover:bg-secondary rounded disabled:opacity-30"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <Switch defaultChecked={link.visible} />
                  <Button variant="ghost" size="sm" className="text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Header CTAs */}
        <Card>
          <CardHeader>
            <CardTitle>Header CTAs</CardTitle>
            <CardDescription>Call-to-action buttons in header</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg space-y-3">
              <Label>Login Button</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                <Input defaultValue="Log In" placeholder="Button text" />
                <Input defaultValue="/login" placeholder="Link URL" />
              </div>
              <div className="flex items-center gap-2">
                <Switch defaultChecked />
                <span className="text-sm">Visible</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg space-y-3">
              <Label>Sign Up Button</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                <Input defaultValue="Sign Up" placeholder="Button text" />
                <Input defaultValue="/signup" placeholder="Link URL" />
              </div>
              <div className="flex items-center gap-2">
                <Switch defaultChecked />
                <span className="text-sm">Visible</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg space-y-3">
              <Label>Dashboard Button</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                <Input defaultValue="Dashboard" placeholder="Button text" />
                <Input defaultValue="/dashboard" placeholder="Link URL" />
              </div>
              <div className="flex items-center gap-2">
                <Switch defaultChecked />
                <span className="text-sm">Show when logged in</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Sections */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="h-5 w-5" />
                  Footer Sections
                </CardTitle>
                <CardDescription>Manage footer link columns</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-3 w-3 mr-1" />
                Add Section
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {footerSections.map((section) => (
                <div key={section.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <Input defaultValue={section.title} className="font-medium w-32" />
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {section.links.map((link, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input defaultValue={link.label} className="text-sm" />
                        <Input defaultValue={link.href} className="text-sm" />
                        <Button variant="ghost" size="sm" className="text-destructive shrink-0">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Link
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Social Media & Contact</CardTitle>
            <CardDescription>Footer contact information and social links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input defaultValue="hello@backlinkse.com" />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp Number</Label>
                <Input defaultValue="+1 234 567 890" />
              </div>
              <div className="space-y-2">
                <Label>Twitter/X URL</Label>
                <Input defaultValue="https://twitter.com/backlinkse" />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input defaultValue="https://linkedin.com/company/backlinkse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
