"use client"

import { useEffect, useMemo, useState } from "react"
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
  Loader2,
} from "lucide-react"
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
  type Service,
  type ServicePackage,
} from "@/lib/services"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Link2,
  FileText,
  PenTool,
  Package,
  Award,
}

const getIcon = (iconName: string) => {
  const IconComponent = iconMap[iconName] || Package
  return IconComponent
}

export default function ServicesManagerPage() {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const activeService = useMemo(
    () => services.find((s) => s._id === activeServiceId) || null,
    [services, activeServiceId]
  )

  const loadServices = async () => {
    try {
      setLoading(true)
      const data = await getAllServices()
      setServices(data)
      if (!activeServiceId && data.length > 0) {
        setActiveServiceId(data[0]._id)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load services")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadServices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateLocalService = (id: string, changes: Partial<Service>) => {
    setServices((prev) => prev.map((s) => (s._id === id ? { ...s, ...changes } : s)))
  }

  const handleFieldChange = (field: keyof Service, value: string | number | boolean) => {
    if (!activeService) return
    updateLocalService(activeService._id, { [field]: value } as Partial<Service>)
  }

  const handlePackageChange = (index: number, field: keyof ServicePackage, value: string | number) => {
    if (!activeService) return
    const updatedPackages = [...activeService.packages]
    updatedPackages[index] = { ...updatedPackages[index], [field]: value }
    updateLocalService(activeService._id, { packages: updatedPackages })
  }

  const handleAddPackage = () => {
    if (!activeService) return
    const newPackage: ServicePackage = { name: "New Package", price: 0 }
    updateLocalService(activeService._id, {
      packages: [...activeService.packages, newPackage],
    })
  }

  const handleRemovePackage = (index: number) => {
    if (!activeService) return
    const updatedPackages = activeService.packages.filter((_, i) => i !== index)
    updateLocalService(activeService._id, { packages: updatedPackages })
  }

  const handleSave = async () => {
    if (!activeService) return
    try {
      setSaving(true)
      await updateService(activeService._id, {
        name: activeService.name,
        slug: activeService.slug,
        description: activeService.description,
        icon: activeService.icon,
        status: activeService.status,
        packages: activeService.packages,
        sortOrder: activeService.sortOrder,
      })
      toast.success("Service saved successfully")
      loadServices()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save service")
    } finally {
      setSaving(false)
    }
  }

  const handleAddService = async () => {
    try {
      setSaving(true)
      const service = await createService({
        serviceId: `service-${Date.now()}`,
        name: "New Service",
        slug: "/services/new-service",
        description: "",
        icon: "Package",
        status: "draft",
        packages: [],
        sortOrder: services.length,
      })
      toast.success("Service created")
      setServices((prev) => [...prev, service])
      setActiveServiceId(service._id)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create service")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteService = async () => {
    if (!activeService) return
    if (!confirm(`Are you sure you want to delete "${activeService.name}"?`)) return

    try {
      setSaving(true)
      await deleteService(activeService._id)
      toast.success("Service deleted")
      const remaining = services.filter((s) => s._id !== activeService._id)
      setServices(remaining)
      setActiveServiceId(remaining[0]?._id ?? null)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete service")
    } finally {
      setSaving(false)
    }
  }

  const handleStatusToggle = async (status: "published" | "draft") => {
    if (!activeService) return
    updateLocalService(activeService._id, { status })
    try {
      await updateService(activeService._id, { status })
      toast.success(`Service ${status === "published" ? "published" : "unpublished"}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update service")
      loadServices()
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
          <h1 className="text-2xl font-bold">Services Manager</h1>
          <p className="text-muted-foreground">Manage all service pages and packages</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddService} disabled={saving}>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
          <Button onClick={handleSave} disabled={saving || !activeService}>
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
              {services.map((service) => {
                const IconComponent = getIcon(service.icon)
                return (
                  <div
                    key={service._id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${activeServiceId === service._id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-secondary/50"
                      }`}
                    onClick={() => setActiveServiceId(service._id)}
                  >
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{service.name}</p>
                      <p className="text-xs text-muted-foreground">{service.packages.length} packages</p>
                    </div>
                    <Badge variant={service.status === "published" ? "default" : "secondary"}>
                      {service.status}
                    </Badge>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Service Editor */}
        <div className="lg:col-span-2">
          {activeService ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Edit: {activeService.name}</CardTitle>
                    <CardDescription>Modify service details, pricing, and packages</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={activeService.slug} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Preview
                      </a>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleDeleteService} disabled={saving}>
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Service Name</Label>
                    <Input
                      value={activeService.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL Slug</Label>
                    <Input
                      value={activeService.slug}
                      onChange={(e) => handleFieldChange("slug", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Service Description</Label>
                  <Textarea
                    rows={3}
                    value={activeService.description || ""}
                    onChange={(e) => handleFieldChange("description", e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Publish Status</p>
                    <p className="text-sm text-muted-foreground">Make this service visible on the website</p>
                  </div>
                  <Switch
                    checked={activeService.status === "published"}
                    onCheckedChange={(checked) => handleStatusToggle(checked ? "published" : "draft")}
                  />
                </div>

                {/* Packages Section */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-base">Pricing Packages</Label>
                    <Button variant="outline" size="sm" onClick={handleAddPackage}>
                      <Plus className="h-3 w-3 mr-1" />
                      Add Package
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {activeService.packages.map((pkg, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Input
                              value={pkg.name}
                              onChange={(e) => handlePackageChange(index, "name", e.target.value)}
                              className="font-medium w-40"
                            />
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <Input
                                value={pkg.price}
                                onChange={(e) => handlePackageChange(index, "price", parseFloat(e.target.value) || 0)}
                                className="w-24"
                                type="number"
                              />
                              <span className="text-sm text-muted-foreground">/mo</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => handleRemovePackage(index)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {activeService.packages.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No packages yet. Click "Add Package" to create one.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No service selected. Select a service from the list to edit.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
