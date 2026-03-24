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
import { HeroVideoBackground } from "@/components/shared/hero-video-background";
import { FadeIn } from "@/components/shared/fade-in";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Play, Search } from "lucide-react";
import { getAllTestimonials } from "@/lib/mdx";

export const revalidate = 60; // Revalidate the homepage every 60 seconds to fetch fresh testimonials

export default async function Home() {
  const testimonials = await getAllTestimonials();
  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO (Redesigned matching reference) */}
      <section className="relative -mt-20 pt-20 h-[100svh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Grid Lines to match reference image */}
        <div className="absolute inset-0 pointer-events-none flex w-full max-w-[100vw] justify-between px-0 z-0 opacity-40">
          <div className="w-1/4 h-full border-r border-border" />
          <div className="w-1/4 h-full border-r border-border" />
          <div className="w-1/4 h-full border-r border-border" />
          <div className="w-1/4 h-full" />
        </div>
        
        {/* Video Background with Scroll fade effect */}
        <HeroVideoBackground videoSrc="/images/about/video/site.mp4" />

        {/* Abstract subtle overlay gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background/80 to-background pointer-events-none" />

        {/* Desktop Fixed Elements (hidden on mobile, visible lg+) */}
        
        {/* Left Side: 001 Marker */}
        <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 items-center z-10">
          <span className="text-xs font-medium tracking-widest text-muted-foreground mr-4">001</span>
        </div>

        {/* Right Side: / 007 Marker */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 items-center z-10">
          <span className="text-xs font-medium tracking-widest text-muted-foreground">/ 007</span>
        </div>
        
        {/* Bottom Left: Showreel Thumbnail / Variant */}
        <div className="hidden lg:flex absolute left-8 bottom-12 z-10 w-48 h-24 bg-muted border border-border group overflow-hidden cursor-pointer">
           <Link href="#showreel" className="w-full h-full relative block">
              <video
                src="/images/about/video/showreel-animation.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-300">
                <span className="text-xs font-bold tracking-widest text-foreground mix-blend-difference drop-shadow-md">PLAY REEL</span>
              </div>
           </Link>
        </div>

        {/* Bottom Right: Description (mimicking Product Details) */}
        <div className="hidden lg:flex absolute right-[4vw] bottom-12 z-10 flex-col items-start w-[240px]">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-2">CREATIVE PARTNER</h3>
          <p className="text-xs text-muted-foreground mb-2">Designer, Developer, Producer</p>
          <p className="text-sm leading-relaxed text-foreground/80">
            I design, build, and produce digital experiences — from code to camera to sound, all under one roof.
          </p>
        </div>

        {/* Bottom Center: Scroll Down */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mix-blend-difference">Scroll down</span>
        </div>

        {/* Main Center Content */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full px-6 container mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-heading font-bold tracking-tighter leading-[0.9] text-center mb-8 drop-shadow-sm text-foreground max-w-[1000px]">
            OJO OLUWATIMILEYIN
          </h1>

          {/* Search-bar style CTA matching the reference */}
          <Link href="/work" className="group relative w-full max-w-md flex items-center justify-between py-4 border-b border-foreground/30 hover:border-foreground transition-colors cursor-pointer bg-transparent">
            <div className="flex items-center gap-4">
              <span className="text-foreground/50 group-hover:text-foreground transition-colors">
                <Search className="w-5 h-5" />
              </span>
              <span className="text-sm md:text-base font-medium text-foreground/70 group-hover:text-foreground transition-colors">Click to explore my work...</span>
            </div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/50 group-hover:text-foreground transition-colors">Portfolio</span>
          </Link>
          
          {/* Mobile Fallback Bio (visible only on small screens) */}
          <div className="lg:hidden mt-16 text-center max-w-sm flex flex-col items-center">
             <h3 className="text-xs font-bold uppercase tracking-widest mb-2 text-primary">Creative Partner</h3>
             <p className="text-sm text-muted-foreground leading-relaxed">
               I design, build, and produce digital experiences — from code to camera to sound.
             </p>
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
      <section id="showreel" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <FadeIn className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <VideoShowreel 
            videoSrc="/images/about/video/showreel-animation.mp4" 
            posterSrc=""
          />
          <div className="flex flex-col">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">WHO I AM</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-6">
              A multidisciplinary creative who sees the whole picture.
            </h2>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
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
        </FadeIn>
      </section>

      {/* SECTION 4: SELECTED WORK */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <FadeIn className="mb-12">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">FEATURED WORK</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-4">
            Projects that span every medium.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Each project showcases the full scope of my contribution — from strategy to execution.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          <FadeIn delay={0.1}>
            <ProjectCard 
              slug="nova-saas-platform"
              title="Nova SaaS Platform"
              description="End-to-end design and development of a B2B analytics platform."
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop"
              tags={[
                { label: "Design", variant: "design" },
                { label: "Development", variant: "development" }
              ]}
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            <ProjectCard 
              slug="pulse-rebrand"
              title="Pulse Agency Rebrand"
              description="Complete brand overhaul for a creative agency — from strategy to visual identity."
              image="https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1470&auto=format&fit=crop"
              tags={[
                { label: "Brand Strategy", variant: "brand" }
              ]}
            />
          </FadeIn>
          <FadeIn delay={0.3}>
            <ProjectCard 
              slug="urban-light-series"
              title="Urban Light Series"
              description="A photography series exploring light, shadow, and architecture in Lagos."
              image="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1471&auto=format&fit=crop"
              tags={[
                { label: "Photography", variant: "photo" }
              ]}
            />
          </FadeIn>
          <FadeIn delay={0.4}>
            <ProjectCard 
              slug="midnight-frequencies-ep"
              title="Midnight Frequencies EP"
              description="A 5-track EP blending Afro-electronic and ambient textures."
              image="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1470&auto=format&fit=crop"
              tags={[
                { label: "Music", variant: "music" }
              ]}
            />
          </FadeIn>
        </div>

        <FadeIn direction="up" delay={0.2} className="flex justify-center">
          <Link href="/work" className={buttonVariants({ size: "lg", className: "rounded-full px-10 h-14 text-lg" })}>
            View All Projects →
          </Link>
        </FadeIn>
      </section>

      {/* SECTION 5: SERVICES */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto w-full border-t border-border">
        <FadeIn className="mb-12 md:mb-16 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">WHAT I OFFER</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight">
            Solutions designed, built, and produced under one roof.
          </h2>
        </FadeIn>

        <div className="flex flex-col">
          <FadeIn delay={0.1}>
            <ServiceCard 
              number="01"
              title="Digital Products"
              description="End-to-end UI/UX design and full-stack development for web applications."
              href="/services/digital-products"
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            <ServiceCard 
              number="02"
              title="Brand & Identity"
              description="Strategic brand development from naming and positioning to complete visual identity systems."
              href="/services/brand-identity"
            />
          </FadeIn>
          <FadeIn delay={0.3}>
            <ServiceCard 
              number="03"
              title="Visual Content"
              description="Photography and videography that tells your brand's story with cinematic quality."
              href="/services/visual-content"
            />
          </FadeIn>
          <FadeIn delay={0.4}>
            <ServiceCard 
              number="04"
              title="Audio & Music"
              description="Original music production, sound design, and audio branding for any medium."
              href="/services/audio-music"
            />
          </FadeIn>
          <FadeIn delay={0.5}>
            <ServiceCard 
              number="05"
              title="Creative Direction"
              description="Full-spectrum creative leadership — I connect strategy, design, code, and content into one cohesive vision."
              href="/services/creative-direction"
              className="border-b"
            />
          </FadeIn>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section className="py-16 md:py-24 bg-muted border-y border-border overflow-hidden w-full flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">KIND WORDS</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight">
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
