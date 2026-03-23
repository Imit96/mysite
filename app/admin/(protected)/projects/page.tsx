import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { revalidatePath } from "next/cache";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from("projects").select("*").order("created_at", { ascending: false });

  async function deleteProject(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const sb = await createClient();
    await sb.from("projects").delete().eq("id", id);
    revalidatePath("/admin/projects");
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Projects</h1>
          <p className="text-muted-foreground mt-2">Manage your portfolio case studies.</p>
        </div>
        <Link href="/admin/projects/new">
          <Button><Plus className="w-4 h-4 mr-2" /> New Project</Button>
        </Link>
      </div>
      
      <div className="bg-card border rounded-2xl overflow-hidden">
        <div className="divide-y relative">
          {projects?.map((project) => (
            <div key={project.id} className="flex items-center p-4 hover:bg-muted/30 transition-colors">
              <div className="h-12 w-16 relative rounded overflow-hidden bg-muted flex-shrink-0 mr-4">
                {project.cover_image && <Image src={project.cover_image} alt="" fill className="object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{project.title}</p>
                <p className="text-xs text-muted-foreground truncate">{project.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/admin/projects/${project.id}`}>
                  <Button variant="ghost" size="icon"><Pencil className="w-4 h-4" /></Button>
                </Link>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={project.id} />
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </form>
              </div>
            </div>
          ))}
          {!projects?.length && (
            <div className="p-8 text-center text-muted-foreground">No projects found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
