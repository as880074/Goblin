export type Venue = {
  id: string;
  name: string;
  location: string;
  tags: string[];
};

const MOCK_VENUES: Venue[] = [
  { id: "1", name: "Goblin Green Park", location: "Taipei", tags: ["Pet-friendly", "Park"] },
  { id: "2", name: "Paws & Beans Cafe", location: "Taichung", tags: ["Pet-friendly", "Cafe"] },
  { id: "3", name: "Wagging Trails", location: "Kaohsiung", tags: ["Pet-friendly", "Trail"] },
];

export async function getFeaturedVenues(): Promise<Venue[]> {
  return MOCK_VENUES;
}
