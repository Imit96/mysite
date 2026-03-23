import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <Search className="w-10 h-10 text-muted-foreground" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">404</h1>
      <h2 className="text-xl md:text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          Return Home
        </Link>
        <Link href="/work" className={buttonVariants({ variant: "outline", size: "lg" })}>
          View My Work
        </Link>
      </div>
    </div>
  );
}
