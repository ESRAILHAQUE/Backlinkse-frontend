import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function RefundPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">Refund Policy</h1>
          <p className="mt-4 text-muted-foreground">Last updated: December 10, 2024</p>

          <div className="mt-12 prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
              <p className="text-muted-foreground leading-relaxed">
                We're committed to delivering high-quality link building services that meet your expectations. If we
                fail to deliver what we promised, we'll make it right.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Refund Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You may be eligible for a refund if:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>We fail to deliver the agreed number of links within the campaign period</li>
                <li>Links placed do not meet the specified quality standards (DR/DA thresholds)</li>
                <li>Links are removed within 90 days of placement (replacement or refund)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Non-Refundable Items</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">The following are non-refundable:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Work already completed and delivered</li>
                <li>Content creation fees for published articles</li>
                <li>Consulting fees for completed audits and strategy sessions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">How to Request a Refund</h2>
              <p className="text-muted-foreground leading-relaxed">
                To request a refund, please email billing@backlinkse.com with your order details and reason for the
                refund request. We'll review your request within 5 business days.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
