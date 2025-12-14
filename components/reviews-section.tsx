import { Star, CheckCircle } from "lucide-react"

const reviews = [
    {
        name: "Alex Thompson",
        role: "SEO Director",
        company: "Digital Ventures",
        rating: 5,
        review:
            "Backlinkse has been instrumental in our SEO success. Their strategic approach to link building has helped us achieve top rankings for our target keywords. Highly recommend!",
        verified: true,
        date: "2 months ago",
    },
    {
        name: "Jessica Martinez",
        role: "Marketing Lead",
        company: "ScaleUp Marketing",
        rating: 5,
        review:
            "The quality of backlinks we've received is outstanding. Our domain authority has increased significantly, and we're seeing consistent organic traffic growth month over month.",
        verified: true,
        date: "3 months ago",
    },
    {
        name: "Robert Kim",
        role: "Founder",
        company: "TechStart Solutions",
        rating: 5,
        review:
            "Working with Backlinkse has been a game-changer. Their team is professional, responsive, and delivers exactly what they promise. Our rankings have improved dramatically.",
        verified: true,
        date: "1 month ago",
    },
]

export function ReviewsSection() {
    return (
        <section className="py-20 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                        Client Reviews
                    </span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                        See what our clients have to say about their experience working with Backlinkse
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="relative rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex gap-1">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                    ))}
                                </div>
                                {review.verified && (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <CheckCircle className="h-3 w-3 text-primary" />
                                        <span>Verified</span>
                                    </div>
                                )}
                            </div>

                            <p className="text-foreground leading-relaxed mb-4">{review.review}</p>

                            <div className="flex items-center gap-3 pt-4 border-t border-border">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                                    {review.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-sm text-foreground">{review.name}</div>
                                    <div className="text-xs text-muted-foreground truncate">
                                        {review.role}, {review.company}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">{review.date}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

