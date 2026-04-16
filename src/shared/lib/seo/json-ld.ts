import type { JsonLdPayload } from "@/shared/types/api";

export const buildPlatformJsonLd = (): JsonLdPayload => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Goblin",
  description: "Pet-friendly venue discovery platform",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://as880074.github.io/Goblin/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
});
