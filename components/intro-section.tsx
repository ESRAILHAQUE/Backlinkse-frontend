import Image from "next/image"

export function IntroSection() {
  const steps = [
    {
      number: 1,
      title: "Research",
      description:
        "We analyze your niche, competitors, and target keywords to identify the highest-impact link opportunities for your domain.",
    },
    {
      number: 2,
      title: "Outreach",
      description:
        "Our team connects with authoritative publishers and site owners through personalized, relationship-driven outreach campaigns.",
    },
    {
      number: 3,
      title: "Link Placement",
      description:
        "We secure contextual backlinks from relevant, high-authority websites that align with your industry and content strategy.",
    },
    {
      number: 4,
      title: "Performance Tracking",
      description:
        "Monitor your rankings, traffic growth, and link metrics in real-time through our transparent reporting dashboard.",
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Two column layout */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left side - Text content */}
          <div>
            <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
              <span>👋</span> Welcome to Backlinkse
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-foreground leading-tight">
              We build authoritative backlinks that{" "}
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-lg inline-block mt-1">
                boost rankings and organic traffic
              </span>
            </h2>

            <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Using a strategic, data-driven approach with proven link acquisition methods, our services significantly
                improve your search engine rankings and SEO performance.
              </p>
              <p>
                Our service is trusted by leading SEO managers worldwide because{" "}
                <strong className="text-foreground">we deliver incredible backlinks</strong> that other link building
                providers simply cannot match.
              </p>
              <p>
                Our process works by acquiring high relevance links to key target pages on your domain, which is the
                most important Google ranking factor.
              </p>
            </div>
          </div>

          {/* Right side - Image container */}
          <div className="relative">
            <div className="relative rounded-3xl bg-primary overflow-hidden aspect-[4/3]">
              {/* SEO Growth Illustration */}
              <Image
                src="/seo-analytics-dashboard-with-traffic-growth-charts.jpg"
                alt="SEO growth analytics dashboard"
                fill
                className="object-cover"
              />

              {/* Decorative elements */}
              <div className="absolute top-6 right-6">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-primary-foreground/30">
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
                  <path d="M24 8v32M8 24h32" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>

              {/* Bottom card overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background" />
                    <div className="w-8 h-8 rounded-full bg-primary/40 border-2 border-background" />
                    <div className="w-8 h-8 rounded-full bg-primary/60 border-2 border-background" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">500+ Clients Ranked</p>
                    <p className="text-xs text-muted-foreground">Join successful businesses</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile bubble - overlapping bottom left */}
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full border-4 border-background shadow-lg overflow-hidden bg-secondary">
              <Image src="/friendly-professional-headshot.jpg" alt="SEO Expert" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* 4-step process row */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                {step.number}
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
