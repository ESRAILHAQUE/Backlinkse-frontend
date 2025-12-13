"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
          <span className="text-xl font-bold tracking-tight">Backlinkse</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Services
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link href="/services/link-building">Link Building Packages</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/guest-posting">Guest Posting</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/link-insertions">Link Insertions</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/platinum-links">Platinum Links</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/seo-blog-writing">SEO Blog Writing</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="/case-studies"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Case Studies
          </Link>
          
          <Link
            href="/blog"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact Us
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" className="rounded-full px-4" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button size="sm" className="rounded-full px-6" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            <Link href="/about" className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary">
              Who We Are
            </Link>
            <div className="px-4 py-2 text-sm font-medium text-muted-foreground">Services</div>
            <Link href="/services/link-building" className="rounded-lg px-6 py-2 text-sm hover:bg-secondary">
              Link Building Packages
            </Link>
            <Link href="/services/guest-posting" className="rounded-lg px-6 py-2 text-sm hover:bg-secondary">
              Guest Posting
            </Link>
            <Link href="/services/link-insertions" className="rounded-lg px-6 py-2 text-sm hover:bg-secondary">
              Link Insertions
            </Link>
            <Link href="/services/platinum-links" className="rounded-lg px-6 py-2 text-sm hover:bg-secondary">
              Platinum Links
            </Link>
            <Link href="/services/seo-blog-writing" className="rounded-lg px-6 py-2 text-sm hover:bg-secondary">
              SEO Blog Writing
            </Link>
            <Link href="/pricing" className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary">
              Pricing
            </Link>
            <Link href="/case-studies" className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary">
              Case Studies
            </Link>
            <Link href="/resources" className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary">
              Resources
            </Link>
            <Link href="/blog" className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary">
              Blog
            </Link>
            <Link href="/contact" className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary">
              Contact Us
            </Link>
            <div className="mt-4 flex flex-col gap-2">
              <Button variant="outline" className="w-full rounded-full bg-transparent" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button className="w-full rounded-full" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
