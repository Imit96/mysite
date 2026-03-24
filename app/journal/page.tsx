import { CTABanner } from "@/components/shared/cta-banner";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { getAllPosts } from "@/lib/mdx";

export const metadata = {
  title: "Journal | Ojo Oluwatimileyin",
  description: "Thoughts on design, development, creativity, and building things that matter.",
};

export default async function JournalPage() {
  const posts = await getAllPosts(); 

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="pt-32 pb-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full flex-grow">
        {/* HERO */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6">Journal</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
            Thoughts on design, development, creativity, and building things that matter.
          </p>
        </div>

        {/* POST GRID / EMPTY STATE */}
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-border rounded-3xl bg-muted/30">
            <h3 className="text-2xl font-heading font-bold mb-4">New articles coming soon</h3>
            <p className="text-muted-foreground mb-8 max-w-md">
              I'm currently writing some new pieces. In the meantime, check out my latest case studies.
            </p>
            <Link href="/work" className={buttonVariants({ variant: "default", className: "rounded-full px-8" })}>
              View My Work →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/journal/${post.slug}`} key={post.slug} className="group flex flex-col items-start gap-4">
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-muted mb-2">
                  {post.coverImage && (
                    <Image 
                      src={post.coverImage} 
                      alt={post.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-primary font-medium tracking-wide uppercase">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-heading font-bold leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <CTABanner 
         title="Want to work together?"
         subtitle="Let's build something extraordinary."
         primaryButtonText="Start a Project"
         primaryButtonHref="/contact"
      />
    </div>
  );
}
