import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is white-hat link building?",
    answer:
      "White-hat link building refers to ethical SEO practices that comply with search engine guidelines. This includes manual outreach, creating valuable content that naturally attracts links, and building genuine relationships with website owners. We never use PBNs, link farms, or automated link schemes.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Typically, you'll start seeing improvements in rankings within 2-3 months, with more significant results at the 4-6 month mark. The timeline depends on your niche competition, existing authority, and the aggressiveness of your campaign.",
  },
  {
    question: "What is DR (Domain Rating)?",
    answer:
      "Domain Rating is a metric by Ahrefs that measures the strength of a website's backlink profile on a scale of 0-100. Higher DR generally indicates more authority. We focus on securing links from DR 40-70+ websites depending on your package.",
  },
  {
    question: "Do you guarantee specific rankings?",
    answer:
      "We don't guarantee specific rankings because no ethical SEO agency can. What we do guarantee is the delivery of high-quality backlinks from authoritative, relevant websites. Our track record shows consistent ranking improvements.",
  },
  {
    question: "What niches do you work with?",
    answer:
      "We work with businesses across most industries including SaaS, e-commerce, finance, health & wellness, legal, real estate, and more. Some highly regulated niches may require custom strategies.",
  },
  {
    question: "Can I see examples of links you've built?",
    answer:
      "Yes! During our initial consultation, we can share case studies and examples of links we've built for clients in similar industries. We also provide full transparency with live links once your campaign starts.",
  },
  {
    question: "What's included in the reporting?",
    answer:
      "Our reports include all placed links with URLs, anchor text used, target page authority metrics (DR/DA), placement context, and indexation status. Growth plan clients and above also get ranking tracking.",
  },
  {
    question: "How Do We Communicate?",
    answer:
      "You can message our team 24/7 and you'll receive a same-day reply. Clients may also book a call anytime. We schedule regular meetings to review strategy and planning. You will receive a monthly update covering every backlink built and key insights related to your SEO goals.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a partial refund if we fail to deliver the agreed number of links within the campaign period. We're committed to delivering what we promise.",
  },
]

export function FAQSection() {
  return (
    <section className="py-24 bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Everything you need to know about our link building services.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
              <AccordionTrigger className="text-left py-5 hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
