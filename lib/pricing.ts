import { api } from "./api"

export interface PricingPlan {
    _id: string
    name: string
    price: number
    linksPerMonth: string
    features: string[]
    popular: boolean
    enabled: boolean
    buttonText: string
    buttonLink: string
    sortOrder: number
    createdAt?: string
    updatedAt?: string
}

export const getPublicPricingPlans = async (): Promise<PricingPlan[]> => {
    const res = await api.get<{ plans: PricingPlan[] }>("/pricing")
    return res.data?.plans || []
}

export const getAllPricingPlans = async (): Promise<PricingPlan[]> => {
    const res = await api.get<{ plans: PricingPlan[] }>("/pricing/admin/all")
    return res.data?.plans || []
}

export const createPricingPlan = async (plan: Partial<PricingPlan>): Promise<PricingPlan> => {
    const res = await api.post<{ plan: PricingPlan }>("/pricing", plan)
    return res.data!.plan
}

export const updatePricingPlan = async (id: string, plan: Partial<PricingPlan>): Promise<PricingPlan> => {
    const res = await api.patch<{ plan: PricingPlan }>(`/pricing/${id}`, plan)
    return res.data!.plan
}

export const deletePricingPlan = async (id: string): Promise<void> => {
    await api.delete(`/pricing/${id}`)
}

