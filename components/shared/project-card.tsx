import Image from "next/image";
import Link from "next/link";
import { DisciplineTag } from "./discipline-tag";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: Array<{ label: string; variant: "development" | "design" | "brand" | "photo" | "video" | "music" }>;
  className?: string;
}

export function ProjectCard({ slug, title, description, image, tags, className }: ProjectCardProps) {
  return (
    <Link href={`/work/${slug}`} className={`group block ${className}`}>
      <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-muted mb-6">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full bg-secondary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <DisciplineTag key={tag.label} label={tag.label} variant={tag.variant} />
        ))}
      </div>
      
      <h3 className="text-2xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground line-clamp-2 mb-4 text-sm md:text-base">
        {description}
      </p>
      <span className="text-primary font-medium group-hover:underline underline-offset-4 cursor-pointer">
        View Project →
      </span>
    </Link>
  );
}
