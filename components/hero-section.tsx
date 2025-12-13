import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Shield, Award, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <Shield className="h-4 w-4" />
              100% White-Hat SEO • Trusted by 500+ Companies
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
              <span className="text-primary">Link Building</span> Services for Sustainable Results
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Backlinkse is a link building agency that provides scalable, transparent, and effective backlink solutions
              globally. We help our clients outrank their competitors: with just 7 backlinks built monthly, we have
              increased the traffic threefold!
            </p>

            <ul className="mt-8 space-y-3">
              {["Higher rankings", "Enhanced domain authority", "Increased organic traffic"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link href="/contact">Get a Free SEO Audit</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent" asChild>
                <Link href="/case-studies">View Case Studies</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span>4.9/5 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>312% Avg Traffic Increase</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl bg-secondary/50 p-8">
              {/* Chart visualization */}
              <div className="mb-6 rounded-xl bg-background p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>2021</span>
                  <span>2022</span>
                  <span>2023</span>
                  <span>2024</span>
                  <span>2025</span>
                </div>
                <div className="flex h-32 items-end gap-2">
                  {[20, 35, 50, 75, 95].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-primary/20 transition-all hover:bg-primary/40"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-right">
                    <div className="text-2xl font-bold">600K</div>
                    <div className="text-xs text-muted-foreground">Traffic Growth</div>
                  </div>
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-background p-4 shadow-sm">
                  <div className="text-sm text-muted-foreground">From 0 to</div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">1.9K</span>
                    <span className="text-xs text-muted-foreground">Referring domains</span>
                  </div>
                </div>
                <div className="rounded-xl bg-primary p-4 text-primary-foreground shadow-sm">
                  <div className="text-sm opacity-80">Link building that works!</div>
                  <div className="mt-1 text-2xl font-bold">336k</div>
                  <div className="text-xs opacity-80">Organic traffic</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
