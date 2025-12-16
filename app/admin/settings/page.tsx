"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save, Upload, Globe, Mail, Calendar, Shield, Key, ImageIcon } from "lucide-react"
import { getActiveGlobalSettings, updateActiveGlobalSettings, type GlobalSettings } from "@/lib/global-settings"
import { toast } from "sonner"

export default function GlobalSettingsPage() {
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState<GlobalSettings>({
    _id: "",
    siteLogo: "",
    favicon: "",
    siteName: "",
    tagline: "",
    contactEmail: "",
    supportEmail: "",
    whatsappNumber: "",
    businessAddress: "",
    calendlyLink: "",
    dashboardUrl: "",
    caseStudiesExternalUrl: "",
    defaultMetaTitle: "",
    defaultMetaDescription: "",
    googleAnalyticsId: "",
    adminEmail: "",
    twoFactorAuthEnabled: false,
    sessionExpiryEnabled: true,
    activityLoggingEnabled: true,
    bruteForceProtectionEnabled: true,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const data = await getActiveGlobalSettings()
      setSettings(data)
    } catch (err) {
      console.error("Error fetching global settings:", err)
      toast.error(err instanceof Error ? err.message : "Failed to load global settings")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const updatedSettings = await updateActiveGlobalSettings({
        siteLogo: settings.siteLogo,
        favicon: settings.favicon,
        siteName: settings.siteName,
        tagline: settings.tagline,
        contactEmail: settings.contactEmail,
        supportEmail: settings.supportEmail,
        whatsappNumber: settings.whatsappNumber,
        businessAddress: settings.businessAddress,
        calendlyLink: settings.calendlyLink,
        dashboardUrl: settings.dashboardUrl,
        caseStudiesExternalUrl: settings.caseStudiesExternalUrl,
        defaultMetaTitle: settings.defaultMetaTitle,
        defaultMetaDescription: settings.defaultMetaDescription,
        googleAnalyticsId: settings.googleAnalyticsId,
        adminEmail: settings.adminEmail,
        twoFactorAuthEnabled: settings.twoFactorAuthEnabled,
        sessionExpiryEnabled: settings.sessionExpiryEnabled,
        activityLoggingEnabled: settings.activityLoggingEnabled,
        bruteForceProtectionEnabled: settings.bruteForceProtectionEnabled,
      })
      setSettings(updatedSettings)
      toast.success("Global settings saved successfully!")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save global settings")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Global Settings</h1>
            <p className="text-muted-foreground">Configure website-wide settings</p>
          </div>
        </div>
        <div className="text-center py-12 text-muted-foreground">Loading global settings...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Global Settings</h1>
          <p className="text-muted-foreground">Configure website-wide settings</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Branding */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Branding
            </CardTitle>
            <CardDescription>Logo and favicon settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Site Logo</Label>
              <div className="flex items-center gap-4">
                <div className="h-16 w-32 rounded-lg bg-secondary flex items-center justify-center">
                  {settings.siteLogo ? (
                    <img src={settings.siteLogo} alt="Site logo" className="h-full w-full object-contain rounded-lg" />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                </Button>
              </div>
              <Input
                value={settings.siteLogo}
                onChange={(e) => setSettings({ ...settings, siteLogo: e.target.value })}
                placeholder="Logo URL"
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label>Favicon</Label>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  {settings.favicon ? (
                    <img src={settings.favicon} alt="Favicon" className="h-full w-full object-contain rounded-lg" />
                  ) : (
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Favicon
                </Button>
              </div>
              <Input
                value={settings.favicon}
                onChange={(e) => setSettings({ ...settings, favicon: e.target.value })}
                placeholder="Favicon URL"
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label>Site Name</Label>
              <Input value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Tagline</Label>
              <Input value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </CardTitle>
            <CardDescription>Business contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Contact Email</Label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp Number</Label>
              <Input value={settings.whatsappNumber} onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Business Address</Label>
              <Textarea
                rows={2}
                value={settings.businessAddress}
                onChange={(e) => setSettings({ ...settings, businessAddress: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* External Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              External Links
            </CardTitle>
            <CardDescription>Important external URLs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Calendly Link
              </Label>
              <Input value={settings.calendlyLink} onChange={(e) => setSettings({ ...settings, calendlyLink: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Dashboard URL</Label>
              <Input value={settings.dashboardUrl} onChange={(e) => setSettings({ ...settings, dashboardUrl: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Case Studies External URL</Label>
              <Input
                value={settings.caseStudiesExternalUrl}
                onChange={(e) => setSettings({ ...settings, caseStudiesExternalUrl: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              SEO Settings
            </CardTitle>
            <CardDescription>Search engine optimization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Meta Title</Label>
              <Input value={settings.defaultMetaTitle} onChange={(e) => setSettings({ ...settings, defaultMetaTitle: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Default Meta Description</Label>
              <Textarea
                rows={3}
                value={settings.defaultMetaDescription}
                onChange={(e) => setSettings({ ...settings, defaultMetaDescription: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Google Analytics ID</Label>
              <Input
                value={settings.googleAnalyticsId}
                onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
              />
            </div>
          </CardContent>
        </Card>

        {/* Admin Security */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Admin Security
            </CardTitle>
            <CardDescription>Admin panel security settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Admin Email</Label>
                  <Input
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <Button variant="outline">
                  <Key className="h-4 w-4 mr-2" />
                  Update Password
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuthEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuthEnabled: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Session Expiry</p>
                    <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                  </div>
                  <Switch
                    checked={settings.sessionExpiryEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, sessionExpiryEnabled: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Activity Logging</p>
                    <p className="text-sm text-muted-foreground">Track admin actions</p>
                  </div>
                  <Switch
                    checked={settings.activityLoggingEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, activityLoggingEnabled: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Brute Force Protection</p>
                    <p className="text-sm text-muted-foreground">Block repeated failed logins</p>
                  </div>
                  <Switch
                    checked={settings.bruteForceProtectionEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, bruteForceProtectionEnabled: checked })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
