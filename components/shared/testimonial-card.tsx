import { Quote, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatarSrc?: string;
  socialUrl?: string;
  className?: string;
}

export function TestimonialCard({ quote, name, role, company, avatarSrc, socialUrl, className }: TestimonialCardProps) {
  return (
    <div className={`relative flex flex-col justify-between rounded-2xl bg-card border border-border p-8 md:p-10 shadow-sm h-full ${className}`}>
      <Quote className="absolute top-8 left-8 h-12 w-12 text-muted/50 -z-10" />
      <div className="z-10 bg-transparent flex-1 mb-10 mt-8">
        <p className="text-xl md:text-2xl font-serif italic text-card-foreground leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
      <div className="flex items-center gap-4 z-10">
        <Avatar className="h-12 w-12 ring-2 ring-background border border-border">
          <AvatarImage src={avatarSrc || ""} alt={name} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-card-foreground truncate">{name}</p>
            {socialUrl && (
              <a href={socialUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors shrink-0" aria-label={`${name}'s social profile`}>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <p className="text-sm font-medium text-muted-foreground truncate">
            {role}{company ? `, ${company}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

