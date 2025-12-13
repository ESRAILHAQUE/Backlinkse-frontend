import {
  ShoppingCart,
  Stethoscope,
  Scale,
  Landmark,
  GraduationCap,
  Home,
  Plane,
  Dumbbell,
  Car,
  Leaf,
  Monitor,
  Briefcase,
} from "lucide-react"

const niches = [
  { icon: ShoppingCart, name: "E-Commerce" },
  { icon: Stethoscope, name: "Healthcare" },
  { icon: Scale, name: "Legal" },
  { icon: Landmark, name: "Finance" },
  { icon: GraduationCap, name: "Education" },
  { icon: Home, name: "Real Estate" },
  { icon: Plane, name: "Travel" },
  { icon: Dumbbell, name: "Fitness" },
  { icon: Car, name: "Automotive" },
  { icon: Leaf, name: "Sustainability" },
  { icon: Monitor, name: "SaaS" },
  { icon: Briefcase, name: "B2B Services" },
]

export function NichesSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Niches We <span className="text-primary">Work In</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            We have deep expertise across diverse industries, building tailored link strategies that align with your
            market.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {niches.map((niche) => (
            <div
              key={niche.name}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 transition-all hover:border-primary hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <niche.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-center">{niche.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
