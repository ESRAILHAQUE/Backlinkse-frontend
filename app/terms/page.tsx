import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-4 text-muted-foreground">Last updated: December 10, 2024</p>

          <div className="mt-12 prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Backlinkse provides link building and SEO services as described on our website. All services are subject
                to availability and our acceptance of your order.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Payment Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Payment is due upon receipt of invoice unless otherwise agreed in writing. Monthly packages are billed
                at the beginning of each service period.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Service Delivery</h2>
              <p className="text-muted-foreground leading-relaxed">
                We commit to delivering the agreed number of links within the campaign period. Link placements may vary
                in timing based on outreach success and publication schedules.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Refund Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                If we fail to deliver the agreed number of links, we offer a prorated refund or credit towards future
                services. Due to the nature of outreach work, full refunds are not available once a campaign has begun.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we follow best practices, we cannot guarantee specific ranking improvements as search engine
                algorithms are outside our control.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Questions about these terms should be directed to legal@backlinkse.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
