import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LiveChatWidget } from "@/components/live-chat-widget";
import "./globals.css";

const _inter = Inter({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://backlinkse.com"),
  title: {
    default:
      "Backlinkse | White-Hat Link Building & SEO Services That Drive Real Results",
    template: "%s | Backlinkse",
  },
  description:
    "Premium white-hat link building services trusted by 500+ companies. Increase organic traffic, domain authority, and rankings with our proven data-driven strategies. 100% manual outreach, high-quality backlinks, transparent reporting. Get a free SEO audit today.",
  keywords: [
    "link building services",
    "white hat seo",
    "backlinks",
    "guest posting",
    "digital pr",
    "seo agency",
    "domain authority",
    "organic traffic growth",
  ],
  authors: [{ name: "Backlinkse" }],
  creator: "Backlinkse",
  publisher: "Backlinkse",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://backlinkse.com",
    siteName: "Backlinkse",
    title: "Backlinkse | White-Hat Link Building That Drives Real Results",
    description:
      "Premium link building services trusted by 500+ companies. Increase traffic, authority, and rankings with proven strategies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Backlinkse - Premium Link Building Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Backlinkse | White-Hat Link Building Services",
    description:
      "Premium link building trusted by 500+ companies. Drive real results with proven strategies.",
    images: ["/og-image.png"],
    creator: "@backlinkse",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Backlinkse",
              description: "Premium white-hat link building and SEO services",
              url: "https://backlinkse.com",
              logo: "https://backlinkse.com/logo.png",
              image: "https://backlinkse.com/og-image.png",
              telephone: "+1-800-BACKLINK",
              email: "hello@backlinkse.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
              priceRange: "$$",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "127",
                bestRating: "5",
                worstRating: "1",
              },
              sameAs: [
                "https://twitter.com/backlinkse",
                "https://linkedin.com/company/backlinkse",
              ],
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <LiveChatWidget />
      </body>
    </html>
  );
}
