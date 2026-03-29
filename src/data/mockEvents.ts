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

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Little Scientists Lab",
    description: "Hands-on science experiments for curious young minds. Explore chemistry, physics, and biology!",
    fullDescription: "Join our Little Scientists Lab where children ages 4-8 will explore the wonders of science through exciting hands-on experiments! From making volcanoes erupt to creating slime, every session is a new adventure. Our qualified instructors ensure a safe, fun environment where curiosity is celebrated. All materials are provided. Children will take home their creations and a lab notebook to continue experimenting!",
    ageGroups: ["kids"],
    ageSuitability: "Ages 4-8",
    location: "Discovery Science Center",
    address: "123 Innovation Blvd, San Francisco, CA 94102",
    date: "2026-04-05",
    time: "10:00 AM - 12:00 PM",
    price: 25,
    isFree: false,
    rating: 4.8,
    reviewCount: 124,
    tags: ["STEM", "Creative"],
    activityType: "Indoor",
    organizer: "Bay Area Kids Science",
    organizerDesc: "Dedicated to making STEM accessible and fun for all children since 2018.",
    imageUrl: "",
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: "2",
    title: "Soccer Stars Camp",
    description: "Week-long soccer camp teaching fundamentals, teamwork, and love for the beautiful game.",
    fullDescription: "Soccer Stars Camp is the ultimate week-long experience for young athletes! Our professional coaches guide children through skill-building drills, friendly matches, and team exercises. Whether your child is a beginner or experienced, they'll develop technique, confidence, and lasting friendships. Includes snacks, a jersey, and an awards ceremony on the final day.",
    ageGroups: ["kids", "pre-teens"],
    ageSuitability: "Ages 5-12",
    location: "Golden Gate Park Fields",
    address: "500 John F Kennedy Dr, San Francisco, CA 94118",
    date: "2026-04-12",
    time: "9:00 AM - 3:00 PM",
    price: 150,
    isFree: false,
    rating: 4.9,
    reviewCount: 89,
    tags: ["Sports", "Outdoor Adventures"],
    activityType: "Outdoor",
    organizer: "Youth Sports Academy",
    organizerDesc: "Empowering young athletes through quality sports programs across the Bay Area.",
    imageUrl: "",
    lat: 37.7694,
    lng: -122.4862,
  },
  {
    id: "3",
    title: "Tiny Dancers Ballet Class",
    description: "Gentle introduction to ballet with creative movement, music, and storytelling for toddlers.",
    fullDescription: "Our Tiny Dancers program introduces toddlers to the magic of ballet through creative movement, imaginative storytelling, and classical music. In a nurturing and playful environment, little ones develop coordination, rhythm, and self-expression. Parents are welcome to watch! Each child receives a participation ribbon at the end of the session.",
    ageGroups: ["toddlers"],
    ageSuitability: "Ages 2-4",
    location: "Harmony Dance Studio",
    address: "789 Grace St, San Francisco, CA 94109",
    date: "2026-04-03",
    time: "4:00 PM - 4:45 PM",
    price: 0,
    isFree: true,
    rating: 4.7,
    reviewCount: 56,
    tags: ["Dance", "Music"],
    activityType: "Indoor",
    organizer: "Harmony Dance Collective",
    organizerDesc: "A community dance studio offering inclusive programs for all ages and abilities.",
    imageUrl: "",
    lat: 37.7920,
    lng: -122.4210,
  },
  {
    id: "4",
    title: "Teen Coding Bootcamp",
    description: "Learn Python, build apps, and explore AI in this intensive weekend coding workshop.",
    fullDescription: "Ready to level up your coding skills? Our Teen Coding Bootcamp covers Python fundamentals, web development, and even a taste of AI and machine learning. Work on real projects, collaborate with peers, and present your final app to friends and family. No prior experience needed – just bring your curiosity and a laptop!",
    ageGroups: ["teens"],
    ageSuitability: "Ages 13-17",
    location: "TechHub SF",
    address: "456 Market St, San Francisco, CA 94105",
    date: "2026-04-19",
    time: "10:00 AM - 5:00 PM",
    price: 75,
    isFree: false,
    rating: 4.9,
    reviewCount: 203,
    tags: ["STEM", "Creative"],
    activityType: "Indoor",
    organizer: "Code Future",
    organizerDesc: "Teaching the next generation to build the future, one line of code at a time.",
    imageUrl: "",
    lat: 37.7900,
    lng: -122.4000,
  },
  {
    id: "5",
    title: "Nature Explorer Hike",
    description: "Family-friendly guided nature hike with wildlife spotting, plant identification, and eco-crafts.",
    fullDescription: "Discover the beauty of local trails with our Nature Explorer Hike! Families will learn about native plants and animals, spot birds, and collect materials for eco-friendly craft projects along the way. Our experienced guides make every hike educational and fun. Suitable for all fitness levels. Meet at the trailhead parking lot. Don't forget sunscreen and water!",
    ageGroups: ["kids", "pre-teens", "teens"],
    ageSuitability: "Ages 5+",
    location: "Muir Woods National Monument",
    address: "1 Muir Woods Rd, Mill Valley, CA 94941",
    date: "2026-04-06",
    time: "8:30 AM - 12:00 PM",
    price: 10,
    isFree: false,
    rating: 4.6,
    reviewCount: 78,
    tags: ["Outdoor Adventures", "STEM"],
    activityType: "Outdoor",
    organizer: "Green Kids Initiative",
    organizerDesc: "Connecting children with nature through outdoor education and conservation.",
    imageUrl: "",
    lat: 37.8912,
    lng: -122.5718,
  },
  {
    id: "6",
    title: "Kids Art Jam",
    description: "Express yourself! Painting, clay, collage, and mixed media in a relaxed creative space.",
    fullDescription: "Kids Art Jam is a free-form art session where children can explore a variety of mediums – from watercolor and acrylic painting to clay sculpture and collage. Our instructors guide without restricting, letting each child's creativity flow. All supplies are included. Finished artwork can be taken home. Perfect for budding artists!",
    ageGroups: ["kids", "pre-teens"],
    ageSuitability: "Ages 4-12",
    location: "The Art Garage",
    address: "321 Valencia St, San Francisco, CA 94103",
    date: "2026-04-10",
    time: "2:00 PM - 4:00 PM",
    price: 0,
    isFree: true,
    rating: 4.5,
    reviewCount: 42,
    tags: ["Arts", "Creative"],
    activityType: "Indoor",
    organizer: "Creative Sparks SF",
    organizerDesc: "Making art education accessible to every child in the city.",
    imageUrl: "",
    lat: 37.7680,
    lng: -122.4220,
  },
  {
    id: "7",
    title: "Junior Chef Cooking Class",
    description: "Kids learn to make healthy meals and snacks with professional chefs in a fun kitchen setting.",
    fullDescription: "In our Junior Chef class, children learn essential cooking skills while preparing delicious, healthy recipes. From measuring ingredients to safe knife handling, our professional chefs guide each step. Kids will make a complete meal they can proudly serve at home. Aprons and recipe cards provided. Allergen-free options available upon request.",
    ageGroups: ["kids", "pre-teens"],
    ageSuitability: "Ages 6-12",
    location: "Culinary Kids Academy",
    address: "555 Folsom St, San Francisco, CA 94105",
    date: "2026-04-08",
    time: "11:00 AM - 1:00 PM",
    price: 45,
    isFree: false,
    rating: 4.8,
    reviewCount: 67,
    tags: ["Cooking", "Creative"],
    activityType: "Indoor",
    organizer: "Little Chefs Club",
    organizerDesc: "Teaching kids the joy of cooking and healthy eating since 2020.",
    imageUrl: "",
    lat: 37.7860,
    lng: -122.3920,
  },
  {
    id: "8",
    title: "Music & Movement Playgroup",
    description: "Sing, dance, and play instruments in this interactive music session for toddlers and parents.",
    fullDescription: "Our Music & Movement Playgroup is a joyful, interactive session where toddlers and their parents/caregivers explore rhythm, melody, and movement together. Using simple instruments, songs, and dance, children develop listening skills, coordination, and social bonds. Led by a trained early childhood music educator. Drop-ins welcome!",
    ageGroups: ["toddlers"],
    ageSuitability: "Ages 1-3",
    location: "Community Family Center",
    address: "200 Oak St, San Francisco, CA 94102",
    date: "2026-04-04",
    time: "10:30 AM - 11:15 AM",
    price: 0,
    isFree: true,
    rating: 4.9,
    reviewCount: 91,
    tags: ["Music", "Dance"],
    activityType: "Indoor",
    organizer: "Family Harmony Program",
    organizerDesc: "Building family connections through music, art, and play.",
    imageUrl: "",
    lat: 37.7755,
    lng: -122.4180,
  },
];
