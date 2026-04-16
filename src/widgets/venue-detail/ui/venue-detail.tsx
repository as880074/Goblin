import { getVenueComments } from "@/entities/comment/api/get-venue-comments";
import { CommentList } from "@/entities/comment/ui/comment-list";
import type { Venue } from "@/entities/venue/api/get-featured-venues";
import { VenueCard } from "@/entities/venue/ui/venue-card";

import { VenueDetailClient } from "./venue-detail-client";

type VenueDetailProps = {
  venue: Venue;
};

export async function VenueDetail({ venue }: VenueDetailProps) {
  const comments = await getVenueComments(venue.id);

  return (
    <section className="space-y-4">
      <VenueCard venue={venue} />
      <VenueDetailClient venueId={venue.id} />
      <CommentList comments={comments} />
    </section>
  );
}
