export interface CaseStudy {
  slug: string
  client: string
  industry: string
  logo: string
  trafficIncrease: string
  trafficBefore: string
  trafficAfter: string
  linksBuilt: number
  drBefore: number
  drAfter: number
  keywordsTop10: number
  duration: string
  featuredImage: string
  overview: string
  challenges: string[]
  strategy: string[]
  execution: string[]
  results: {
    label: string
    before: string
    after: string
    change: string
  }[]
  testimonial?: {
    quote: string
    author: string
    role: string
  }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "career-coaching-platform",
    client: "Career Coaching Platform",
    industry: "Professional Services",
    logo: "💼",
    trafficIncrease: "14,582%",
    trafficBefore: "241",
    trafficAfter: "36K",
    linksBuilt: 551,
    drBefore: 12,
    drAfter: 58,
    keywordsTop10: 847,
    duration: "18 months",
    featuredImage: "/career-coaching-website-analytics-dashboard.jpg",
    overview:
      "A career coaching and resume writing service approached us with virtually no organic presence. Despite having excellent services and client testimonials, they were invisible in search results, relying entirely on paid advertising for leads. Our mission was to build their domain authority from the ground up and establish them as a trusted resource in the career development space.",
    challenges: [
      "Domain Rating of only 12 with minimal backlink profile",
      "Competing against established job boards and career sites with DRs of 70+",
      "No existing content strategy or keyword targeting",
      "Limited brand recognition in a crowded market",
      "High customer acquisition costs from paid channels",
    ],
    strategy: [
      "Conducted comprehensive competitor backlink analysis to identify link opportunities",
      "Developed a content hub strategy focused on career advice and interview tips",
      "Targeted guest posting opportunities on HR, business, and career publications",
      "Built relationships with career coaches and HR professionals for natural link acquisition",
      "Implemented digital PR campaigns around job market trends and salary data",
    ],
    execution: [
      "Month 1-3: Foundation building with 45 high-quality guest posts on relevant industry sites",
      "Month 4-6: Launched career statistics resource page that attracted natural editorial links",
      "Month 7-12: Scaled link acquisition to 40+ links per month while maintaining quality standards",
      "Month 13-18: Focused on competitive keyword targeting with strategic anchor text distribution",
    ],
    results: [
      { label: "Organic Traffic", before: "241/mo", after: "36,000/mo", change: "+14,582%" },
      { label: "Domain Rating", before: "12", after: "58", change: "+46 points" },
      { label: "Keywords in Top 10", before: "23", after: "847", change: "+3,582%" },
      { label: "Monthly Leads", before: "8", after: "340", change: "+4,150%" },
    ],
    testimonial: {
      quote:
        "We went from being invisible online to ranking #1 for our most valuable keywords. The ROI has been incredible - our cost per lead dropped by 80% while lead quality actually improved.",
      author: "Sarah Mitchell",
      role: "Founder & CEO",
    },
  },
  {
    slug: "employee-relocation-service",
    client: "Employee Relocation Service",
    industry: "Corporate Services",
    logo: "🏢",
    trafficIncrease: "6,098%",
    trafficBefore: "357",
    trafficAfter: "22.1K",
    linksBuilt: 262,
    drBefore: 18,
    drAfter: 52,
    keywordsTop10: 423,
    duration: "14 months",
    featuredImage: "/corporate-relocation-services-analytics.jpg",
    overview:
      "A B2B employee relocation company serving Fortune 500 clients needed to establish thought leadership and capture high-intent search traffic. Their services were excellent but their online visibility was poor, causing them to lose deals to competitors with stronger digital presence.",
    challenges: [
      "B2B niche with long sales cycles and complex decision-making processes",
      "Limited content resources and internal marketing capacity",
      "Competing against national relocation firms with established brands",
      "Need for highly targeted traffic from HR directors and C-suite executives",
      "Geographic targeting requirements for multiple service areas",
    ],
    strategy: [
      "Focused on building links from HR, business, and real estate publications",
      "Created comprehensive relocation guides targeting specific metro areas",
      "Developed thought leadership content around remote work and employee mobility trends",
      "Targeted niche industry publications read by HR decision-makers",
      "Built relationships with commercial real estate and corporate housing sites",
    ],
    execution: [
      "Month 1-4: Secured 85 placements on HR and business publications",
      "Month 5-8: Launched city-specific relocation guides with localized link building",
      "Month 9-14: Expanded into digital PR with employee mobility research reports",
    ],
    results: [
      { label: "Organic Traffic", before: "357/mo", after: "22,100/mo", change: "+6,098%" },
      { label: "Domain Rating", before: "18", after: "52", change: "+34 points" },
      { label: "Enterprise Leads", before: "2/mo", after: "28/mo", change: "+1,300%" },
      { label: "Average Deal Size", before: "$45K", after: "$78K", change: "+73%" },
    ],
  },
  {
    slug: "online-learning-platform",
    client: "Online Learning Platform",
    industry: "EdTech",
    logo: "📚",
    trafficIncrease: "84%",
    trafficBefore: "5M",
    trafficAfter: "9.3M",
    linksBuilt: 682,
    drBefore: 65,
    drAfter: 78,
    keywordsTop10: 12500,
    duration: "12 months",
    featuredImage: "/online-education-platform-growth-chart.jpg",
    overview:
      "An established online learning platform with millions of monthly visitors engaged us to accelerate their growth and defend market position against well-funded competitors. Despite their existing success, they were losing ground on key educational keywords.",
    challenges: [
      "Already high domain authority made incremental gains more difficult",
      "Aggressive competition from venture-backed EdTech startups",
      "Need to maintain link quality standards at scale",
      "Broad keyword portfolio requiring diverse link sources",
      "International expansion requiring multi-language link building",
    ],
    strategy: [
      "Implemented enterprise-scale link building across 6 countries",
      "Created linkable assets including industry reports and free tools",
      "Developed scholarship programs that attracted .edu backlinks",
      "Partnered with educational institutions for co-branded content",
      "Launched podcast sponsorship campaign targeting learning-focused shows",
    ],
    execution: [
      "Month 1-3: Audit of existing backlink profile and competitor gap analysis",
      "Month 4-6: Launched 3 major linkable assets generating 200+ organic backlinks",
      "Month 7-12: Scaled international link building across EU, UK, and APAC markets",
    ],
    results: [
      { label: "Organic Traffic", before: "5M/mo", after: "9.3M/mo", change: "+84%" },
      { label: "Domain Rating", before: "65", after: "78", change: "+13 points" },
      { label: "Revenue from Organic", before: "$2.1M/mo", after: "$4.2M/mo", change: "+100%" },
      { label: "Market Share", before: "12%", after: "19%", change: "+58%" },
    ],
    testimonial: {
      quote:
        "At our scale, finding a link building partner that could move the needle seemed impossible. They not only delivered but helped us capture significant market share from our biggest competitors.",
      author: "James Chen",
      role: "VP of Growth",
    },
  },
  {
    slug: "healthy-snacks-delivery",
    client: "Healthy Snacks Delivery",
    industry: "E-Commerce",
    logo: "🥗",
    trafficIncrease: "132%",
    trafficBefore: "428K",
    trafficAfter: "995K",
    linksBuilt: 603,
    drBefore: 48,
    drAfter: 67,
    keywordsTop10: 2840,
    duration: "16 months",
    featuredImage: "/healthy-snack-subscription-box-ecommerce.jpg",
    overview:
      "A direct-to-consumer healthy snack subscription service needed to compete against major retailers and established snack brands in organic search. Their products were exceptional but their SEO couldn't match the marketing budgets of bigger players.",
    challenges: [
      "Competing against Amazon, Walmart, and major CPG brands",
      "Seasonal fluctuations in snack-related search volume",
      "Limited budget compared to enterprise competitors",
      "Need for both branded and non-branded keyword growth",
      "High customer acquisition costs threatening profitability",
    ],
    strategy: [
      "Focused on food, health, and lifestyle publication placements",
      "Created nutrition guides and healthy eating resources as link magnets",
      "Developed influencer partnership program with food bloggers",
      "Targeted health and wellness podcasts for brand mentions and links",
      "Built links around specific diet trends (keto, paleo, vegan)",
    ],
    execution: [
      "Month 1-4: Secured 150 placements on food and health blogs",
      "Month 5-10: Launched diet-specific landing pages with targeted link building",
      "Month 11-16: Scaled successful tactics while testing new link sources",
    ],
    results: [
      { label: "Organic Traffic", before: "428K/mo", after: "995K/mo", change: "+132%" },
      { label: "Domain Rating", before: "48", after: "67", change: "+19 points" },
      { label: "Organic Revenue", before: "$890K/mo", after: "$2.4M/mo", change: "+170%" },
      { label: "CAC Reduction", before: "$28", after: "$14", change: "-50%" },
    ],
  },
  {
    slug: "real-estate-crm",
    client: "Real Estate CRM",
    industry: "SaaS",
    logo: "🏠",
    trafficIncrease: "149%",
    trafficBefore: "16.2K",
    trafficAfter: "40.5K",
    linksBuilt: 494,
    drBefore: 35,
    drAfter: 59,
    keywordsTop10: 1250,
    duration: "12 months",
    featuredImage: "/real-estate-crm-software-dashboard.jpg",
    overview:
      "A B2B SaaS company providing CRM solutions for real estate agents and brokerages needed to establish authority in a competitive vertical dominated by well-established players with significant marketing budgets.",
    challenges: [
      "Competing against CRM giants like Salesforce and HubSpot in search results",
      "Technical product requiring education-focused content strategy",
      "Long B2B sales cycles requiring sustained visibility",
      "Limited domain authority compared to established SaaS competitors",
      "Need to target both agents and brokerage decision-makers",
    ],
    strategy: [
      "Targeted real estate industry publications and technology blogs",
      "Created comprehensive real estate marketing guides and templates",
      "Built relationships with real estate coaches and industry thought leaders",
      "Developed case studies showcasing customer success stories",
      "Launched free tools and calculators to attract natural links",
    ],
    execution: [
      "Month 1-3: Foundation building with 75 guest posts on RE and tech sites",
      "Month 4-8: Launched real estate ROI calculator generating 100+ organic backlinks",
      "Month 9-12: Focused on competitive SaaS and CRM keywords",
    ],
    results: [
      { label: "Organic Traffic", before: "16.2K/mo", after: "40.5K/mo", change: "+149%" },
      { label: "Domain Rating", before: "35", after: "59", change: "+24 points" },
      { label: "Demo Requests", before: "45/mo", after: "180/mo", change: "+300%" },
      { label: "Revenue from Organic", before: "$120K/mo", after: "$450K/mo", change: "+275%" },
    ],
    testimonial: {
      quote:
        "We were struggling to compete with the big CRM players. Now we're outranking them for our most valuable keywords and closing deals we never would have seen before.",
      author: "Michael Rodriguez",
      role: "CMO",
    },
  },
  {
    slug: "document-conversion-tool",
    client: "Document Conversion Tool",
    industry: "SaaS",
    logo: "📄",
    trafficIncrease: "5,329%",
    trafficBefore: "4.9K",
    trafficAfter: "226K",
    linksBuilt: 179,
    drBefore: 22,
    drAfter: 54,
    keywordsTop10: 1890,
    duration: "10 months",
    featuredImage: "/document-converter-tool-website-analytics.jpg",
    overview:
      "A freemium document conversion tool with excellent technology but poor search visibility engaged us to capture high-intent traffic from users actively seeking PDF and document conversion solutions.",
    challenges: [
      "Extremely competitive keyword landscape dominated by established tools",
      "Need for massive traffic to support freemium business model",
      "Multiple competitors with similar products and stronger domains",
      "Limited marketing budget compared to venture-backed competitors",
      "International traffic requirements across multiple languages",
    ],
    strategy: [
      "Focused on technology and productivity publication placements",
      "Created comparison and 'best of' content to capture competitive traffic",
      "Built links from software review sites and tool directories",
      "Developed productivity guides targeting specific use cases",
      "Launched browser extension generating natural backlinks and mentions",
    ],
    execution: [
      "Month 1-3: Secured placements on 60 software review and tech blogs",
      "Month 4-7: Created 15 comparison pages with targeted link building",
      "Month 8-10: Scaled internationally with multi-language outreach",
    ],
    results: [
      { label: "Organic Traffic", before: "4.9K/mo", after: "226K/mo", change: "+5,329%" },
      { label: "Domain Rating", before: "22", after: "54", change: "+32 points" },
      { label: "Free Signups", before: "890/mo", after: "34K/mo", change: "+3,720%" },
      { label: "Paid Conversions", before: "$8K/mo", after: "$180K/mo", change: "+2,150%" },
    ],
  },
  {
    slug: "industrial-equipment-marketplace",
    client: "Industrial Equipment Marketplace",
    industry: "B2B E-Commerce",
    logo: "⚙️",
    trafficIncrease: "595%",
    trafficBefore: "892",
    trafficAfter: "6.2K",
    linksBuilt: 287,
    drBefore: 15,
    drAfter: 44,
    keywordsTop10: 356,
    duration: "14 months",
    featuredImage: "/industrial-machinery-ecommerce-platform.jpg",
    overview:
      "A B2B marketplace for industrial machinery and equipment needed to establish authority in a highly specialized niche where traditional marketing channels were ineffective and expensive.",
    challenges: [
      "Extremely niche industry with limited link building opportunities",
      "Long B2B sales cycles with high-value transactions",
      "Technical products requiring expert content",
      "Limited search volume but very high commercial intent",
      "Competition from established industry trade publications",
    ],
    strategy: [
      "Targeted manufacturing and industrial trade publications",
      "Created equipment buying guides and maintenance resources",
      "Built relationships with industry associations and trade groups",
      "Developed equipment comparison tools and calculators",
      "Launched industry trend reports to attract editorial coverage",
    ],
    execution: [
      "Month 1-4: Foundation with 65 placements on manufacturing and B2B sites",
      "Month 5-10: Created equipment library with 500+ detailed specifications",
      "Month 11-14: Digital PR campaign around manufacturing trends",
    ],
    results: [
      { label: "Organic Traffic", before: "892/mo", after: "6,200/mo", change: "+595%" },
      { label: "Domain Rating", before: "15", after: "44", change: "+29 points" },
      { label: "Qualified RFQs", before: "12/mo", after: "89/mo", change: "+642%" },
      { label: "Average Order Value", before: "$45K", after: "$72K", change: "+60%" },
    ],
  },
  {
    slug: "cybersecurity-solutions",
    client: "Cybersecurity Solutions",
    industry: "Enterprise Tech",
    logo: "🔐",
    trafficIncrease: "36%",
    trafficBefore: "29K",
    trafficAfter: "39.4K",
    linksBuilt: 212,
    drBefore: 52,
    drAfter: 65,
    keywordsTop10: 890,
    duration: "10 months",
    featuredImage: "/cybersecurity-software-enterprise-solution.jpg",
    overview:
      "An enterprise cybersecurity company needed to maintain and expand their organic presence in an increasingly competitive space while navigating the technical complexities of YMYL content in the security sector.",
    challenges: [
      "YMYL content requiring high trust signals and authoritative sources",
      "Enterprise sales requiring visibility to C-suite decision makers",
      "Rapidly evolving industry requiring timely content and links",
      "Competition from both established vendors and well-funded startups",
      "Need for highly technical content that still attracts links",
    ],
    strategy: [
      "Focused on technology, business, and security-focused publications",
      "Created threat intelligence reports and security research",
      "Built relationships with cybersecurity analysts and researchers",
      "Developed compliance guides for specific industries (HIPAA, SOC2, etc.)",
      "Launched security awareness resources for enterprise teams",
    ],
    execution: [
      "Month 1-3: Secured 55 placements on security and enterprise tech sites",
      "Month 4-7: Published 3 original research reports attracting 80+ links",
      "Month 8-10: Expanded thought leadership with executive bylines",
    ],
    results: [
      { label: "Organic Traffic", before: "29K/mo", after: "39.4K/mo", change: "+36%" },
      { label: "Domain Rating", before: "52", after: "65", change: "+13 points" },
      { label: "Enterprise Demos", before: "23/mo", after: "56/mo", change: "+143%" },
      { label: "Pipeline Value", before: "$2.1M/mo", after: "$4.8M/mo", change: "+129%" },
    ],
    testimonial: {
      quote:
        "In the enterprise security space, trust is everything. They helped us build the authoritative backlink profile that our sales team needed to close larger deals.",
      author: "David Park",
      role: "VP of Marketing",
    },
  },
]
