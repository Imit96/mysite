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
    <div className={cn("block group border-t border-border py-8 md:py-12 transition-colors", className)}>
      <div 
        className="w-full flex flex-col md:flex-row md:items-start gap-4 md:gap-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="text-xl md:text-3xl font-heading font-bold text-muted-foreground/30 mt-1 md:w-32 shrink-0 transition-colors group-hover:text-primary">
          {number}
        </span>
        
        <div className="flex-1 flex flex-col">
          <Link href={href} className="flex justify-between items-center cursor-pointer">
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
              {title}
            </h3>
            <div className="rounded-full p-3 md:p-4 bg-secondary group-hover:bg-primary transition-colors duration-300">
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-foreground group-hover:text-primary-foreground transform group-hover:-rotate-45 transition-transform duration-300" />
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
              <p className="text-xl text-muted-foreground mt-6 max-w-3xl leading-relaxed">
                {description}
              </p>
              <Link href={href} className="inline-block mt-6 text-primary font-medium hover:underline underline-offset-4">
                Explore Service →
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Always visible description on mobile */}
          <div className="md:hidden mt-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
            <Link href={href} className="inline-block mt-4 text-primary font-medium hover:underline underline-offset-4">
              Explore Service →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
