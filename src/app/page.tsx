import { getFeaturedVenues } from "@/entities/venue/api/get-featured-venues";
import { buildPlatformJsonLd } from "@/shared/lib/seo";
import { ProfileSection } from "@/widgets/profile-section/ui/profile-section";
import { VenueDetail } from "@/widgets/venue-detail/ui/venue-detail";

export default async function Home() {
  const venues = await getFeaturedVenues();
  const [featuredVenue] = venues;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPlatformJsonLd()) }} />
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Pet-friendly venue discovery platform</h1>
        <p className="text-sm text-mutedForeground">Find and explore pet-friendly spaces curated by the Goblin community.</p>
      </header>
      <ProfileSection />
      {featuredVenue ? (
        <VenueDetail venue={featuredVenue} />
      ) : (
        <p className="text-sm text-mutedForeground">No featured venues available right now.</p>
      )}
    </main>
  );
}
