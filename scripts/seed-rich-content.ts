import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1]] = match[2].trim();
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const defaultMdx = (title: string, desc: string) => `A comprehensive digital transformation project delivering high-impact results across strategy, design, and engineering for ${title}.

## The Approach
We believe in building digital products that perfectly balance aesthetic sophistication with rigorous engineering standards. This project required us to rethink the baseline assumptions of the industry.

### Key Milestones
1. **Discovery & Strategy**: We spent weeks deeply understanding the target demographic and structural constraints.
2. **Design**: Developed a robust system utilizing scalable foundations and rich interactive layers.
3. **Execution**: Implemented the entire solution using optimal deployment frameworks.

![Project Focus](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200&h=800)

## The Technical Execution
Performance is a core pillar of our experience philosophy. We achieved leading industry benchmarks by optimizing core vitals and interactive constraints.

> "The attention to detail in both the design execution and the underlying performance is phenomenal."

## Results
The project launched perfectly on time, resulting in significant measurable improvements:
- 40% Increase in engagement metrics
- 2x Faster deployment lifecycles
- Unprecedented customer satisfaction indexing`;

const projectsSeed = [
  {
    title: "Nova SaaS Platform", slug: "nova-saas-platform", client: "NovaTech Labs", year: "2024", disciplines: ["Design", "Development"], tags: ["React", "Next.js"], featured: true,
    cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=800",
    description: "End-to-end B2B analytics platform dashboard redesign."
  },
  {
    title: "Pulse Agency Rebrand", slug: "pulse-rebrand", client: "Pulse Agency", year: "2023", disciplines: ["Brand", "Design"], tags: ["Identity", "Web"], featured: true,
    cover_image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200&h=800",
    description: "Holistic brand identity overhaul and digital web transition."
  },
  {
    title: "Urban Light Series", slug: "urban-light-series", client: "Self-Initiated", year: "2023", disciplines: ["Photography"], tags: ["Street", "Exhibition"], featured: true,
    cover_image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=1200&h=800",
    description: "A photography series capturing the stark architectural contrast in twilight Lagos."
  },
  {
    title: "Midnight Frequencies EP", slug: "midnight-frequencies-ep", client: "Label", year: "2024", disciplines: ["Music"], tags: ["Electronic", "Production"], featured: true,
    cover_image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200&h=800",
    description: "A 5-track ambient electronic EP fusing synthetic and organic sound design."
  },
  {
    title: "Eko Atlantic Real Estate", slug: "eko-atlantic-real-estate", client: "Eko Atlantic", year: "2022", disciplines: ["Design"], tags: ["UI/UX", "Corporate"], featured: false,
    cover_image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200&h=800",
    description: "Premium property visualization platform."
  },
  {
    title: "The Creator's Toolkit", slug: "the-creators-toolkit", client: "CreatorCo", year: "2023", disciplines: ["Design", "Development"], tags: ["Web App", "SaaS"], featured: false,
    cover_image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200&h=800",
    description: "Productivity suite for modern multidisciplinary creatives."
  },
  {
    title: "Heritage Film Festival", slug: "heritage-film-festival", client: "Heritage Foundation", year: "2023", disciplines: ["Video", "Brand"], tags: ["Festival", "Identity"], featured: false,
    cover_image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200&h=800",
    description: "Identity and visual documentation for an independent cinema festival."
  },
  {
    title: "Sonic Landscapes Vol 1", slug: "sonic-landscapes-vol-1", client: "Audio Library", year: "2022", disciplines: ["Music"], tags: ["Ambient", "Sample Pack"], featured: false,
    cover_image: "https://images.unsplash.com/photo-1516280440502-58e1c64fd5a8?auto=format&fit=crop&q=80&w=1200&h=800",
    description: "Commercial sample library featuring environmental recordings."
  },
  {
    title: "AltFinance Mobile App", slug: "altfinance-mobile-app", client: "AltFinance", year: "2024", disciplines: ["Design"], tags: ["Fintech", "Mobile"], featured: false,
    cover_image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200&h=800",
    description: "Next-generation banking utility app UI."
  },
  {
    title: "Orijin Coffee Roasters", slug: "orijin-coffee-roasters", client: "Orijin", year: "2023", disciplines: ["Brand", "Photo"], tags: ["Packaging", "Product"], featured: false,
    cover_image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200&h=800",
    description: "Packaging identity and product photography for a specialty roaster."
  },
  {
    title: "Lagos Street Style", slug: "lagos-street-style", client: "Editorial", year: "2022", disciplines: ["Photo", "Video"], tags: ["Fashion", "Documentary"], featured: false,
    cover_image: "https://images.unsplash.com/photo-1520024146169-3240400354ae?auto=format&fit=crop&q=80&w=1200&h=800",
    description: "A brief documentary covering high-fashion intersecting with street culture."
  },
  {
    title: "Synthetica Audio Plugin", slug: "synthetica-audio-plugin", client: "DSP Labs", year: "2024", disciplines: ["Development", "Music"], tags: ["C++", "Audio Dev"], featured: false,
    cover_image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200&h=800",
    description: "A proprietary granular synthesis VST plugin interface and engine."
  }
];

