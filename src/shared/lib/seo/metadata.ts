import type { Metadata } from "next";

const siteName = "Goblin";
const title = "Goblin | Pet-friendly Venue Discovery";
const description = "Discover pet-friendly cafes, parks, and spaces with trusted community reviews.";

export const baseMetadata: Metadata = {
  metadataBase: new URL("https://goblin.example.com"),
  title,
  description,
  applicationName: siteName,
  openGraph: {
    title,
    description,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};
