import dynamic from "next/dynamic";
import { MarqueeStrip } from "@/components/shared/marquee-strip";
const VideoShowreel = dynamic(
  () => import("@/components/shared/video-showreel").then(mod => mod.VideoShowreel), 
  { 
    loading: () => <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] bg-muted animate-pulse shadow-lg" /> 
  }
);
import { ProjectCard } from "@/components/shared/project-card";
import { ServiceCard } from "@/components/shared/service-card";
import { CTABanner } from "@/components/shared/cta-banner";
import { TestimonialCarousel } from "@/components/shared/testimonial-carousel";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Play } from "lucide-react";
import { getAllTestimonials } from "@/lib/mdx";

export default async function Home() {
  const testimonials = await getAllTestimonials();
  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center px-6 text-center overflow-hidden pt-20">
        {/* Abstract gradient background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        
        <div className="max-w-4xl mx-auto flex flex-col items-center z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Creative Director & Developer
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-bold tracking-tight leading-[1.05] mb-8">
            OJO OLUWATIMILEYIN<span className="text-primary">.</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-[600px] mb-12 leading-relaxed">
            I design, build, and produce digital experiences — from code to camera to sound.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/work" className={buttonVariants({ size: "lg", className: "rounded-full px-10 h-14 text-lg" })}>
              View My Work
            </Link>
            <Link href="#showreel" className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full px-10 h-14 text-lg group bg-background/50 backdrop-blur-sm border-border" })}>
              <Play className="w-5 h-5 mr-2" />
              Watch Showreel
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: MARQUEE STRIP */}
      <MarqueeStrip 
        items={[
          "Full-Stack Development", 
          "UI/UX Design", 
          "Brand Strategy", 
          "Photography", 
          "Videography", 
          "Music Production"
        ]} 
      />

      {/* SECTION 3: SHOWREEL / INTRODUCTION */}
      <section id="showreel" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <VideoShowreel 
            videoSrc="/videos/showreel.mp4" 
            posterSrc=""
          />
          <div className="flex flex-col">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">WHO I AM</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-6">
              A multidisciplinary creative who sees the whole picture.
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-8">
              <p>
                Most creatives specialize in one thing. I chose to master several — because the best digital experiences aren't built in silos. They're designed, developed, branded, photographed, filmed, and scored by someone who understands how all the pieces connect.
              </p>
              <p>
                I work with startups, agencies, artists, and enterprises who want a creative partner, not just a service provider.
              </p>
            </div>
            <Link href="/about" className="text-primary font-medium hover:underline underline-offset-4 self-start text-lg">
              More About Me →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: SELECTED WORK */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">FEATURED WORK</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-4">
            Projects that span every medium.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Each project showcases the full scope of my contribution — from strategy to execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          <ProjectCard 
            slug="nova-saas-platform"
            title="Nova SaaS Platform"
            description="End-to-end design and development of a B2B analytics platform."
            image=""
            tags={[
              { label: "Design", variant: "design" },
              { label: "Development", variant: "development" }
            ]}
          />
          <ProjectCard 
            slug="pulse-rebrand"
            title="Pulse Agency Rebrand"
            description="Complete brand overhaul for a creative agency — from strategy to visual identity."
            image=""
            tags={[
              { label: "Brand Strategy", variant: "brand" }
            ]}
          />
          <ProjectCard 
            slug="urban-light-series"
            title="Urban Light Series"
            description="A photography series exploring light, shadow, and architecture in Lagos."
            image=""
            tags={[
              { label: "Photography", variant: "photo" }
            ]}
          />
          <ProjectCard 
            slug="midnight-frequencies-ep"
            title="Midnight Frequencies EP"
            description="A 5-track EP blending Afro-electronic and ambient textures."
            image=""
            tags={[
              { label: "Music", variant: "music" }
            ]}
          />
        </div>

        <div className="flex justify-center">
          <Link href="/work" className={buttonVariants({ size: "lg", className: "rounded-full px-10 h-14 text-lg" })}>
            View All Projects →
          </Link>
        </div>
      </section>

      {/* SECTION 5: SERVICES */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto w-full border-t border-border">
        <div className="mb-16 md:mb-20 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">WHAT I OFFER</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
            Solutions designed, built, and produced under one roof.
          </h2>
        </div>

        <div className="flex flex-col">
          <ServiceCard 
            number="01"
            title="Digital Products"
            description="End-to-end UI/UX design and full-stack development for web applications."
            href="/services/digital-products"
          />
          <ServiceCard 
            number="02"
            title="Brand & Identity"
            description="Strategic brand development from naming and positioning to complete visual identity systems."
            href="/services/brand-identity"
          />
          <ServiceCard 
            number="03"
            title="Visual Content"
            description="Photography and videography that tells your brand's story with cinematic quality."
            href="/services/visual-content"
          />
          <ServiceCard 
            number="04"
            title="Audio & Music"
            description="Original music production, sound design, and audio branding for any medium."
            href="/services/audio-music"
          />
          <ServiceCard 
            number="05"
            title="Creative Direction"
            description="Full-spectrum creative leadership — I connect strategy, design, code, and content into one cohesive vision."
            href="/services/creative-direction"
            className="border-b"
          />
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section className="py-24 md:py-32 bg-muted border-y border-border overflow-hidden w-full flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">KIND WORDS</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
              What clients and collaborators say.
            </h2>
          </div>
        </div>

        <div className="w-full">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <CTABanner 
        title="Ready to create something extraordinary?"
        subtitle="Let's talk about your next project."
        primaryButtonText="Start a Project"
        primaryButtonHref="/contact"
        secondaryButtonText="Book a Call"
        secondaryButtonHref="https://calendly.com"
      />
    </div>
  );
}
