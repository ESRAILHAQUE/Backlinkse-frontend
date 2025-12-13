"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, Trash2, Eye, Tag, ImageIcon, ExternalLink, Search } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Complete Guide to Link Building in 2024",
    slug: "complete-guide-link-building-2024",
    category: "Link Building",
    status: "published",
    date: "2024-01-15",
    views: 2340,
  },
  {
    id: 2,
    title: "How to Build High-Quality Backlinks",
    slug: "how-build-high-quality-backlinks",
    category: "SEO",
    status: "published",
    date: "2024-01-10",
    views: 1856,
  },
  {
    id: 3,
    title: "Guest Posting Best Practices",
    slug: "guest-posting-best-practices",
    category: "Guest Posting",
    status: "draft",
    date: "2024-01-08",
    views: 0,
  },
]

export default function BlogManagerPage() {
  const [posts, setPosts] = useState(blogPosts)
  const [activePost, setActivePost] = useState<number | null>(1)
  const [saving, setSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 1000)
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Manager</h1>
          <p className="text-muted-foreground">Create and manage blog posts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Posts List */}
        <div className="lg:col-span-1 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">All Posts</CardTitle>
              <CardDescription>{posts.length} total posts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                    activePost === post.id ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"
                  }`}
                  onClick={() => setActivePost(post.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium line-clamp-2">{post.title}</p>
                    <Badge variant={post.status === "published" ? "default" : "secondary"} className="shrink-0">
                      {post.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Post Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Edit Post</CardTitle>
                  <CardDescription>Update content and SEO settings</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={`/blog/${posts.find((p) => p.id === activePost)?.slug}`} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Preview
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Post Title</Label>
                <Input defaultValue={posts.find((p) => p.id === activePost)?.title} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>URL Slug</Label>
                  <Input defaultValue={posts.find((p) => p.id === activePost)?.slug} />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input defaultValue={posts.find((p) => p.id === activePost)?.category} />
                </div>
              </div>

              {/* Featured Image */}
              <div className="space-y-2">
                <Label>Featured Image</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Upload featured image</p>
                  <Button variant="outline" size="sm">
                    Choose Image
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label>Post Content</Label>
                <Textarea
                  rows={10}
                  placeholder="Write your blog post content here..."
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                />
              </div>

              {/* SEO Fields */}
              <div className="pt-4 border-t space-y-4">
                <Label className="text-base">SEO Settings</Label>
                <div className="space-y-2">
                  <Label>Meta Title</Label>
                  <Input defaultValue={posts.find((p) => p.id === activePost)?.title} />
                </div>
                <div className="space-y-2">
                  <Label>Meta Description</Label>
                  <Textarea rows={2} placeholder="Write a compelling meta description..." />
                </div>
              </div>

              {/* Publish Status */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Publish Status</p>
                  <p className="text-sm text-muted-foreground">Make this post live on the blog</p>
                </div>
                <Switch defaultChecked={posts.find((p) => p.id === activePost)?.status === "published"} />
              </div>

              {/* Delete */}
              <Button variant="outline" className="text-destructive hover:bg-destructive/10 bg-transparent">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Post
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
