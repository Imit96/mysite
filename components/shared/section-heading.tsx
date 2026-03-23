import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  overline: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ overline, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl mb-16 md:mb-24", className)}>
      <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
        {overline}
      </p>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6 text-foreground">
        {title}
      </h2>
      {description && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
