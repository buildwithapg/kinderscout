export type AgeGroup = "toddlers" | "kids" | "pre-teens" | "teens";
export type Interest = "Sports" | "Arts" | "STEM" | "Music" | "Dance" | "Outdoor Adventures" | "Creative" | "Cooking";
export type ActivityType = "Indoor" | "Outdoor" | "Hybrid";

export interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  ageGroups: AgeGroup[];
  ageSuitability: string;
  location: string;
  address: string;
  date: string;
  time: string;
  price: number;
  isFree: boolean;
  rating: number;
  reviewCount: number;
  tags: Interest[];
  activityType: ActivityType;
  organizer: string;
  organizerDesc: string;
  imageUrl: string;
  lat: number;
  lng: number;
}

export const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  toddlers: "Toddlers (1–3)",
  kids: "Kids (4–8)",
  "pre-teens": "Pre-teens (9–12)",
  teens: "Teens (13+)",
};

export const INTERESTS: Interest[] = [
  "Sports", "Arts", "STEM", "Music", "Dance", "Outdoor Adventures", "Creative", "Cooking"
];

// Helper to map DB row to Event interface
export function mapDbEvent(row: any): Event {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    fullDescription: row.full_description ?? "",
    ageGroups: row.age_groups ?? [],
    ageSuitability: row.age_suitability ?? "",
    location: row.location,
    address: row.address ?? "",
    date: row.date,
    time: row.time,
    price: Number(row.price) || 0,
    isFree: row.is_free ?? false,
    rating: Number(row.rating) || 0,
    reviewCount: row.review_count ?? 0,
    tags: row.tags ?? [],
    activityType: row.activity_type ?? "Indoor",
    organizer: row.organizer ?? "",
    organizerDesc: row.organizer_desc ?? "",
    imageUrl: row.image_url ?? "",
    lat: row.lat ?? 0,
    lng: row.lng ?? 0,
  };
}
