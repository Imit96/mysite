"use client";

import { useEffect } from "react";
import Link from "next/link";
import { buttonVariants, Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-destructive" />
      </div>
      <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">Something went wrong!</h1>
      <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
        We apologize for the inconvenience. An unexpected error occurred while trying to load this page.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={() => reset()} size="lg">
          Try again
        </Button>
        <a href="/" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Return Home
        </a>
      </div>
    </div>
  );
}
