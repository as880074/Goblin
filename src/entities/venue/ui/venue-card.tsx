import type { Venue } from "@/entities/venue/api/get-featured-venues";

type VenueCardProps = {
  venue: Venue;
};

export function VenueCard({ venue }: VenueCardProps) {
  return (
    <article className="rounded-xl border border-border bg-surface p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground">{venue.name}</h3>
      <p className="mt-1 text-sm text-mutedForeground">{venue.location}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {venue.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-background px-2 py-1 text-xs text-mutedForeground">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
