import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { JournalForm } from "@/components/admin/journal-form";

export default async function AdminJournalEditPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const isNew = params.id === "new";
  
  let post = null;
  
  if (!isNew) {
    const supabase = await createClient();
    const { data } = await supabase.from("journal").select("*").eq("id", params.id).single();
    if (!data) return notFound();
    post = data;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 pb-32">
      <div>
        <h1 className="text-3xl font-heading font-bold">{isNew ? "New Post" : "Edit Post"}</h1>
        <p className="text-muted-foreground mt-2">Write and manage your journal entry and its MDX content.</p>
      </div>
      
      <JournalForm initialData={post} />
    </div>
  );
}
