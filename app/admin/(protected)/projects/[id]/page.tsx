import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";

export default async function AdminProjectEditPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const isNew = params.id === "new";
  
  let project = null;
  
  if (!isNew) {
    const supabase = await createClient();
    const { data } = await supabase.from("projects").select("*").eq("id", params.id).single();
    if (!data) return notFound();
    project = data;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 pb-32">
      <div>
        <h1 className="text-3xl font-heading font-bold">{isNew ? "New Project" : "Edit Project"}</h1>
        <p className="text-muted-foreground mt-2">Manage the details and MDX content for this case study.</p>
      </div>
      
      <ProjectForm initialData={project} />
    </div>
  );
}
