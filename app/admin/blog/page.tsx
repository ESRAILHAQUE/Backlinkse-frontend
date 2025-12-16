"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, Trash2, Eye, Tag, ImageIcon, ExternalLink, Search, Loader2 } from "lucide-react"
import { getAllBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost, type BlogPost } from "@/lib/blog"
import { toast } from "sonner"

export default function BlogManagerPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [activePostId, setActivePostId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const activePost = useMemo(() => posts.find((p) => p._id === activePostId) || null, [posts, activePostId])

  const filteredPosts = useMemo(
    () =>
      posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.category.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [posts, searchQuery]
  )

  const loadBlogPosts = async () => {
    try {
      setLoading(true)
      const data = await getAllBlogPosts()
      setPosts(data)
      if (!activePostId && data.length > 0) {
        setActivePostId(data[0]._id)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load blog posts")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBlogPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateLocalPost = (id: string, changes: Partial<BlogPost>) => {
    setPosts((prev) => prev.map((p) => (p._id === id ? { ...p, ...changes } : p)))
  }

  const handleFieldChange = (field: keyof BlogPost, value: string | number | boolean | undefined) => {
    if (!activePost) return
    updateLocalPost(activePost._id, { [field]: value } as Partial<BlogPost>)
  }

  const handleAuthorChange = (field: "name" | "role", value: string) => {
    if (!activePost) return
    updateLocalPost(activePost._id, {
      author: { ...(activePost.author || { name: "", role: "" }), [field]: value },
    })
  }

  const handleSave = async () => {
    if (!activePost) return
    try {
      setSaving(true)
      await updateBlogPost(activePost._id, {
        title: activePost.title,
        slug: activePost.slug,
        excerpt: activePost.excerpt,
        content: activePost.content,
        category: activePost.category,
        author: activePost.author,
        date: activePost.date,
        readTime: activePost.readTime,
        featuredImage: activePost.featuredImage,
        metaTitle: activePost.metaTitle || activePost.title,
        metaDescription: activePost.metaDescription || activePost.excerpt,
        featured: activePost.featured,
        status: activePost.status,
        views: activePost.views,
        sortOrder: activePost.sortOrder,
      })
      toast.success("Blog post saved successfully")
      loadBlogPosts()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save blog post")
    } finally {
      setSaving(false)
    }
  }

  const handleAddPost = async () => {
    try {
      setSaving(true)
      const slug = `blog-post-${Date.now()}`
      const post = await createBlogPost({
        slug,
        title: "New Blog Post",
        excerpt: "Write a compelling excerpt...",
        content: "Write your blog post content here...",
        category: "SEO",
        author: { name: "Admin", role: "Editor" },
        date: new Date().toISOString().split("T")[0],
        readTime: "5 min read",
        status: "draft",
        views: 0,
        sortOrder: posts.length,
      })
      toast.success("Blog post created")
      setPosts((prev) => [...prev, post])
      setActivePostId(post._id)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create blog post")
    } finally {
      setSaving(false)
    }
  }

  const handleDeletePost = async () => {
    if (!activePost) return
    if (!confirm(`Are you sure you want to delete "${activePost.title}"?`)) return

    try {
      setSaving(true)
      await deleteBlogPost(activePost._id)
      toast.success("Blog post deleted")
      const remaining = posts.filter((p) => p._id !== activePost._id)
      setPosts(remaining)
      setActivePostId(remaining[0]?._id ?? null)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete blog post")
    } finally {
      setSaving(false)
    }
  }

  const handleStatusToggle = async (status: "published" | "draft") => {
    if (!activePost) return
    updateLocalPost(activePost._id, { status })
    try {
      await updateBlogPost(activePost._id, { status })
      toast.success(`Blog post ${status === "published" ? "published" : "unpublished"}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update blog post")
      loadBlogPosts()
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
          <h1 className="text-2xl font-bold">Blog Manager</h1>
          <p className="text-muted-foreground">Create and manage blog posts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddPost} disabled={saving}>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
          <Button onClick={handleSave} disabled={saving || !activePost}>
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
                  key={post._id}
                  className={`p-3 rounded-lg border transition-colors cursor-pointer ${activePostId === post._id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-secondary/50"
                    }`}
                  onClick={() => setActivePostId(post._id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium line-clamp-2">{post.title}</p>
                    <Badge
                      variant={post.status === "published" ? "default" : "secondary"}
                      className="shrink-0"
                    >
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
                      {post.views || 0}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Post Editor */}
        <div className="lg:col-span-2">
          {activePost ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Edit Post</CardTitle>
                    <CardDescription>Update content and SEO settings</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/blog/${activePost.slug}`} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Preview
                      </a>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleDeletePost} disabled={saving}>
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Post Title</Label>
                  <Input
                    value={activePost.title}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>URL Slug</Label>
                    <Input
                      value={activePost.slug}
                      onChange={(e) => handleFieldChange("slug", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input
                      value={activePost.category}
                      onChange={(e) => handleFieldChange("category", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Author Name</Label>
                    <Input
                      value={activePost.author?.name || ""}
                      onChange={(e) => handleAuthorChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Author Role</Label>
                    <Input
                      value={activePost.author?.role || ""}
                      onChange={(e) => handleAuthorChange("role", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Published Date</Label>
                    <Input
                      type="date"
                      value={activePost.date}
                      onChange={(e) => handleFieldChange("date", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Read Time</Label>
                    <Input
                      value={activePost.readTime || ""}
                      onChange={(e) => handleFieldChange("readTime", e.target.value)}
                      placeholder="e.g., 5 min read"
                    />
                  </div>
                </div>

                {/* Featured Image */}
                <div className="space-y-2">
                  <Label>Featured Image URL</Label>
                  <Input
                    value={activePost.featuredImage || ""}
                    onChange={(e) => handleFieldChange("featuredImage", e.target.value)}
                    placeholder="/path/to/image.jpg"
                  />
                  {activePost.featuredImage && (
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">{activePost.featuredImage}</p>
                    </div>
                  )}
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <Label>Excerpt</Label>
                  <Textarea
                    rows={2}
                    value={activePost.excerpt || ""}
                    onChange={(e) => handleFieldChange("excerpt", e.target.value)}
                    placeholder="Write a compelling excerpt..."
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label>Post Content</Label>
                  <Textarea
                    rows={10}
                    value={activePost.content}
                    onChange={(e) => handleFieldChange("content", e.target.value)}
                    placeholder="Write your blog post content here..."
                  />
                </div>

                {/* SEO Fields */}
                <div className="pt-4 border-t space-y-4">
                  <Label className="text-base">SEO Settings</Label>
                  <div className="space-y-2">
                    <Label>Meta Title</Label>
                    <Input
                      value={activePost.metaTitle || activePost.title}
                      onChange={(e) => handleFieldChange("metaTitle", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Meta Description</Label>
                    <Textarea
                      rows={2}
                      value={activePost.metaDescription || activePost.excerpt || ""}
                      onChange={(e) => handleFieldChange("metaDescription", e.target.value)}
                      placeholder="Write a compelling meta description..."
                    />
                  </div>
                </div>

                {/* Publish Status */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Publish Status</p>
                    <p className="text-sm text-muted-foreground">Make this post live on the blog</p>
                  </div>
                  <Switch
                    checked={activePost.status === "published"}
                    onCheckedChange={(checked) => handleStatusToggle(checked ? "published" : "draft")}
                  />
                </div>

                {/* Delete */}
                <Button
                  variant="outline"
                  className="text-destructive hover:bg-destructive/10 bg-transparent"
                  onClick={handleDeletePost}
                  disabled={saving}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Post
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No post selected. Select a post from the list to edit.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
