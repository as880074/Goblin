export type VenueComment = {
  id: string;
  body: string;
};

const MOCK_COMMENTS: Record<string, VenueComment[]> = {
  "1": [
    { id: "1-1", body: "Great pet water station and shade." },
    { id: "1-2", body: "Friendly staff gave treats to our dog." },
  ],
  "2": [
    { id: "2-1", body: "Cozy spot with a pet menu." },
    { id: "2-2", body: "Our cat loved the window seat." },
  ],
  "3": [
    { id: "3-1", body: "Beautiful trail, dogs can go off-leash." },
    { id: "3-2", body: "Well-maintained and pet-safe." },
  ],
};

export async function getVenueComments(venueId: string): Promise<VenueComment[]> {
  return MOCK_COMMENTS[venueId] ?? [
    { id: `${venueId}-1`, body: "Great pet water station and shade." },
    { id: `${venueId}-2`, body: "Friendly staff gave treats to our dog." },
  ];
}
