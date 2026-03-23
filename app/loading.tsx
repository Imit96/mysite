import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
      <p className="mt-6 text-muted-foreground font-medium animate-pulse">Loading content...</p>
    </div>
  );
}
