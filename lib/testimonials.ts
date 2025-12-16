import { api } from "./api"

export interface Testimonial {
    _id: string
    name: string
    role: string
    company: string
    quote: string
    rating: number
    photo?: string
    visible: boolean
    status?: "published" | "draft"
    sortOrder: number
    createdAt?: string
    updatedAt?: string
}

export interface CreateTestimonialData {
    name: string
    role: string
    company: string
    quote: string
    rating?: number
    photo?: string
    visible?: boolean
    status?: "published" | "draft"
    sortOrder?: number
}

export interface UpdateTestimonialData extends Partial<CreateTestimonialData> { }

export const getPublicTestimonials = async (): Promise<Testimonial[]> => {
    const res = await api.get<{ testimonials: Testimonial[] }>("/testimonials")
    return res.data?.testimonials || []
}

export const getAllTestimonials = async (): Promise<Testimonial[]> => {
    const res = await api.get<{ testimonials: Testimonial[] }>("/testimonials/admin/all")
    return res.data?.testimonials || []
}

export const getTestimonialById = async (id: string): Promise<Testimonial> => {
    const res = await api.get<{ testimonial: Testimonial }>(`/testimonials/admin/${id}`)
    return res.data!.testimonial
}

export const createTestimonial = async (data: CreateTestimonialData): Promise<Testimonial> => {
    const res = await api.post<{ testimonial: Testimonial }>("/testimonials", data)
    return res.data!.testimonial
}

export const updateTestimonial = async (id: string, data: UpdateTestimonialData): Promise<Testimonial> => {
    const res = await api.patch<{ testimonial: Testimonial }>(`/testimonials/${id}`, data)
    return res.data!.testimonial
}

export const deleteTestimonial = async (id: string): Promise<void> => {
    await api.delete(`/testimonials/${id}`)
}

