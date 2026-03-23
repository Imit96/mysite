import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, ArrowRight, Briefcase, FileText, Image as ImageIcon } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  
  // Fetch high-level quick stats
  const { count: projectCount } = await supabase.from("projects").select("*", { count: 'exact', head: true });
  const { count: journalCount } = await supabase.from("journal").select("*", { count: 'exact', head: true });

  // Fetch recent items
  const { data: recentProjects } = await supabase.from("projects").select("id, title, slug, created_at").order("created_at", { ascending: false }).limit(4);
  const { data: recentJournals } = await supabase.from("journal").select("id, title, slug, created_at").order("created_at", { ascending: false }).limit(4);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome to your portfolio management system.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/projects/new" className={buttonVariants({ variant: "default" })}>
            <Plus className="w-4 h-4 mr-2" /> New Project
          </Link>
          <Link href="/admin/journal/new" className={buttonVariants({ variant: "secondary" })}>
            <Plus className="w-4 h-4 mr-2" /> New Post
          </Link>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border rounded-2xl p-6 shadow-sm flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Projects</h3>
            <p className="text-3xl font-bold">{projectCount || 0}</p>
          </div>
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Journal Posts</h3>
            <p className="text-3xl font-bold">{journalCount || 0}</p>
          </div>
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <FileText className="w-5 h-5" />
          </div>
        </div>
        <div className="relative bg-card border rounded-2xl p-6 shadow-sm flex items-start justify-between group cursor-pointer hover:border-primary/50 transition-colors">
          <Link href="/admin/media" className="absolute inset-0" />
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Media Library</h3>
            <p className="text-sm text-muted-foreground mt-2">Manage files &rarr;</p>
          </div>
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <ImageIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Projects */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold">Recent Projects</h2>
            <Link href="/admin/projects" className={buttonVariants({ variant: "ghost", size: "sm", className: "text-muted-foreground hover:text-foreground" })}>
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
            {recentProjects && recentProjects.length > 0 ? (
              <div className="divide-y">
                {recentProjects.map((project) => (
                  <Link href={`/admin/projects/${project.id}`} key={project.id} className="block p-4 hover:bg-muted/50 transition-colors">
                    <p className="font-medium text-foreground">{project.title}</p>
                    <p className="text-sm text-muted-foreground font-mono mt-1">/{project.slug}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">No projects found.</div>
            )}
          </div>
        </div>

        {/* Recent Journals */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold">Latest Journal Posts</h2>
            <Link href="/admin/journal" className={buttonVariants({ variant: "ghost", size: "sm", className: "text-muted-foreground hover:text-foreground" })}>
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
            {recentJournals && recentJournals.length > 0 ? (
              <div className="divide-y">
                {recentJournals.map((post) => (
                  <Link href={`/admin/journal/${post.id}`} key={post.id} className="block p-4 hover:bg-muted/50 transition-colors">
                    <p className="font-medium text-foreground">{post.title}</p>
                    <p className="text-sm text-muted-foreground font-mono mt-1">/{post.slug}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">No journal posts found.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
