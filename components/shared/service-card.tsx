"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  href: string;
  className?: string;
}

export function ServiceCard({ number, title, description, href, className }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={cn("block group border-t border-border py-6 md:py-8 transition-colors", className)}>
      <div 
        className="w-full flex flex-col md:flex-row md:items-start gap-4 md:gap-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="text-lg md:text-xl font-heading font-bold text-muted-foreground/30 mt-1 md:w-24 shrink-0 transition-colors group-hover:text-primary">
          {number}
        </span>
        
        <div className="flex-1 flex flex-col">
          <Link href={href} className="flex justify-between items-center cursor-pointer">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              {title}
            </h3>
            <div className="rounded-full p-2 md:p-3 bg-secondary group-hover:bg-primary transition-colors duration-300">
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-foreground group-hover:text-primary-foreground transform group-hover:-rotate-45 transition-transform duration-300" />
            </div>
          </Link>
          
          <AnimatePresence>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden md:block hidden"
            >
              <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
                {description}
              </p>
              <Link href={href} className="inline-block mt-4 text-primary font-medium hover:underline underline-offset-4">
                Explore Service →
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Always visible description on mobile */}
          <div className="md:hidden mt-3">
            <p className="text-base text-muted-foreground leading-relaxed">
              {description}
            </p>
            <Link href={href} className="inline-block mt-3 text-primary font-medium hover:underline underline-offset-4">
              Explore Service →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
