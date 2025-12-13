"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Link2,
  FileEdit,
  BarChart3,
  Users,
  ShoppingCart,
  CreditCard,
  Receipt,
  FileText,
  LifeBuoy,
  LogOut,
  X,
  FolderKanban,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Link Building Packages", href: "/dashboard/link-building", icon: Link2 },
  { name: "Guest Posting", href: "/dashboard/guest-posting", icon: FileEdit },
  { name: "Case Studies", href: "https://v0-backlinkse.vercel.app/case-studies", icon: BarChart3, external: true },
  { name: "Add Team", href: "/dashboard/team", icon: Users },
  { name: "My Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Payment", href: "/dashboard/payment", icon: CreditCard },
  { name: "Subscriptions", href: "/dashboard/subscriptions", icon: Receipt },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Support Tickets", href: "/dashboard/support", icon: LifeBuoy },
]

interface DashboardSidebarProps {
  open: boolean
  onClose: () => void
}

export function DashboardSidebar({ open, onClose }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-40 bg-foreground/50 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-background border-r border-border transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg
                className="h-5 w-5 text-primary-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <span className="font-bold">Backlinkse</span>
          </Link>
          <button className="lg:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-10rem)]">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            const linkProps = item.external ? { target: "_blank", rel: "noopener noreferrer" } : {}
            return (
              <Link
                key={item.name}
                href={item.href}
                {...linkProps}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
                onClick={onClose}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
                {item.external && <ExternalLink className="h-3 w-3 ml-auto" />}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
              JD
            </div>
            <div>
              <div className="text-sm font-medium">John Doe</div>
              <div className="text-xs text-muted-foreground">Growth Plan</div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
            <Link href="/">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Link>
          </Button>
        </div>
      </aside>
    </>
  )
}
