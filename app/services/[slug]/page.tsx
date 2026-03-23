import { notFound } from "next/navigation";
import { getServiceById, SERVICES } from "@/lib/services";
import { CTABanner } from "@/components/shared/cta-banner";
import { ProjectCard } from "@/components/shared/project-card";
import { getAllProjects } from "@/lib/mdx";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = getServiceById(params.slug);
  if (!service) return { title: "Not Found" };
  
  return {
    title: `${service.title} | Services | Ojo Oluwatimileyin`,
    description: service.description,
  };
}

export default async function ServiceDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = getServiceById(params.slug);
  
  if (!service) return notFound();

  // Fetch projects and filter by the service's associated tags
  const allProjects = await getAllProjects();
  const relatedProjects = allProjects.filter((project) => {
    const projectTags = [...(project.disciplines || []), ...(project.tags || [])].map((t: string) => t.toLowerCase());
    return projectTags.some(pt => service.queryTags.includes(pt));
  }).slice(0, 4); // Limit to top 4 related projects

  const Icon = service.icon;

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-8 text-primary">
          <div className="p-4 bg-primary/10 rounded-2xl">
            <Icon className="w-8 h-8 md:w-12 md:h-12" />
          </div>
          <p className="text-sm md:text-base font-bold uppercase tracking-widest text-muted-foreground">Service Offering</p>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-8 leading-tight">
          {service.title}
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
          {service.longDescription}
        </p>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-muted/30 border-y border-border">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-heading font-bold mb-4">What's Included</h2>
            <p className="text-muted-foreground mb-6">A comprehensive package tailored to deliver exactly what you need.</p>
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Ideal For</h3>
              <p className="font-medium">{service.idealFor}</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {service.includes.map(item => (
                <li key={item} className="flex items-start text-foreground">
                  <span className="text-primary font-bold mr-3 mt-0.5">✓</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* THE PROCESS */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto w-full">
        <div className="mb-16 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight">
            My Process
          </h2>
        </div>

        <div className="relative border-l border-border/50 ml-4 md:ml-8 space-y-12 pb-8">
          {service.process.map((step, index) => (
            <div key={index} className="relative pl-8 md:pl-12">
              <div className="absolute -left-5 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 border-primary text-primary font-bold font-mono text-sm shadow-sm">
                {index + 1}
              </div>
              <h3 className="text-xl font-heading font-bold mb-2 pt-1">{step.name}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED WORK */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-muted/10 border-t border-border">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Featured Case Studies</p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight">
                Works under {service.title}
              </h2>
            </div>
            {relatedProjects.length > 0 && (
              <Link href="/work" className={buttonVariants({ variant: "outline", className: "rounded-full" })}>
                View All Work
              </Link>
            )}
          </div>

          {relatedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {relatedProjects.map(project => (
                <ProjectCard 
                  key={project.slug}
                  slug={project.slug}
                  title={project.title}
                  description={project.description}
                  image={project.coverImage || ""}
                  tags={project.disciplines?.map((tag: string) => ({
                    label: tag,
                    variant: tag.toLowerCase().replace(/ & /g, "-") as any
                  })) || []}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-card border rounded-3xl">
              <p className="text-muted-foreground mb-4">New case studies showcasing this discipline are currently being documented.</p>
              <Link href="/work" className="text-primary hover:underline">Browse other projects in the meantime →</Link>
            </div>
          )}
        </div>
      </section>

      <CTABanner 
         title={`Ready for ${service.title}?`}
         subtitle="Book a call to discuss your requirements and get a precise quote."
         primaryButtonText="Start a Project"
         primaryButtonHref={`/contact?service=${service.id}`}
         secondaryButtonText="Book a Call"
         secondaryButtonHref="https://calendly.com"
      />
    </div>
  );
}
