import { api } from "./api"

export interface CaseStudyResult {
    label: string
    before: string
    after: string
    change: string
}

export interface CaseStudyTestimonial {
    quote: string
    author: string
    role: string
}

export interface CaseStudy {
    _id: string
    slug: string
    client: string
    name?: string
    industry: string
    logo?: string
    trafficIncrease?: string
    trafficGrowth?: string
    trafficBefore?: string
    trafficAfter?: string
    linksBuilt: number
    drBefore?: number
    drAfter?: number
    keywordsTop10?: number
    duration: string
    featuredImage?: string
    overview?: string
    description?: string
    challenges?: string[]
    strategy?: string[]
    execution?: string[]
    results?: CaseStudyResult[]
    testimonial?: CaseStudyTestimonial
    status: "published" | "draft"
    sortOrder: number
    createdAt?: string
    updatedAt?: string
}

export interface CreateCaseStudyData {
    slug: string
    client: string
    name?: string
    industry: string
    logo?: string
    trafficIncrease?: string
    trafficGrowth?: string
    trafficBefore?: string
    trafficAfter?: string
    linksBuilt: number
    drBefore?: number
    drAfter?: number
    keywordsTop10?: number
    duration: string
    featuredImage?: string
    overview?: string
    description?: string
    challenges?: string[]
    strategy?: string[]
    execution?: string[]
    results?: CaseStudyResult[]
    testimonial?: CaseStudyTestimonial
    status?: "published" | "draft"
    sortOrder?: number
}

export interface UpdateCaseStudyData extends Partial<CreateCaseStudyData> { }

export const getPublicCaseStudies = async (): Promise<CaseStudy[]> => {
    const res = await api.get<{ caseStudies: CaseStudy[] }>("/case-studies")
    return res.data?.caseStudies || []
}

export const getAllCaseStudies = async (): Promise<CaseStudy[]> => {
    const res = await api.get<{ caseStudies: CaseStudy[] }>("/case-studies/admin/all")
    return res.data?.caseStudies || []
}

export const getCaseStudyById = async (id: string): Promise<CaseStudy> => {
    const res = await api.get<{ caseStudy: CaseStudy }>(`/case-studies/admin/${id}`)
    return res.data!.caseStudy
}

export const createCaseStudy = async (data: CreateCaseStudyData): Promise<CaseStudy> => {
    const res = await api.post<{ caseStudy: CaseStudy }>("/case-studies", data)
    return res.data!.caseStudy
}

export const updateCaseStudy = async (id: string, data: UpdateCaseStudyData): Promise<CaseStudy> => {
    const res = await api.patch<{ caseStudy: CaseStudy }>(`/case-studies/${id}`, data)
    return res.data!.caseStudy
}

export const deleteCaseStudy = async (id: string): Promise<void> => {
    await api.delete(`/case-studies/${id}`)
}

