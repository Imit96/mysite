import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default async function AdminTestimonialEditPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const isNew = params.id === "new";

  let testimonial = null;

  if (!isNew) {
    const supabase = await createClient();
    const { data } = await supabase.from("testimonials").select("*").eq("id", params.id).single();
    if (!data) return notFound();
    testimonial = data;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 pb-32">
      <div>
        <h1 className="text-3xl font-heading font-bold">{isNew ? "Add Testimonial" : "Edit Testimonial"}</h1>
        <p className="text-muted-foreground mt-2">Manage client feedback and social proof.</p>
      </div>

      <TestimonialForm initialData={testimonial} />
    </div>
  );
}
