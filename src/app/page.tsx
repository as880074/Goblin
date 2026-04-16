import Link from "next/link";
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

      {/* G-MBTI Quiz CTA */}
      <section className="rounded-xl border-2 border-red-900/40 bg-neutral-950 p-6 text-center space-y-3">
        <h2 className="text-xl font-black italic text-red-500 tracking-tight">⚔️ 戀愛地下城靈魂審判</h2>
        <p className="text-sm text-neutral-400">用 20 題靈魂拷問，揭曉你的哥布林真實身份…</p>
        <Link
          href="/goblin/quiz"
          className="inline-block rounded-lg bg-red-900 px-8 py-3 font-bold tracking-widest text-white uppercase hover:bg-red-800 transition-colors shadow-lg"
        >
          開始審判
        </Link>
      </section>

      <ProfileSection />
      {featuredVenue ? (
        <VenueDetail venue={featuredVenue} />
      ) : (
        <p className="text-sm text-mutedForeground">No featured venues available right now.</p>
      )}
    </main>
  );
}
