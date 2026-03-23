import { getAllProjects } from "@/lib/mdx";
import { ProjectFilter } from "./project-filter";
import { CTABanner } from "@/components/shared/cta-banner";

export const metadata = {
  title: "Work | Ojo Oluwatimileyin",
  description: "A curated collection of projects across design, development, brand, photography, video, and music.",
};

export default async function WorkPage() {
  const projects = await getAllProjects();

  return (
    <div className="flex flex-col w-full">
      <div className="pt-32 pb-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full min-h-screen">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight mb-6">Work</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            A curated collection of projects across design, development, brand, photography, video, and music.
          </p>
        </div>
        
        <ProjectFilter projects={projects} />
      </div>

      <CTABanner 
        title="Seen something you like?"
        subtitle="Let's build something beautiful together."
        primaryButtonText="Start a Project"
        primaryButtonHref="/contact"
        secondaryButtonText="View Services"
        secondaryButtonHref="/services"
      />
    </div>
  );
}
