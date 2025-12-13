const clientLogos = [
  { name: "TechCorp", initial: "T" },
  { name: "GrowthLabs", initial: "G" },
  { name: "DataFlow", initial: "D" },
  { name: "ScaleUp", initial: "S" },
  { name: "CloudNine", initial: "C" },
  { name: "Innovate", initial: "I" },
  { name: "Quantum", initial: "Q" },
  { name: "Nexus", initial: "N" },
]

export function ClientLogosSection() {
  return (
    <section className="border-y border-border bg-secondary/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          Trusted by 500+ companies worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {clientLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2 text-muted-foreground/60 transition-colors hover:text-muted-foreground"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted font-bold text-lg">
                {logo.initial}
              </div>
              <span className="text-lg font-semibold">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
