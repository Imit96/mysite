"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { TestimonialCard } from "@/components/shared/testimonial-card";

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  avatar_url: string | null;
  social_url: string | null;
}

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [progress, setProgress] = React.useState(0);

  // Embla requires enough slides to fill the screen multiple times to establish a true infinite loop.
  // We duplicate the items 3 times locally so it never hits the 'end' visually.
  const paddedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  React.useEffect(() => {
    if (!api) return;

    const onScroll = () => {
      setProgress(Math.max(0, Math.min(100, api.scrollProgress() * 100)));
    };

    api.on("scroll", onScroll);
    api.on("select", onScroll);
    onScroll();

    return () => {
      api.off("scroll", onScroll);
      api.off("select", onScroll);
    };
  }, [api]);

  const handleScrollBackward = React.useCallback(() => {
    if (!api) return;
    const autoScroll = plugin.current;
    
    if (autoScroll) {
      autoScroll.options.direction = "backward";
      autoScroll.reset();
    }
    
    api.scrollPrev();
  }, [api]);

  const handleScrollForward = React.useCallback(() => {
    if (!api) return;
    const autoScroll = plugin.current;
    
    if (autoScroll) {
      autoScroll.options.direction = "forward";
      autoScroll.reset();
    }
    
    api.scrollNext();
  }, [api]);

  const plugin = React.useRef(
    AutoScroll({
      speed: 1,
      startDelay: 0,
      stopOnInteraction: false, // Ensures it resumes after manual drag
      stopOnMouseEnter: true,
    })
  );

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[plugin.current]}
      className="w-full"
    >
      <CarouselContent className="-ml-4 md:-ml-8">
        {paddedTestimonials.map((t, i) => (
          <CarouselItem key={`${t.id}-${i}`} className="pl-4 md:pl-8 md:basis-1/2 lg:basis-1/3">
            <TestimonialCard
              quote={t.quote}
              name={t.name}
              role={t.role || ""}
              company={t.company || ""}
              avatarSrc={t.avatar_url || ""}
              socialUrl={t.social_url || ""}
              className="bg-background"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-between gap-8 mt-16 max-w-3xl mx-auto px-6">
        <div className="flex-1 h-1 bg-border relative overflow-hidden rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-primary" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 shrink-0 border-border bg-background hover:bg-muted"
            onClick={handleScrollBackward}
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 shrink-0 border-border bg-background hover:bg-muted"
            onClick={handleScrollForward}
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Carousel>
  );
}
