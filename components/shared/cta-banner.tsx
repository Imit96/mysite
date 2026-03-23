import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export function CTABanner({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref
}: CTABannerProps) {
  return (
    <section className="w-full py-24 md:py-32 px-6 bg-secondary text-secondary-foreground">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-6">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl">
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <Link href={primaryButtonHref} className={buttonVariants({ size: "lg", className: "rounded-full px-10 text-lg h-14 w-full sm:w-auto" })}>
            {primaryButtonText}
          </Link>
          {secondaryButtonText && secondaryButtonHref && (
            <Link href={secondaryButtonHref} className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full px-10 text-lg h-14 w-full sm:w-auto border-border bg-card hover:bg-muted" })}>
              {secondaryButtonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
