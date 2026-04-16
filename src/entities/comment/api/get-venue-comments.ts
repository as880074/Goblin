import { apiRequest } from "@/shared/api/client";
import { getBaseUrl } from "@/shared/lib/env";

export type VenueComment = {
  id: string;
  body: string;
};

export async function getVenueComments(venueId: string): Promise<VenueComment[]> {
  return apiRequest<VenueComment[]>(`${getBaseUrl()}/api/venues/${venueId}/comments`, {
    next: { revalidate: 900 },
    transform: (payload) => {
      const data = payload as { comments: Array<{ id: string; body: string }> };
      return data.comments.slice(0, 2).map((comment) => ({ id: comment.id, body: comment.body }));
    },
  });
}