// Special rich MDX payloads
const specialMDX: Record<string, string> = {
  "nova-saas-platform": `The objective of Nova was to redefine the way enterprises experience data analytics through a cohesive, end-to-end design and development strategy.

## The Challenge
Legacy systems were creating massive friction for the user base. Information architecture was tangled, the visual language lacked any sense of distinct identity, and the platform was severely unoptimized for mobile contexts.

## Strategic Approach
1. **User Research**: Conducted over 40 interviews to isolate key pain points.
2. **Design System**: Built a scalable component library directly mapped to React components.
3. **Execution**: Migrated the entire front-end to a modern Next.js architecture.

![Dashboard Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=800)

## The Visual Identity
We wanted something that felt both premium and approachable. By leveraging a dark-mode first design with high-contrast accent colors, the interface immediately feels modern and powerful.

> "Working with Ojo completely reshaped how we think about our own product. The blend of deep technical development skills and refined design taste is extremely rare in this industry." — _CEO, NovaTech Labs_

### Technical Implementation
The frontend was entirely reconstructed using modern functional React Server Components, prioritizing extreme performance.

\`\`\`tsx
export function MetricCard({ title, value, trend }: MetricProps) {
  return (
    <div className="p-6 bg-card border rounded-xl shadow-sm">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <span className="text-xs text-emerald-500 mt-1 block">{trend}</span>
    </div>
  )
}
\`\`\`

## The Outcome
The final product resulted in a 40% increase in user retention, zero layout shift (CLS), and a 200% faster time-to-market for their reporting features.`,
  
  "pulse-rebrand": `Pulse Agency approached us with a simple mandate: "We need to look like the work we produce."

## The Core Identity
The old identity felt dated, built during an era where heavy gradients and complex logos were standard. We stripped everything down to its absolute essence.

### Typography & Color
We selected a bold, condensed sans-serif for the primary logomark, paired tightly with an elegant serif for editorial content. The color palette was deliberately restricted to absolute black, stark white, and a signature 'Electric Crimson'.

![Brand Identity Mockups](https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80&w=1200&h=800)

## Execution Across Mediums
A brand is only as strong as its application. We rolled out the new system across:
- **Digital**: A completely redesigned, buttery-smooth Awwwards-winning portfolio website.
- **Physical**: Premium embossed business cards, letterheads, and studio signage.
- **Social**: Comprehensive template systems for Instagram and LinkedIn.

> "The rebrand didn't just change how we looked to clients. It changed how we thought about ourselves. It was a catalyst for our best year ever." — _Creative Director, Pulse_

## The Website Implementation
To match the premium feel, the development relied heavily on Lenis for fluid, momentum-based scrolling, and Framer Motion for sophisticated micro-interactions.`
};

async function seedRichContent() {
  console.log(`Hard-seeding ${projectsSeed.length} projects to Supabase...`);
  
  let count = 0;
  for (const p of projectsSeed) {
    const payload = {
      title: p.title,
      slug: p.slug,
      description: p.description,
      client: p.client,
      year: p.year,
      disciplines: p.disciplines,
      tags: p.tags,
      featured: p.featured,
      cover_image: p.cover_image,
      content: specialMDX[p.slug] || defaultMdx(p.title, p.description)
    };
    
    const { error } = await supabase.from('projects').upsert(payload, { onConflict: 'slug' });

    if (error) {
      console.error(`Failed to upsert ${p.slug}:`, error.message);
    } else {
      console.log(`✅ Seeded: ${p.slug}`);
      count++;
    }
  }

  console.log(`\nSuccess! Seeded ${count} end-to-end rich projects natively.`);
}

seedRichContent();
