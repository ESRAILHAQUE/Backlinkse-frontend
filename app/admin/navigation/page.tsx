"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Save, Trash2, ChevronUp, ChevronDown, Menu, Link2 } from "lucide-react"
import { getActiveNavigation, updateActiveNavigation, type Navigation, type NavigationLink, type FooterSection } from "@/lib/navigation"
import { toast } from "sonner"

export default function NavigationManagerPage() {
  const [navigation, setNavigation] = useState<Navigation | null>(null)
  const [headerLinks, setHeaderLinks] = useState<NavigationLink[]>([])
  const [loginButton, setLoginButton] = useState({ text: "Log In", href: "/login", visible: true })
  const [signUpButton, setSignUpButton] = useState({ text: "Sign Up", href: "/signup", visible: true })
  const [dashboardButton, setDashboardButton] = useState({ text: "Dashboard", href: "/dashboard", visible: true, showWhenLoggedIn: true })
  const [footerSections, setFooterSections] = useState<FooterSection[]>([])
  const [contactEmail, setContactEmail] = useState("")
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [twitterUrl, setTwitterUrl] = useState("")
  const [linkedInUrl, setLinkedInUrl] = useState("")
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNavigation()
  }, [])

  const fetchNavigation = async () => {
    try {
      setLoading(true)
      const data = await getActiveNavigation()
      setNavigation(data)
      setHeaderLinks(data.headerLinks || [])
      setLoginButton(data.loginButton || { text: "Log In", href: "/login", visible: true })
      setSignUpButton(data.signUpButton || { text: "Sign Up", href: "/signup", visible: true })
      setDashboardButton(data.dashboardButton ? { ...data.dashboardButton, showWhenLoggedIn: data.dashboardButton.showWhenLoggedIn ?? false } : { text: "Dashboard", href: "/dashboard", visible: true, showWhenLoggedIn: true })
      setFooterSections(data.footerSections || [])
      setContactEmail(data.contactEmail || "")
      setWhatsappNumber(data.whatsappNumber || "")
      setTwitterUrl(data.twitterUrl || "")
      setLinkedInUrl(data.linkedInUrl || "")
    } catch (err) {
      console.error("Error fetching navigation:", err)
      toast.error(err instanceof Error ? err.message : "Failed to load navigation")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const updatedNavigation = await updateActiveNavigation({
        headerLinks,
        loginButton,
        signUpButton,
        dashboardButton,
        footerSections,
        contactEmail,
        whatsappNumber,
        twitterUrl,
        linkedInUrl,
      })
      setNavigation(updatedNavigation)
      toast.success("Navigation updated successfully!")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save navigation")
    } finally {
      setSaving(false)
    }
  }

  const updateHeaderLink = (index: number, field: "label" | "href" | "visible", value: string | boolean) => {
    const newLinks = [...headerLinks]
    newLinks[index] = { ...newLinks[index], [field]: value }
    setHeaderLinks(newLinks)
  }

  const moveLink = (index: number, direction: "up" | "down") => {
    const newList = [...headerLinks]
    if (direction === "up" && index > 0) {
      ;[newList[index - 1], newList[index]] = [newList[index], newList[index - 1]]
      setHeaderLinks(newList)
    } else if (direction === "down" && index < newList.length - 1) {
      ;[newList[index], newList[index + 1]] = [newList[index + 1], newList[index]]
      setHeaderLinks(newList)
    }
  }

  const addHeaderLink = () => {
    setHeaderLinks([...headerLinks, { label: "New Link", href: "/", visible: true }])
  }

  const removeHeaderLink = (index: number) => {
    setHeaderLinks(headerLinks.filter((_, i) => i !== index))
  }

  const updateFooterSection = (sectionIndex: number, field: "title", value: string) => {
    const newSections = [...footerSections]
    newSections[sectionIndex] = { ...newSections[sectionIndex], [field]: value }
    setFooterSections(newSections)
  }

  const updateFooterLink = (sectionIndex: number, linkIndex: number, field: "label" | "href", value: string) => {
    const newSections = [...footerSections]
    newSections[sectionIndex].links[linkIndex] = { ...newSections[sectionIndex].links[linkIndex], [field]: value }
    setFooterSections(newSections)
  }

  const addFooterLink = (sectionIndex: number) => {
    const newSections = [...footerSections]
    newSections[sectionIndex].links.push({ label: "New Link", href: "/" })
    setFooterSections(newSections)
  }

  const removeFooterLink = (sectionIndex: number, linkIndex: number) => {
    const newSections = [...footerSections]
    newSections[sectionIndex].links = newSections[sectionIndex].links.filter((_, i) => i !== linkIndex)
    setFooterSections(newSections)
  }

  const addFooterSection = () => {
    setFooterSections([...footerSections, { title: "New Section", links: [] }])
  }

  const removeFooterSection = (index: number) => {
    setFooterSections(footerSections.filter((_, i) => i !== index))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Header & Footer</h1>
            <p className="text-muted-foreground">Manage navigation menus and links</p>
          </div>
        </div>
        <div className="text-center py-12 text-muted-foreground">Loading navigation settings...</div>
      </div>
    )
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
              <Button variant="outline" size="sm" onClick={addHeaderLink}>
                <Plus className="h-3 w-3 mr-1" />
                Add Link
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {headerLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                <Input
                  value={link.label}
                  onChange={(e) => updateHeaderLink(index, "label", e.target.value)}
                  className="w-28"
                />
                <Input value={link.href} onChange={(e) => updateHeaderLink(index, "href", e.target.value)} className="flex-1" />
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveLink(index, "up")}
                    disabled={index === 0}
                    className="p-1 hover:bg-secondary rounded disabled:opacity-30"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => moveLink(index, "down")}
                    disabled={index === headerLinks.length - 1}
                    className="p-1 hover:bg-secondary rounded disabled:opacity-30"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <Switch checked={link.visible} onCheckedChange={(checked) => updateHeaderLink(index, "visible", checked)} />
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => removeHeaderLink(index)}>
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
                <Input
                  value={loginButton.text}
                  onChange={(e) => setLoginButton({ ...loginButton, text: e.target.value })}
                  placeholder="Button text"
                />
                <Input
                  value={loginButton.href}
                  onChange={(e) => setLoginButton({ ...loginButton, href: e.target.value })}
                  placeholder="Link URL"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={loginButton.visible} onCheckedChange={(checked) => setLoginButton({ ...loginButton, visible: checked })} />
                <span className="text-sm">Visible</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg space-y-3">
              <Label>Sign Up Button</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                <Input
                  value={signUpButton.text}
                  onChange={(e) => setSignUpButton({ ...signUpButton, text: e.target.value })}
                  placeholder="Button text"
                />
                <Input
                  value={signUpButton.href}
                  onChange={(e) => setSignUpButton({ ...signUpButton, href: e.target.value })}
                  placeholder="Link URL"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={signUpButton.visible} onCheckedChange={(checked) => setSignUpButton({ ...signUpButton, visible: checked })} />
                <span className="text-sm">Visible</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg space-y-3">
              <Label>Dashboard Button</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                <Input
                  value={dashboardButton.text}
                  onChange={(e) => setDashboardButton({ ...dashboardButton, text: e.target.value })}
                  placeholder="Button text"
                />
                <Input
                  value={dashboardButton.href}
                  onChange={(e) => setDashboardButton({ ...dashboardButton, href: e.target.value })}
                  placeholder="Link URL"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={dashboardButton.showWhenLoggedIn || false}
                  onCheckedChange={(checked) => setDashboardButton({ ...dashboardButton, showWhenLoggedIn: checked })}
                />
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
              <Button variant="outline" size="sm" onClick={addFooterSection}>
                <Plus className="h-3 w-3 mr-1" />
                Add Section
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {footerSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <Input
                      value={section.title}
                      onChange={(e) => updateFooterSection(sectionIndex, "title", e.target.value)}
                      className="font-medium w-32"
                    />
                    <Button variant="ghost" size="sm" className="text-destructive" onClick={() => removeFooterSection(sectionIndex)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <div key={linkIndex} className="flex items-center gap-2">
                        <Input
                          value={link.label}
                          onChange={(e) => updateFooterLink(sectionIndex, linkIndex, "label", e.target.value)}
                          className="text-sm"
                        />
                        <Input
                          value={link.href}
                          onChange={(e) => updateFooterLink(sectionIndex, linkIndex, "href", e.target.value)}
                          className="text-sm"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive shrink-0"
                          onClick={() => removeFooterLink(sectionIndex, linkIndex)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={() => addFooterLink(sectionIndex)}>
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
                <Input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp Number</Label>
                <Input value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Twitter/X URL</Label>
                <Input value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input value={linkedInUrl} onChange={(e) => setLinkedInUrl(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
