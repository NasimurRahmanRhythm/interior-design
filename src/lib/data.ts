// All content below is placeholder data for the demo.

export const brand = {
  name: "Integrity 360 Degree",
  lines: ["Integrity", "360", "Degree"],
  tagline: "A Private Atelier for Interiors",
  email: "studio@integrity360degree.example",
};

export const nav = [
  { label: "Spaces", href: "/spaces" },
  { label: "Objects", href: "/objects" },
  { label: "Studio", href: "/studio" },
  { label: "People", href: "/studio#people" },
  { label: "Admission", href: "/#admission" },
];

export type Space = {
  id: string;
  name: string;
  city: string;
  year: string;
  area: string;
  type: string;
  image: string;
  blurb: string;
};

export const spaces: Space[] = [
  {
    id: "silent-room",
    name: "Silent Room",
    city: "Basel",
    year: "2026",
    area: "84 m²",
    type: "Private residence",
    image: "/images/spaces/1.jpg",
    blurb: "A reading room cut from limewash and smoked oak, lit only from below the sill.",
  },
  {
    id: "lower-hall",
    name: "Lower Hall",
    city: "Porto",
    year: "2025",
    area: "210 m²",
    type: "Gallery apartment",
    image: "/images/spaces/2.jpg",
    blurb: "Two levels joined by a single cast stair. Nothing touches the perimeter walls.",
  },
  {
    id: "north-study",
    name: "North Study",
    city: "Copenhagen",
    year: "2025",
    area: "46 m²",
    type: "Work room",
    image: "/images/spaces/3.jpg",
    blurb: "North light, one table, and joinery that closes flush until it is needed.",
  },
  {
    id: "ash-parlour",
    name: "Ash Parlour",
    city: "Kyoto",
    year: "2024",
    area: "62 m²",
    type: "Tea house",
    image: "/images/spaces/4.jpg",
    blurb: "Charred cedar, paper, and a floor that steps down toward the garden.",
  },
  {
    id: "clay-house",
    name: "Clay House",
    city: "Oaxaca",
    year: "2024",
    area: "320 m²",
    type: "Family home",
    image: "/images/spaces/5.jpg",
    blurb: "Rammed earth rooms arranged around a court that is never fully in the sun.",
  },
  {
    id: "long-table",
    name: "Long Table",
    city: "Milan",
    year: "2023",
    area: "38 m²",
    type: "Dining room",
    image: "/images/spaces/6.jpg",
    blurb: "One table for ten, a round mirror, and green velvet. The kitchen is elsewhere.",
  },
  {
    id: "interior-vii",
    name: "Interior VII",
    city: "Undisclosed",
    year: "Forming",
    area: "—",
    type: "In formation",
    image: "/images/spaces/7.jpg",
    blurb: "Currently forming. Its location is shared with those already inside.",
  },
];

export type ObjectItem = {
  id: string;
  numeral: string;
  name: string;
  origin: string;
  material: string;
  edition: string;
  image: string;
};

export const objects: ObjectItem[] = [
  {
    id: "fox-stool",
    numeral: "I",
    name: "The Fox Stool",
    origin: "Silent Room",
    material: "Smoked oak, wax",
    edition: "Edition of 40",
    image: "/images/objects/1.jpg",
  },
  {
    id: "low-lamp",
    numeral: "II",
    name: "Low Lamp",
    origin: "North Study",
    material: "Spun brass, linen",
    edition: "Edition of 25",
    image: "/images/objects/2.jpg",
  },
  {
    id: "ash-vessel",
    numeral: "III",
    name: "Ash Vessel",
    origin: "Ash Parlour",
    material: "Wood-fired stoneware",
    edition: "Unique pieces",
    image: "/images/objects/3.jpg",
  },
  {
    id: "court-chair",
    numeral: "IV",
    name: "Court Chair",
    origin: "Clay House",
    material: "Ash, woven cord",
    edition: "Edition of 60",
    image: "/images/objects/4.jpg",
  },
];

export const updates = [
  { kind: "Space status", title: "Lower Hall — Complete", image: "/images/spaces/2.jpg" },
  { kind: "Object release", title: "Object II — In Circulation", image: "/images/objects/2.jpg" },
  { kind: "Formation / Process", title: "Interior VII — Forming", image: "/images/spaces/7.jpg" },
  { kind: "Material study", title: "Limewash No. 4 — Approved", image: "/images/spaces/5.jpg" },
  { kind: "Site visit", title: "Ash Parlour — Open by Request", image: "/images/spaces/4.jpg" },
];

export const people = [
  { name: "Ines Varga", role: "Founding designer", image: "/images/people/1.jpg" },
  { name: "Tomas Reyl", role: "Joinery & making", image: "/images/people/2.jpg" },
  { name: "Mara Okonjo", role: "Light & material", image: "/images/people/3.jpg" },
  { name: "Elias Brandt", role: "3D & visualisation", image: "/images/people/4.jpg" },
];

export const roomSteps = [
  { title: "Shell", text: "We begin with the volume alone: floor, two walls, and where the light enters." },
  { title: "Ground", text: "A rug and a low table fix the centre. Everything else is measured from here." },
  { title: "Furnish", text: "Seating, storage and a single shelf arrive only once the room asks for them." },
  { title: "Light", text: "Lamps come last. The room is finished when it reads well in the dark." },
];

export const finishes = [
  { name: "Smoked Oak", floor: "#6b4a34", wall: "#e6dccb", accent: "#7b5136", fabric: "#c9bca6" },
  { name: "Sage Lime", floor: "#8a8f7c", wall: "#dfe3d6", accent: "#5f6f5b", fabric: "#f1eade" },
  { name: "Obsidian", floor: "#2b2829", wall: "#4a4347", accent: "#ff5113", fabric: "#8c8279" },
];

export const stats = [
  { value: "7", label: "Spaces in operation" },
  { value: "4", label: "Objects in circulation" },
  { value: "12", label: "People, no more" },
  { value: "0", label: "Social accounts" },
];
