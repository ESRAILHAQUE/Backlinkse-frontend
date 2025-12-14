"use client"

import { useEffect, useState } from "react"
import { getCurrentUser } from "@/lib/auth"
import { setUser, getUser } from "@/lib/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function PendingApprovalPage() {
    const router = useRouter()
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const fresh = await getCurrentUser()
                if (fresh) {
                    setUser(fresh)
                }
                const effective = fresh || getUser()
                if (effective?.isVerified) {
                    toast.success("Your account is now approved.")
                    const role = effective.role || "user"
                    router.replace(role === "admin" || role === "moderator" ? "/admin" : "/dashboard")
                    return
                }
            } catch {
                // ignore and stay on page
            } finally {
                setChecking(false)
            }
        }
        checkStatus()
    }, [router])

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4 py-12">
                <p className="text-muted-foreground">Checking your approval status...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4 py-12">
            <div className="max-w-md w-full bg-background border border-border rounded-xl p-8 shadow-sm text-center space-y-4">
                <h1 className="text-2xl font-bold">Awaiting Admin Approval</h1>
                <p className="text-muted-foreground">
                    Thanks for signing up! Your account is pending admin verification. You’ll get access as soon as it’s
                    approved.
                </p>
                <p className="text-sm text-muted-foreground">
                    If you need expedited approval, please reach out to support@backlinkse.com.
                </p>
            </div>
        </div>
    )
}


