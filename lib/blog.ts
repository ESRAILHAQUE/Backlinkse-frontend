import { api } from "./api"

export interface BlogAuthor {
    name: string
    role: string
}

export interface BlogPost {
    _id: string
    slug: string
    title: string
    excerpt?: string
    content: string
    category: string
    author?: BlogAuthor
    date: string
    readTime?: string
    featuredImage?: string
    metaTitle?: string
    metaDescription?: string
    featured?: boolean
    status: "published" | "draft"
    views?: number
    sortOrder?: number
    createdAt?: string
    updatedAt?: string
}

export interface CreateBlogPostData {
    slug: string
    title: string
    excerpt?: string
    content?: string
    category: string
    author?: BlogAuthor
    date?: string
    readTime?: string
    featuredImage?: string
    metaTitle?: string
    metaDescription?: string
    featured?: boolean
    status?: "published" | "draft"
    views?: number
    sortOrder?: number
}

export interface UpdateBlogPostData extends Partial<CreateBlogPostData> { }

export const getPublicBlogPosts = async (): Promise<BlogPost[]> => {
    const res = await api.get<{ posts: BlogPost[] }>("/blog")
    return res.data?.posts || []
}

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
    const res = await api.get<{ posts: BlogPost[] }>("/blog/admin/all")
    return res.data?.posts || []
}

export const getBlogPostById = async (id: string): Promise<BlogPost> => {
    const res = await api.get<{ post: BlogPost }>(`/blog/admin/${id}`)
    return res.data!.post
}

export const createBlogPost = async (data: CreateBlogPostData): Promise<BlogPost> => {
    const res = await api.post<{ post: BlogPost }>("/blog", data)
    return res.data!.post
}

export const updateBlogPost = async (id: string, data: UpdateBlogPostData): Promise<BlogPost> => {
    const res = await api.patch<{ post: BlogPost }>(`/blog/${id}`, data)
    return res.data!.post
}

export const deleteBlogPost = async (id: string): Promise<void> => {
    await api.delete(`/blog/${id}`)
}

