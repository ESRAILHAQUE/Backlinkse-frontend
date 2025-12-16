import { api } from "./api"

// Flexible content structure - fields vary by section type:
// - intro: badge, mainHeading, highlightedText, description, sectionImage
// - results: sectionLabel, mainHeading, highlightedWord, featuredCaseStudies[]
// - pricing: heading, description
// - client-logos: heading, logos[]
// - comparison: sectionLabel, mainHeading, features[]
// - cta: heading, description, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink
export interface HomepageSectionContent {
    [key: string]: any // Flexible structure for section-specific content
}

export interface HomepageSection {
    _id: string
    sectionId: string
    name: string
    enabled: boolean
    sortOrder: number
    content: HomepageSectionContent
    createdAt?: string
    updatedAt?: string
}

export interface CreateHomepageSectionData {
    sectionId: string
    name: string
    enabled?: boolean
    sortOrder?: number
    content?: HomepageSectionContent
}

export interface UpdateHomepageSectionData extends Partial<CreateHomepageSectionData> { }

export const getPublicHomepageSections = async (): Promise<HomepageSection[]> => {
    const res = await api.get<{ sections: HomepageSection[] }>("/homepage")
    return res.data?.sections || []
}

export const getAllHomepageSections = async (): Promise<HomepageSection[]> => {
    const res = await api.get<{ sections: HomepageSection[] }>("/homepage/admin/all")
    return res.data?.sections || []
}

export const getHomepageSectionById = async (id: string): Promise<HomepageSection> => {
    const res = await api.get<{ section: HomepageSection }>(`/homepage/admin/${id}`)
    return res.data!.section
}

export const createHomepageSection = async (data: CreateHomepageSectionData): Promise<HomepageSection> => {
    const res = await api.post<{ section: HomepageSection }>("/homepage", data)
    return res.data!.section
}

export const updateHomepageSection = async (
    id: string,
    data: UpdateHomepageSectionData
): Promise<HomepageSection> => {
    const res = await api.patch<{ section: HomepageSection }>(`/homepage/${id}`, data)
    return res.data!.section
}

export const deleteHomepageSection = async (id: string): Promise<void> => {
    await api.delete(`/homepage/${id}`)
}

