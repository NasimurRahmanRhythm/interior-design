// Company content comes from the Integrity 360 Degree profiles (Interior, Fair
// Management) and the website review. Items marked "confirm" still need the
// client's sign-off before launch.

export const brand = {
  name: "Integrity 360 Degree",
  lines: ["Integrity", "360", "Degree"],
  tagline: "Service, Innovation and Excellence",
  belief: "Nothing is insignificant",
  email: "marketing@integrity360d.com",
  hrEmail: "integrity360hr@gmail.com",
  phones: ["+8801627222888", "+8801722110411"],
  whatsapp: "8801627222888",
  address: ["House 62, Road 1, Level 9B, Block I", "Banani, Dhaka 1213"],
  hours: "Sun–Thu 9:00–18:00 · Sat 10:00–16:00",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/integrity360degree" },
    { label: "YouTube", href: "https://www.youtube.com/@integrity360degree" },
  ],
};

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Journey", href: "/#journey" },
  { label: "Clients", href: "/#clients" },
  { label: "Contact", href: "/#contact" },
];

/* ---------- Landing page ---------- */

export const heroPanels = [
  { image: "/images/work/airtel-yolo-fest.jpg", alt: "Yolo Fest stage for Airtel" },
  { image: "/images/work/luxurious-cafe.jpg", alt: "Café interior with a teal wall and mural" },
  { image: "/images/work/samsung-s9-launch.jpg", alt: "Samsung S9+ launch on stage" },
  { image: "/images/work/modern-office.jpg", alt: "Law chamber waiting area and library" },
  { image: "/images/work/bpl-opening-2024.jpg", alt: "BPL 2024 opening stage at the stadium" },
];

export const trust = [
  { value: 15, suffix: "+", label: "Years, since 2010" },
  { value: 40, suffix: "+", label: "Professionals" },
  { value: 100, suffix: "k", label: "Sq ft workshop & storage" },
  { value: 65, suffix: "", label: "Stalls across 20 expos" },
  { value: 23, suffix: "", label: "Bank branches opened" },
];

export type Milestone = { year: string; title: string; detail: string; image?: string };

// Years without a source in the profiles are marked for the client to confirm.
export const journey: Milestone[] = [
  { year: "2010", title: "Founded in Banani", detail: "A one-stop solution provider for PR, events, stalls and interiors." },
  { year: "2014", title: "Big Bangla Run", detail: "Mass sports event and PR coverage for Novo Nordisk." },
  { year: "2015", title: "Dealer meets & PR", detail: "H Power dealer meets; Elite Paint covered by 20+ papers and 10 TV channels." },
  { year: "2016", title: "Design & print", detail: "Desk and wall calendars for 15 companies, Eid cards and gifts." },
  { year: "2019", title: "Police check post", detail: "Dhaka Tribune project, 2019–2020." },
  { year: "2020", title: "Expos & ceremonies", detail: "Swiss-Bangladesh Expo and a Coca-Cola ceremony.", image: "/images/work/coca-cola-ceremony.jpg" },
  { year: "2024", title: "BPL Opening", detail: "Stage, LED and event management at the stadium.", image: "/images/work/bpl-opening-2024.jpg" },
  { year: "2025", title: "BPL LED scoreboard", detail: "Video display scoreboard, Mirpur Stadium.", image: "/images/work/bpl-led-2025.jpg" },
  { year: "Today", title: "15+ years, 40+ people", detail: "A 100,000 sq ft workshop and four divisions under one roof." },
];

export type Division = { id: string; title: string; short: string; image: string; services: string[] };

export const divisions: Division[] = [
  {
    id: "events",
    title: "Events & Fairs",
    short: "Concerts, conferences, sports, launches and product activations.",
    image: "/images/work/airtel-yolo-fest.jpg",
    services: ["Corporate events & conferences", "Concerts & festivals", "Sports events", "Fair management", "Product activations", "Launches & dealer meets"],
  },
  {
    id: "exhibition",
    title: "Exhibition Stalls",
    short: "An extended arm of your business at every expo.",
    image: "/images/work/stall-mozitor.jpg",
    services: ["Concept & 3D design", "Fabrication", "Erection & branding", "On-site support", "Storage & logistics", "Dismantling"],
  },
  {
    id: "interior",
    title: "Interior & Architecture",
    short: "Offices, cafés, law chambers, facades and gates.",
    image: "/images/work/luxurious-cafe.jpg",
    services: ["Corporate & residential interiors", "Restaurants, cafés & retail", "Facades, gates & parking", "Custom furniture & cabinetry", "Acoustic panels", "Solar, water & fire safety"],
  },
  {
    id: "brand",
    title: "Brand, PR & Digital",
    short: "PR coverage, media, digital content, print and LED.",
    image: "/images/work/samsung-s9-launch.jpg",
    services: ["Press & media relations", "Advertising & branding", "Media production", "Digital content", "Design & printing", "Promotional items & LED"],
  },
];

export type BuildKind = "stall" | "office" | "stage";

