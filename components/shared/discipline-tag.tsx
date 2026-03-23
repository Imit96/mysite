import { cn } from "@/lib/utils";

interface DisciplineTagProps {
  label: string;
  variant?: "development" | "design" | "brand" | "photo" | "video" | "music";
  className?: string;
}

const colorMap = {
  development: "bg-[var(--color-tag-development)]",
  design: "bg-[var(--color-tag-design)]",
  brand: "bg-[var(--color-tag-brand)]",
  photo: "bg-[var(--color-tag-photo)]",
  video: "bg-[var(--color-tag-video)]",
  music: "bg-[var(--color-tag-music)]",
};

export function DisciplineTag({ label, variant = "design", className }: DisciplineTagProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors bg-background text-foreground shadow-sm",
        className
      )}
    >
      <span className={cn("mr-2 h-2.5 w-2.5 rounded-full", colorMap[variant])} />
      {label}
    </div>
  );
}
