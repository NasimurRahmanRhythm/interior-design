import type { About, Build, Finish, Step } from "./db/types";

// Company story, process steps and the 3D build study.

export const about: About = {
  why: [
    {
      text: "Solutions tailored to each brief.",
      title: "Creative design"
    },
    {
      text: "Quick turnaround without cutting quality.",
      title: "Fast execution"
    },
    {
      text: "We stand behind every project we deliver.",
      title: "Quality assurance"
    },
    {
      text: "Our own team of architects, engineers and designers.",
      title: "Skilled manpower"
    }
  ],
  lead: "Established in 2010, Integrity 360 Degree is a one-stop solution provider, delivering a complete range of creative, strategic and innovative services.",
  name: "Our name reflects our philosophy — delivering integrity in every detail, and offering 360-degree solutions that cover every part of a project, from concept development to execution.",
  wheel: [
    "Exhibition Stand",
    "Advertising",
    "Interior Design",
    "Public Relation",
    "Event Management",
    "Landscaping",
    "Exterior Design",
    "Branding"
  ],
  values: [
    "Integrity",
    "Excellence",
    "Commitment",
    "Teamwork"
  ],
  mission: "Our mission is to bring ideas to life with a 360-degree approach, combining creativity with precision. Whether it's building impactful brands, executing corporate events or designing inspiring interior spaces, our team ensures excellence and innovation at every step.",
  pillars: [
    {
      text: "Of business experience and knowledge.",
      title: "15+ years"
    },
    {
      text: "A 100,000 sq ft workshop and storage, and an office in Banani.",
      title: "Ready infrastructure"
    },
    {
      text: "40+ architects, engineers, designers and event professionals.",
      title: "Skilled manpower"
    }
  ],
  promise: "We believe every project is unique. Whether it's residential, commercial or institutional, our designers, architects and event team work closely with clients to bring their vision to life — on time, on budget and beyond expectations.",
  overview: "With over a decade of experience, we specialise in PR communication, stall and interior solutions, advertising, market research, event management, media production, product activation, branding, fair management, printing and publications, residential and corporate interiors, and digital marketing."
};

export const processSteps: Step[] = [
  {
    text: "Goals, budget and timeline.",
    title: "Brief"
  },
  {
    text: "Ideas and 3D visuals.",
    title: "Concept"
  },
  {
    text: "Vendors, venue and schedule.",
    title: "Plan"
  },
  {
    text: "Final design sign-off.",
    title: "Approve"
  },
  {
    text: "Our own workshop and crew.",
    title: "Build"
  },
  {
    text: "Supervision on the day.",
    title: "On-site"
  },
  {
    text: "Report and follow-up.",
    title: "Handover"
  }
];

export const processDetail: Step[] = [
  {
    text: "We listen first: goals, audience, budget, timeline, venue or site. A site visit if the project needs one.",
    title: "Brief"
  },
  {
    text: "Ideas, layouts and 3D visuals, so you can see the stall, stage or room before anything is built.",
    title: "Concept"
  },
  {
    text: "Drawings, materials, vendors, venue bookings, permissions and a schedule everyone works to.",
    title: "Plan"
  },
  {
    text: "Final design and cost sign-off. Nothing goes into production without it.",
    title: "Approve"
  },
  {
    text: "Fabrication in our own 100,000 sq ft workshop, with our own crew, then installation on site.",
    title: "Build"
  },
  {
    text: "Our team supervises set-up and runs the day — stage, sound, light, guests and press.",
    title: "On-site"
  },
  {
    text: "Dismantling, storage, a report with photos and coverage, and follow-up for the next one.",
    title: "Handover"
  }
];

export const builds: Build[] = [
  {
    id: "stall",
    label: "Expo stall",
    steps: [
      {
        text: "A floor plan and 3D views, drawn around the products and the visitors' path.",
        title: "Concept"
      },
      {
        text: "Walls, counters and lightboxes are built in our 100,000 sq ft workshop.",
        title: "Fabricate"
      },
      {
        text: "Graphics, screens and display go up on site, matched to the brand.",
        title: "Brand"
      },
      {
        text: "Spotlights last. The stall is ready when it reads from across the hall.",
        title: "Light up"
      }
    ],
    title: [
      "A Stall,",
      "Built"
    ]
  },
  {
    id: "office",
    label: "Office",
    steps: [
      {
        text: "We begin with the volume alone: floor, two walls, and where the light enters.",
        title: "Shell"
      },
      {
        text: "A rug and a low table fix the centre. Everything else is measured from here.",
        title: "Ground"
      },
      {
        text: "Seating, storage and a single shelf arrive only once the room asks for them.",
        title: "Furnish"
      },
      {
        text: "Lamps come last. The room is finished when it reads well in the dark.",
        title: "Light"
      }
    ],
    title: [
      "A Room,",
      "Assembled"
    ]
  },
  {
    id: "stage",
    label: "Event stage",
    steps: [
      {
        text: "The stage deck and steps go down first, sized to the venue and the crowd.",
        title: "Deck"
      },
      {
        text: "An aluminium truss frame rises to carry lights, sound and the LED wall.",
        title: "Truss"
      },
      {
        text: "LED panels and speaker stacks are hung and tested before doors open.",
        title: "Screen & sound"
      },
      {
        text: "Beams on. The audience arrives to a stage that is already alive.",
        title: "Show"
      }
    ],
    title: [
      "A Stage,",
      "Raised"
    ]
  }
];

export const finishes: Finish[] = [
  {
    name: "Smoked Oak",
    wall: "#e6dccb",
    floor: "#6b4a34",
    accent: "#7b5136",
    fabric: "#c9bca6"
  },
  {
    name: "Sage Lime",
    wall: "#dfe3d6",
    floor: "#8a8f7c",
    accent: "#5f6f5b",
    fabric: "#f1eade"
  },
  {
    name: "Obsidian",
    wall: "#4a4347",
    floor: "#2b2829",
    accent: "#ff5113",
    fabric: "#8c8279"
  }
];
