"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();

  // Hide on home page and admin dashboard routes to maintain layout purity
  if (pathname === "/" || pathname.startsWith("/admin")) {
    return null;
  }

  const pathNames = pathname.split("/").filter((path) => path);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-8 pb-4">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary transition-colors flex items-center">
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          
          {pathNames.map((link, index) => {
            const href = `/${pathNames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathNames.length - 1;
            
            // Format slug to Title Case
            const title = link
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());

            return (
              <li key={index} className="flex items-center space-x-2">
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                {isLast ? (
                  <span className="font-medium text-foreground tracking-wide" aria-current="page">
                    {title}
                  </span>
                ) : (
                  <Link href={href} className="hover:text-primary transition-colors tracking-wide">
                    {title}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
