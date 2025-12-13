"use client"

import Link from "next/link"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const competitors = [
  {
    name: "Fiverr",
    icon: "🟢",
    strategist: false,
    analysis: false,
    sustainable: false,
    relationships: false,
    bigScale: true,
  },
  {
    name: "Freelancers",
    icon: "👤",
    strategist: false,
    analysis: true,
    sustainable: false,
    relationships: false,
    bigScale: false,
  },
  {
    name: "Backlinkse",
    icon: "🔗",
    isHighlighted: true,
    strategist: true,
    analysis: true,
    sustainable: true,
    relationships: true,
    bigScale: true,
  },
  {
    name: "Link Brokers",
    icon: "🔄",
    strategist: false,
    analysis: false,
    sustainable: false,
    relationships: false,
    bigScale: true,
  },
  {
    name: "Other Agencies",
    icon: "🏢",
    strategist: false,
    analysis: true,
    sustainable: false,
    relationships: false,
    bigScale: true,
  },
]

const columns = ["Strategist", "Analysis", "Sustainable", "Relationships", "Big Scale"]

export function ComparisonSection() {
  return (
    <section className="py-20 bg-[#F5F5F0]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span>🎯</span>
            <span>Us vs. Competitors</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Why choose <span className="bg-primary text-primary-foreground px-3 py-1 rounded-lg">Backlinkse?</span>
          </h2>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-6 gap-4 px-6 py-4 border-b border-border text-sm text-muted-foreground font-medium">
            <div>Other Services</div>
            {columns.map((col) => (
              <div key={col} className="text-center">
                {col}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-border">
            {competitors.map((competitor) => (
              <div
                key={competitor.name}
                className={`grid grid-cols-2 md:grid-cols-6 gap-4 px-6 py-5 items-center transition-colors ${
                  competitor.isHighlighted ? "bg-primary" : "hover:bg-muted/30"
                }`}
              >
                {/* Company Name */}
                <div className="flex items-center gap-3">
                  <span className="text-xl">{competitor.icon}</span>
                  <span
                    className={`font-medium ${
                      competitor.isHighlighted ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    {competitor.name}
                  </span>
                </div>

                {/* Mobile: Show all features in a row */}
                <div className="flex items-center justify-end gap-2 md:hidden">
                  {[
                    competitor.strategist,
                    competitor.analysis,
                    competitor.sustainable,
                    competitor.relationships,
                    competitor.bigScale,
                  ].map((value, idx) => (
                    <div key={idx}>
                      {value ? (
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            competitor.isHighlighted
                              ? "bg-primary-foreground text-primary"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                            competitor.isHighlighted
                              ? "border-primary-foreground/30 text-primary-foreground/50"
                              : "border-border text-muted-foreground/50"
                          }`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Desktop: Individual columns */}
                <div className="hidden md:contents">
                  {[
                    competitor.strategist,
                    competitor.analysis,
                    competitor.sustainable,
                    competitor.relationships,
                    competitor.bigScale,
                  ].map((value, idx) => (
                    <div key={idx} className="flex justify-center">
                      {value ? (
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            competitor.isHighlighted
                              ? "bg-primary-foreground text-primary"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </div>
                      ) : (
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                            competitor.isHighlighted
                              ? "border-primary-foreground/30 text-primary-foreground/50"
                              : "border-border text-muted-foreground/50"
                          }`}
                        >
                          <X className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="flex items-center justify-center mt-12">
          <div className="bg-white rounded-full px-4 py-2 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center overflow-hidden">
              <img src="/friendly-professional-headshot.jpg" alt="Team member" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm text-foreground font-medium">Catch our drift?</span>
            <Button asChild size="sm" className="rounded-full">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
