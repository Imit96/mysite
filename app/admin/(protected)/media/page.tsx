import { MediaManager } from "@/components/admin/media-manager";

export default function AdminMediaPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold">Media Library</h1>
        <p className="text-muted-foreground mt-2">Manage your Supabase Storage uploads. Copy URLs to paste inside your Case Studies.</p>
      </div>
      
      <MediaManager />
    </div>
  );
}
