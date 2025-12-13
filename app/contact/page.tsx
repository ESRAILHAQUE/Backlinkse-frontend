"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MessageSquare, Calendar, CheckCircle } from "lucide-react"

const contactMethods = [
  {
    icon: Calendar,
    title: "Book a Call",
    description: "Schedule a free 30-minute consultation to discuss your SEO goals.",
    action: "Schedule Now",
    href: "#booking",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a message and we'll respond within 24 hours.",
    action: "hello@backlinkse.com",
    href: "mailto:hello@backlinkse.com",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our team for quick questions during business hours.",
    action: "Start Chat",
    href: "#chat",
  },
]

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    service: "",
    budget: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setFormSubmitted(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-primary py-24 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">Let's Talk About Your SEO</h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Ready to improve your search rankings? Get in touch with our team to discuss your link building needs.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              {contactMethods.map((method) => (
                <Card key={method.title} className="text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                      <method.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{method.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{method.description}</p>
                    <a href={method.href} className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
                      {method.action}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-secondary/30" id="booking">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Request a Quote</h2>
              <p className="mt-4 text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            {formSubmitted ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <CheckCircle className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">Thank You!</h3>
                  <p className="mt-2 text-muted-foreground">
                    We've received your message and will get back to you within 24 hours.
                  </p>
                  <Button className="mt-6" onClick={() => setFormSubmitted(false)}>
                    Send Another Message
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="company" className="text-sm font-medium">
                          Company Name
                        </label>
                        <input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="Acme Inc."
                        />
                      </div>
                      <div>
                        <label htmlFor="website" className="text-sm font-medium">
                          Website URL
                        </label>
                        <input
                          id="website"
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="service" className="text-sm font-medium">
                          Service Interested In *
                        </label>
                        <select
                          id="service"
                          required
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">Select a service</option>
                          <option value="link-building">Link Building Packages</option>
                          <option value="guest-posting">Guest Posting</option>
                          <option value="seo-consulting">SEO Consulting</option>
                          <option value="digital-pr">Digital PR</option>
                          <option value="custom">Custom Solution</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className="text-sm font-medium">
                          Monthly Budget
                        </label>
                        <select
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">Select budget range</option>
                          <option value="1k-2k">$1,000 - $2,000</option>
                          <option value="2k-5k">$2,000 - $5,000</option>
                          <option value="5k-10k">$5,000 - $10,000</option>
                          <option value="10k+">$10,000+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="text-sm font-medium">
                        Tell Us About Your Goals *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        placeholder="What are your SEO goals? What challenges are you facing? Any specific requirements?"
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By submitting this form, you agree to our{" "}
                      <a href="/privacy" className="underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8">Common Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "How quickly will I hear back?",
                  a: "We respond to all inquiries within 24 hours during business days. Urgent requests are prioritized.",
                },
                {
                  q: "Do you offer custom packages?",
                  a: "Yes! We can create custom campaigns tailored to your specific needs, goals, and budget.",
                },
                {
                  q: "What information should I prepare?",
                  a: "It helps to have your website URL, target keywords, and SEO goals ready. We'll guide you through the rest.",
                },
              ].map((item) => (
                <div key={item.q} className="rounded-lg border border-border p-4">
                  <h3 className="font-medium">{item.q}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
