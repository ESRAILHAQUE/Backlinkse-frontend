import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBlogPost, blogPosts } from "@/lib/blog-data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Share2, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Get related posts
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 2)

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <article className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Post header */}
            <header className="mb-12">
              <div className="flex items-center gap-3 text-sm mb-4">
                <span className="rounded-full bg-secondary px-3 py-1 font-medium">{post.category}</span>
                <span className="text-muted-foreground">{post.readTime}</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">{post.title}</h1>
              <p className="mt-4 text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>

              <div className="mt-8 flex items-center justify-between border-t border-b border-border py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{post.author.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {post.author.role} • {post.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </header>

            {/* Post content */}
            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-strong:font-semibold">
              {post.content.split("\n").map((line, index) => {
                if (line.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-12 mb-4 text-foreground">
                      {line.replace("## ", "")}
                    </h2>
                  )
                }
                if (line.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-xl font-semibold mt-8 mb-3 text-foreground">
                      {line.replace("### ", "")}
                    </h3>
                  )
                }
                if (line.startsWith("**") && line.endsWith("**")) {
                  return (
                    <p key={index} className="font-semibold text-foreground mt-6 mb-2">
                      {line.replace(/\*\*/g, "")}
                    </p>
                  )
                }
                if (line.startsWith("- ")) {
                  return (
                    <li key={index} className="text-muted-foreground ml-4">
                      {line.replace("- ", "")}
                    </li>
                  )
                }
                if (line.trim() === "") {
                  return null
                }
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed my-4">
                    {line}
                  </p>
                )
              })}
            </div>

            {/* Author bio */}
            <div className="mt-12 rounded-2xl bg-secondary/50 p-6">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-lg font-medium">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-semibold">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground">{post.author.role}</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Expert in SEO and link building with over 10 years of experience helping businesses grow their
                    organic presence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-secondary/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group rounded-2xl border border-border bg-background p-6 transition-all hover:border-accent/50 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded-full bg-secondary px-3 py-1 font-medium">{relatedPost.category}</span>
                      <span className="text-muted-foreground">{relatedPost.readTime}</span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold group-hover:text-accent transition-colors text-balance">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-accent">
                      Read Article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12 lg:p-16">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                  Ready to Build Your Authority?
                </h2>
                <p className="mt-4 text-primary-foreground/80 leading-relaxed">
                  Let us put these strategies to work for your business. Get started with a free consultation.
                </p>
                <div className="mt-8">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/contact">Book a Free Call</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
