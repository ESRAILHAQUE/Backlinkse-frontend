import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { blogPosts, getAllCategories } from "@/lib/blog-data"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function BlogPage() {
  const categories = getAllCategories()
  const featuredPost = blogPosts.find((post) => post.featured)
  const otherPosts = blogPosts.filter((post) => post !== featuredPost)

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-primary py-24 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">Link Building Blog</h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Expert insights, strategies, and case studies to help you master SEO and link building.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-4 overflow-x-auto py-4">
              <Link
                href="/blog"
                className="whitespace-nowrap rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                All Posts
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="whitespace-nowrap rounded-full bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block rounded-2xl border border-border bg-background p-8 transition-all hover:border-accent/50 hover:shadow-lg lg:p-12"
              >
                <div className="flex items-center gap-3 text-sm">
                  <span className="rounded-full bg-accent px-3 py-1 font-medium text-accent-foreground">Featured</span>
                  <span className="rounded-full bg-secondary px-3 py-1 font-medium">{featuredPost.category}</span>
                  <span className="text-muted-foreground">{featuredPost.readTime}</span>
                </div>
                <h2 className="mt-6 text-3xl font-bold tracking-tight group-hover:text-accent transition-colors sm:text-4xl text-balance">
                  {featuredPost.title}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-3xl">{featuredPost.excerpt}</p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                      {featuredPost.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{featuredPost.author.name}</div>
                      <div className="text-xs text-muted-foreground">{featuredPost.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-accent">
                    Read Article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* All Posts Grid */}
        <section className="py-16 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">All Articles</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-border bg-background p-6 transition-all hover:border-accent/50 hover:shadow-lg"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-secondary px-3 py-1 font-medium">{post.category}</span>
                    <span className="text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold group-hover:text-accent transition-colors text-balance">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">{post.date}</div>
                    <div className="flex items-center gap-2 text-sm font-medium text-accent">
                      Read
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold sm:text-3xl text-balance">Get SEO Insights in Your Inbox</h2>
                <p className="mt-4 text-primary-foreground/80">
                  Join 5,000+ marketers receiving our weekly link building tips and industry updates.
                </p>
                <form className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 sm:w-80"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-primary-foreground px-6 py-3 font-medium text-primary hover:bg-primary-foreground/90 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="mt-4 text-xs text-primary-foreground/60">No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
