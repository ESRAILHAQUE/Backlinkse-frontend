import { api } from "./api"

export interface ServicePackage {
    name: string
    price: number
    description?: string
    features?: string[]
}

export interface Service {
    _id: string
    serviceId: string
    name: string
    slug: string
    description?: string
    icon: string
    status: "published" | "draft"
    packages: ServicePackage[]
    sortOrder: number
    createdAt?: string
    updatedAt?: string
}

export interface CreateServiceData {
    serviceId: string
    name: string
    slug: string
    description?: string
    icon?: string
    status?: "published" | "draft"
    packages?: ServicePackage[]
    sortOrder?: number
}

export interface UpdateServiceData extends Partial<CreateServiceData> { }

export const getPublicServices = async (): Promise<Service[]> => {
    const res = await api.get<{ services: Service[] }>("/services")
    return res.data?.services || []
}

export const getAllServices = async (): Promise<Service[]> => {
    const res = await api.get<{ services: Service[] }>("/services/admin/all")
    return res.data?.services || []
}

export const getServiceById = async (id: string): Promise<Service> => {
    const res = await api.get<{ service: Service }>(`/services/admin/${id}`)
    return res.data!.service
}

export const createService = async (data: CreateServiceData): Promise<Service> => {
    const res = await api.post<{ service: Service }>("/services", data)
    return res.data!.service
}

export const updateService = async (id: string, data: UpdateServiceData): Promise<Service> => {
    const res = await api.patch<{ service: Service }>(`/services/${id}`, data)
    return res.data!.service
}

export const deleteService = async (id: string): Promise<void> => {
    await api.delete(`/services/${id}`)
}

