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

const journalSeed = [
  {
    title: "The Evolution of Digital Interfaces", 
    slug: "evolution-of-digital-interfaces", 
    category: "Design",
    cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=800",
    description: "A deep dive into how modern interfaces have shifted over the last decade.",
    content: `The way we interact with digital products is in a constant state of flux. From the early days of glossy skeuomorphism to the ultra-minimalist flat design era, the pendulum always swings.

## The Return to Depth
Recently, there's been a noticeable shift back towards depth, texture, and physical realism—often termed "neumorphism" or "spatial design".

### Why It Matters
Users crave tactility. When everything is perfectly flat, interfaces lose their interactive affordances. A subtle inner shadow or a delicate drop shadow can dramatically reduce cognitive load, telling the user *exactly* what can be clicked or pushed.

> "A great interface doesn't just look beautiful; it feels inevitable."

## Looking Forward
As we move into an era dominated by AR and spatial computing, the constraints of the 2D screen will slowly dissolve. Designers who understand light, shadow, and physical spacing will have a distinct advantage in this new frontier.`
  },
  {
    title: "Building Scalable Architecture with Next.js App Router", 
    slug: "building-scalable-architecture", 
    category: "Engineering",
    cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=800",
    description: "Exploring the transition from Pages to App Router and React Server Components.",
    content: `The release of Next.js 13 and the App Router fundamentally changed how we architect React applications. By making components server-first by default, we've essentially eliminated entire categories of client-side state management.

## React Server Components (RSC)
RSCs are arguably the most significant shift in React's philosophy since Hooks.

By keeping heavy dependencies on the server and streaming the resulting HTML to the client, we drastically reduce bundle sizes.

\`\`\`tsx
// This runs exclusively on the server
export default async function ProjectList() {
  const data = await db.select().from(projects);
  return (
    <ul>
      {data.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  )
}
\`\`\`

## The Paradigm Shift
We no longer need \`useEffect\` for data fetching. The data is fetched at the component level, asynchronously, before the UI even begins to render on the client. It’s cleaner, faster, and infinitely more scalable.`
  },
  {
    title: "Finding Rhythm: Electronic Music Production Workflows", 
    slug: "finding-rhythm-electronic-music", 
    category: "Music",
    cover_image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200&h=800",
    description: "My personal approach to sound design, balancing logic with creative improvisation.",
    content: `Music production is a fascinating intersection of cold, hard mathematics and fluid emotional expression. As someone who writes code all day, I often find myself falling into the trap of treating a DAW (Digital Audio Workstation) like an IDE.

## The Engineering Mindset
When you understand frequency spectrums, compression ratios, and phase alignment, it's very easy to just "fix" a mix. But a perfect mix isn't necessarily an interesting one.

### Structuring Chaos
To combat the sterility of digital production, I've developed a workflow that deliberately introduces chaos:
- Recording long, unquantized hardware jams
- Running clean synthesis through analog distortion pedals
- Resampling entire sections and stretching them until artifacts appear

![Studio Setup](https://images.unsplash.com/photo-1516280440502-58e1c64fd5a8?auto=format&fit=crop&q=80&w=1200&h=800)

## Conclusion
The magic happens when you let go of the grid. The imperfections—the slight swing of a hi-hat, the crackle of a saturated bassline—that's where the soul of the track lives.`
  },
  {
    title: "The Importance of Intentional Rest in Creative Fields", 
    slug: "intentional-rest-creative-fields", 
    category: "Thoughts",
    cover_image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=1200&h=800",
    description: "Why burnout is prevalent in design and engineering, and how to build sustainable systems.",
    content: `The modern creative economy demands relentless output. Whether you're pushing code, shipping Figma files, or bouncing stems, the pressure to "hustle" is omnipresent.

## The Burnout Cycle
Burnout isn't just about working long hours. It's about a fundamental misalignment between effort and recovery.

### Strategies for Sustainability
1. **Disconnecting from the Medium:** If your job involves staring at a screen, your hobby should not. Look at trees. Read a physical book.
2. **Embracing Boredom:** The best ideas rarely happen when you are actively trying to solve a problem. They happen in the shower, on a walk, or while doing the dishes.
3. **Saying No:** Not every project is worth your time. Protecting your bandwidth is the most important skill you can develop as a creative professional.

Taking intentional time away from the craft doesn't stall your progress; it's exactly what fuels it.`
  }
];

async function seedJournals() {
  console.log(`Hard-seeding ${journalSeed.length} journal posts to Supabase...`);
  
  let count = 0;
  for (const j of journalSeed) {
    const payload = {
      title: j.title,
      slug: j.slug,
      description: j.description,
      category: j.category,
      cover_image: j.cover_image,
      content: j.content
    };
    
    const { error } = await supabase.from('journal').upsert(payload, { onConflict: 'slug' });

    if (error) {
      console.error(`Failed to upsert ${j.slug}:`, error.message);
    } else {
      console.log(`✅ Seeded: ${j.slug}`);
      count++;
    }
  }

  console.log(`\nSuccess! Seeded ${count} journal posts natively.`);
}

seedJournals();
