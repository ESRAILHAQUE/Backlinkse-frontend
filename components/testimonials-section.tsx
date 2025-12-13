import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Backlinkse completely transformed our organic presence. Within 6 months, we went from barely ranking to dominating our niche keywords. The quality of backlinks they secure is unmatched.",
    author: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow Solutions",
    rating: 5,
    results: "+340% organic traffic",
  },
  {
    quote:
      "We've worked with several link building agencies before, but none delivered like Backlinkse. Their data-driven approach and transparent reporting make them stand out from the crowd.",
    author: "Michael Rodriguez",
    role: "SEO Manager",
    company: "GrowthScale Inc",
    rating: 5,
    results: "+180% qualified leads",
  },
  {
    quote:
      "The team at Backlinkse understands that link building is about more than just numbers. They focus on relevance and authority, which has made all the difference for our rankings.",
    author: "Emily Watson",
    role: "Founder & CEO",
    company: "Wellness Digital",
    rating: 5,
    results: "DR 28 to DR 56",
  },
  {
    quote:
      "As a SaaS company in a competitive space, we needed an agency that could deliver high-quality, relevant backlinks. Backlinkse exceeded our expectations in every way.",
    author: "David Park",
    role: "Head of Growth",
    company: "CloudMetrics",
    rating: 5,
    results: "+520% MRR from organic",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: testimonials.map((testimonial, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Review",
                itemReviewed: {
                  "@type": "Service",
                  name: "Link Building Services",
                  provider: {
                    "@type": "Organization",
                    name: "Backlinkse",
                  },
                },
                author: {
                  "@type": "Person",
                  name: testimonial.author,
                  jobTitle: testimonial.role,
                  worksFor: {
                    "@type": "Organization",
                    name: testimonial.company,
                  },
                },
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: testimonial.rating.toString(),
                  bestRating: "5",
                },
                reviewBody: testimonial.quote,
              },
            })),
          }),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Client Success Stories
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            What Our Clients Say About Us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Don't just take our word for it. Here's what business owners and marketing leaders have to say about working
            with Backlinkse.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative rounded-2xl border border-border bg-background p-8 transition-all hover:shadow-lg"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-foreground leading-relaxed">{testimonial.quote}</p>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-primary">{testimonial.results}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
