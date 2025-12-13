"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Home,
  Briefcase,
  DollarSign,
  BarChart3,
  MessageSquare,
  HelpCircle,
  FileText,
  Palette,
  MenuIcon,
  Settings,
  Users,
  ShoppingCart,
  LifeBuoy,
  Receipt,
  Globe,
  LogOut,
  X,
  ChevronDown,
  Link2,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

const sidebarSections = [
  {
    title: "Overview",
    items: [{ name: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "Content Management",
    items: [
      { name: "Homepage Sections", href: "/admin/homepage", icon: Home },
      { name: "Services Manager", href: "/admin/services", icon: Briefcase },
      { name: "Pricing Manager", href: "/admin/pricing", icon: DollarSign },
      { name: "Case Studies", href: "/admin/case-studies", icon: BarChart3 },
      { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
      { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
      { name: "Blog Manager", href: "/admin/blog", icon: FileText },
    ],
  },
  {
    title: "User Management",
    items: [
      { name: "All Users", href: "/admin/users", icon: Users },
      { name: "Orders & Billing", href: "/admin/orders", icon: ShoppingCart },
      { name: "Subscriptions", href: "/admin/subscriptions", icon: Receipt },
      { name: "Support Tickets", href: "/admin/support", icon: LifeBuoy },
    ],
  },
  {
    title: "Settings",
    items: [
      { name: "Theme & Colors", href: "/admin/theme", icon: Palette },
      { name: "Header & Footer", href: "/admin/navigation", icon: MenuIcon },
      { name: "Live Chat Settings", href: "/admin/live-chat", icon: MessageCircle },
      { name: "Global Settings", href: "/admin/settings", icon: Settings },
    ],
  },
]

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<string[]>(sidebarSections.map((s) => s.title))

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-40 bg-foreground/50 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-background border-r border-border transition-transform duration-200 lg:translate-x-0 flex flex-col",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border shrink-0">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Link2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-sm">Backlinkse</span>
              <span className="text-xs text-muted-foreground ml-1">Admin</span>
            </div>
          </Link>
          <button className="lg:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-3 space-y-4 overflow-y-auto flex-1">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground"
              >
                {section.title}
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform",
                    expandedSections.includes(section.title) ? "rotate-0" : "-rotate-90",
                  )}
                />
              </button>
              {expandedSections.includes(section.title) && (
                <div className="mt-1 space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                        )}
                        onClick={onClose}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-border shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
              A
            </div>
            <div>
              <div className="text-sm font-medium">Admin</div>
              <div className="text-xs text-muted-foreground">Super Admin</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
              <Link href="/">
                <Globe className="h-4 w-4 mr-1" />
                View Site
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent" asChild>
              <Link href="/admin/login">
                <LogOut className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
