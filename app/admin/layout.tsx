"use client"

import type React from "react"
import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Menu, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Suspense } from "react"
import { usePathname } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <AuthGuard allowedRoles={["admin", "moderator"]} requireVerified>
      <div className="min-h-screen bg-secondary/30">
        <Suspense fallback={<div>Loading...</div>}>
          <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </Suspense>

        <div className="lg:pl-64">
          {/* Top bar */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </button>
              <div className="hidden sm:block relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search admin..." className="pl-9 bg-secondary/50 border-0" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              </Button>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                A
              </div>
            </div>
          </header>

          <main className="p-4 sm:p-6 lg:p-8">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
