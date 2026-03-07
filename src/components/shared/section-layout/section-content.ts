export type SectionName = "about" | "how-it-works" | "templates" | "pricing";

interface SectionContent {
  badge: string;
  headline: string;
  subheadline: string;
}

export const sectionContent: Record<SectionName, SectionContent> = {
  about: {
    badge: "About",
    headline: "Drowning in documents?",
    subheadline:
      "With Fluxtract, there's no need for manual document processing, making your workflow smoother than ever.",
  },
  "how-it-works": {
    badge: "How it works",
    headline: "Simple. Fast. Automatic.",
    subheadline:
      "Upload your documents, define your schema, and let Fluxtract handle the rest — structured data delivered in seconds.",
  },
  templates: {
    badge: "Templates",
    headline: "Ready-made extraction flows",
    subheadline:
      "Start with pre-built templates for invoices, contracts, receipts, and more — or create your own from scratch.",
  },
  pricing: {
    badge: "Pricing",
    headline: "Plans that scale with you",
    subheadline:
      "From solo professionals to enterprise teams, pick the plan that fits your document processing needs.",
  },
};
