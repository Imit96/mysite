"use client";

import { motion, useScroll, useTransform } from "framer-motion";

interface HeroVideoBackgroundProps {
  videoSrc: string;
}

export function HeroVideoBackground({ videoSrc }: HeroVideoBackgroundProps) {
  // Read the global scroll position since the hero is always at the absolute top of the page
  const { scrollY } = useScroll();

  // Map 0px -> 600px of scroll distance to an opacity fade from 0.5 -> 0
  const opacity = useTransform(scrollY, [0, 600], [0.5, 0]);

  return (
    <motion.div 
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
      {/* Dark overlay to ensure text contrast */}
      <div className="absolute inset-0 bg-background/50 mix-blend-multiply" />
    </motion.div>
  );
}
