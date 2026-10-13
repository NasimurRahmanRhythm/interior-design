// Copy for the inner pages, drawn from the company profiles and the website review.

import type { DivisionId } from "./projects";

export type SceneKind = "stage" | "stall" | "room" | "brand";

export type DivisionPage = {
  id: DivisionId;
  number: string;
  title: [string, string];
  name: string;
  line: string;
  intro: string;
  scene: SceneKind;
  groups: { title: string; items: string[] }[];
  figures: { value: string; label: string }[];
  extra?: { title: string; items: string[] };
};

export const divisionPages: DivisionPage[] = [
  {
    id: "events",
    number: "01",
    title: ["Events", "& Fairs"],
    name: "Events, Fairs & Activations",
    line: "Concept, management, artists and execution — one team from brief to the last guest out.",
    intro:
      "We plan and run corporate events, conferences, concerts, sports events, convocations, launches and fairs, and take brands to people through activations in schools, markets, malls and on the road.",
    scene: "stage",
    groups: [
      {
        title: "Corporate & conferences",
        items: ["Corporate events", "Conferences & seminars", "AGMs & managers' conferences", "Product launches", "Dealer meets", "Contract signing ceremonies", "Anniversaries"],
      },
      {
        title: "Concerts, sports & festivals",
        items: ["Concerts & festivals", "Sports events & marathons", "Convocations", "Opening ceremonies", "Corporate dinners"],
      },
      {
        title: "Fair management",
        items: ["Creative management", "Stall display set-up & management", "Stall interior design", "Volunteer recruitment & training", "Ground transportation & logistics"],
      },
      {
        title: "Activations",
        items: ["Door-to-door marketing", "Brand promotion", "Shop merchandising", "Activation kiosks", "School, colony & market activations", "Branded vans & roadshows"],
      },
      {
        title: "Family & social",
        items: ["Weddings", "Birthdays", "Family days & corporate tours"],
      },
      {
        title: "On every event",
        items: ["Planning", "Venue & vendors", "Stage, truss, sound & light", "LED screens", "Technical support", "On-site management"],
      },
    ],
    figures: [
      { value: "23", label: "Bank branch openings, one client" },
      { value: "18", label: "Malls in one activation, plus 6 recreation points" },
      { value: "21.1", label: "Kilometres, Big Bangla Run ’15" },
      { value: "20+", label: "Companies served with activation kiosks" },
    ],
  },
  {
    id: "exhibition",
    number: "02",
    title: ["Exhibition", "Stalls"],
    name: "Exhibition & Stall Design",
    line: "An extended arm of your business — like a branch office on the expo floor.",
    intro:
      "On-demand, cost-effective stalls for exporters and exhibitors: we design, fabricate, brand and run them, then take them down and store them for the next show.",
    scene: "stall",
    groups: [
      { title: "Concept & design", items: ["Custom stall design", "3D visualisation", "Graphics & branding", "Layout for products and visitor flow"] },
      { title: "Build", items: ["Fabrication in our own workshop", "Erection & commissioning", "Lighting & screens", "Furniture & display units"] },
      { title: "Show & after", items: ["Project management", "PR around the show", "On-site support", "Dismantling", "Storage & logistics"] },
    ],
    figures: [
      { value: "≈65", label: "Stalls built" },
      { value: "≈20", label: "Expos" },
      { value: "100k", label: "Sq ft of workshop & storage" },
      { value: "60+", label: "Exhibitors in our stall portfolio" },
    ],
    extra: {
      title: "Expos we build for",
      items: [
        "BTKG & Motor Show",
        "GAP & GTB",
        "Furnitech & FoodPro",
        "IPF",
        "Meditex & Bangla Med",
        "Asian Pharma",
        "Buildcon & Rehab",
        "Papertech",
        "Leathertech",
        "Garmentech",
        "Fire & Safety",
        "Real Estate",
        "Wood & WAPSA",
        "Elevator, Lift & Escalator",
        "DTG",
        "Power & Solar",
        "Poultry",
        "DITF",
      ],
    },
  },
  {
    id: "interior",
    number: "03",
    title: ["Interior &", "Architecture"],
    name: "Interior & Architecture",
    line: "Simple. Sophisticated. You.",
    intro:
      "Interior design and architectural support for residential, commercial and institutional spaces — from concept to execution, on time, on budget and beyond expectations.",
    scene: "room",
    groups: [
      { title: "Commercial", items: ["Corporate offices", "Law chambers", "Brand shops", "Restaurants & cafés", "Bakeries & retail", "Banquet halls"] },
      { title: "Residential", items: ["Homes & apartments", "Dining spaces", "Washrooms", "Kitchens & storage"] },
      { title: "Architecture & exterior", items: ["Building design", "Facades", "Front gates", "Parking gates & ceilings", "Lift lobbies"] },
      { title: "Details", items: ["Custom furniture & cabinetry", "Acoustic panel walls", "Ceilings & lighting", "3D visualisation"] },
      { title: "Utilities", items: ["Rooftop solar", "Water treatment", "Fire exit stairs", "Power substations", "Green rooftops"] },
    ],
    figures: [
      { value: "15+", label: "Years designing spaces" },
      { value: "40+", label: "Designers, architects & engineers" },
      { value: "100k", label: "Sq ft workshop for furniture & joinery" },
      { value: "27+", label: "Interior clients in our profile" },
    ],
  },
  {
    id: "brand",
    number: "04",
    title: ["Brand, PR", "& Digital"],
    name: "Brand, PR, Media & Digital",
    line: "We believe in first impression — that's why our clients are our real marketer.",
    intro:
      "Press and media relations, advertising, media production, digital content, design and printing, promotional items and LED displays — the pieces that carry a brand before and after the event.",
    scene: "brand",
    groups: [
      {
        title: "Public relations",
        items: ["Press releases", "Press conferences", "TV reporting", "Customised news", "1-2-1 interviews", "PR campaigns", "Invitations", "Event PR", "Brochures"],
      },
      {
        title: "Media production",
        items: ["Television commercials", "Business videos", "Education & industrial films", "Documentaries", "Graphics & animation ad films", "Media monitoring & buying", "Product placement", "Product photography"],
      },
      { title: "Advertising & digital", items: ["Digital, print & outdoor advertising", "Brand strategy", "Market research", "Digital content", "Web banners"] },
      { title: "Design & printing", items: ["Desk & wall calendars", "Greeting cards", "Brochures & publications"] },
      { title: "Promotional items", items: ["T-shirts & caps", "Corporate gifts", "Office & tech accessories", "Bags & drinkware"] },
      { title: "LED displays", items: ["Indoor LED screens", "Outdoor LED screens", "Video scoreboards", "Digital kiosks"] },
    ],
    figures: [
      { value: "20+", label: "Newspapers and 10 TV channels for one dealer meet" },
      { value: "20+", label: "Companies served with digital content" },
      { value: "10+", label: "Companies served with web banners" },
      { value: "15", label: "Companies' calendars in one year" },
    ],
  },
];

