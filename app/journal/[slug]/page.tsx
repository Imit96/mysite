import { notFound } from "next/navigation";
import Image from "next/image";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { MdxRenderer } from "@/components/mdx/mdx-renderer";
import { CTABanner } from "@/components/shared/cta-banner";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Not Found" };

  const { title, description, meta_title, meta_description, og_image } = post.frontmatter;

  return {
    title: meta_title || `${title} | Journal | Ojo Oluwatimileyin`,
    description: meta_description || description,
    openGraph: og_image ? {
      images: [{ url: og_image }]
    } : undefined
  };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);
  
  if (!post) return notFound();

  const { title, description, coverImage, category } = post.frontmatter;

  return (
    <div className="flex flex-col w-full">
      <article className="pt-32 pb-16 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto w-full">
        {/* HEADER INFO */}
        <header className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-sm text-primary font-bold tracking-wider uppercase mb-6 px-3 py-1 bg-primary/10 rounded-full">
            {category}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            {description}
          </p>
        </header>

        {/* HERO IMAGE */}
        {coverImage && (
          <div className="relative w-full aspect-[16/9] md:rounded-2xl overflow-hidden mb-16 -mx-6 md:mx-0 w-[calc(100%+3rem)] md:w-full bg-muted">
            <Image src={coverImage} alt={title} fill className="object-cover" priority />
          </div>
        )}

        {/* CONTENT AREA */}
        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto w-full">
          <MdxRenderer source={post.content} />
        </div>
      </article>

      <CTABanner 
         title="Enjoyed this piece?"
         subtitle="Let's build something extraordinary together."
         primaryButtonText="Start a Project"
         primaryButtonHref="/contact"
         secondaryButtonText="Read More"
         secondaryButtonHref="/journal"
      />
    </div>
  );
}
