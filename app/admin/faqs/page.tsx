"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Save, Trash2, GripVertical, ChevronUp, ChevronDown, HelpCircle, Loader2 } from "lucide-react"
import { getAllFAQs, createFAQ, updateFAQ, deleteFAQ, type FAQ } from "@/lib/faqs"
import { toast } from "sonner"

export default function FAQsManagerPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [activeFAQId, setActiveFAQId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const activeFAQ = useMemo(() => faqs.find((f) => f._id === activeFAQId) || null, [faqs, activeFAQId])

  const loadFAQs = async () => {
    try {
      setLoading(true)
      const data = await getAllFAQs()
      setFaqs(data)
      if (!activeFAQId && data.length > 0) {
        setActiveFAQId(data[0]._id)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load FAQs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFAQs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateLocalFAQ = (id: string, changes: Partial<FAQ>) => {
    setFaqs((prev) => prev.map((f) => (f._id === id ? { ...f, ...changes } : f)))
  }

  const handleFieldChange = (field: keyof FAQ, value: string | boolean) => {
    if (!activeFAQ) return
    updateLocalFAQ(activeFAQ._id, { [field]: value } as Partial<FAQ>)
  }

  const handleSave = async () => {
    if (!activeFAQ) return
    try {
      setSaving(true)
      await updateFAQ(activeFAQ._id, {
        question: activeFAQ.question,
        answer: activeFAQ.answer,
        visible: activeFAQ.visible,
        status: activeFAQ.status,
        sortOrder: activeFAQ.sortOrder,
      })
      toast.success("FAQ saved successfully")
      loadFAQs()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save FAQ")
    } finally {
      setSaving(false)
    }
  }

  const handleAddFAQ = async () => {
    try {
      setSaving(true)
      const faq = await createFAQ({
        question: "New Question",
        answer: "Answer here...",
        visible: true,
        sortOrder: faqs.length,
      })
      toast.success("FAQ created")
      setFaqs((prev) => [...prev, faq])
      setActiveFAQId(faq._id)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create FAQ")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteFAQ = async () => {
    if (!activeFAQ) return
    if (!confirm(`Are you sure you want to delete this FAQ?`)) return

    try {
      setSaving(true)
      await deleteFAQ(activeFAQ._id)
      toast.success("FAQ deleted")
      const remaining = faqs.filter((f) => f._id !== activeFAQ._id)
      setFaqs(remaining)
      setActiveFAQId(remaining[0]?._id ?? null)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete FAQ")
    } finally {
      setSaving(false)
    }
  }

  const moveFAQ = async (id: string, direction: "up" | "down") => {
    const index = faqs.findIndex((f) => f._id === id)
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === faqs.length - 1)
    ) {
      return
    }

    const newList = [...faqs]
    const targetIndex = direction === "up" ? index - 1 : index + 1
      ;[newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]]

    // Update sort orders
    newList.forEach((f, i) => {
      f.sortOrder = i
    })

    setFaqs(newList)

    // Update both FAQs in the backend
    try {
      await Promise.all([
        updateFAQ(newList[index]._id, { sortOrder: newList[index].sortOrder }),
        updateFAQ(newList[targetIndex]._id, { sortOrder: newList[targetIndex].sortOrder }),
      ])
      toast.success("Order updated")
    } catch (err) {
      toast.error("Failed to update order")
      loadFAQs()
    }
  }

  const handleVisibleToggle = async (visible: boolean) => {
    if (!activeFAQ) return
    updateLocalFAQ(activeFAQ._id, { visible })
    try {
      await updateFAQ(activeFAQ._id, { visible })
      toast.success(`FAQ ${visible ? "shown" : "hidden"}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update FAQ")
      loadFAQs()
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
          <h1 className="text-2xl font-bold">FAQs Manager</h1>
          <p className="text-muted-foreground">Manage frequently asked questions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddFAQ} disabled={saving}>
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
          </Button>
          <Button onClick={handleSave} disabled={saving || !activeFAQ}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* FAQs List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">All FAQs</CardTitle>
              <CardDescription>{faqs.length} questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {faqs.map((faq, index) => (
                <div
                  key={faq._id}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-colors cursor-pointer ${activeFAQId === faq._id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-secondary/50"
                    }`}
                  onClick={() => setActiveFAQId(faq._id)}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab shrink-0" />
                  <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                  <p className="text-sm font-medium truncate flex-1">{faq.question}</p>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        moveFAQ(faq._id, "up")
                      }}
                      disabled={index === 0}
                      className="p-1 hover:bg-secondary rounded disabled:opacity-30"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        moveFAQ(faq._id, "down")
                      }}
                      disabled={index === faqs.length - 1}
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

        {/* FAQ Editor */}
        <div className="lg:col-span-2">
          {activeFAQ ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit FAQ</CardTitle>
                <CardDescription>Update question and answer content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Question</Label>
                  <Input
                    value={activeFAQ.question}
                    onChange={(e) => handleFieldChange("question", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Answer</Label>
                  <Textarea
                    rows={6}
                    value={activeFAQ.answer}
                    onChange={(e) => handleFieldChange("answer", e.target.value)}
                  />
                </div>

                {/* Visibility */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Show on Website</p>
                    <p className="text-sm text-muted-foreground">Display this FAQ on the homepage</p>
                  </div>
                  <Switch checked={activeFAQ.visible} onCheckedChange={handleVisibleToggle} />
                </div>

                {/* Delete */}
                <Button
                  variant="outline"
                  className="text-destructive hover:bg-destructive/10 bg-transparent"
                  onClick={handleDeleteFAQ}
                  disabled={saving}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete FAQ
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No FAQ selected. Select a FAQ from the list to edit.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
