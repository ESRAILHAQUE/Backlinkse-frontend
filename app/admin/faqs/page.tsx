"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Save, Trash2, GripVertical, ChevronUp, ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "What types of backlinks do you build?",
    answer: "We focus on high-quality, white-hat backlinks from authoritative websites...",
    visible: true,
  },
  {
    id: 2,
    question: "How long until I see results?",
    answer: "Most clients start seeing improvements in rankings within 2-3 months...",
    visible: true,
  },
  {
    id: 3,
    question: "Do you offer refunds?",
    answer: "Yes, we offer a satisfaction guarantee. If you're not happy with our service...",
    visible: true,
  },
  {
    id: 4,
    question: "How Do We Communicate?",
    answer:
      "You can message our team 24/7 and you'll receive a same-day reply. Clients may also book a call anytime. We schedule regular meetings to review strategy and planning. You will receive a monthly update covering every backlink built and key insights related to your SEO goals.",
    visible: true,
  },
]

export default function FAQsManagerPage() {
  const [items, setItems] = useState(faqs)
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

  const addNewFAQ = () => {
    const newId = Math.max(...items.map((i) => i.id)) + 1
    setItems([...items, { id: newId, question: "New Question", answer: "Answer here...", visible: true }])
    setActiveItem(newId)
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
          <Button variant="outline" onClick={addNewFAQ}>
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
          </Button>
          <Button onClick={handleSave} disabled={saving}>
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
              <CardDescription>{items.length} questions</CardDescription>
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
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab shrink-0" />
                  <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                  <p className="text-sm font-medium truncate flex-1">{item.question}</p>
                  <div className="flex items-center gap-1 shrink-0">
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

        {/* FAQ Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Edit FAQ</CardTitle>
              <CardDescription>Update question and answer content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Question</Label>
                <Input defaultValue={items.find((i) => i.id === activeItem)?.question} />
              </div>

              <div className="space-y-2">
                <Label>Answer</Label>
                <Textarea rows={6} defaultValue={items.find((i) => i.id === activeItem)?.answer} />
              </div>

              {/* Visibility */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Show on Website</p>
                  <p className="text-sm text-muted-foreground">Display this FAQ on the homepage</p>
                </div>
                <Switch defaultChecked={items.find((i) => i.id === activeItem)?.visible} />
              </div>

              {/* Delete */}
              <Button variant="outline" className="text-destructive hover:bg-destructive/10 bg-transparent">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete FAQ
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
