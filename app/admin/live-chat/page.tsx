"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, MessageCircle, Code, Eye, Mail, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LiveChatSettings {
  enabled: boolean
  widgetScript: string
  displayOn: "all" | "homepage" | "dashboard" | "exclude-dashboard"
  autoReplyMessage: string
  supportEmail: string
}

export default function LiveChatSettingsPage() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState<LiveChatSettings>({
    enabled: true,
    widgetScript: `window.$crisp = [];
window.CRISP_WEBSITE_ID = "your-crisp-website-id";
(function() {
  var d = document;
  var s = d.createElement("script");
  s.src = "https://client.crisp.chat/l.js";
  s.async = 1;
  d.getElementsByTagName("head")[0].appendChild(s);
})();`,
    displayOn: "all",
    autoReplyMessage: "Thanks for reaching out! We'll get back to you shortly.",
    supportEmail: "support@backlinkse.com",
  })

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("liveChatSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSave = () => {
    setSaving(true)
    // Save to localStorage (in production this would be an API call)
    localStorage.setItem("liveChatSettings", JSON.stringify(settings))
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      // Reload to apply changes
      window.location.reload()
    }, 1000)
  }

  const handleTestChat = () => {
    if (typeof window !== "undefined" && (window as any).$crisp) {
      ;(window as any).$crisp.push(["do", "chat:open"])
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Live Chat Settings</h1>
          <p className="text-muted-foreground">Configure your live chat widget and support options</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleTestChat}>
            <Eye className="h-4 w-4 mr-2" />
            Test Chat
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {saved && (
        <Alert className="border-primary">
          <MessageCircle className="h-4 w-4" />
          <AlertDescription>Settings saved successfully! Page will reload to apply changes.</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Enable/Disable Chat */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Chat Widget Status
            </CardTitle>
            <CardDescription>Turn live chat on or off site-wide</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Enable Live Chat</p>
                <p className="text-sm text-muted-foreground">Show chat widget to visitors</p>
              </div>
              <Switch
                checked={settings.enabled}
                onCheckedChange={(checked) => setSettings({ ...settings, enabled: checked })}
              />
            </div>

            {!settings.enabled && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Live chat is currently disabled. Visitors will not see the chat widget on your website.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Display Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Display Options
            </CardTitle>
            <CardDescription>Choose where to show the chat widget</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Show Widget On</Label>
              <Select
                value={settings.displayOn}
                onValueChange={(value: any) => setSettings({ ...settings, displayOn: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pages</SelectItem>
                  <SelectItem value="homepage">Homepage Only</SelectItem>
                  <SelectItem value="dashboard">Dashboard Only</SelectItem>
                  <SelectItem value="exclude-dashboard">All Pages (Exclude Dashboard)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {settings.displayOn === "all" && "Widget will appear on every page"}
                {settings.displayOn === "homepage" && "Widget will only appear on the homepage"}
                {settings.displayOn === "dashboard" && "Widget will only appear in the user dashboard"}
                {settings.displayOn === "exclude-dashboard" && "Widget will appear everywhere except the dashboard"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Chat Widget Script */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Chat Widget Script
            </CardTitle>
            <CardDescription>
              Add or edit your chat widget integration code (Crisp, Intercom, Tawk.to, etc.)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Widget Script</Label>
              <Textarea
                rows={12}
                value={settings.widgetScript}
                onChange={(e) => setSettings({ ...settings, widgetScript: e.target.value })}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Paste the complete integration script from your live chat provider (Crisp, Intercom, Tawk.to, Zendesk,
                etc.)
              </p>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Common providers:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Crisp: Replace "your-crisp-website-id" with your actual Crisp website ID</li>
                  <li>Intercom: Use your Intercom app ID in the script</li>
                  <li>Tawk.to: Copy the entire script from your Tawk.to dashboard</li>
                  <li>Zendesk: Use your Zendesk Chat widget key</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Auto-Reply Message */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Auto-Reply Message
            </CardTitle>
            <CardDescription>First message visitors see when opening chat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Welcome Message</Label>
              <Textarea
                rows={4}
                value={settings.autoReplyMessage}
                onChange={(e) => setSettings({ ...settings, autoReplyMessage: e.target.value })}
                placeholder="Enter your welcome message..."
              />
              <p className="text-xs text-muted-foreground">
                This message will automatically appear when visitors open the chat widget
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Support Email Fallback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Support Email Fallback
            </CardTitle>
            <CardDescription>Email to show when chat is offline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Support Email Address</Label>
              <Input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                placeholder="support@backlinkse.com"
              />
              <p className="text-xs text-muted-foreground">
                Visitors can email this address if chat support is unavailable
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
