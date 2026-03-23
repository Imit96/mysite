"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/shared/project-card";
import { motion, AnimatePresence } from "framer-motion";

const FILTERS = ["All", "Design & Dev", "Brand Strategy", "Photography", "Video", "Music"];

// Group primitive tags to larger UI filter categories
const disciplineToFilter = (d: string) => {
  if (d === "Design" || d === "Development") return "Design & Dev";
  if (d === "Brand") return "Brand Strategy";
  return d;
}

export function ProjectFilter({ projects }: { projects: any[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projects.filter(p => {
    if (activeFilter === "All") return true;
    return p.disciplines?.some((d: string) => disciplineToFilter(d) === activeFilter);
  });

  return (
    <>
      <div className="flex flex-wrap gap-2 md:gap-4 mb-12">
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter 
                ? "bg-primary text-primary-foreground" 
                : "bg-transparent border border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 min-h-[50vh]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map(project => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard 
                slug={project.slug}
                title={project.title}
                description={project.description}
                image={project.coverImage || ""}
                tags={project.disciplines?.map((d: string) => ({ 
                  label: d, 
                  variant: d.toLowerCase().replace(/ & /g, "-") 
                })) || []}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