export const builds: { id: BuildKind; label: string; title: [string, string]; steps: { title: string; text: string }[] }[] = [
  {
    id: "stall",
    label: "Expo stall",
    title: ["A Stall,", "Built"],
    steps: [
      { title: "Concept", text: "A floor plan and 3D views, drawn around the products and the visitors' path." },
      { title: "Fabricate", text: "Walls, counters and lightboxes are built in our 100,000 sq ft workshop." },
      { title: "Brand", text: "Graphics, screens and display go up on site, matched to the brand." },
      { title: "Light up", text: "Spotlights last. The stall is ready when it reads from across the hall." },
    ],
  },
  {
    id: "office",
    label: "Office",
    title: ["A Room,", "Assembled"],
    steps: [
      { title: "Shell", text: "We begin with the volume alone: floor, two walls, and where the light enters." },
      { title: "Ground", text: "A rug and a low table fix the centre. Everything else is measured from here." },
      { title: "Furnish", text: "Seating, storage and a single shelf arrive only once the room asks for them." },
      { title: "Light", text: "Lamps come last. The room is finished when it reads well in the dark." },
    ],
  },
  {
    id: "stage",
    label: "Event stage",
    title: ["A Stage,", "Raised"],
    steps: [
      { title: "Deck", text: "The stage deck and steps go down first, sized to the venue and the crowd." },
      { title: "Truss", text: "An aluminium truss frame rises to carry lights, sound and the LED wall." },
      { title: "Screen & sound", text: "LED panels and speaker stacks are hung and tested before doors open." },
      { title: "Show", text: "Beams on. The audience arrives to a stage that is already alive." },
    ],
  },
];

export type Work = { id: string; title: string; client: string; kind: string; year?: string; image: string };

export const featuredWork: Work[] = [
  { id: "bpl-led-2025", title: "BPL LED Scoreboard", client: "Mirpur Stadium", kind: "Sports", year: "2025", image: "/images/work/bpl-led-2025.jpg" },
  { id: "wall-art", title: "Inspiring Wall Art", client: "Café interior", kind: "Interior", image: "/images/work/wall-art.jpg" },
  { id: "yolo-fest", title: "Yolo Fest", client: "Airtel", kind: "Concert", image: "/images/work/airtel-yolo-fest.jpg" },
  { id: "nexus-room", title: "Nexus Room", client: "Corporate office", kind: "Interior", image: "/images/work/nexus-room.jpg" },
  { id: "mozitor-stall", title: "Expo Stall", client: "Mozitor Elevator", kind: "Exhibition", image: "/images/work/stall-mozitor.jpg" },
  { id: "khadi-fest", title: "Tresemme Khadi Fest", client: "Unilever", kind: "Concert", image: "/images/work/tresemme-khadi-fest.jpg" },
  { id: "olympia-bakery", title: "Olympia Bakery", client: "Banani branch", kind: "Interior", image: "/images/work/olympia-bakery.jpg" },
  { id: "walton-carnival", title: "Colony Carnival", client: "Walton", kind: "Activation", image: "/images/work/walton-colony-carnival.jpg" },
  { id: "samsung-s9", title: "S9+ Launch", client: "Samsung", kind: "Launch", image: "/images/work/samsung-s9-launch.jpg" },
];

export const reach = {
  figures: [
    { value: "18", unit: "malls", text: "OK Mobile Ramadan & Eid activation in 18 shopping malls and 6 recreation points." },
    { value: "20+", unit: "newspapers", text: "Elite Paint dealer meet covered by 20+ newspapers and 10 TV channels." },
  ],
  // Only places named in the profiles get a pin; branch and activation sites follow once the client lists them.
  pins: [
    { name: "Dhaka", lat: 23.81, lon: 90.41, note: "BICC, Mirpur Stadium, Banani, hotel venues", major: true },
    { name: "Gazipur", lat: 24.0, lon: 90.42, note: "Angona Resort, H Power" },
    { name: "Savar", lat: 23.86, lon: 90.26, note: "BRAC CDM" },
  ],
  cities: [
    { name: "Rangpur", lat: 25.74, lon: 89.25 },
    { name: "Rajshahi", lat: 24.37, lon: 88.6 },
    { name: "Mymensingh", lat: 24.75, lon: 90.41 },
    { name: "Sylhet", lat: 24.89, lon: 91.87 },
    { name: "Khulna", lat: 22.85, lon: 89.54 },
    { name: "Barishal", lat: 22.7, lon: 90.37 },
    { name: "Chattogram", lat: 22.36, lon: 91.78 },
    { name: "Cox's Bazar", lat: 21.43, lon: 92.0 },
  ],
};

export const clientNames = [
  ["Novo Nordisk", "Coca-Cola", "bKash", "Samsung", "Unilever", "Bajaj", "Runner", "Jeep", "Walton", "Airtel", "Banglalink", "Robi"],
  ["Shahjalal Islami Bank", "EXIM Bank", "Trust Bank", "USAID", "ILO", "DHL", "Kazi Farms", "Forbes Marshall", "OK Mobile", "H Power", "Global Lift", "Olympia"],
];

export const processSteps = [
  { title: "Brief", text: "Goals, budget and timeline." },
  { title: "Concept", text: "Ideas and 3D visuals." },
  { title: "Plan", text: "Vendors, venue and schedule." },
  { title: "Approve", text: "Final design sign-off." },
  { title: "Build", text: "Our own workshop and crew." },
  { title: "On-site", text: "Supervision on the day." },
  { title: "Handover", text: "Report and follow-up." },
];

export const quote = {
  divisions: ["Events & Fairs", "Exhibition Stall", "Interior & Architecture", "Brand, PR & Digital", "Not sure yet"],
  budgets: ["Under BDT 1,00,000", "1,00,000 – 5,00,000", "5,00,000 – 10,00,000", "10,00,000 – 20,00,000", "Above 20,00,000", "Prefer to discuss"],
  timelines: ["As soon as possible", "1–3 months", "3–6 months", "6–12 months", "Flexible"],
};

/* ---------- Older inner pages (Spaces, Objects, Studio) — replaced in the next phase ---------- */

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
