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
    badge: "How it works?",
    headline: "Easy to build workflows",
    subheadline:
      "Create a workflow in minutes to simplify your document analysis process.",
  },
  templates: {
    badge: "Templates",
    headline: "Create templates",
    subheadline:
      "With templates, you can extract information from any kind of document more easily.",
  },
  pricing: {
    badge: "Pricing",
    headline: "Get early access",
    subheadline:
      "Subscribe to get notified when the app is launched and be among the first to try it out.",
  },
};
