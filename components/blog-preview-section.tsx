import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const posts = [
  {
    title: "The Complete Guide to White-Hat Link Building in 2024",
    excerpt:
      "Learn the strategies and tactics that top SEO agencies use to build high-quality backlinks without risking penalties.",
    category: "Link Building",
    date: "Dec 5, 2024",
    slug: "white-hat-link-building-guide",
  },
  {
    title: "How to Evaluate Backlink Quality: DR, DA, and Beyond",
    excerpt:
      "Not all backlinks are created equal. Discover the metrics that actually matter when assessing link value.",
    category: "SEO Strategy",
    date: "Nov 28, 2024",
    slug: "evaluate-backlink-quality",
  },
  {
    title: "Case Study: 312% Traffic Increase in 6 Months",
    excerpt: "See how we helped an e-commerce brand triple their organic traffic through strategic link building.",
    category: "Case Study",
    date: "Nov 15, 2024",
    slug: "ecommerce-case-study",
  },
]

export function BlogPreviewSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Link Building Blog</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              Expert insights, strategies, and case studies to help you understand and master SEO link building.
            </p>
          </div>
          <Button variant="ghost" className="hidden sm:flex" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-border bg-background p-6 transition-all hover:border-accent/50 hover:shadow-lg"
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-secondary px-3 py-1 font-medium">{post.category}</span>
                <span className="text-muted-foreground">{post.date}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold group-hover:text-accent transition-colors text-balance">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-accent">
                Read More
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
