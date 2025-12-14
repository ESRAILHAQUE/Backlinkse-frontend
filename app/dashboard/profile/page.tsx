"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { getMyProfile, updateMyProfile, deleteMyProfile, type User } from "@/lib/users"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { removeAuthToken } from "@/lib/api"

export default function ProfilePage() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const fetchProfile = async () => {
        try {
            setLoading(true)
            const me = await getMyProfile()
            setUser(me)
            setName(me.name || "")
            setEmail(me.email || "")
        } catch (error) {
            toast.error("Failed to load profile")
            router.push("/login")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfile()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setSaving(true)
            const updated = await updateMyProfile({ name, email })
            setUser(updated)
            toast.success("Profile updated")
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to update profile")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete your account? This will deactivate your access.")) return
        try {
            await deleteMyProfile()
            removeAuthToken()
            toast.success("Account deleted")
            router.push("/signup")
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to delete account")
        }
    }

    if (loading) {
        return (
            <div className="space-y-4">
                <h1 className="text-2xl font-bold">Profile</h1>
                <p className="text-muted-foreground">Loading...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Profile</h1>
                <p className="text-muted-foreground">Manage your personal information and account.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Account Details</CardTitle>
                    <CardDescription>Update your name and email.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSave}>
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <Button type="submit" disabled={saving}>
                            {saving ? "Saving..." : "Save changes"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Account Status</CardTitle>
                    <CardDescription>View your access state.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <div>
                        <span className="font-medium text-foreground">Role:</span> {user?.role || "user"}
                    </div>
                    <div>
                        <span className="font-medium text-foreground">Verified:</span> {user?.isVerified ? "Yes" : "Pending"}
                    </div>
                    <div>
                        <span className="font-medium text-foreground">Suspended:</span> {user?.isSuspended ? "Yes" : "No"}
                    </div>
                    <div>
                        <span className="font-medium text-foreground">Active:</span> {user?.isActive ? "Yes" : "No"}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Danger Zone</CardTitle>
                    <CardDescription>Delete your account. This disables your access.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete My Account
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}


