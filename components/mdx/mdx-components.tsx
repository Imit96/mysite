import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";
import { AudioTrackPlayer } from "@/components/audio/audio-track-player";
import { ProjectGallery } from "@/components/shared/project-gallery";

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn("mt-2 scroll-m-20 text-4xl font-bold tracking-tight", className)} {...props} />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn("mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0", className)} {...props} />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("mt-8 scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic text-muted-foreground", className)} {...props} />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt || "Image"} {...props} />
  ),
  a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className={cn("font-medium underline underline-offset-4 text-primary", className)} {...props} />
  ),
  ProjectSection: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mt-16 mb-8">
      <h2 className="text-3xl font-heading font-bold mb-6">{title}</h2>
      {children}
    </section>
  ),
  ImageGrid: ({ columns = 2, children }: { columns?: number; children: React.ReactNode }) => (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6 my-12`}>
      {children}
    </div>
  ),
  FullWidthImage: ({ src, alt }: { src: string; alt: string }) => (
    <div className="w-full my-12 rounded-xl overflow-hidden bg-muted">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-auto" />
    </div>
  ),
  AudioEmbed: ({ src, title, artist, coverArt }: { src: string; title?: string; artist?: string; coverArt?: string }) => (
    <div className="my-8">
      <AudioTrackPlayer 
        track={{ id: src, src, title: title || "Untitled Track", artist: artist || "Ojo Oluwatimileyin", coverArt: coverArt || "" }} 
      />
    </div>
  ),
  ImageGallery: ({ images }: { images: string[] }) => (
    <ProjectGallery images={images || []} />
  ),
  MetricCard: ({ label, value }: { label: string; value: string }) => (
    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 my-8 flex flex-col items-center justify-center text-center">
      <span className="text-4xl md:text-6xl font-heading font-bold text-primary mb-2">{value}</span>
      <span className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-widest">{label}</span>
    </div>
  ),
  TechStack: ({ tags }: { tags: string[] }) => (
    <div className="flex flex-wrap gap-2 my-8">
      {tags?.map((tag) => (
        <span key={tag} className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-full">
          {tag}
        </span>
      ))}
    </div>
  )
};
