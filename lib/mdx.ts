import { createClient } from '@supabase/supabase-js';

// Initialize a standard stateless client lazily
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  return createClient(url, key);
}

export async function getAllProjects() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data.map((project) => ({
    ...project,
    coverImage: project.cover_image
  }));
}

export async function getProjectBySlug(slug: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    if (error && error.code !== 'PGRST116') {
      console.error(`Error fetching project ${slug}:`, error);
    }
    return null;
  }

  return {
    slug: data.slug,
    content: data.content,
    frontmatter: {
      ...data,
      coverImage: data.cover_image,
      gallery: data.gallery || []
    }
  };
}

export async function getAllPosts() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('journal')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching journal posts:", error);
    return [];
  }

  return data.map((post) => ({
    ...post,
    coverImage: post.cover_image
  }));
}

export async function getPostBySlug(slug: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('journal')
    .select('*')
    .eq('status', 'published')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    if (error && error.code !== 'PGRST116') {
      console.error(`Error fetching post ${slug}:`, error);
    }
    return null;
  }

  return {
    slug: data.slug,
    content: data.content,
    frontmatter: {
      ...data,
      coverImage: data.cover_image
    }
  };
}

export async function getAllTestimonials() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }

  return data;
}

