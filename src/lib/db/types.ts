// Shapes the pages work with, built from the database rows in queries.ts.

export type SceneKind = "stage" | "stall" | "room" | "brand";

export type Link = { label: string; href: string };

export type Settings = {
  brand: { name: string; lines: string[]; tagline: string; belief: string };
  contact: {
    address: string[];
    phones: string[];
    whatsapp: string;
    email: string;
    hr_email: string;
    hours_short: string;
    emails: { label: string; value: string }[];
    hours: { day: string; time: string }[];
    response: string;
    landmarks: string;
    map: string;
  };
  socials: Link[];
  nav: Link[];
  trust: { value: number; suffix: string; label: string }[];
  heroPanels: { image: string; alt: string }[];
  quote: { divisions: string[]; budgets: string[]; timelines: string[] };
};

// A place on the landing page map; the title shows on hover.
export type MapPoint = { id: string; title: string; lat: number; lon: number };

export type ProjectImage = { src: string; w: number; h: number; alt: string };

export type Project = {
  slug: string;
  title: string;
  division: string;
  category: string;
  client?: string;
  venue?: string;
  year?: string;
  summary: string;
  featured: boolean;
  images: ProjectImage[];
};

export type Division = {
  id: string;
  number: string;
  name: string;
  title: [string, string];
  line: string;
  intro: string;
  // The 3D scene on the service page; services added later show their cover photo instead.
  scene: SceneKind | null;
  card: { title: string; short: string; services: string[]; image: string };
  groups: { title: string; items: string[] }[];
  figures: { value: string; label: string }[];
  extra?: { title: string; items: string[] };
  // Position on the landing page ring; null when not shown there.
  featuredOrder: number | null;
};

export type Client = { name: string; industry: string | null; logo?: string };

export type Milestone = { year: string; title: string; detail: string; image?: string };

export type Step = { title: string; text: string };

export type BuildKind = "stall" | "office" | "stage";
export type Build = { id: BuildKind; label: string; title: [string, string]; steps: Step[] };

export type Finish = { name: string; floor: string; wall: string; accent: string; fabric: string };

export type About = {
  lead: string;
  overview: string;
  mission: string;
  name: string;
  promise: string;
  pillars: Step[];
  why: Step[];
  values: string[];
  wheel: string[];
};

// Page copy is stored per section as JSON; each section reads the fields it needs.
export type Copy = Record<string, any>;
