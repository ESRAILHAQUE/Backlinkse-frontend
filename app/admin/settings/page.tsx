"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save, Upload, Globe, Mail, Calendar, Shield, Key, ImageIcon } from "lucide-react"

export default function GlobalSettingsPage() {
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
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Favicon</Label>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Favicon
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Site Name</Label>
              <Input defaultValue="Backlinkse" />
            </div>
            <div className="space-y-2">
              <Label>Tagline</Label>
              <Input defaultValue="Professional Link Building Agency" />
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
              <Input type="email" defaultValue="hello@backlinkse.com" />
            </div>
            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input type="email" defaultValue="support@backlinkse.com" />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp Number</Label>
              <Input defaultValue="+1 234 567 890" />
            </div>
            <div className="space-y-2">
              <Label>Business Address</Label>
              <Textarea rows={2} defaultValue="123 Business St, Suite 100, New York, NY 10001" />
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
              <Input defaultValue="https://calendly.com/backlinkse/consultation" />
            </div>
            <div className="space-y-2">
              <Label>Dashboard URL</Label>
              <Input defaultValue="/dashboard" />
            </div>
            <div className="space-y-2">
              <Label>Case Studies External URL</Label>
              <Input defaultValue="https://v0-backlinkse.vercel.app/case-studies" />
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
              <Input defaultValue="Backlinkse - Professional Link Building Agency" />
            </div>
            <div className="space-y-2">
              <Label>Default Meta Description</Label>
              <Textarea
                rows={3}
                defaultValue="Build high-quality backlinks and improve your search rankings with Backlinkse. Trusted by 500+ companies worldwide."
              />
            </div>
            <div className="space-y-2">
              <Label>Google Analytics ID</Label>
              <Input placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX" />
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
                  <Input type="email" defaultValue="admin@backlinkse.com" />
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
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Session Expiry</p>
                    <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Activity Logging</p>
                    <p className="text-sm text-muted-foreground">Track admin actions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Brute Force Protection</p>
                    <p className="text-sm text-muted-foreground">Block repeated failed logins</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
