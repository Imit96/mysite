import { notFound } from "next/navigation";
import Image from "next/image";
import { getProjectBySlug, getAllProjects } from "@/lib/mdx";
import { MdxRenderer } from "@/components/mdx/mdx-renderer";
import { DisciplineTag } from "@/components/shared/discipline-tag";
import { CTABanner } from "@/components/shared/cta-banner";
import { ProjectGallery } from "@/components/shared/project-gallery";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Not Found" };
  
  const { title, description, meta_title, meta_description, og_image } = project.frontmatter;

  return {
    title: meta_title || `${title} | Work | Ojo Oluwatimileyin`,
    description: meta_description || description,
    openGraph: og_image ? {
      images: [{ url: og_image }]
    } : undefined
  };
}

export default async function CaseStudyPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = await getProjectBySlug(params.slug);
  
  if (!project) return notFound();

  const { title, description, coverImage, client, year, disciplines, tags } = project.frontmatter;

  return (
    <div className="flex flex-col w-full">
      <div className="pt-24 pb-12 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        {/* HERO IMAGE */}
        <div className="relative w-full aspect-[16/9] md:rounded-2xl overflow-hidden mb-12 -mx-6 md:mx-0 w-[calc(100%+3rem)] md:w-full">
          {coverImage ? (
             <Image src={coverImage} alt={title} fill className="object-cover" priority />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
               <span className="text-muted-foreground font-medium text-lg">No cover image available</span>
            </div>
          )}
        </div>

        {/* HEADER INFO */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            {disciplines?.map((d: string) => (
              <DisciplineTag 
                key={d} 
                label={d} 
                variant={d.toLowerCase().replace(/ & /g, "-") as any} 
              />
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-border">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Client</p>
              <p className="font-medium">{client}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Year</p>
              <p className="font-medium">{year}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Services</p>
              <p className="font-medium">{disciplines?.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12 lg:gap-24 relative">
          <div className="max-w-3xl w-full">
            <MdxRenderer source={project.content} />
          </div>
          
          <div className="hidden lg:block relative">
            <div className="sticky top-32">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-border pb-2">Overview</h3>
              <p className="text-sm text-muted-foreground mb-8">
                {description}
              </p>
              <a href="/contact" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                Start a similar project →
              </a>
            </div>
          </div>
        </div>

        {/* PROJECT GALLERY */}
        <ProjectGallery images={project.frontmatter.gallery} />
      </div>

      <CTABanner 
         title="Ready to build your own?"
         subtitle="Let's bring your vision to life."
         primaryButtonText="Start a Project"
         primaryButtonHref="/contact"
         secondaryButtonText="View More Work"
         secondaryButtonHref="/work"
      />
    </div>
  );
}
