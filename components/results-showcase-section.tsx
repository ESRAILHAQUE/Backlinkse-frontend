import Link from "next/link"
import { ArrowUpRight, TrendingUp, Link2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const caseStudyCards = [
  {
    icon: "✏️",
    name: "Career Guidance Service",
    percentage: "14582%",
    trafficBefore: "241",
    trafficAfter: "36k",
    linksBuilt: 551,
    timeSpan: "12 months",
  },
  {
    icon: "✏️",
    name: "Employee Relocation Servi...",
    percentage: "6098%",
    trafficBefore: "357",
    trafficAfter: "22.1k",
    linksBuilt: 262,
    timeSpan: "24 months +",
  },
  {
    icon: "✏️",
    name: "Online Courses Service",
    percentage: "84%",
    trafficBefore: "5m",
    trafficAfter: "9.3m",
    linksBuilt: 682,
    timeSpan: "24 months",
  },
  {
    icon: "✏️",
    name: "Snack Delivery Service",
    percentage: "132%",
    trafficBefore: "428k",
    trafficAfter: "995k",
    linksBuilt: 603,
    timeSpan: "16 months",
  },
]

export function ResultsShowcaseSection() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "#F5F5F0" }}>
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 hidden lg:block">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M30 5L35 25H55L40 35L45 55L30 42L15 55L20 35L5 25H25L30 5Z"
            stroke="#C5C5B8"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      <div className="absolute top-32 left-8 hidden lg:block">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#A8E6CF" }}></div>
      </div>
      <div className="absolute bottom-32 left-12 hidden lg:block">
        <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0L25 35L40 50H0L15 35L20 0Z" fill="#6B9DFC" opacity="0.6" />
          <circle cx="20" cy="12" r="6" fill="#FFB74D" />
        </svg>
      </div>
      <div className="absolute top-24 right-16 hidden lg:block opacity-30">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="35" stroke="#D4A574" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-24 hidden lg:block">
        <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="15" cy="30" rx="8" ry="10" fill="#FF7043" opacity="0.7" />
          <ellipse cx="15" cy="15" rx="5" ry="8" fill="#FFCA28" opacity="0.8" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span>🚀</span>
            <span className="font-medium">Case Studies</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            We get{" "}
            <span className="inline-block px-4 py-1 rounded-lg text-white" style={{ backgroundColor: "#10B981" }}>
              results
            </span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {caseStudyCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Header with Icon and Name */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{card.icon}</span>
                  <span className="font-semibold text-foreground text-sm truncate max-w-[140px]">{card.name}</span>
                </div>
                <span
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: "#D1FAE5", color: "#059669" }}
                >
                  <ArrowUpRight className="w-3 h-3" />
                  {card.percentage}
                </span>
              </div>

              {/* Metrics */}
              <div className="space-y-4">
                {/* Traffic Increase */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <TrendingUp className="w-4 h-4" style={{ color: "#10B981" }} />
                    <span>Traffic Increase</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {card.trafficBefore} <span className="text-muted-foreground">→</span> {card.trafficAfter}
                  </span>
                </div>

                {/* Links Built */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Link2 className="w-4 h-4" style={{ color: "#10B981" }} />
                    <span>Links Built</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{card.linksBuilt}</span>
                </div>

                {/* Time Span */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4" style={{ color: "#6B7280" }} />
                    <span>Time Span</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{card.timeSpan}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link href="/case-studies">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-base font-medium"
              style={{ backgroundColor: "#1F2937", color: "white" }}
            >
              View all Case Studies
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
