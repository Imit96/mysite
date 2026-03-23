import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Star, ExternalLink } from "lucide-react";
import { revalidatePath } from "next/cache";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data: testimonials } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });

  async function deleteTestimonial(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const sb = await createClient();
    await sb.from("testimonials").delete().eq("id", id);
    revalidatePath("/admin/testimonials");
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Testimonials</h1>
          <p className="text-muted-foreground mt-2">Manage client & collaborator testimonials.</p>
        </div>
        <Link href="/admin/testimonials/new" className={buttonVariants({ variant: "default" })}>
          <Plus className="w-4 h-4 mr-2" /> Add Testimonial
        </Link>
      </div>

      <div className="bg-card border rounded-2xl overflow-hidden">
        <div className="divide-y">
          {testimonials?.map((t) => (
            <div key={t.id} className="flex items-center p-4 hover:bg-muted/30 transition-colors gap-4">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage src={t.avatar_url || ""} alt={t.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                  {t.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm truncate">{t.name}</p>
                  {t.featured && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {t.role}{t.company ? `, ${t.company}` : ""}
                </p>
              </div>
              <p className="hidden md:block text-xs text-muted-foreground max-w-[300px] truncate italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-1 shrink-0">
                {t.social_url && (
                  <a href={t.social_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="text-muted-foreground"><ExternalLink className="w-4 h-4" /></Button>
                  </a>
                )}
                <Link href={`/admin/testimonials/${t.id}`}>
                  <Button variant="ghost" size="icon"><Pencil className="w-4 h-4" /></Button>
                </Link>
                <form action={deleteTestimonial}>
                  <input type="hidden" name="id" value={t.id} />
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </form>
              </div>
            </div>
          ))}
          {!testimonials?.length && (
            <div className="p-8 text-center text-muted-foreground">No testimonials yet. Add your first one.</div>
          )}
        </div>
      </div>
    </div>
  );
}
