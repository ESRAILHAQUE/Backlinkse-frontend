"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info, X, Plus, ArrowLeft } from "lucide-react"
import { createProject, type CreateProjectData, type TargetPage } from "@/lib/projects"
import { toast } from "sonner"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const categories = [
    "Technology",
    "Business",
    "Finance",
    "Health",
    "Education",
    "Travel",
    "Food",
    "Lifestyle",
    "Marketing",
    "Real Estate",
    "E-commerce",
    "Other",
]

const sensitiveTopics = [
    "None",
    "Pharmaceuticals",
    "Cryptocurrency",
    "Politics",
    "Religion",
    "Other",
]

const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Spain",
    "Italy",
    "Netherlands",
    "Sweden",
    "Norway",
    "Denmark",
    "Poland",
    "India",
    "Japan",
    "Singapore",
    "Other",
]

const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Dutch",
    "Polish",
    "Russian",
    "Chinese",
    "Japanese",
    "Other",
]

export default function NewProjectPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<CreateProjectData>({
        name: "",
        domain: "",
        targetLinks: 10,
        category: "",
        sensitiveTopics: [],
        countries: [],
        languages: [],
        taskForPublisher: "",
        targetPages: [],
    })

    const [targetPages, setTargetPages] = useState<TargetPage[]>([{ anchor: "", url: "" }])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name || !formData.domain || !formData.targetLinks) {
            toast.error("Please fill in all required fields")
            return
        }

        // Validate target pages
        const validTargetPages = targetPages.filter((page) => page.anchor.trim() && page.url.trim())
        if (validTargetPages.length === 0) {
            toast.error("Please add at least one target page with anchor text and URL")
            return
        }

        // Validate URLs
        for (const page of validTargetPages) {
            try {
                new URL(page.url)
            } catch {
                toast.error(`Invalid URL: ${page.url}`)
                return
            }
        }

        try {
            setLoading(true)
            const projectData: CreateProjectData = {
                ...formData,
                targetPages: validTargetPages,
            }
            await createProject(projectData)
            toast.success("Project created successfully!")
            router.push("/dashboard/projects")
        } catch (error) {
            console.error("Failed to create project:", error)
            toast.error(error instanceof Error ? error.message : "Failed to create project")
        } finally {
            setLoading(false)
        }
    }

    const addTargetPage = () => {
        if (targetPages.length >= 50) {
            toast.error("You can add up to 50 anchor-URL pairs")
            return
        }
        setTargetPages([...targetPages, { anchor: "", url: "" }])
    }

    const removeTargetPage = (index: number) => {
        setTargetPages(targetPages.filter((_, i) => i !== index))
    }

    const updateTargetPage = (index: number, field: keyof TargetPage, value: string) => {
        const updated = [...targetPages]
        updated[index] = { ...updated[index], [field]: value }
        setTargetPages(updated)
    }

    const handleCountryChange = (value: string) => {
        if (formData.countries && formData.countries.length >= 3 && !formData.countries.includes(value)) {
            toast.error("You can select up to 3 countries")
            return
        }
        const current = formData.countries || []
        if (current.includes(value)) {
            setFormData({ ...formData, countries: current.filter((c) => c !== value) })
        } else {
            setFormData({ ...formData, countries: [...current, value] })
        }
    }

    const handleLanguageChange = (value: string) => {
        if (formData.languages && formData.languages.length >= 3 && !formData.languages.includes(value)) {
            toast.error("You can select up to 3 languages")
            return
        }
        const current = formData.languages || []
        if (current.includes(value)) {
            setFormData({ ...formData, languages: current.filter((l) => l !== value) })
        } else {
            setFormData({ ...formData, languages: [...current, value] })
        }
    }

    const handleSensitiveTopicChange = (value: string) => {
        if (value === "None") {
            setFormData({ ...formData, sensitiveTopics: [] })
            return
        }
        const current = formData.sensitiveTopics || []
        if (current.includes(value)) {
            setFormData({ ...formData, sensitiveTopics: current.filter((t) => t !== value) })
        } else {
            setFormData({ ...formData, sensitiveTopics: [...current, value] })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/projects">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Adding a new project</h1>
                    <p className="text-sm text-muted-foreground">Home &gt; My projects &gt; Adding a new project</p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Initial data section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Initial data</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="domain">
                                            Promoted website URL <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="domain"
                                            type="url"
                                            placeholder="https://example.com"
                                            value={formData.domain}
                                            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            Project name <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            placeholder="My Project"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select value={formData.category || ""} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category from the list or start typing" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((cat) => (
                                                    <SelectItem key={cat} value={cat}>
                                                        {cat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="sensitiveTopics" className="flex items-center gap-2">
                                            Sensitive topics
                                            <span title="Select if your project involves any sensitive topics">
                                                <Info className="h-4 w-4 text-muted-foreground" />
                                            </span>
                                        </Label>
                                        <Select
                                            value={formData.sensitiveTopics?.[0] || ""}
                                            onValueChange={handleSensitiveTopicChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Make a choice" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {sensitiveTopics.map((topic) => (
                                                    <SelectItem key={topic} value={topic}>
                                                        {topic}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="countries">Countries (up to 3)</Label>
                                        <Select onValueChange={handleCountryChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Make a choice" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {countries.map((country) => (
                                                    <SelectItem key={country} value={country}>
                                                        {country}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {formData.countries && formData.countries.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {formData.countries.map((country) => (
                                                    <Badge
                                                        key={country}
                                                        variant="secondary"
                                                        className="cursor-pointer"
                                                        onClick={() => handleCountryChange(country)}
                                                    >
                                                        {country} <X className="h-3 w-3 ml-1" />
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="languages">Languages (up to 3)</Label>
                                        <Select onValueChange={handleLanguageChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Make a choice" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {languages.map((language) => (
                                                    <SelectItem key={language} value={language}>
                                                        {language}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {formData.languages && formData.languages.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {formData.languages.map((language) => (
                                                    <Badge
                                                        key={language}
                                                        variant="secondary"
                                                        className="cursor-pointer"
                                                        onClick={() => handleLanguageChange(language)}
                                                    >
                                                        {language} <X className="h-3 w-3 ml-1" />
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="taskForPublisher">Task for the publisher</Label>
                                    <Textarea
                                        id="taskForPublisher"
                                        placeholder="Hello! Need to publish a post on your site. Keep thematic at the section level of the site. Please focus on our services/product. The link should be in the first or second paragraph of the post. Thanks!"
                                        value={formData.taskForPublisher || ""}
                                        onChange={(e) => setFormData({ ...formData, taskForPublisher: e.target.value })}
                                        rows={5}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="targetLinks">
                                        Target links <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="targetLinks"
                                        type="number"
                                        min="1"
                                        value={formData.targetLinks}
                                        onChange={(e) => setFormData({ ...formData, targetLinks: parseInt(e.target.value) || 0 })}
                                        required
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Target Pages section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Target Pages</CardTitle>
                                <CardDescription>Specify anchor texts and URLs you want to promote</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    {targetPages.map((page, index) => (
                                        <div key={index} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] items-end">
                                            <div className="space-y-2">
                                                <Label>Anchor (link text)</Label>
                                                <Input
                                                    placeholder="Collaborator"
                                                    value={page.anchor}
                                                    onChange={(e) => updateTargetPage(index, "anchor", e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>URL</Label>
                                                <Input
                                                    type="url"
                                                    placeholder="https://example.com/"
                                                    value={page.url}
                                                    onChange={(e) => updateTargetPage(index, "url", e.target.value)}
                                                />
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeTargetPage(index)}
                                                disabled={targetPages.length === 1}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <Button type="button" variant="outline" onClick={addTargetPage} disabled={targetPages.length >= 50}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add anchor
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="flex justify-center">
                            <Button type="submit" size="lg" disabled={loading}>
                                {loading ? "Creating..." : "Create a project"}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Right sidebar with hints */}
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Select a category</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                This will allow you to quickly find the necessary sites in the catalog.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Specify priority regions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                You can select up to 3 countries and 3 languages. We recommend choosing the most essential ones.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Create a task template</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                It will help you submit tasks to your cart faster. We recommend providing detailed task instructions to ensure the publication meets your expectations.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Fill in page addresses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Specify the pages you want to advertise, or do it later. You can add up to 50 anchors.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

