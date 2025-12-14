"use client"

import { ReactNode, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getUser, getAuthToken } from "@/lib/api"
import { toast } from "sonner"

interface AuthGuardProps {
    children: ReactNode
    allowedRoles?: Array<"admin" | "moderator" | "user">
    requireVerified?: boolean
}

/**
 * Simple client-side auth/role/verification guard.
 * Relies on tokens + user data stored in localStorage.
 */
export function AuthGuard({ children, allowedRoles, requireVerified = true }: AuthGuardProps) {
    const router = useRouter()
    const pathname = usePathname()
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const token = getAuthToken()
        const user = getUser()

        if (!token || !user) {
            router.replace("/login")
            return
        }

        if (requireVerified && user.isVerified === false) {
            toast.info("Your account is pending admin approval.")
            router.replace("/pending-approval")
            return
        }

        if (allowedRoles && !allowedRoles.includes(user.role || "user")) {
            toast.error("You are not authorized to access this area.")
            router.replace("/dashboard")
            return
        }

        setReady(true)
    }, [allowedRoles, requireVerified, router, pathname])

    if (!ready) {
        return null
    }

    return <>{children}</>
}