export const getDivisionPage = (id: string) => divisionPages.find((d) => d.id === id);

export const about = {
  lead: "Established in 2010, Integrity 360 Degree is a one-stop solution provider, delivering a complete range of creative, strategic and innovative services.",
  overview:
    "With over a decade of experience, we specialise in PR communication, stall and interior solutions, advertising, market research, event management, media production, product activation, branding, fair management, printing and publications, residential and corporate interiors, and digital marketing.",
  mission:
    "Our mission is to bring ideas to life with a 360-degree approach, combining creativity with precision. Whether it's building impactful brands, executing corporate events or designing inspiring interior spaces, our team ensures excellence and innovation at every step.",
  name: "Our name reflects our philosophy — delivering integrity in every detail, and offering 360-degree solutions that cover every part of a project, from concept development to execution.",
  promise:
    "We believe every project is unique. Whether it's residential, commercial or institutional, our designers, architects and event team work closely with clients to bring their vision to life — on time, on budget and beyond expectations.",
  pillars: [
    { title: "15+ years", text: "Of business experience and knowledge." },
    { title: "Ready infrastructure", text: "A 100,000 sq ft workshop and storage, and an office in Banani." },
    { title: "Skilled manpower", text: "40+ architects, engineers, designers and event professionals." },
  ],
  why: [
    { title: "Creative design", text: "Solutions tailored to each brief." },
    { title: "Fast execution", text: "Quick turnaround without cutting quality." },
    { title: "Quality assurance", text: "We stand behind every project we deliver." },
    { title: "Skilled manpower", text: "Our own team of architects, engineers and designers." },
  ],
  values: ["Integrity", "Excellence", "Commitment", "Teamwork"],
  wheel: ["Exhibition Stand", "Advertising", "Interior Design", "Public Relation", "Event Management", "Landscaping", "Exterior Design", "Branding"],
};

