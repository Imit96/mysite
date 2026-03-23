import { cn } from "@/lib/utils";

interface MarqueeStripProps {
  items: string[];
  separator?: string;
  className?: string;
}

export function MarqueeStrip({ items, separator = " / ", className }: MarqueeStripProps) {
  return (
    <div className={cn("flex overflow-hidden border-y border-border py-6 w-full bg-background relative", className)}>
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Repeat array 4 times for infinite effect */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center shrink-0">
            {items.map((item, j) => (
              <span key={`${i}-${j}`} className="text-xl md:text-2xl font-heading font-semibold text-muted-foreground/50 mx-4 uppercase tracking-wider">
                {item} <span className="mx-4 text-border">{separator}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
