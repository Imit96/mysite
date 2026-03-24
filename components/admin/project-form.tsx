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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { MediaPickerModal } from "./media-picker-modal";
import { revalidateContent } from "@/app/actions/revalidate";
import { MdxPreview } from "./mdx-preview";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  client: z.string().optional(),
  year: z.string().optional(),
  disciplines: z.string().optional(),
  tags: z.string().optional(),
  cover_image: z.string().optional(),
  content: z.string().optional(),
  gallery: z.string().optional(),
  status: z.enum(["draft", "published"]),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  og_image: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export function ProjectForm({ initialData }: { initialData: any | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      client: initialData?.client || "",
      year: initialData?.year || "",
      disciplines: initialData?.disciplines?.join(", ") || "",
      tags: initialData?.tags?.join(", ") || "",
      cover_image: initialData?.cover_image || "",
      content: initialData?.content || "",
      gallery: initialData?.gallery?.join("\n") || "",
      status: initialData?.status || "published",
      meta_title: initialData?.meta_title || "",
      meta_description: initialData?.meta_description || "",
      og_image: initialData?.og_image || "",
    },
  });

  async function onSubmit(data: ProjectFormValues) {
    setLoading(true);
    
    const disciplinesArray = data.disciplines?.split(",").map(s => s.trim()).filter(Boolean) || [];
    const tagsArray = data.tags?.split(",").map(s => s.trim()).filter(Boolean) || [];
    const galleryArray = data.gallery?.split("\n").map(s => s.trim()).filter(Boolean) || [];

    const payload = {
      title: data.title,
      slug: data.slug,
      description: data.description,
      client: data.client,
      year: data.year,
      disciplines: disciplinesArray,
      tags: tagsArray,
      cover_image: data.cover_image,
      content: data.content,
      gallery: galleryArray,
      featured: initialData?.featured || false,
      status: data.status,
      meta_title: data.meta_title,
      meta_description: data.meta_description,
      og_image: data.og_image,
    };

    if (initialData?.id) {
      await supabase.from("projects").update(payload).eq("id", initialData.id);
    } else {
      await supabase.from("projects").insert([payload]);
    }
    
    await revalidateContent("/");
    await revalidateContent("/work");
    await revalidateContent(`/work/${data.slug}`);
    
    setLoading(false);
    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Project Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="project-slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visibility Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft (Hidden)</SelectItem>
                    <SelectItem value="published">Published (Live)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <FormControl>
                  <Input placeholder="Client Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input placeholder="YYYY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="disciplines"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Disciplines (comma separated)</FormLabel>
                <FormControl>
                  <Input placeholder="Design, Development" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags (comma separated)</FormLabel>
                <FormControl>
                  <Input placeholder="UI/UX, Next.js" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cover_image"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Cover Image URL</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Input placeholder="/images/projects/cover.jpg" {...field} />
                    <MediaPickerModal onSelect={(url) => field.onChange(url)} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Excerpt / Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Short summary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gallery"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Media Gallery URLs (one per line)</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Textarea placeholder="https://...&#10;https://..." className="min-h-[120px] font-mono text-sm" {...field} />
                    <MediaPickerModal onSelect={(url) => field.onChange(field.value ? field.value + '\n' + url : url)} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="col-span-2 mt-8 mb-4">
            <h3 className="text-lg font-heading font-semibold pb-2 border-b">SEO & Social Sharing</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-6">Customize how this project appears on Google, Twitter, and LinkedIn.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="meta_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title (Optional Override)</FormLabel>
                    <FormControl>
                      <Input placeholder="Custom Title | Ojo Oluwatimileyin" {...field} />
                    </FormControl>
                    <FormDescription>Leave blank to use the default title format.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="og_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Image URL (Optional Override)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormDescription>The image shown when the link is shared.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="meta_description"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Meta Description (Optional Override)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Custom short description for search engines..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>MDX Content</FormLabel>
                <details className="cursor-pointer text-sm text-muted-foreground border border-border/50 rounded-lg p-3 my-2 bg-muted/20">
                  <summary className="font-medium select-none text-foreground hover:text-primary transition-colors">MDX Formatting Cheatsheet</summary>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs cursor-text pb-2">
                    <div>
                      <strong className="block text-foreground mb-2 text-sm">Standard Markdown</strong>
                      <ul className="space-y-2">
                        <li><code>## Heading 2</code> — Main Section</li>
                        <li><code>### Heading 3</code> — Sub Section</li>
                        <li><code>**Bold**</code> and <code>*Italic*</code></li>
                        <li><code>&gt; Text</code> — Blockquote definition</li>
                        <li><code>- Item</code> — Bulleted list</li>
                        <li><code>[Link](https://...)</code> — External link</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="block text-foreground mb-2 text-sm">Custom Components</strong>
                      <ul className="space-y-3">
                        <li>
                          <code className="block mb-1 text-primary/80">&lt;ProjectSection title="The Challenge"&gt;</code>
                          Wraps case study content with standard padding.
                        </li>
                        <li>
                          <code className="block mb-1 text-primary/80">&lt;ImageGrid columns=&#123;2&#125;&gt; ... &lt;/ImageGrid&gt;</code>
                          Renders child images in a CSS grid.
                        </li>
                        <li>
                          <code className="block mb-1 text-primary/80">&lt;FullWidthImage src="/img.jpg" alt="alt" /&gt;</code>
                          Edge-to-edge cinematic image display.
                        </li>
                        <li>
                          <code className="block mb-1 text-primary/80">&lt;ImageGallery images=&#123;["url1", "url2"]&#125; /&gt;</code>
                          Inline swipable masonry gallery constraint.
                        </li>
                        <li>
                          <code className="block mb-1 text-primary/80">&lt;AudioTrackPlayer src="/track.mp3" title="Song" /&gt;</code>
                          Playable audio block injection.
                        </li>
                        <li>
                          <code className="block mb-1 text-primary/80">&lt;YouTubeEmbed id="cx4VkoDZY4I" /&gt;</code>
                          Responsive cinematic YouTube iframe.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border/50 mt-2 text-xs text-foreground/70 italic">
                    Tip: Leave a blank line between standard Markdown text and HTML/React tags for safest formatting.
                  </div>
                </details>
                <FormControl>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Textarea placeholder="Write MDX here..." className="min-h-[500px] font-mono text-sm leading-relaxed whitespace-pre-wrap" {...field} />
                    <MdxPreview content={field.value || ""} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="sticky bottom-0 bg-background/80 backdrop-blur-md border-t p-4 flex justify-end gap-4 z-50 rounded-b-xl mb-12 shadow-[0_-20px_20px_-20px_rgba(0,0,0,0.1)]">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Project"}</Button>
        </div>
      </form>
    </Form>
  );
}
