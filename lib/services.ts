import { Monitor, Palette, Camera, Music, Compass, LucideIcon } from "lucide-react";

export type ServiceProcessStep = {
  name: string;
  description: string;
};

export type ServiceDefinition = {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  longDescription: string;
  includes: string[];
  idealFor: string;
  process: ServiceProcessStep[];
  queryTags: string[]; // Used strictly to match projects in Supabase
};

export const SERVICES: ServiceDefinition[] = [
  {
    id: "digital-products",
    title: "Digital Products",
    icon: Monitor,
    description: "End-to-end UI/UX design and full-stack development for web applications.",
    longDescription: "From concept to deployed product — I design the interface, architect the backend, and ship production-ready web applications. Startups and SaaS companies hire me to turn ideas into polished digital products without the overhead of coordinating separate designers and developers.",
    includes: ["UI/UX Design", "Frontend Development (React/Next.js)", "Backend Development (Node.js/Python)", "Responsive & Accessible Implementation", "Performance Optimization", "Deployment & Launch Support"],
    idealFor: "Startups, SaaS companies, tech businesses",
    process: [
      { name: "Discovery & Architecture", description: "Mapping out user flows, database schemas, and technical requirements before writing a single line of code." },
      { name: "Interface Design", description: "Crafting wireframes and high-fidelity prototypes in Figma, establishing the visual design language." },
      { name: "Full-Stack Development", description: "Building the application using React/Next.js for the frontend and robust backend infrastructure." },
      { name: "Testing & Launch", description: "Rigorous QA, performance profiling, and seamless deployment to production environments." }
    ],
    queryTags: ["development", "design", "ui/ux"]
  },
  {
    id: "brand-identity",
    title: "Brand & Identity",
    icon: Palette,
    description: "Strategic brand development from naming and positioning to complete visual identity systems.",
    longDescription: "I build brands from the ground up — from strategic positioning and naming to complete visual identity systems including logo, typography, color, and brand guidelines. Every brand I create is designed to work across digital and physical touchpoints.",
    includes: ["Brand Strategy & Positioning", "Logo & Visual Identity Design", "Typography & Color Systems", "Brand Guidelines Documentation", "Brand Collateral Design", "Website Design Integration"],
    idealFor: "New businesses, rebrands, creative ventures",
    process: [
      { name: "Brand Discovery", description: "Deep dive workshops to understand your mission, target audience, and market positioning." },
      { name: "Concept & Strategy", description: "Developing core brand pillars, naming (if required), and mood boards for visual direction." },
      { name: "Identity Design", description: "Creating the logo, typography scale, color palette, and core visual assets." },
      { name: "Guidelines & Handoff", description: "Compiling a comprehensive brand book and delivering all production-ready assets." }
    ],
    queryTags: ["brand", "strategy", "identity", "design"]
  },
  {
    id: "visual-content",
    title: "Visual Content",
    icon: Camera,
    description: "Photography and videography that tells your brand's story with cinematic quality.",
    longDescription: "I shoot photography and video that tells your brand's story. Whether it's product photography, campaign visuals, behind-the-scenes content, or cinematic brand films — I handle art direction, shooting, and post-production.",
    includes: ["Product & Lifestyle Photography", "Brand & Campaign Videography", "Art Direction", "Photo & Video Editing", "Color Grading", "Asset Delivery (web, social, print)"],
    idealFor: "Brands needing campaign imagery, artists, agencies",
    process: [
      { name: "Pre-Production", description: "Developing storyboards, shot lists, location scouting, and talent casting." },
      { name: "Production & Shooting", description: "Executing the shoot on location or in-studio with professional lighting and cinematography." },
      { name: "Post-Production", description: "Editing, color grading, sound mixing, and refining the final visual narrative." },
      { name: "Final Delivery", description: "Providing optimized assets tailored for social media, web, and broadcast." }
    ],
    queryTags: ["photo", "video", "photography", "videography", "art direction"]
  },
  {
    id: "audio-music",
    title: "Audio & Music",
    icon: Music,
    description: "Original music production, sound design, and audio branding for any medium.",
    longDescription: "I produce original music, sound design, and audio branding. From scoring brand films to producing full tracks for artists — I bring the same level of craft to audio as I do to visual and technical work.",
    includes: ["Music Production & Composition", "Sound Design", "Audio Branding & Sonic Identity", "Mixing & Mastering", "Podcast / Voiceover Editing", "Sync Licensing"],
    idealFor: "Artists, filmmakers, brands needing audio identity",
    process: [
      { name: "Audio Strategy", description: "Defining the sonic required for your project, from tempo to instrumentation." },
      { name: "Composition & Production", description: "Writing and producing original tracks, or recording custom sound design elements." },
      { name: "Arrangement & Editing", description: "Structuring the audio to perfectly sync with visual cuts or narrative flow." },
      { name: "Mixing & Mastering", description: "Polishing the frequencies and dynamics to industry-standard loudness and clarity." }
    ],
    queryTags: ["music", "audio", "sound", "production"]
  },
  {
    id: "creative-direction",
    title: "Creative Direction",
    icon: Compass,
    description: "Full-spectrum creative leadership — I connect strategy, design, code, imagery, and sound into one cohesive vision.",
    longDescription: "For clients who want a single creative leader to own the entire vision. I connect strategy, design, code, imagery, and sound into one cohesive experience — and manage the process from brief to delivery.",
    includes: ["End-to-End Project Leadership", "Multi-Discipline Integration", "Creative Strategy & Concepting", "Quality Assurance Across Deliverables", "Stakeholder Communication", "Post-Launch Support"],
    idealFor: "High-value clients wanting one creative partner",
    process: [
      { name: "Strategic Alignment", description: "Aligning business goals with creative possibilities to form a unified master plan." },
      { name: "Concept Generation", description: "Developing the overarching big idea that will drive all subsequent creative decisions." },
      { name: "Execution Oversight", description: "Guiding design, development, and content creation to ensure absolute consistency." },
      { name: "Launch & Evaluation", description: "Reviewing the final deliverables against the initial objectives and supporting the rollout." }
    ],
    queryTags: ["creative direction", "strategy", "leadership"]
  }
];

export function getServiceById(id: string): ServiceDefinition | undefined {
  return SERVICES.find(s => s.id === id);
}
