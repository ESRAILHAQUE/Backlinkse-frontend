"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, Palette, Sun, Moon, Check } from "lucide-react"
import { getActiveTheme, updateActiveTheme, type Theme, type ColorPreset } from "@/lib/theme"
import { toast } from "sonner"

export default function ThemeManagerPage() {
  const [theme, setTheme] = useState<Theme | null>(null)
  const [activeColor, setActiveColor] = useState(155)
  const [darkMode, setDarkMode] = useState(false)
  const [primaryFont, setPrimaryFont] = useState("Inter")
  const [headingFont, setHeadingFont] = useState("Inter")
  const [baseFontSize, setBaseFontSize] = useState("16px")
  const [borderRadius, setBorderRadius] = useState(0.625)
  const [colorPresets, setColorPresets] = useState<ColorPreset[]>([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTheme()
  }, [])

  const fetchTheme = async () => {
    try {
      setLoading(true)
      const data = await getActiveTheme()
      setTheme(data)
      setActiveColor(data.activeColorHue)
      setDarkMode(data.darkMode)
      setPrimaryFont(data.primaryFont)
      setHeadingFont(data.headingFont)
      setBaseFontSize(data.baseFontSize)
      setBorderRadius(data.borderRadius)
      setColorPresets(data.colorPresets || [])
    } catch (err) {
      console.error("Error fetching theme:", err)
      toast.error(err instanceof Error ? err.message : "Failed to load theme")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const updatedTheme = await updateActiveTheme({
        activeColorHue: activeColor,
        darkMode,
        primaryFont,
        headingFont,
        baseFontSize,
        borderRadius,
      })
      setTheme(updatedTheme)
      toast.success("Theme updated successfully!")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save theme")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Theme & Colors</h1>
            <p className="text-muted-foreground">Customize your website appearance</p>
          </div>
        </div>
        <div className="text-center py-12 text-muted-foreground">Loading theme settings...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Theme & Colors</h1>
          <p className="text-muted-foreground">Customize your website appearance</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Color Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Brand Color
            </CardTitle>
            <CardDescription>Choose your primary brand color theme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {colorPresets.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setActiveColor(preset.hue)}
                    className={`relative p-4 rounded-lg border-2 transition-all ${activeColor === preset.hue ? "border-foreground" : "border-border hover:border-muted-foreground"
                      }`}
                  >
                    <div className="h-12 w-full rounded-md mb-2" style={{ backgroundColor: preset.color }} />
                    <p className="text-sm font-medium">{preset.name}</p>
                    {activeColor === preset.hue && (
                      <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-foreground flex items-center justify-center">
                        <Check className="h-3 w-3 text-background" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="pt-4 border-t space-y-4">
              <Label>Custom Color (Hue Value: 0-360)</Label>
              <div className="flex gap-3">
                <Input
                  type="number"
                  min={0}
                  max={360}
                  value={activeColor}
                  onChange={(e) => setActiveColor(Number(e.target.value))}
                  className="w-24"
                />
                <div className="flex-1 h-10 rounded-md" style={{ backgroundColor: `oklch(0.65 0.2 ${activeColor})` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dark Mode */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              Display Mode
            </CardTitle>
            <CardDescription>Toggle between light and dark mode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Sun className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Light Mode</p>
                  <p className="text-sm text-muted-foreground">Default bright theme</p>
                </div>
              </div>
              <Switch checked={!darkMode} onCheckedChange={() => setDarkMode(false)} />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Easy on the eyes</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={() => setDarkMode(true)} />
            </div>

            {/* Preview */}
            <div className="pt-4 border-t">
              <Label className="mb-3 block">Preview</Label>
              <div
                className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg" style={{ backgroundColor: `oklch(0.65 0.2 ${activeColor})` }} />
                  <div>
                    <p className="font-bold">Backlinkse</p>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Link Building Agency</p>
                  </div>
                </div>
                <button
                  className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                  style={{ backgroundColor: `oklch(0.65 0.2 ${activeColor})` }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Font settings for your website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Primary Font</Label>
              <Input value={primaryFont} onChange={(e) => setPrimaryFont(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Heading Font</Label>
              <Input value={headingFont} onChange={(e) => setHeadingFont(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Base Font Size</Label>
              <Input value={baseFontSize} onChange={(e) => setBaseFontSize(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Border Radius */}
        <Card>
          <CardHeader>
            <CardTitle>Border Radius</CardTitle>
            <CardDescription>Roundness of UI elements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Border Radius (rem)</Label>
              <Input
                type="number"
                step="0.125"
                value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
              />
            </div>
            <div className="flex gap-3">
              {[0, 0.25, 0.5, 0.625, 1].map((radius) => (
                <button
                  key={radius}
                  onClick={() => setBorderRadius(radius)}
                  className={`h-12 w-12 border-2 transition-colors ${borderRadius === radius ? "border-primary" : "border-border hover:border-muted-foreground"
                    }`}
                  style={{ borderRadius: `${radius}rem` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
