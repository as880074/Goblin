import { apiRequest } from "@/shared/api/client";
import { getBaseUrl } from "@/shared/lib/env";

export type Venue = {
  id: string;
  name: string;
  location: string;
  tags: string[];
};

export async function getFeaturedVenues(): Promise<Venue[]> {
  return apiRequest<Venue[]>(`${getBaseUrl()}/api/venues/featured`, {
    next: { revalidate: 1800 },
    transform: (payload) => {
      const data = payload as {
        products: Array<{ id: number; title: string; category: string; brand?: string }>;
      };

      return data.products.map((item) => ({
        id: String(item.id),
        name: item.title,
        location: item.brand ?? "Community verified",
        tags: ["Pet-friendly", item.category],
      }));
    },
  });
}
