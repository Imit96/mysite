import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { revalidatePath } from "next/cache";

export default async function AdminJournalPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase.from("journal").select("*").order("created_at", { ascending: false });

  async function deletePost(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const sb = await createClient();
    await sb.from("journal").delete().eq("id", id);
    revalidatePath("/admin/journal");
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Journal</h1>
          <p className="text-muted-foreground mt-2">Manage your blog posts.</p>
        </div>
        <Link href="/admin/journal/new" className={buttonVariants({ variant: "default" })}>
          <Plus className="w-4 h-4 mr-2" /> New Post
        </Link>
      </div>
      
      <div className="bg-card border rounded-2xl overflow-hidden">
        <div className="divide-y relative">
          {posts?.map((post) => (
            <div key={post.id} className="flex items-center p-4 hover:bg-muted/30 transition-colors">
              <div className="h-12 w-16 relative rounded overflow-hidden bg-muted flex-shrink-0 mr-4">
                {post.cover_image && <Image src={post.cover_image} alt="" fill className="object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{post.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-sm">{post.category}</span>
                  <p className="text-xs text-muted-foreground truncate">{post.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/admin/journal/${post.id}`}>
                  <Button variant="ghost" size="icon"><Pencil className="w-4 h-4" /></Button>
                </Link>
                <form action={deletePost}>
                  <input type="hidden" name="id" value={post.id} />
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </form>
              </div>
            </div>
          ))}
          {!posts?.length && (
            <div className="p-8 text-center text-muted-foreground">No journal posts found. Create one.</div>
          )}
        </div>
      </div>
    </div>
  );
}
