import { api } from "./api"

export interface FAQ {
    _id: string
    question: string
    answer: string
    visible: boolean
    status?: "published" | "draft"
    sortOrder: number
    createdAt?: string
    updatedAt?: string
}

export interface CreateFAQData {
    question: string
    answer: string
    visible?: boolean
    status?: "published" | "draft"
    sortOrder?: number
}

export interface UpdateFAQData extends Partial<CreateFAQData> { }

export const getPublicFAQs = async (): Promise<FAQ[]> => {
    const res = await api.get<{ faqs: FAQ[] }>("/faqs")
    return res.data?.faqs || []
}

export const getAllFAQs = async (): Promise<FAQ[]> => {
    const res = await api.get<{ faqs: FAQ[] }>("/faqs/admin/all")
    return res.data?.faqs || []
}

export const getFAQById = async (id: string): Promise<FAQ> => {
    const res = await api.get<{ faq: FAQ }>(`/faqs/admin/${id}`)
    return res.data!.faq
}

export const createFAQ = async (data: CreateFAQData): Promise<FAQ> => {
    const res = await api.post<{ faq: FAQ }>("/faqs", data)
    return res.data!.faq
}

export const updateFAQ = async (id: string, data: UpdateFAQData): Promise<FAQ> => {
    const res = await api.patch<{ faq: FAQ }>(`/faqs/${id}`, data)
    return res.data!.faq
}

export const deleteFAQ = async (id: string): Promise<void> => {
    await api.delete(`/faqs/${id}`)
}

