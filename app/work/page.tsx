import { getAllProjects } from "@/lib/mdx";
import { ProjectFilter } from "./project-filter";
import { CTABanner } from "@/components/shared/cta-banner";
import { FadeIn } from "@/components/shared/fade-in";

export const metadata = {
  title: "Work | Ojo Oluwatimileyin",
  description: "A curated collection of projects across design, development, brand, photography, video, and music.",
};

export default async function WorkPage() {
  const projects = await getAllProjects();

  return (
    <div className="flex flex-col w-full">
      <div className="pt-32 pb-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full min-h-screen">
        <FadeIn className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6">Work</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            A curated collection of projects across design, development, brand, photography, video, and music.
          </p>
        </FadeIn>
        
        <ProjectFilter projects={projects} />
      </div>

      <FadeIn>
        <CTABanner 
          title="Seen something you like?"
          subtitle="Let's build something beautiful together."
          primaryButtonText="Start a Project"
          primaryButtonHref="/contact"
          secondaryButtonText="View Services"
          secondaryButtonHref="/services"
        />
      </FadeIn>
    </div>
  );
}
