"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { revalidateContent } from "@/app/actions/revalidate";
import { MediaPickerModal } from "./media-picker-modal";

const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
  company: z.string().optional(),
  quote: z.string().min(10, "Testimonial quote must be at least 10 characters"),
  avatar_url: z.string().optional(),
  social_url: z.string().optional(),
  featured: z.boolean().optional(),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export function TestimonialForm({ initialData }: { initialData: Record<string, unknown> | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: (initialData?.name as string) || "",
      role: (initialData?.role as string) || "",
      company: (initialData?.company as string) || "",
      quote: (initialData?.quote as string) || "",
      avatar_url: (initialData?.avatar_url as string) || "",
      social_url: (initialData?.social_url as string) || "",
      featured: (initialData?.featured as boolean) || false,
    },
  });

  async function onSubmit(data: TestimonialFormValues) {
    setLoading(true);

    const payload = {
      name: data.name,
      role: data.role,
      company: data.company,
      quote: data.quote,
      avatar_url: data.avatar_url,
      social_url: data.social_url,
      featured: data.featured || false,
    };

    if (initialData?.id) {
      await supabase.from("testimonials").update(payload).eq("id", initialData.id as string);
    } else {
      await supabase.from("testimonials").insert([payload]);
    }

    await revalidateContent("/");

    setLoading(false);
    router.push("/admin/testimonials");
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., Sarah Mitchell" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., BrightFrame Studio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role / Title</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., Head of Product" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="social_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social / LinkedIn URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://linkedin.com/in/..." {...field} />
                </FormControl>
                <FormDescription>Link to their LinkedIn or social profile for credibility.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="avatar_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar / Photo URL</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-2">
                  <Input placeholder="https://..." {...field} />
                  <MediaPickerModal onSelect={(url) => field.onChange(url)} />
                </div>
              </FormControl>
              <FormDescription>Upload via Media Library, then paste the URL here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Testimonial Quote</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What did they say about working with you?"
                  {...field}
                  className="min-h-[200px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
              </FormControl>
              <FormLabel className="!mt-0">Show on homepage</FormLabel>
            </FormItem>
          )}
        />

        {/* FIXED FOOTER */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t p-4 z-50 flex items-center justify-end md:pl-64">
          <div className="w-full max-w-4xl mx-auto flex items-center justify-end gap-4 px-8">
            <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData?.id ? "Save Testimonial" : "Add Testimonial"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
