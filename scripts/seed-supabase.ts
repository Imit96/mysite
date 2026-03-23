import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createClient } from "@supabase/supabase-js";

// Manually read .env.local because tsx doesn't load it natively without dotenv
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
const projectsDirectory = path.join(process.cwd(), "content/projects");

async function seed() {
  if (!fs.existsSync(projectsDirectory)) {
    console.log("No projects to seed.");
    return;
  }
  
  const fileNames = fs.readdirSync(projectsDirectory);
  let count = 0;
  
  for (const fileName of fileNames) {
    if (!fileName.endsWith('.mdx')) continue;
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    
    const disciplines = Array.isArray(data.disciplines) ? data.disciplines : [];
    const tags = Array.isArray(data.tags) ? data.tags : [];
    
    console.log(`Seeding: ${slug}...`);
    const { error } = await supabase.from('projects').upsert({
      slug,
      title: data.title || slug,
      description: data.description || "",
      client: data.client || "",
      year: data.year || new Date().getFullYear().toString(),
      disciplines,
      tags,
      featured: !!data.featured,
      cover_image: data.coverImage || "",
      content: content
    }, { onConflict: 'slug' });
    
    if (error) {
      console.error(`Error inserting ${slug}:`, error);
    } else {
      count++;
    }
  }
  
  console.log(`Successfully seeded ${count} projects into Supabase!`);
}

seed();
