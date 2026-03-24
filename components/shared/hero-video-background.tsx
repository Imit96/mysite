"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroVideoBackgroundProps {
  videoSrc: string;
}

export function HeroVideoBackground({ videoSrc }: HeroVideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track the scroll progress relative to this specific container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Fade opacity from 1 down to 0 as the user scrolls past the hero section
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0]); // Max opacity 0.3 so text is readable

  return (
    <motion.div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none"
      style={{ opacity }}
    >
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        className="object-cover w-full h-full"
      />
      {/* Optional dark overlay to ensure text contrast */}
      <div className="absolute inset-0 bg-background/50 mix-blend-multiply" />
    </motion.div>
  );
}