// Client names as they appear in the profiles. Logos need each client's permission, so the site lists names.
export const clientGroups: { title: string; names: string[] }[] = [
  {
    title: "Banking & finance",
    names: ["Shahjalal Islami Bank", "EXIM Bank", "Trust Bank", "City Bank", "IPDC", "IDLC", "bKash", "Mastercard", "American Express"],
  },
  {
    title: "Pharma & health",
    names: ["Novo Nordisk", "GSK", "Renata", "Lazz Pharma", "Nitika Pharmaceuticals", "Reckitt Benckiser", "BIRDEM", "BADAS", "DSK Hospital"],
  },
  {
    title: "FMCG & food",
    names: ["Unilever", "Coca-Cola", "Nestlé", "Marico", "Arla", "Dabur", "Kazi Farms", "Olympia Bakery", "Kwality Icecream", "ECO Food", "Magnolia Tea", "Square", "BAT"],
  },
  {
    title: "Telecom & technology",
    names: ["Samsung", "Banglalink", "Airtel", "Robi", "OK Mobile", "WE Mobile", "Walton", "Pridesys IT", "Ekhanei.com", "Oraimo"],
  },
  {
    title: "Automotive & industry",
    names: ["Bajaj", "Runner", "Jeep", "Yamaha", "TVS", "H Power", "Haojue", "JAMS Group", "Forbes Marshall", "Global Lift", "Mozitor Elevator", "Euro Elevator", "ESSAB", "Zenith Safety Solution", "Hankuk Engineering", "Marubeni"],
  },
  {
    title: "Development & education",
    names: ["USAID", "ILO", "Aga Khan Foundation", "Save the Children", "BRAC", "Northern University", "AUST", "World University", "USTC", "MUAC"],
  },
  {
    title: "Media, retail & services",
    names: ["The Financial Express", "Dhaka Tribune", "TV Bangladesh", "DHL Global Forwarding", "Transport Team Express", "US-Bangla", "Bestseller", "Hallmark", "Lock & Lock", "C&T Home Care", "Berger", "RAK Ceramics", "Elite Paint", "Mobil", "CP Bangladesh", "Forever Living"],
  },
];

export const processDetail = [
  { title: "Brief", text: "We listen first: goals, audience, budget, timeline, venue or site. A site visit if the project needs one." },
  { title: "Concept", text: "Ideas, layouts and 3D visuals, so you can see the stall, stage or room before anything is built." },
  { title: "Plan", text: "Drawings, materials, vendors, venue bookings, permissions and a schedule everyone works to." },
  { title: "Approve", text: "Final design and cost sign-off. Nothing goes into production without it." },
  { title: "Build", text: "Fabrication in our own 100,000 sq ft workshop, with our own crew, then installation on site." },
  { title: "On-site", text: "Our team supervises set-up and runs the day — stage, sound, light, guests and press." },
  { title: "Handover", text: "Dismantling, storage, a report with photos and coverage, and follow-up for the next one." },
];

export const contactDetails = {
  emails: [
    { label: "Projects & quotes", value: "marketing@integrity360d.com" },
    { label: "General", value: "integrity360degree@gmail.com" },
    { label: "Marketing", value: "integrity360marketing@gmail.com" },
    { label: "Careers", value: "integrity360hr@gmail.com" },
  ],
  hours: [
    { day: "Sunday – Thursday", time: "9:00 AM – 6:00 PM" },
    { day: "Saturday", time: "10:00 AM – 4:00 PM" },
    { day: "Friday", time: "Closed" },
  ],
  response: "We reply within 24 hours on business days.",
  landmarks: "Near Banani 11 Market and Banani Club. Reachable by bus, CNG and ride-share; parking nearby.",
  map: "https://www.google.com/maps/search/?api=1&query=House+62+Road+1+Block+I+Banani+Dhaka+1213",
};
